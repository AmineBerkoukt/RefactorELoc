import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// Set the BASE_URL based on the environment
const BASE_URL = "http://localhost:5000/api";

const token = localStorage.getItem('token');

// Define the Zustand store
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // Check authentication and fetch the logged-in user's data
  checkAuth: async () => {
    try {
      const res = await axios.get(BASE_URL + "/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Sign up a new user
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axios.post(BASE_URL + "/auth/register", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message || "Failed to create account");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Log in an existing user
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axios.post(BASE_URL + "/auth/login", data);


      localStorage.setItem('token', res.data.token);

      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Log out the current user
  logout: async () => {
    try {
      await axios.post(BASE_URL + "/auth/logout", null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message || "Logout failed");
    }
  },

  // Update the user's profile
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axios.put(BASE_URL + "/users/update-profile", data, {
        headers: { Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },

      });
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in updateProfile:", error);
      toast.error(error.response.data.message || "Failed to update profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // Connect the user to the Socket.IO server
  connectSocket: () => {
    const { authUser } = get();

    if (!authUser) {
      console.warn("Cannot connect socket: authUser is not defined.");
      return;
    }

    if (get().socket?.connected) {
      console.log("Socket already connected");
      return;
    }

    const socket = io("http://localhost:5000", {
      query: { userId: authUser._id },
    });

    set({ socket });

    socket.on("connect", () => {
      console.log(`Socket connected with ID: ${socket.id}`);
    });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  },

  // Disconnect the user's socket
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) {
      console.log("Disconnecting socket");
      socket.disconnect();
    }
  },
}));
