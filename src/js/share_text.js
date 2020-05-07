(function () {
  function copyLink(e) {
    e.preventDefault();

    copy(location.origin + location.pathname);

    button.innerText = "Copied!";
    setTimeout(function () {
      button.innerText = "Copy Link";
    }, 2000);
  }

  var buttons = document.querySelectorAll(".copy-link");
  for (var i = 0; i < buttons.length; i += 1) {
    addEvent(buttons[i], "click", copyLink);
  }
})();
