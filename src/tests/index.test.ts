import { describe, it, expect } from 'vitest'
import type { Doc } from '../lib/types'
import { docToHtml } from '../lib/util'

describe('docToHtml', () => {
  it('converts annotations with text content to html', () => {
    const doc: Doc = {
      text: 'Hello world',
      annotations: [
        {
          start: 0,
          end: 5,
          type: 'bold'
        },
        {
          start: 6,
          end: 11,
          type: 'italic'
        }
      ],
      textWithAnnotations: []
    }
    expect(docToHtml(doc)).toBe('<strong>Hello</strong> <em>world</em>')
  })

  it('handles nested tags', () => {
    const doc: Doc = {
      text: 'Hello world',
      annotations: [
        {
          start: 0,
          end: 5,
          type: 'bold'
        },
        {
          start: 2,
          end: 4,
          type: 'italic'
        }
      ],
      textWithAnnotations: []
    }
    expect(docToHtml(doc)).toBe('<strong>He<em>ll</em>o</strong> world')
  })
})
