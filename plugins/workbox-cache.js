// eslint-disable-next-line no-undef
workbox.routing.registerRoute(/pokemon\/.*/, new workbox.strategies.CacheFirst({}), 'GET')
