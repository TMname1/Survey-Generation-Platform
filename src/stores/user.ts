import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const currentUsername = ref(localStorage.getItem('username') || '');
  const token = ref(localStorage.getItem('token') || '');

  const useJWT = (newToken: string) => {
    token.value = newToken;
    currentUsername.value = JSON.parse(
      atob(newToken.split(' ')[1]?.split('.')[1] as string),
    ).username;
    localStorage.setItem('token', token.value);
    localStorage.setItem('username', currentUsername.value);
  };

  const logout = () => {
    token.value = '';
    currentUsername.value = '';
    localStorage.setItem('token', token.value);
    localStorage.setItem('username', currentUsername.value);
  };

  return {
    currentUsername,
    token,
    useJWT,
    logout,
  };
});
