---
layout: post
title: "DBC Phase_2: Day 7"
date: 2014-07-22 18:50:37
comments: false
---

Today, we were all able to dive into code immediately upon arriving. Unfortunately, I didn't feel confident enough to pair up today although pairing is mandatory. Fortunately, I was able to pair up with a friend and go over the basics and foundations for Javascript and JQuery.

## Oh Ruby, how you spoiled me...

Ruby is beautiful because of all the methods it provides: ```.each```, ```.map```, ```.random```. However, there are no such things in Javascript. It was very hard to transition from thinking Ruby for all of phase_0 and phase_1 to Javascript so suddenly during the second week of phase_2. However, I found myself comprehending Javascript much better than I was during phase_0. I feel like it is because of a better understanding of Object-Oriented Programming, as well as finding similarities between Ruby and Javascript. For example, class inheritence in Ruby would be similar to prototype in Javascript.

## Javascript is challening

I like how Javascript doesn't have a lot of built in methods like Ruby because it forces you to truly understand the logic of a given problem. For example, I was trying to find the mode of a given array using Javascript. Check out my not DRY, not refactored solution here:

{% highlight javascript %}
Array.prototype.mode = function() {
  this.sort();
  var mode = {};
  var answer = {};
  var key = 0;
  var value = 0;
  var storageKey = 0;
  var storageValue = 0;
  for (var i = 0; i < this.length; i++) {
    if (mode[this[i]] === undefined) {
      mode[this[i]] = 1;    // add number to mode and set it equal to 1
      if (storageValue < value) {
        storageKey = key;     // store previous key
        storageValue = value; // store previous value
      }
      key = this[i];        // current key is equal to current number
      value = 1;            // start value all over again
    }
    else {
      mode[this[i]] += 1;
      value += 1;
    }
  }
  answer[storageKey] = storageValue;
  return answer;
};
{% endhighlight %}

This challenge made me really think about what a mode of a given array was, and how you would logically go about each element in the array to determine the most frequent number. I'm a little embarrased with this solution, but in my opinion, the main point of the challenge was to really get familiar with Javascript.

## So why Javascript?

A lot of hackers and students are speculating that Javascript has a good chance that it might become **the** language to learn and know. It is an intermediate language for:

  * Objective-J
  * CoffeeScript
  * Google Web Toolkit
  * Dart
  * Haxe
  * jQuery
  * JSON

Well...you get the point. Personally, I am a big fan of Google, and since Google loves Javascript, I want to love Javascript too through transitive property. A fellow student and I were having a discussion over lunch, and we both agreed that the reason why it hasn't blown up yet is because there are a lot of senior developers that know other languages maintaining their servers like a *pro*. However, when the senior developers start to retire, the shift will start to Javascript.

## Unwilling to drown

By the end of the day at 6:00PM, I feel **much** more confident with the material presented this week. I felt like I was able to resurface from the depth of the deep, deep waters and gasp for a breath of fresh air. The only problem I see myself facing is the fact that I am moving much slower than I anticipated. However, I think this problem can easily be solved; I need to dedicate more time to coding. And because it is so fun, I definitely don't have a problem with that.