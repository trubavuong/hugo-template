(function () {
  function handleFeedback(form, error) {
    var feedbackElement = form.parentNode.querySelector(".feedback");
    if (feedbackElement) {
      if (error) {
        feedbackElement.innerText = error.message;
      }
      else {
        feedbackElement.innerText = feedbackElement.getAttribute("data-success");
        form.style.display = "none";
      }
    }
  }

  function submit(e) {
    e.preventDefault();

    var form = e.target || e.srcElement;
    if (form && form.action) {
      var emailInput = form.querySelector("input[type=\"email\"]");
      if (emailInput && emailInput.name && emailInput.value) {
        var request = new XMLHttpRequest();
        request.open("POST", form.action, true);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.onload = function () {
          var error;
          if (this.status < 200 || this.status >= 400) {
            try {
              var json = JSON.parse(this.responseText);
              error = json.error;
            }
            catch (error) { }
          }
          handleFeedback(form, error);
        };
        request.send(emailInput.name + "=" + encodeURIComponent(emailInput.value));
      }
    }
  }

  var forms = document.querySelectorAll(".subscribe-form form");
  for (var i = 0; i < forms.length; i += 1) {
    addEvent(forms[i], "submit", submit);
  }
})();
