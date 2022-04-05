console.log('Custom service worker!')

self.addEventListener('fetch', (event) => {
  console.log('Fetch!', event.request.url)
})
