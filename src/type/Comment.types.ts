
export type User = {
  id: number;
  username: string;
  fullName: string;
};

export type Comment = {
  id: number;
  body: string;
  postId: number;
  likes?: number;
  user: User;
};

export type CommentPayload = {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
};

export type CommentState = {
  //commentsByPost: Record<number, CommentPayload>; // key = postId
  loading: boolean;
};