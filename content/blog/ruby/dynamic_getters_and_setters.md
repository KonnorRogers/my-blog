---
title: Dynamic Getters and Setters on an Object
date: "2020-08-10T15:35:09"
description:
  A guide to defining dynamic getters and setters on a Ruby Object
---

## The problem

So I'm currently making a Rubygem called
[Snowpacker](https://github.com/paramagicdev/snowpacker) and I ran into
an interesting problem.

In Snowpacker, I allow users to define various attributes within a Rails app initializer like so:

```ruby title=rails_app/config/initializers/snowpacker.rb
Snowpacker.configure do |snowpacker|
  snowpacker.config_dir = Rails.root.join("config", "snowpacker")
  # ... more options
end
```

The code to set this up is fairly straight forward. In my gem I have the
following 2 files:

First, we have to make a `Configuration` object.

```ruby title=lib/snowpacker/configuration.rb
module Snowpacker
  class Configuration
    attr_accessor :config_dir
    attr_accessor :config_file
    attr_accessor :babel_config_file

    # ... more accessors

  end
end
```

Then, we need to make the configuration available project wide. To do
so, we use create a class method to define a `Configuration` instance
and then we create an `attr_accessor` to be able to set & get the
`Configuration` values.

```ruby title=lib/snowpacker.rb
# ... other require statements
require "snowpacker/configuration"

module Snowpacker
  class << self
    attr_accessor :config

    def configure
      self.config ||= Configuration.new
      yield(config) if block_given?
    end
  end
end
```

So now everything works as expected. There's just one problem. What if a
user wants to define another `attr_accessor`? I can't possibly account
for this. So, lets look at how to define a dynamic `attr_accessor`.

## What does attr_accessor actually do?

Well first, `attr_accessor` combines `attr_writer` and `attr_reader`.

Totally not helpful right? Well lets break it down further.

`attr_writer :name` is the equivalent of:

```ruby
def name
  @name
end
```

And `attr_reader :name` is the equivalent of:

```ruby
def name=(value)
  @name = value
end
```

So `attr_accessor` neatly provides these 2 methods


## Why should I care?

But Konnor, why does that matter? Well the reason it matters is that in
my `snowpack.config.js` I read the value of Environment variables to
make certain things behave in certain ways. The way these values are
set are via instance variables. Basically, `Snowpacker` will take all
the instance_variables of the `Configuration` object and prepend
"SNOWPACKER\_" to it.

For example youre given the following code:

```ruby title=rails_app/config/initializers/snowpacker.rb
Snowpacker.configure do |snowpacker|
  snowpacker.config_dir = Rails.root.join("config", "snowpacker")
  snowpacker.babel_config_file = File.join(snowpacker.config_dir,
  "babel.config.js")
  # ... more options
end
```

What Snowpacker will do at runtime is create a `SNOWPACKER_CONFIG_DIR`
environment variable as well as a `SNOWPACKER_BABEL_CONFIG_FILE`.

Both values can now be accessed via `ENV["SNOWPACKER_<VARNAME>"]`

## Okay, fine, its important, so whats the next step?

Initially I had a very ugly non-idiomatic workaround. Then it dawned on
me to use the `method_missing` approach.

Here's how I setup dynamic attribute getting and setting in Snowpacker.

```ruby title=lib/snowpacker/configuration.rb
module Snowpacker
  class Configuration
    attr_accessor :config_dir
    # ... Other base accessors

  end
end
```
