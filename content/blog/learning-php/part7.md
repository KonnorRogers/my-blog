---
title: PHP for beginners - Part 7 - Classes?...Like school?
date: "2019-08-26T06:31:03"
description: "Lets look into classes in PHP. Classes are the building blocks
              of Object Oriented Programming"
---

# Part 7

[Laracasts main site](https://laracasts.com)<br>
[Laracasts - PHP for beginners](https://laracasts.com/series/php-for-beginners)

## Chapters covered

[Chapter 12 - Classes 101](https://laracasts.com/series/php-for-beginners/episodes/12)

### Chapter 12 - Classes 101

What is a class? Well, according to Wikipedia, this is what a programming class is:<br>
In object-oriented programming, a class is an extensible program-code-template for creating objects, providing initial values for state (member variables) and implementations of behavior (member functions or methods)

What does that mean? A class is very simply a way of packaging variables and functions
within a template to be reused or extended.

Yea but what does that mean? Its kind of hard to wrap your head around, but lets
dive into what classes do in PHP and how to make them. This will better help you
understand what's going on.

#### Syntax

```php
class Task {

}
```

Wow thats it? Yes, technically this is all a class needs, however this isnt very
dynamic, so lets extend it a little.


```php
class Task {
  protected $description;
}
```

## Links

<strong>[Follow along with my repo](https://github.com/ParamagicDev/php-for-beginners)<br></strong>
[Laracasts main site](https://laracasts.com)<br>
[PHP for beginners](https://laracasts.com/series/php-for-beginners)<br>
