import { create } from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios.js"

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
        const res = await axiosInstance.get("/messages/users");
        set({users: res.data});
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
    }
    finally{
        set({isUsersLoading: false});
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
        const res = await axiosInstance.get(`/messages/${userId}`);
        set({ messages: res.data })
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        toast.error(errorMessage);

    }
    finally{
        set({ isMessagesLoading: false  })
    }
  },

  sendMessage: async (messageData) => {
    const {selectedUser, messages} = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({messages: [...messages,res.data]})
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));