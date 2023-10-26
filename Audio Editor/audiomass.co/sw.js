const assets = [
/*
	'./manifest.json',
	'./ico.png',
	'./icon.png',
	'./index.html',
	'./main.css',
	'./dist/wavesurfer.js',
	'./dist/plugin/wavesurfer.regions.js',
	'./oneup.js',
	'./app.js',
	'./keys.js',
	'./contextmenu.js',
	'./ui-fx.js',
	'./ui.js',
	'./modal.js',
	'./state.js',
	'./engine.js',
	'./actions.js',
	'./drag.js',
	'./recorder.js',
	'./welcome.js',
	'./fx-pg-eq.js',
	'./fx-auto.js',
	'./local.js',
	'./id3.js',
	'./lzma.js',
	'./lame.js',
	'./fonts/icomoon.ttf',
	'./fonts/icomoon.woff',
	'./favicon.ico',
	'./eq.html',
	'./sp.html',
	'./test.mp3'
*/
	'./manifest.json',
	'./favicon.ico',
	'./ico.png',
	'./icon.png',
	'./sw.js',
	'./',

	'./index.html',
	
	'all.build.js',
	'all2.css',

	'./lz4-block-codec-wasm.js',
	'./lz4-block-codec.wasm',
	'./fonts/icomoon.ttf',
	'./fonts/icomoon.woff',

	'./eq.html',
	'./sp.html',
	'./test.mp3'
];


self.addEventListener( 'install', async function () {
	const cache = await caches.open( 'audiomass' );
	assets.forEach( function ( asset ) {
		cache.add( asset ).catch( function () {
			console.error( '[SW] Cound\'t cache:', asset );
		});
	});
});

self.addEventListener( 'fetch', async function ( evt ) {
	const request = evt.request;
	evt.respondWith( cacheFirst( request ) );

	evt.waitUntil(update_sw(request));
});

function update_sw(request) {
  return caches.open('audiomass').then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

async function cacheFirst( request ) {
	const cachedResponse = await caches.match( request );
	if ( cachedResponse === undefined ) {
		console.error( '[SW] Not cached:', request.url );
		return fetch( request );
	}

	return cachedResponse;
}