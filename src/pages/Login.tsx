import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { API_BASE_URL } from "../const/env";
import { UseAuth } from "../hooks/auth";

export default function LoginPage() {
  const { setAccessToken } = UseAuth();
  const postToGetAccessToken = async (authCode: string) => {
    const apiBaseURL = API_BASE_URL;
    const response = await fetch(`${apiBaseURL}/public/auth/accessToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: authCode,
      }),
    });

    const resJSON = await response.json();
    return resJSON;
  };

  const login = useGoogleLogin({
    flow: "auth-code",
    scope:
      "openid email profile https://www.googleapis.com/auth/userinfo.profile",
    onSuccess: async ({ code }) => {
      // Exchange the code on your backend for tokens
      const resp = await postToGetAccessToken(code);
      const token = resp["access_token"];
      await setAccessToken(token);
      window.location.href = "/";
    },
    onError: () => console.log("Login Failed"),
  });

  return (
    <div className="h-screen flex flex-col gap-[40px] justify-center items-center bg-[#fafafa]">
      <img
        className="w-[240px]"
        src="/instagram-logo.svg"
        alt="instagram-logo"
      />
      <button
        onClick={login}
        className="px-[12px] py-[24px] rounded-[4px] bg-white text-[16px] font-semibold cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex items-center gap-2"
      >
        <img className="w-[24px]" src="/google-logo.webp" alt="google-logo" />
        Sign in with Google
      </button>
    </div>
  );
}
