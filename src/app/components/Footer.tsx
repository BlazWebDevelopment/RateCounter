"use client";
import React from "react";
import Home from "@/app/img/home.svg";
import Profile from "@/app/img/profile.svg";
import Image from "next/image";
import "./style/footer.css";
import Link from "next/link";
import { useSession } from "next-auth/react";

function Footer() {
  const { data: session } = useSession();
  return (
    <div className="footer-wrapper">
      <div className="inside-footer">
        <div className="buttons">
          <Link href={"/"}>
            <button className="home-btn">
              <Image src={Home} height={56} width={56} alt={Home} />
            </button>
          </Link>
        </div>
        <div className="buttons button-profile">
          <Link href={`/profile/${session?.user?.name}`}>
            <button className="profile-btn">
              <Image src={Profile} height={38} width={38} alt={Profile} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
