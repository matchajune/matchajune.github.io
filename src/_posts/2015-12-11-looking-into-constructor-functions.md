---
layout: post
title: "Looking Into Constructor Functions - JavaScript"
date: 2015-12-11 16:00:00
---

I went over a JavaScript challenge with a fellow peer today. Let's dive right in:

> In this challenge, you will be taking your knowledge of JavaScript to the next level! Assume there is a teacher with a list of students and a list of their respective test scores. The teacher is providing you with this data which looks like ...

{% highlight javascript %}
var students = ["Joseph", "Susan", "William", "Elizabeth"];
var scores   = [ [80, 70, 70, 100], // Joseph's scores
                 [85, 80, 90, 90], // Susan's scores
                 [75, 70, 80, 75], // William's scores
                 [100, 90, 95, 85] ]; // Elizabeth's scores
{% endhighlight %}

> You will take this data and transform it into a grade book. The grade book will be a JavaScript object. In the past, you had the option of using dot notation or bracket notation. In this challenge you need to use bracket notation to reference some properties.

## Create a gradebook

#### Create a variable `gradebook` and assign it the value of an empty object.

Okay...easy enough. I'll go with object literal notation instead of a constructor function; the main reason why is because I probably won't need multiple instances of this ```gradebook``` object.

{% highlight javascript %}
var students = ["Joseph", "Susan", "William", "Elizabeth"];
var scores   = [ [80, 70, 70, 100], // Joseph's scores
                 [85, 80, 90, 90], // Susan's scores
                 [75, 70, 80, 75], // William's scores
                 [100, 90, 95, 85] ]; // Elizabeth's scores

var gradebook = {};
{% endhighlight %}

## Add Students to your Gradebook

#### Make each student name in `students` a property of `gradebook` and assign each the value of a new object.

Very straightfoward. The students' names are the property (left hand side) and the new objects are the value (right hand side).

{% highlight javascript %}
var students = ["Joseph", "Susan", "William", "Elizabeth"];
var scores   = [ [80, 70, 70, 100], // Joseph's scores
                 [85, 80, 90, 90], // Susan's scores
                 [75, 70, 80, 75], // William's scores
                 [100, 90, 95, 85] ]; // Elizabeth's scores

var gradebook = {
  Joseph: {},
  Susan: {},
  William: {},
  Elizabeth: {}
};
{% endhighlight %}

## Add Test Scores

#### Give each `student` property of `gradebook` its own `testScores` property and assign it the value of the respective students scores from scores.

Okay. I'm just going to literally follow what the directions are telling me to do:

{% highlight javascript %}
var students = ["Joseph", "Susan", "William", "Elizabeth"];
var scores   = [ [80, 70, 70, 100], // Joseph's scores
                 [85, 80, 90, 90], // Susan's scores
                 [75, 70, 80, 75], // William's scores
                 [100, 90, 95, 85] ]; // Elizabeth's scores

var gradebook = {
  Joseph: {
    testScores: scores[0]
  },
  Susan: {
    testScores: scores[1]
  },
  William: {
    testScores: scores[2]
  },
  Elizabeth: {
    testScores: scores[3]
  }
};
{% endhighlight %}

## Add New Scores

#### Assign an `addScore` property to `gradebook`. Give it the value of a function that accepts `name` and `score` arguments. Have `addScore` push the score to the value of the `testScore` property of the `gradebook` property that matches the value of the `name` argument.

{% highlight javascript %}
var students = ["Joseph", "Susan", "William", "Elizabeth"];
var scores   = [ [80, 70, 70, 100], // Joseph's scores
                 [85, 80, 90, 90], // Susan's scores
                 [75, 70, 80, 75], // William's scores
                 [100, 90, 95, 85] ]; // Elizabeth's scores

var gradebook = {
  Joseph: {
    testScores: scores[0]
  },
  Susan: {
    testScores: scores[1]
  },
  William: {
    testScores: scores[2]
  },
  Elizabeth: {
    testScores: scores[3]
  },
  addScore: function(name, score) {
    gradebook[name]["testScores"].push(score);
  }
};
{% endhighlight %}

## Create a Function to Calculate Averages

#### Add the `getAverage` property to `gradebook` and assign it the value of a function. (This won't actually do anything just yet...)

{% highlight javascript %}
var students = ["Joseph", "Susan", "William", "Elizabeth"];
var scores   = [ [80, 70, 70, 100], // Joseph's scores
                 [85, 80, 90, 90], // Susan's scores
                 [75, 70, 80, 75], // William's scores
                 [100, 90, 95, 85] ]; // Elizabeth's scores

var gradebook = {
  Joseph: {
    testScores: scores[0]
  },
  Susan: {
    testScores: scores[1]
  },
  William: {
    testScores: scores[2]
  },
  Elizabeth: {
    testScores: scores[3]
  },
  addScore: function(name, score) {
    gradebook[name]["testScores"].push(score);
  },
  getAverage: function() {

  }
};
{% endhighlight %}

## Modify `getAverage`

#### So that it accepts a name as a String and returns the named student's average.

