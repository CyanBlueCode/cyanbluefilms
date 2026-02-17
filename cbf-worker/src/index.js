/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable func-style */
/**
  * This Cloudflare Worker is just a serverless function proxy to provide Imagekit CMS
 * our private API key and bypass CORS to access remote media assets.
 * Provides private API key authentication and CORS bypass
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
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
			if (path === '/video-url') {
				return handleVideoUrl(request, env);
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

	try {
		const response = await fetch(`https://api.imagekit.io/v1/files?path=${encodeURIComponent(folder)}&includeFileVersions=false`, {
			headers: {
				Authorization: `Basic ${btoa(env.IMAGEKIT_PRIVATE_KEY + ':')}`,
			},
		});

		if (!response.ok) {
			const error = await response.text();
			return new Response(`ImageKit error: ${error}`, { status: 500 });
		}

		const files = await response.json();

		// Filter out cover images and sort by filename
		const images = files
			.filter((file) => file.fileType === 'image' && !file.name.toLowerCase().includes('cover'))
			.sort((a, b) => a.name.localeCompare(b.name))
			.map((file) => ({
				id: file.fileId,
				name: file.name,
				filePath: file.filePath,
				width: file.width,
				height: file.height,
				createdAt: file.createdAt,
			}));

		return new Response(JSON.stringify(images), {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'public, max-age=3600',
			},
		});
	} catch (error) {
		return new Response(error.stack, { status: 500 });
	}
}

async function handleVideoUrl(request) {
	const url = new URL(request.url);
	const filePath = url.searchParams.get('filePath');
	const vidWidth = url.searchParams.get('vidWidth') || '1920';
	const codec = url.searchParams.get('codec') || 'h264';
	const audio = url.searchParams.get('audio') === 'true' ? '' : ',ac-none';
	const forceRatio = url.searchParams.get('forceRatio');
	const custom = url.searchParams.get('custom') || '';

	if (!filePath) {
		return new Response('Missing filePath parameter', { status: 400 });
	}

	try {
		const baseUrl = 'https://ik.imagekit.io/cyanbluefilms';
		let transformations = [`w-${vidWidth}`, `vc-${codec}`];

		if (audio) transformations.push(audio.replace(',', ''));
		if (forceRatio) transformations.push(`ar-${forceRatio.replace(':', '-')}`);
		if (custom) transformations.push(custom.replace(/^,/, ''));

		const videoUrl = `${baseUrl}${filePath}?tr=${transformations.join(',')}`;

		return new Response(JSON.stringify({ videoUrl }), {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'public, max-age=3600',
			},
		});
	} catch (error) {
		return new Response(error.stack, { status: 500 });
	}
}