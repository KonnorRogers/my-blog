---
title: How to setup TailwindCSS with PostCSS and Webpack
date: "2019-10-11T02:59:29"
description: I will detail how to setup TailwindCSS with PostCSS and Webpack.
  I will do the bare minimum setup to get it working without many plugins.
---

## Quick Start

### File structure

```project
- current_directory/
| dist/
  |-- index.html
| src/
  |-- index.js
  |-- styles.css
| package-lock.json
| package.json
| postcss.config.js
| README.md
| tailwind.config.js
| webpack.config.js
```

```bash
npm init # if new project

# install packages
npm install --save-dev \
webpack webpack-cli webpack-dev-server  \
postcss tailwindcss \
postcss-loader css-loader style-loader \

# Setup config files
&& npx tailwind init \
&& touch webpack.config.js \
&& touch postcss.config.js
```

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
```

```javascript
// webpack.config.js
const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
      },
    ],
  },

  // Optional for webpack-dev-server
  devServer: {
    watchContentBase: true,
    contentBase: path.resolve(__dirname, "dist"),
    open: true,
  },
}
```

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer"),
  ],
}
```

```css
/* src/styles.css */

@tailwind base;

@tailwind components;

@tailwind utilities;
```

```javascript
/* src/index.js */
import "./styles.css"
```

```html
<!-- dist/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Title</title>

    <!-- imports tailwind styles  -->
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="text-red-500">Test Input</div>
    <!-- Where webpack will output to -->
    <script src="bundle.js"></script>
  </body>
</html>
```

```bash
npx webpack-dev-server # This will let you view it on localhost with live-reload
npx webpack # Will build the project
```

Alternatively, you can create a dev command.

```javascript
// package.json
{
  // ...
  "scripts": {
    "dev:watch": "webpack-dev-server --mode=development --config webpack.config.js"
    "dev:build": "webpack --mode=development --config webpack.config.js"
  }
  // ...
}
```

```bash
npm run dev:watch
npm run dev:build
```

This should get you up and running with tailwindCSS in a development environment.
I don't recommend this for production particularly because it does not have PurgeCSS.
This is meant more as a quick reference to start a project. I also recommend digging
deeper into webpacks documentation as well as PostCSS to get a better idea on how
to use both.
