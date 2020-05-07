function reClass(className) {
  return new RegExp("\\b" + reEscape(className) + "\\b", "g");
}

function removeClass(element, className) {
  var regex = reClass(className);
  element.className = element.className.replace(regex, "");
}

function addClass(element, className) {
  var regex = reClass(className);
  var hasClass = regex.test(element.className);
  if (!hasClass) {
    element.className += (" " + className);
  }
  return hasClass;
}

function toggleClass(element, className) {
  if (addClass(element, className)) {
    removeClass(element, className);
  }
}
