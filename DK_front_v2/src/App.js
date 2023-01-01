import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// import "./style/reset.css";

import JoinTermPage from "./pages/JoinTermPage";
import JoinPage from "./pages/JoinPage";
import MainPage from "./pages/MainPage";
import BoardPage from "./pages/BoardPage";
import WritePage from "./pages/WritePage";
import LoginPage from "./pages/LoginPage";
import MemberInfoPage from "./pages/MemberInfoPage";
import MyWritePage from "./pages/MyWritePage";
import UnReg2 from "./pages/UnReg2";
import EmailChange from "./pages/EmailChange";
import PwdChange from "./pages/PwdChange";
import MyCommentPage from "./pages/MyCommentPage";
import SearchPage from "./pages/SearchPage";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    // className={`app ${darkMode ? "dark" : ""}`}
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/jointerm' element={<JoinTermPage/>}/>
          <Route path='/join' element={<JoinPage/>}/>
          <Route path='/main' element={<MainPage/>}/>
          <Route path='/board' element={<BoardPage/>}/>
          <Route path='/write' element={<WritePage/>}/>
          <Route path='/memberinfo' element={<MemberInfoPage/>}/>
          <Route path='/mywrite' element={<MyWritePage/>}/>
          <Route path='/UnReg2' element={<UnReg2/>}/>
          <Route path='/EmailChange' element={<EmailChange/>}/>
          <Route path='/PwdChange' element={<PwdChange />} />
          <Route path='/mycomment' element={<MyCommentPage />} />
          <Route path="/search/:query" element={<SearchPage/>}/>
        </Routes>
        {/* <Footer/> */}
      </Router>
    </div>
  );
}

export default App;
