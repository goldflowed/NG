import React from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import {useNavigate}from 'react-router-dom'
import Search from "./search";
import "./tableCss.css"
import styled from "styled-components";

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
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const showDetail = (code) => {
    console.log(code)
  }
  return (
    <>
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
              <tr {...row.getRowProps()} onClick={() => showDetail(row.original.comWallet)}>
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