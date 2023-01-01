import { useState } from "react";
import { storage } from "../api/firebase"
import { Link } from "react-router-dom";
import api from "../api/api";

const ChangeMemberInfo = (props) =>{
  const [changeProfileImg, setChangeProfileImg] = useState(false);
  const [changePwd, setChangePwd] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  let cnt = 0;
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleImage = (event) => {
    const image = event.target.files[0];
    setImage(image);
    console.log(image);
    setError("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (image === "") {
      console.log("파일이 선택되지 않았습니다");
      setError("파일이 선택되지 않았습니다");
      return;
    }
    // 업로드 처리
    console.log("업로드 처리");
    const storageRef = storage.ref("images/profile/"); //어떤 폴더 아래에 넣을지 설정
    const imgName = (localStorage.getItem("memberNum") + "_pfImg");
    const imagesRef = storageRef.child(imgName);
    // const imagesRef = storageRef.child(image.name); //파일명

    console.log("파일을 업로드하는 행위");
    const upLoadTask = imagesRef.put(image);
    console.log("태스크 실행 전");

    upLoadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("snapshot", snapshot);
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percent + "% done");
      },
      (error) => {
        console.log("err", error);
        setError("파일 업로드에 실패했습니다." + error);
      },
      () => {
        upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageUrl(downloadURL);
        });
      }
    );
  };

  const pfImgChange = async() => {
    try {
      const res = await api.pfImgChange(imageUrl);
      console.log(res.data.result);
      if(res.data.result === "OK") {
        setChangeProfileImg(false);
        props.changeIsChange(++cnt);
        // window.location.replace("/memberinfo");
      } else {

      }
    } catch (e) {
      console.log("로그인 에러..");
      console.log(e);
    }
  }

  // const [file, setFile] = useState();
  // const onFileChange = (event) => {
  //   // Updating the state
  //   setFile({ file: event.target.files[0] });
  // };

  return(
    <div className="changememberinfo">
      <p>회원정보 수정</p>
      <p onClick={()=>{setChangeProfileImg(true) }}
      onDoubleClick={()=>{setChangeProfileImg(false)}}>프로필 사진 변경</p>
      {changeProfileImg && 
        <div className="pfImgChange">
          {error && {error}}
          <form className="pfImgForm" onSubmit={onSubmit}>
            <input type="file" onChange={handleImage} />
            <button onClick={onSubmit}>업로드</button>
          </form>
          {imageUrl && (
            <div>
              <p> 이미지 미리보기</p>
              <img className="pfImgPreview" src={imageUrl} alt="uploaded" />
              {/* width="400px" */}
            </div>
          )}
          <button type="button" onClick={pfImgChange}>업로드한 이미지로 프로필 변경</button>
        </div>
      }
      {!changeProfileImg && <p><Link to="/PwdChange" className="logout">비밀번호 변경</Link></p>}
      {!changeProfileImg &&<p><Link to="/EmailChange" className="logout">이메일 변경</Link></p>}
    </div>
  );
};

export default ChangeMemberInfo;