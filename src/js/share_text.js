(function () {
  function addCopyLinkFunctionToButton(button) {
    addEvent(button, "click", function onclick(e) {
      e.preventDefault();

      copy(location.origin + location.pathname);

      button.innerText = "Copied!";
      setTimeout(function () {
        button.innerText = "Copy Link";
      }, 2000);
    });
  }

  var buttons = document.querySelectorAll(".copy-link");
  for (var i = 0; i < buttons.length; i += 1) {
    addCopyLinkFunctionToButton(buttons[i]);
  }
})();
