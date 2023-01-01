import { useState, useEffect } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

const AdBanner = () =>{
  const [lists, setLists] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.adInfo();
        setLists(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return(
    <>
    {lists && lists.map(({ adUrl, adImg, adName }) => (
      <div className="banner">
        <a href={adUrl}>
          <img src={adImg} alt={adName}/>
        </a>
      </div>
    ))}
    </>
  );
} 

export default AdBanner;