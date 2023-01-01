import axios from "axios";
const HEADER = 'application/json';
// const HEADER = {"Content-type" : "application/json; charset-UTF-8"};
const BASE_URL = "http://172.30.1.70:8090/developerKirby/";

const api = {
  userLogin: async function(nickname, pwd) {
    const loginObj = {
      nickname: nickname,
      pwd: pwd
    }
    return await axios.post(BASE_URL+ "LoginServlet", loginObj, HEADER);
  },
  //회원정보 조회
  memberInfo: async function() {
    const regCmd = {
      cmd : "MemberInfo", //조회는 이름만 날려주면됨
      target : localStorage.getItem("memberNum") //조회할 대상의 회원번호 날려줌
    }
    return await axios.post(BASE_URL + "MemberSelectServlet", regCmd, HEADER);
  },
  //회원탈퇴
  memberDelete: async function() {
    const regCheck = {
      target : localStorage.getItem("memberNum")
    }
    return await axios.post(BASE_URL + "MemberDeleteServlet", regCheck, HEADER);
  },
  //회원정보수정
  memberUpdate: async function(value, type, nickname) {
    const updateObj = {
      value : value,
      type : type, 
      nickname : nickname
    }
    return await axios.post(BASE_URL + "MemberUpdateServlet", updateObj, HEADER);
  },
  memberNameDup: async function(nickname) {
    const regCmd = {
      nickname : nickname
    }
    return await axios.post(BASE_URL + "MemberNameDupServlet", regCmd, HEADER);
  },
  memberPhoneReg : async function(phone) {
    const regCheck = {
      phone : phone
    }
    return await axios.post(BASE_URL + "MemberPhoneRegServlet", regCheck, HEADER);
  },
  // memberPhoneRegChk : async function(phone, regNum) {
  //   const regCheck = {
  //     phone : phone,
  //     regNum : regNum
  //   }
  //   return await axios.post(BASE_URL + "", regCheck, HEADER);
  // },
  //회원가입
  memberInsert: async function(nickname, pwd, phone, email) {
    const regCheck = {
      nickname : nickname,
      pwd : pwd,
      phone : phone,
      email : email,
      adOk : localStorage.getItem("adOk")
    }
    return await axios.post(BASE_URL + "MemberInsertServlet", regCheck, HEADER);
  },
  pfImgChange: async function(pfImg) {
    const regCheck = {
      pfImg : pfImg,
      target : localStorage.getItem("memberNum")
    }
    return await axios.post(BASE_URL + "PfImgChangeServlet", regCheck, HEADER);
  },
  // 메인 화면 게시판 
  boardDetail: async function() {
    const boardObj = {
      cmd : "BoardInfo"
    }
    return await axios.post(BASE_URL + "BoardServlet", boardObj, HEADER );
  },
  // 주간 인기글
  hotBoardDetail: async function() {
    const hotBoardObj = {
      cmd: "HotBoardInfo"
    }
    return await axios.post(BASE_URL + "HotBoardServlet", hotBoardObj, HEADER);
  },
  // 최근 댓글 달린 게시글
  newComBoardDetail: async function() {
    const newComBoardObj = {
        cmd : "NewComBoardInfo"
    }
    return await axios.post(BASE_URL + "NewComBoardServlet", newComBoardObj, HEADER);
  },
  // 게시판 페이지 게시판 이름
  boardPageBoardName: async function(boardName) {
    const boardNameObj = {
      cmd : "BoardNameInfo",
      boardName : boardName
    }
    return await axios.post(BASE_URL + "BoardPageNameServlet", boardNameObj, HEADER);
  },
  // 게시판 페이지 게시글 목록
  boardPageWriteList : async function(boardName,offsetNum,limitNum) {
    const writeListObj = {
      cmd : "BoardPageWriteList",
      boardName : boardName,
      offsetNum,
      limitNum
    };
    return await axios.post(BASE_URL + "BoardPageWriteListServlet", writeListObj, HEADER);
  },
  // 상세 게시글 조회
  writeDetail : async function(writeNum) {
    const writeDetailObj = {
      cmd : "WriteDetailInfo",
      writeNum : writeNum
    };
    return await axios.post(BASE_URL + "WriteDetailServlet", writeDetailObj, HEADER);
  },
  // 상세 게시글에 달린 댓글 조회
  commentsWriteDetail : async function(writeNum) {
    const commentsDataObj = {
      cmd : "CommentsInfo",
      writeNum : writeNum
    };
    return await axios.post(BASE_URL + "CommentsWriteDetailServlet", commentsDataObj, HEADER);
  },
  // 댓글 달기
  addComments : async function(memberNum, commentContent, writeNum) {
    const addCommentsObj = {
      cmd : "CommentsAdd",
      memberNum : memberNum,
      commentContent : commentContent,
      writeNum : writeNum
    };
    return await axios.post(BASE_URL + "AddCommentsServlet", addCommentsObj, HEADER);
  },
  // 댓글 삭제
  deleteComments : async function(commentNum) {
    const deleteComments = {
      cmd : "CommentsDelete",
      commentNum : commentNum
    };
    return await axios.post(BASE_URL + "DeleteCommentsServlet", deleteComments, HEADER);
  },
  // 좋아요 중복 확인
  alreadyGood : async function(writeNum, memberNum) {
    const alreadyGoodObj = {
      cmd : "AlreadyGoodInfo",
      writeNum : writeNum,
      memberNum : memberNum
    };
    return await axios.post(BASE_URL + "AlreadyGoodServlet", alreadyGoodObj, HEADER);
  },
  // 좋아요 등록
  addGood : async function(memberNum, writeNum) {
    const addGoodObj = {
      cmd : "GoodAdd",
      memberNum :  memberNum,
      writeNum : writeNum
    };
    return await axios.post(BASE_URL + "AddGoodServlet", addGoodObj, HEADER);
  },
  writeDelete : async function(writeNum) {
    const regCheck = {
      cmd : "WriteDelete",
      writeNum : writeNum
    }
    return await axios.post(BASE_URL + "WriteDeleteServlet", regCheck, HEADER);
  },
  writeSearch : async function(query,offsetNum,limitNum) {
    const writeListObj = {
      query : query,
      offsetNum,
      limitNum
    };
    return await axios.post(BASE_URL + "WriteSearchServlet", writeListObj, HEADER);
  },
  // 내 게시글 목록
  myWriteList : async function(memberNum,offsetNum,limitNum) {
    console.log(memberNum, offsetNum, limitNum)
    const writeListObj = {
      cmd : "BoardPageWriteList",
      memberNum : memberNum,
      offsetNum : offsetNum,
      limitNum : limitNum
    };
    return await axios.post(BASE_URL + "MyWriteSearchServlet", writeListObj, HEADER);
  },
  // 내가 댓글 단 게시글
  mycommentWriteList : async function(memberNum,offsetNum,limitNum) {
    console.log(memberNum, offsetNum, limitNum)
    const writeListObj = {
      cmd : "commentWriteList",
      memberNum : memberNum,
      offsetNum : offsetNum,
      limitNum : limitNum
    };
    return await axios.post(BASE_URL + "MyCommentSearchServlet", writeListObj, HEADER);
  },
  // 게시글 등록 
  NewWriteReg : async function(boardName, writeName, memberNum, writeContents) {
    const newWriteObj = {
      cmd : "WriteInsert",
      boardName : boardName,
      writeName : writeName,
      memberNum : memberNum,
      writeContents : writeContents
    };
    return await axios.post(BASE_URL + "WriteInsertServlet", newWriteObj, HEADER);
  },
  adInfo: async function() {
    const hotBoardObj = {
      cmd: "AdInfo"
    }
    return await axios.post(BASE_URL + "AdSelectServlet", hotBoardObj, HEADER);
  },
  
};
export default api;