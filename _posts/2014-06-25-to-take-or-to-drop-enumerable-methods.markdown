---
layout: post
title: "To Take or to Drop: Enumerable Methods"
date: 2014-06-25 00:36:29
comments: true
---

For one of the morning activities my fellow cohort members and I had to do was to all get together in a room to discuss Ruby Enumerable methods. In particular, my group was responsible to explain ```#drop_while``` and ```#take_while```. 

The ```#drop_while``` example that Ruby Docs gave was: 

{% highlight ruby %}
a = [1, 2, 3, 4, 5, 0]
a.drop_while { |i| i < 3 }   #=> [3, 4, 5, 0]
{% endhighlight %}

My group members and I were quick to assume that ```#drop_while``` will go through each element in the array and drop all elements that make the block statement true. However, this was not the case. If the element passed through the block makes the block statement false, ```#drop_while``` will immediately stop doing what it's doing and return what's left of the original array. Even if there is an element that can return a true statement when passed through the block, the method will not care.

So going back to the example above, ```#drop_while``` will go through each element in the array 'a' and check to see if the element is less than 3. Since 1 is less than 3, the first element gets dropped. Since 2 is less than 3, the second element gets dropped. Since the third element is NOT less than 3, the method stops checking and returns what wasn't dropped...even though the the last element, 0, can pass through the block as true.

The next method our group had to review was ```#take_while```, which is very similar to ```#drop_while```. The ```#take_while``` example that Ruby Docs gave was:

{% highlight ruby %}
a = [1, 2, 3, 4, 5, 0]
a.take_while { |i| i < 3 }   #=> [1, 2]
{% endhighlight %}

I like to think of it as a night of speed dating. You meet a new person every minute or so, and decide within a couple of seconds whether or not he/she is attractive or not. If not, you keep meeting a new person. However, if you do meet a nice match, you stop caring about anyone else and try to make good conversation with the other person.

Similarly, but not so similarly, ```#take_while``` goes through each element in the arrayyy 'a' and passes it in the block given. In the above example, our block will take elements only less than 3. So, as we go through the first element, the block returns a true value when the element is passed through it. The second element, 2, also returns a true value. However, the third element will return false, therefore stopping the method from checking any more elements and returning the values that returned true up until the false element.