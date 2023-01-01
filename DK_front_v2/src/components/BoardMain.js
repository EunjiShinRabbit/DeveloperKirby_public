import BoardCenter from "./BoardCenter";
import Right from "./Right";
const BoardMain = () =>{
  return(
    <div className="boardmain">
      <BoardCenter position="board"/>
      <Right position="board"/>
    </div>
  );
};
export default BoardMain;