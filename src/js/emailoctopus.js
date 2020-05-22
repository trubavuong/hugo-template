(function () {
  function submit(e) {
    e.preventDefault();

    var form = e.target || e.srcElement;
    if (form && form.action) {
      var emailInput = form.querySelector("input[type=\"email\"]");
      if (emailInput && emailInput.value) {
        var request = new XMLHttpRequest();
        request.open("POST", form.action, true);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.onload = function () {
          var feedbackElement = form.parentNode.querySelector(".feedback");
          if (feedbackElement) {
            if (this.status >= 200 && this.status < 400) {
              feedbackElement.innerText = feedbackElement.getAttribute("data-success");
              form.style.display = "none";
            }
            else if (this.responseText) {
              var json = JSON.parse(this.responseText);
              var errorMessage = (json.error && json.error.message);
              if (errorMessage) {
                feedbackElement.innerText = errorMessage;
              }
            }
          }
        };
        request.send("field_0=" + encodeURIComponent(emailInput.value));
      }
    }
  }

  function addSubmitToForm(element) {
    var form = element.querySelector("form");
    addEvent(form, "submit", submit);
  }

  var forms = document.querySelectorAll(".subscribe-form form");
  for (var i = 0; i < forms.length; i += 1) {
    addEvent(forms[i], "submit", submit);
  }
})();
