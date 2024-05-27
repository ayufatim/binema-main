'use client'

import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { IoPersonCircleSharp } from "react-icons/io5";
import Loading from "./Loading";

interface SigninButtonProps {}

const SigninButton: React.FC<SigninButtonProps> = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // if (loading) {
  //   return <Loading/>
  // } else {
    return (
      <div className="flex gap-4 ml-auto items-center">
        {session && session.user ? (
          <>
            <Image
              src={session.user.image ?? ""}
              alt={session.user.name ?? ""}
              className="rounded-full w-9 h-9"
              width={32}
              height={32}
            />
            <button
              onClick={() => signOut()}
              className="text-white text-sm bg-red-700 p-2 rounded"
              type="button"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button onClick={() => signIn()} className="ml-auto" type="button">
            <IoPersonCircleSharp className="w-9 h-9 duration-300 hover:text-[#d4b60f]" />
          </button>
        )}
      </div>
    );
  // }
};

export default SigninButton;
