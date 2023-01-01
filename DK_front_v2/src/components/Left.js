import { Link } from "react-router-dom";
import AdBanner from "./AdBanner";
import ProfileCard from "./ProfileCard";
const Left = (props) =>{
  return(
    <div className={props.position + "left"}>
      <ProfileCard/>
      <AdBanner/>
    </div>
  );
};
export default Left;