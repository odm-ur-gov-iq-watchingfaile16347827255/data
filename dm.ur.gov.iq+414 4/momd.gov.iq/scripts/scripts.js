// let ministerPostsRootELement;
// let ministryPostsRootELement;

// convert byte array to base 64
function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function latestNews(id) {
  location.href = `pages/department_posts.html?departmentId=${id}`;
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

async function GetVision(isEnglish) {
  let visionElement = document.getElementById("vision");

  let vision = await service.GetVision(isEnglish);

  visionElement.innerText = vision;
}
async function GetQuote(isEnglish) {
  let visionElement = document.getElementById("quote");

  let qoute = await service.GetQuote(isEnglish);

  visionElement.innerText = qoute;
}

// do some stuff on load
window.onload = async function () {
  await esiurService();

  let isEnglish = localStorage.getItem("English") == "true" ? true : false;
  if (isEnglish) translateToEnglishLanguage();
  else translateToArabicLanguage();

  await loadMinisterPosts();
  await loadMinistryPosts();

  await GetVision(isEnglish);
  await GetQuote(isEnglish);

  document.getElementById("pageBody").style.display = "block";
  document.getElementById("loadingContainer").style.display = "none";
};
