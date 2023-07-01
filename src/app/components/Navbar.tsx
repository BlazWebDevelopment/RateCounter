"use client";
import MenuIcon from "@/app/img/menu.svg";
import MenuIcon_active from "@/app/img/menu-active.svg";
import React, { useState } from "react";
import "./style/navbar.css";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const { data: session } = useSession();
  return (
    <>
      <nav className="navbar">
        <div className="top-bar">
          <h1>HOURLY RATE TRACKER</h1>
        </div>
        <div className="dropdown">
          <button className="dropbtn" onClick={() => setDropdown(!dropdown)}>
            <Image
              src={dropdown ? MenuIcon_active : MenuIcon}
              height={32}
              width={32}
              alt="icon"
            />
          </button>
          {dropdown && (
            <div className="dropdown-content">
              <Link href={`/profile/${session?.user?.name}`}>Profile</Link>
              {session?.user ? (
                <a onClick={() => signOut()}>Log out</a>
              ) : (
                <a onClick={() => signIn()}>Log in</a>
              )}
            </div>
          )}
        </div>
      </nav>
      <div></div>
    </>
  );
}

export default Navbar;
