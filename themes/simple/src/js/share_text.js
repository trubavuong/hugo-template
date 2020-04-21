(function () {
  function addCopyUrlFunctionToButton(button) {
    addEvent(button, "click", function onclick(e) {
      e.preventDefault();

      copy(location.origin + location.pathname);

      button.innerText = "Copied!";
      setTimeout(function () {
        button.innerText = "Copy URL";
      }, 2000);
    });
  }

  var buttons = document.querySelectorAll('.copy-url');
  for (var i = 0; i < buttons.length; i += 1) {
    addCopyUrlFunctionToButton(buttons[i]);
  }
})();
