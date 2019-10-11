---
title: Gettin' Jiggy with JS - DocumentFragment API
date: "2019-09-29T17:34:12"
description:
  After searching and scouring the internet for the best way to append
  multiple children within the DOM at the same time, I came across
  the DocumentFragment API
---

# DocumentFragment - Appending multiple children to one or multiple elements

## Relevant Links

[DocumentFragment API via MDN](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)
[Relevant StackOverflow answer](https://stackoverflow.com/a/36798254)
[My Github repository which uses DocumentFragment API](https://github.com/ParamagicDev/libraryBookJS)
The repo doesn't uses the `class` keyword and instead uses the ES5 and prior version
of classes simply as an introduction to myself who has not used classes in JS prior
to ES6.

## What is the DocumentFragment API?

Below is the description from MDN:<br>

> The DocumentFragment interface represents a minimal document object that has no parent. It is used as a lightweight version of Document that stores a segment of a document structure comprised of nodes just like a standard document. The key difference is that because the document fragment isn't part of the active document tree structure, changes made to the fragment don't affect the document, cause reflow, or incur any performance impact that can occur when changes are made.

<i>Key Takeaway:</i><br>
The key difference is that because the document fragment isn't part of the active document tree structure, changes made to the fragment don't affect the document, cause reflow, or incur any performance impact that can occur when changes are made.<br>

This means the DocumentFragment API is the go to way to append multiple elements
that do not need to be immediately rendered to the page.

## Using the DocumentFragment API

I abstracted the DocumentFragment API into the my [utils.js] file in order to reuse it
throughout the project.

### Basic structure
