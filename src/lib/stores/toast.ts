import type { Toast } from '$lib/types/toast';
import { writable } from 'svelte/store';

const ToastStore = writable<Toast[]>([]);

export const addToast = (toast: Toast) => {
	const id = Math.floor(Math.random() * 100000);
	ToastStore.update((toasts) => {
		const defToast = {
			id,
			message: 'This is a toast message',
			type: 'info',
			duration: 3000
		};

		toasts = [{ ...defToast, ...toast }, ...toasts];
		return toasts;
	});

	if (toast.duration) setTimeout(() => dismissToast(id), toast.duration);

	return id;
};

export const dismissToast = (id: number) => {
	ToastStore.update((toasts) => toasts.filter((toast) => toast.id !== id));
};

export default ToastStore;
