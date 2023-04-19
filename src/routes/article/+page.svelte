<script lang="ts">
  export let data
</script>

<article class="prose">
  <svelte:component this={data.content} />
</article>
