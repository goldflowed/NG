import React, { useState } from "react";
import Web3 from 'web3';
import { useEffect } from 'react';

import './NavBar.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
  MDBBtn
} from 'mdb-react-ui-kit';
import {NavLink} from 'react-router-dom';
import LOGO from '../../assets/img/logo2.jpg';

function NavBar(){

    const [defaultAccount, setDefaultAccount] = useState(null);
    const [IsConnected, setIsConnected] = useState(false);

    const detectCurrentProvider = () => {
      let provider;
      if (window.ethereum) {
        provider = window.ethereum;
      } else if (window.web3){
        provider = window.web3.currentProvider;
      } else{
        alert("Please Install MetaMask");
        window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
         '_blank',
        )
      }
      return provider;
    }

    const onConnect = async() => {
      try{
        const currentProvider = detectCurrentProvider();
        if ( currentProvider !== window.ethereum ){
          console.log(
            'Non-Ethereum browser detected. You should consider trying MetaMask!'
          )
        }
        await currentProvider.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        saveUserInfo(account);
        if(userAccount.length === 0) {
          console.log('Please connect to metamask');
        }
      } catch (err){
        console.log(
          'There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.'
        )
      }
    }
    // 로컬 스토리지에 계좌 저장(새로 고침해도 정보 저장)
    const saveUserInfo = (account) => {
      window.localStorage.setItem('wallet', (account));
      setDefaultAccount(account);
      setIsConnected(true);
    }

    // 로컬 스토리지 계좌 삭제
    const onDisconnect = () => {
      window.localStorage.removeItem('wallet');
      setDefaultAccount(null);
      setIsConnected(false);
    }

    useEffect(() => {
      function checkConnectWallet() {
        const userData = localStorage.getItem('wallet');
        if (userData != null){
          setDefaultAccount(userData);
          setIsConnected(true);
        }
      }
      checkConnectWallet();
    }, []);

    return(
    <Navbar className="navbar" fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <NavLink to="/">
          <img src={LOGO} style={{marginLeft:20, height:60, width:60}}/>
        </NavLink>
        <Navbar.Brand style={{marginLeft:0}}href="/">Nft Guarantee</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link href="/aboutus">Abuout US</Nav.Link>
            <Nav.Link href="/searchnft">Search NFT</Nav.Link>
            <div>
              {
                window.localStorage.getItem('wallet')
                ? <Nav.Link href="/mynft">My NFT</Nav.Link>
                : <Nav.Link href="/brandregister">Brand Register</Nav.Link>
              }
            </div>
          </Nav>
            <div>
              {
                window.localStorage.getItem('wallet')
                ? <MDBBtn className="connect-wallet" variant="outline-secondary" onClick={onDisconnect}>Disconnect</MDBBtn>
                : <MDBBtn className="connect-wallet" variant="outline-secondary" onClick={onConnect}>Connect Wallet</MDBBtn>
              }  
            </div>
        </Navbar.Collapse>
    </Navbar>
    );
   };

export default NavBar;