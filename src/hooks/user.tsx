import type { Profile } from "../types/user";
import { UseAuth } from "./auth";
import { API_BASE_URL } from "../const/env";

export function useUser() {
  const { getAccessToken } = UseAuth();
  async function getProfile(): Promise<Profile> {
    const token = getAccessToken();
    const apiBaseURL = API_BASE_URL;

    const response = await fetch(`${apiBaseURL}/private/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const resJSON: Profile = await response.json();
    return resJSON;
  }

  return { getProfile };
}
