export interface PostCategory {
  _id: string;
  title: string;
  slug: string;
}

export interface PostUser {
  _id: string;
  name: string;
  avatar: string;
  avatarUrl: string;
}

export interface PostCommentContent {
  text: string;
}

export interface PostCommentAnswer {
  _id: string;
  content: PostCommentContent;
  status: number;
  openToComment: boolean;
  createdAt: string;
  user: PostUser;
}

export interface PostComment {
  _id: string;
  user: PostUser;
  content: PostCommentContent;
  status: number;
  openToComment: boolean;
  createdAt: string;
  answers: PostCommentAnswer[];
}

export interface Post {
  _id: string;
  id: string;
  title: string;
  slug: string;
  category: PostCategory;
  type: "free" | "premium";
  briefText: string;
  text: string;
  coverImage: string;
  coverImageUrl: string;
  readingTime: number;
  tags: string[];
  author: PostUser;
  related: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  likesCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  comments: PostComment[];
  commentsCount: number;
}

export interface User {
  statusCode: number;
  data: {
    message: string;
    user: {
      _id: string;
      name: string;
      email: string;
      bookmarkedPosts: string[];
      likedPosts: string[];
      avatar: string;
      createdAt: string; // ISO date string
      updatedAt: string; // ISO date string
      __v: number;
      avatarUrl: string;
    };
  };
}

export interface StateType {
  error?: string;
  message?: string;
}

export interface CreateCommentProps {
  formData: FormData;
  postId: string;
  parentId: string | null;
}
