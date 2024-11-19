import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>All Rights Reserved &copy; 2024.</div>
      <div>
        <Link to={"https://www.facebook.com"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"https://www.youtube.com"} target="_blank">
          <FaGithub />
        </Link>
        <Link to={"https://www.youtube.com"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
