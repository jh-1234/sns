export const QUERY_KEYS = {
  post: {
    all: ["post"],
    list: ["post", "list"],
    byId: (postId: number) => ["post", "byId", postId],
  },
};
