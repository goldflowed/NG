import Web3 from 'web3';

const nftAbi = [

]

export const nftCA = `0x000`;

export const web3 = new Web3(window.ethereum);

export const nftContract = new web3.eth.Contract(nftAbi, nftCA)