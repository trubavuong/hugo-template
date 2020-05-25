if (window.localStorage) {
  (function () {
    var themeKey = "theme";
    var themes = [
      {
        name: "dark",
        text: "Dark",
        className: "dark",
      },
      {
        name: "light",
        text: "Light",
        className: "light",
      },
    ];
    var togglers = document.querySelectorAll(".theme-toggler");

    function setThemeTextToTogglers(text) {
      for (var i = 0; i < togglers.length; i += 1) {
        togglers[i].innerHTML = text;
      }
    }

    function setThemeClass(className) {
      var element = document.documentElement;
      for (var i = 0; i < themes.length; i += 1) {
        removeClass(element, themes[i].className);
      }
      addClass(element, className);
    }

    function getDefaultTheme() {
      var element = document.documentElement;
      for (var i = 0; i < themes.length; i += 1) {
        var theme = themes[i];
        if (hasClass(element, theme.className)) {
          localStorage.setItem(themeKey, theme.name);
          return theme;
        }
      }
    }

    function getTheme(themeName) {
      for (var i = 0; i < themes.length; i += 1) {
        var theme = themes[i];
        if (theme.name === themeName) {
          theme.index = i;
          return theme;
        }
      }
    }

    function getNextTheme(themeName) {
      var theme = getTheme(themeName);
      var nextIndex = (theme ? (theme.index + 1) : 0);
      if (nextIndex >= themes.length) {
        nextIndex = 0;
      }
      return themes[nextIndex];
    }

    function loadTheme() {
      var themeName = localStorage.getItem(themeKey);
      if (!themeName) {
        var defaultTheme = getDefaultTheme();
        if (defaultTheme) {
          themeName = defaultTheme.name;
        }
      }

      if (themeName) {
        var theme = getTheme(themeName);
        if (theme) {
          setThemeClass(theme.className);

          var nextTheme = getNextTheme(themeName);
          setThemeTextToTogglers(nextTheme.text);
        }
      }
    }

    function toggleTheme(e) {
      e.preventDefault();

      var themeName = localStorage.getItem(themeKey);
      var nextTheme = getNextTheme(themeName);
      localStorage.setItem(themeKey, nextTheme.name);

      loadTheme();
    }

    for (var i = 0; i < togglers.length; i += 1) {
      addEvent(togglers[i], "click", toggleTheme);
    }

    loadTheme();
  })();
}
