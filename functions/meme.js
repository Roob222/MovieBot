var fs = require('fs');
var files = fs.readdirSync('./memes/');

console.log(files);

function zingers(){

  var select = Math.floor(Math.random() * 10);

  switch(select){
    case 0:
      return("Here's a fresh one for ya lad");
      break;

    case 1:
      return("One for the road");
      break;

    case 2:
      return("I actually don't like this one, but to each their own");
      break;

    case 3:
      return("This meme should've stayed a dream");
      break;

    case 4:
      return("Because you asked so nicely");
      break;

    case 5:
      return("Here you go!");
      break;

    case 6:
      return("I like memes");
      break;

    case 7:
      return("butts lol");
      break;

    case 8:
      return("Is this OC?");
      break;

    case 9:
      return("Happy to oblige!");
      break;

    default:
      return("CRITICAL ERROR: ZINGERS COULD NOT BE FOUND");
      break;
  }
}


module.exports = {
  name:'meme',
  description:'Posts a random meme from a folder',
  execute(message,args){
    let chosenMeme = files[Math.floor(Math.random()*files.length)];
    message.channel.send(zingers(), {files: [`memes/${chosenMeme}`]});
  }
}

