import React from "react";
import { Link } from "react-router-dom";
import LogoImage from "../../assets/logo.png";

export default function Logo() {
  return (
    <Link to="/">
      <img src={LogoImage} alt="logo" width={67} />
    </Link>
  );
}
