---
layout: post
title: "Vibe Registration Web App"
date: 2015-03-02 10:00:00
comments: false
---

My cousin approached me with an interesting problem. He said that last year's registration for a dance competition was a little disorganized. Many teams sent different versions of the form registration back to him. This led to hours of unnecessary work to make the forms constant and organized to his liking.

It would be awesome if I could create a simple web application to solve this.

## Brainstorming

My cousin would send out an e-mail to each team leader to inform him/her to register for the upcoming dance competition. The team leader, or the user, would sign up and register on the site. Only after registering, the user would see a form to register the organization and all the names that belong to that particular organization. The names would not have to be tied to the user table because only the leader has to register on the site; the names could be stored as an array. One particular problem that would need to be solved in the future are dancers that are on multiple teams.

Here's a quick database schema I whipped up for the app:

![alt text](/assets/img/vibe_table.png "Database schema")

## Coding

The main thing I want to work is the form submission for each team. The styling, options, flow can all be edited after the form is working correctly. Some of the things I've encountered on my process:

1. I always thought the database relationship had to be a many-to-many. This got me real confused with how to build a form that needed to update multiple databases. I decided to simplify everything by creating a one-to-many relationship and storing all the names as an array.
2. The best way to enter multiple names would be to have a dynamic form where you can enter however many names necessary into the form. I again simplified the form by just having a text area. I am not comfortable with this solution because there could be errors on the user's behalf.
3. I then decided to have a checkbox to tell the user to double check the form before submitting.
4. I still have to find a way to export all this information to a document for an admin to print out.
5. Styling would always be nice as it is part of the user experience. I am deathly afraid of styling, but I should attempt to tackle it head on.

## After MVP

I definitely want to work on features of this application. I think that I get too excited when I do decide to work on it and get overwhelmed with features I want to implement. This leads me to not implementing anything. I came up with a good plan and decided to only work on one feature every week, even if I was able to complete the feature in one day.

Cheers to the comings of this app!