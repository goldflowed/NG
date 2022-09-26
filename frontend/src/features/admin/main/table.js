import React, {useState} from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import {useNavigate}from 'react-router-dom'
import Search from "./search";
import "./tableCss.css"
import styled from "styled-components";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from '../../../common/api/http-common';

const AdminTd = styled.td`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 50px;
  padding-right:50px;
  border: 1px solid black;
  text-align: center;
  `

const AdminTh = styled.th`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 50px;
  padding-right:50px;
  border: 1px solid black;
  text-align: center;
  background-color: gray;
  `

const AdminTable = styled.table` 
  border-collapse: collapse;
  `

function Table({ columns, data }) {
  const history = useNavigate();
  const [show, setShow] = useState(false);
  const [comName, setComName] = useState('');
  const [comEmail, setComEmail] = useState('');
  const [comTel, setComTel] = useState('');
  const [comRegNum, setComRegNum] = useState('');
  const [comWallet, setComWallet] = useState('');
  const [comAddress, setComAddress] = useState('');

  const handleClose = () => setShow(false);

  const handleShow = (idx) => {
    axios.get(`/company/${idx}`)
    .then((res) => {
      setComName(res.data.comName)
      setComEmail(res.data.comEmail)
      setComTel(res.data.comTel)
      setComRegNum(res.data.comRegNum)
      setComWallet(res.data.comWallet)
      setComAddress(res.data.comAddress)
      setShow(true);
      })
  };
  
  const approval = () => {
    const body = {"comPermit": 2};
    axios.post(`/company/permit/${comWallet}`, body).then(() => {
      setShow(false);
      history('/admin/approve');
    })
  }
  
  const deny = () => {
    const body = {"comPermit": 3};
    axios.post(`/company/permit/${comWallet}`, body).then(() => {
      setShow(false);
      history('/admin/deny');
    })
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>기업 상세 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>이름: {comName}</p>
          <p>이메일: {comEmail}</p>
          <p>전화번호: {comTel}</p>
          <p>주소: {comAddress}</p>
          <p>사업자 등록번호: {comRegNum}</p>
          <p>지갑 주소: {comWallet}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={approval}>
            승인
          </Button>
          <Button variant="danger" onClick={deny}>
            거절
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
      <Search onSubmit={setGlobalFilter}/>
      <AdminTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <AdminTh {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                </AdminTh>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} onClick={() => handleShow(row.original.comWallet)}>
                {row.cells.map((cell) => (
                  <AdminTd {...cell.getCellProps()}>{cell.render("Cell")}</AdminTd>
                ))}
              </tr>
            );
          })}
        </tbody>
      </AdminTable>
    </>
  );
}

export default Table;