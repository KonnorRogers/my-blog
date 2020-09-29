---
title: Webpack, Rollup, Parcel, Snowpack, and beyond
date: "2020-09-29T15:32:30"
description:
  A brief comparison between popular frontend bundlers. I
  will walk through my thoughts and feelings related to each bundler
---

## What this post is not

This post will not get into bundle sizes, compilation times, and the
nitty gritty of each bundler. But why? I wanna see the numbers!! The
issue is each bundler uses different loaders based on the file type. Not
all loaders are created equally and frankly, it would require a lot of
effort to go through each individual loader for each bundler and create
benchmarks. Instead, this post is a brief high-level overview of
different frontend bundlers and the general problems they try to solve.

## History

Why do we need bundlers? Browser-based Javascript prior to ES6
(introduced in 2015) had no way of
importing a file natively. Instead you either chained `<script>` tags,
or you had one massive Javascript file you would ship to the browser.
For example you may have the following in your HTML.

```html
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="/dist/my-awesome-script.js"></script>
```

Now we get into the issue of, if `my-awesome-script.js` depends on
jQuery to load, what happens if loading the `jQuery` scripts fails? Is
my site now broken? You can quickly see why this is an issue. It gets
worse when you also realize that you cant break up your Javascript files
into smaller more manageable files.

## The solution

As far as I can tell [Webpack](https://webpack.js.org/) was the first
frontend bundler on the scene. It appeared in 2015, around the same time as
[Browserify](http://browserify.org/). Webpack's goal was simple, allow
for assets and javascript to be made more atomic yet still bundled
nicely for production. Since Webpack was released there have been many
more frontend bundlers released IE: [Parcel](https://parceljs.org/),
[Rollup](https://rollupjs.org/guide/en/), and most recently there have
been a number of ES Module based "bundlers" (still not sure bundler is
the right term) released such as
[Snowpack](https://www.snowpack.dev/) and
[Vite](https://github.com/vitejs/vite).

## Bundlers

There are currently 3 major traditional frontend bundlers that most
people talk about. [Webpack](https://webpack.js.org),
[Rollup](https://rollupks.org), and [Parcel](https://parceljs.org)

### Choosing the right one for you

#### Webpack

"Webpack is for website", Webpack is the oldest of the 3 bundlers.
Webpack, in my opinion, is also the most complicated to setup of the 3
bundlers. This isn't a knock against Webpack, it's a super powerful tool,
but it is also quite complex. The reason people say this is that historically
Webpack was used for websites, but theres no reason you can't use it for
an NPM package.

#### Rollup

"Rollup is for libraries", Rollup is significantly more minimal than
Webpack, Rollup doesnt even include a dev server! Rollup was released
shortly after Webpack, based on my search around 2016. When it was first
released it had minimal support for assets such as CSS, images, etc.
However, nowadays Rollup is just as full featured as Webpack. There's no
reason you can't use it for websites.

#### Parcel

Parcel is the newest of the 3 appearing at the beginning of 2018. Parcel
states it is a "Blazing fast, zero configuration web application
bundler". Now I have the least experience with Parcel, however, my
experience with Parcel has been nothing short of awesome. It holds true
to its promise. It even supports both HTML and JS entrypoints so it can
be used for libraries or for websites. A lot of the issue people had
with Parcel initially when it was first released was the size of its
bundles. They have made great strides to be on par with Rollup and
Webpack.

#### OK...So what is right for me?

Try all 3, see which one you like best. They honestly all accomplish the
same task and can do roughly the same thing. As of Webpack 4, ESM is
natively supported. Assets are fully supported by Rollup. Parcel bundle
sizes are significantly smaller than they used to be. Seriously, just
try them.

## A new challenger approaches

ESM-based frontend "bundlers...compilers?", I don't know what to call them!
Are the cool new thing out there. They independently build each file in
parallel getting rid of the traditional compilation step that people
complain about with traditional frontend bundlers. The new ESM-based
compilers like Snowpack and Vite leverage the ES6 `import / export`
syntax to be able to provide blazing fast unbundled development
environments to increase productivity.

These ESM-based compilers are fairly new, but have gained a significant
amount of traction. In fact, I'm currently working on
[Snowpacker](https://github.com/paramagicdev/snowpacker), a Ruby on
Rails integration with Snowpack to bring unbundled development
environments to the Rails world. The project is not quite ready for
release yet, but significant strides have been made and a release should
be on the horizon.

## Summary

Parcel, Webpack, and Rollup are all great. Use whichever one you want.
Historically Webpack was for websites due to its full feature set,
Rollup was for libraries due to lack of asset handling and minimalism,
and Parcel was for prototypes due to large bundle sizes, but I feel all
3 statements above are no longer true due to vast improvements by all 3
libraries. ESM-based compilers like Vite and Snowpack are showing great
promise and definitely be on the look out for them!

## Links

### [Webpack](https://webpack.js.org/)

### [Rollup](https://rollupjs.org/guide/en/)

### [Parcel](https://parceljs.org/)

### [Snowpack](https://www.snowpack.dev/)

### [Vite](https://github.com/vitejs/vite)

### [Snowpacker](https://githubm.com/paramagicdev/snowpacker)

