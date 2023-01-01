import "../style/main.scss";
import "../style/write.scss";

import Header from "../components/Header";
import WriteMain from "../components/WriteMain";
import Footer from "../components/Footer";
import { isLogin } from "../util/common";

const WritePage = () =>{
  if(!isLogin){
    window.location.replace("/");
  }
  if(isLogin){
    return(
      <>
      <Header/>
      <WriteMain/>
      <Footer/>
      </>
    );
  }
  
};
export default WritePage;