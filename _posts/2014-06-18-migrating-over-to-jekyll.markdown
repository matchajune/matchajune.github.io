---
layout: post
title: "Migrating Over to Jekyll"
date: 2014-06-18 20:42:57 -0400
---

For the last week of Dev Bootcamp's phase_0, one of the challenges was to modify the existing 'juljun14.github.io' website and implement Jekyll for it, or to rewrite all of the HTML/CSS. I thought that learning a topic would be awesome, so I chose to attempt to implement Jekyll.

<!--more-->

Jekyll is a parsing engine bundled as a ruby gem used to build static websites from dynamic components such as templates, partials, liquid code, markdown, etc. Jekyll is known as "a simple, blog aware, static site generator".

"Cool!" I thought to myself. "Let's do this!" I head over to Jekyll's website [here](http://jekyllrb.com/ "go to Jekyll!") and I start reading the documentation. While I'm reading the instructions, I find myself constantly zoning out; I tend to do this when there is an overwhelming amount of information to soak in. I quickly got my notebook and pencil and I tried my best to organize what I had to do:

	* Install Ruby
	* Download "DEVELOPMENT KIT" installer for Windows.
	* Install Jekyll
	* Install Pyhton
	* Install Pygments
	* Learn how Jekyll works
	* Find a good domain name registrar
	* Get an awesome domain name
	* Setup the DNS servers
	* Add comments to my blog

Okay, I need to cut the list short here; you get the point. One of the frustrating things about this whole process is that most of the documentation is written for people with a lot of experience, or so it seems. I needed documentation that is written for a complete newbie, assuming the reader knows absolutely nothing on what to do. I needed someone to hold my hand.

It took me three days to get this website even remotely presentable. Not only that, it didn't help that GitHub kept e-mailing me stating that my website "isn't properly configured to make your site faster and more awesome". The perfectionist in me had to know what was wrong with the initial setup, and how to improve on it. And after doing some more research, I found a couple of things I never knew about:

	* Trailing dots in domain names
	* Record types for DNS servers, such as CNAME or A
	* Apex domain vs subdomain

After playing around with some configurations and constantly googling how to complete this Dev Bootcamp challenge I first started a couple of days ago, I finally got to publish my first blog post! In addition, I stumbled across [octopress](http://octopress.org "go to Octopress!"), a static blogging framework built on top of Jekyll. The good news was that after struggling to understand Jekyll, Octopress wasn't that much different.

One thing I noticed during my learning journey is that there aren't a lot of documentation for complete newbies. I would think that this forces beginners to shy away from attempting to learn and implement Jekyll. Therefore, I want to write a new post in the future to a target audience of people that are beginners to the whole subject and don't know where to start.

I'm happy with what I have accomplished thus far, and cheers to more developing adventures to come!