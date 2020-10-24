var fs = require('fs');
var files = fs.readdirSync('./lads/');

module.exports = {
  name:'lads',
  description:'Posts a lad',
  execute(message,args){
    let chosenLad = files[Math.floor(Math.random()*files.length)];
    message.channel.send({files: [`lads/${chosenLad}`]});
  }
}