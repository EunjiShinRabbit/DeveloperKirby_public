import React from 'react';
// import ReactDOM from 'react-dom';
import { useState } from "react";
import "../style/UnReg2.scss";
import api from '../api/api';
import { Link } from 'react-router-dom';

const UnReg2 = () => {
    const userNickname = window.localStorage.getItem("userNickname");
    const userPwd =  window.localStorage.getItem("userPwd");

    const [inputPwd, setInputPwd] = useState('');

    //오류 메시지
    const [pwMessage, setPwMessage] = useState("");
    const pwdRegEx = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,20}$/;

    //비밀번호 일치 ck
    const onChangepwd = (e) => {
      const passwordCurrent = e.target.value;
      setInputPwd(passwordCurrent)
      if(pwdRegEx.test(passwordCurrent)){
        setPwMessage('비밀 번호가 일치 합니다.')
      } else {
        setPwMessage('비밀 번호 형식이 일치하지 않습니다.')
      } 
    }

    // const onChangepwd = (e) => {
    //   setInputPwd(e.target.value)
    // }

    //현재 비밀번호 맞는지 ck
    const onClickMemberdel = async() => {
      try {
          const res = await api.userLogin(userNickname, inputPwd);
          console.log(res.data);
          if(res.data.result === "OK") {
            onClickMemberdel2();
          }        
      } catch (e) {
          console.log("로그인 에러..");
      }
  }

    //회원탈퇴
    const onClickMemberdel2 = async() => {
        try {
          const res = await api.memberDelete();
          console.log(res.data.result);
          
          if(res.data.result === "OK") {
            localStorage.removeItem("memberNum");
            localStorage.removeItem("userNickname");
            window.location.replace("/login");
          } else {
          }
        } catch (e) {
          console.log("회원탈퇴 에러..");
          console.log(e);
        }
    }

    return (
      <div className='unRegck_container_first'>
        <div className='unRegck_container'>
            {/* <Header /> */}
            <div className='unRegck'>
            <p className='unRegck_1'>지금 개발하는커비를 탈퇴하시면<br />작성한 게시글과 댓글이 모두 삭제됩니다.<br/>
              정말 탈퇴하시겠습니까?</p>
            <p className='unRegck_nickname'>닉네임 : {userNickname}</p>
            <p className='unRegck_pwd'>비밀번호 : <input type='password' className='unRegck_pwd2' onChange={onChangepwd}></input></p>
            {/* <div className="unRegPwd_hint">
                {inputPwd.length > 0 && (
                <span className={`message ${isPw ? 'success' : 'error'}`}>{pwMessage}</span>)}
            </div> */}
            <div className="unRegPwd_hint">
                {inputPwd.length > 0 && (
                <span>{pwMessage}</span>)}
            </div>
            <span className='unRegck_yes' onClick={onClickMemberdel}>회원탈퇴</span>
            <Link to='/memberinfo' className='unRegck_cancle'>취소</Link>
            </div>
        </div>
        </div>         
    )
}
export default UnReg2;