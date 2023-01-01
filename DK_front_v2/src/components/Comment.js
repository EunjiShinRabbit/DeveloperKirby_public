import commentProfileImg from "../resource/kriby_study2.png";
import { useState, useEffect } from "react";
import api from "../api/api";
import writeIcon from "../resource/kirby_icon8.png";

const Comment = ()=>{
  const getWriteNum = window.localStorage.getItem("Detail");
  const getMemberNum = window.localStorage.getItem("memberNum");

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState("");
  const [isChange, setIsChange] = useState(true);

  const handleChange = (e) => {
    console.log("작성중 댓글 :" + e.target.value );
    setComment(e.target.value);
  }

  const onClickComment = async () => {
    try {
        await api.addComments(getMemberNum, comment, getWriteNum);
        console.log("댓글작성완료");
        setIsChange(!isChange);
        setComment("");
    } catch(e) {
        console.log(e);
    }
  };
  const onClickDeleteComment = async (val) => {
    try {
      await api.deleteComments(val);
      setIsChange(!isChange);
    } catch(e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const commentsData = async () => {
      try {
        const response = await api.commentsWriteDetail(getWriteNum);
        setComments(response.data);
        console.log(response.data);
      } catch(e) {
        console.log(e);
      }
    };
    commentsData();
  },[isChange]);

  return(
    <>
    {comments && comments.map(comment => (
      <li className="commentLi">
        <p className="commentP">
          {comment.pfImg? <img className="commentPfImg" src={comment.pfImg} alt="댓글 프로필 이미지"/>:
          <img className="commentPfImg" src={commentProfileImg} alt="기본 댓글 프로필 이미지"/>}
          <span className="commentnickname">{comment.nickname}</span>
          {comment.nickname == localStorage.getItem("userNickname") &&
          <span className="commentdelete" onClick={()=>{
            onClickDeleteComment(comment.commentNum)
            console.log(comment.commentNum)}
            }>삭제</span>}
        </p>
        <p>{comment.commentContent}</p>
        <time>{comment.writeDate}</time>
    </li>
          ))}

    <div className="writecomment">
        <input type="text" name="commentinput" value={comment} className="commentinput" onChange={handleChange}/>
        <button onClick={() =>{
          onClickComment();
        }}><img src={writeIcon} alt="글쓰기아이콘"/></button>
      </div>
    </> 
    
  );
};

export default Comment;