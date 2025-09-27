import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "@/utils/axiosClient";
import Cookies from "js-cookie";

interface AuthState {
  user: null | { id: string; email: string; username: string };
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null; // thêm error
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post("/auth/login", { username, password });
      const { accessToken, refreshToken, ...rest } = res.data;

      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken);
      //console.log("Login response data:", rest);
      return { rest, accessToken, refreshToken };
    } catch (err: unknown) {
      return rejectWithValue(err || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ rest: { id: string; email: string, username: string }, accessToken: string, refreshToken: string }>) => {
        state.loading = false;
        state.user = action.payload.rest;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
