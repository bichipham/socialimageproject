import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosClient from "@/utils/axiosClient";

export const fetchPosts = createAsyncThunk("posts", async () => {
  const res = await axiosClient.get("/posts");
 return res.data;
})

type PostPayload = {
  posts: [],
  total: number,
  skip: number,
  limit: number,
}

type PostState = {
  postsPayload: PostPayload,
  loading: boolean
}

const initialState: PostState = {
  postsPayload: {
    posts: [],
    total: 0,
    skip: 0,
    limit: 0,
  },
  loading: false,
}

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.postsPayload = action.payload
        state.loading = false
      })
  },
})

export default postSlice.reducer
