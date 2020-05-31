---
title: Building with Bridgetown - Portfolio
date: '2020-05-24T09:54:47'
description: In this post, I will be detailing how I built my portfolio
  site with Bridgetown along with TailwindCSS.
---

<h2 id="foreword">
  <a href="#foreword">Prerequisites</a>
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
# under the hood runs source ./docker.env && docker-compose [args]
./compose.sh up --build
```

And now you're completely caught up! Lets get building!

<h2 id="site-data">
  <a href="#site-data">Setting Site Data</a>
</h2>

The first thing we want to do is setup some static data for us to pull
in.

For example, we want our `first_name`, `last_name`, `github_profile`, `linkedin_profile`, `portfolio_site` and whatever else
you can think of to be easily pulled down and easily changed should
something change in the future.

So where do we go to set site data?

According to [Bridgetown
Docs](https://www.bridgetownrb.com/docs/datafiles) you set up your
static data inside of the `./_data/` directory. You can use one `YAML`,
`JSON`, or `CSV` files. I prefer `YAML` myself.

So lets add the data. Navigate to the `_data/site_metadata.yml` file.
For me, I filled in the following information:

```yaml title=_data/site_metadata.yml
title: Konnor's Portfolio
email: konnor7414@gmail.com
description: >-
  # this means to ignore newlines and clip the final new line
  This is Konnor's portfolio site. It contains info about who he is, what
  projects he is working on / has worked on, as well as contact information.

first_name: Konnor
last_name: Rogers
```

[Reference File on Github](@todo)

Now, lets create a `_data/projects.yml` file. Here, we can do things
like add links, descriptions, etc for each project that we plan on
putting in. Heres what my `_data/projects.yml` file looks like.

```yaml title=_data/projects.yml
ma_protocol_rewrite:
  source_code: https://github.com/ParamagicDev/ma-protocol-rewrite/tree/master
  deployed_app: https://inspiring-varahamihira-efb922.netlify.app/
  description: >-
    A rewrite of EMS protocols for the state of Massachusetts. The app
    is written in React / Gatsby and attempts to created a more
    navigable and searchable interface for reading the protocols. This is the
    current project im working on.

# Below projects omitted for brevity
```

[Reference File on Github](@todo)

Finally, lets add some links for people to find us:

```yaml title=_data/links.yml
blog: https://paramagicdev.github.io/my-blog
linkedin: https://www.linkedin.com/in/konnor-rogers-78b120175/
github: https://github.com/ParamagicDev
```

So now, in various pages we can access our data via a simple:

```md title=ExamplePage
{{ site.links.github }}
https://github.com/ParamagicDev

{{ site.projects.ma_protocol_rewrite[:source_code] }}
https://github.com/ParamagicDev/ma-protocol-rewrite/tree/master

{{ site.site_metadata.first_name }}
Konnor
```
