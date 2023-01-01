import { useState } from "react";
import BoardName from "./BoardName";
import WriteDetail from "./WriteDetail";
const WriteCenter = () =>{
  const [isChange, setIsChange] = useState(false);
  const changeIsChange = (value) => {
    setIsChange(value);
  };

  return(
    <div className="writecenter">
      <BoardName 
      name={localStorage.getItem("Board") && localStorage.getItem("Board")}/>
      <WriteDetail isChange={isChange} changeIsChange={changeIsChange}/>
    </div>
  );
};
export default WriteCenter;