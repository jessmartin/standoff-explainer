import type { Doc } from './types'
import type { AnnotationJSON } from '@atjson/document'
import HTMLRenderer from '@atjson/renderer-html'
import OffsetSource, { Bold, Heading, Italic, Paragraph, Section } from '@atjson/offset-annotations'

export class JDocument extends OffsetSource {
  static schema = [Bold, Italic, Section]
}

export const docToHtml = (doc: Doc) => {
  const atjsonMarks: AnnotationJSON[] = []
  // const section = new Section({
  //   start: 0,
  //   end: jdom.text.length,
  //   attributes: {
  //     startOffset: minReadingOrderOffset,
  //     endOffset: maxReadingOrderOffset
  //   }
  // })
  // atjsonMarks.push(section)

  doc.annotations.forEach((annotation) => {
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

  const html = HTMLRenderer.render(atjsonDoc)
  return html
}
