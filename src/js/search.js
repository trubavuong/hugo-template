(function () {
  var searcher;
  var searchTimeoutId;
  var searchElement = document.querySelector(".search");
  var searchCloseElement = searchElement.querySelector(".search__close");
  var searchClearElement = searchElement.querySelector(".search__clear");
  var searchInputElement = searchElement.querySelector(".search__input");
  var searchResultsElement = searchElement.querySelector(".search__results");
  var searchCompanyElements = document.querySelectorAll(".search-company");
  var limit = 50;
  var isLoadSearchIndexes = false;
  var isSearchPage = (location.pathname === "/search/");

  function getScoreByTerm(regex, keys, index) {
    var score = 0;
    for (var key in keys) {
      var factor = keys[key];
      var text = index[key];

      var match;
      while ((match = regex.exec(text)) !== null) {
        score += factor / (match.index + 1);
      }
    }
    return score;
  }

  function getScoreByTerms(regexes, keys, index) {
    var score = 0;
    for (var i = 0; i < regexes.length; i += 1) {
      score += getScoreByTerm(regexes[i], keys, index);
    }
    return score;
  }

  function Searcher(keys, indexes) {
    this.keys = keys;
    this.indexes = indexes;
  }

  Searcher.prototype.search = function (text) {
    var results = [];

    var terms = text.split(/\s+/);
    var regexes = [];
    for (var i = 0; i < terms.length; i += 1) {
      var term = terms[i];
      if (term) {
        regexes.push(new RegExp("\\b" + reEscape(term), "ig"));
      }
    }

    for (var i = 0; i < this.indexes.length; i += 1) {
      var index = this.indexes[i];
      var score = getScoreByTerms(regexes, this.keys, index);
      if (score > 0) {
        results.push({ score: score, item: index });
      }
    }

    return results.sort(function (indexA, indexB) {
      return indexB.score - indexA.score;
    });
  }

  function search() {
    var results = [];
    var text = (searchInputElement.value || "");

    if (isSearchPage && history && history.pushState) {
      history.pushState(null, "", "/search/?q=" + encodeURIComponent(text));
    }

    if (searcher && text) {
      results = searcher.search(text);
    }

    var html = "";
    for (var i = 0; i < Math.min(results.length, limit); i += 1) {
      var result = results[i].item;
      html += "<li><div><h3><a href=\"" + result.url + "\">" + result.title + "</a></h3><p>" + result.description + "</p></div></li>";
    }
    html = (html ? "<ul>" + html + "</ul>" : "<p>Not found.</p>");

    searchResultsElement.innerHTML = html;
  }

  function scheduleSearch() {
    clearTimeout(searchTimeoutId);
    searchTimeoutId = setTimeout(function () {
      search();
    }, 200);
  }

  addEvent(searchInputElement, "input", scheduleSearch);

  function loadSearchIndexes() {
    if (!isLoadSearchIndexes) {
      isLoadSearchIndexes = true;

      var request = new XMLHttpRequest();
      request.open("GET", "/index.json", true);
      request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
          var indexes = JSON.parse(this.responseText);
          searcher = new Searcher({ title: 10, description: 1 }, indexes);
          scheduleSearch();
        }
      };
      request.send();
    }
  }

  function dumpQueryToSearchInputValue() {
    var match = (location.search || "").match(/\bq=([^&]*)/);
    if (match) {
      searchInputElement.value = decodeURIComponent(match[1]);
    }
  }

  function clearInput(e) {
    e.preventDefault();
    searchInputElement.value = "";
    search();
  }

  addEvent(searchClearElement, "click", clearInput);

  function setActiveSearchPanel(isActive) {
    searchElement.style.display = (isActive ? "block" : "none");
    for (var i = 0; i < searchCompanyElements.length; i += 1) {
      searchCompanyElements[i].style.display = (isActive ? "none" : null);
    }
  }

  function openSearchPanel(e) {
    e.preventDefault();
    setActiveSearchPanel(true);
    loadSearchIndexes();
  }

  function closeSearchPanel(e) {
    e.preventDefault();
    setActiveSearchPanel(false);
  }

  addEvent(searchCloseElement, "click", closeSearchPanel);

  var searchOpenElements = document.querySelectorAll(".search-opener");
  for (var i = 0; i < searchOpenElements.length; i += 1) {
    addEvent(searchOpenElements[i], "click", openSearchPanel);
  }

  if (searchElement.style.display !== "none") {
    loadSearchIndexes();
  }

  if (isSearchPage) {
    dumpQueryToSearchInputValue();
  }
})();
