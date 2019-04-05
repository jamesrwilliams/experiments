(function () {

  var $button = document.getElementById('process');
  var $stage = document.getElementById('stage');
  var $input = document.getElementById('csv-input');
  var $save = document.getElementById('save-ls');
  
  $button.addEventListener("click", function() { 
    
    let parsedData = [];
    let entries = CSVToArray($input.value);
        
    for (var i = 0; i < entries.length; i++) {
      
      let primaryKey = entries[i][0];
      let primaryTitle = entries[i][1];
      let secondaryKey = entries[i][2];
      let secondaryTitle = entries[i][3];
      
      let indexInArray = objectArrayIndex(parsedData, primaryKey);
            
      if (indexInArray === false) {
        
        parsedData.push({
          label: primaryTitle,
          code: primaryKey,
          options: [{
            label: secondaryTitle,
            code: secondaryKey
          }]
        });
        
      } else {
        
        parsedData[indexInArray].options.push({
          label: secondaryTitle,
          code: secondaryKey
        });
        
      }
      
    }
    
    // Output
    $stage.innerHTML = JSON.stringify(parsedData, null, 2);
  
  });
  
  $save.addEventListener('click', function() {
    
    window.localStorage.setItem('csv_data', $input.value);
    
  });
  
  var loadedData = window.localStorage.getItem('csv_data');
  if (loadedData) { $input.value = loadedData; }
  
  /**
   * [objectArrayIndex description]
   * @param  {array} haystack [description]
   * @param  {string} needle  [description]
   * @return {int | boolean}  [description]
   */
  function objectArrayIndex(haystack, needle){
    
    var index = false;
    for(var i = 0; i < haystack.length; i++) {
      
        if (haystack[i].code == needle) {
            
            index = i;
            break;
        }
    }
    
    return index;
    
  }
    
  /**
   * [CSVToArray description] (ref: http://stackoverflow.com/a/1293163/2343)
   * @param {string} strData      This will parse a delimited string into an array of arrays.
   * @param {string} strDelimiter The default delimiter is the comma, but this can be overriden in the second argument.
   */
  function CSVToArray( strData, strDelimiter ){
      // Check to see if the delimiter is defined. If not,
      // then default to comma.
      strDelimiter = (strDelimiter || ",");

      // Create a regular expression to parse the CSV values.
      var objPattern = new RegExp(
          (
              // Delimiters.
              "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

              // Quoted fields.
              "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

              // Standard fields.
              "([^\"\\" + strDelimiter + "\\r\\n]*))"
          ),
          "gi"
          );


      // Create an array to hold our data. Give the array
      // a default empty first row.
      var arrData = [[]];

      // Create an array to hold our individual pattern
      // matching groups.
      var arrMatches = null;


      // Keep looping over the regular expression matches
      // until we can no longer find a match.
      while (arrMatches = objPattern.exec( strData )){

          // Get the delimiter that was found.
          var strMatchedDelimiter = arrMatches[ 1 ];

          // Check to see if the given delimiter has a length
          // (is not the start of string) and if it matches
          // field delimiter. If id does not, then we know
          // that this delimiter is a row delimiter.
          if (
              strMatchedDelimiter.length &&
              strMatchedDelimiter !== strDelimiter
              ){

              // Since we have reached a new row of data,
              // add an empty row to our data array.
              arrData.push( [] );

          }

          var strMatchedValue;

          // Now that we have our delimiter out of the way,
          // let's check to see which kind of value we
          // captured (quoted or unquoted).
          if (arrMatches[ 2 ]){

              // We found a quoted value. When we capture
              // this value, unescape any double quotes.
              strMatchedValue = arrMatches[ 2 ].replace(
                  new RegExp( "\"\"", "g" ),
                  "\""
                  );

          } else {

              // We found a non-quoted value.
              strMatchedValue = arrMatches[ 3 ];

          }


          // Now that we have our value string, let's add
          // it to the data array.
          arrData[ arrData.length - 1 ].push( strMatchedValue );
      }

      // Return the parsed data.
      return( arrData );
  }

}());