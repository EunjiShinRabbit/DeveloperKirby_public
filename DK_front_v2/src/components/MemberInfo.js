import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/member.scss"
import defaultProfileImg from "../resource/kriby_study2.png";
import rankIcon1 from "../resource/kirby_icon1.png";
import rankIcon2 from "../resource/kirby_icon2.png";
import rankIcon3 from "../resource/kirby_icon3.png";
import rankIcon4 from "../resource/kirby_icon4.png";
import rankIcon5 from "../resource/kirby_icon5.png";
import ChangeMemberInfo from "./ChangeMemberInfo";
import MyWrite from "./MyWrite";
import api from "../api/api";
import UnReg from "./UnReg";

const MemberInfo = () =>{
  const [memberInfo, setMemberInfo] = useState('');
  const getNickname = window.localStorage.getItem("userNickname");
  const [isChange, setIsChange] = useState('');
  const changeIsChange = (value) => {
    setIsChange(value);
  };
  useEffect(() => {    
    const memberData = async () => {
        try {
            const response = await api.memberInfo(getNickname);
            setMemberInfo(response.data);
            console.log(response.data)
        } catch (e) {
            console.log(e);
        }
    };
    memberData();
  }, [isChange]);

  const memberInsert = () =>{
    const fetchSearchData = async () => {
       try {
         const response = await api.memberInsert();
         if (response.data.result === "OK"){

         }
       } catch (e) {
         console.log(e);
       }
     };
    fetchSearchData();
  }


  return(
    <div className="memberinfomain">
      <div className="memberinfoheader">
        <div className="profilecard">
          {memberInfo && memberInfo.map(member => (
            <>
            <div className="profileimg">
            {member.pfImg? <img src={member.pfImg} alt="프로필 이미지"/> :
            <img src={defaultProfileImg} alt="기본 프로필 이미지(공부하는 커비)"/>}
            </div>
            <div className="profileinfo">
              <div key={member.nickname}>
                  <p>회원번호 : {member.member_num}</p>
                  <p>닉네임 : {member.nickname}</p>
                  <p>가입일 : {member.regDate}</p>
                  <p>전화번호 : {member.phone}</p>
                  <p>이메일 : {member.email}</p>
                  <p>회원등급 : <img className="memberrankimg" src={
                  member.grade === "새싹"? rankIcon1 : (member.grade === "잎새"? rankIcon2 : 
                  (member.grade === "가지열매나무"? rankIcon3 : (member.grade === "열매"? rankIcon4:rankIcon5)))
                  } alt={member.grade}/>{member.grade}
                  </p>
              </div>
            </div>
            </>
          ))}
          <Link to="/login" className="logout">로그아웃</Link>
        </div>
      </div>
      <div className="memberinfocenter">
        <ChangeMemberInfo changeIsChange={changeIsChange}/>
        <MyWrite/>
        <UnReg />
      </div>
    </div>
  );
};
export default MemberInfo;