import React from "react";
import styled from "styled-components";
import {Link, useNavigate}from 'react-router-dom'
import './SideBar.css';
import ssafy from '../../assets/img/ssafy.png';

const MenuList = styled.div`
  background-color: #DDDDDD;
  border-radius: 10px;
  width: 80%;
  height:80%;
  display: flex;
  justify-content: center;
  margin: auto;
  `

const ListHr = styled.hr`
  height: 1px;
  background-color: black;
  `

const Logo = styled.img`
  display:block;
  margin:auto;
  width:250px;
  border-radius: 10px;
  justify-content: center;
  `

const List = styled.ul`
  padding: 0;
  list-style: none;
  `

const ListTitle = styled.li`
  margin-bottom: 50px;
  `

const Item = styled.ul`
  list-style: none;
  padding-left: 35px;
  `

const ListItem = styled.li`
  `

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
    color:black;
  }
  `

function SideBar() {
  const history = useNavigate();

  const goHome = (event) => {
    history('/company/123');
  }

  return (
    <div className="container">
      <Logo src={ssafy} onClick={goHome}/>
      <MenuList>
        <List>
          <ListTitle>NFT 인증서 관리<ListHr/>
            <Item>
              <StyledLink to={"/company/123/register"}><ListItem>NFT 인증서 발급</ListItem></StyledLink>
              <StyledLink to={"/company/123/nfts"}><ListItem>발급한 인증서 목록 조회</ListItem></StyledLink>
            </Item>
          </ListTitle>
          <ListTitle>기업 정보 관리<ListHr/>
            <Item>
              <ListItem>기업 정보 조회</ListItem>
            </Item>
          </ListTitle>
        </List>
      </MenuList>
    </div>
  )
}
export default SideBar;