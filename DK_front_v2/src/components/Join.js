import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../resource/sleep_kirby.gif";
import "../style/join.scss"
import api from "../api/api";

const Join = ()=>{

  if(!localStorage.getItem("adOk")){
    window.location.replace("/jointerm");
  }

  const [nickname, setNickname] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdchk, setPwdchk] = useState('');
  const [email, setEmail] = useState('');
  const [phonereg, setPhonereg] = useState("+82");
  const [phone, setPhone] = useState('');
  const [phonever, setPhonever] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
 
  const [nicknameMsg, setNicknameMsg] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');
  const [pwdchkMsg, setPwdchkMsg] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const [phoneregMsg, setPhoneregMsg] = useState('');
  const [phoneMsg, setPhoneMsg] = useState('');
  const [phoneverMsg, setPhoneverMsg] = useState('');

  const [nicknameOkMsg, setNicknameOkMsg] = useState('');
  const [pwdOkMsg, setPwdOkMsg] = useState('');
  const [pwdchkOkMsg, setPwdchkOkMsg] = useState('');
  const [emailOkMsg, setEmailOkMsg] = useState('');
  const [phoneregOkMsg, setPhoneregOkMsg] = useState('');
  const [phoneOkMsg, setPhoneOkMsg] = useState('');
  const [phoneverOkMsg, setPhoneverOkMsg] = useState('');

  const [isNickname, setIsNickname] = useState('');
  const [isNicknamechk, setIsNicknamechk] = useState(false);
  const [isPwd, setIsPwd] = useState('');
  const [isPwdchk, setIsPwdchk] = useState('');
  const [isEmail, setIsEmail] = useState('');
  const [isPhonereg, setIsPhonereg] = useState('');
  const [isPhone, setIsPhone] = useState('');
  const [isPhonever, setIsPhonever] = useState('');
  const [isOnPhoneReg, setIsOnPhoneReg] = useState(false);

  // 비밀번호, 비밀번호 확인 자물쇠 배경 위한 useState, white, red, blue 
  const [pwdlock, setPwdlock] = useState('white');
  const [pwdchklock, setpwdchklock] = useState('white');


  const onClickNickdup = () =>{
    console.log("닉네임 중복체크를 할때 들어온 값" + nickname);
    if((nickname.length !== 0) &&(nickname.length <= 10)){
      const fetchSearchData = async () => {
        try {
          const response = await api.memberNameDup(nickname);
          if (response.data.result === "OK"){
            setIsNicknamechk(true);
            setIsNickname(true);
            setNicknameOkMsg("사용 가능한 닉네임 입니다!");
            setIsOnPhoneReg(true);
          } else if(response.data.result === "NOK"){
            setIsNicknamechk(false);
            setIsNickname(false);
            setNicknameMsg("이미 존재하는 닉네임입니다!");
          }
        } catch (e) {
          console.log(e);
        }
      };
    fetchSearchData();
    } else{
      setIsNicknamechk(false);
      setIsNickname(false);
      setNicknameMsg("닉네임 형식을 확인 후 중복 체크를 해주세요!");
    }
  };

  const memberPhoneReg = () =>{
    const fetchSearchData = async () => {
      console.log("인증번호 요청하는 전화번호" + phone);
      try {
         const response = await api.memberPhoneReg(phone);
         console.log(response.data.result);
         setVerifyCode(response.data.code);
        //  console.log(response.data.code);
         if (response.data.result === "OK"){
           setPhoneOkMsg("인증번호가 발송되었습니다!");
         } else if(response.data.result === "DUP"){
          setIsPhone(false);
          setPhoneMsg("이미 가입된 전화번호입니다!");
         }else{
          setIsPhone(false);
          setPhoneMsg("인증번호 발송에 실패했습니다!");
         }
       } catch (e) {
         console.log(e);
       }
     };
    fetchSearchData();
  }

  const memberPhoneRegChk = () =>{
    if(phonever == verifyCode){
      setIsPhonever(true);
      setPhoneverOkMsg("인증번호가 확인되었습니다!");
      setVerifyCode('');
    } else{
      setIsPhonever(false);
      setPhoneverMsg("인증번호 확인에 실패했습니다!")
    }
  }

  const memberInsert = () =>{
    const fetchData = async () => {
      try {
        const response = await api.memberInsert(nickname, pwd, phone, email);
        if (response.data.result === "OK"){
          window.localStorage.setItem("memberNum", response.data.memberNum);
          window.localStorage.setItem("userNickname", nickname);
          localStorage.removeItem("adOk")
          window.location.replace("/main");
          alert("회원가입에 성공했습니다!!~!!~!!");
        } else{
          alert("회원가입에 실패했습니다 ㅠㅡㅠ");
        }
       } catch (e) {
         console.log(e);
       }
     };
    fetchData();
  }

  // 정규식
  // 패스워드 입력 조건 대문자, 소문자, 특수문자 포함 8자리 이상 20자리 이하
  const pwdRegEx = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,20}$/;
  // 이메일 - 일반적인 규칙
  const emailRegEx = /^([a-z]+\d*)+(\.?\w+)+@\w+(\.\w{2,3})+$/;
  // 전화번호 - 일반적인 규칙
  const phoneRegEx = /^\d{2,3}-\d{3,4}-\d{4}$/;

  const onChangeNickname = (e) =>{
    // console.log("onChange 이벤트 불러짐");
    // console.log(e.target.value);
    setNickname(e.target.value);
    const inputNickname = e.target.value;
    // console.log("들어온 값: "+ inputNickname);
    setIsNicknamechk(false);
    setIsNickname(false);

    if(inputNickname.length > 10){
      setIsNickname(false)
      setNicknameMsg("닉네임은 한글 최대 10글자까지 가능합니다!");
    } else if(!isNicknamechk){
      setIsNickname(false)
      setNicknameMsg("닉네임 중복 확인이 필요합니다!");
    }
  };

  const onChangePwd = (e) =>{
    setPwd(e.target.value);
    const inputPwd = e.target.value;
    setIsPwd(false);
    if(pwdRegEx.test(inputPwd)){
      setIsPwd(true);
      setPwdOkMsg("사용 가능한 비밀번호 입니다!");
    } else if(inputPwd.length === 0){
      setIsPwd(false);
      setPwdMsg("비밀번호는 필수 항목입니다!");
    } else{
      setIsPwd(false);
      setPwdMsg("비밀번호는 소문자, 숫자, 특수문자를 최소 1개 포함하고 8자이상 20자 이하 입니다!");
    }
  };

  const onChangePwdchk = (e) =>{
    setPwdchk(e.target.value);
    const inputPwdchk = e.target.value;
    setIsPwdchk(false);
    if(pwd.length === 0){
      setIsPwdchk(false);
      setPwdchkMsg("비밀번호 항목을 먼저 확인해주세요!");
    } else if(inputPwdchk.length === 0){
      setIsPwdchk(false);
      setPwdchkMsg("비밀번호 확인은 필수 항목입니다!");
    } else if(pwdRegEx.test(inputPwdchk) && inputPwdchk === pwd){
      setIsPwdchk(true);
      setPwdchkOkMsg("비밀번호 확인이 완료되었습니다!");
    } else{
      setIsPwdchk(false);
      setPwdchkMsg("비밀번호 확인이 비밀번호와 일치하지 않습니다!");
    }
  };

  const onChangeEmail = (e) =>{
    setEmail(e.target.value);
    const inputEmail = e.target.value;
    setIsEmail(false);
    if(emailRegEx.test(inputEmail)){
      setIsEmail(true);
      setEmailOkMsg("사용 가능한 이메일 입니다!");
    } else{
      setIsEmail(false);
      setEmailMsg("이메일 형식을 확인해주세요!");
    }
  };
  const onChangePhonereg = (e) =>{
    setPhonereg(e.target.value);
  };

  useEffect(() => {
    if (phone.length === 11) {
      setPhone(phone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
    if(phoneRegEx.test(phone)){
      setIsPhone(true);
      setPhoneOkMsg("사용 가능한 전화번호 입니다!");
    }
  }, [phone]);

  const onChangePhone = (e) =>{
    const inputPhone = e.target.value;
    setPhone(e.target.value);
    setIsPhone(false);
    if(phoneRegEx.test(inputPhone)){
      setIsPhone(true);
      setPhoneOkMsg("사용 가능한 전화번호 입니다!");
    } else if (inputPhone.length === 0){
      setIsPhone(false);
      setPhoneMsg("전화번호는 필수 항목입니다!");
    } else {
      setIsPhone(false);
      setPhoneMsg("전화번호 형식을 확인해주세요!");
    }
  };
  
  const onChangePhonever = (e) =>{
    setPhonever(e.target.value);
  };

  const onBlurNickname = (e) =>{
    if(e.target.value.length === 0){
      setNicknameMsg("닉네임은 필수 항목입니다!");
    }
  };
  const onBlurPwd = (e) =>{
    if(e.target.value.length === 0){
      setPwdMsg("비밀번호는 필수 항목입니다!");
    }
  };
  const onBlurPwdchk = (e) =>{
    if(e.target.value.length === 0){
      setPwdchkMsg("비밀번호 확인은 필수 항목입니다!");
    }
  };
  const onBlurEmail = (e) =>{
    if(e.target.value.length === 0){
      setEmailMsg("이메일은 필수 항목입니다!");
    }
  };
  const onBlurPhone = (e) =>{
    if(e.target.value.length === 0){
      setPhoneMsg("전화번호는 필수 항목입니다!");
    }
  };
  const onBlurPhonever = (e) =>{
    if(e.target.value.length === 0){
      setPhoneverMsg("인증번호는 필수 항목입니다!");
    }
  };

  return(
    <div className="joinmain">
      <div className="logo">
        <Link to="/"><img src={logo} alt="개발하는 커비"/></Link>
        <Link to="/">개발하는 커비</Link>
      </div>
      <div div className="join">
        <div action="#" className="joinform">
          <div className="nicknamebox">
            <label htmlFor="nickname">닉네임</label>
            <div className="nicknameinput">
              <input type="text" value={nickname} name="nickname" id="nickname" className="nickname" 
              onChange={onChangeNickname} onBlur={onBlurNickname} placeholder="닉네임을 입력해 주세요"/>
              <button type="button" className="nickdup" onClick={onClickNickdup}>중복 확인</button>
            </div>
            {!isNickname && <span className="err">{nicknameMsg}</span>}
            {isNickname && <span className="msg">{nicknameOkMsg}</span>}
          </div>

          <div className="pwdbox">
            <label htmlFor="pwd">비밀번호</label>
            <div className="pwdinput">
              <input type="password" value={pwd} name="pwd" id="pwd" className="pwd"
              onChange={onChangePwd} onBlur={onBlurPwd} placeholder="비밀번호를 입력해 주세요"/>
            </div>
            {!isPwd && <span className="err">{pwdMsg}</span>}
            {isPwd && <span className="msg">{pwdOkMsg}</span>}
          </div>

          <div className="pwdchkbox">
            <label htmlFor="pwdchk">비밀번호 확인</label>
            <div className="pwdchkinput">
              <input type="password" value={pwdchk} name="pwdchk" id="pwdchk" className="pwdchk" 
              onChange={onChangePwdchk} onBlur={onBlurPwdchk} placeholder="비밀번호를 확인해 주세요"/>
            </div>
            {!isPwdchk && <span className="err">{pwdchkMsg}</span>}
            {isPwdchk && <span className="msg">{pwdchkOkMsg}</span>}
          </div>

          <div className="emailbox">
            <label htmlFor="email">본인 확인 이메일</label>
            {/* <span className="selection">(선택)</span> */}
            <div className="emailinput">
              <input type="email" value={email} name="email" id="email" className="email" 
              onChange={onChangeEmail} onBlur={onBlurEmail} placeholder="이메일을 입력해 주세요"/>
            </div>
            {!isEmail && <span className="err">{emailMsg}</span>}
            {isEmail && <span className="msg">{emailOkMsg}</span>}
          </div>

          <div className="phonebox">
            <label htmlFor="phone">휴대전화</label>
            <select name="phonereg" id="phonereg" className="phonereg" value={phonereg} onChange={onChangePhonereg}>
              {/* <option value="+1">미국/캐나다 +1</option>
              <option value="+44">영국 +44</option>
              <option value="+61">호주 +61</option>
              <option value="+81">일본 +81</option> */}
              <option value="+82">대한민국 +82</option>
              {/* <option value="+852">홍콩 +852</option> */}
              {/* 해외에 인증 문자보내는게 테스트도 어렵고 유료라서 보류 */}
            </select>

            <div className="phoneinput">
              <input type="tel" value={phone} name="phone" id="phone" className="phone" 
              onChange={onChangePhone} onBlur={onBlurPhone} placeholder="전화번호를 입력해 주세요"/>
              <button type="button" className="phoneverbtn" onClick={memberPhoneReg}
              disabled={!isPhone}>인증번호 받기</button>
            </div>
            {!isPhone && <span className="err">{phoneMsg}</span>}
            {isPhone && <span className="msg">{phoneOkMsg}</span>}
            <div className="phoneverinput">
              <input type="text" value={phonever} name="phonevernum" id="phonevernum" className="phonevernum" 
              onChange={onChangePhonever} onBlur={onBlurPhonever} placeholder="인증번호를 입력해 주세요"/>
              <button type="button" className="vernumchk" onClick={memberPhoneRegChk}
              >인증번호 확인</button>
              {/* disabled={!isOnPhoneReg} */}
            </div>
            {!isPhonever && <span className="err">{phoneverMsg}</span>}
            {isPhonever && <span className="msg">{phoneverOkMsg}</span>}
          </div>
          {!(isNickname&&isPwd&&isPwdchk&&isPhone&&isPhonever&&isEmail) 
          && <button type="button" className="regchkbtnf">가입하기</button>}
          { (isNickname&&isPwd&&isPwdchk&&isPhone&&isPhonever&&isEmail) 
          && <button type="button" className="regchkbtnt" onClick={memberInsert}>가입하기</button>}
        </div>
      </div>
    </div>
  );

};
export default Join;