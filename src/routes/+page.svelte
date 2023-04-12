<script lang="ts">
  type Mark = {
    start: number
    end: number
    type: string
  }

  let textContent = 'The fox jumped.'
  let annotations: Mark[] = [
    { start: 0, end: 7, type: 'bold' },
    { start: 5, end: 15, type: 'italic' },
    { start: 0, end: 3, type: 'comment' }
  ]

  // tailwindcss colors
  let colors = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink']

  const nonEmptyAnnotations = (annotations: Mark[]) => annotations.filter((a) => a.start !== a.end)
</script>

<span class="text-gray-400 fixed bottom-0 right-0 font-mono text-sm p-2"
  >An experiment by <a class="hover:underline hover:text-gray-500" href="https://jessmart.in"
    >Jess Martin</a
  >.
  <a
    class="hover:underline hover:text-gray-500"
    href="https://github.com/jessmartin/standoff-explainer">Source code on GitHub</a
  >.
</span>

<div class="mb-4 border-gray-300 border-2 rounded-md p-3">
  <p class="font-mono px-2 mb-1 text-xl">Text Content</p>
  <input bind:value={textContent} class="w-full p-2 mb-2 rounded-md" />

  <p class="font-mono px-2 mb-1 text-xl">
    Annotations

    <button
      on:click={() => {
        annotations.push({ start: 0, end: 0, type: '' })
        annotations = annotations
      }}
      class="text-sm p-2 bg-gray-200 font-mono rounded-md text-gray-500 hover:bg-gray-300"
      >Add Annotation</button
    >
  </p>
  {#each annotations as annotation}
    <div class="flex mb-2">
      <input
        bind:value={annotation.start}
        class="w-10 p-2 mr-2 border border-gray-300 rounded-md font-mono"
      />
      <input
        bind:value={annotation.end}
        class="w-10 p-2 mr-2 border border-gray-300 rounded-md font-mono"
      />
      <input
        bind:value={annotation.type}
        class="w-1/8 p-2 mr-2 border border-gray-300 rounded-md font-mono"
      />
      <button
        on:click={() => (annotations = annotations.filter((a) => a !== annotation))}
        class="w-1/8 p-2 bg-gray-200 font-mono rounded-md text-gray-500 hover:bg-gray-300 text-sm"
      >
        Remove
      </button>
    </div>
  {/each}
</div>

<p class="font-mono px-2 mb-1 text-xl">Standoff Markup</p>
<div class="mb-1 pb-1 overflow-x-auto whitespace-nowrap min-h-screen">
  {#each textContent.split('') as char, i}
    <span class="font-mono text-gray-300 inline-block w-10 mr-2 text-center">{i}</span>
  {/each}
  <br />
  {#each textContent.split('') as char, i}
    <span class="inline-block text-xl p-3 bg-white rounded-md mr-2 w-10 h-12 text-center"
      >{@html char === ' ' ? '&#160;' : char}</span
    >
  {/each}

  <div class="relative mt-3 bg-slate-300">
    {#each nonEmptyAnnotations(annotations) as annotation, i}
      <span
        class="absolute border-{colors[i]}-200 border-2 bg-{colors[
          i
        ]}-50 rounded-md p-1 font-mono overflow-hidden"
        style="left: {annotation.start * 48}px; width: {(annotation.end - annotation.start) * 48 -
          8}px; top: {i * 48}px;"
      >
        {annotation.type}
      </span>
    {/each}
  </div>
</div>
