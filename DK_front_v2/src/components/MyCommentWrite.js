import goodIcon from "../resource/kirby_icon6.png";
import commentIcon from "../resource/kirby_icon7.png";
import { useState, useEffect } from "react";
import api from "../api/api";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import { Link } from "react-router-dom";

const MyCommentWrite = () =>{

  const getNickname = window.localStorage.getItem("userNickname");
  const memberNum = window.localStorage.getItem("memberNum");
  console.log("로컬스토리지 값 " + memberNum)
  const [writes, setWrties] = useState('');
  const [offset, setOffset] = useState(0);
  const [isMax, setIsMax] = useState(false);

  const onClickWrite = (val) => {
    console.log("상세 게시글로 이동 : " + val)
    window.localStorage.setItem("Detail", val);
  }

  const writeItems = async () => {
    try {
      if(isMax){
        setIsFetching(false);
        console.log('//max Data');
        return;
      }
      console.log('//new Data Fetcing');
      const fetchData = async () => {
        // 검색결과 글 불러오는 api 호출
        console.log("검색결과 불러오는중");
        const response = await api.mycommentWriteList(String(memberNum),String(offset),String(offset + 10));
        setWrties(old => ([...old, ...response.data]));
        console.log('//new Data :',response.data);
        setOffset(old => old + 10) // offset을 계속 10씩 늘려주면 된다
        setIsFetching(false); // fetching이 false가 되어야 한번만 데이터를 불러줌 패칭 스테이트는 선언한 훅에서 나옴
        if(response.data.length < 10) setIsMax(true);
      }
      fetchData();
    } catch(e) {
      console.log(e);
    };
  }
  // hook 선언 (인자값에는 데이터를 불러오는 함수 입력(writeItems))
  const [isFetching,setIsFetching] = useInfiniteScroll(writeItems)


  useEffect(() => {
    // setLoading(true)
    writeItems();
    // setLoading(false)
  }, []);


  return(
      <>
      {writes && writes.map((item,index) => (
      <div className="write">
      <Link key={index} to="/write" onClick={()=>onClickWrite(item.writeNum)}>
        <h2 className="wname">{item.writeName}</h2>
        <p className="wcontent">
        {item.writeContents}</p>
        <time>{item.writeDate}</time>
        <h3 className="nickname">{item.nickName}</h3>
        <ul className="status">
          <li className="good">
            <img src={goodIcon} alt="좋아요"/>
            <span>{item.countGood}</span>
          </li>
          <li className="comment">
            <img src={commentIcon} alt="댓글수"/>
            <span>{item.countComment}</span>
          </li>
        </ul>
      </Link>
      </div>
      ))}
      {isFetching && <h1>New Data Fetcing .......</h1>}
      {!isFetching && <h1>더이상 조회할 게시글이 없습니다</h1>}
      </>
  );
};
export default MyCommentWrite;