// draw an online service elements
function onlineServicesElement(
  serviceUrl,
  imgUrl,
  serviceHeader,
  serviceHeaderId,
  serviceDescription,
  serviceDescriptionid
) {
  let onlineServiceElement = document.getElementById("online-services");

  onlineServiceElement.innerHTML += `
    <div class="col-md-3" style="width:100px; height:100px;">
    <a href="${serviceUrl}">
        <div class="card text-dark bg-info p-2"  >
            <div class="card-header">
                <div class="container text-center ">
                    <img src="${imgUrl}" class="rounded-lg  " alt="Cinque Terre"
                        width="100px" height="100px">
                </div>
            </div>
            <div class="card-body text-center text-white px-0 mx-0"  >
                <h3 data-bind="${serviceHeaderId}"> ${serviceHeader}</h3>
            </div>
  
            <div class="card-footer text-center text-white">
             <p data-bind='${serviceDescriptionid}'>   ${serviceDescription} </p>
            </div>
        </div>
    </a>
  </div>
    `;
}

// load online service element

onlineServicesElement(
  "https://drive.google.com/drive/folders/1v_W_Q1bDtI2NntC9Mgtl_9kGlwQu0AZi?usp=sharing",
  "./images/icons/gov_icon.png ",
  "وجبات المنح المالية للنازحين",
  "PackedfinancialGrantsforDisplacedPeople",
  "",
  "test"
);

onlineServicesElement(
  "https://ur.gov.iq/index/show-eservice/50417/10033/org?fbclid=IwAR1vZW0_xyBNc4ygMbOTwuj9WtIRpdhBeHOcjK7mr_x1JcfsVVhcnMsjr14",
  "./images/icons/phone_icon.png",
  "استمارة الكفاءات العراقية في الخارج",
  "IraqiCompetenciesAbroadForm",
  "",
  "test"
);

let isEnglishPost = localStorage.getItem("English") == "true" ? true : false;

if (isEnglishPost) {
  onlineServicesElement(
    "pages/department_posts.html?departmentId=667",
    "./images/icons/gov_icon.png",
    "الاستراتيجية الوطنية للنزاهه ومكافحة الفساد",
    "ElectronicApplicationForm",
    "",
    "ImmigrantsAndImmigrantsRegistrationForm"
  );
} else {
  onlineServicesElement(
    "pages/department_posts.html?departmentId=666",
    "./images/icons/gov_icon.png",
    "الاستراتيجية الوطنية للنزاهه ومكافحة الفساد",
    "ElectronicApplicationForm",
    "",
    "ImmigrantsAndImmigrantsRegistrationForm"
  );
}
