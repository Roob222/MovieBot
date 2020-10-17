# MovieBot
# Author: Reuben Tudball
# Date: 10/15/2020

Hey, thanks for checking this bot out! It's my first time making a discord bot, so I decided to start out by giving it a few basic features. MovieBots main feature is handling a movie discussion club. The club is set up so that every week, my friends and I pick a film to watch. On the Sunday we convene to discuss the film and give it a rating out of 10.

This bot currently connects to a backend MySQL database where some basic information about that weeks film is stored (Title, Director etc.). MovieBot queries that information and places it in a Discord Embed message. Unfortunatly, this bot isn't in a "Download and Use" state. A database needs to be created, and the proper queries need to be set up in movie.js. I hope to create a sister CRUD program that will assist in handling the database. In theory, MovieBot can be extended to any weekly activity so feel free to use him as a starting point if you wish.

COMING FEATURES

MovieBot already recognizes a subcommand writting in square brackers []. I'm looking to extend the movie command to allow users to query specific weeks. 

Any help or suggestions are greatly welcomed!


