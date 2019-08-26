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

  public function __construct($description) {
    $this->$description;
  }
}
```

This is a very basic example and intro to classes.
Lets break it down now.

`class Task` Define the class name<br>
`protected $description;` initialize the variable $description<br>
`public function __construct($description)` This is a special 'constructor' function.<br>
This means that when a class is 'instantiated', to run the following code. Or in other
words when you create a 'new' class, do the run the following code.<br>
`$this->$description;` ahhhh yes. The magical '$this'. In some languages it may just
be `this` or `self`. This is a tough term to wrap your head around so let's keep it simple.<br>

In this case `$this` means, for THIS instance of Task, set the value provided in the constructor to
this instance's $description variable<br>

So what the heck does that above statment even mean? Well let's continue on. Examples
explain this better than I can. Lets instantiate a the class Task now.

```php
$task = new Task('I am a description');
```






## Links

<strong>[Follow along with my repo](https://github.com/ParamagicDev/php-for-beginners)<br></strong>
[Laracasts main site](https://laracasts.com)<br>
[PHP for beginners](https://laracasts.com/series/php-for-beginners)<br>
