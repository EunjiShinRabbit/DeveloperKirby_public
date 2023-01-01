import Hot from "./Hot";
const Right = (props) =>{


  return(
    <div className={props.position + "right"}>
      <Hot name="실시간 인기 글"/>
      <Hot name="최근 댓글"/>
    
    </div>
  );
};
export default Right;