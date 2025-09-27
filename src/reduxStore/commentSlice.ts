// src/reduxStore/commentSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "@/utils/axiosClient";
import { CommentState } from "@/type/Comment.types";

// ✅ Get comments by postId
export const fetchCommentsByPostId = createAsyncThunk(
  "comments/fetchCommentsByPostId",
  async (postId: string) => {
    const res = await axiosClient.get(`/comments/post/${postId}`);
    return res.data.comments; 
    // chỉ lấy mảng comments
  }
);

// ✅ Add comment
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, body, userId }: { postId: string; body: string, userId: string }) => {
    const res = await axiosClient.post(`/comments/add`, {
      postId,
      body,
      userId
    });
    return res.data; 
    // { id, body, postId, user }
  }
);

const initialState: CommentState = {
  loading: false,
};

// ==== Slice ====
const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchCommentsByPostId.rejected, (state) => {
        state.loading = false;
      });

    // addComment chỉ return data, không update store
  },
});

export default commentSlice.reducer;