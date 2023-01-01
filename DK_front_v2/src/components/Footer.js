import { Link } from "react-router-dom";
import "../style/main.scss";
const Footer = () =>{
  return(
    <div className="footer">
      <Link to="/">이용약관</Link>
      <Link to="/">개인정보처리방침</Link>
      <Link to="/">©개발하는 커비</Link>
    </div>
  );
};
export default Footer;