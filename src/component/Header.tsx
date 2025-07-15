"use client";
import React from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "antd";
import router from "next/router";

export default function Header() {
  const { isLoggedIn, user, refresh } = useAuth();
  const logout = () => {
    fetch("/api/logout", {
      method: "POST",
    }).then(() => {
      refresh();
      router.push("/login");
    });
  };

  return (
    <div className="h-[60px] flex items-center justify-between bg-white px-[80px]">
      <div className="flex items-center gap-2">
        <Image
          src="/jorkin-logo.jpg"
          alt=""
          width={80}
          height={80}
          className="w-[48px] h-[48px] rounded-full"
        />
        {isLoggedIn && <div className="text-sm text-primary">{user?.name}</div>}
      </div>
      {isLoggedIn && <Button onClick={logout}>logout</Button>}
    </div>
  );
}
