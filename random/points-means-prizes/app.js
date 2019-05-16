var $element = document.getElementById('prizeNumber');
var $newRangeButton = document.getElementById('addRange');
var $ranges = document.getElementById('ranges');
var $headerMessage = document.getElementById('message');
var $clearTicketNumberButton = document.getElementById('clearPrizeNumber');

$clearTicketNumberButton.addEventListener('click', () => {
   $element.value = '';
    $headerMessage.innerText = 'Points Means Prizes!';
});

$element.addEventListener('input', () => {

   var value = $element.value;
   var $rangeElements = document.querySelectorAll('#ranges li');
   var ranges = [];

   for(var i = 0; i < $rangeElements.length; i++ ) {
       var $elm = $rangeElements[i];
       var rangeStart = $elm.querySelector('.range-start');
       var rangeEnd = $elm.querySelector('.range-end');

       ranges.push([rangeStart.value, rangeEnd.value]);
   }

   if ( searchForMatch(ranges, value) ) {
        $headerMessage.innerText = 'Winner winner chicken dinner';
   } else {
       $headerMessage.innerText = 'Points Means Prizes!';
   }

});

$newRangeButton.addEventListener('click', () => {

    var $parentDiv = document.createElement('li');
        $parentDiv.classList.add('form-group');

    var $startInput = document.createElement('input');
        $startInput.type = 'number';
        $startInput.classList.add('form-control');
        $startInput.setAttribute("pattern", "[0-9]*");
        $startInput.classList.add('range-start');
        $startInput.placeholder = 'Start';

    var $endInput = document.createElement('input');
        $endInput.type = 'number';
        $endInput.classList.add('form-control');
        $endInput.classList.add('range-end');
        $endInput.placeholder = 'End';

    var $removeBtn = document.createElement('button');
        $removeBtn.classList.add('btn');
        $startInput.placeholder = 'Start';
        $removeBtn.setAttribute("pattern", "[0-9]*");
        $removeBtn.classList.add('btn-danger');
        $removeBtn.classList.add('form-control');
        $removeBtn.innerHTML = '<i class="material-icons">delete</i>';

        $removeBtn.addEventListener('click', () => {
           $parentDiv.remove();
        });

    $parentDiv.appendChild($startInput);
    $parentDiv.appendChild($endInput);
    $parentDiv.appendChild($removeBtn);

    $ranges.appendChild($parentDiv);

    $startInput.focus();

});

function searchForMatch(ranges, winner) {

    if(ranges.length === 0 ) { return false; }

    var result = ranges.filter(range => {

        return between(winner, range[0], range[1]);

    });

    return result.length > 0;
}

function between(x, min, max) {
    return x >= min && x <= max;
}
