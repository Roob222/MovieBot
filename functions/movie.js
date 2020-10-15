/*
TODO
1. Alter timeout function. Hacky workaround, can be done better.
2. Request specific movie attribute function. Subcommand is read in []. Do something with it
3. Get better coffee. Current brand is kinda shit.
*/




const Discord = require('discord.js');


var title;
var director;
var writer;
var reubenScore;
var ryanScore;
var oliverScore;
var watchWeek;






module.exports = {
  name: 'movie',
  description: 'Returns the current movie of the week',
  execute(message, args, con, subcommand){
    
 
    function getMovieValues(){

       setTimeout(function(){
      con.query(`SELECT title FROM Weekly_Films where WEEK(watchWeek) = WEEK(CURDATE())`, function(err,result){
       if(err) throw err;
        title =  result[0].title;
      
     });
     
     con.query(`SELECT director FROM Weekly_Films where WEEK(watchWeek) = WEEK(CURDATE())`, function(err,result){
       if(err) throw err;
       director =  result[0].director;
       
     });
   
     con.query(`SELECT writer FROM Weekly_Films where WEEK(watchWeek) = WEEK(CURDATE())`, function(err,result){
       if(err) throw err;
       writer =  result[0].writer;
     });
   
     con.query(`SELECT reubenScore FROM Weekly_Films where WEEK(watchWeek) = WEEK(CURDATE())`, function(err,result){
       if(err) throw err;
       if( result[0].reubenScore){
         reubenScore =  result[0].reubenScore;
       } else {
         reubenScore = 0;
       }
       
     });
   
     con.query(`SELECT oliverScore FROM Weekly_Films where WEEK(watchWeek) = WEEK(CURDATE())`, function(err,result){
       if(err) throw err;
       if( result[0].oliverScore){
         oliverScore = result[0].oliverScore;
       } else {
         oliverScore = 0;
       }
       
     });
   
     con.query(`SELECT ryanScore FROM Weekly_Films where WEEK(watchWeek) = WEEK(CURDATE())`, function(err,result){
       if(err) throw err;
       if( result[0].ryanScore){
         ryanScore =  result[0].ryanScore;
       } else {
         ryanScore = 0;
       }
       
     });
   
    }, 200);
 


  
  con.query('SELECT watchWeek FROM Weekly_Films'), function(err,result){
    for(week in result.watchWeek){
      console.log(week + " from db compared with " +subcommand);
      if(subcommand === week.watchWeek){
        console.log("match!");
        watchweek = subcommand;
      }
    }
  }
  

  if(!watchWeek){
   
    con.query(`SELECT watchWeek FROM Weekly_Films where WEEK(watchWeek) = WEEK(CURDATE())`, function(err,result){
      if(err) throw err;
      watchWeek =  result[0].watchWeek;
    
    });
   }

}




getMovieValues();

console.log(subcommand);

//CHANGE THIS HOLY SHIT
setTimeout(function(){

  console.log(title,director);
const movieEmbed = new Discord.MessageEmbed()
.setTitle(`Movie of the Week: ${title}`)
.addFields(
  { name:'Director', value: director},
  { name:'Writer', value: writer},
  { name:'Reuben\'s Score', value: reubenScore},
  { name:'Oliver\'s Score', value: oliverScore},
  { name:'Ryan\'s Score', value: ryanScore},
  { name: 'Average Score', value: (reubenScore + ryanScore + oliverScore) / 3}
)
.setFooter(watchWeek)
.setTimestamp() 
message.channel.send(movieEmbed);
},500);


  }


}