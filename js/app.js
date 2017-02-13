console.log('JS loaded');

function setup() {

  const $police = $('.policemen');
  const $right = $('#right');
  const $left = $('#left');
  const $will = $('.gArtist');
  const $section = $('.graff');
  // const $everything = $('*');
  let currentSection = 0;
  // let i = 0.1;
  const x = 0.03;
  let mousedown = false;
  let policeInSight = false;
  const randomTime = Math.ceil(Math.random()*8500);
  const randomTimeUp = Math.ceil(Math.random()*3000);
  const randomTimeDown = Math.ceil(Math.random()*10000);
  console.log(randomTime);
  console.log(randomTimeDown);


  function appear(){
    // $police.animate({ top: 0 }, randomTimeUp, down()); having down at the end is the complete part and it means that it will run this function once the rest has completed
    console.log('inside appear()');
    $police.animate({ top: 0 }, randomTimeUp, disappear);
  }

  // Create a function that makes the image go back to it's previous position. Below does not work - need to work on this
  function disappear(){
    console.log('inside disappear()');
    policeInSight = true;
    console.log(policeInSight);
    setTimeout(() => {
      $police.animate({ top: 140 }, randomTimeDown, policeUp);
    }, randomTime);
  }

  function moveRight(){
    $will.animate({ left: '+=53px' }, 'slow');
    currentSection++;
    console.log(currentSection);
  }

  function moveLeft(){
    $will.animate({ left: '-=53px' }, 'slow');
    currentSection--;
    console.log(currentSection);
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
    const currentOpacity = parseFloat($section.eq(currentSection).css('opacity'));
    const newOpacity = currentOpacity + x;
    $section.eq(currentSection).css('opacity', newOpacity);

    checkCaught();
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

  //Function to make policeman go down is not working yet
  //  function policeDown() {
  //  setInterval(down, 10000);
  //  policeInSight = false;
  // }

  function checkCaught() {
    if (mousedown === true && policeInSight === true){
      //change the image below to something better when you get caught
      // $everything.css('background-image', 'url(/Users/123THC/development/project1/images/joke.jpg)');
      console.log('You\'re nicked guv!');
    }
  }


  $right
    .on('mousedown', sprayWall)
    .on('click', policeUp)
    .on('mouseup', moveRight);
  $left.on('click', moveLeft);
}

$(() => setup());
