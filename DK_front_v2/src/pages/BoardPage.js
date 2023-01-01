import "../style/main.scss";
import "../style/board.scss";
import Header from "../components/Header";
import BoardMain from "../components/BoardMain";
import { isLogin } from "../util/common";

const BoardPage = () =>{

  if(!isLogin){
    window.location.replace("/");
  }
  if(isLogin){
    return(
      <>
      <Header/>
      <BoardMain/>
      </>
    );
  }
};
export default BoardPage;