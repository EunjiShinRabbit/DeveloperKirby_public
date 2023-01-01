import { Link } from "react-router-dom";
import JoinTerm from "../components/JoinTerm";
import Footer from "../components/Footer";
import { isLogin } from "../util/common";

const JoinTermPage = () =>{

  if(isLogin){
    window.location.replace("/main");
  }

  return(
    <div className="joinwrapper">
      <JoinTerm/>
      <Footer/>
    </div>
  );
};
export default JoinTermPage;