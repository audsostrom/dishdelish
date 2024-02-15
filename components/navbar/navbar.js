
"use client";
import Logo from "../../assets/logo.svg";
import Link from 'next/link';
import ReorderIcon from '@mui/icons-material/Reorder';
import "./navbar.css";
import { useState } from "react";
import Image from "next/image";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
          <Image height='40' width='40' src={Logo} />
          <div className="logo-text">
            DishDelish
          </div>
        <div className="hiddenLinks">
          <Link href="/"> Home </Link>
          <Link href="/about"> About </Link>
          <Link href="/menu"> Recipes </Link>
        
        </div>
      </div>
      <div className="rightSide">
        <Link href="/"> Home </Link>
        <Link href="/about"> About </Link>
        <Link href="/menu"> Recipes </Link>

        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;