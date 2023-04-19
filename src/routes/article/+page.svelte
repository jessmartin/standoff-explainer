<script lang="ts">
  export let data
</script>

<article class="prose mx-auto">
  <svelte:component this={data.content} />
</article>
