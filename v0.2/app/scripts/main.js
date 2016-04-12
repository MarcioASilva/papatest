$(document).ready(function() {

  Date.setLocale('en-UK');

  var getEndOfYear = function(arr, field) {
    return Date.create(arr[field]).endOfYear();
  };

  var getEndOfMonth = function(arr, field) {
    return Date.create(arr[field]).endOfMonth()
  };

  var groupByYear = function(data) {
    return data.groupBy(function(row) {
      return getEndOfYear(row, 'Date Received');
    });
  };

  var groupByMonth = function(arr) {
    return arr.groupBy(function(row) {
      return getEndOfMonth(row, 'Date Received');
    });
  };

  var makePage3 = function(arr) {
    return Object.values(groupByYear(arr.data)).map(groupByMonth);
  };

  $('#parse').click(function() {
    var file = $('#file')[0].files[0];

    Papa.parse(file, {
      header: true,
      complete: function(results) {
        console.log(makePage3(results));
      }
    });

  });

});
