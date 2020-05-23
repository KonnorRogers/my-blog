---
title: Dockerizing Bridgetown
date: "2020-05-23T15:55:36"
description: Getting started building with Bridgetown by dockerizing it. I'll walk through a Docker setup for Bridgetown using Alpine Linux.
---

## What is Bridgetownrb?

I heard about [Bridgetownrb](https://bridgetownrb.com) on Twitter.
Bridgetownrb is "A Webpack-aware, Ruby-powered static site generator
for the modern Jamstack era."

So what does that mean? I'm not entirely certain. To me it means it is a
static site generator that uses Webpack under the hood and can source
data from other sources just like other static site generators like
[Gatsby](https://gatsbyjs.org) or [Gridsome](https://gridsome.org/)

<h2 id="table-of-contents">
  <a href="#table-of-contents">
    Table Of Contents
  </a>
</h2>

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
  - [Create a new directory](#create-directory)
  - [Adding a Dockerfile](#adding-dockerfile)
  - [Adding a docker-compose.yml](#adding-docker-compose)
  - [Adding a docker.env](#adding-docker-env)
  - [Adding a .dockerignore](#adding-docker-ignore)
  - [Adding a Gemfile](#adding-gemfile)
  - [Adding a Gemfile.lock](#adding-gemfile-lock)
  - [Adding a package.json](#adding-package-json)
  - [Adding a yarn.lock](#adding-yarn-lock)

<h2 id="prerequisites">
  <a href="#prerequisites">
    Prerequisites
  </a>
</h2>

There are only 2 prerequisites for this project.

Docker & Docker Compose. To check you have them, run the following:

```bash
docker -v
# Docker version 19.03.6, build 369ce74a3c

docker-compose -v
# docker-compose version 1.25.0, build unknown
```

<h2 id="initial-setup">
  <a href="#initial-setup">
    Initial Setup
  </a>
</h2>

<h3 id="create-directory">
  <a href="#create-directory">
  Create a new directory
  </a>
</h3>

Now that we've confirmed Docker and Docker Compose are installed, lets
setup the initial structure for Docker to pull down Bridgetownrb so we
do not have to install it locally.

<h3 id="adding-dockerfile">
  <a href="#adding-dockerfile">
    Adding a Dockerfile
  </a>
</h3>

I'm not goin to go too in depth into this Dockerfile, but the point of
it is to be able to run a Docker container as a non-root user and still
do everything you need to do. We'll be using Alpine Linux to keep the
image small.

Create a `Dockerfile` and add the following contents into it.

```dockerfile
FROM ruby:2.6-alpine3.11 as builder

RUN apk add --no-cache --virtual \\
    #
    # required
    nodejs-dev yarn bash \\
    tzdata build-base libffi-dev \\
    #
    # nice to haves
    curl git \\
    #
    # Fixes watch file isses with things like HMR
    libnotify-dev

FROM builder as bridgetownrb-app

# This is to fix an issue on Linux with permissions issues
ARG USER_ID=${USER_ID:-1000}
ARG GROUP_ID=${GROUP_ID:-1000}
ARG DOCKER_USER=${DOCKER_USER:-user}
ARG APP_DIR=${APP_DIR:-/home/$USER/bridgetown-app}

# Create a non-root user
RUN addgroup -g $GROUP_ID -S $GROUP_ID
RUN adduser --disabled-password -G $GROUP_ID --uid $USER_ID -S $DOCKER_USER

# Create and then own the directory to fix permissions issues
RUN mkdir -p $APP_DIR
RUN chown -R $USER_ID:$GROUP_ID $APP_DIR

# Define the user running the container
USER $USER_ID:$GROUP_ID

# . now == $APP_DIR
WORKDIR $APP_DIR

# COPY is run as a root user, not as the USER defined above, so we must chown it
COPY --chown=$USER_ID:$GROUP_ID Gemfile* $APP_DIR/
RUN gem install bundler
RUN bundle install

# For webpacker / node_modules
COPY --chown=$USER_ID:$GROUP_ID package.json $APP_DIR
COPY --chown=$USER_ID:$GROUP_ID yarn.lock $APP_DIR

RUN yarn install

CMD ["yarn", "start"]

```
