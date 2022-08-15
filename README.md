This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Timestamps and Notes

- `yarn create next-app .` Create a NextJS app in the current folder
- Delete any existing README or `package.json` files to avoid document conflicts
- Run ```yarn dev``` and open in browser

### Front end project plan

1. Home Page:
    - Show recently listed NFT's
    - If you own the NFT, you can update the listing
    - If not, you can buy the listing
2. Sell Page:
    - You can list your NFT on the marketplace

- ```yarn add web3uikit moralis react-moralis```
- import the MoralisProvider into ```_app.js```
- add initializeOnMount prop and set to false as not initially using the Moralis server

1:01:02 Adding Tailwind
- ```yarn add --dev tailwindcss postcss autoprefixer```
- ```yarn tailwindcss init -p```
- Copy set up in config and css files from docs

1:01:05 Introduction to Indexing in Web3
- We need to show the recently listed NFTs - how?
- Cannot loop through a mapping
- Arrays can be very gas expensive
- Don't want to have to change our protocol for just the website
- When an event is emitted this is stored in a data structure 
- Cannot be accessed by a smart contract - but off chain services can access
- So can index the events off chain and read from our database
- Set up a server to listen for those events to be fired and then add them to a database to query
- E.g. The Graph protocol indexes events off chain and stores them in a decentralized way
- Moralis does this in a centralized way

1:01:12 What is Moralis?

1:01:19 Connecting Moralis to our local Hardhat node
- https://docs.moralis.io/moralis-dapp/automatic-transaction-sync/smart-contract-events
- Create a new DAPP / server on the Moralis homepage
- Update the MoralisProvider props
- copy in the appId and server URL from the settings page for the DAPP
- How do we tell Moralis to listen to our events?
    1. Connect to our blockchain
    2. Which contract, which events and what to do when it 'hears' an event?
- open a new terminal ```cd ..``` to go up into projects folder
- then ```cd hardhat-nft-marketplace-fcc``` to go into back end contracts folder
- then run ```yarn hardhat node``` in this folder command line

1:01:30 Connecting to Moralis / Hardhat node 

- Devchain proxy server settings - copy hardhat settings into ```frpc.ini```
- ```cd frp``` and insert ```frpc.exe -c frpc.ini``` from Moralis docs

- ```yarn moralis-admin-cli connect-local-devchain --moralisApiKey [insert] --moralisApiSecret [insert] --frpcPath "C:\Users\benjb\Projects\nextjs-nft-marketplace-fcc\frp\frpc.exe"```

- As per the course run ```moralis-admin-cli connect-local-devchain --chain hardhat --moralisSubdomain zru39aagrwm9.usemoralis.com --frpcPath ./frp/frpc``` - this worked with the v0.40.0 package

- NOTE - used the v0.40.0 package / windows_amd64 https://github.com/fatedier/frp/releases/tag/v0.40.0
- Updated ```package.json``` as per course - run ```yarn moralis:sync```
- Don't forget to update the ```.env``` file with the api key and api secret 

1:01:34 Moralis Event Sync
- Moralis docs - Connect with SDK - this example uses Connect with Node.js
- Also need to install ```yarn add --dev dotenv```
- Run new front end script (99) in hardhat folder ```yarn hardhat deploy --network localhost --tags "frontend"```

- Summary to set up
    1. Run ```yarn dev``` to show in browser
    2. Run ```yarn hardhat node``` in the ```hardhat-nft-marketplace-fcc``` folder
    3. Run ```yarn moralis:sync``` in new terminal
    4. Note - need the apiKey and apiSecret in the ```.env``` file
    5. Note - script in the ```package.json``` file

1:01:46 Event sync from code (under the connect with Node.js section)
- https://v1docs.moralis.io/moralis-dapp/connect-the-sdk/connect-using-node#add-new-event-sync-from-code

1:01:56
- to run enter ```node addEvents.js```
- to test whether the event sync is listening correctly - open up terminal in hardhat-nft-marketplace
- run ```min-and-list.js``` on localhost
- NOTE - make sure the Hardhat node is connected to the Moralis server
- run ```yarn hardhat run .\scripts\mint-and-list.js --network localhost```
- Should now see new itemListed entry in the Moralis database

1:01:58 Resetting the local chain
- If you close the Hardhat node and try to restart - need to Reset Local Devchain to update the Moralis Devchain Proxy Server
- NOTE - may need to Reset Local Devchain at the start of each new session

1:02:00 Moralis Cloud Functions I
- Note - if someone buys an NFT then it is no longer listed
- So, how to update the Moralis server / database?
- Can use Moralis Cloud Functions 
- https://v1docs.moralis.io/moralis-dapp/cloud-code/cloud-functions
- Add a new Moralis script to ```package.json```
- Can run ```yarn moralis:cloud```
- If run ```mint-and-list.js``` again should now see the logs in the server

1:02:19 Practice resetting the local chain
- Run through of closing down the terminal and resetting the local chain and server
- To restart everything:
    1. Start local development server ```yarn dev```
    2. Start local blockchain node ```yarn hardhat node``` NOTE - in ```hardhat-nft-marketplace-fcc``` folder
    3. Sync Moralis to local node ```yarn moralis:sync```
    4. Check now connected in Moralis and don't forget to Reset Local Devchain
    5. Old entries in the Moralis database are now from a blockchain that doesn't exist
    6. Delete the rows in the ActiveItem / ItemListed fields (any others as well) - empty database
    7. Run ```yarn moralis:cloud``` 
    8. In the hardhat marketplace folder run ```yarn hardhat run .\scripts\mint-and-list.js --network localhost```
    9. Should now see new ItemListed and ActiveItem in the Moralis database

1:02:22 Moralis Cloud Functions II
- After updating the ```addEvents.js``` script run ```yarn moralis:cloud``` to update the cloud function / database
- Create a new ```cancel-item.js``` script in the hardhat-nft-marketplace-fcc folder
- ```yarn hardhat run scripts/cancel-item.js --network localhost```
- Then need another cloud function for Buying NFT's - again remember to upload / update the cloud 
- Create a new ```buy-item.js``` script 
- Note - make sure there is an NFT in the ActiveItems / Listing section of the database
- Run ```yarn hardhat run scripts/buy-item.js --network localhost```
- Note - this is one of the hardest sections of the course due to the number of technologies used
- NOTE - remember that when you close your local blockchain node, need to delete all entries in the database
- NOTE - remember the Moralis server is set to 'sleep' every three days so need to restart it in the legacy UI

1:02:42 Querying the Moralis database
- Moralis docs https://www.npmjs.com/package/react-moralis
- Hook called ```useMoralisQuery()``` - https://www.npmjs.com/package/react-moralis#usemoralisquery

1:02:48 Rendering the NFT images
- Update the front end script in the hardhat folder
- ```yarn hardhat deploy --tags "frontend" --network localhost```
- Use an IPFS Gateway - a server that will return IPFS files from a "normal" URL
- Note - could also render the image on the Moralis server and call the server
- For testnets and main net -> use moralis server hooks

1:03:04 IPFS
- Had an error trying to run the IPFS links as per this section of the course
- This was resolved by opening the IPFS desktop app in the background?

1:03:05 NextJS image component
- If use this image tag, cannot deploy the site statically (e.g. to IPFS)
- Also use ```web3uikit``` ```<Card />``` component here






















