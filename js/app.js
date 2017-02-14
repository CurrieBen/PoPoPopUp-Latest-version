console.log('JS loaded');

function setup() {

  $(window).on('beforeunload', function() {
    $(window).scrollTop(0);
  });

  const $police = $('.policemen');
  const $right = $('#right');
  const $left = $('#left');
  const $artist = $('.gArtist');
  const $section = $('.graff');
  const $begin = $('.play');
  const $scoreboard = $('.score');
  const $warning = $('.warning');
  const $timer = $('.time');
  const $shake = $('.shake');
  // const $winning = $('.winning');
  const $bottomSection = $('.behind');
  // const $tryAgain = $('.tryAgain');
  let currentSection = 0;
  const x = 0.03;
  let mousedown = false;
  let policeInSight = false;
  const randomTime = Math.ceil(Math.random()*8500);
  const timeUp = 2500;
  const randomTimeDown = Math.ceil(Math.random()*3000);
  console.log(randomTime);
  console.log(randomTimeDown);
  let currentOpacity = null;
  let newOpacity = null;
  let score = 0;
  let warnings = 0;
  let timeRemaining = 120;

  $begin.on('click' , ()=>{
    firstSound();
    $('html, body').animate({ scrollTop: $(document).height() }, 2000, () => {
      $('html').addClass('locked');
    });
    event.preventDefault();
  });

  function startTime() {
    // showInput();
    setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        checkWin();
        $timer.html('Time Remaining: '+timeRemaining);
      }
    }, 1000);
  }

  function firstSound() {
    $shake[0].play();
    setTimeout(function(){
      $shake[0].pause();
    },2500);
  }


  function appear(){
    // $police.animate({ top: 0 }, timeUp, down()); having down at the end is the complete part and it means that it artist run this function once the rest has completed
    console.log('inside appear()');
    $police.animate({ top: 800 }, timeUp, disappear);
  }

  // Create a function that makes the image go back to it's previous position. Below does not work - need to work on this
  function disappear(){
    console.log('inside disappear()');
    policeInSight = true;
    console.log(policeInSight);
    setTimeout(() => {
      $police.animate({ top: 880 }, randomTimeDown, policeUp);
    }, randomTime);
  }

  function moveRight(){
    $artist.animate({ left: '+=53px' }, 'slow');
    currentSection++;
    console.log(currentSection);
    $artist.css('transform', 'scaleX(1)');
  }

  function moveLeft(){
    $artist.animate({ left: '-=53px' }, 'slow');
    currentSection--;
    $artist.css('transform', 'scaleX(-1)');
    console.log(currentSection);
  }

  function turnAround() {
    $artist.css('transform', 'scaleX(1)');
  }

  let slowly = 0;

  $('#right').mousedown(function(){
    slowly = setInterval(function() {
      mousedown = true;
      sprayWall();
    }, 100);
  }).mouseup(function() {
    mousedown = false;
    clearInterval(slowly);
  });

  function sprayWall() {
    // find the div covering the current wall section
    // update the opacity of that div
    currentOpacity = parseFloat($section.eq(currentSection).css('opacity'));
    newOpacity = currentOpacity + x;
    $section.eq(currentSection).css('opacity', newOpacity);
    console.log(currentOpacity);
    if (parseFloat(newOpacity)<1){
      score++;
    }
    $scoreboard.html('Score: ' + score);
    checkCaught();
  }

  function policeUp() {
    policeInSight = false;
    console.log('inside policeUp()');
    setTimeout(() => {
      appear();
    }, randomTime);
  }

  function checkCaught() {
    if (mousedown === true && policeInSight === true){
      warnings++;
      $warning.html('Warnings: ' + warnings);
    }
    if (warnings >= 1){
      $warning.css('color', '#f00');
    }
    if (warnings === 2){
      setInterval(blinker, 500);
    }
    if (warnings === 3){
      //some code to stop everything and offer reset button
    }
  }


  function blinker() {
    $warning.fadeOut(200);
    $warning.fadeIn(200);
  }

  function checkWin() {
    if(timeRemaining === 0 && warnings < 3 ){
      // $winning.css('visibility', 'visible');
      // $winning.html('Sick One Blud! You got '+ Math.round(score/3.96) + '% of the painting done!');
      $bottomSection.css('visibility', 'hidden');
    }
  }

  // function reset() {
  //
  // }


  $right
    .on('mousedown', sprayWall)
    .on('click', policeUp)
    .on('mousedown', startTime)
    .on('mouseup', moveRight);
  $left
    .on('mousedown', moveLeft)
    .on('mouseup', turnAround);
}

$(() => setup());
