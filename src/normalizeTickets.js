const BigNumber = require('bignumber.js');

let tickets = require('../snapshots/bifiTickets.json');

let normalizedTickets = {};

for (const key in tickets) {
  const value = new BigNumber(tickets[key]);
  normalizedTickets[key] = parseInt(value.div('1e18'));
}

console.log(normalizedTickets);
