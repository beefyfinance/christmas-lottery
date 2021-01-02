# Beefy Christmas Lottery

This is a small repo to hold the code for the Beefy Lottery. There were 4 different partner pools that printed tickets to users staking a certain mooToken. We had to select a few different winners for each partner at the end of the contest.

## Challenges

The challenge was to keep the selection process as fair and easy to verify as possible, taking into account that the starting tickets were fungible.

## Steps Taken
1. After the distribution period ends, create a snapshot of all the ticket holders and their values. Pending tickets still in the pool were also taken into account.
2. Remove decimals and leave only the integer part of the ticket balance.
3. Hash the resulting file using IPFS and publish them. By maintaining the same order when selecting the winning tickets, this turns the tickets into non-fungible.
4. Publish the IPFS hashes as proof in a simple contract at [0xC667a0f76CFc661d5a3e38f4dC2142CA9201266B](https://bscscan.com/address/)
5. Get a future blockhash as source of randomness. 
6. Use that blockchash as seed for a javascript [seeded randomness library](https://www.npmjs.com/package/seedrandom) which will always return the same values with the same seed as input. 
7. For each winner we need to determine, we use the seeded randomizer to pick a winning number from 1 to totalTickets.
8. To get the addresss that holds the winning ticket, we just start counting from 0 from the start of the file. The address that holds the ticket when we have to 'stop' is the winning address.
