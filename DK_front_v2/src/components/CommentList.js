import { useState } from "react";
import Comment from "./Comment";
const CommentList = () =>{
  console.log("CommentList 렌더링...");
  return(
    <ul className="commentslist">
       
      <Comment/>

      {/* <Comment/>
      <Comment/> */}
    </ul>
  );
};
export default CommentList;