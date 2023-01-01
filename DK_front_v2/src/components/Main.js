import Center from "./Center";
import Left from "./Left";
import Right from "./Right";
const Main = () =>{
  return(
    <div className="mainmain">
      <Left position="main"/>
      <Center position="main"/>
      <Right position="main" hotName="좋아요 많이 달린 게시글" newComName="최근 댓글 달린 게시글"/>
    </div>
  );
};
export default Main;