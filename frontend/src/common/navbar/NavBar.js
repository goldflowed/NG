import React, { useState } from "react";
import Web3 from 'web3';
import axios from '../api/http-common';
import './NavBar.css';
import {useEffect} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {NavLink} from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import LOGO from '../../assets/img/logo2.jpg';

function NavBar(){

    const [defaultAccount, setDefaultAccount] = useState(null);
    const [myRole, setMyRole] = useState(0);
    const [IsConnected, setIsConnected] = useState(false);
    const navigate = useNavigate();


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
        console.log('account', account)
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
      alert('지갑 연결이 해제되었습니다.')
      navigate('/');
    }

    // useEffect(() => {
    //   window.ethereum.request({method: 'eth_requestAccounts'})
    //   .then( result => {
    //     window.localStorage.setItem('wallet', result[0]);
    //     setDefaultAccount(result[0]);
    //     axios.get(`company/${result[0]}`)
    //     .then((res) => {
    //       setMyRole(res.data.comPermit)
    //     })
    //     .catch(() => {})
    //   })
    // }, []);

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
            <Nav.Link href="/aboutus">About US</Nav.Link>
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
            <div style={{marginRight:20}}>
              {
                window.localStorage.getItem('wallet')
                ? <Button variant="primary" onClick={onDisconnect}>Disconnect</Button>
                : <Button variant="primary" onClick={onConnect}>Connect Wallet</Button>
              }  
            </div>
        </Navbar.Collapse>
    </Navbar>
    );
   };

export default NavBar;
