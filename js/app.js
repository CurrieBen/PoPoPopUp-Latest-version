console.log('JS loaded');

// doesn't work on most browsers yet
// if (parseInt(windowHeight) <= 400 || parseInt(windowWidth) <= 680) {
//   lockedAllowed = window.screen.lockOrientation(landscape);
// };

function setup() {

  $(window).on('beforeunload', function() {
    $(window).scrollTop(0);
  });

  const $body = $('body');
  const $police = $('.policeman');
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
  let currentSection = 1;
  let mousedown = false;
  let policeInSight = false;
  let currentOpacity = null;
  let newOpacity = null;
  let score = 0;
  let warnings = 0;
  let timeRemaining = 60;
  let intervalId = null;
  let slowly = null;
  let windowHeight = screen.height;
  let windowWidth = screen.width;

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
    if (parseInt(windowHeight) <= 400 || parseInt(windowWidth) <= 680) {
      $police.animate({ top: -65 }, timeUp, visible);
    } else {
      $police.animate({ top: -150 }, timeUp, visible);
    }
  }

  function visible(){
    policeInSight = true;
    setTimeout(() => {
      $police.animate({ top: 0 }, timeDown, policeUp);
    }, randomTime);
  }

  function policeUp() {
    policeInSight = false;
    setTimeout(() => {
      appear();
    }, randomTime);
  }

  function moveRight(){
    if (parseInt(windowHeight) <= 400 || parseInt(windowWidth) <= 680) {
      $artist.animate({ left: '+=30px' }, 'slow');
    } else {
      $artist.animate({ left: '+=90px' }, 'slow');
    }
    currentSection++;
    $artist.css('transform', 'scaleX(1)');
  }

  function moveLeft(){
    if (parseInt(windowHeight) <= 400 || parseInt(windowWidth) <= 680) {
      $artist.animate({ left: '-=30px' }, 'slow');
    } else {
      $artist.animate({ left: '-=90px' }, 'slow');
    }
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

  function dragAwayFix(e) {
    e.preventDefault();
  }

  function dragAwayFixPartTwo() {
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
    if (parseFloat(newOpacity)<1 && currentSection > 0 && currentSection < 9){
      score++;
    }
    $scoreboard.html('Completed: ' + Math.round(score/2.64) + '%');
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
    if (warnings === 3){
      $outcome.html('Unlucky bruvva! Maybe try and wait till the popo aint lookin\' next time! Have another crack when you\'re ready...');
      mostResetChanges();
    }
  }

  function checkWin() {
    if (score === 264 && warnings < 3) {
      $outcome.html('Nice one Bruvva! You smashed it! Maybe you should be teaching me?!');
      $(window).scrollTop(0);
    }
    if(timeRemaining === 0 && warnings < 3 && score < 264){
      $outcome.html('Nearly Bruvva! You got '+ Math.round(score/2.64) + '% of the painting done!');
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
    currentSection = 1;
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
    .on('dragstart', dragAwayFix);
  $left
    .on('mousedown', moveLeft)
    .on('mouseup', turnAround);
  $tryAgain.on('click', reset);
  $info.on('click', howToPlay);
  $body.on('mouseup', dragAwayFixPartTwo);
}

$(() => setup());
