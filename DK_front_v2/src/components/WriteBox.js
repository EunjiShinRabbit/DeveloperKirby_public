import { useState } from "react";
import writeIcon from "../resource/kirby_icon8.png";
import  api  from "../api/api.js"

const WriteBox = (props)=>{
  const getBoardName = window.localStorage.getItem("Board");
  const getMemberNum = window.localStorage.getItem("memberNum");
  const [writeName, setWriteName] = useState('');
  const [writeContents, setWriteContents] = useState('');

  let cnt = 0;

  const onChangeWriteName = (e) => {
    setWriteName(e.target.value);
    console.log(e.target.value)
  }
  const onChangeWriteContent = (e) => {
    setWriteContents(e.target.value);
  }
  
  const NewWriteReg = async () => {
    try {
        await api.NewWriteReg(getBoardName, writeName, getMemberNum, writeContents);
    } catch(e) {
        console.log(e);
    }
    props.changeWriteAction(false);
    // window.location.replace("/board");
    props.changeIsChange(true);
  };

  return(
    <div className="writebox">
      <div className="form">
        <input type="text" name="writename" className="writename" 
        placeholder="글제목" onChange={onChangeWriteName}/>
        <textarea name="writecontent" className="writecontent" 
        placeholder="글내용" onChange={onChangeWriteContent} cols="900" wrap="hard"></textarea>
        <button onClick={NewWriteReg}>등록 <img src={writeIcon} alt="글쓰기아이콘"/></button>
      </div>
    </div>
  );
};

export default WriteBox;