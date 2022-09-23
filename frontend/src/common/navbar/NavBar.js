import React, { useEffect, useState } from "react";
import './NavBar.css';
import {ethers} from 'ethers'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavButton from 'react-bootstrap/Button';


// import { fetchAccount } from '../../store/actions/thunks/account';
// import { connectWallet } from '../../core/ethereum';



function NavBar(props){

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [disconnButton, setDisconnButton] = useState('Disconnect')


    const onConnectWallet = () => {
       if(window.ethereum) {
        window.ethereum.request({method: 'eth_requestAccounts'})
        .then( result => {
          accountChangeHandler(result[0]);
          window.localStorage.setItem('wallet', result[0])
        })
       }else{
        alert("Install MetaMask");
        window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
         '_blank',
         )
        setErrorMessage("Install MetaMask");
       }
       console.log("클릭 확인")
    }

    const accountChangeHandler = (newAccount) => {
      window.localStorage.setItem('wallet', newAccount);
      setDefaultAccount(newAccount);
      getUserBalance(newAccount.toString());
      console.log({defaultAccount});
    }

    const getUserBalance = (address) => {
      window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
      .then(balance => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
    }

    const chainChangedHandler = () => {
      window.location.reload();
    }

    const offConnectWallet = () => {
      window.localStorage.removeItem('wallet')
      setDefaultAccount(null);
      setUserBalance(null);
      console.log({defaultAccount});
    }

    window.ethereum.on('accountsChanged', accountChangeHandler);

    window.ethereum.on('chainChanged', chainChangedHandler)

    useEffect(() => {
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then( result => {
        window.localStorage.setItem('wallet', result[0]);
        setDefaultAccount(result[0]);
        setUserBalance(result[0]);
      })
    }, []);

    return(
    <Navbar className="navbar" fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Nft Guarantee</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link href="#aboutus">Abuout US</Nav.Link>
            <Nav.Link href="#searchnft">Search NFT</Nav.Link>
            <div>
              {
                window.localStorage.getItem('wallet')
                ? <Nav.Link href="#mynft">My NFT</Nav.Link>
                : <Nav.Link href="/brandregister">Brand Register</Nav.Link>
              }
            </div>
          </Nav>
            <div>
              {
                window.localStorage.getItem('wallet')
                ? <NavButton className="connect-wallet" variant="outline-secondary" onClick={offConnectWallet}>{disconnButton}</NavButton>
                : <NavButton className="connect-wallet" variant="outline-secondary" onClick={onConnectWallet}>{connButtonText}</NavButton>
              }  
            </div>
        </Navbar.Collapse>
    </Navbar>
    );
   };

export default NavBar;