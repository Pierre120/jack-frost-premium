import { writable } from 'svelte/store';

const LoginAttemptsStore = writable<number>(0);

export default LoginAttemptsStore;
