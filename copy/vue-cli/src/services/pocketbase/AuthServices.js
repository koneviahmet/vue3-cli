import pb from "../pocketbase";
import store from "../../store/index";

const AuthServices = {
  /**
   * Login with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Object} User data
   */
  login: async (email, password) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      
      // Update the store with user data
      if (store.commit && typeof store.commit === 'function') {
        store.commit('setUser', authData.record);
      }
      
      return authData.record;
    } catch (e) {
      console.error("Login error:", e);
      throw e;
    }
  },
  
  /**
   * Register a new user
   * @param {Object} userData - User data including email, password, etc.
   * @returns {Object} Created user data
   */
  register: async (userData) => {
    try {
      const record = await pb.collection('users').create(userData);
      
      // Optionally auto-login after registration
      if (userData.email && userData.password) {
        await AuthServices.login(userData.email, userData.password);
      }
      
      return record;
    } catch (e) {
      console.error("Registration error:", e);
      throw e;
    }
  },
  
  /**
   * Logout the current user
   */
  logout: () => {
    pb.authStore.clear();
    
    // Clear user from store
    if (store.commit && typeof store.commit === 'function') {
      store.commit('logoutUser');
    }
  },
  
  /**
   * Check if user is logged in
   * @returns {boolean} Login status
   */
  isLoggedIn: () => {
    return pb.authStore.isValid;
  },
  
  /**
   * Get current user
   * @returns {Object|null} Current user data or null if not logged in
   */
  getCurrentUser: () => {
    return pb.authStore.isValid ? pb.authStore.model : null;
  },
  
  /**
   * Send password reset email
   * @param {string} email - User's email
   */
  resetPassword: async (email) => {
    try {
      await pb.collection('users').requestPasswordReset(email);
      return { success: true };
    } catch (e) {
      console.error("Password reset error:", e);
      throw e;
    }
  },
  
  /**
   * Confirm email verification
   * @param {string} token - Verification token
   */
  confirmVerification: async (token) => {
    try {
      await pb.collection('users').confirmVerification(token);
      return { success: true };
    } catch (e) {
      console.error("Email verification error:", e);
      throw e;
    }
  },
  
  /**
   * Refresh the auth token
   */
  refreshToken: async () => {
    try {
      // PocketBase handles token refreshing automatically
      // but we can manually trigger it if needed
      if (pb.authStore.isValid) {
        await pb.collection('users').authRefresh();
        return { success: true };
      }
      return { success: false, error: "No valid auth session" };
    } catch (e) {
      console.error("Token refresh error:", e);
      throw e;
    }
  }
};

export default AuthServices; 