{% highlight javascript %}
var students = ["Joseph", "Susan", "William", "Elizabeth"];
var scores   = [ [80, 70, 70, 100], // Joseph's scores
                 [85, 80, 90, 90], // Susan's scores
                 [75, 70, 80, 75], // William's scores
                 [100, 90, 95, 85] ]; // Elizabeth's scores

var gradebook = {
  Joseph: {
    testScores: scores[0]
  },
  Susan: {
    testScores: scores[1]
  },
  William: {
    testScores: scores[2]
  },
  Elizabeth: {
    testScores: scores[3]
  },
  addScore: function(name, score) {
    gradebook[name]["testScores"].push(score);
  },
  getAverage: function(name) {
    var scores = gradebook[name]["testScores"];
    return scores.reduce(function(a,b){return a + b}) / scores.length;
  }
};
{% endhighlight %}

# Redoing the challenge

Okay, so the challenge was very straightforward. Let's do this challenge using constructor functions now! There's two classes that need to be implemented: the students and the gradebook. Let's create the students class first.

{% highlight javascript %}
var students = ["Joseph", "Susan", "William", "Elizabeth"];
var scores   = [ [80, 70, 70, 100], // Joseph's scores
                 [85, 80, 90, 90], // Susan's scores
                 [75, 70, 80, 75], // William's scores
                 [100, 90, 95, 85] ]; // Elizabeth's scores

function Student(name, score){
  this.name = name;
  this.score = score;
  this.addScore = function(newscore){
    this.score.push(newscore)
  }
}

var joseph    = new Student(students[0], scores[0]);
var susan     = new Student(students[1], scores[1]);
var william   = new Student(students[2], scores[2]);
var elizabeth = new Student(students[3], scores[3]);
{% endhighlight %}

Okay, easy enough, but let's take a look at the `addScore` method. `this` is needed because the score is refering to the specific instance of the object. For example, if you add a score to Joseph, `this.score` makes sure the score is Joseph's. Let's just check by adding a `console.log()` to see what `this` is referring to:

{% highlight javascript %}
var students = ["Joseph", "Susan", "William", "Elizabeth"];
var scores   = [ [80, 70, 70, 100], // Joseph's scores
                 [85, 80, 90, 90], // Susan's scores
                 [75, 70, 80, 75], // William's scores
                 [100, 90, 95, 85] ]; // Elizabeth's scores

function Student(name, score){
  this.name = name;
  this.score = score;
  this.addScore = function(newscore){
    console.log(this);
  }
}

var joseph    = new Student(students[0], scores[0]);
var susan     = new Student(students[1], scores[1]);
var william   = new Student(students[2], scores[2]);
var elizabeth = new Student(students[3], scores[3]);
{% endhighlight %}

The output is the student object: more specifically Joseph. So if we use dot notation to refer to the `score` property for Joseph, `this.score`, we will get Joseph's scores: `[ 80, 70, 70, 100 ]`.

Okay...makes sense so far. Now what happens if we `console.log(score)` without the `this` keyword: `[ 80, 70, 70, 100 ]`.

...WHAT!? So are you saying that the `score` input from the Student "class" can be read from inside the `addScore` method? Or is `score` even referring to the input? Is `this.score` and `score` referencing the same array object? Let's create a quick test:

{% highlight javascript %}
var scores1 = [80, 70, 70, 100];
var scores2 = scores1;
scores2.push(90); // now, scores1 = [80, 70, 70, 100, 90]
{% endhighlight %}

Okay fair enough. `scores1` and `scores2` are both referencing the same array; arrays are objects and references the values as such. So going back to the question at hand, it seems like `score` the input of the constructor function is refering to the same array object as `this.score`.

The next question I have then is how `score` is being saved within the object itself; the input `score` is acting like instance variable. Well it seems like (according to the mozilla documentation):

> A closure must preserve the arguments and variables in all scopes it references. Since each call provides potentially different arguments, a new closure is created for each call to outside. The memory can be freed only when the returned inside is no longer accessible.<br />This is not different from storing references in other objects, but is often less obvious because one does not set the references directly and cannot inspect them.[source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

Okay, so a reference to the input `score` is created within the object, even though it wasn't directly setup. So that means that you can reference the scores with `this.score` **OR** `score`; each variable will refer to the same array object! However, it's probably best to just always refer to the array object using `this.score`. However, it seems like it's best to refer to `this.score` **ONLY** when you created the method in order to call that specific property.

So for example, if you don't have `this.score` because there's no need for that method, it is fine to refer to the input `score` as the reference was indirectly created even without storing it in a variable.

{% highlight javascript %}
function Student(name, score){
  this.name = name;
  this.addScore = function(newscore){
    score.push(newscore)
  }
}
{% endhighlight %}

## Afterthoughts

This was a good review of a couple of JavaScript topics for me:

  1. Although you create a new variable to store an array object, the reference will still be the same as the original array you have copied from.
  2. If you want a reference to a new array object, it's best to use the [slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) operation.
  3. The function indirectly references the input. [source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

Cheers to the road of JavaScript mastery!