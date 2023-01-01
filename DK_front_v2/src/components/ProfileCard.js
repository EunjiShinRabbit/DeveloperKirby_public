import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultProfileImg from "../resource/kriby_study2.png";
import rankIcon1 from "../resource/kirby_icon1.png";
import rankIcon2 from "../resource/kirby_icon2.png";
import rankIcon3 from "../resource/kirby_icon3.png";
import rankIcon4 from "../resource/kirby_icon4.png";
import rankIcon5 from "../resource/kirby_icon5.png";
import { logout } from "../util/common";
import api from "../api/api";

const ProfileCard = ()=>{

  const [lists, setLists] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.memberInfo();
        setLists(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return(
    <div className="profilecard">
      {lists && lists.map(({ memberNum, nickname, grade, countWrite, countComment, phone, email, regDate, pfImg, isAdOk }) => (
        <>
        <div className="profileimg">
          <img src={pfImg? pfImg : defaultProfileImg} alt="프로필 이미지"/>
        </div>
        <p>{nickname}</p>
        <p>
          <Link to="#">
            <img src={
              grade === "새싹"? rankIcon1 : (grade === "잎새"? rankIcon2 : 
              (grade === "가지열매나무"? rankIcon3 : (grade === "열매"? rankIcon4:rankIcon5)))
            } alt={grade}/>
            {grade}
          </Link>
        </p>
        </>
        ))}
      <p><Link to="/memberinfo">내 정보</Link><Link to="#" onClick={logout}>로그아웃</Link></p>
    </div>
  );
};

export default ProfileCard;