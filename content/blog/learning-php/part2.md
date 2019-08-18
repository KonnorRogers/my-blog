---
title: Learning PHP - Part 2
date: "2019-08-18T04:03:54"
description: "Learn php with me!"
---

# Purpose

## Hello World

Are you really learning a new program if you don't create a simple hello world?

```php
// $/hello-world.php
<? php

echo 'Hello World';

```

```bash
php hello-world.php
```

Should echo 'Hello World' to the command line

Easy win after the nightmare install process.

## Variables

```php
$name = 'Konnor Rogers';

// Concats $name onto 'Hello'
echo 'Hello' . $name;

// Or
echo "Hello {$name}";
```

## HTML + PHP

Pulling in parameters

```php
// ...Above html omitted for brevity
<?php
  echo "Hello, " . htmlspecialchars($_GET['name]); 

  // for localhost:8888/?name=Konnor
  // Spits out "Hello, Konnor"
?>
// ...Below html omitted for brevity
```

`htmlspecialchars();` Will convert special characters as the name suggests so
people cannot inject malicious links, scripts, etc

