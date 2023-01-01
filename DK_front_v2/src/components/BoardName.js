import { Link } from "react-router-dom";
const BoardName = (props) =>{
  if(props.notlink){
    return(
      <div className="board-name">
        <Link className="bname" to="#">{props.name}</Link>
      </div>
    );
  } else{
    return(
      <div className="board-name">
        <Link className="bname" to="/board">{props.name}</Link>
      </div>
    );
  }
};
export default BoardName;