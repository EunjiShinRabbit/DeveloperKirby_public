import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from "../api/api";
const Hot = (props) =>{
  const [RightBoardInfo, setRightBoardInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const onClickWrite = (val) => {
    console.log("상세 게시글로 이동 : " + val)
    window.localStorage.setItem("Detail", val);
  }

  useEffect(() => {
    if(props.name === "실시간 인기 글") {
      const HotBoardData = async () => {
        try {
            const response = await api.hotBoardDetail(); // 
            setRightBoardInfo(response.data);
            console.log(response.data)
        } catch (e) {
            console.log(e);
        }
      };
      HotBoardData();
    } else if (props.name === "최근 댓글" ){
      const NewComBoardData = async () => {
        try {
            const response = await api.newComBoardDetail(); // 
            setRightBoardInfo(response.data);
            console.log(response.data)
        } catch (e) {
            console.log(e);
        }
    };
    NewComBoardData();
    }
  }, []);

  return(
    <div className="hot">
      <Link to="/board" className="hotboardname">{props.name}</Link>
      {RightBoardInfo && RightBoardInfo.map(board => (
        <Link to="/write" className="hotwritename" onClick={()=>onClickWrite(board.writeNum)} >{board.writeName}</Link>
      )) 
      }
    </div>
  );
};
export default Hot;