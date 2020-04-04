function addEvent(element, event, handler) {
  if (element.addEventListener)  // W3C DOM
    element.addEventListener(event, handler, false);
  else if (element.attachEvent) { // IE DOM
    element.attachEvent("on" + event, handler);
  }
  else {
    element["on" + event] = handler;
  }
}
