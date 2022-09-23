const isCompany = () => {

    window.ethereum.request({method: 'eth_requestAccounts'})
        .then( result => {
          window.localStorage.setItem('wallet', result[0]);
        })
  
    const walletAddress = window.localStorage.getItem('wallet')
    if (walletAddress === "0x69f69c1c64e68c81da2a02686e3e4d86c657eace") {
      return true
    } else {
      return false
    }
  };
  
  export default isCompany;
  