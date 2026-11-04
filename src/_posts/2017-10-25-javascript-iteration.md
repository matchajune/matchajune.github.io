---
layout: post
title: "Iterations in JavaScript"
date: 2017-10-25 19:04:25
---

## Prelude

It is a beautiful Sunday evening. You are relaxing in bed, winding down before the start of the new week tomorrow. You just finished an episode of your favorite show on Netflix. You look at your phone to set the alarm for 8AM. You quickly glance to check what time it is. It is 3AM.

![](/assets/img/ahh.jpg "Oh noes!")

WHAT!?

You quickly pull the covers over your body, close your eyes, and you start counting sheep...

## Counting sheep...

There are many ways to iterate in JavaScript, but the one that almost everyone learns first is the **_for loop_**.

You always need to define the parameters of how you want to count the sheep before you start. Let's take a look...

| Question | Expression (technical-term) | Definition
| --- | --- | ---
| Which numbered sheep do you want to start at? | Initialization | Setup counter variable
| On average, which numbered sheep can you count up to before falling asleep? | Condition | Execute **_for loop_** only while true
| Do you increment or decrement your numbered sheep? | Final-Expression | Evaluate after each iteration, before the next iteration
| What do you want to do with the sheep while you are still awake? | Statement | Run as long as condition is true

Therefore, the syntax for writing a for loop, along with where each, corresponding, expression goes is as follows:

{% highlight javascript %}
for (initialization; condition; final-expression) {
  statement
}
{% endhighlight %}

### Exercise

Let us go over each question, filling in the expressions in the appropriate places as necessary.

#### Step 1: General template for the **_for loop_**

What is the general syntax for writing a **_for loop_**?

**HINT**: syntax shown above.

{% highlight javascript %}
for (initialization; condition; final-expression) {
  statement
}
{% endhighlight %}

#### Step 2: Which numbered sheep do you want to start at?

The initialization is usually a new variable declaration. Replace the word `initialization` in the code with a declaration of a new variable `sheepNumber` and set it to an `integer` of your choice.

**HINT**: I like to start from sheep number 1! `var sheepNumber = 1`

{% highlight javascript %}
for (var sheepNumber = 1; condition; final-expression) {
  statement
}
{% endhighlight %}

#### Step 3: On average, which numbered sheep can you count up to before falling asleep?

Do you remember on average, what numbered sheep you are able to count up to before falling asleep? Use a comparison operator to write a logical statement for your condition.

**HINT**: I am usually able to count up to 10, or so I think? `sheepNumber <= 10`

{% highlight javascript %}
for (var sheepNumber = 1; sheepNumber <= 10; final-expression) {
  statement
}
{% endhighlight %}

#### Step 4: Do you increment or decrement your numbered sheep?

From steps 2 and 3, you can determine whether or not you are counting up (++) or down (\-\-). Replace the final-expression with an expression to show that you are counting up or down to your variable.

**HINT**: I am incrementing since I am starting from 1 and counting to 10. `sheepNumber++`

{% highlight javascript %}
for (var sheepNumber = 1; sheepNumber <= 10; sheepNumber++) {
  statement
}
{% endhighlight %}

#### Step 5: What do you want to do with the sheep while you are still awake?

If you are still counting sheep, you want to just tell yourself:

`"Sheep number (sheepNumber) jumped over the fence..."`

Console log that statement, making sure to print out the number of the sheep (sheepNumber), **not** the actual word "sheepNumber".

**HINT**: `console.log("Sheep number" + sheepNumber + " jumped over the fence...");`

{% highlight javascript %}
for (var sheepNumber = 1; sheepNumber <= 10; sheepNumber++) {
  console.log("Sheep number " + sheepNumber + " jumped over the fence...");
}
{% endhighlight %}

#### Step 6: Run the loop!

Run the loop! Let's see what the console outputs!

{% highlight javascript %}
Sheep number 1 jumped over the fence...
Sheep number 2 jumped over the fence...
Sheep number 3 jumped over the fence...
Sheep number 4 jumped over the fence...
Sheep number 5 jumped over the fence...
Sheep number 6 jumped over the fence...
Sheep number 7 jumped over the fence...
Sheep number 8 jumped over the fence...
Sheep number 9 jumped over the fence...
Sheep number 10 jumped over the fence...
[Finished in 0.1s]
{% endhighlight %}

