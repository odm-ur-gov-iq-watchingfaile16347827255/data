async function loadMinistryPosts() {
  let startIndexFetching = 0;

  let postsLimit = 4;

  let showImportantPost = false;

  let showAllPosts = false;

  let isEnglishPost = localStorage.getItem("English") == "true" ? true : false;

  let ministryPostsELement = document.getElementById("ministry_posts_root");

  let departmentId = 0;

  let departmentIdEncoded = encodeURIComponent(departmentId);

  let ministryPosts = await service.GetAllDepartmentPosts(
    startIndexFetching,
    postsLimit,
    departmentId,
    showImportantPost,
    showAllPosts,
    isEnglishPost
  );

  if (ministryPosts.length === 0) {
    ministryPostsELement.innerHTML += `  
      <div class="card text-center py-0 px-0  text-info">
          <div class="card-header ">... </div>
          <div class="card-body py-1 px-1">
              <!-- description of the subject -->
              <div class="container py-0 text-info"><h6 id="post-title "  > ...   </div>
          </div>
          <div class="card-footer text-info"> ...
          </div>
      </div>
  
      `;
  } else {
    //load the two posts
    for (let index = 0; index < ministryPosts.length; index++) {
      ministryPostsELement.innerHTML += `  
        <a href="pages/department_posts.html?departmentId=${departmentIdEncoded}" >
        <div class="row p-1 m-1  bg-light border text-info ">
            <!-- image of the subject -->
            <div class="col-md-4 bg-white d-flex align-items-center justify-content-center">
            <div class="container">
            <img  width='100%' height="100%"                 
            src='https://momd.gov.iq/store/post_images/${ministryPosts[index].PostImage}' />
            </div>
            </div>
            <!-- description of the subject -->
            <div class="col-md-8 bg-white  text-right p-1">
                <div class="container">
                  
                    <h6 id="post-title  "  class="text-info">
  
                   <b>  ${ministryPosts[index].Title} </b> 
                       
                    </h6>
     
                    <p id="post-date text-info">
                  
                    </p>
                </div>
            </div>
        </div>
    </a>
        `;
    }
  }
}
//  ${ministryPosts[index].Date.toLocaleDateString()}
