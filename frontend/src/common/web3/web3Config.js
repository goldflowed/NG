import Web3 from 'web3';
import NG from './abi/NG.json'

const nftAbi = NG.abi

// export const nftCA = `0x68bB4400b254588f8E2024601Ca8AcBB929f82cd`;
export const nftCA = `0x77203c76dcE6a220676d84F52A3504720562dA92`;

export const web3 = new Web3(window.ethereum);

export const nftContract = new web3.eth.Contract(nftAbi, nftCA)