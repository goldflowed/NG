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
        if (res.data.comPermit !== 4) {
          alert("관리자 페이지에 접근하실 수 없습니다.")
          history('/')
        }
      })
      .catch(() => {
        alert("관리자 페이지에 접근하실 수 없습니다.")
        history('/')
      })
  }, []);


  return (
    <div className="SideContainer">
      <MenuList>
        <List>
          <ListTitle>기업 관리<ListHr/>
            <Item>
              <StyledLink to={"/admin"}><ListItem>요청 기업 목록</ListItem></StyledLink>
              <StyledLink to={"/admin/approve"}><ListItem>승인 기업 목록</ListItem></StyledLink>
              <StyledLink to={"/admin/deny"}><ListItem>거부 기업 목록</ListItem></StyledLink>
            </Item>
          </ListTitle>
        </List>
      </MenuList>
    </div>
  )
}
export default SideBar;