import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const currentUsername = ref(localStorage.getItem('username') || '');

  const setUsername = (username: string) => {
    currentUsername.value = username;
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  };

  const logout = () => {
    setUsername('');
  };

  return {
    currentUsername,
    setUsername,
    logout,
  };
});
