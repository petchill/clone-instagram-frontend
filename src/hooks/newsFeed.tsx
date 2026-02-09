import { API_BASE_URL } from "../const/env";
import type { NewsFeed } from "../types/newsfeed";
import { UseAuth } from "./auth";

export function useNewsFeed() {
  const { getAccessToken } = UseAuth();

  async function getNewsFeed(): Promise<NewsFeed[]> {
    try {
      const token = getAccessToken();
      const apiBaseURL = API_BASE_URL;

      const response = await fetch(`${apiBaseURL}/private/news`, {
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
        throw new Error(`Failed to fetch news feed: ${response.status}`);
      }

      const resJSON: NewsFeed[] = await response.json();
      return resJSON;
    } catch (error) {
      console.error("getNewsFeed error:", error);
      return [];
    }
  }

  return { getNewsFeed };
}
