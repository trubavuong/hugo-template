function reClass(className) {
  return new RegExp("\\b" + reEscape(className) + "\\b", "g");
}

function hasClass(element, className) {
  var result = false;
  if (className) {
    var regex = reClass(className);
    result = regex.test(element.className);
  }
  return result;
}

function removeClass(element, className) {
  if (className) {
    var regex = reClass(className);
    element.className = element.className.replace(regex, "");
  }
}

function addClass(element, className) {
  if (!hasClass(element, className)) {
    element.className += (" " + className);
  }
}
