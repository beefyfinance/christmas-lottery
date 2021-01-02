const Web3 = require('web3');

const { getTopicFromSignature, getAddressFromTopic, getValueFromData } = require('./topicHelpers');
const IRewardPool = require('../abis/IRewardPool.json');

const web3 = new Web3(process.env.BSC_RPC);

// Input the ticket token address and pool for a given Lottery.
const tickets = '0xA1448795fc2489EadAF5e90d8c7d4cbdc8EF5D19';
const rewardPool = '0xF6d33a859Ee04C77E480d438Fe4E93e52857fCBB'.toLowerCase(); // remove checksum

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const getChristmasSnapshot = async () => {
  let balances = {};

  const transferTopic = getTopicFromSignature('Transfer(address,address,uint256)');

  let logs = await web3.eth.getPastLogs({
    fromBlock: 0,
    toBlock: 'latest',
    address: tickets,
    topics: [transferTopic],
  });

  logs.forEach(log => {
    const from = getAddressFromTopic(log.topics[1]);
    const to = getAddressFromTopic(log.topics[2]);
    const value = getValueFromData(log.data);

    if (balances[to] === undefined) {
      balances[to] = value;
    } else {
      balances[to] = balances[to].plus(value);
    }

    if (from !== '0x00000000000000000000000000000000' && balances[from] !== undefined) {
      balances[from] = balances[from].minus(value);
    }
  });

  // Add up the pending tickets as well.
  let stakers = {};

  const stakeTopic = getTopicFromSignature('Staked(address,uint256)');

  logs = await web3.eth.getPastLogs({
    fromBlock: 0,
    toBlock: 'latest',
    address: rewardPool,
    topics: [stakeTopic],
  });

  for (log of logs) {
    try {
      const staker = getAddressFromTopic(log.topics[1]);

      if (!stakers[staker]) {
        const rewardPoolContract = new web3.eth.Contract(IRewardPool, rewardPool);
        const pending = await rewardPoolContract.methods.rewards(staker).call();

        if (balances[staker] === undefined) {
          balances[staker] = pending;
        } else {
          balances[staker] = balances[staker].plus(pending);
        }

        console.log(`${staker} has ${pending.toString()}`);
      }

      stakers[staker] = true;
    } catch (e) {
      console.log(e);
    }

    await sleep(500);
  }

  return balances;
};

(async () => {
  try {
    console.log(JSON.stringify(await getChristmasSnapshot()));
  } catch (err) {
    console.error(err);
  }
})();
