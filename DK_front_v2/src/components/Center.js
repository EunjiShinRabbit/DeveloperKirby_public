import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from '../api/api';
const Center = (props) =>{
  const [boardInfo, setBoardInfo] = useState('');
    const [loading, setLoading] = useState(false);
    // const isLogin = window.localStorage.getItem("isLogin");
    // if(isLogin === "FALSE") window.location.replace("/")

    const onClickBoard = (val) => {
      console.log("게시판으로 이동 : " + val)
      window.localStorage.setItem("Board", val); // 게시판 이름 로컬 스토리지에 저장
    }
  
    const onClickWrite = (val) => {
      console.log("상세 게시글로 이동 : " + val)
      window.localStorage.setItem("Detail", val);
    }
  
    useEffect(() => {  
      const boardData = async () => {
          setLoading(true);
          try {
              const response = await api.boardDetail(); // 전체 회원 조회
              setBoardInfo(response.data);
              console.log(response.data)
          } catch (e) {
              console.log(e);
          }
          setLoading(false);
      };
      boardData();
  }, []);
  return(
    <div className={props.position + "center"}>
      {boardInfo && boardInfo.map(({boardName, mainWrites}) => (
        <div className="board">
         <Link to="/board" className="mainboardname" onClick={()=>onClickBoard(boardName)}>{boardName}</Link>
         {mainWrites && mainWrites.map(({writeName, writeDate, writeNum}) => (
          <Link to="/write" className="mainwritename" onClick={()=>onClickWrite(writeNum)}>{writeName}<span className='maintime'>{writeDate}</span></Link>
         ))}
        </div>
      ))}
    </div>
  );
};
export default Center;