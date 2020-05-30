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
- MDX (I used this repo for my blog
  [https://www.gatsbyjs.org/starters/hagnerd/gatsby-starter-blog-mdx/](https://www.gatsbyjs.org/starters/hagnerd/gatsby-starter-blog-mdx/)

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
[dotenv](https://www.npmjs.com/package/dotenv). Optionally, you could
set them manually / via a script. We'll use `dotenv` here for
simplicity's sake. For further reading on ENV variables check out
[Gatsby's guide to ENV
variables](https://www.gatsbyjs.org/docs/environment-variables/)

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

```javascript file=gatsby-config.js
module.exports = {
  // ...
  plugins: [
    // ...
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `GitHub`,
        fieldName: `github`,
        url: `https://api.github.com/graphql`,

        // https://github.com/settings/tokens to obtain
        headers: {
          Authorization: process.env['GITHUB_API_TOKEN'],
        },
      },
    },
  ],
  // ...
}
```

Now if you notice above we have to send over a `header` to Github. To do
so, you need a `GITHUB_API_TOKEN`. Tokens can be generated here
[https://github.com/settings/tokens](https://github.com/settings/tokens).

Make sure to check the `repo` scope to allow you read from both public
and private repositories.
