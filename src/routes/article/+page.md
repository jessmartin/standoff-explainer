<script>
  console.log("testing")
  import StandoffVisualizer from '$lib/StandoffVisualizer.svelte'
  // import MarkdownVisualizer from '$lib/MarkdownVisualizer.svelte'
</script>

# Standoff Markup

Text is one of the most basic primitives for computers and humans. It's delightfully simply yet devilishly complicated.

In this article, I'll walk through various ways we encode rich text on a computer, introduce an uncommonly-used approach called standoff markup, and discuss some of the possibilities afforded by adopting a standoff approach.

Let's start with thinking about plain text. Take, for example, the following string of plain ol' text: `The quick brown fox.`

Open up a text editor like TextEdit or VS Code or Sublime Text (embed a plain text editor right here?), type in that phrase, and save it. You can now open that text file in _any other text editor_ and see the same result.

But most of us are used to being able to add formatting to our text, like **bold**, _italic_, and ~~underline~~. How might we represent the formatting of those characters?

There are three broad approaches we might consider:

1. Embed the formatting into the plain text itself.
2. Embed the text in a data structure that encodes the formatting.
3. Store the formatting in a separate data structure while leaving the plain text untouched.

An example of embedding the formatting into the text itself would be Markdown. If we wanted to add some bold and italic to `The quick brown fox`, we could use Markdown like so:

What about embedding the text in a data structure? This is basically how HTML works:

```html
The <em>quick</em> <strong>brown</strong> fox.
```

You could also think of the HTML as a tree:

```
The
	em: quick
	strong: brown
fox.
```

Try dragging around this italic and bold styles to see how the tree changes.

- [ ] Todo this visualization

Markdown may look less complicated than HTML, but Markdown is also inherently a tree-based structure. Markdown is parsed as a tree. Try changing this Markdown file and watch how the tree changes:

- [ ] Todo this visualization

Which brings us to the third approach: store the formatting instructions separate from the plain text. In this case, each of the formatting instructions can be represented as a range that begins with a specific character and ends with a character. The plain text remains untouched, and we have a list of ranges, like so:

<StandoffVisualizer />

How about another annotation like underline? It turns out it's not supported in Markdown. You can't do it. How about adding a comment annotation? Not supported in HTML. So now we see this general principle that **the encoding format places a limit on the capabilities of the author and the editor.**

What about multiple links from the same word or phrase? This isn't allowed in HTML, thought perhaps it should be. Because of the limitations of HTML, we have folk practices where we link every word of a phrase to a different destination or include a \[1] \[2] \[3] at the end of the phrase with links. What about links that overlap one another? Again, HTML doesn't support this, while Standoff does. There's a question of how to represent these links in the client, but we can leave that up to the creativity of the client.

What happens when an unknown annotation is present in Markdown or HTML? It can completely break the layout. Standoff, on the other hand, also allows for annotations that a client doesn't know how to display. It doesn't break the client.

Advantage: standoff doesn't touch the plain text. This allows you to read the unformatted content even if the client doesn't know how to render the annotations.

Standoff is the ultimate interchange / universal format (implicitly).

You can write in Markdown, store in Standoff, then output in HTML.

- [ ] visualization of writing in Markdown or HTML (or something else?), storing in standoff, then outputting HTML, Markdown, etc

Different clients render the standoff in different ways.

Multiple users can have their own annotation layers.

## Line Breaks

- What about line breaks?
- What about blocks?
- So far, we've been representing a single line of text only.
- Blocks versus Inline marks
- What about hierarchical content?
  - lists
  - tables

## Grapheme Clusters / Emojis / Unicode

In order to encode that text, we can start by simply encoding the characters as a sequence of ascii characters, like so:
`84 104 105 115 32 113 117 105 99 107 32 98 114 111 119 110 32 102 111 120 46`

As long as you have the look-up table, you can build a simple application to take any ascii character code and show a text file. Pretty neat, eh?

- not all characters are 1 character in width
- how to properly calculate offsets?

## What about media?

- images
- videos
- etc
