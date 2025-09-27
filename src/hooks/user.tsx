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
// https://clone-instagram-service.s3.us-east-2.amazonaws.com/media/2/2c0b60a1-6497-41d8-85b3-cb3a86dcc458.jpg
// https://clone-instagram-service.s3.us-east-2.amazonaws.com/media/2/2c0b60a1-6497-41d8-85b3-cb3a86dcc458.jpg
