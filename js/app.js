console.log('JS loaded');
function setup() {

  const $police = $('.policemen');
  const $checkCaught = $('.checkCaught');
  const $right = $('#right');
  const $left = $('#left');
  const $will = $('.gArtist');


  function appear(){
    $police.animate({ top: 0 });
  }

  function moveRight(){
    $will.animate({ left: '+=50px' }, 'slow');
  }

  $left.click(function(){
    $will.animate({ left: '-=50px' }, 'slow');
  });

  function sprayWall() {
    // find the div covering the current wall section
    // update the opacity of that div
  }

  // $right.click(function() {
  //   $will.animate({ 'left': '+=50px' }, 'slow');
  // });
  //
  // $left.click(function(){
  //   $will.animate({ 'left': '-=50px' }, 'slow');
  // });


  $checkCaught.on('click', appear);
  $right
    .on('mousedown', sprayWall)
    .on('mouseup', moveRight);


}

$(() => setup());
