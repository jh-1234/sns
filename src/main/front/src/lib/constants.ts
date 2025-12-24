export const QUERY_KEYS = {
  post: {
    all: ["post"],
    list: ["post", "list"],
    user: (uuid: string) => ["post", "user", uuid],
    users: ["post", "user"],
    byId: (postId: number) => ["post", "byId", postId],
  },
  user: {
    all: ["user"],
    session: ["user", "session"],
    info: (uuid: string) => ["user", "info", uuid],
  },
};
