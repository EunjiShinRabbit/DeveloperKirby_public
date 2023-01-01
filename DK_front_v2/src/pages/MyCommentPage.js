import Footer from "../components/Footer";
import Header from "../components/Header";
import MemberInfoMyComment from "../components/MemberInfoMyComment";
import { isLogin } from "../util/common";

const MyCommentPage = () =>{
  if(!isLogin){
    window.location.replace("/");
  }
  if(isLogin){
    return(
      <div className="memberinfowrapper">
        <div className="headerwrapper">
          <Header/>
        </div>
        <MemberInfoMyComment/>
        <Footer/>
      </div>
    );
  }
};
export default MyCommentPage;