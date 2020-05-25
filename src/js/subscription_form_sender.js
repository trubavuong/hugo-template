(function () {
  function submit(e) {
    e.preventDefault();

    var form = e.target || e.srcElement;
    if (form && form.action) {
      var emailInput = form.querySelector("input[type=\"email\"]");
      if (emailInput && emailInput.name && emailInput.value) {
        var request = new XMLHttpRequest();
        request.open("POST", form.action, true);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(emailInput.name + "=" + encodeURIComponent(emailInput.value));

        var feedbackElement = form.parentNode.querySelector(".feedback");
        if (feedbackElement) {
          feedbackElement.innerText = feedbackElement.getAttribute("data-success");
          form.style.display = "none";
        }
      }
    }
  }

  var forms = document.querySelectorAll(".subscription-form form");
  for (var i = 0; i < forms.length; i += 1) {
    addEvent(forms[i], "submit", submit);
  }
})();
