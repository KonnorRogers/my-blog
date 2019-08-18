---
title: Learning PHP Part 1 - Lets Compile PHP!
date: "2019-08-18"
description: "What I've learned from watching PHP for Beginners from Laracasts"
---

# Purpose

To document my trials & tribulations with PHP

## Installing PHP

Originally, I installed PHP the usual way. 

```bash
sudo apt install -y php
php -v
# blah blah blah php-7.2.x
```
Okay sweet its installed...hmmm I wonder if anyone else uses an environment manager
like I do so Ruby.

So with very little effort I found phpenv! Aha! Awesome good stuff. I have a ton
of packages from when I compiled Ruby. Piece of cake. I have my handy dandy
VpsCli packages I'm good to go! Okay, here we go:

```bash
curl -L https://raw.githubusercontent.com/phpenv/phpenv-installer/master/bin/phpenv-installer \
    | bash
# xyz happens you know how it goes

phpenv install 7.3.8
# configure: error reinstall BZip2
```

Yea sure, no problem whatever, I'll google, find the package easy peezy.
About 10 compilation errors later and adding multiple packages to my VpsCli gem.
(Which I really need to fix. I plan to have it take in a YAML file of packages
rather than manual installs, but different problem for a different day)

After a lot of blood sweat and tears, I finally managed to compile php.
[VpsCli - packages](https://github.com/ParamagicDev/vps_cli/blob/master/lib/vps_cli/packages.rb)
If you look under Packages::LIBS it continued all the "sudo apt install -y #{pkg}"
I used in the process.
Yes, I know the codebase needs some TLC to get it to where I want it to be. 
I wrote it ~6-8months ago. Maybe I'll rewrite it in PHP?! Who knows! But continue
on this Laracasts PHP journey with me!

