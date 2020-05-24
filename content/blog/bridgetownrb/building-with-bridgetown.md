---
title: Building with Bridgetown - Portfolio
date: "2020-05-24T09:54:47"
description: In this post, I will be detailing how I built my portfolio
  site with Bridgetown along with TailwindCSS.
---

<h2 id="foreword">
  <a href="#foreword">
    Prerequisites
  </a>
</h2>

This will be the actual building portion of creating a site with
[Bridgetown](https://bridgetownrb.com)

To go back and see how the project is setup, check out [Dockerizing
Bridgetown](bridgetownrb/dockerizing-bridgetown/)

Alternatively, to follow along you could simply do the following:

```bash
git clone https://github.com/ParamagicDev/getting-started-with-bridgetown

cd getting-started-with-bridgetown
rm -rf .git
git init
source ./docker.env && docker-compose up --build
```

And now you're completely caught up! Lets get building!

<h2 id="site-data">
  <a href="#site-data">
    Setting Site Data
  </a>
</h2>

The first thing we want to do is setup some static data for us to pull
in.

For example, we want our `first_name`, `last_name`, `blog_site`,
`github_profile`, `linkedin_profile`, `portfolio_site` and whatever else
you can think of to be easily pulled down and easily changed should
something change in the future.

So where do we go to set site data?

According to [Bridgetown
Docs](https://www.bridgetownrb.com/docs/datafiles) you set up your
static data inside of the `./_data/` directory. You can use one `YAML`,
`JSON`, or `CSV` files. I prefer `YAML` myself.

So lets add the data. Navigate to the `_data` directory.

```

```
