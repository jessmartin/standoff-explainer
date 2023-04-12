<script lang="ts">
  console.log('Hello')
</script>

<article class="prose dark:prose-invert">
  <h1>Why a SvelteKit starter?</h1>
  <p>
    I got tired of starting from scratch every time I wanted to create a demo with SvelteKit. This
    should get me up and runnign with my favorite plugins and such.
  </p>

  <p>I basically have three use cases that I want to use svelte for:</p>

  <ul>
    <li>
      <strong><a class="hover:text-[#1596AE]" href="/fe">Front-end only:</a></strong> I sometimes create
      demos that run entirely in the browser and have no need for a server. They often use libraries
      like webnative or Croquet for services that I might typically need a server. In this case, I want
      sveltekit to generate a static site with no server-side rendering.
    </li>
    <li>
      <strong>Full-stack:</strong> Some demos actually need code that runs on a server. I might need
      resources that are only available on the server, or I might need to do some processing on the server
      before sending the response to the client. In this case, I want sveltekit to generate a server-side
      rendered site with API endpoints.
    </li>
    <li>
      <strong>Static content-only:</strong> I sometimes create sites that are entirely and just need
      html and css - no javascript. In this case, I want sveltekit to generate a static site with no
      javascript.
    </li>
  </ul>

  <p>
    This starter kit has an example of each use case. In order to get started, I just delete the
    files for the other use cases.
  </p>
</article>
