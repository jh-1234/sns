export const QUERY_KEYS = {
  post: {
    all: ["posts"],
    list: ["posts", "list"],
    user: (uuid: string) => ["posts", "user", uuid],
    users: ["posts", "user"],
    postById: (postId: number) => ["posts", "byId", postId],
    comment: {
      all: ["posts", "comments"],
      comments: (postId: number) => ["posts", "comments", postId],
    },
  },
  user: {
    all: ["user"],
    session: ["user", "session"],
    info: (uuid: string) => ["user", "info", uuid],
  },
};
