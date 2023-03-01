import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// Create the store from localStorage or default values
const LoginAttemptsStore = writable<number>((browser && JSON.parse(localStorage.getItem('login-attempts') || '0') || 0) as number);

// Subscribe to the store and initialize unsubscribe cleanup function
export const unsubscribe = LoginAttemptsStore.subscribe((loginAttemptsState) => {
  // Save the login attempts state to localStorage
  if(browser) {
    localStorage.setItem('login-attempts', JSON.stringify(loginAttemptsState));
  }
});

// Reset the login attempts
export const resetLoginAttempts = () => {
  LoginAttemptsStore.update((loginAttemptsState) => {
    loginAttemptsState = 0;
    return loginAttemptsState;
  });
};

// Increment the login attempts
export const incrementLoginAttempts = () => {
  LoginAttemptsStore.update((loginAttemptsState) => {
    loginAttemptsState += 1;
    return loginAttemptsState;
  });
};

export default LoginAttemptsStore;
