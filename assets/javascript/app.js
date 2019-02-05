$(document).ready(function(){
  
  $("#remaining-time").show();
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);
  
})

var trivia = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId : '',
  
  // questions options and answers data
  questions: {
    q1: 'Who is Helga in love with?',
    q2: 'Which school do the kids go to?',
    q3: 'What kind of store does Mr. Green own',
    q4: 'Who was referred to as Little Miss Perfect?',
    q5: "What is the name of Arnold's grandma and grandpa",
    q6: 'What is Arnolds last name?',
    q7: "What is the one thing Gerald doesn't know how to do"
  },
  options: {
    q1: ['Brainy', 'Gerald', 'Arnold', 'Eugene'],
    q2: ['P.S 116', 'P.S 118', 'P.S 110', 'P.S 119'],
    q3: ['Bookstore', 'Hardware Store', 'Butcher Shop', 'Shoe Store'],
    q4: ['Phoebe', 'Lila', 'Helga', 'Rhonda'],
    q5: ['Boppy and Tom','Carol and Bill','Pia and Pete ','Pooky and Phil'],
    q6: ['Smith','Scott','Carter','Unknown'],
    q7: ['Read', 'Ride a Bike', 'Swim','Spell']
  },
  answers: {
    q1: 'Arnold',
    q2: 'P.S 118',
    q3: 'Butcher Shop',
    q4: 'Lila',
    q5: 'Pooky and Phil',
    q6: 'Unknown',
    q7: 'Ride a Bike'
  },
  // start game
  startGame: function(){
    // restarting game results
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    
    // show game section
    $('#game').show();
    
    
    $('#results').html('');
    
    // show timer
    $('#timer').text(trivia.timer);
    
    // remove start button
    $('#start').hide();

    $('#remaining-time').show();
    
    trivia.nextQuestion();
    
  },
  // method to loop through and display questions and options 
  nextQuestion : function(){
    
    // set timer 10 seconds each question
    trivia.timer = 10;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    
    // to prevent timer speed up
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    
    // gets all the questions then indexes the current questions
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },
  // decrement counter and count unanswered if timer runs out
  timerRunning : function(){
    // if timer still has time left and there are still questions left to ask
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    // the time has run out and increment unanswered, run result
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    // if all the questions have been shown end the game, show results
    else if(trivia.currentSet === Object.keys(trivia.questions).length){
      
      // adds results of game (correct, incorrect, unanswered) to the page
      $('#results')
        .html('<h3>Thank you for playing!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>');
      
      // hide game sction
      $('#game').hide();
      
      // show start button to begin a new game
      $('#start').show();
    }
    
  },
  guessChecker : function() {
    
    // timer ID for gameResult setTimeout
    var resultId;
    
    // the answer to the current question being asked
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    
    // if the text of the option picked matches the answer of the current question, increment correct
    if($(this).text() === currentAnswer){
      $(this).addClass('btn-success').removeClass('btn-info');
      
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct!</h3>');
    }
    // else the user picked the wrong option, increment incorrect
    else{
      $(this).addClass('btn-danger').removeClass('btn-info');
      
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Nope, sorry! '+ currentAnswer +'</h3>');
    }
    
  },
  guessResult : function(){
    
    // increment to next question set
    trivia.currentSet++;
    setTimeout(function(){
    // remove the options and results
    $('.option').remove();
    $('#results h3').remove();

    // begin next question
    trivia.nextQuestion();
 
    }, 2000);
    
  }

}