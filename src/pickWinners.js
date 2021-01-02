const crypto = require('crypto');
const seedrandom = require('seedrandom');

const twtTickets = require('../snapshots/normalizedTwtTickets.json');
const drugsTickets = require('../snapshots/normalizedDrugsTickets.json');
const narTickets = require('../snapshots/normalizedNarTickets.json');
const bifiTickets = require('../snapshots/normalizedBifiTickets.json');

const blockHash = 'INSERT_BLOCK_HASH_HERE'; // 3647837

const rng = seedrandom(crypto.createHash('sha256').update(blockHash).digest('hex'));

const getTotalTickets = tickets => Object.values(tickets).reduce((a, b) => a + b);

const pickWinner = (tickets, rng) => {
  const totalTickets = getTotalTickets(tickets);
  const winningTicket = Math.floor(rng() * totalTickets);

  let ticketsCounted = 0;

  for (const key in tickets) {
    ticketsCounted += tickets[key];
    if (ticketsCounted >= winningTicket) return key;
  }
};

// Trust Wallet - (5 Prizes) + 1 NFT
console.log('Selecting Trust Wallet Winners');
for (let i = 1; i <= 5; i++) {
  console.log(`TWT winner ${i} ${pickWinner(twtTickets, rng)}`);
}
console.log('TWT NFT', pickWinner(twtTickets, rng));
console.log('---');

// Thugs Finance - (5 Prizes) + 1 NFT
console.log('Selecting Thugs Finance Winners');
for (let i = 1; i <= 5; i++) {
  console.log(`Thugs winner ${i} ${pickWinner(drugsTickets, rng)}`);
}
console.log('Thugs NFT', pickWinner(drugsTickets, rng));
console.log('---');

// Narwhalswap - 2 NFT
console.log('Selecting Narwhalswap Winners');
console.log('Narwhalswap NFT 1', pickWinner(narTickets, rng));
console.log('Narwhalswap NFT 2', pickWinner(narTickets, rng));
console.log('---');

// BIFI Maxi (10 Prizes) + 2 NFT
console.log('Selecting BIFI Maxi Winners');
for (let i = 1; i <= 10; i++) {
  console.log(`BIFI winner ${i} ${pickWinner(bifiTickets, rng)}`);
}
console.log('BIFI NFT', pickWinner(bifiTickets, rng));
console.log('BIFI NFT', pickWinner(bifiTickets, rng));
console.log('---');
