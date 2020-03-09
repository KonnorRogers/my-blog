---
title: Adding Emotion, Typescript, and Jest to Gatsby
date: "2020-03-05T21:17:08"
description: A detailed description of adding emotion, typescript, jest, and react-testing-library.
---

## [Purpose](#)

The purpose of this is to detail how to add Emotion, Typescript, Jest,
and React-testing-library to an existing project.

<h2 id="table-of-contents">
  <a href="#table-of-contents">
  Table of Contents
  </a>
</h2>

<ul>
  <li><a href="#adding-typescript">Adding Typescript</a></li>
  <li><a href="#adding-eslint">Adding ESLint</a></li>
</ul>

<br />

I will be going through adding the above items based on using the
[Gatsby Default Starter](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-default/)

<h3 id="adding-typescript">
  <a href="#adding-typescript">
    Adding Typescript
  </a>
</h3>

```bash
npm install --save-dev typescript
```

Typescript is now in your project! However, typescript on its own does not do much.

In addition, we must now add typescript to Gatsby.

```bash
npm install gatsby-plugin-typescript
```

<br />

Now lets add it to our `gatsby-config.js` file.

```javascript
// gatsby-config.js
modules.exports = {
  // Above code omitted
  plugins: [
    // Other plugins
    "gatsby-plugin-typescript",
  ],
}
```

<br />

Lets now configure ESLint to work with typescript
to lint our files.

<h3 id="adding-eslint">
  <a href="#adding-eslint">
      Adding ESLint
  </a>
</h3>

The Gatsby default comes with a `.prettierrc` file defined.
It does not however come with a `.eslintrc.js` defined in the root directory.
So, lets add it.

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    camelcase: "off",
    "@typescript-eslint/camelcase": ["error", { properties: "never" }],
  },
  plugins: ["@typescript-eslint", "prettier", "react", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
}
```

<br />

Add an `.eslintignore` with the following config:

```javascript
// .eslintignore
node_modules
dist
coverage
```

<br />

Next, install the packages required to get ESlint to work.

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-jest eslint-plugin-react eslint-plugin-prettier
```

<br />

We save these as dev dependencies because they are not needed for runtime files.

Now, typescript should be working in your editor of choice using ESLint.

To confirm its working from the command line, let's add some scripts to our `package.json`

```javascript
{
  // Above code omitted
  scripts: {
    // Other scripts
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "type-check": "tsc --noEmit",
  }
}
```

<br />

Now we can run:

```bash
npm run type-check # should return no errors
npm run lint # runs eslint on all files
```

So now, we are able to change our `.js` files to `.tsx` files. I won't go over it here,
but I will have the corrected `.tsx` files in my gatsby starter.

<h3 id="adding-emotion">
  <a href="#adding-emotion">
    Adding Emotion
  </a>
</h3>

What is emotion? Emotion is a CSS-in-JS solution similar to styled components.

I used emotion in a previous project and enjoyed using it, so I wanted to add it to this starter.

As a bonus, css-in-js snapshot testing is great for looking for style changes when we add Jest later.

```bash
npm install gatsby-plugin-emotion @emotion/core @emotion/styled
```

After this, add the following to your `gatsby-config.js`

```javascript
// gatsby-config.js
module.exports = {
  // ...
  plugins: [
    // ...additional plugins
    `gatsby-plugin-emotion`,
  ],
}
```

Now, you're all set to add emotion to your files. Again, I won't go over that here, but the updated files will be in my starter.

<h2 id="adding-jest">
  <a href="#adding-jest">
    Adding Jest & React-Testing-Library
  </a>
</h2>

Now, lets add unit testing.

```bash
npm install --save-dev \
@types/jest @types/node jest ts-jest \
babel-jest react-test-renderer \
babel-preset-gatsby identity-obj-proxy
```

<br />

Just a quick note, ts-jest runs typechecking which jest does not run by default.

Add a test script to `package.json`

```javascript
// package.json
module.exports {
  // ...code above omitted
  scripts: {
    // ... Above scripts omitted
    "test": "jest", // One time test
    "test:watch": "jest --watch", // tests only changes
    "test:watchAll: "jest --watchAll" // runs the whole test suite everytime a change is made
  }
}
```

#### Adding react-testing-library

```bash
npm install --save-dev react-testing @testing-library/react @testing-library/jest-dom
```

<br />
