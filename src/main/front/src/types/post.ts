export type Post = {
  postId?: number;
  authorId?: number;
  authorName?: string;
  content: string;
  isLiked?: boolean;
  likeCount?: number;
  isUpdated?: boolean;
  profileUrl?: string;
  createdDate?: Date;
  uuid?: string;

  files?: {
    fileId: number;
    filename: string;
    fileLoadPath: string;
  }[];
};
