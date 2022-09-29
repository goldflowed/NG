import React, {useEffect} from "react";
import axios from '../../../common/api/http-common'
import styled from "styled-components";
import {Link, useNavigate}from 'react-router-dom'
import './SideBar.css';

const MenuList = styled.div`
  // background-color: #DDDDDD;
  border-radius: 10px;
  width: 80%;
  height:90%;
  display: flex;
  justify-content: center;
  margin: auto;
  color:white;
  `

const ListHr = styled.hr`
  height: 1px;
  background-color: white;
  margin-top:20px;
  margin-bottom:20px;
  `

const List = styled.ul`
  width:90%;
  padding: 0;
  list-style: none;
  `

const ListTitle = styled.li`
  font-size:20px;
  margin-bottom: 100px;
  `

const Item = styled.ul`
  list-style: none;
  padding-left: 35px;
  `

const ListItem = styled.li`
  font-size:20px;
  color:white;
  margin-bottom:15px;
  margin-top:15px;
  `

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
    color:black;
  }
  `

function SideBar() {
  const history = useNavigate()

  useEffect(() => {
    axios.get(`company/${window.localStorage.wallet}`)
    .then((res) => {
      if(res.data.comPermit !== 2) {
        alert("기업회원이 아닙니다. 메인페이지로 이동합니다.")
        history('/')
      }
    })
    .catch(() => {
      alert("기업회원이 아닙니다. 메인페이지로 이동합니다.")
      history('/')
    })
  }, []);


  return (
    <div className="SideContainer">
      <MenuList>
        <List>
          <ListTitle>NFT 인증서 관리<ListHr/>
            <Item>
              <StyledLink to={"/company/register"}><ListItem>NFT 인증서 발급</ListItem></StyledLink>
              <StyledLink to={"/company/nfts"}><ListItem>등록 제품 조회</ListItem></StyledLink>
            </Item>
          </ListTitle>
          <ListTitle>기업 정보 관리<ListHr/>
            <Item>
              <StyledLink to={"/company"}><ListItem>기업 정보 조회</ListItem></StyledLink>
            </Item>
          </ListTitle>
        </List>
      </MenuList>
    </div>
  )
}
export default SideBar;