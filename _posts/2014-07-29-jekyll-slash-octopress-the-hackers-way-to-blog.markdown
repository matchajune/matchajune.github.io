---
layout: post
title: "Jekyll/Octopress: The Hacker's Way to Blog"
date: 2014-07-29 21:48:12
comments: false
---

If life dealt you all a different hand to play with today, you could have been maybe eating a delicious lunch with your friends at Central Park, basking in the warm rays of the sun. And if life dealt me a different hand to play with today, I could have been eating a delicious bowl of [Tres Carnes](http://trescarnes.com/) for lunch at Central Park as well, basking in the warm rays of the sun...right next to you. But that wouldn't have mattered to you very much because in this scenario, I would have been just a stranger to you, that looked like he was enjoying his lunch way too much. But this all hypothetical; this isn't what happened.

## Static vs dynamic websites

I stand here before you today not as a stranger, but as a fellow Newt. What I find fascinating about all of our journeys here at Dev Bootcamp thus far is that no two experiences are the same. And on a random day, I thought to myself how fascinating it would be to share our experiences together here at Dev Bootcamp. So I've been writing about my personal experiences here on my static website. So why did I choose a static website over a dynamic one? Well, some of the pros of a static website are:

  1. Quick/cheap to develop
  2. Secure, since the website is read-only
  3. Fast

And with the pros, there must always be some cons of choosing static over dynamic:

  1. Easier design updates
  2. More interactive that people can emotionally respond to
  3. Can deal with databases if need be

## Introduction to Jekyll/Octopress

![alt text](/assets/img/jekyll.jpg "Jekyll")

So with this decision, I went off to setup Octopress, a framework designed for Jekyll, a blog aware static site generator. Although Octopress may have been confusing and intimidating during phase_0 or phase_1, I feel that phase_2 has better equipped us for all of what Octopress has to offer. Let us first clone the Octopress repository on GitHub, and then change our current directory to the cloned repository all in our terminal:

{% highlight ruby %}
git clone git://github.com/imathis/octopress.git octopress
cd octopress
{% endhighlight %}

Next, like how we have always been doing thus far during phase_2, we need to install its dependencies with bundler:

{% highlight ruby %}
gem install bundler
bundle install
{% endhighlight %}

And last, we need to install the default theme that comes with Octopress:

{% highlight ruby %}
rake install
{% endhighlight %}

Assuming that you want to deploy your site to GitHub, there is a configuration task that you can run to set everything up:

{% highlight ruby %}
rake setup_github_pages
{% endhighlight %}

This rake task will ask you for a URL of your GitHub repository:

{% highlight ruby %}
git@github.com:username/username.github.io.git
{% endhighlight %}

Now that Octopress is installed and ready to go, the first file I like to configure is the ```_config.yml```. This file keeps all the custom configurations you can change according to your taste. And in your ```Rakefile``` lists all the commands that you can run. The ones I personally use the most are:

  * **rake new_post["title"]** - creates a new, .markdown post for you to blog in (located in source/_posts)
  * **rake generate**  - generates the posts and pages into the public directory (_deploy/ if using GitHub for deployment)
  * **rake deploy** - add everything to git, commit, and then push to the master branch

All of this is documented very well at Octopress's [site](http://octopress.org/). In addition to all of this, Octopress has many [3rd party plugins](https://github.com/imathis/octopress/wiki/3rd-party-plugins) in order to customize your website. A popular plugin a lot of coders like to use is Pygments, which is a generic syntax highlighter to beautify code that you share.

## With great power comes great responsibility

I can still reminisce the first day of phase_1, eagerly waiting outside the halls at 8:30AM and oblivious to what I was getting myself into. I can still reminisce how I tried to best prepare myself the previous day by reading the [FAQ](http://devbootcamp.com/faq/) section of Dev Bootcamp's website multiple times. I can still reminisce how confused all of us Newts were, not knowing if we were swimming or drowning. But we made it this far. And that only means one thing; we all swam for our lives. 

And with this great power of knowledge comes great responsibility. I want to blog because I want potential, future coders like we once were to not feel so lost when entering such a foreign world. I want to blog because I want my fellow peers to know what I'm going through when words aren't enough. I want to blog because I want potential employers to know about my unique journey becoming a developer. The question now is...will you?