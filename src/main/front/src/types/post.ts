export type Image = {
  file: File;
  previewUrl: string;
};

export type Post = {
  postId?: number;
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
