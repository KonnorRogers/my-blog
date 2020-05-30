---
title: Build time code blocks with Gatsby
date: '2020-05-30T00:44:05'
description: In this brief post I'll go over how to create build time
  code blocks using Gatsby & MDX.
---

## Description

This is a quick post on how to build code blocks @ build time using
Gatsby. This post will only cover pulling down from Github, however, you
could check out other `gatsby-source` plugins as well as check out
[Gatsby's guide to build time blocks.](https://www.gatsbyjs.org/docs/data-fetching/)

<h2 id="prerequisites">
  <a href="#prerequisites">
    Prerequisites
  </a>
</h2>

- Gatsby (Obviously)
- MDX (I used [this repo](https://www.gatsbyjs.org/starters/hagnerd/gatsby-starter-blog-mdx/) for my blog)

<h2 id="assumptions">
  <a href="#assumptions">
    Assumptions
  </a>
</h2>

Unfortunately for this post a lot of assumptions must be made, so if
you're not using the above linked starter, you may have to fill in some
blanks.

Also, I will be using Yarn for this. Feel free to use NPM.

<h2 id="getting-started">
  <a href="#getting-started">
    Getting Started
  </a>
</h2>

Before we get too far, lets have a chat about ENV variables. The easiest
way to source them is to use
. Optionally, you could
set them manually / via a script. We'll use `dotenv` here for
simplicity's sake. For further reading on ENV variables check out

So let's install `dotenv`

```bash
yarn add dotenv
```

Alright, you got a fresh new blog, `dotenv` installed so lets get to it.
Lets now install a [gatsby-source-graphql
plugin](https://www.gatsbyjs.org/packages/gatsby-source-graphql/) This
will pull in the files we need at build time. Add it to your project
like so:

```bash
yarn add gatsby-source-graphql
```

Now, in your `gatsby-config.js` file add the following lines:

```diff file=gatsby-config.js
module.exports = {
  // ...
  plugins: [
    // ...
+   {
+     resolve: `gatsby-source-graphql`,
+     options: {
+       typeName: `GitHub`,
+       fieldName: `github`,
+       url: `https://api.github.com/graphql`,
+
+       // https://github.com/settings/tokens to obtain
+       headers: {
+         Authorization: process.env.GITHUB_API_TOKEN,
+       },
+     },
+   },
  ],
  // ...
}
```

Now if you notice above we have to send over a `header` to Github. To do
so, you need a `GITHUB_API_TOKEN`. Tokens can be generated here
[https://github.com/settings/tokens](https://github.com/settings/tokens).

Make sure to check the `repo` scope to allow you read from both public
and private repositories.

The next step is to provide a way for us to access this API token. We
don't want everyone to see it so we store it in an ENV variable. Right
now we have no way of accessing the ENV variable so lets pull in a
package to read it for us.

[Gatsby's guide to ENV
variables](https://www.gatsbyjs.org/docs/environment-variables/)

[dotenv](https://www.npmjs.com/package/dotenv) Provides us the ability
to do just that.

To install `dotenv` run the following:

```bash
yarn add dotenv
```

Now in your `gatsby-config.js` at the top of the file add the following:

```diff file=gatsby-config.js
+ require("dotenv").config()
+
module.exports = {
  // ...
}
```

This will source ENV variables from a file called `.env`.

Now lets create a `.env` file at the root of our project.

```sh
GITHUB_API_TOKEN="<token>"
```

This will now allow Gatsby to read your API token at build time without
exposing it in your source control.

### Note:

Make sure your `.env` file is in your `.gitignore`.

<h2 id="building-the-component">
  <a href="#building-the-component">
    Building the component
  </a>
</h2>

We have all the blocks in place to create a component to source our data
from Github. Now lets build it!

<h2 id="limitations">
  <a href="#limitations">
    Limitations
  </a>
</h2>

This component does not support code diffs and doesnt support pulling
based on lines of a file.
