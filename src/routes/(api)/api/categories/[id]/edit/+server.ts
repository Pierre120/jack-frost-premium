import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { editCategory } from '$lib/server/categories/edit';

// Edit a category in the database
export const POST = (async ({ params, request }) => {
  try {
    const { category_name, offerings } = await request.json();
    const category = await editCategory(params.id ?? '', category_name, offerings);
    return json({
      success: true,
      category
    });
  } catch (err) {
    console.error(err);
    return json({ success: false });
  }
}) satisfies RequestHandler;