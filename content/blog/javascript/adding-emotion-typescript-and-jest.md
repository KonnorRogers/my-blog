---
title: Adding Emotion, Typescript, and Jest to Gatsby
date: "2020-03-05T21:17:08"
description: A detailed description of adding emotion, typescript, jest, and react-testing-library.
---

## Purpose

The purpose of this is to detail how to add Emotion, Typescript, Jest,
and React-testing-library to an existing project.

<a href="#table-of-contents">
  <h2 id="table-of-contents">
    Table of Contents
  </h2>
</a>

<a href="#adding-eslint">
  <h3 id="adding-eslint">
    Adding ESLint
  </h3>
</a>

Before we add typescript, lets first specify the linting options.

The Gatsby default comes with a `.prettierrc` file defined.
It does not however come with a `.eslintrc.js` defined in the root directory.
So, lets add it.

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "jest"],
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
  ],
}
```

Add an `.eslintignore` with the following config:

```javascript
// .eslintignore

# don't ever lint node_modules
node_modules
# don't lint build output (make sure it's set to your correct build folder name)
dist
# don't lint nyc coverage output
coverage
```

Next, install the packages required to get ESlint to work.

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-jest eslint-plugin-react eslint-plugin-prettier
```

We save these as dev dependencies because they are not needed for runtime files.

Next, we need to add typescript otherwise eslint wont work properly.

<a href="#adding-typescript">
  <h3 id="adding-typescript">Adding Typescript</h3>
</a>

```bash
npm install --save-dev typescript
```
