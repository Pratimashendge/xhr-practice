const cl=console.log;
const postscontainer=document.getElementById('postscontainer');
const postsform=document.getElementById('postsform');
const titlecontrol=document.getElementById('title');
const contentcontrol=document.getElementById('content');
const useridcontrol=document.getElementById('userid');

const BASE_URL=`https://jsonplaceholder.typicode.com`;

const POSTS_URL=`${BASE_URL}/posts`;

const createcards=(arr)=>{
    let result=``;
    for (let i = 0; i< arr.length; i++) {
        
        result+=`<div class="card mb-3" id="${arr[i].id}">
                  <div class="card-header">
                     <h4>${arr[i].title}</h4>
                  </div>
                  <div class="card-body">
                     <p>${arr[i].body}</p>
                  </div>
                  <div class="card-footer d-flex justify-content-between">
                     <button class="btn btn sm btn-info">Edit</button>
                     <button class="btn btn sm btn-danger">Remove</button>
                  </div>
                  </div>`
        postscontainer.innerHTML=result;
}
    }


//API CALL to get posts data

let postsArr;



const fetchallposts=()=>{
     //1 create xhr instance
    let xhr=new XMLHttpRequest()

//2 configuration of API call
xhr.open('GET',POSTS_URL)

xhr.setRequestHeader("content-type","application/json");
xhr.setRequestHeader("Authorization","Bearer token(which is stored in local storage)");


//3 send
xhr.send()

//4 onload
xhr.onload=function(){
   if (xhr.status>=200 && xhr.status <=299){
        postsArr= JSON.parse(xhr.response);
    //    cl(postsArr)
      createcards(postsArr);
   }
} 

}
fetchallposts();

const onpostadd=(eve)=>{
   eve.preventDefault();
   let newpost={
      title:titlecontrol.value,
      body:contentcontrol.value,
      userid:useridcontrol.value

   }
      cl(newpost);
   //API call send new post in db
    let xhr=new XMLHttpRequest();

    xhr.open("POST",POSTS_URL);

    xhr.setRequestHeader("content-type","application/json");
    xhr.setRequestHeader("Authorization","Bearer token(which is stored in local storage)");

    xhr.send(JSON.stringify(newpost));

    xhr.onload=function(){
      if(xhr.status>=200 && xhr.status<300){
         cl(xhr.response);
          let data=JSON.parse(xhr.response)
         postsArr.push(data);
         // createcards(postsArr);

         let card=document.createElement('div');
         card.className="card-mb-3";
         card.id=data.id;

         card.innerHTML=`<div class="card-header">
                     <h4>${data.title}</h4>
                  </div>
                  <div class="card-body">
                     <p>${data.body}</p>
                  </div>
                  <div class="card-footer d-flex justify-content-between">
                     <button class="btn btn sm btn-info">Edit</button>
                     <button class="btn btn sm btn-danger">Remove</button>
                  </div>`

                  postscontainer.append(card);
      }
    }


}





postsform.addEventListener('submit',onpostadd);



