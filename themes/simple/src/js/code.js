(function () {
  function addCopyButtonToHighlightPanel(panel) {
    var panelTitle = panel.querySelector(".highlight-panel__title");
    if (panelTitle) {
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

      panelTitle.appendChild(button);
    }
  }

  var panels = document.querySelectorAll('.highlight-panel');
  for (var i = 0; i < panels.length; i += 1) {
    addCopyButtonToHighlightPanel(panels[i]);
  }
})();
