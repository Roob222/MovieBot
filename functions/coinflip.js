module.exports = {
  name: 'coinflip',
  description: 'This flips a coin',
  execute(message, args){

    var coin = Math.random() >= 0.5;
    
    if(coin){
      message.channel.send("Heads");
    }
    else{
      message.channel.send("Tails");
    }

  }
}
