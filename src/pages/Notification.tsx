"use client";
import { useEffect, useState } from "react";
import PrivateLayout from "../layout/private";
import { useNoti } from "../hooks/notification";
import type { NotificationResponse } from "../types/notification";

export default function NotificationPage() {
  const { getNotifications, markAllAsRead } = useNoti();
  const [notifications, setNotifications] = useState<NotificationResponse[]>(
    [],
  );

  useEffect(() => {
    async function enterNotificationPage() {
      try {
        const notificationsData = await getNotifications();
        setNotifications(notificationsData);
        await markAllAsRead();
      } catch (error) {
        console.error("fetchNoti error:", error);
        setNotifications([]);
      }
    }

    enterNotificationPage();
  }, []);

  return (
    <PrivateLayout>
      <div className="mx-auto h-full w-full bg-white shadow-sm overflow-hidden">
        <div className="px-4 pt-4 pb-3 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
        </div>

        <div className="divide-y divide-gray-100">
          {notifications.length === 0 ? (
            <div className="px-4 py-6 text-sm text-gray-500">
              No notifications
            </div>
          ) : (
            notifications.map((noti) => (
              <div key={noti.id} className="px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-900">{noti.message}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(noti.created_at).toLocaleString()}
                    </p>
                  </div>
                  {!noti.is_read && (
                    <span className="mt-1 h-2 w-2 rounded-full bg-red-500" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PrivateLayout>
  );
}
