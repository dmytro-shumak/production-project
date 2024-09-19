import { $api } from "shared/api/api";

export const sendComment = async (
  text: string,
  userId?: string,
  articleId?: string,
) => {
  if (!userId || !text || !articleId) {
    throw new Error("Invalid input");
  }

  const response = await $api.post<Comment>("/comments", {
    articleId,
    userId,
    text,
  });

  if (!response.data) {
    throw new Error("Failed to send comment");
  }
};
