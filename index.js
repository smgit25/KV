addEventListener('fetch', event => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  // 'env' is available as the second argument in newer module syntax,
  // but with event listener style, it's accessed via event.environment in some runtimes,
  // or via global scope in old style. For Wrangler v3 module syntax, see note below.
  // Here, we'll assume classic Workers syntax with KV bound as global.

  // For module syntax (recommended):
  // export default {
  //   async fetch(request, env, ctx) {
  //     const value = await env.MY_KV_NAMESPACE.get('test-key') || 'No value set';
  //     return new Response(`KV Value: ${value}`);
  //   }
  // }

  // For event listener/classic syntax:
  // Access KV via global binding
  const value = await MY_KV_NAMESPACE.get('test') || 'No value set';
  return new Response(`KV Value: ${value}`);
}