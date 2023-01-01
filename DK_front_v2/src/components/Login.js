import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../resource/sleep_kirby.gif";
import api from "../api/api";
import { isLogin } from "../util/common";

const Login = () =>{
  const [inputNickname, setInputNickname] = useState('');
  const [inputPwd, setInputPwd] = useState('');

  const [nicknameMsg, setNicknameMsg] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');

  const [isNickname, setIsNickname] = useState('');
  const [isPwd, setIsPwd] = useState('');

  const pwdRegEx = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,20}$/;

  const onChangeNickname = (e) =>{
    setInputNickname(e.target.value);
    const nickname = e.target.value;
    if(nickname.length > 10){
      setIsNickname(false);
      setNicknameMsg("닉네임은 한글 최대 10글자까지 가능합니다!");
    } else{
      setIsNickname(true);
    }
  };

  const onChangePwd = (e) => {
    setInputPwd(e.target.value);
    const pwd = e.target.value ;
    if(pwdRegEx.test(pwd)){
      setIsPwd(true);
    } else {
      setPwdMsg("비밀번호 형식을 확인해주세요!");
      setIsPwd(false);
    }
  }

  const onClickLogin = async() => {
    try {
      // 로그인을 위한 axios 호출
      const res = await api.userLogin(inputNickname, inputPwd);
      console.log(res.data.result);
      if(res.data.result === "OK") {
        window.localStorage.setItem("memberNum", res.data.memberNum);
        window.localStorage.setItem("userNickname", inputNickname);
        window.location.replace("/main");
      } else {
        setIsPwd(false);
        setPwdMsg("닉네임 또는 비밀번호를 확인해주세요");
      }
    } catch (e) {
      console.log("로그인 에러..");
      console.log(e);
    }
  }

  if(isLogin){
    window.location.replace("/main");
  }

  // const [mail, setMail] = useState('');

  // const handleChange = (e) => {
  //   console.log("선택한 값 :" + e.target.value );
  //   setMail(e.target.value);
  // }

  return(
    <>
    {/* <label><input type="radio" name="selectBtn" value="notice" onChange={handleChange}/> 공지사항 </label>
    <label><input type="radio" name="selectBtn" value="ad" onChange={handleChange}/> 광고 </label> */}
    <div className="loginBox">
      <div className="logostart">
        <img src={logo} alt="개발하는커비"/>
        <span>지금 개발하는 커비를 시작하세요!</span>
      </div>
      <div className="loginform">
        {/* <label htmlFor="nickname">닉네임</label> */}
        <input type="text" name="nickname" value={inputNickname} onChange={onChangeNickname} placeholder="닉네임"></input>
        {!isNickname && <span className="err">{nicknameMsg}</span>}
        {/* <label htmlFor="pwd">비밀번호</label> */}
        <input type="password" name="pwd" value={inputPwd} onChange={onChangePwd} placeholder="비밀번호"></input>
        {!isPwd && <span className="err">{pwdMsg}</span>}
        {!(isNickname && isPwd) && <button className="regchkbtnf">로그인</button>}
        {(isNickname && isPwd) && <button className="regchkbtnt" onClick={onClickLogin}>로그인</button>}
      </div>
      <p><span>개발하는 커비가 처음이신가요?</span><Link to="/jointerm">회원가입</Link></p>
    </div>
    </>
  );
};
export default Login;
