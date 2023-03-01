import { browser } from '$app/environment';
import type { Countdown } from '$lib/types/countdown';
import { writable } from 'svelte/store';


// Create the store from localStorage or default values
const CountdownStore = writable<Countdown>((browser && JSON.parse(localStorage.getItem('countdown') || '') || { count: 0, interval: 1000 }) as Countdown);

// Update count base from timestamp to get the correct countdown timelapse
CountdownStore.update((countdownState) => {
	if(countdownState.count > 0) {
		countdownState.count = countdownState.count - Math.round((Date.now() - countdownState.timestamp_ms) / 1000);
	}
	return countdownState;
});

// Subscribe to the store and initialize unsubscribe cleanup function
export const unsubscribe = CountdownStore.subscribe((countdownState) => {
	// Get current timestamp in milliseconds
	countdownState.timestamp_ms = Date.now();
	// Save the countdown state to localStorage
	if(browser) {
		localStorage.setItem('countdown', JSON.stringify(countdownState));
	}
});

// Callback function for setInterval to decrement the countdown
const countdown = () => {
	CountdownStore.update((countdownState) => {
		countdownState.count -= 1;
		if (countdownState.count === 0) {
			clearInterval(countdownState.timer);
		}
		return countdownState;
	});
};

// Start the countdown
export const startCountdown = (start?: number, interval?: number) => {
	CountdownStore.update((countdownState) => {
		if(start) {
			countdownState.count = start;
		}
		if(interval) {
			countdownState.interval = interval;
		}
		countdownState.timer = setInterval(countdown, countdownState.interval);
		return countdownState;
	});
};

// Stop the countdown
export const stopCountdown = () => {
	CountdownStore.update((countdownState) => {
		countdownState.count = 0;
		return countdownState;
	});
};

export default CountdownStore;
