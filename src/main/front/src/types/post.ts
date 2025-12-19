export type Image = {
  file?: File | null;
  previewUrl: string;
  fileId?: number;
};

export type Post = {
  postId?: number;
  authorId?: number;
  authorName?: string;
  content: string;
  likeCount?: number;
  isUpdated?: boolean;
  profileUrl?: string;
  createdDate?: Date;

  files?: {
    fileId: number;
    filename: string;
    fileLoadPath: string;
  }[];
};
