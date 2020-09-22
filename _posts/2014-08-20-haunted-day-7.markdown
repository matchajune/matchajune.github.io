---
layout: post
title: "Haunted: Day 7"
date: 2014-08-20 10:31:39
comments: false
---

I got into the dbc space by 10:00am today and the team was ready to work.
David continued struggling through tilemaps in Tiled Map Editor and loading the JSON object produced into Phaser.
Sid started work on implementing a pause button.
Julius added instructions and about me info to modals.
Cassie and I paired on sending and receiving coordinates with Firebase. 

We were running into lag while trying to play the game from two separate computers.
In the early hours of the morning we realized this issue came from us simultaneously sending and receiving coordinates for pacman and ghost. We fixed this by only sending coordinates for pacman from player one (the player moving pacman) and listening to the coordinates of the ghost. We did the inverse for player two. After we saw that this fixed our lag issue, we re-enabled all four ghosts but quickly realized that this causes glitchy behavior. We disabled all ghosts except one and figured we might return to optimizing all four ghosts later if all other features we wanted were completed.
Took a break for lunch around 12:30pm, David and I grabbed Tres Carnes. David's been there so often that the workers tend to joke about how much food he orders.

Back to work around 1:30pm.
Julius worked on styling the homepage.
David made a pretty huge breakthrough on enabling collision for the tilemap's walls. He broke out cheering and the entire floor started chanting "yes".
After that David and Julius worked on user authentication.
Sid finally finished implementing pause and moved on to allowing user's to pick their avatar.
Cassie and I made Sid's pause feature multilayer as well as only enable the game to start once player two enters the room.
Then Cassie split off to do a lot of styling.
I added two more power ups (speed up, and slow down) and started refactoring some JavaScript.

## Author:

Rootul Patel