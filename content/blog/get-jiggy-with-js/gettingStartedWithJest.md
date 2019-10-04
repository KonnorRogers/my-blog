---
title: Getting started with Jest
date: "2019-10-02T18:20:55"
description: Getting started with Jest in either a new or existing project
  that does not currently have a testing suite. In addition, we will be adding
  an ESLint config and babel config that uses Jest so we can practice good code style
---

# Purpose

When using new tools I like to create my own documentation of setup.<br>
In this case we will be looking at: [Jest](https://jestjs.io)<br>

Jest is a simple testing framework for javascript that as far as I can tell, uses
very similar syntax to RSpec. In fact, it even supports the \*.spec.js file extension.
I however, like to use the \*.test.js file, but you are free to do as you please.

## Quick Start

At the time of writing this, I am using Jest 24.9, Babel 7.6, and ESLint 6.5

ESLint is not necessary for this Jest to properly use the import / export syntax,
however, I like it for using prettier within my work environment.

```bash
# If its a new project
npm init

# install eslint, jest, and babel packages
npm install --save-dev jest babel-jest @babel-core @babel-preset-env regenerator-runtime eslint eslint-plugin-jest

# create a config file for jest and eslint
npx jest --init
npx eslint --init
```

Then modify eslint and jest config files accordingly.

[My Jest Config](https://github.com/ParamagicDev/TicTacToeJS/blob/master/jest.config.js)
I just use the default from `npx jest --init`

[My ESLint Config](https://github.com/ParamagicDev/TicTacToeJS/blob/master/.eslintrc.js)

I simply used the default from `npx eslint --init` and chose the appropriate options for the project.
I added the following lines for use with Jest.

```javascript
module.exports = {
  // ...
  env: {
    "jest/globals": true,
  },
  extends: ["plugins:jest/recommended", "eslint:recommended"],
  plugins: ["jest"],
  // ...
}
```

[My Babel Config](https://github.com/ParamagicDev/TicTacToeJS/blob/master/babel.config.js)
There appears to be no `npx babel --init` so you must generate your own config file.
I generated my using the [Docs](https://jestjs.io/docs/en/getting-started#using-babel)
and it worked right out of the box.

```javascript
// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
}
```

## Getting started

[Jest Getting Started](https://jestjs.io/docs/en/22.x/getting-started.html)<br>

Jest's documentation is quite good. And I quite enjoyed reading it<br>

To start run the following:

It uses node syntax of module.exports = <variable> however, which means when creating
a browser based javascript repository, it will not support the `import` and `export`
keywords used to share modules.

Luckily, people already thought of this, so there is a babel transpiler for this.
