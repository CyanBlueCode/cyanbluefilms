/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable func-style */
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env) {
		try {
			// Only allow GET requests
			if (request.method !== 'GET') {
				return new Response('Method not allowed', { status: 405 });
			}

			// Parse request URL
			const url = new URL(request.url);
			const path = url.pathname;

			// Route handling
			if (path === '/folder-images') {
				return handleFolderImages(request, env);
			}

			return new Response('Not found', { status: 404 });
		} catch (error) {
			return new Response(error.stack || error.toString(), { status: 500 });
		}
	},
};

async function handleFolderImages(request, env) {
	const url = new URL(request.url);
	const folder = url.searchParams.get('folder');

	if (!folder) {
		return new Response('Missing folder parameter', { status: 400 });
	}
	// Fetch from ImageKit API
	try {
		const response = await fetch(`https://api.imagekit.io/v1/files?path=${encodeURIComponent(folder)}`, {
			headers: {
				Authorization: `Basic ${btoa(env.IMAGEKIT_PRIVATE_KEY + ':')}`,
			},
		});

		if (!response.ok) {
			const error = await response.text();
			return new Response(`ImageKit error: ${error}`, { status: 500 });
		}

		const files = await response.json();
		// Filter and format response
		const images = files
			.filter((file) => file.fileType === 'image')
			.map((file) => ({
				id: file.fileId,
				name: file.name,
				filePath: file.filePath,
			}));

		return new Response(JSON.stringify(images), {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
			},
		});
	} catch (error) {
		return new Response(error.stack, { status: 500 });
	}
}
