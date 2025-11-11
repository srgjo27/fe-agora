import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";
import { authService, LoginRequest, RegisterRequest } from "@/services";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunks for auth actions
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const loginResponse = await authService.login(credentials);
      const userProfile = await authService.getMyProfile();

      return {
        token: loginResponse.access_token,
        user: {
          id: userProfile.id,
          username: userProfile.username,
          email: userProfile.email,
          avatar_url: userProfile.avatar_url,
          role: userProfile.role,
          created_at: userProfile.created_at,
        } as User,
      };
    } catch (error: any) {
      const errorMessage = error?.message;

      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      const userResponse = await authService.register(userData);

      return {
        id: userResponse.id,
        username: userResponse.username,
        email: userResponse.email,
        avatar_url: userResponse.avatar_url,
        role: userResponse.role,
        created_at: userResponse.created_at,
      } as User;
    } catch (error: any) {
      const errorMessage = error?.message;

      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async (_, {}) => {
  try {
    await authService.logout();
  } catch (_) {}
});

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.refreshToken();

      return response.access_token;
    } catch (error: any) {
      const errorMessage = error?.message;

      return rejectWithValue(errorMessage);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    initializeAuth: (state) => {
      // Jika sudah ada token di state (dari persist), gunakan itu
      if (state.token && authService.isAuthenticated(state.token)) {
        authService.initializeAuth(state.token);

        const userInfo = authService.getUserFromToken(state.token);
        if (userInfo && !state.user) {
          // Hanya update user info jika belum ada
          state.isAuthenticated = true;
        }
      } else {
        // Reset state jika token tidak valid
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      }
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });

    // Register cases
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
        // Register tidak langsung memberikan token, perlu login
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Logout cases
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        // Clear state even if logout failed
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });

    // Refresh token cases
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setUser, setToken, initializeAuth } =
  authSlice.actions;
export default authSlice.reducer;
