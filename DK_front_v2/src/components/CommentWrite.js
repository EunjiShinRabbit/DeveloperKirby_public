import { Link } from "react-router-dom";
import goodIcon from "../resource/kirby_icon6.png";
import commentIcon from "../resource/kirby_icon7.png";
import { useState, useEffect } from "react";
import api from "../api/api";

const CommentWrite = () =>{

  const [myWrite, setmyWrite] = useState('');
  const getNickname = window.localStorage.getItem("userNickname");

  useEffect(() => {    
    const memberData = async () => {
        try {
            const response = await api.myWriteSearch(getNickname);
            setmyWrite(response.data);
            console.log(response.data)
        } catch (e) {
            console.log(e);
        }
    };
    memberData();
  }, []);

  return(
    <div className="write">
      {/* <Link to="#">
        <h2 className="wname">귀여운 커비</h2>
        <p className="wcontent">
          봄바람과 함께 푸푸푸랜드에 찾아온 모험의 용사<br/>
          적을 빨아들이고 능력을 카피해, 변신하기도!<br/>
          무기를 휘두르고, 신기한 기술도 사용하고, 때로는 모습을 바꿔 활약!!</p>
        <time>방금</time>
        <h3 className="nickname">와들디</h3>
        <ul className="status">
          <li className="good">
            <img src={goodIcon} alt="좋아요"/>
            <span>0</span>
          </li>
          <li className="comment">
            <img src={commentIcon} alt="댓글수"/>
            <span>0</span>
          </li>
        </ul>
      </Link> */}

      <Link to='#'>
        {myWrite && myWrite.map(myWrite => (
                    <div key={myWrite.nickname}>
        <h2 className="wname">{myWrite.writeNum}{myWrite.writeName}</h2>
        <p className="wcontent">
        {myWrite.writeContents}
        </p>
        <time>{myWrite.writeDate}</time>
        <h3 className="nickname">{myWrite.nickname}</h3>
        <ul className="status">
          <li className="good">
            <img src={goodIcon} alt="좋아요"/>
            <span>{myWrite.countGood}</span>
          </li>
          <li className="comment">
            <img src={commentIcon} alt="댓글수"/>
            <span>0</span>
          </li>
        </ul>
        </div>
          ))}
          </Link>


      {/* <div className="profileinfo">
          {myWrite && myWrite.map(myWrite => (
                    <div key={myWrite.nickname}>
                        <p>{myWrite.nickname}</p>
                        <p>{myWrite.writeNum}</p>
                        <p>{myWrite.writeName}</p>
                        <p>{myWrite.writeContents}</p>
                        <p>{myWrite.writeDate}</p>
                        <p>{myWrite.countGood}</p>
                    </div>
          ))}
          </div> */}
    </div>
  );
};
export default CommentWrite;