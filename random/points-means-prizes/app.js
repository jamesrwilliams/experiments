var $element = document.getElementById('prizeNumber');
var $newRangeButton = document.getElementById('addRange');
var $ranges = document.getElementById('ranges');
var $headerMessage = document.getElementById('message');
var $clearTicketNumberButton = document.getElementById('clearPrizeNumber');
var $rangeElements = document.querySelectorAll('#ranges li');

var LS_KEY = 'pointsMeansPrizes';

$clearTicketNumberButton.addEventListener('click', () => {
   $element.value = '';
    $headerMessage.innerText = 'Points Means Prizes!';
});

$element.addEventListener('input', () => {

   var value = $element.value;

   console.log('Checking result', searchForMatch(value));

   var result = searchForMatch(value);

   if ( result ) {
        $headerMessage.innerText = 'Winner!';
        console.log(result);
        $headerMessage.classList.add('winner');
   } else {
       $headerMessage.innerText = 'Points Means Prizes!';
       $headerMessage.classList.remove('winner');
   }
});



$newRangeButton.addEventListener('click', () => {

    var $range_start = document.getElementById('range_start').value;
    var $range_end = document.getElementById('range_end').value;

    if( $range_start !== '' && $range_end !== '' ) {
        addToRangesArray([parseInt($range_start), parseInt($range_end)]);
    }

});

function addToRangesArray(newItem) {

    let ranges = window.localStorage.getItem(LS_KEY);

    if(ranges === null) {
        ranges = [];
    } else {
        ranges = JSON.parse(ranges);
    }

    ranges.push(newItem);

    window.localStorage.setItem(LS_KEY, JSON.stringify(ranges));

    updateUI();

}

function updateUI() {
    let ranges = JSON.parse(window.localStorage.getItem(LS_KEY));
    $ranges.innerHTML = '';

    for (let i = 0; i < ranges.length; i ++) {

        var range = ranges[i];
        var lower = parseInt(range[0]);
        var upper = parseInt(range[1]);

        if( lower > upper ) {
            lower = range[1];
            upper = range[0];
        }

        var $parentDiv = document.createElement('li');
            $parentDiv.classList.add('list-group-item');
            $parentDiv.classList.add('justify-content-between');
            $parentDiv.classList.add('align-items-center');
            $parentDiv.classList.add('range-item');

        var $labelContainer = document.createElement('div');
            $labelContainer.classList.add('range-labels');

         var $badgeCount = document.createElement('span');
            $badgeCount.classList.add('badge');
            $badgeCount.classList.add('badge-primary');
            $badgeCount.classList.add('badge-pill');
            $badgeCount.innerText = (upper - lower);

        var $startInput = document.createElement('span');
            $startInput.classList.add('range-start');
            $startInput.innerText = lower;

        var $endInput = document.createElement('span');
            $endInput.classList.add('range-end');
            $endInput.innerText = upper;

        $labelContainer.appendChild($startInput);
        $labelContainer.appendChild($endInput);

        var $removeBtn = document.createElement('button');
            $removeBtn.classList.add('btn');
            $removeBtn.placeholder = 'End';
            $removeBtn.setAttribute("pattern", "[0-9]*");
            $removeBtn.setAttribute("data-index", i);
            $removeBtn.classList.add('btn-danger');
            $removeBtn.classList.add('form-control');
            $removeBtn.innerHTML = '<i class="material-icons">delete</i>';

        $removeBtn.addEventListener('click', () => {
            deleteRange(i);
        });

        $parentDiv.appendChild($labelContainer);
        $parentDiv.appendChild($badgeCount);
        $parentDiv.appendChild($removeBtn);

        $ranges.append($parentDiv);
    }

}

function deleteRange(index) {

    let ranges = JSON.parse(window.localStorage.getItem(LS_KEY));

    ranges.splice(index, 1);

    window.localStorage.setItem(LS_KEY, JSON.stringify(ranges));

    updateUI();

}

function searchForMatch(winner) {

    var ranges = JSON.parse(window.localStorage.getItem(LS_KEY));

    if(ranges.length === 0 ) { return false; }

    var result = ranges.filter((range, index) => {

        var lower = parseInt(range[0]);
        var upper = parseInt(range[1]);

        var output =  between(winner, lower, upper);

        return ( output ? index : false );

    });

    return result.length > 0;
}

function between(x, min, max) {


    return x >= min && x <= max;
}

document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM Ready');
    // Load from LS
    updateUI();
});

