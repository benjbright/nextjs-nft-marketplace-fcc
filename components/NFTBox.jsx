import { useEffect, useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import nftAbi from "../constants/BasicNft.json"
import Image from "next/image"
import { Card } from "@web3uikit/core"
import { ethers } from "ethers"

export default function NFTBox({ price, nftAddress, tokenId, marketplaceAddress, seller }) {
    const { isWeb3Enabled } = useMoralis()
    const [imageURI, setImageURI] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [tokenDescription, setTokenDescription] = useState("")

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            tokenId: tokenId,
        },
    })

    async function updateUI() {
        // get the tokenURI
        const tokenURI = await getTokenURI()
        console.log(`The TokenURI is ${tokenURI}`)
        // using the image tag from the tokenURI, get the image
        if (tokenURI) {
            // IPFS Gateway - a server that will return IPFS files from a 'normal' URL
            const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            console.log(requestURL)
            const tokenURIResponse = await (await fetch(requestURL)).json()
            console.log(tokenURIResponse)
            const imageURI = tokenURIResponse.image
            console.log(imageURI)
            // const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            // console.log(imageURIURL)
            setImageURI(imageURI)
            setTokenName(tokenURIResponse.name)
            setTokenDescription(tokenURIResponse.description)
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    return (
        <div>
            <div>
                {imageURI ? (
                    <Card title={tokenName} description={tokenDescription}>
                        <div className="p-2">
                            <div className="flex flex-col items-end gap-2">
                                <div>#{tokenId}</div>
                                <div className="italic text-sm">Owned by {seller}</div>
                                <Image
                                    loader={() => imageURI}
                                    src={imageURI}
                                    height="200"
                                    width="200"
                                />
                                <div className="font-bold">
                                    {ethers.utils.formatUnits(price, "ether")} ETH
                                </div>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    )
}
