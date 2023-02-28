export interface Countdown {
	count: number;
	interval: number; // in milliseconds
	timer?: NodeJS.Timer;
}
