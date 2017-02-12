console.log('JS loaded');
function setup() {

  const $police = $('.policemen');
  const $right = $('#right');
  const $left = $('#left');
  const $will = $('.gArtist');
  const $section = $('.graff');
  let i = 0.1;
  let x = 0.1;
  const randomTime = Math.ceil(Math.random()*8500);
  const randomTimeUp = Math.ceil(Math.random()*3000);
  const randomTimeDown = Math.ceil(Math.random()*10000);
  console.log(randomTime);


  function appear(){
    $police.animate({ top: 0 }, randomTimeUp, down);
  }

  // Create a function that makes the image go back to it's previous position
  function down(){
    $police.animate({ bottom: 200 }, randomTimeDown);
  }

  function moveRight(){
    $will.animate({ left: '+=53px' }, 'slow');
  }

  function moveLeft(){
    $will.animate({ left: '-=53px' }, 'slow');
  }

  function sprayWall() {
    // find the div covering the current wall section
    // update the opacity of that div
    $section.css('opacity', i);
    i = i+x;
  }

  function policeUp() {
    setInterval(appear, randomTime);
  }

  //Function to make policeman go down is not working yet
  // function policeDown() {
  //   setInterval(down, 10000);
  // }


  $right
    .on('mousedown', sprayWall)
    .on('click', policeUp)
    .on('mouseup', moveRight);
  $left.on('click', moveLeft);
}

$(() => setup());
