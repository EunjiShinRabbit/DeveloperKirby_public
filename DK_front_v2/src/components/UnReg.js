const UnReg = () =>{
    const onClickMemberdel = () => {
      window.location.replace("/UnReg2");
    }

    return(
        <div className="unReg">
          <span onClick={onClickMemberdel}>회원탈퇴</span>
        </div>
  );
};
export default UnReg;