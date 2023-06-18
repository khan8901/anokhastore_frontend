import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../config";
import axios from "axios";

export const registerUser = createAsyncThunk("register/User", async (user) => {
  try {
    // Make an API call to register the user

    console.log(user, "this user");

    let link = `${baseUrl}/register`;
    console.log(link, " this is link ");

    const response = await axios.post(link, user);
    console.log(response.data, " tis is response");

    return response.data;

    //  const response = await link.post(userData);
    // Return the registered user data
    //  console.log(response, " this response from REGSLICE");
    //  return response;
  } catch (error) {
    // Return the error message
    console.log(error);
  }
});

const registerSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    isAuthenticated: false,
    error: "",
    token: null,
    user: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;

        //  state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        //  state.user = {};
        //  state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;
