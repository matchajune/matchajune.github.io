---
layout: post
title: "Challenge of the Day - Two Primes"
date: 2015-10-14 09:46:00
---

I wanted to try solving another challenge due to how fun the [Pyramid Matrix](http://juliusjung.info/2015/10/10/pyramid-matrix/) challenge was! Today's challenge is:

> Write a function which returns ```true``` if and only if both input numbers are prime, otherwise return ```false```.

"ROFL. This is easy-peasy," I thought to myself. I quickly opened up Sublime and solved it with the post thoughts of the previous challenge in mind: just power through the challenge without thinking about optimization and refactored code.

{% highlight javascript %}
  function TwoPrimes(a, b) {
    return prime(a) && prime(b);
  }

  function prime(int) {
    if (int < 2) {
      return false;
    } else {
      for (var i = 2; i < int; i++) {
        if ( int % i === 0) {
          return false;
        }
      }
    }
    return true;
  }
{% endhighlight %}

Regardless of how the challenge gets solved, both inputs of ```a``` and ```b``` needs to get checked whether or not the inputs are prime. I thought modularizing the challenge into two, single responsibility functions was the way to go.

## Self Reflection

Now that the challenge is solved, I wanted to think about other methods of solving the challenge. I definitely know that my solution would not be a contender for 'shortest solution' and I definitely know there is a math theorem I can use to check for prime numbers. And after some searching, I was right! In number theory, there is a theorem called [Fermat's Little Theorem](https://en.wikipedia.org/wiki/Fermat%27s_little_theorem).

## Fermat's Little Theorem

Unfortunately, Fermat's Little Theorem can't be used to test if a number is prime. However, it can be used to test if a number is composite. Let's first take a look at the formula itself: ```a^(p-1) = 1 mod p```.

  * If ```p``` is prime for any ```a``` values that is entered into the formula, the output is always 1.
  * And if ```p``` is composite for any ```a``` values that is entered into the formula, the output usually isn't 1. For every output that isn't 1, that is a composite witness: proof that the ```p``` that is chosen CANNOT be prime.

The reason why there are words such as 'usually' and 'composite witness' is because this test is a probabilistic test to determine whether or not a number is a probable prime! For example, if we set ```a = 8``` and ```p = 511```, the output is 1 ALTHOUGH 511 is a composite number!

Using the theorem is much more efficient than to loop through each integer for a divisibility test, especially as ```p``` gets infinitely larger eg. 54734431. Running a for loop would result in a time complexity of *O*(n) because the number of steps scales with the input. However, running the theorem would result in a time complexity of *O*(1).

However, there is one thing I am uncomfortable with using the theorem. There is a small chance that the theorem's output will result in 1 for the first trial for a given ```p```: a [pseudoprime](https://en.wikipedia.org/wiki/Pseudoprime).

## Application

Enough talk, let's use the theorem and change our solution:

{% highlight javascript %}
  function TwoPrimes(a, b) {
    return prime(a) && prime(b);
  }

  function prime(int) {
    if (int === 3) {
      return true;
    }
    return int > 1 ? !((Math.pow(3, int - 1) - 1) % int) : false
  }
{% endhighlight %}

I tried many inputs to test the solution and the outputs are correct so far, although I only use one instance of ```a``` to determine a probable prime.

As always, please let me know if I have made an error, or you would like to discuss anything with me!