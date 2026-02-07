import { UseAuth } from "./auth";
import { API_BASE_URL } from "../const/env";
import type { NotificationResponse } from "../types/notification";

export function useNoti() {
  const { getAccessToken } = UseAuth();
  async function getNotifications(): Promise<NotificationResponse[]> {
    try {
      const token = getAccessToken();
      const apiBaseURL = API_BASE_URL;

      const response = await fetch(`${apiBaseURL}/private/notifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/login";
        }
        throw new Error(`Failed to fetch notifications: ${response.status}`);
      }

      const resJSON: NotificationResponse[] = await response.json();
      return resJSON;
    } catch (error) {
      console.error("getNotifications error:", error);
      return [];
    }
  }

  async function markAllAsRead(): Promise<boolean> {
    try {
      const token = getAccessToken();
      const apiBaseURL = API_BASE_URL;

      const response = await fetch(
        `${apiBaseURL}/private/notifications/mark-all-as-read`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/login";
        }
        throw new Error(
          `Failed to mark all notifications as read: ${response.status}`,
        );
      }

      return true;
    } catch (error) {
      console.error("markAllAsRead error:", error);
      return false;
    }
  }

  return { getNotifications, markAllAsRead };
}
