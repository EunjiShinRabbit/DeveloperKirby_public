import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "../style/main.scss";
import "../style/board.scss";
import Header from "../components/Header";
import Right from "../components/Right";
import SearchWrite from "../components/SearchWrite";
import NewWrite from "../components/NewWrite";
import { isLogin } from "../util/common";
import { useParams } from 'react-router-dom';

const SearchPage = () =>{
  
  let { query } = useParams();

  if(!isLogin){
    window.location.replace("/");
  }
  if(isLogin){
    return(
      <>
      <Header/>
      <div className="boardmain">
        <div className="boardcenter">
          <div className="board-name">
            <Link className="bname" to="#">'{query}'의 검색결과</Link>
          </div>
          {/* <NewWrite/> */}
          {/* <BoardName name={query+"의 검색결과"}/> */}
          {/* <NewWrite/> */}
          <SearchWrite query={query}/> 
          {/* <Write/> */}
        </div>
        <Right position="board"/>
      </div>
      </>
    );
  }
};
export default SearchPage;