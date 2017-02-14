console.log('JS loaded');

function setup() {

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
  let currentSection = 0;
  const x = 0.03;
  let mousedown = false;
  let policeInSight = false;
  const randomTime = Math.ceil(Math.random()*8500);
  const randomTimeUp = Math.ceil(Math.random()*3000);
  const randomTimeDown = Math.ceil(Math.random()*3000);
  console.log(randomTime);
  console.log(randomTimeDown);
  let currentOpacity = null;
  let newOpacity = null;
  let score = 0;
  let warnings = 0;
  let timeRemaining = 60;

  $begin.on('click' , ()=>{
    $('html, body').animate({ scrollTop: $(document).height() }, 2000);
    event.preventDefault();
  });

  function startTime() {
    // showInput();
    setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        $timer.html('Time Remaining: '+timeRemaining);
      }
    }, 1000);
  }

  function firstSound() {
    $shake.play();
  }


  function appear(){
    // $police.animate({ top: 0 }, randomTimeUp, down()); having down at the end is the complete part and it means that it artist run this function once the rest has completed
    console.log('inside appear()');
    $police.animate({ top: 805 }, randomTimeUp, disappear);
  }

  // Create a function that makes the image go back to it's previous position. Below does not work - need to work on this
  function disappear(){
    console.log('inside disappear()');
    policeInSight = true;
    console.log(policeInSight);
    setTimeout(() => {
      $police.animate({ top: 890 }, randomTimeDown, policeUp);
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

  var slowly;

  $('#right').mousedown(function(){
    slowly = setInterval(function() {
      mousedown = true;
      sprayWall();
    }, 100);
  }).mouseup(function() {
    clearInterval(slowly);
    mousedown = false;
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
    checkWin();
  }

  function policeUp() {
    policeInSight = false;
    console.log('inside policeUp()');
    // setInterval(appear, randomTime);
    // setTimeout( function() {
    //   policeInSight = true;
    // }, randomTime+randomTimeUp);
    // setInterval(disappear, randomTime+randomTimeUp);
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
    if(parseFloat(currentOpacity) === 1 && parseFloat(newOpacity) >= 1){
      console.log('You win!');
    }
  }


  $right
    .on('mousedown', sprayWall)
    .on('click', policeUp)
    .on('click', startTime)
    .on('mouseup', moveRight);
  $left
    .on('mousedown', moveLeft)
    .on('mouseup', turnAround);
  $begin.on('click', firstSound);
}

$(() => setup());
