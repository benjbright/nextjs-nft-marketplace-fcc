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









