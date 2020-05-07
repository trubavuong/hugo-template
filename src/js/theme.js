if (window.localStorage) {
  (function () {
    var themeKey = "darkTheme";
    var themeClassName = "dark";
    var togglers = document.querySelectorAll(".theme-toggler");

    function setThemeTextToTogglers(theme) {
      var text = "&rarr; " + (theme > 0 ? "Light" : "Dark");
      for (var i = 0; i < togglers.length; i += 1) {
        togglers[i].innerHTML = text;
      }
    }

    function loadTheme() {
      var element = document.documentElement;
      var theme = localStorage.getItem(themeKey);
      if (theme > 0) {
        addClass(element, themeClassName);
      }
      else {
        removeClass(element, themeClassName);
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
