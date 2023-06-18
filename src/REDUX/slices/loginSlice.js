import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../config";
import axios from "axios";
import { useSelector } from "react-redux";

export const loginUser = createAsyncThunk(
  "login/User",
  async (email, password) => {
    try {
      // Make an API call to register the user

      console.log(email, "this email");
      console.log(password, "this is password");
      let link = `${baseUrl}/login`;
      console.log(link, " this is link ");

      const data = {
        email: email,
        password: password,
      };

      let response = await axios.post(link, data);
      console.log(response.data, " this is response");

      return response.data;
    } catch (error) {
      // Return the error message
      console.log(error);
    }
  }
);

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  token: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;

        //  state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        //     state.error = action.payload;
      });
  },
});

export default loginSlice.reducer;
