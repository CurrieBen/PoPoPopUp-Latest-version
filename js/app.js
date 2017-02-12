console.log('JS loaded');
function setup() {

  const $police = $('.policemen');
  const $right = $('#right');
  const $left = $('#left');
  const $will = $('.gArtist');
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
    $will.animate({ left: '+=50px' }, 'slow');
  }

  function moveLeft(){
    $will.animate({ left: '-=50px' }, 'slow');
  }

  function sprayWall() {
    // find the div covering the current wall section
    // update the opacity of that div
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
