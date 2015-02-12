---
layout: post
title: "CoffeeScript"
date: 2014-07-24 05:22:45
comments: true
---

***CoffeeScript is a little language that compiles into JavaScript**. Underneath that awkward Java-esque patina, JavaScript has always had a gorgeous heart. CoffeeScript is an attempt to expose the good parts of JavaScript in a simple way*.

## I will never accept thee, Javascript!

![alt text](/assets/img/i-love-ruby.jpg "<3")

It was love at first sight when Dev Bootcamp first introduced Ruby to me. It was so intuitive with its great ruby documentations on all its methods. It's debugger is usually very clear on where the error lies. It is also laced with syntax sugar, and who doesn't love sweets! As Mary Poppins would say, "A spoonful of syntax sugar helps the semantic medicine go down." I can go on for hours on why Ruby is so great.

Therefore, when Javascript tried to take a place into my heart, I gave it the cold shoulder. To me, Javascript was much more confusing than Ruby. For example, I couldn't understand the craziness that's happening below:

{% highlight javascript %}
var a = {value: 1};
var b = {value: 1};

console.log( a == b ); //returns false
console.log( a === b ); //returns false
{% endhighlight %}

Javascript created a **new, instance** of a object whenever you create one. Although the two instances of the object may hold the same values, each one are different instances. I like to think of it like having a twin. Although the twin may be exactly the same as me, the twin and I are completely different people with different life experiences.

## The answer to Javascript confusion

Some of the confusing things about Javascript include:

  * Setting the prototype correctly
  * Using === vs ==
  * Checking for null vs undefined
  * Declaring all variables with var
  * Semi-colons

Even to this day, I still have trouble with these confusions. I would go a local coffeeshop to get a cup of coffee to help with the feeling of drowning in all the Javascript brackets and semi-colons. And while looking at the awesome coffee art that the barista has drawn for me, I took out my laptop to see if there would be anything to help me understand the confusion of Javascript just a little bit better. So I go to google.com and type in 'Coffeescript help me'. Oh bless you [freudian slip](http://en.wikipedia.org/wiki/Freudian_slip)! On this was the answer to all my Javascript confusion and problems: CoffeeScript!

![alt text](/assets/img/coffee.jpg "Coffee art")

## CoffeeScript

All the confusing things mentioned before about Javascript...well, there's all handled **automatically**! Let's say for example, we wanted to create function that squares a number:

{% highlight javascript %}
var square;

square = function(x) {
  return x * x;
};
{% endhighlight %}

You might forget to declare ```var``` for your variable, you might miss some brackets, or you even might miss a semi-colon although it may not matter. Well, let's take a look at this in CoffeeScript:

{% highlight coffeescript %}
square = (x) -> x * x
{% endhighlight %}

Are you serious? That's it? Yes...that's it! The ```->``` denotes the empty function, and the ```x``` is the parameter being passed in.

## Pros vs Cons

Okay, so you've seen some of the cool things that CoffeeScript can do. The pros of CoffeeScript include:

  1. All of the confusing things about Javascript as mentioned above are all handled automatically.
  2. Easy to read
  3. It can help you learn more about Javascript

Unfortunately, anything that is compared comes with some cons as well:

  1. There are fewer CoffeeScript programmers
  2. Debugging for CoffeeScript is a nightmare

Ultimately, it is up to you to decide which language you would like to use. The point of this blog post wasn't to convert you into using CoffeeScript, but more to educate you with other possible alternatives out there. If you have a better knowledge with what's out there, then you can make a better decision.