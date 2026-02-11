import { API_BASE_URL } from "../const/env";
import type { MediaMetaData } from "../types/post";
import { UseAuth } from "./auth";

export function useUpload() {
  const { getAccessToken } = UseAuth();

  async function uploadMedia(
    media: File,
    caption: string,
  ): Promise<MediaMetaData | null> {
    try {
      const token = getAccessToken();
      const apiBaseURL = API_BASE_URL;
      const formData = new FormData();
      formData.append("media", media);
      formData.append("caption", caption);

      const response = await fetch(`${apiBaseURL}/private/media`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/login";
        }
        throw new Error(`Failed to upload media: ${response.status}`);
      }

      const resJSON: MediaMetaData = await response.json();
      return resJSON;
    } catch (error) {
      console.error("uploadMedia error:", error);
      return null;
    }
  }

  return { uploadMedia };
}
