---
title: Making EMS Helper - Setting up
date: "2019-12-08T22:40:37"
description: Detailing the initial setup of EMS Helper with Rails 6, Webpack,
  TailwindCSS, Docker, and Docker-Compose
---

## [Github Repo](https://github.com/ParamagicDev/ems_helper/tree/cd623419d8c885cac66c1d3e6fa0f8507d35b686)

## Creating a Rails 6 app

`rails new ems_helper --database=postgresql`

This will generate the initial project structure. I will be using postgresql as my database.

### Adding .env files

I added the .env file as well the `dotenv-rails` gem to allow the use
of the .env files to allow for easy local development for things that requires
logins or API keys.

[My gemfile](https://github.com/ParamagicDev/ems_helper/blob/master/Gemfile)

```ruby
# Gemfile

# ...
# Make sure it is the first gem added. This way gems that require privileges
# can inherit from dotenv-rails
gem 'dotenv-rails', groups: %i[development test]
# ...
```

## Docker

First things first, setup a Dockerfile

### Adding Dockerfile

[My Dockerfile](https://github.com/ParamagicDev/ems_helper/blob/master/Dockerfile)

Basically, pull in Ruby 2.6.3, add nodejs, and add all packages is what this Dockerfile does.

### Setting up docker-compose

docker-compose is a utility provided by Docker to pull in various components.

IE: Redis, Memcache, caching layer, PostgresQL, MySQL, MonogoDB databases, and various
other web components.

Here is a link to my [docker-compose.yml](https://github.com/ParamagicDev/ems_helper/blob/master/docker-compose.yml) file which pulls in PostgresQL.

I pulled most of this config off the [Docker official documentation](https://docs.docker.com/compose/rails/).

### Using docker-compose

Alright time to start everything up.

Run a `docker-compose up --build`.

Go grab a coffee, take a bathroom break, this may take a little while.

Then run the following inside a seperate terminal once that has all finished

```bash
docker-compose run --rm web rails db:setup
```

Finally, in your browser navigate to `localhost:3000`

The "Hello, Welcome to Rails" page should appear!

#### Quick note

If on Linux, for me there are some permissions issues with Docker. <br>
Ensure to `chown -R .` from the root directory after using Docker if you run into
permissions issues

### Adding tailwindcss

I really enjoy using [TailwindCSS](https://tailwindcss.com) so I added it into
the application.

There's a few steps to this.

1. `yarn install tailwindcss` - add the tailwindcss node module

2. Then, create a tailwind stylesheet called `./app/javascript/stylesheets/tailwind.scss`
   Add the base classes.

```scss
// app/javascript/stylesheets/tailwind.css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

3. Inside `./app/javascript/packs/application.js` add the following require statement.

```javascript
// app/javascript/packs/application.js

// ...
require("stylesheets/tailwind.scss")
// ...
```

4. Finally, inside of `./app/views/layouts/application.html.erb`

Add a stylesheet pack tag inside the head of the view

```erb
<%# app/views/layouts/application.html.erb %>

<head>
# ...
<%= stylesheet_pack_tag 'application', media: 'all', 'data-turbolinks-track': 'reload' %>
# ...
</head>
```

5. Unfortunately, you can't really test that everything is working yet. So, let's make it work!

```bash
docker-compose run --rm web rails generate controller static_pages index
```

Navigate to `config/routes.rb` and add the following

```ruby
Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'static_pages#index'
end
```

6. Bringing it all together, to ensure everything works as correctly, add a Tailwind
   class to an html element.

```erb
<%# app/views/static_pages/index.html.erb %>

<%# ... %>
<body>
  <div class="text-red-500">
    Hello there!
  </div>
</body>
<%# ... %>
```

And thats it! You're now fully setup with Rails 6, webpack, TailwindCSS, Docker / docker-compose
From here, its time to start parsing the API content. That will be the next installment
I will write!

## Links

Special thanks to Chris @ gorails for his free content.
He helped me with the tailwind setup.
[Tailwind Setup Video](https://gorails.com/episodes/tailwind-css-framework-with-rails)

Docker documentation is fantastic check it out.
[Docker Docs](https://docs.docker.com/)

Check out the Rails docs obviously
[Rails Docs](https://rubyonrails.org/)

Finally, feel free to follow along with my repo. Most of the development will take
place on the `development branch`.

[Github Repo](https://github.com/ParamagicDev/ems_helper)
