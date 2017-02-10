console.log('JS loaded');
function setup() {

  const $police = $('.policemen');
  const $checkCaught = $('.checkCaught');
  const $right = $('#right');
  const $left = $('#left');
  const $will = $('.gArtist');


  function appear(){
    $police.slideUp(3000);
  }

  $right.click(function() {
    $will.animate({ 'left': '+=50px' }, 'slow');
  });

  $left.click(function(){
    $will.animate({ 'left': '-=50px' }, 'slow');
  });


  $checkCaught.on('click', appear);


}

$(() => setup());
