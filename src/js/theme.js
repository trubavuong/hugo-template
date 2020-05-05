if (window.localStorage) {
  (function () {
    var themeName = "dark";
    var themeKey = "darkTheme";
    var regex = /(^|\s)dark(\s|$)/;
    var togglers = document.querySelectorAll(".theme-toggler");

    function setThemeTextToTogglers(theme) {
      var text = "&rarr; " + (theme > 0 ? "Light" : "Dark");
      for (var i = 0; i < togglers.length; i += 1) {
        togglers[i].innerHTML = text;
      }
    }

    function loadTheme() {
      var className = document.body.className;
      var hasThemeInClass = regex.test(className);
      var theme = localStorage.getItem(themeKey);
      if (theme > 0) {
        if (!hasThemeInClass) {
          document.body.className += (className && " ") + themeName;
        }
      }
      else if (hasThemeInClass) {
        document.body.className = className.replace(regex, "");
      }

      setThemeTextToTogglers(theme);
    }

    function toggleTheme(e) {
      e.preventDefault();

      var theme = localStorage.getItem(themeKey);
      localStorage.setItem(themeKey, theme > 0 ? "0" : "1");

      loadTheme();
    }

    for (var i = 0; i < togglers.length; i += 1) {
      addEvent(togglers[i], "click", toggleTheme);
    }

    loadTheme();
  })();
}
