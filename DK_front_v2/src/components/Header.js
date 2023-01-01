import { Link } from "react-router-dom";
import kirbyLogo from "../resource/sleep_kirby.gif"
// import "../style/main.scss"
const Header = () =>{
  const handleKeyPress = e => {
    if(e.key === 'Enter') {
      console.log(e.target.value);
      localStorage.setItem("write", "search");
      window.location.replace(`/search/${e.target.value}`);
    }
  }

  return(
    <div className="header">
      <div className="logo">
        <Link to="/main"><img src={kirbyLogo} alt="개발하는 커비"/></Link>
        <Link to="/main">개발하는 커비</Link>
      </div>
      <div className="search">
        <div>
          <input type="text" placeholder="전체 게시판의 글을 검색하세요!"
          onKeyPress={handleKeyPress}/>
        </div>
      </div>
    </div>
  );
};
export default Header;