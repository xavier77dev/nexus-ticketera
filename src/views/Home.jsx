import React from "react";
import Logo from "../assets/images/mainLogo.png";
import NexusImgLogo from '../assets/images/nexusImgHome.png'

const Home = () => {
  return (
    <div className=" flex h-screen flex-col items-center justify-center text-center font-poppins">
    <img className="h-screen" src={NexusImgLogo} alt="" />
    </div>
  );
};

export default Home;
