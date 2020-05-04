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
environment. Docker is not required, I used it simply to be able to
provide a reproducible environment.

<h2 id="table-of-contents">
  <a href="#table-of-contents">
    Table Of Contents
  </a>
</h2>

* [Prerequisites](#prerequisites)
* [Main Technologies](#technologies)
* [Getting Started](#getting-started)
  * [Adding a Dockerfile](#adding-a-dockerfile)
  * [Adding a Gemfile](#adding-a-gemfile)
  * [Adding entrypoint.sh](#adding-entrypoint-sh)
  * [Adding docker-compose.yml](#adding-docker-compose-yml)
  * [Prebuild Directory Structure](#prebuild-directory-structure)
  * [Prebuild Reference Repository](#prebuild-reference-repository)
* [Building the Project](#building-the-project)
  * [Create the Rails app](#create-the-rails-app)
    * [Ownership Issues](#ownership-issues)
  * [Building the Docker Container](#building-the-docker-container)
  * [Installing Webpacker](#installing-webpacker)
  * [Connecting the Database](#connecting-the-database)
* [Starting and Stopping the Application](#starting-and-stopping)
  * [Stopping the Application](#stopping-the-application)
  * [Starting the Application](#starting-the-application)
* [Extra Tips](#extra-tips)
* [Useful Commands](#useful-commands)
* [Adding additional functionality](#adding-additional-functionality)
* [Deployment](#deployment)
* [Issues](#issues)
* [Links](#links)
  * [Github Source Code](#source-code)
  * [Deployed app on Heroku](#deployed-app)
* [I know what I'm doing](#i-know-what-im-doing)

<h2 id="prerequisites">
  <a href="#prerequisites">
    Prerequisites
  </a>
</h2>

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

Make sure to install both Docker and Docker Compose prior to starting
this tutorial.

<h2 id="technologies">
  <a href="#technologies">
    Main Technologies
  </a>
</h2>

- Ruby 2.5.8
- Rails 6.0.2
- PostgresQL 11.6

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


<h3 id="adding-a-dockerfile">
  <a href="#adding-a-dockerfile">Adding a Dockerfile</a>
</h3>

The next step is to create our `Dockerfile`.
The below `Dockerfile` is slightly modified from the [Docker Quickstart
Rails](https://docs.docker.com/compose/rails/)

[Reference File on
Github](https://github.com/ParamagicDev/getting-started-with-rails-6/blob/prior-to-rails-new/Dockerfile)

```yaml
# Dockerfile
FROM ruby:2.5.8

# Adding NodeJS / Yarn
RUN curl https://deb.nodesource.com/setup_12.x | bash
RUN curl https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -qq && apt-get install -y \
  postgresql-client build-essential yarn nodejs


RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile* /myapp/
RUN bundle install
COPY . /myapp
RUN yarn install --check-files

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
  <a href="#adding-a-gemfile">
    Adding a Gemfile
  </a>
</h3>

Next we will deviate slightly from the above Docker quickstart. Instead
of using Rails 5 we'll use Rails 6.

Create a `Gemfile` with the following contents:

[Reference File on
Github](https://github.com/ParamagicDev/getting-started-with-rails-6/blob/prior-to-rails-new/Gemfile)

```ruby
# Gemfile
source 'https://rubygems.org'
gem 'rails', '~> 6'
```
<br />

Then add an empty `Gemfile.lock`

```bash
touch Gemfile.lock
```
<br />

<h3 id="adding-entrypoint-sh">
  <a href="#adding-entrypoint-sh">
    Adding entrypoint.sh
  </a>
</h3>

Now lets create an `entrypoint.sh` script to fix a server issue with
Rails.

[Reference File on
Github](https://github.com/ParamagicDev/getting-started-with-rails-6/blob/prior-to-rails-new/entrypoint.sh)

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

<h3 id="adding-docker-compose-yml">
  <a href="#adding-docker-compose-yml">
    Adding docker-compose.yml
  </a>
</h3>

Finally, lets add a `docker-compose.yml` with the following content:

[Reference File on
Github](https://github.com/ParamagicDev/getting-started-with-rails-6/blob/prior-to-rails-new/docker-compose.yml)

```yaml
version: '3'
services:
  db:
    image: postgres:12
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
      - RAILS_ENV=development

    depends_on:
      - db
```
<br />

<h3 id="prebuild-directory-structure">
  <a href="#prebuild-directory-structure">
    Prebuild Directory Structure
  </a>
</h3>

Your directory should look as follows:

```bash
.
├── docker-compose.yml
├── Dockerfile
├── entrypoint.sh
├── Gemfile
└── Gemfile.lock
```
<br />

For reference, I have created a Github branch to represent the file
structure.

<h3 id="prebuild-reference-repository">
  <a href="https://github.com/ParamagicDev/getting-started-with-rails-6/tree/prior-to-rails-new">
    Prebuild Reference Repository Branch
  </a>
</h3>
<br />

<h2 id="building-the-project">
  <a href="#building-the-project">
    Building the Project
  </a>
</h2>


<h3 id="create-the-rails-app">
  <a href="create-the-rails-app">
    Create the Rails app
  </a>
</h3>

Prior to building the docker container, you have to create the Rails app
structure. To do so, run the command below inside of your Rails project
directory.

```bash
docker-compose run web rails new . --force --no-deps --database=postgresql
```
<br />

This will build a fresh Rails project for you using `PostgresQL` as the
database adapter.

Your Rails directory should look as follows:

```bash
.
├── app
├── bin
├── config
├── config.ru
├── db
├── docker-compose.yml
├── Dockerfile
├── entrypoint.sh
├── Gemfile
├── Gemfile.lock
├── .git
├── .gitignore
├── lib
├── log
├── node_modules
├── package.json
├── public
├── Rakefile
├── README.md
├── .ruby-version
├── storage
├── test
├── tmp
└── vendor
```
<br />

<h4 id="ownership-issues">
  <a href="#ownership-issues">
    Ownership Issues
  </a>
</h4>

If you are on a Linux system, run the following command to
fix ownership issues:

```bash
sudo chown -R "$USER":"$USER" .
```
<br />

And if you're feeling real crazy, you can setup an `alias` for this
command. I have mine called `ownthis`

```bash
alias ownthis="sudo chown -R $USER:$USER ."
```
<br />

<h3 id="building-the-docker-container">
  <a href="#building-the-docker-container">
    Building the Docker container
  </a>
</h3>

Next, you have to rebuild the docker container with the new Rails dependencies
in the Gemfile. The easiest way to do this is by running the following:

```bash
docker-compose build
```
<br />

<h3 id="installing-webpacker">
  <a href="#installing-webpacker">
    Installing Webpacker
  </a>
</h3>

Rails 6 comes bundled with Webpacker by default. As a result we need to
install webpacker since this is our first time running it on this repo.
To do so, run the following command:

```bash
docker-compose run --rm web rails webpacker:install
```
<br />

Now you have `Webpacker` enabled in your Rails app!

<h3 id="connecting-the-database">
  <a href="#connecting-the-database">
    Connecting the Database
  </a>
</h3>

In order to connect the Database to Rails, you have to tell Rails where
to find the database. To do so, navigate to your `config/database.yml`
file.

Delete the contents of your `config/database.yml` and add the following:

```yaml
default: &default
  adapter: postgresql
  encoding: unicode
  host: db
  username: postgres
  password:
  pool: 5

development:
  <<: *default
  database: myapp_development


test:
  <<: *default
  database: myapp_test
```
<br />

Now you can boot the app using the following command:

```bash
docker-compose up
```
<br />

There is still one more step missing. You still need to create the
database! You have told Rails 'how' to create the database, but you have
not explicitly told Rails to 'create' the database.

In another terminal with the other terminal still running your rails
server, run the following command:

```bash
docker-compose run --rm web rails db:migrate
```
<br />

Congratulations! You have finished the setup portion of the application!

Now you should be able to view your app by navigating to:

`localhost:3000`

in your browser's address bar. You should see a message congratulating
you for using Rails.


<h2 id="starting-and-stopping">
  <a href="#starting-and-stopping">
    Starting and Stopping the Application
  </a>
</h2>

<h3 id="stopping-the-application">
  <a href="#stopping-the-application">
    Stopping the application
  </a>
</h3>

To stop the application, in another terminal simply run:

```bash
docker-compose down
```
<br />

<h3 id="starting-the-application">
  <a href="#starting-the-application">
    Starting the application
  </a>
</h3>

To start the application there are two methods.

If you have added anything to the `Gemfile`, in order to sync the
changes, you must run the following:

```bash
docker-compose run web bundle install
docker-compose up --build
```
<br />

If you have not changed anything `Gemfile` related but you may have
changed the `docker-compose.yml` file, you can simply run:

```bash
docker-compose up --build
```
<br />

However, if you do not need to rebuild, you can simply run:

```bash
docker-compose up
```
<br />

<h2 id="extra-tips">
  <a href="#extra-tips">
    Extra Tips
  </a>
</h2>

As a simple way to get you going, anytime you see

```bash
rails [command]
```
<br />

simply prepend the following:

```bash
docker-compose run --rm web rails [command]
```
<br />

`docker-compose exec` is to be run if you have a container already
running.

`docker-compose run` is to be run if you do not have a container
running.

`docker-compose run --rm` will automatically remove the docker instance
once the command finished

<h2 id="useful-commands">
  <a href="#useful-commands">
    Useful Commands
  </a>
</h2>

```bash
# builds a container
docker-compose build

# starts a container thats been built (equivalent to `rails server`)
docker-compose up

# starts and builds a container
docker-compose up --build

# runs a one-off instance
docker-compose run --rm web [command]

# runs a command inside of a running container
# `docker-compose up` needs to be running in another terminal
docker-compose exec web [command]

# stops the application
docker-compose down

# Remove orphaned containers as well
docker-compose down --remove-orphans
```
<br />


<h2 id="adding-additional-functionality">
  <a href="#adding-additional-functionality">
    Adding additional functionality
  </a>
</h2>

In an effort to keep this blog post semi-short in length, I will refer
you to the Rails guide for this part as nothing will be different. Once
you're finished going through the Rails guide, come back here and we
will deploy to Heroku!

[Ruby on Rails Guide to Getting
Started](https://guides.rubyonrails.org/getting_started.html#say-hello-rails)

You can skip to section 4.2 because everything prior to that we have
just done above.

<h2 id="deployment">
  <a href="#deployment">
    Deployment to Heroku
  </a>
</h2>

<h2 id="issues">
  <a href="#issues">
    Issues
  </a>
</h2>

Problems with ownership?

```bash
sudo chown -R "$USER":"$USER" .
```
<br />

Things not working as expected?

```bash
docker-compose down --remove-orphans
docker-compose up --build
```
<br />

Tired of the `yarn install --check-files` issues?
Disable it!

```yaml
# config/webpacker.yml

  # ...
  check_yarn_integrity: false
  # ...
```

Alternatively, run:

```bash
docker-compose run --rm web yarn install --check-files
```

To fix the issue.

<h2 id="links">
  <a href="#links">Links</a>
</h2>


<h3 id="source-code">
  <a href="https://github.com/ParamagicDev/getting-started-with-rails-6/tree/master">
    Source Code on Github
  </a>
</h3>

<h3 id="deployed-app">
  <a href="#todo">
    Deployed Application
  </a>
</h3>


<h3 id="rails">
  <a href="#rails">Rails</a>
</h3>

[Ruby on Rails Homepage](https://rubyonrails.org/)

[Ruby on Rails Getting Started Guide](https://guides.rubyonrails.org/getting_started.html)

[Webpacker Gem](https://github.com/rails/webpacker)

<h3 id="docker">
  <a href="#docker">Docker</a>
</h3>

[Docker Compose with Rails](https://docs.docker.com/compose/rails/)

<h3 id="databases">
  <a href="#databases">Databases</a>
</h3>

[PostgresQL Homepage](https://www.postgresql.org/)

[Sqlite3 Homepage](https://www.sqlite.org/index.html)

<h3 id="heroku">
  <a href="#heroku">
    Heroku
  </a>
</h3>

[Heroku Homepage](https://heroku.com)

[Heroku with Rails
Deployment](https://devcenter.heroku.com/articles/getting-started-with-rails6)

<h2 id="i-know-what-im-doing">
  <a href="#i-know-what-im-doing">
    I know what I'm doing.
  </a>
</h2>

This section is meant to be the TLDR version of the above.
This will move quickly and is meant more as a reference.

```bash
mkdir -p new-rails-app
cd new-rails-app
touch Dockerfile docker-compose.yml entrypoint.sh Gemfile Gemfile.lock
```
<br />

```yaml
# Dockerfile
FROM ruby:2.5.8

# Adding NodeJS / Yarn
RUN curl https://deb.nodesource.com/setup_12.x | bash
RUN curl https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -qq && apt-get install -y \
  postgresql-client build-essential yarn nodejs


RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile* /myapp/
RUN bundle install
COPY . /myapp
RUN yarn install --check-files

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
```
<br />

```yaml
# docker-compose.yml

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
      - RAILS_ENV=development

    depends_on:
      - db
```
<br />

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

```ruby
# Gemfile

source 'https://rubygems.org'
gem 'rails', '~> 6'
```
<br />

After setting up the above files, then run:

```bash
docker-compose run web rails new . --force --no-deps --database=postgresql
```
<br />

Now run:

```bash
docker-compose build
```
<br />

After building the image, then install webpacker:

```bash
docker-compose run --rm web rails webpacker:install
```
<br />

This will provide you with a base for webpacker.

Now setup the database in the `config/database.yml`

```yaml
# config/database.yml

default: &default
  adapter: postgresql
  encoding: unicode
  host: db
  username: postgres
  password:
  pool: 5

development:
  <<: *default
  database: myapp_development


test:
  <<: *default
  database: myapp_test
```
<br />

Next connect the database.

```bash
docker-compose run --rm web rails db:migrate
```
<br />

Finally, start the app:

```bash
docker-compose up
```
<br />

Now you can view it on `localhost:3000`
