const crypto = require('crypto');
const seedrandom = require('seedrandom');

const twtTickets = require('../snapshots/normalizedTwtTickets.json');
const drugsTickets = require('../snapshots/normalizedDrugsTickets.json');
const narTickets = require('../snapshots/normalizedNarTickets.json');
const bifiTickets = require('../snapshots/normalizedBifiTickets.json');

const blockHash = '0x763cddbf96151332c6ab9dd1eb8cae4bd9412246c917411ceb314d738691588f';

const rng = seedrandom(crypto.createHash('sha256').update(blockHash).digest('hex'));

const findWinningAddress = (tickets, winningTicket) => {
  let total = 0;

  for (const key in tickets) {
    total += tickets[key];
    if (total >= winningTicket) return key;
  }
};

const getTotalTickets = tickets => Object.values(tickets).reduce((a, b) => a + b);

// Trust Wallet ()
const twtTotalTickets = getTotalTickets(twtTickets);
const twtWinningTicket = Math.floor(rng() * twtTotalTickets);
const twtWinner = findWinningAddress(twtTickets, twtWinningTicket);

console.log(`The TWT lottery winning ticket is: ${twtWinningTicket}`);
console.log(`The winning address is ${twtWinner}`);

// Thugs Finance
const thugsWinningTicket = Math.floor(rng() * 998088);
const thugsWinner = findWinningAddress(drugsTickets, thugsWinningTicket);

console.log(`The Thugs lottery winning ticket is: ${thugsWinningTicket}`);
console.log(`The winning address is ${thugsWinner}`);

// Narwhalswap
const narWinningTicket = Math.floor(rng() * 999989);
const narWinner = findWinningAddress(narTickets, narWinningTicket);

console.log(`The Narwhalswap lottery winning ticket is: ${narWinningTicket}`);
console.log(`The winning address is ${narWinner}`);

// BIFI Maxi - Jetfuel2
const bifiMaxiFuelWinningTicket = Math.floor(rng() * 989360);
const bifiMaxiFuelWinner = findWinningAddress(bifiTickets, bifiMaxiFuelWinningTicket);

console.log(`The BIFI Maxi Jetfuel lottery winning ticket is: ${bifiMaxiFuelWinningTicket}`);
console.log(`The winning address is ${bifiMaxiFuelWinner}`);

// BIFI Maxi - Nyanswop
const bifiMaxiNyaWinningTicket = Math.floor(rng() * 989360);
const bifiMaxiNyaWinner = findWinningAddress(bifiTickets, bifiMaxiNyaWinningTicket);

console.log(`The BIFI Maxi Nyanswop lottery winning ticket is: ${bifiMaxiNyaWinningTicket}`);
console.log(`The winning address is ${bifiMaxiNyaWinner}`);

// BIFI Maxi - NFT Lighthouse (6)
const bifiMaxiNftWinningTicket = Math.floor(rng() * 989360);
const bifiMaxiNftWinner = findWinningAddress(bifiTickets, bifiMaxiNftWinningTicket);

console.log(`The BIFI Maxi Nyanswop lottery winning ticket is: ${bifiMaxiNftWinningTicket}`);
console.log(`The winning address is ${bifiMaxiNftWinner}`);
