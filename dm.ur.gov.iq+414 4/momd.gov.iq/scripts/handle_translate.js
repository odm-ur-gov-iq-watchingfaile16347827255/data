function requestArabicLanguage() {
  localStorage.setItem("English", "false");

  window.location.reload();
}
function requestEnglishLanguage() {
  localStorage.setItem("English", "true");

  window.location.reload();
}

function translate(lang = "arabic") {
  var elements = document.querySelectorAll("*");

  for (var i = 0; i < elements.length; i++) {
    let el = elements[i];
    if (el.hasAttribute("data-bind"))
      el.textContent =
        languages[lang][el.getAttribute("data-bind")] ??
        `Variable not found '${el.getAttribute("data-bind")}'`;
  }
}


function translateToArabicLanguage() {
  translate();
}
function translateToEnglishLanguage() {
  translate("english");
}
