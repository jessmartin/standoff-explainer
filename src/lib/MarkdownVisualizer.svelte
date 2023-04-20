<script lang="ts">
  import type { AnnotationJSON } from '@atjson/document'
  import OffsetSource, { Bold, Italic } from '@atjson/offset-annotations'
  import MarkdownRenderer from '@atjson/renderer-commonmark'
  import HTMLRenderer from '@atjson/renderer-html'

  let atjsonMarks: AnnotationJSON[] = [
    new Bold({ start: 10, end: 15 }),
    new Italic({ start: 4, end: 9 })
  ]
  let atjsonDoc = new OffsetSource({
    content: 'The quick brown fox.',
    annotations: atjsonMarks
  })
  let mdContent = MarkdownRenderer.render(atjsonDoc)
  let htmlContent = HTMLRenderer.render(atjsonDoc)

  const addItalicAnnotationToMarks = () => {
    const selection = window.getSelection()
    if (selection) {
      const { startOffset, endOffset } = getStartAndEndOffset(selection)

      atjsonDoc.addAnnotations(
        new Italic({
          start: startOffset,
          end: endOffset
        })
      )
    }
    recomputeDoc()
  }

  const addBoldAnnotationToMarks = () => {
    const selection = window.getSelection()
    if (selection) {
      const { startOffset, endOffset } = getStartAndEndOffset(selection)

      atjsonDoc.addAnnotations(
        new Bold({
          start: startOffset,
          end: endOffset
        })
      )
    }
    recomputeDoc()
  }

  const recomputeDoc = () => {
    mdContent = MarkdownRenderer.render(atjsonDoc)
    htmlContent = HTMLRenderer.render(atjsonDoc)
  }

  const getStartAndEndOffset = (selection: Selection) => {
    const anchorNode = selection.anchorNode
    const anchorOffset = selection.anchorOffset
    const focusNode = selection.focusNode
    const focusOffset = selection.focusOffset

    const parentElement = document.querySelector('#container')
    const startOffset = getRelativeOffset(anchorNode, anchorOffset, parentElement)
    const endOffset = getRelativeOffset(focusNode, focusOffset, parentElement)
    return { startOffset, endOffset }
  }

  const getRelativeOffset = (node, offset, parentElement) => {
    let relativeOffset = 0
    let currentNode = node
    while (currentNode !== parentElement) {
      if (currentNode.previousSibling) {
        relativeOffset += currentNode.previousSibling.textContent.length
        currentNode = currentNode.previousSibling
      } else {
        currentNode = currentNode.parentNode
      }
    }
    relativeOffset += offset
    return relativeOffset
  }
</script>

<div class="mb-4 border-gray-300 dark:border-gray-600 border-2 rounded-md p-3">
  <span>{mdContent}</span>
</div>

<button
  class="w-1/8 p-2 bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-gray-300 hover:bg-slate-300 hover:dark:bg-slate-600 font-mono rounded-md text-sm"
  on:click={addBoldAnnotationToMarks}>bold</button
>
<button
  class="w-1/8 p-2 bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-gray-300 hover:bg-slate-300 hover:dark:bg-slate-600 font-mono rounded-md text-sm"
  on:click={addItalicAnnotationToMarks}>italic</button
>
<div
  id="container"
  class="font-mono w-full p-2 mt-2 mb-4 bg-white rounded-md dark:bg-slate-600"
  contenteditable
>
  {@html htmlContent}
</div>
