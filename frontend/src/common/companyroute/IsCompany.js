import axios from '../api/http-common'

const isCompany = async () => {

  window.ethereum.request({method: 'eth_requestAccounts'})
      .then( result => {
        window.localStorage.setItem('wallet', result[0]);
      })
  
  axios.get(`company/${window.localStorage.wallet}`)
  .then((res) => {
    if (res.data.comPermit === 2 ) {
      return true
    } else {
      return false
    }
  })
};

export default isCompany;