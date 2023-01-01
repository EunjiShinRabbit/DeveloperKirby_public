import { useState, useEffect } from "react";
import api from "../api/api";
import '../style/emailchange.scss';
import { Link } from "react-router-dom";


const EmailChange = () => {
    const [memberInfo, setMemberInfo] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const getNickname = window.localStorage.getItem("userNickname");

    //유효성 검사
    const [isEmail, setIsEmail] = useState(false)

    //오류메시지
    const [emailMessage, setEmailMessage] = useState("");

    //기존 이메일 출력
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
    }, []);

    //새 이메일 변경
    //변경을 누르면 새로운 이메일이 db에 변경됨
    const onClickEmailUpdate = async() => {
        try {
            const memberUpdate = await api.memberUpdate(inputEmail, "mail", getNickname);
            console.log(memberUpdate.data.result);
            
            if(memberUpdate.data.result === "OK") {
                window.location.replace("/memberInfo");
            } else {
            }
        } catch (e) {
            console.log(e);
            console.log("이메일 변경 에러...!");
        }
    }


    // const onChangemail = (e) => {
    //     setInputEmail(e.target.value)
    // }

    const onChangemail = (e) => {
        const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        const emailCurrent = e.target.value ;
        setInputEmail(emailCurrent);
        if (!emailRegex.test(emailCurrent)) {
            setEmailMessage('이메일 형식이 아닙니다.')
            setIsEmail(false)
        } else {
            setEmailMessage('')
            setIsEmail(true);
        }        
    }


    return (
        <div className="emailchange_container_first">
        <div className="emailchange_container">
            <p className="email_change">이메일 변경</p>
            <p className="email_current">현재 이메일 주소</p>
            {memberInfo && memberInfo.map(member => (
                <div key={member.nickname}>
                    <p className="email_current2">{member.email}</p>
                </div>
            ))}
            {/* <div >
                    <p className="email_current2">rabbit@gmail.com</p>
            </div> */}
            <p className="email_new">
                <p>새 이메일 주소</p>
                <input type="email" value={inputEmail} className="email_change_input" onChange={onChangemail}></input>
            </p>
            <div className="email_hint">
                {inputEmail.length > 0 && (
                <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>)}
            </div>
            <span className="email_change_yes" onClick={onClickEmailUpdate}>변경</span>
            <Link to='/memberinfo' className="email_cancle">취소</Link>
        </div>
        </div>
        
    )
} 
export default EmailChange;