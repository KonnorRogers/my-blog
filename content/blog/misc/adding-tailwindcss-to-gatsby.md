---
title: Adding tailwindcss to a Gatsby project
date: "2020-01-20T02:26:43"
description: Details on how to add tailwindcss to a Gatsby project.
---

## Prerequisites

Node (preferably 8+, I used 11.15.0)
Npm (I used 6.7.0)
Git (Gatsby requires Git to pull in starters)

## Note to windows users

I wrote this tutorial with intent for Unix based users. Whenever you see the
command `touch` it just means create a file and `mkdir` means create a directory (folder).
Also, I wrote filepaths with Unix based OS'es in mind.

## TLDR

### For new projects

```bash
npm install --global gatsby-cli
gatsby new tailwind-gatsby-project
cd tailwind-gatsby-project
```

### For new or existing projects

```bash
npm install gatsby-plugin-postcss
npm install --save-dev tailwindcss
npx tailwind init

touch postcss.config.js
mkdir src/styles
touch src/styles/tailwind.css
```

1. Add gatsby-postcss-plugin to `./gatsby-config.js`

```javascript
// ./gatsby-config.js
module.exports = {
  // Above code omitted for brevity
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-postcss`,
    // Below code omitted for brevity
  ],
}
```

2. Add the following values to `./postcss.config.js`

```javascript
// ./postcss.config.js

const tailwindcss = require(`tailwindcss`)

module.exports = {
  plugins: [tailwindcss(`./tailwind.config.js`), require("autoprefixer")],
}
```

3. Add tailwindcss directives to `./src/styles/tailwind.css`

```css
/* ./src/styles/tailwind.css */
@tailwind base
@tailwind utilities;
@tailwind components;
```

4. Add tailwindcss globally by importing it in `gatsby-browser.js`

```javascript
// ./gatsby-browser.js

import "./src/styles/tailwind.css"
```

5. Add a tailwind style to a an item in `./src/pages/index.js` to test that its working

```javascript
// ./src/pages/index.js

// Above code omitted for brevity
<h1 className="bg-red-500">Hi people</h1>
// Below code omitted for brevity
```

6. Start up your server

```bash
gatsby develop
```

7. Navigate to localhost:8000 to see if Tailwind is working. That's it!

## Full tutorial

If you already have a Gatsby project feel free to skip ahead to the
[Adding to an existing project section](#adding-to-an-existing-project)

1. First, start by creating a new Gatsby project. The easiest way to do so is:

```bash
npm install --global gatsby-cli
```

</br>

2. Then to create a new project:

```bash
gatsby new tailwind-gatsby-project
```

</br>

This will create a new Gatsby project called `tailwind-project`

3. Now, navigate into the project directory:

```bash
cd tailwind-gatsby-project
```

Make sure running `gatsby develop` works before moving on.

## Adding to an existing project

4. Add [gatsby-plugin-postcss](https://www.gatsbyjs.org/packages/gatsby-plugin-postcss/) package

```bash
npm install gatsby-plugin-postcss
```

5. Add gatsby-postcss-plugin to `gatsby-config.js`

```javascript
// ./gatsby-config.js
module.exports = {
  // Above code omitted for brevity
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-postcss`,
    // Below code omitted for brevity
  ],
}
```

6. Create a `postcss.config.js` file in the root directory

```bash
touch postcss.config.js
```

7. Add the following content to `postcss.config.js`:

```javascript
// ./postcss.config.js

const tailwindcss = require(`tailwindcss`)

module.exports = {
  plugins: [tailwindcss(`./tailwind.config.js`), require("autoprefixer")],
}
```

8. Add the [TailwindCSS](https://tailwindcss.com/docs/installation) package

```bash
npm install --save-dev tailwindcss
```

9. Create a directory called in `styles` in the `src` directory

```bash
mkdir src/styles
```

10. Create a stylesheet called `tailwind.css` in the `src/styles` directory

```bash
touch src/styles/tailwind.css
```

11. Add the following content:

```css
/* ./src/styles/tailwind.css */

@tailwind base;
@tailwind components;
@tailwind utilities;
```

12. To add tailwind styles globally, import it in `gatsby-browser.js`

```javascript
import "./src/styles/tailwind.css"
```

Everything should now be working! However, we currently have no way of telling.
Lets add a tailwind style to the index page.

13. Add a tailwind style to the `<h1></h1>` tag in `src/pages/index.js`

```javascript
// ./src/pages/index.js

// Above code omitted for brevity
<h1 className="bg-red-500">Hi people</h1>
// Below code omitted for brevity
```

14. Run `gatsby-develop`

You should now see a red background for the text that says "Hi people". This
lets you know tailwind is working as expected! Hope this worked for you getting
TailwindCSS setup in Gatsby.

Make sure if you still have the server from earlier running to shut it down and
restart it.

## Links

### My github repo using Tailwind and Gatsby

[Reference Repository](https://github.com/ParamagicDev/tailwind-gatsby-project)

### Gatsby

[Gatsby](https://www.gatsbyjs.org)
[Gatsby + Tailwind tutorial](https://www.gatsbyjs.org/docs/tailwind-css/)
[Using CSS in Gatsby](https://www.gatsbyjs.org/tutorial/part-two/#creating-global-styles-with-standard-css-files)

### Tailwind

[TailwindCSS](https://tailwindcss.com/)
[TailwindCSS Installation](https://tailwindcss.com/docs/installation)
