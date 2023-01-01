import { useState, useEffect } from 'react';
import api from '../api/api';
import BoardName from "./BoardName";
import NewWrite from "./NewWrite";
import Write from "./Write";
import Loader from './Loader';

const BoardCenter = () =>{
  const getBoard = window.localStorage.getItem("Board");
  const [boardDetail, setBoardDetail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChange, setIsChange] = useState(false);

  const changeLoading = (value) => {
    setLoading(value);
  };

  const changeIsChange = (value) => {
    setIsChange(value);
  };

  useEffect(() => {
    const boardData = async () => {
      try {
        const response = await api.boardPageBoardName(getBoard);
        setBoardDetail(response.data);
        console.log(response.data);//// 배열
      } catch(e) {
        console.log(e);
      }
    };
    boardData();
    console.log("isChange : " + isChange);
  },[isChange])

  // <Write/> 게시글 목록 있는 컴포넌트
  if(loading){
    return (<Loader/>)
  }
  
  return(
    // <div className="boardcenter">
    //   {boardDetail&&boardDetail.map(board => (
    //   <BoardName key={board.boardName} name={board.boardName} />))}
    //   <NewWrite changeIsChange={changeIsChange}/>
    //   <Write loading={loading} changeLoading={changeLoading}/> 
    //   {/* <Write/> */}
    // </div>
    <>
    {isChange && 
      <div className="boardcenter">
      {boardDetail&&boardDetail.map(board => (
      <BoardName key={board.boardName} name={board.boardName} />))}
      <NewWrite changeIsChange={changeIsChange}/>
      <Write loading={loading} changeLoading={changeLoading}/> 
      {/* <Write/> */}
    </div>}
    {!isChange && 
      <div className="boardcenter">
      {boardDetail&&boardDetail.map(board => (
      <BoardName key={board.boardName} name={board.boardName} />))}
      <NewWrite changeIsChange={changeIsChange}/>
      <Write loading={loading} changeLoading={changeLoading}/> 
      {/* <Write/> */}
    </div>}
    </>
  );
};
export default BoardCenter;