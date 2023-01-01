import "../style/main.scss";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { isLogin } from "../util/common";

const MainPage = () =>{
  if(!isLogin){
    window.location.replace("/");
  }
  if(isLogin){
    return(
      <>
      <Header/>
      <Main/>
      <Footer/>
      </>
    );
  }
};
export default MainPage;