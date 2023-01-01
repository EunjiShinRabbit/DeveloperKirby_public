import { useState, useEffect } from "react";
import api from "../api/api";
import '../style/pwdchange.scss';
import { Link } from "react-router-dom";


const PwdChange = () => {
    const [memberInfo, setMemberInfo] = useState('');
    const [inputPwd1, setInputPwd1] = useState('');
    const [inputPwd2, setInputPwd2] = useState('');
    const [inputPwd3, setInputPwd3] = useState('');
    const getNickname = window.localStorage.getItem("userNickname");
    const getPwd =  window.localStorage.getItem("userPwd");

    //오류메시지
    const [pwMessage, setPwMessage] = useState("");
    const [conPwMessage, setConPwMessage] = useState("");
    const [conPwMessage2, setConPwMessage2] = useState("");

    // 유효성 검사
    const [isPw, setIsPw] = useState(false)
    const [isConPw, setIsConPw] = useState(false);


    //현재 비밀번호 맞는지 ck
    const onClickPwdUpdate1 = async() => {
        try {
            const res = await api.userLogin(getNickname, inputPwd1);
            console.log(res.data);
            if(res.data.result === "OK") {
                console.log("비밀번호 체크중");
                onClickPwdUpdate2();
            } else {
            }           
        } catch (e) {
            console.log("로그인 에러..");
        }
    }
    //새 비밀번호 변경
    const onClickPwdUpdate2 = async() => {
        try {
            const memberUpdate = await api.memberUpdate(inputPwd3, "pwd", getNickname);
            console.log(memberUpdate.data.result);
            
            if(memberUpdate.data.result === "OK") {
                window.location.replace("/memberInfo");
            } else {
            }
        } catch (e) {
            console.log(e);
            console.log("비밀번호 변경 에러...!");
        }
    }
    //새 비밀번호 유효성 ck
    const onChangepwd2 = (e) => {
        //const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,20}$/
        const passwordCurrent = e.target.value ;
        setInputPwd2(passwordCurrent);
        if (!passwordRegex.test(passwordCurrent)) {
            setPwMessage('영소문자+숫자+특수문자 8자리 이상 20자리 이하 입력해주세요!')
            setIsPw(false)
        } else {
            setPwMessage('안전한 비밀번호에요 : )')
            setIsPw(true);
        }        
    }

    //새 비밀번호 확인 일치 ck
    const onChangepwd3 = (e) => {
        const passwordCurrent2 = e.target.value;
        setInputPwd3(passwordCurrent2)
        if (passwordCurrent2 !== inputPwd2) {
            setConPwMessage2('비밀 번호가 일치하지 않습니다.')
            setIsConPw(false)
        } else {
            setConPwMessage2('비밀 번호가 일치 합니다. )')
            setIsConPw(true);
        }      
    }
    //현재 비밀번호 맞는지 ck
    const onChangepwd1 = (e) => {
        const passwordCurrent = e.target.value;
        setInputPwd1(passwordCurrent)
        if (passwordCurrent !== getPwd) {
            setConPwMessage('비밀 번호가 일치하지 않습니다.')
            setIsConPw(false)
        } else {
            setConPwMessage('비밀 번호가 일치 합니다.')
            setIsConPw(true);
        }      
    }

    return (
        <div className="pwdchange_container_first">
        <div className="pwdchange_container">
            <p className="pwd_change">비밀번호 변경</p>
            <p className="pwd_current">현재 비밀번호
            <input type="password" value={inputPwd1} className="pwd_change_input" onChange={onChangepwd1}></input>
            </p>
            <div className="current_pwd_hint">
            {inputPwd1.length > 0 && (
                <span className={`message ${isConPw ? 'success' : 'error'}`}>{conPwMessage}</span>)}
            </div>
            <p className="pwd_change_ck">새 비밀번호
            <input type="password" value={inputPwd2} className="pwd_change_input" onChange={onChangepwd2}></input>
            </p>
            <div className="pwd_hint">
                {inputPwd2.length > 0 && (
                <span className={`message ${isPw ? 'success' : 'error'}`}>{pwMessage}</span>)}
            </div>
            <p className="pwd_change_ck2">새 비밀번호 확인
            <input type="password" value={inputPwd3} className="pwd_change_input" onChange={onChangepwd3}></input>
            </p>
            <div className="pwd_hint2">
                {inputPwd3.length > 0 && (
                <span className={`message ${isConPw ? 'success' : 'error'}`}>{conPwMessage2}</span>)}
            </div>
            <span className="pwd_change_yes" onClick={onClickPwdUpdate1}>변경</span>
            <Link to='/memberinfo' className="pwd_cancle">취소</Link>
        </div>
        </div>
    )
} 
export default PwdChange;