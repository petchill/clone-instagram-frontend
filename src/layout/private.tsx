"use client";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useNoti } from "../hooks/notification";
import type { NotificationResponse } from "../types/notification";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const { getNotifications } = useNoti();
  const [notifications, setNotifications] = useState<NotificationResponse[]>(
    [],
  );
  const navButtonClass =
    "flex h-7 w-7 items-center justify-center border-0 bg-transparent p-0 text-inherit leading-none appearance-none outline-none transition-colors hover:text-[#614dc7] focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0";
  const hasNoti = () => notifications.some((noti) => noti.is_read === false);

  useEffect(() => {
    async function fetchNoti() {
      try {
        const notificationsData = await getNotifications();
        setNotifications(notificationsData);
      } catch (error) {
        console.error("fetchNoti error:", error);
        setNotifications([]);
      }
    }
    fetchNoti();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-white">
      {children}
      <div className="sticky bottom-0">
        <div className="flex items-center justify-between px-8 py-3 bg-white">
          <button type="button" aria-label="Home" className={navButtonClass}>
            <Home className="w-7 h-7" />
          </button>
          <button type="button" aria-label="Search" className={navButtonClass}>
            <Search className="w-7 h-7" />
          </button>
          <button type="button" aria-label="Create" className={navButtonClass}>
            <PlusSquare className="w-7 h-7" />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className={`${navButtonClass} relative`}
          >
            <Heart className="w-7 h-7" />
            {hasNoti() && (
              <span className="absolute right-[-1px] bottom-[-1px] h-2 w-2 rounded-full bg-red-500" />
            )}
          </button>
          <button type="button" aria-label="Profile" className={navButtonClass}>
            <User className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
}
