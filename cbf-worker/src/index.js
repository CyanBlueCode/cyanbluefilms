/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable func-style */
/**
 * This Cloudflare Worker is just a serverless function proxy to provide Imagekit CMS
 * our private API key and bypass CORS to access remote media assets
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
// FIXME local development is broken; partial fix below

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

		// Filter out cover images and sort by filename
		const images = files
			.filter((file) => file.fileType === 'image' && !file.name.toLowerCase().includes('cover'))
			.sort((a, b) => a.name.localeCompare(b.name))
			.map((file) => ({
				id: file.fileId,
				name: file.name,
				filePath: file.filePath,
				createdAt: file.createdAt, // Keep for reference
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

async function handleVideoUrl(request, env) {
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

// // FIXME CORS working for local dev, but imagekit auth is broken
// /* eslint-disable import/no-anonymous-default-export */
// /* eslint-disable func-style */
// export default {
//   async fetch(request, env) {
//     try {
//       // Handle OPTIONS preflight requests
//       if (request.method === "OPTIONS") {
//         return handleOptions(request);
//       }

//       // Parse request URL
//       const url = new URL(request.url);
//       const path = url.pathname;

//       // Route handling
//       if (path === "/folder-images") {
//         return handleFolderImages(request, env);
//       }

//       return new Response("Not found", {
//         status: 404,
//         headers: corsHeaders
//       });
//     } catch (error) {
//       return new Response(error.stack || error.toString(), {
//         status: 500,
//         headers: corsHeaders
//       });
//     }
//   },
// };

// // CORS headers configuration
// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type",
// };

// // Handle OPTIONS requests
// function handleOptions(request) {
//   return new Response(null, {
//     headers: {
//       ...corsHeaders,
//       "Access-Control-Max-Age": "86400", // Cache preflight response for 24 hours
//     },
//   });
// }

// async function handleFolderImages(request, env) {
//   const url = new URL(request.url);
//   const folder = url.searchParams.get("folder");

//   if (!folder) {
//     return new Response("Missing folder parameter", {
//       status: 400,
//       headers: corsHeaders
//     });
//   }

//   try {
//     const response = await fetch(`https://api.imagekit.io/v1/files?path=${encodeURIComponent(folder)}`, {
//       headers: {
//         Authorization: `Basic ${btoa(env.IMAGEKIT_PRIVATE_KEY + ":")}`,
//       },
//     });

//     if (!response.ok) {
//       const error = await response.text();
//       return new Response(`ImageKit error: ${error}`, {
//         status: 500,
//         headers: corsHeaders
//       });
//     }

//     const files = await response.json();

//     // Filter and sort images
//     const images = files
//       .filter((file) => file.fileType === "image" && !file.name.toLowerCase().includes("cover"))
//       .sort((a, b) =>
//         // Natural sort by filename
//          a.name.localeCompare(b.name, undefined, {
//           numeric: true,
//           sensitivity: "base"
//         })
//       )
//       .map((file) => ({
//         id: file.fileId,
//         name: file.name,
//         filePath: file.filePath,
//       }));

//     return new Response(JSON.stringify(images), {
//       headers: {
//         "Content-Type": "application/json",
//         ...corsHeaders,
//         "Cache-Control": "public, max-age=3600",
//       },
//     });
//   } catch (error) {
//     return new Response(error.stack, {
//       status: 500,
//       headers: corsHeaders
//     });
//   }
// }
