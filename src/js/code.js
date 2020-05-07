(function () {
  function copyCodeblock(e) {
    var button = e.target || e.srcElement;
    if (button) {
      var panel = button.parentNode.parentNode;
      var code = panel.querySelector("code[data-lang]");
      if (code) {
        copy(code.innerText);

        button.innerText = "Copied!";
        setTimeout(function () {
          button.innerText = "Copy";
        }, 2000);
      }
    }
  }

  function addCopyButtonToCodeblock(panel) {
    var panelHeader = panel.querySelector(".codeblock__header");
    if (panelHeader) {
      var button = document.createElement("button");
      button.innerText = "Copy";

      addEvent(button, "click", copyCodeblock);

      panelHeader.appendChild(button);
    }
  }

  var panels = document.querySelectorAll(".codeblock");
  for (var i = 0; i < panels.length; i += 1) {
    addCopyButtonToCodeblock(panels[i]);
  }
})();
