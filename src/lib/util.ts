import type { Doc } from './types'
import type { AnnotationJSON } from '@atjson/document'
import HTMLRenderer from '@atjson/renderer-html'
import MarkdownRenderer from '@atjson/renderer-commonmark'
import OffsetSource, { Bold, Italic, Section } from '@atjson/offset-annotations'

export class JDocument extends OffsetSource {
  static schema = [Bold, Italic, Section]
}

const docToAtjsonDoc = (doc: Doc): JDocument => {
  const atjsonMarks: AnnotationJSON[] = []

  doc.annotations.forEach((annotation) => {
    if (typeof annotation.start !== 'number' || typeof annotation.end !== 'number') {
      return
    }
    if (annotation.start === annotation.end) {
      return
    }
    if (annotation.type === 'bold') {
      const elem = new Bold({
        start: annotation.start,
        end: annotation.end
      })
      atjsonMarks.push(elem)
    } else if (annotation.type === 'italic') {
      const elem = new Italic({
        start: annotation.start,
        end: annotation.end
      })
      atjsonMarks.push(elem)
    }
  })
  const atjsonDoc = new JDocument({
    content: doc.text,
    annotations: atjsonMarks
  })

  return atjsonDoc
}

export const docToHtml = (doc: Doc) => {
  const atjsonDoc = docToAtjsonDoc(doc)
  const html = HTMLRenderer.render(atjsonDoc)
  return html
}

export const docToMarkdown = (doc: Doc) => {
  const atjsonDoc = docToAtjsonDoc(doc)
  const markdown = MarkdownRenderer.render(atjsonDoc)
  return markdown
}
