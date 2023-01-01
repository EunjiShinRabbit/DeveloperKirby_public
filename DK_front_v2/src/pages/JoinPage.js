import Footer from "../components/Footer";
import Join from "../components/Join";
import { isLogin } from "../util/common";
import { Link } from "react-router-dom";

const joinPage = () =>{
  
  if(isLogin){
    window.location.replace("/main");
  }
  
  return(
    <div className="joinwrapper">
      <Join/>
      <Footer/>
    </div>
  );
};
export default joinPage;