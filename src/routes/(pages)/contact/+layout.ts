import type { LayoutLoad } from './$types';
import { load as parentLoad } from '../+layout';

export const load = (() => {
	const { pages } = parentLoad();
	return {
		pages
	};
}) satisfies LayoutLoad;
