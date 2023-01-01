import Footer from "../components/Footer";
import Login from "../components/Login";
import "../style/login.scss"
const LoginPage = ()=>{
  return(
    <div className="loginwrapper">
      <Login/>
      <Footer/>
    </div>
  );
};
export default LoginPage;