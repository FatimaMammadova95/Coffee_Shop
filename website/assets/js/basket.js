(function () {
  window.inputNumber = function (el) {
    let min = el.attr("min") || false;
    let max = el.attr("max") || false;

    let els = {};

    els.dec = el.prev();
    els.inc = el.next();

    el.each(function () {
      init($(this));
    });

    function init(el) {
      els.dec.on("click", decrement);
      els.inc.on("click", increment);
      console.log(el[0].value);

      function decrement() {
        let value = el[0].value;
        value--;
        if (!min || value >= min) {
          el[0].value = value;
        }
      }

      function increment() {
        let value = el[0].value;
        value++;
        if (!max || value <= max) {
          el[0].value = value++;
        }
      }
    }
  };
})();

inputNumber($(".input-number"));

// let number = document.querySelector(".input-number")
// console.log(number.value);