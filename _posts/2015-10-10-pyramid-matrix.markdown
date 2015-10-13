---
layout: post
title: "Challenge of the Day - The Pyramid Matrix"
date: 2015-10-10 14:55:00
comments: true
---

So I received an e-mail from [CodeFights](https://codefights.com) yesterday with the e-mail subject of "*Julius can you solve today's challenge of the day?*" Well, I was intrigued; let's find out!

![alt text](/assets/img/challenge.png "Challenge of the Day")

The first thing I thought to myself was to break the problem down into smaller pieces. I first wanted to visually see what happens:

  * When N = 1, you have [1]
  * When N = 2, you have [1,1], [1,1]
  * When N = 3, you have [1,1,1], [1,2,1], [1,1,1]
  * When N = 4, you have [1,1,1,1], [1,2,2,1], [1,2,2,1], [1,1,1,1]

Well, it seems like when N = 1 or when N = 2, that could be the *base case* if I was to approach this method in a recursive manner. Okay...seems doable. The next step I took was to see if there's a pattern in the way these matrices are being built. Fortunately, I was able to see it!

It seems like after you count the outer elements of the N x N matrix, you have a (N - 2) x (N - 2) matrix inside! This continues until N === 1 or when N === 2! So applying what I learned previously with [The Fibbonaci Sequence](http://juliusjung.info/2015/07/03/fibonacci-sequence-a-new-perspective/), I had to decide whether to use memoization or dynamic programming to solve the problem. 

If I was to use dynamic programming, the problem I thought I would encounter was how I would implement filling in the inner matrices with increasing integers starting from 2. This means I have to store a value and increment it by 1 as I go from the outside in; I think memoization is the proper way to go because I have to store previous results and build from there!

Let's use N = 4 as trial. The first thing I need to do is to create an empty 4 x 4 multi-dimensional array, or a N x N matrix. I believe JavaScript doesn't allow for automatic multi-dimensional array creation, so I need to create it manually.

{% highlight javascript %}
  function createArray(n) {
    var arr = new Array(n);

    for (i = 0; i < arr.length; i++) {
      arr[i] = new Array(n);
    }

    return arr;
  }
{% endhighlight %}

BOOM! Okay, easy enough. Let's fill in the correct values into this matrix now. I'll start simple and just fill in the outer elements of the matrix. Well, it would definitely help if I first took a look at the indexes of the created array:

> <center> [0,0] [0,1] [0,2] [0,3] <br />
           [1,0] [1,1] [1,2] [1,3] <br />
           [2,0] [2,1] [2,2] [2,3] <br />
           [3,0] [3,1] [3,2] [3,3] </center>

Well, it seems like for N = 4, any first or second sub-element within each element that contains N - 1 OR any first or second sub-element that contains 0, the initial starting index, is what makes up the initial values of 1. After filling the initial values with 1, the new inner matrix looks like this:

> <center> [1,1] [1,2] <br />
           [2,1] [2,2] </center>

For this matrix, any first or second sub-element that contains (N - 1) - 1 OR any first or second sub-element that contains 0 + 1 is what makes up the outside values of 2. We can stop here since N = 2 is the *base case*.

Let's try to implement filling in the outer elements with 1s:

{% highlight javascript %}
  function pyramidMatrix(N) {
    var arr = createArray(N);
      
      for (i = 0; i < arr.length; i++) {
        for (j = 0; j < arr.length; j++) {
          if (i === 0 || i === arr.length - 1 || j === 0 || j === arr.length - 1) {
              arr[i][j] = 1;
          }
        }
      }

    return arr;
  }
{% endhighlight %}

And the output for this function:


> <center> [1,1,1,1] <br />
           [1, , ,1] <br />
           [1, , ,1] <br />
           [1,1,1,1] </center>

YESSSS! So this function works! But wait...I need to go deeper. In addition, I need to change some of the constants I used into variables. Let's fix the function:

  1. The variables ```i``` and ```j``` need to increase as we go into the matrix. The initial value of 0 works for the initial solution, but when going into the matrix, the first element would then start at 1. In other words, I need to create an initial variable ```value``` and set it equal to 0. After the outer elements are finished being filled in with 1s, the value of the variable ```value``` would increase by 1.
  2. Although ```arr.length``` works for the initial solution, this also needs to be changed. The first check is if the array is less than 4, or less than or equal to 3, or N - 1. This can be our ```count``` variable which will decrease by 1 as we go into the matrix.
  3. ```arr[i][j]``` is currently being set to 1, the initial value. This needs to be changed according to each "jump" into the matrix: ```value``` + 1. This needs to keep on reoccurring until N === 1 or N ===2: N > 0.
  4. The previous values in the array will be replaced with new values the way the logic is setup right now. Let's add an if statement to check the value is being written into the matrix only if ```arr[i][j]``` === 'undefined'.
  5. Decrease N by 2 every time after writing the values for the outer elements.

{% highlight javascript %}
  function pyramidMatrix(N) {
    var arr = createArray(N);
    var value = 0;
    var count = N - 1;
      
      while (N > 0) {
          for (i = value; i <= count; i++) {
            for (j = value; j <= count; j++) {
              if (i === value || i === count || j === value || j === count) {
                if (!arr[i][j]) {
                  arr[i][j] = value + 1;
                }
              }
            }
          }
          count--;
          value++;
          N -= 2;
        }

    return arr;
  }
{% endhighlight %}

## Post Thoughts

Besides refactoring the code, I'm very happy that the solution works! After submitting the solution and receiving a nice badge to go along with it, I saw that other coders were able to solve it in ~100 characters. As reference, my solution was ~300.

If you have suggestions on how to improve thinking about the problem, or ways to refactor the solution, please let me know in the comments!

One non-coding problem I had while solving this problem was that I would think of the best way to solve the problem. This would make me freeze up and not progress forward. Next time, I will just power through the problem, no matter how messy the solution. AFTER finding a solution, and only then, I will start thinking about optimization and refactoring.

## Afterwards

The challenge was so fun to solve a couple of days ago! I eagerly waited for the challenge to end so I can view other people's solutions and I was not disappointed! Here is the winning shortest solution:

{% highlight javascript %}
  p = pyramidMatrix = function(n, j) {
    var i = n, m = []
    while (i--) m[i] = j ? Math.min(i + 1, n - i, j, n - j + 1) : p(n, i + 1)
    return m
  }
{% endhighlight %}

"WHAT," I yelled out loud. I found this solution to be amazing!

  * You don't need to create an empty N x N multi-dimensional array before inputting in the values; you can just create the array as you go. However, this works only for a 1 dimensional array.
  * The solution stores the ```pyramidMatrix()``` function into the ```p``` variable to shorten the characters used when calling the function recursively. Is it best practices? Maybe not. But it's certainly cool to think about!
  * The logic to think the ```Math.min()``` is still a little confusing to me despite the many efforts of these fellow coders [here](https://codefights.com/feed/uwL9WdLELb6QGLNRB). I would forever be grateful if anyone can explain this logic to me.
  * I am just starting to get comfortable with using truthy / falsey values eg. ```1 === true``` and ```0 === false``` instead of always evaluating an expression and checking it to be true or false.

I definitely learned a lot from this problem, and I'm excited to try other challenges in the future! I am excited to practice more in order to get good enough to solve challenges this well!