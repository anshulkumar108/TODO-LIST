let submit=document.getElementById("form");
let todo=document.getElementById("Item");
let detail=document.getElementById("description")

window.addEventListener('DOMContentLoaded', getTodoList);



var list = document.getElementById("pending")
var completed=document.getElementById("complete")

list.addEventListener('click',deleteTodoList);
completed.addEventListener('click',finshed)


submit.addEventListener('submit', storingToDoList);
function storingToDoList(e){
    e.preventDefault();
      
    let todoText=todo.value;
    let detailText=detail.value;

    const obj={todoText,detailText};

    localStorage.setItem(obj.todoText,JSON.stringify(obj));
     
    post(obj);
};

function post(obj){
    axios.post("https://crudcrud.com/api/e509ff5643dc4e32baddaf7c960d12d6/todo",obj)
    .then(response=>{
        let output=` <li> ${obj.todoText} ${obj.detailText}
        <button id="complete">&#10003</button>
        <button id="delete">X</button>
    </li>`

    list.innerHTML+=output;
    todo.value="";
    detail.value="";
    console.log(response)
    }).catch((error)=>{console.log(error)});
}

function getTodoList(){
    axios.get("https://crudcrud.com/api/e509ff5643dc4e32baddaf7c960d12d6/todo")
    .then((response)=>{
        response.data.forEach(element => {
            let output= ` <li  id="${element._id}"> ${element.todoText} ${element.detailText}
            <button class="complete">&#10003</button>
            <button class="delete" >X</button>
        </li>`;
        console.log(output);
        list.innerHTML+=output;
        });
    })
}

function deleteTodoList(e){
  
    if(e.target.classList.contains("delete")){
        const item=e.target.parentElement;
        const id=item.getAttribute('id');
        // console.log(item);
       // console.log(1);
        axios.delete(`https://crudcrud.com/api/e509ff5643dc4e32baddaf7c960d12d6/todo/${id}`)
        .then((response) => {
            item.remove();
        }).catch(err => console.log(err));
    }
    
}

function finshed(e){
  if(e.target.classList.contains('complete')){
    
  }

}