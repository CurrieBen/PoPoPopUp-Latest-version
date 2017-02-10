console.log('JS loaded');
function setup() {

  const $police = $('.policemen');
  const $checkCaught = $('.checkCaught');
  const $right = $('#right');
  const $left = $('#left');
  const $will = $('.gArtist');
  let randomTime = Math.ceil(Math.random()*8500);
  console.log(randomTime);


  function appear(){
    $police.animate({ top: 0 });
  }

  // Create a function that makes the image go back to it's previous position

  function down(){
    $police.animate({ bottom: 200 });
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
    policeDown();
  }

  //Function to make policeman go down is not working yet
  function policeDown() {
    setInterval(down, 10000);
  }

  policeUp();


  $checkCaught.on('click', appear);
  $right
    .on('mousedown', sprayWall)
    .on('mouseup', moveRight);
  $left.on('click', moveLeft);
}

$(() => setup());
