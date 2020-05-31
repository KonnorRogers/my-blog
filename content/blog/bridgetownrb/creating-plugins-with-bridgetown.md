---
title: Creating a plugin with Bridgetown
date: '2020-05-30T10:27:31'
description: I will go over how to create a Gem for use with Bridgetown.
---

## Purpose

I want to to detail my process of creating a plugin with
[Bridgetown](https://bridgetownrb.com).

The official guides probably explain way better than me. This is more of
a personal reference documenting my process.

[Link to official guides](https://www.bridgetownrb.com/docs/plugins)

## What plugin will we be building?

The plan for this guide is to create a
[TailwindCSS](https://tailwindcss.com/) plugin for anyone to
add tailwind with ease.

## Pulling down sample repository

First step is to pull down the sample plugin repository

[Sample Plugin
Repository](https://github.com/bridgetownrb/bridgetown-sample-plugin)

```bash
git clone https://github.com/bridgetownrb/bridgetown-sample-plugin
mv bridgetown-sample-plugin my-plugin
cd my-plugin
bundle install
rm -rf .git
git init
git add -A
git commit -m "Plugin initial structure"
```

## Digging through

First step is to check out the `bridgetown-sample-plugin.spec`

```diff file=bridgetown-sample-plugin.spec

# ...
Gem::Specification.new do |spec|
# ...
-  spec.name          = "bridgetown-sample-plugin"
+  spec.name          = "bridgetown-plugin-tailwindcss"

-  spec.version       = SamplePlugin::VERSION
+  spec.version       = TailwindCss::VERSION

-  spec.author        = "Bridgetown Team"
+  spec.author        = "Konnor Rogers"

-  spec.email         = "maintainers@bridgetownrb.com"
+  spec.email         = "konnor7414@gmail.com"

-  spec.summary       = "Sample code for creating new Bridgetown plugins"
+  spec.summary       = "A plugin for adding tailwindcss to bridgetown"

-  spec.homepage      = "https://github.com/bridgetownrb/bridgetown-sample-plugin"
+  spec.homepage      = "https://github.com/ParamagicDev/bridgetown-plugin-tailwindcss"
# ...
end
# ...
```

So you'll notice above a few changes. We had to rename
`SamplePlugin::VERSION` to `TailwindCss::VERSION`. There requires a lot
of renaming to get this to work. I created a Rake task for this problem.

```diff file=package.json
  {
    "repository": {
      "type": "git",

-     "url": "https://github.com/bridgetownrb/bridgetown-sample-plugin.git"
+     "url":
"https://github.com/paramagicdev/bridgetown-plugin-tailwindcss.git"
    },

-    "author": "Bridgetown Maintainers <maintainers@bridgetownrb.com>",
+    "author": "Konnor Rogers <konnor7414@gmail.com>",
    "homepage": "https://www.bridgetownrb.com",
  }
```

Feel free to use it:

```ruby file=Rakefile
# frozen_string_literal: true

require "bundler/gem_tasks"
require "rspec/core/rake_task"

RSpec::Core::RakeTask.new(:spec)

task :default => :spec
task :test => :spec

def filelist(*strings)
  Rake::FileList.new(strings) do |fl|
    fl.exclude(/node_modules/)
    fl.exclude(/Rakefile/)
    fl.exclude(/\.md/)
    fl.exclude(/\.txt/)
    fl.exclude(/tags/)
  end
end

def file_rename(file, regex, string)
  return nil unless file =~ regex

  new_file = file.gsub(regex, string)
  Rake.mkdir_p(File.dirname(new_file))
  Rake.mv(file, new_file)
end

PLUGIN_NAME = "bridgetown-plugin-tailwindcss"
UNDERSCORE_PLUGIN_NAME = PLUGIN_NAME.gsub(/-/, "_")
MODULE_NAME = "TailwindCss"

SAMPLE_PLUGIN = /sample-plugin/
UNDERSCORE_SAMPLE_PLUGIN = /sample_plugin/
BRIDGETOWN_SAMPLE_PLUGIN = /bridgetown-sample-plugin/
SAMPLE_PLUGIN_MODULE = /SamplePlugin/

ALL_REGEX_ARY = [
  SAMPLE_PLUGIN,
  UNDERSCORE_SAMPLE_PLUGIN,
  BRIDGETOWN_SAMPLE_PLUGIN,
  SAMPLE_PLUGIN_MODULE
]

# Reverse it so files come first, then directories
ALL_FILES = filelist("**/*").reverse

# https://avdi.codes/rake-part-2-file-lists/
namespace :plugin do
  desc "Renames and rewrites files"
  task rename: [:rewrite_files, :rename_files] do
  end

  desc "Renames the plugin"
  task :rename_files do
    ALL_FILES.map do |file|
      file_rename(file, BRIDGETOWN_SAMPLE_PLUGIN, PLUGIN_NAME)
      file_rename(file, SAMPLE_PLUGIN, PLUGIN_NAME)
      file_rename(file, UNDERSCORE_SAMPLE_PLUGIN, UNDERSCORE_PLUGIN_NAME)
    end
  end

  desc "Renames the plugin inside of files"
  task :rewrite_files do
    ALL_FILES.each do |file|
      next if File.directory?(file)

      # Fixes an issue with non-unicode characters
      text = File.read(file).encode("UTF-8", invalid: :replace, replace: "?")

      # Go to next iteration, unless it contains the regex
      next unless ALL_REGEX_ARY.any? { |regex| text =~ regex }

      # Check for /bridgetown-sample-plugin/ first, if that doesnt
      # exist, then check for regular /sample-plugin/
      replacement_text = text.gsub(SAMPLE_PLUGIN_MODULE, MODULE_NAME)
      replacement_text = replacement_text.gsub(BRIDGETOWN_SAMPLE_PLUGIN, PLUGIN_NAME)
      replacement_text = replacement_text.gsub(SAMPLE_PLUGIN, PLUGIN_NAME)
      replacement_text = replacement_text.gsub(UNDERSCORE_SAMPLE_PLUGIN,
                                               UNDERSCORE_PLUGIN_NAME)
      File.open(file, "w") { |file| file.puts replacement_text }
    end
  end
end
```

[Check out the Gist here](https://gist.github.com/ParamagicDev/cd7bede36e3c19f2580ff1b5300fc2d1)

