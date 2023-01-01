import React from 'react';
import CommentList from "./CommentList";
import writeProfileImg from "../resource/kriby_study2.png";
import goodIcon from "../resource/kirby_icon6.png";
import commentIcon from "../resource/kirby_icon7.png"
import tomatoIcon from "../resource/kirby_icon6-1.png";
import writeIcon from "../resource/kirby_icon8.png";
import { useState, useEffect } from "react";
import api from "../api/api";
const WriteDetail = (props) =>{
  const getWriteNum = window.localStorage.getItem("Detail");
  const getMemberNum = window.localStorage.getItem("memberNum");
  const [writeDetail, setWriteDetail] = useState('');
  const [countGood, setCountGood] = useState('');

  const [isChange, setIsChange] = useState(false);
  const [isGoodChange, setIsGoodChange] = useState(false);

  const onClickGood = async () => {
    try {
      const response = await api.alreadyGood(getMemberNum, getWriteNum);
      if(response.data.cnt === 1) alert("이미 좋아요를 누른 게시글입니다.");
      else if(response.data.cnt === 0) 
      {
        await api.addGood(getWriteNum, getMemberNum);
        setIsGoodChange(!isGoodChange);
      }
    } catch(e) {
      console.log(e);
    }
  };

  const writeDelete = async () => {
    try {
      await api.writeDelete(getWriteNum);
      alert("게시글이 성공적으로 삭제되었습니다!")
      window.location.replace("/board");
    } catch(e) {
      console.log(e);
    }
  };


  useEffect(() => {
    const writeData = async () => {
      try {
        const response = await api.writeDetail(getWriteNum);
        setWriteDetail(response.data);
        console.log(38);
        console.log(response.data);
        console.log(response.data[0].boardName);
        localStorage.setItem("Board", response.data[0].boardName);
        props.changeIsChange(!(props.isChange));
      } catch(e)  {
        console.log(e);
      }
    };
    writeData();
  },[isGoodChange]);
  
  return(
    <div className="writedetail">
      {writeDetail && writeDetail.map(write => (
        <>
        <div className="wname"> 
        <p>{write.writeName}</p>
        <div className="writeprofile">
          {write.pfImg? <img className="writePfImg" src={write.pfImg} alt="댓글 프로필 이미지"/>:
          <img className="writePfImg" src={writeProfileImg} alt="게시글 기본 프로필 이미지"/>}
          <time>{write.writeDate}</time>
          <h3 className="nickname">{write.nickname}</h3>
          {write.nickname == localStorage.getItem("userNickname") && 
          <span className="writedelete" onClick={()=>{
            writeDelete()}}>삭제</span>}
        </div>
      </div>
      <p className="wcontent" >
        {write.writeContent}
        </p>
      <ul className="status">
        <li className="good">
          <img src={goodIcon} alt="좋아요"/>
          <span>{write.countGood}</span>
        </li>
        <li className="comment">
          <img src={commentIcon} alt="댓글"/>
          <span>{write.countComments}</span>
        </li>
      </ul>
      <button className="goodbtn" onClick={onClickGood}>
        <img src={tomatoIcon} alt="맥시멈토마토"/>
        <p>{write.countGood}</p>
      </button>
        </>
        
      ))}
      <CommentList/>
    </div>
  );
};
export default WriteDetail;