(function () {
  function addCopyButtonToHighlightPanel(panel) {
    var panelHeader = panel.querySelector(".highlight-panel__header");
    if (panelHeader) {
      var button = document.createElement("button");
      button.innerText = "Copy";
      button.title = "Copy to clipboard";

      addEvent(button, "click", function onclick() {
        var code = panel.querySelector("code[data-lang]");
        if (code) {
          copy(code.innerText);
          button.innerText = "Copied!";
        }
      });

      panelHeader.appendChild(button);
    }
  }

  var panels = document.querySelectorAll('.highlight-panel');
  for (var i = 0; i < panels.length; i += 1) {
    addCopyButtonToHighlightPanel(panels[i]);
  }
})();
