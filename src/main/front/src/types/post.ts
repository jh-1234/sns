export type Post = {
  postId?: number;
  authorId?: number;
  authorName?: string;
  content?: string;
  isLiked?: boolean;
  likeCount?: number;
  isUpdated?: boolean;
  profileUrl?: string;
  createdDate?: Date;
  uuid?: string;
  commentCount?: number;

  files?: {
    fileId: number;
    filename: string;
    fileLoadPath: string;
  }[];
};

export type Comment = {
  commentId?: number;
  postId?: number;
  userSeq?: number;
  username?: string;
  uuid?: string;
  userProfileUrl?: string;
  content: string;
};
