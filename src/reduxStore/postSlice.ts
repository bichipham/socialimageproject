import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosClient from "@/utils/axiosClient";

export const fetchPosts = createAsyncThunk("image", async () => {
  const res = await axiosClient.get("/image?page=1&size=20");
 return res.data;
})

type PostPayload = {
  items: [],
  totalItem: number,
  totalPage: number,
  page: number,
  size: number
}

type PostState = {
  postsPayload: PostPayload,
  loading: boolean
}

const initialState: PostState = {
  postsPayload: {
    items: [],
    totalItem: 0,
    totalPage: 0,
    page: 0,
    size: 0
  },
  loading: false
}

const postSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.postsPayload = action?.payload?.data
        state.loading = false
      })
  },
})

export default postSlice.reducer
