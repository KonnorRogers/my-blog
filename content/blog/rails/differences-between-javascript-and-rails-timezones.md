---
title: Differences between JavaScript and Rails timezones
date: "2021-03-05T12:33:46"
description:
  Common pitfalls and issues with Rails timezones.
  Differences between the browser and the server, and various other
  tidbits.
---

## What I'm working on

I work for VeueLive (https://veue.tv) and recently was tasked with
creating a scheduling form for streamers.

## What I was tasked with:

When working on this I had a design that looks as follows:

<form>
  <div style="margin-bottom: 1rem;">
    <select>
      <option value="">Pick a Day</option>
      <option value="1">5 March 2021 (Today) </option>
      <option value="2">6 March 2021 (Tomorrow) </option>
      <option value="3">7 March 2021 </option>
    </select>
  </div>

  <div>
    <select>
      <option value="">Pick a Time (Time Zone)</option>
      <option value="15">00:15 (EST)</option>
      <option value="30">00:30 (EST)</option>
    </select>
  </div>
</form>

And then on the Rails backend I had a schema that looked roughly like
this:

```rb
create_table "videos" do |t|
  t.datetime :scheduled_at
end
```

So I had a few options, I decided to prefill a `<input type="hidden"
name="video[scheduled_at]>` field and then use a Stimulus controller to
wire everything together to send off a coherent `datetime` to the
server.

Im not going to get into how I actually built this because it will be
quite verbose, instead, Im going to document the inconsistencies I found
between Javascript and Rails and some of the pitfalls.

## Dates arent what they seem.

In JavaScript, `new Date()` is the same as Ruby's `Time.now`. They both
use the TimeZone for your system.

In Ruby, if you use `Time.current` it will use the value of `Time.zone` or the values set by
`ENV["TZ"]`. If neither are specified by your app, `Time.zone` will default to UTC.

Rubocop will always recommend against `Time.now` and instead recommend `Time.current` or `Time.zone.now`,
or a number of other recommendations here:

https://www.rubydoc.info/gems/rubocop/0.41.2/RuboCop/Cop/Rails/TimeZone

Basically, it always wants a timezone.

### Month of year

The month of the year is 0 indexed in JS and 1-indexed in Ruby.

#### Javascript

```js
// month of year
new Date().getMonth()
// => 0 (January), 1 (February), 2 (March), ... 11 (December)
// 0-indexed month of the year
```

#### Ruby / Rails

```rb
# month of year
Time.current.month
# => 1 (January), 2 (February), 3 (March), ... 12 (December)
# 1-indexed month of the year
```

### Day of Week

The day of the week in JavaScript is called via:

`new Date().getDay()`

And in Rails its:

`Time.current.wday`

#### Javascript

```js
// Day of the week
new Date().getDay()
// => 0 (Sunday) ... (6 Saturday)
// 0-indexed day of week
```

#### Ruby / Rails

```rb
# Day of the week
time.wday
# => 0 (Sunday) ... 6 (Saturday)
# 0-indexed day of week
```

### Day of Month

#### Javascript

```js
// Day of the month
date.getDate()
// => 1 (day 1 of month), ..., 11 (day 11 of month), 28 ... 31 (end of month)
// 1-indexed day of the month
```

#### Ruby / Rails

```rb
# Day of month
time.day
# => 1 (first day), 11 (11th day), ... 28 ... 31 (end of month)
# 1-indexed day of the month
```

## ISO Strings, UTC, what?!

### Finding the UTC time

In JavaScript, the UTC number returned is 13 digits for March 5th, 2021
In Ruby, the UTC integer will be 10 digits when running `to_i` since its
an integer value. Why the inconsistency?

In Javascript, `Date.now()` returns a millisecond based representation,
while in Ruby, `Time.current.to_i` returns a second based representation.
Below, I have examples on how to make JS behave like Ruby and
vice-versa.


#### Javascript

```js
Date.now()
// => 1614968619533
// Returns the numeric value corresponding to the current time—the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC, with leap seconds ignored.

// Ruby-like, second based approach
parseInt(Date.now() / 1000, 10)
// => 1614968619
// Without milliseconds
```

#### Ruby

```rb
Integer(Time.current.utc)
# => 1614971384
# Returns an integer value, seconds based approach


Integer(Float(Time.current.utc) * 1000)
# => 1614971349307
Returns an integer value, milliseconds based approach
```

### ISO Strings?!

#### Use them in your database.

ISO strings are king. Use them. Even postgres recommends them for `date` / `time` / `datetime` columns.

https://www.postgresql.org/docs/13/datatype-datetime.html#DATATYPE-DATETIME-DATE-TABLE

```
Example 	Description
1999-01-08 	ISO 8601; January 8 in any mode (recommended format)
```

#### Look for the Z!

Look for a `Z` at the end of an ISO String since
it will indicate `Zulu` time otherwise known as UTC time. This how you
want to save times on your server. The browser is for local time, the
server is for UTC time.

#### How to find the ISO string

Here we'll look at how to find an ISO string in JS and in Ruby. Again,
JS records millisecond ISO strings. Ill cover how to make both cover
milliseconds.

##### Javascript

```js
new Date().toISOString()
// => "2021-03-05T18:45:18.661Z"
// Javascript automatically converts to UTC when we request an ISO string
```

According to the docs it says it follows either the 24 or 27 character
long approach. However, based on my testing it was always 27 character
millisecond based time. My best guess is its dependent on browser. For
Chrome, Safari, and Mozilla I got the same 27 character string. As far
as I can tell theres no way to force a 24 character string other than by
polyfilling it yourself.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString


##### Ruby

```rb
Time.current.iso8601
# => "2021-03-05T13:45:46-05:00"
# Notice this has an offset, this is not using UTC time. To get Zulu time we
# need to chain utc.

Time.current.utc.iso8601
# => "2021-03-05T18:45:54Z"
# Without milliseconds

Time.current.utc.iso8601(3)
# => "2021-03-05T18:59:26.577Z"
# With milliseconds!
```

### Full reference of above

#### Javascript

```js
// Month, day, date

const date = new Date()

// Month of year
date.getMonth()
// => 0 (January), 1 (February), 2 (March), ... 11 (December)
// 0-indexed month of the year

// Day of the week
date.getDay()
// => 0 (Sunday) ... (6 Saturday)
// 0-indexed day of week

// Day of the month
date.getDate()
// => 1 (day 1 of month), ..., 11 (day 11 of month), 28 ... 31 (end of month)
// 1-indexed day of the month


// UTC
Date.now()
// => 1614968619533
// Returns the numeric value corresponding to the current time—the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC, with leap seconds ignored.

// Ruby-like, second based approach
parseInt(Date.now() / 1000, 10)
// => 1614968619
// Without milliseconds

// ISO Strings
new Date().toISOString()
// => "2021-03-05T18:45:18.661Z"
// Javascript automatically converts to UTC when we request an ISO string
```

#### Ruby / Rails

```rb
# Month, day, date
time = Time.current

# Month of year
time.month
# => 1 (January), 2 (February), 3 (March), ... 12 (December)
# 1-indexed month of the year

# Day of the week
time.wday
# => 0 (Sunday) ... 6 (Saturday)
# 0-indexed day of week

# Day of month
time.day
# => 1 (first day), 11 (11th day), ... 28 ... 31 (end of month)
# 1-indexed day of the month

# UTC
Integer(Time.current.utc)
# => 1614971384
# Returns an integer value, seconds based approach

Integer(Float(Time.current.utc) * 1000)
# => 1614971349307
Returns an integer value, milliseconds based approach


# ISO Strings
Time.current.iso8601
# => "2021-03-05T13:45:46-05:00"
# Notice this has an offset, this is not using UTC time. To get Zulu time we
# need to chain utc.

Time.current.utc.iso8601
# => "2021-03-05T18:45:54Z"
# Without milliseconds

Time.current.utc.iso8601(3)
# => "2021-03-05T18:59:26.577Z"
# With milliseconds!
```

## Bonus! Testing!

Thanks for sticking with me this far. When writing system tests in
Capybara, the browser will use the timezone indicated by your current
system and will be different for everyone.

`Time.zone` is not respected by Capybara. Instead, to tell Capybara what
TimeZone to use, you have to explicitly set the `ENV["TZ"]`.

So, here at Veue, we randomize the timezone on every test run. This
catches possible failures due to timezones and provides the same experience locally and in
CI. There are gems for this but heres an easy snippet
you can use to set your TimeZone to be a random timezone for tests.

To find a random TimeZone we can access
`ActiveSupport::TimeZone::MAPPING` which as it states, provides a hash
mapping of timezones. From here, its just wiring it all up.

https://api.rubyonrails.org/classes/ActiveSupport/TimeZone.html

### Rspec

```rb
# spec/spec_helper.rb

RSpec.configure do |config|
  # ...
  config.before(:suite) do
    ENV["_ORIGINAL_TZ"] = ENV["TZ"]
    ENV["TZ"] = ActiveSupport::TimeZone::MAPPING.values.sample
  end

  config.after(:suite) do
    ENV["TZ"] = ENV["_ORIGINAL_TZ"]
    ENV["_ORIGINAL_TZ"] = nil
  end
  # ...
end
```

### Minitest

```rb
# test/test_helper.rb

# ...
ENV["_ORIGINAL_TZ"] = ENV["TZ"]
ENV["TZ"] = ActiveSupport::TimeZone::MAPPING.values.sample

module ActiveSupport
  class TestCase
    # ...
  end
end

Minitest.after_run do
  ENV["TZ"] = ENV["_ORIGINAL_TZ"]
  ENV["_ORIGINAL_TZ"] = nil
end
```

Thanks for sticking with me, whatever timezone you may be in!
