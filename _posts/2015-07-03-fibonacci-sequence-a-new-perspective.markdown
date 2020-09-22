---
layout: post
title: "The Fibonacci Sequence"
date: 2015-07-03 13:10:00
comments: false
---

I was studying some interview questions on [InterviewCake](https://www.interviewcake.com) and came across a question I thought I knew like the back of my hand:

> Write a function fib() that takes an integer *n* and returns the *n*th fibonacci number.

"Oh wow! A problem that I actually know how to do," I thought to myself. I remembered all the times I had trouble grasping how to think recursively and prepared what I thought to be a good solution:

{% highlight ruby %}
def fib(int)
  return int if int <= 1

  fib(int - 1) + fib(int - 2)
end
{% endhighlight %}

I didn't think to write edge cases for my solution, such as what if the user inputted a negative integer, or a decimal number, or an infinitely large number: just a nice, simple solution that works for most cases. I then happily submitted my solution.

## After thoughts

The reason why a recursive solution might be costly is because of a cost in call stack, what a program uses to keep track of what function it's currently running and what to do with that function's return value. That's why for an infinitely large number *n*, the program will just return a "stack to deep" message. This is when I realized two things:

  * I need to start to think about time and space complexity a lot more when attempting to solve a problem.
  * Just because I found one solution doesn't necessarily mean I should be finished with the question. I should always search for multiple solutions and figure out which is the best from there.

So thinking about the time and space complexity of my initial solution, it would be *O*(2<sup>n</sup>) and *O*(n) respectively. And because exponential costs are really bad, I shouldn't be satisfied with my initial solution.

## Diving into Fibonacci

After researching a bit on the sequence, I came across a formula that could be used to estimate the *n*th term of the sequence. This is great because then the time and space complexity could be reduced to *O*(1)! The formula is called *Binet's Formula*. We can also round the formula to the nearest integer using F<sub>n</sub> = [ϕ<sup>n</sup>/√5]. 

{% highlight ruby %}
def fib(int)
  golden_ratio = (Math.sqrt(5) + 1) / 2

  (golden_ratio**int) / Math.sqrt(5)).round
end
{% endhighlight %}

However, I think that this solution isn't used much because it is too simple and not thought provoking.

## Memoization (top-down)

I'm really excited because memoization is something I've heard for the first time! I knew about the optimization technique, but never knew the technical term for it. Let's take a look at my solution that uses memoization:

{% highlight ruby %}
STORAGE = {}

def fibb(int)
  if int <= 1
    STORAGE[int] = int
  else
    STORAGE[int] ||= fibb(int - 1) + fibb(int - 2)
  end
end
{% endhighlight %}

This technique stores the results that are already calculated and returns the output if the same inputs occur again. In addition, the logic goes from the top to the bottom. The time complexity would be *O*(n + q) since each number is only computed once up to a maximum of n plus the number of queries made for each repeated fibonacci sequence; since constants can be dropped, we can just say the time complexity is *O*(n). The space complexity would also be *O*(n), storing the computed value of each number.

## Dynamic programming (bottom-up)

Dynamic programming usually goes in a linear fashion solving the sub-problems first up to the top, where the original problem is then computed. I was able to find an awesome solution that showcases dynamic programming really well:

{% highlight ruby %}
def fib(n)
  (1..n).reduce([0,1]) { |pair| [pair[1], pair[0] + pair[1]] }[0]
end
{% endhighlight %}

Dynamic programming usually outperforms memoization. We can see this as while the time complexity is the same as memoization, *O*(n), as the space complexity is *O*(1) because of a constant amount of memory use.

## Memoization vs dynamic programming

A good explanation can be found [here](http://stackoverflow.com/questions/6184869/what-is-difference-between-memoization-and-dynamic-programming). In summary:

  * **Memoization** is a term describing an optimization technique where you cache previously computed results, and return the cached result when the same computation is needed again.
  * **Dynamic programming** is a technique for solving problems recursively and is applicable when the computations of the subproblems overlap.

## Bonus

Although the solution with dynamic programming for example is indeed faster, the problem with it is when *n* is an infinitely large number. There is actually a faster solution with a complexity of *O*(log *n*) that takes up *O*(1) space!! Before I studied this solution, I definitely had to refresh my memory on matrices and its operations. The formula that needs to be used for the fibonacci sequence is: [1, 1, 1, 0]<sup>n</sup> = [F<sub>n+1</sub>, F<sub>n</sub>, F<sub>n</sub>, F<sub>n-1</sub>]. That means that we can use [exponentiation by squaring](https://en.wikipedia.org/wiki/Exponentiation_by_squaring) in order to solve for the *n*th fibonacci sequence.

{% highlight ruby %}
def matrix_mult(x, y)
  zero  = x[0] * y[0] + x[1] * y[2]
  one   = x[0] * y[1] + x[1] * y[3]
  two   = x[2] * y[0] + x[3] * y[2]
  three = x[2] * y[1] + x[3] * y[3]

  [zero, one, two, three]
end

def fib(x, n)
  return x if n == 1
  return fib(matrix_mult(x, x), n / 2) if n % 2 == 0
  matrix_mult(x, fib(matrix_mult(x, x), (n - 1) / 2)) if n % 2 == 1
end
{% endhighlight %}

Because we only care about F<sub>n</sub>, we can call the first or second element for the answer.

## Aftermath

The bonus solution took a couple of days to get a grasp of what had to be done in order for the problem to be solved. A couple of key points I thought / learned:

  * There is a lot of theory with algorithms that I need to start to study.
  * Exponentiation by squaring
  * Double checking Big O notation for all of the previous solutions.
  * Don't be complacent with one solution to a given problem.
  * Maybe work on 'fast doubling' when I have time which is supposed to be even faster.
  * Take this free course: [Introduction to Algorithms (SMA 5503)](http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-046j-introduction-to-algorithms-sma-5503-fall-2005/index.htm)

If there is an error to my solutions, please feel free to let me know! I am doing my best to learn and I would love your input / help!