And hopefully by then you are fast asleep. You have work in 5 hours!?!?

## I'm not falling asleep!! Another approach.

Oh no...you are still awake. You are instantly regretting the coffee you drank before. Well, let's try again!

### Iterating over an array (of numbered sheep)

Let's translate the **_for loop_** that we just wrote to using arrays. A couple of things that need to change:

  * Declare a variable and set it to an array that contains the sheep numbers
  * For the intialization, declare a counter variable (usually denoted by `i`) that represents the index number of the array
  * For the condition, the counter variable `i` should go up to 9, as there are 10 elements in the array (0-9). Remember, the index always starts at 0!
  * For the final-expression, the counter variable `i` is incrementing after each successive iteration
  * For the statement, the correct, numbered sheep needs to be called using the counter variable `i` (representing the index number) within the array

{% highlight javascript %}
var sheepNumber = [1,2,3,4,5,6,7,8,9,10];
for (var i = 0; i < sheepNumber.length; i++) {
  console.log("Sheep number " + sheepNumber[i] + " jumped over the fence...");
}
{% endhighlight %}

### Alternatives

#### `forEach()`

"There must be an easier way to count sheep," you think to yourself. And you are right! JavaScript supplies built-in methods for array iteration. Let's go over one together: `forEach()`.

By definition, the `forEach()` method executes a provided function once for each array element.

{% highlight javascript %}
var sheepNumber = [1,2,3,4,5,6,7,8,9,10];
sheepNumber.forEach(function(sheep) {
  console.log("Sheep number " + sheep + " jumped over the fence...");
});
{% endhighlight %}

##### PROS

  * **More readable** - The intended purpose of the `forEach()` loop is clearer than its **_for loop_** counterpart
  * **Less boilerplate** - No need to think about the initialization, condition, and final-expression everytime you setup in the **_for loop_**
  * **Less error-prone** - If there is less to think and write about, the less chance there will be for error
  * **Less scope pollution** - Due to the initialization of a variable everytime for a **_for loop_**, there is more of a chance for variable naming pollution

##### CONS

These built-in methods are supported as of **ES5** (ECMAScript, trademarked scripting-language specification standardized by Ecma International); think of ECMAScript as the language, and JavaScript as a dialect of the language. Although **ES5** is supported by most browsers, there is still a chance some users may not have **ES5** available in their browsers.

#### Other methods

There are many other built-in iteration methods for an array. Let's go over a few and the *differences* of the return values of each method:

| Method | Return Value
| --- | ---
| `forEach()` | No return value
| `map()` | A new array with the returned values of the callback function
| `filter()` | A new array with the values that returned *truthy* from the callback function

## One...last...count

### Exercise

Let's use our `forEach()` code and implement a `filter()` to it as well!

#### Step 1: General template for `forEach()`

Let's start with the code we had from our `forEach()` iteration from before:

{% highlight javascript %}
var sheepNumber = [1,2,3,4,5,6,7,8,9,10];
sheepNumber.forEach(function(sheep) {
  console.log("Sheep number " + sheep + " jumped over the fence...");
});
{% endhighlight %}

#### Step 2: I only like even-numbered sheep

I want to keep only the even-numbered sheeps in the variable `sheepNumber`.

**HINT**: You want to filter through the array `[1,2,3,4,5,6,7,8,9,10]` while saving the returned value of the filtered array to the variable `sheepNumber` so that returned array doesn't get lost!

{% highlight javascript %}
var sheepNumber = [1,2,3,4,5,6,7,8,9,10].filter(function(sheep) {
  return sheep % 2 === 0;
});
sheepNumber.forEach(function(sheep) {
  console.log("Sheep number " + sheep + " jumped over the fence...");
});
{% endhighlight %}

#### Step 3: Run the loop!

Run the loop! Let's see what the console outputs!

{% highlight javascript %}
Sheep number 2 jumped over the fence...
Sheep number 4 jumped over the fence...
Sheep number 6 jumped over the fence...
Sheep number 8 jumped over the fence...
Sheep number 10 jumped over the fence...
[Finished in 0.1s]
{% endhighlight %}

## Epilogue

With that final count of even numbered sheep, you are finally in a peaceful and deep slumber. Until next time! ZzZzz...