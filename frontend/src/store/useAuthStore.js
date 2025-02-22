import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';

export const useAuthStore = create((set) => ({
	authUser: null,
	isRegistering: false,
	isLoggingIn: false,
	isUpdatingProfile: false,

	isCheckingAuth: true,

	checkAuth: async () => {
		try {
			const response = await axiosInstance.get('/auth/check');
			set({ authUser: response.data });
		} catch (error) {
			console.error('error in checkAuth: ', error.message);
			set({ authUser: null });
		} finally {
			set({ isCheckingAuth: false });
		}
	},

	register: async (data) => {},
}));
