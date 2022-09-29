import React, { useEffect, useState } from "react";
import './NavBar.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavButton from 'react-bootstrap/Button';
import axios from '../api/http-common';


// import { fetchAccount } from '../../store/actions/thunks/account';
// import { connectWallet } from '../../core/ethereum';



function NavBar(props){

    const [defaultAccount, setDefaultAccount] = useState(null);
    const [myRole, setMyRole] = useState(0);
    const connButtonText = 'Connect Wallet';
    const disconnButton = 'Disconnect';


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
       }
       console.log("클릭 확인")
    }

    const accountChangeHandler = (newAccount) => {
      window.localStorage.setItem('wallet', newAccount);
      setDefaultAccount(newAccount);
      console.log({defaultAccount});
    }

    const chainChangedHandler = () => {
      window.location.reload();
    }

    const offConnectWallet = () => {
      window.localStorage.removeItem('wallet')
      setDefaultAccount(null);
      console.log({defaultAccount});
    }

    window.ethereum.on('accountsChanged', accountChangeHandler);

    window.ethereum.on('chainChanged', chainChangedHandler)

    useEffect(() => {
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then( result => {
        window.localStorage.setItem('wallet', result[0]);
        setDefaultAccount(result[0]);
        axios.get(`company/${result[0]}`)
        .then((res) => {
          setMyRole(res.data.comPermit)
        })
        .catch(() => {})
      })
    }, []);

    return(
    <Navbar className="navbar" fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Nft Guarantee</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link href="/aboutus">Abuout US</Nav.Link>
            <Nav.Link href="/searchnft">Search NFT</Nav.Link>
            <Nav.Link href="/mynft">My NFT</Nav.Link>
            <div>
              {
                myRole !== 0
                ? <Nav.Link href="/company">My Company</Nav.Link>
                : <Nav.Link href="/brandregister">Brand Registration</Nav.Link>
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