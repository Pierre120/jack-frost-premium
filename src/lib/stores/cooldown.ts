import type { Countdown } from '$lib/types/countdown';
import { writable } from 'svelte/store';

const CountdownStore = writable<Countdown>({ count: 0, interval: 1000 });

const countdown = () => {
	CountdownStore.update((countdownState) => {
		countdownState.count -= 1;
		if (countdownState.count === 0) {
			clearInterval(countdownState.timer);
		}
		return countdownState;
	});
};

export const startCountdown = (start: number, interval: number) => {
	CountdownStore.update((countdownState) => {
		countdownState.count = start;
		countdownState.interval = interval;
		countdownState.timer = setInterval(countdown, interval);
		return countdownState;
	});
};

export const stopCountdown = () => {
	CountdownStore.update((countdownState) => {
		countdownState.count = 0;
		return countdownState;
	});
};

export default CountdownStore;
