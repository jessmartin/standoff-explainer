<script lang="ts">
  // =================================== TYPES
  type AnnotationTypes = 'bold' | 'italic' | 'comment'

  type Mark = {
    start: number
    end: number
    type: AnnotationTypes
  }
  type Doc = {
    text: string
    annotations: Mark[]
    textWithAnnotations: { char: string; charAnnotations: Annotation[] }[]
  }
  type Annotation = {
    type: AnnotationTypes
    tag: string
    className: string
  }

  // =================================== INITIAL STATE

  const knownAnnotations: Annotation[] = [
    { type: 'bold', tag: 'strong', className: 'font-bold' },
    { type: 'italic', tag: 'em', className: 'italic' },
    { type: 'comment', tag: 'span', className: 'text-gray-400' }
  ]
  let doc: Doc = {
    text: 'The fox jumped.',
    annotations: [
      { start: 0, end: 7, type: 'bold' },
      { start: 5, end: 15, type: 'italic' },
      { start: 0, end: 3, type: 'comment' }
    ],
    textWithAnnotations: []
  }
  const nonEmptyAnnotations = (annotations: Mark[]) =>
    doc.annotations.filter((a) => a.start !== a.end)
  const getAnnotations = (index: number): Mark[] => {
    return nonEmptyAnnotations(doc.annotations).filter((a) => a.start <= index && a.end > index)
  }
  const computeTextWithAnnotations = (textContent: string, annotations: Mark[]) => {
    let textWithAnnotations: { char: string; charAnnotations: Annotation[] }[] = []
    for (let i = 0; i < textContent.split('').length; i++) {
      const char = textContent[i]
      let charAnnotations: Annotation[] = []
      const possibleAnnotationsForChar = getAnnotations(i)
      if (possibleAnnotationsForChar.length > 0) {
        possibleAnnotationsForChar.forEach((a) => {
          const annotation = knownAnnotations.find((k) => k.type === a.type)
          console.log(annotation)
          if (annotation) {
            charAnnotations.push(annotation)
          }
        })
        textWithAnnotations.push({ char, charAnnotations })
      } else {
        textWithAnnotations.push({ char, charAnnotations: [] })
      }
    }
    return textWithAnnotations
  }

  const recomputeDoc = () => {
    doc.textWithAnnotations = computeTextWithAnnotations(doc.text, doc.annotations)
  }
  recomputeDoc()

  // tailwindcss colors
  let colors = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink']

  const updateAnnotation = (e: Event, annotationIndex: number, key: string) => {
    console.log('updating this one annotation')
    doc.annotations[annotationIndex][key] = (e.target as HTMLInputElement).value
    doc.annotations = doc.annotations
    recomputeDoc()
  }
</script>

<svelte:head>
  <title>Standoff Markup Explainer</title>
</svelte:head>

<span class="text-gray-400 fixed bottom-0 right-0 font-mono text-sm p-2"
  >An experiment by <a class="hover:underline hover:text-gray-500" href="https://jessmart.in"
    >Jess Martin</a
  >.
  <a
    class="hover:underline hover:text-gray-500"
    href="https://github.com/jessmartin/standoff-explainer">Source code on GitHub</a
  >.
</span>

<div class="mb-4 border-gray-300 dark:border-gray-600 border-2 rounded-md p-3">
  <p class="font-mono px-2 mb-1 text-xl">Text Content</p>
  <input bind:value={doc.text} class="font-mono w-full p-2 mb-2 rounded-md dark:bg-slate-600" />

  <p class="font-mono px-2 mb-1 text-xl">
    Annotations

    <button
      on:click={() => {
        doc.annotations.push({ start: 0, end: 0, type: 'bold' })
        recomputeDoc()
      }}
      class="text-sm p-2 font-mono rounded-md bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-gray-300 hover:bg-slate-300 hover:dark:bg-slate-600"
      >Add Annotation</button
    >
  </p>
  {#each doc.annotations as annotation, i}
    <div class="flex mb-2">
      <span class="w-3 mr-2 bg-{colors[i]}-200 dark:bg-{colors[i]}-600 rounded-md" />
      <input
        value={annotation.start}
        on:input={(e) => updateAnnotation(e, i, 'start')}
        class="w-10 p-2 mr-2 rounded-md font-mono dark:bg-slate-600"
      />
      <input
        value={annotation.end}
        on:input={(e) => updateAnnotation(e, i, 'end')}
        class="w-10 p-2 mr-2 rounded-md font-mono dark:bg-slate-600"
      />
      <input
        value={annotation.type}
        on:input={(e) => updateAnnotation(e, i, 'type')}
        class="w-1/8 p-2 mr-2 rounded-md font-mono dark:bg-slate-600"
      />
      <button
        on:click={() => {
          doc.annotations = doc.annotations.filter((a) => a !== annotation)
          recomputeDoc()
        }}
        class="w-1/8 p-2 bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-gray-300 hover:bg-slate-300 hover:dark:bg-slate-600 font-mono rounded-md text-sm "
      >
        Remove
      </button>
    </div>
  {/each}
</div>

<p class="font-mono px-2 mb-1 text-xl">Standoff Markup</p>
<div class="mb-1 pb-1 overflow-x-auto whitespace-nowrap min-h-screen">
  {#each doc.text.split('') as _, i}
    <span class="font-mono text-gray-300 inline-block w-10 mr-2 text-center dark:text-gray-500"
      >{i}</span
    >
  {/each}
  <br />
  {#each doc.textWithAnnotations as { char, charAnnotations }, i}
    <span
      class="inline-block font-mono text-xl p-3 bg-white dark:bg-slate-700 rounded-md mr-2 w-10 h-12 text-center {charAnnotations
        .map((a) => a.className)
        .join(' ')}"
    >
      {@html char === ' ' ? '&#160;' : char}
    </span>
  {/each}

  <div class="relative mt-3 bg-slate-300">
    {#each nonEmptyAnnotations(doc.annotations) as annotation, i}
      <span
        class="absolute font-mono border-{colors[i]}-200 dark:border-{colors[
          i
        ]}-700 border-2 bg-{colors[i]}-50 dark:bg-{colors[
          i
        ]}-600 rounded-md p-1 font-mono overflow-hidden"
        style="left: {annotation.start * 48}px; width: {(annotation.end - annotation.start) * 48 -
          8}px; top: {i * 48}px;"
      >
        {annotation.type}: [{annotation.start}..{annotation.end}]
      </span>
    {/each}
  </div>
</div>
