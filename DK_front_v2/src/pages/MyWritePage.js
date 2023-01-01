import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MemberInfoMyWrite from "../components/MemberInfoMyWrite";
import { isLogin } from "../util/common";

const MyWritePage = () =>{
  if(!isLogin){
    window.location.replace("/");
  }
  if(isLogin){
    return(
      <div className="memberinfowrapper">
        <div className="headerwrapper">
          <Header/>
        </div>
        <MemberInfoMyWrite/>
        <Footer/>
      </div>
    );
  }
};
export default MyWritePage;