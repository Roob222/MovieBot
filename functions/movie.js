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
    

    function errHandler(e){
      console.log(e);
      message.channel.send(`Incorrect date format, please use YYYY-MM-DD`);
    }

 
    function getMovieValues(){

      if(!Date.parse(subcommand) || !subcommand || !/\d{4}-\d{2}-\d{2}/.test(subcommand)){
        subcommand = "CURDATE()";
        console.log(/^\d{4}-\d{2}-\d{2}/.test(subcommand));
      }
      else{
        subcommand = "'" + subcommand + "'";
      }


      con.query(`SELECT title FROM Weekly_Films where WEEK(watchWeek) = WEEK(${subcommand})`, function(err,result){
       if(err) throw error;

       try{
        title =  result[0].title;
       }
       catch(error){
         errHandler(error);
       }
      
     });
     
     con.query(`SELECT director FROM Weekly_Films where WEEK(watchWeek) = WEEK(${subcommand})`, function(err,result){
       if(err)  throw error;

       try{
       director =  result[0].director;
       }
       catch(error){
        errHandler(error);
      }
       
     });
   
     con.query(`SELECT writer FROM Weekly_Films where WEEK(watchWeek) = WEEK(${subcommand})`, function(err,result){
       if(err)  throw error;

       try{
       writer =  result[0].writer;
       }
       catch(error){
        errHandler(error);
      }

     });
   
     con.query(`SELECT reubenScore FROM Weekly_Films where WEEK(watchWeek) = WEEK(${subcommand})`, function(err,result){
       if(err)  throw error;
       if( result[0].reubenScore){
         try{
         reubenScore =  result[0].reubenScore;
         }
         catch(error){
          errHandler(error);
        }

       } else {
         reubenScore = 0;
       }
       
     });
   
     con.query(`SELECT oliverScore FROM Weekly_Films where WEEK(watchWeek) = WEEK(${subcommand})`, function(err,result){
       if(err)  throw error;
       if( result[0].oliverScore){
         try{
         oliverScore = result[0].oliverScore;
         }
         catch(error){
          errHandler(error);
        }
       } else {
         oliverScore = 0;
       }
       
     });
   
     con.query(`SELECT ryanScore FROM Weekly_Films where WEEK(watchWeek) = WEEK(${subcommand})`, function(err,result){
       if(err)  throw error;
       if( result[0].ryanScore){
         try{
         ryanScore =  result[0].ryanScore;
         }
         catch(error){
          errHandler(error);
        }
       } else {
         ryanScore = 0;
       }
       
     });

 


  
 

 
   
    con.query(`SELECT watchWeek FROM Weekly_Films where WEEK(watchWeek) = WEEK(${subcommand})`, function(err,result){
      if(err) throw err;

      try{
      watchWeek =  result[0].watchWeek;
      }
      catch(error){
        errHandler(error);
      }
   });

   con.on('error', function(err) {
      console.log("[mysql error]",err);
   });
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
  { name: 'Average Score', value: ((reubenScore + ryanScore + oliverScore) / 3).toFixed(2)}
)
.setFooter(watchWeek)
message.channel.send(movieEmbed);
},500);


  }


}