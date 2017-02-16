console.log('JS loaded');

//namespace


function setup() {

  $(window).on('beforeunload', function() {
    $(window).scrollTop(0);
  });

  const $body = $('body');
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
  const $menuMusic = $('.menu-music');
  const $gameMusic = $('.game-track');
  const $spraySound = $('.spraySound');
  const $outcome = $('.outcome');
  const $menu = $('.menu');
  const $tryAgain = $('.tryAgain');
  const $howToGuide = $('.howToGuide');
  const $info = $('.howToPlay');
  const randomTime = Math.ceil(Math.random()*8500);
  const timeUp = 2000;
  const timeDown = 1500;
  const x = 0.03;
  let currentSection = 0;
  let mousedown = false;
  let policeInSight = false;
  let currentOpacity = null;
  let newOpacity = null;
  let score = 0;
  let warnings = 0;
  let timeRemaining = 60;
  let intervalId = null;
  let blinkerInterval = null;
  let slowly = null;

  function openingSequence() {
    firstSound();
    gameSoundBegin();
    startTime();
    $howToGuide.css('visibility', 'hidden');
    setTimeout(() => {
      policeUp();
    }, 2000);
    setTimeout(() => {
      $menu.removeClass('intro');
    }, 2000);
    $('html, body').animate({ scrollTop: $(document).height() }, 2000, () => {
      $('html').addClass('locked');
    });
    menuSoundEnd();
    event.preventDefault();
  }

  function startTime() {
    intervalId = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        checkWin();
        $timer.html('Time Remaining: '+timeRemaining);
      }
    }, 1000);
  }

  function howToPlay() {
    $howToGuide.css('visibility', 'visible');
    setInterval(() => {
      $howToGuide.css('visibility', 'hidden');
    }, 15000);
  }

  function firstSound() {
    $shake[0].play();
    setTimeout(function(){
      $shake[0].pause();
    },2500);
  }

  function menuSoundEnd() {
    $menuMusic[0].pause();
  }

  function gameSoundBegin() {
    setTimeout(function(){
      $gameMusic[0].play();
    },2500);
  }

  function spraySound() {
    $spraySound[0].play();
  }

  function appear(){
    $police.animate({ top: 775 }, timeUp, visible);
  }

  function visible(){
    policeInSight = true;
    setTimeout(() => {
      $police.animate({ top: 874 }, timeDown, policeUp);
    }, randomTime);
  }

  function policeUp() {
    policeInSight = false;
    setTimeout(() => {
      appear();
    }, randomTime);
  }

  function moveRight(){
    $artist.animate({ left: '+=53px' }, 'slow');
    currentSection++;
    $artist.css('transform', 'scaleX(1)');
  }

  function moveLeft(){
    $artist.animate({ left: '-=53px' }, 'slow');
    currentSection--;
    $artist.css('transform', 'scaleX(-1)');
  }

  function turnAround() {
    $artist.css('transform', 'scaleX(1)');
  }

  function startSpraying() {
    slowly = setInterval(function() {
      mousedown = true;
      sprayWall();
    }, 100);
  }

  function bugFix(e) {
    e.preventDefault();
  }

  function bugFixPartTwo() {
    mousedown = false;
    $spraySound[0].pause();
    clearInterval(slowly);
  }

  // find the div covering the current wall section
  // update the opacity of that div
  function sprayWall() {
    currentOpacity = parseFloat($section.eq(currentSection).css('opacity'));
    newOpacity = currentOpacity + x;
    $section.eq(currentSection).css('opacity', newOpacity);
    if (parseFloat(newOpacity)<1){
      score++;
    }
    $scoreboard.html('Completed: ' + Math.round(score/5.28) + '%');
    checkCaught();
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
      blinkerInterval = setInterval(() => {
        blinker();
      }, 500);
    }
    if (warnings === 3){
      $outcome.html('Unlucky bruvva! Maybe try and wait till the popo aint lookin\' next time! Have another crack when you\'re ready...');
      mostResetChanges();
      clearInterval(blinkerInterval);
    }
  }

  function blinker() {
    $warning.fadeOut(200);
    $warning.fadeIn(200);
  }

  function checkWin() {
    if(timeRemaining === 0 && warnings < 3 ){
      $outcome.html('Nice one Bruvva! You got '+ Math.round(score/5.28) + '% of the painting done!');
      $(window).scrollTop(0);
    }
  }

  function mostResetChanges() {
    clearInterval(intervalId);
    policeInSight = false;
    mousedown = false;
    $scoreboard.html('Completed: 0%');
    $warning.html('Warnings: 0');
    $warning.css('color', '#000');
    $section.css('opacity', '0');
    $artist.css('left', 'auto');
    currentOpacity = null;
    newOpacity = null;
    score = 0;
    warnings = 0;
    timeRemaining = 60;
    currentSection = 0;
    $timer.html('Time Remaining: '+timeRemaining);
    $(window).scrollTop(0);
  }

  function reset() {
    $gameMusic[0].pause();
    $menuMusic[0].play();
    $menu.addClass('intro');
    $outcome.html('');
    mostResetChanges();
  }

  $begin.on('click', openingSequence);
  $right
    .on('mousedown', startSpraying)
    .on('mousedown', sprayWall)
    .on('mousedown', spraySound)
    .on('mouseup', moveRight)
    .on('dragstart', bugFix);
  $left
    .on('mousedown', moveLeft)
    .on('mouseup', turnAround);
  $tryAgain.on('click', reset);
  $info.on('click', howToPlay);
  $body.on('mouseup', bugFixPartTwo);
}

$(() => setup());
