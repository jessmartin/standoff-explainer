// CSR is client-side rendering and will generate an HTML shim
// and execute the JavaScript on the client to turn the components
// into HTML.
export const csr = true

// SSR is server-side rendering and will execute the JavaScript
// on the server to turn the components into HTML. For a front-end
// only app, there is no server! So we need to disable SSR.
export const ssr = false

// Prerendering is only available in production mode. It's an optimization
// where the build step computes the contents of the page and saves the
// the HTML.
// More about prerendering: https://kit.svelte.dev/docs/glossary#prerendering
export const prerender = true
