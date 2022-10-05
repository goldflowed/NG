import Web3 from 'web3';
import NG from './abi/NG.json'

const nftAbi = NG.abi

export const nftCA = `0x74d5d36E7dEE73692EC3c4cc0E9728C374910C7B`;

export const web3 = new Web3(window.ethereum);

export const nftContract = new web3.eth.Contract(nftAbi, nftCA)