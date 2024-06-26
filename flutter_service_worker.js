'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "04296ee68b2513c8b1192ac4e5ebead8",
"assets/AssetManifest.bin.json": "764f0cf45f0b7309179bcfd8198e38a3",
"assets/AssetManifest.json": "5888af309ee494dab65a1f32a8d4efd5",
"assets/assets/icon/avatar_author.svg": "b4018d659b8056306b273e9ae1411c5e",
"assets/assets/icon/background_button.svg": "18687fc8d5e3234af14b7ed4f8593dfb",
"assets/assets/icon/Dialog.svg": "fb53df2ac8aa6b6eb1cd28ee2d0b0f4a",
"assets/assets/icon/find_friend.svg": "5b8a861ad2a0f3faeb812df39bfe825c",
"assets/assets/icon/Frame.svg": "3593666b50c7b9d2f14aa0e2cc212e18",
"assets/assets/icon/google.svg": "fee52ee0d7631858de612c84505cc8f3",
"assets/assets/icon/icon_navigation.svg": "5c3ba75eb7b0c364be4fb5980e785959",
"assets/assets/icon/ImageCard1.svg": "702eb09864f1a76c582d6877194cc82d",
"assets/assets/icon/ImageCard2.svg": "37443841610934d533a4556e329bdd39",
"assets/assets/icon/loading_signin.svg": "6940018a0f039afbe5f28121ed1ec6fe",
"assets/assets/icon/Paper.svg": "c9a116f823067464c0c5a3789bbaa469",
"assets/assets/icon/Vector.svg": "916af2c99c030af44b4a6fb3c9a17ab8",
"assets/assets/icon/Walkthough1.svg": "545fe6a71747f783512e19e31606ff89",
"assets/assets/icon/Walkthough2.svg": "7fd30444b271918ecb08882b0493f803",
"assets/assets/icon/Walkthough3.svg": "73b2f954e15ab16e2262ac90616984fe",
"assets/assets/image/author1.png": "421f3d87acc4b9965d69135fea338046",
"assets/assets/image/author2.png": "a865618d5c76e9a63412ab7c1dc646d7",
"assets/assets/image/author3.png": "99ab71a85da81279315fb174ee238f33",
"assets/assets/image/avatar_author.png": "8bf21504c60192432cf73abfd0f1b4b3",
"assets/assets/image/avatar_author2.png": "8dc06a87d0df45d0de70e886b5953388",
"assets/assets/image/card1.png": "348cfafc4bc1a645b67f6f33cf4fa453",
"assets/assets/image/card2.png": "62192644c965c4f2e893cbf86528ac0e",
"assets/assets/image/collection1.png": "2e96e45e20f74ab0fa294def77c940f1",
"assets/assets/image/collection2.png": "8eb1fe8faf596f241b216e6d12cef6de",
"assets/assets/image/loading.gif": "c0c003384035ba3df9647cb2d2d965b8",
"assets/assets/image/trending1.png": "cd88e5e3cc7958d75ee4e656ae089aff",
"assets/assets/image/trending2.png": "d62a90f31e60c39b42ca5407dc50fbf9",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "91144abae82cf4ebc2ea29ce1314e0f4",
"assets/NOTICES": "0f5839bd8e434e84de71a5531ad6d030",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/canvaskit.js.symbols": "38cba9233b92472a36ff011dc21c2c9f",
"canvaskit/canvaskit.wasm": "3d2a2d663e8c5111ac61a46367f751ac",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/chromium/canvaskit.js.symbols": "4525682ef039faeb11f24f37436dca06",
"canvaskit/chromium/canvaskit.wasm": "f5934e694f12929ed56a671617acd254",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.js.symbols": "741d50ffba71f89345996b0aa8426af8",
"canvaskit/skwasm.wasm": "e42815763c5d05bba43f9d0337fa7d84",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "c319a2b223e8b1c545745ae7aa02369d",
"/": "c319a2b223e8b1c545745ae7aa02369d",
"main.dart.js": "7662a70e5131d770be79414197818b7b",
"manifest.json": "3168df52f89f6fa3038a3e1f99c09d80",
"version.json": "37acd4b8aff086a392770b9ecf01173c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
