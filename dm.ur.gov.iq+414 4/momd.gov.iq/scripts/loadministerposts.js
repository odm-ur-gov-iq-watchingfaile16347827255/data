async function loadMinisterPosts() {
  let startIndexFetching = 0;

  let postsLimit = 2;

  let showImportantPost = false;

  let showAllPosts = false;

  let isEnglishPost = localStorage.getItem("English") == "true" ? true : false;

  let ministerPostsELement = document.getElementById("minister_posts_root");

  let departmentId = await service.GetDepartmentIdByName("اخبار الوزير");

  let departmentIdEncoded = encodeURIComponent(departmentId);

  let ministerPosts = await service.GetAllDepartmentPosts(
    startIndexFetching,
    postsLimit,
    departmentId,
    showImportantPost,
    showAllPosts,
    isEnglishPost
  );

  if (ministerPosts.length === 0) {
    ministerPostsELement.innerHTML += `  
     
     
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
    for (let index = 0; index < ministerPosts.length; index++) {
      //first post
      if (index === 0) {
        ministerPostsELement.innerHTML += `  
     <a href="pages/department_posts.html?departmentId=${departmentIdEncoded}" >
    
     <div class="card text-right py-0 px-0  text-info">
         <div class="card-header">
         
         <img  width='50%' height="50%"                 
         src='https://momd.gov.iq/store/post_images/${ministerPosts[0].PostImage}' />
       
         </div>
         <div class="card-body py-1 px-1">
             <!-- description of the subject -->
             <div class="container py-0 text-info">
            
             <h6 id="post-title "  > 
              <b>  ${ministerPosts[index].Title} </b>
             </h6>
    
          
         </div>
         </div>
         <div class="card-footer text-info">
    
         </div>
     </div>
    </a>
     `;
      }
      //small element for the second minister post
      if (index == 1) {
        // second post normal design
        ministerPostsELement.innerHTML += `  
        <a href="pages/department_posts.html?departmentId=${departmentIdEncoded}" >
        <div class="row p-1 bg-light text-info">
            <!-- image of the subject -->
            <div class="col-md-4 bg-white d-flex align-items-center justify-content-center">
                <div class="container">
                <img  width='50%' height="50%"                 
                src='https://momd.gov.iq/store/post_images/${ministerPosts[1].PostImage}' />
                </div>
            </div>
            <!-- description of the subject -->
            <div class="col-md-8 bg-white  text-right  p-1">
                <div class="container text-info">
                    <h6 id="post-title ">
                     <b> ${ministerPosts[index].Title}</b>
                    </h6>
                    <h4 id="post-date text-info">
                    </h4>
                </div>
            </div>
        </div>
    </a>
        `;
      }
    }
  }
}
// ${ministerPosts[0].Date.toLocaleDateString()}
//                    ${ministerPosts[index].Date.toLocaleDateString()}
