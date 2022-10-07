import axios from 'axios'
import { create } from 'ipfs-http-client'

const ipfs_apis = {
  https_public: 'https://ipfs.io/ipfs/',
  https_local: 'https://j7e206.p.ssafy.io/ipfs/',
  ipfs: 'ipfs://',
}

export const Ipfs = create({
  host: '3.34.186.137',
  port: '5001',
  protocol: 'http',
})

export default ipfs_apis