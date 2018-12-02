"use strict";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('service-worker.js').then(function (registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

(function (document) {
  var tableFilter = function (array) {
    var _input;

    function selectLibrary(event) {
      _input = event.target;
      var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
      array.forEach.call(tables, function (table) {
        array.forEach.call(table.tBodies, function (tbody) {
          array.forEach.call(tbody.rows, _filter);
        });
      });
    }

    function _filter(row) {
      var text = row.textContent.toLowerCase(),
          val = _input.value.toLowerCase();

      row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
    }

    return {
      init: function init() {
        var selection = document.getElementById('jsFilter');
        selection.onchange = selectLibrary;
      }
    };
  }(Array.prototype);

  document.addEventListener('readystatechange', function () {
    if (document.readyState === 'complete') {
      var jsListing = document.getElementById('jsListing');
      var jsBooks = document.getElementById('jsBooks');

      if (jsListing) {
        tableFilter.init();
      }
    }
  });
})(document);