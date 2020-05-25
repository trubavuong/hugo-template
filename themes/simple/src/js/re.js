function reEscape(string) {
  return string.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
}
