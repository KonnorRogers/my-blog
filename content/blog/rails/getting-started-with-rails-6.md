---
title: Getting Started with Rails 6
date: "2020-05-03T17:56:32"
description: A guide to getting setup with Rails 6 using Docker
---

## Purpose

The purpose of this is to have a reusable source for setting up a Rails
project.

I will be following the [Getting Started with Rails
Guide](https://guides.rubyonrails.org/getting_started.html) to setup a
new Rails projects.

I will also be using the [Docker Quickstart with Compose and Rails
guide](https://docs.docker.com/compose/rails/)

I will also be using Docker just to provide a consistent development
environment.

<h2 id="table-of-contents">
  <a href="#table-of-contents">
    Table Of Contents
  </a>
</h2>


* [Prerequisites](#prerequisites)
* [Getting Started](#getting-started)
  * [Adding a Dockerfile](#adding-a-dockerfile)
  * [Adding a Gemfile](#adding-a-gemfile)
* [Links](#links)

<h2 id="prerequisites">
  <a href="#prerequisites">
    Prerequisites
  </a>
</h2>

- Ruby >= 2.5.0
- Rails >= 6
- PostgresQL (or Sqlite3)
- Docker
- Docker Compose

<h2 id="getting-started">
  <a href="#getting-started">
    Getting Started
  </a>
</h2>

Alright first lets create our directory where we want the Rails app. I
named mine `getting-started-with-rails-6`

```bash
mkdir getting-started-with-rails-6
cd getting-started-with-rails-6
```
<br />


<h2 id="adding-a-dockerfile">
  <a href="#adding-a-dockerfile">Adding a Dockerfile</a>
</h2>

The next step is to create our `Dockerfile`. This step is optional, if you
would like to skip this step feel free.

The below `Dockerfile` is taken from the [Docker Quickstart
Rails](https://docs.docker.com/compose/rails/)

```yaml
# Dockerfile
FROM ruby:2.5
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
COPY . /myapp

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
```
<br />

<h3 id="adding-a-gemfile">
  Adding a Gemfile
</h3>

Next we will deviate slightly from the above Docker quickstart. Instead
of using Rails 5 we'll use Rails 6.

Create a `Gemfile` with the following contents:

```ruby
# Gemfile
source 'https://rubygems.org'
gem 'rails', '~>6'
```
<br />

Then add an empty `Gemfile.lock`

```bash
touch Gemfile.lock
```
<br />

Now lets create an `entrypoint.sh` script to fix a server issue with
Rails.

```bash
#!/bin/bash
# entrypoint.sh

set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /myapp/tmp/pids/server.pid

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
```
<br />

<h3 id="adding-docker-compose">
  <a href="#adding-docker-compose">
    Adding docker-compose.yml
  </a>
</h3>

Finally, lets add a `docker-compose.yml` with the following content:

```yaml
version: '3'
services:
  db:
    image: postgres
    volumes:
      - ./tmp/db:/var/lib/postgresql/data
  web:
    build: .
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"

    volumes:
      - .:/myapp
      - /myapp/node_modules

    ports:
      - "3000:3000"

    environment:
      RAILS_ENV="development"

    depends_on:
      - db
```


<h2 id="links">
  <a href="#links">Links</a>
</h2>

<h3 id="rails">
  <a href="#rails">Rails</a>
</h3>

[Ruby on Rails Homepage](https://rubyonrails.org/)

[Ruby on Rails Getting Started Guide](https://guides.rubyonrails.org/getting_started.html)

<h3 id="docker">
  <a href="#docker">Docker</a>
</h3>

[Docker Compose with Rails](https://docs.docker.com/compose/rails/)

<h3 id="databases">
  <a href="#databases">Databases</a>
</h3>

[PostgresQL Homepage](https://www.postgresql.org/)

[Sqlite3 Homepage](https://www.sqlite.org/index.html)
