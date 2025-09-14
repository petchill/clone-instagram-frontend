import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useGoogleLogin } from "@react-oauth/google";
import { API_BASE_URL } from "./const/env";

function App() {
  const [count, setCount] = useState(0);

  const postToGetAccessToken = async (authCode: string) => {
    const apiBaseURL = API_BASE_URL;
    const response = await fetch(`${apiBaseURL}/auth/accessToken`, {
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
      console.log(resp);
    },
    onError: () => console.log("Login Failed"),
  });

  return (
    <>
      <button onClick={() => login()}>Sign in with Google</button>;
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
