export type AnnotationTypes = 'bold' | 'italic' | 'comment' | 'underline'
export type Mark = {
  start: number
  end: number
  type: AnnotationTypes
}
export type Doc = {
  text: string
  annotations: Mark[]
  textWithAnnotations: { char: string; charAnnotations: Annotation[] }[]
}
export type Annotation = {
  type: AnnotationTypes
  tag: string
  className: string
}
