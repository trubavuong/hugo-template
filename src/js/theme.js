if (window.localStorage) {
  (function () {
    var themeName = "dark";
    var themeKey = "darkTheme";
    var regex = /(^|\s)dark(\s|$)/;

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
    }

    function toggleTheme(e) {
      e.preventDefault();

      var theme = localStorage.getItem(themeKey);
      localStorage.setItem(themeKey, theme > 0 ? "0" : "1");

      loadTheme();
    }

    var elements = document.querySelectorAll(".theme-toggler");
    for (var i = 0; i < elements.length; i += 1) {
      addEvent(elements[i], "click", toggleTheme);
    }

    loadTheme();
  })();
}
