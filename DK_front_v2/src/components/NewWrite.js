import { useState } from "react";
import { Link } from "react-router-dom";
import writeIcon from "../resource/kirby_icon8.png";
import WriteBox from "./WriteBox";
const NewWrite = (props) =>{
  
  const [writeAction, setWriteAction] = useState(false);
  const onClickWrite = () =>{
    setWriteAction(true);
  }
  const onDoubleClickWrite = () =>{
    setWriteAction(false);
  }
  const changeWriteAction = (val) =>{
    setWriteAction(val);
    props.changeIsChange(val);
  }
  return(
    <div className="newwrite">
      <Link href="#" className="newwriteheader" onClick={onClickWrite} onDoubleClick={onDoubleClickWrite}>
        <p>새 글을 작성해주세요!</p>
        <img src={writeIcon} alt="글쓰기아이콘"/>
      </Link>
      {writeAction && <WriteBox  changeIsChange={props.changeIsChange} 
      changeWriteAction={changeWriteAction}/>}
    </div>
  );
  
};
export default NewWrite;