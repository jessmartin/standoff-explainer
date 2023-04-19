<script>
  console.log("testing")
  import StandoffVisualizer from '$lib/StandoffVisualizer.svelte'
  import MarkdownVisualizer from '$lib/MarkdownVisualizer.svelte'
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

<MarkdownVisualizer/>

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
