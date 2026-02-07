import "./App.css";
import { Route, Routes } from "react-router";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import NotificationPage from "./pages/Notification";

function App() {
  return (
    <div className="max-w-[420px] m-auto min-h-screen bg-white ">
      <div className="flex justify-center items-center px-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notification" element={<NotificationPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
