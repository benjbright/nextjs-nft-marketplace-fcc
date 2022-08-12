import { useState } from "react"
import { useWeb3Contract } from "react-moralis"

export default function NFTBox({ price, nftAddress, tokenId, marketplaceAddress, seller }) {
    const [imageURI, setImageURI] = useState("")

    async function updateUI() {
        // get the tokenURI
        // using the image tag from the tokenURI, get the image
    }
}
