import "./App.css";
import { Route, Routes } from "react-router";
// import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import NotificationPage from "./pages/Notification";
import NewsFeedPage from "./pages/NewsFeed";
import HomePage from "./pages/Home";
import { RootStoreProvider } from "./store/Root";
import UploadPage from "./pages/Upload";

function App() {
  return (
    <RootStoreProvider>
      <div className="max-w-[420px] m-auto min-h-screen bg-white ">
        <div className="flex justify-center items-center px-4">
          <Routes>
            <Route path="/" element={<NewsFeedPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/news-feed" element={<NewsFeedPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage />} />
          </Routes>
        </div>
      </div>
    </RootStoreProvider>
  );
}

export default App;
