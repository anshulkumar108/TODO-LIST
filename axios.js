let input = document.getElementById('Item');
let description = document.getElementById('description');
let addTask = document.getElementById('addTask');

let list = document.getElementById('pending');
let completedTaskList=document.getElementById('completed')
//console.log(completedTaskList)

const checkbtn = document.createElement('button');
const delBtn = document.createElement('button');


window.addEventListener("DOMContentLoaded", getTaskDetails);

addTask.addEventListener('click', addTaskDetails);

function addTaskDetails(e) {

    e.preventDefault();

    input = input.value;
    description = description.value
    const data = { input, description };

    localStorage.setItem(input, JSON.stringify(data));

    axios.post('https://crudcrud.com/api/3747e51f7f6b4b1c9ab47ecf23045c62/todolist', data)
        .then((response) => {
            let output = ` <li>
            ${data.input}   ${data.description}
            <button id="check" class="checkbtn"><i class="fa fa-check"></i></button>
            <button id="delete" class="delBtn" ><i class="fa fa-trash"></i></button>
        </li>`
            list.innerHTML += output;
            input.value = "";
            description.value = "";
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
        

}


function getTaskDetails() {
    axios.get('https://crudcrud.com/api/3747e51f7f6b4b1c9ab47ecf23045c62/todolist')
        .then((response) => {
            response.data.forEach(element => {
                let output = ` <li id="${element._id}">${element.input}   ${element.description}
            <button id="check" class="checkbtn"><i class="fa fa-check"></i></button>
            <button id="delete" class="delBtn" ><i class="fa fa-trash"></i></button>
            </li>`
                console.log(output);
                list.innerHTML += output;

            });
        })
}


// function checkbtn(e){
//     if(e.target.ClassList.contains('checkbtn')){
//         const item=e.target.parentElement;
//         const id=item.getAttribute('id')
//     }
// }

list.addEventListener('click', deleteTask)
function deleteTask(e) {
    if (e.target.classList.contains("delBtn")) {
        let item = e.target.parentElement;
        const id = item.getAttribute('id');
      //  console.log(id);
      //item.remove();
        axios.delete(`https://crudcrud.com/api/3747e51f7f6b4b1c9ab47ecf23045c62/todolist/${id}`)
            .then((response) => {
                item.remove();
            }).catch(err => console.log(err));
    }
}

list.addEventListener('click',updateTaskList);

  function updateTaskList(e){
   
    if(e.target.classList.contains("checkbtn")){
        var item=e.target.parentElement;
        var id=item.getAttribute('id')
        axios.delete(`https://crudcrud.com/api/3747e51f7f6b4b1c9ab47ecf23045c62/todolist/${id}`)
        .then((response) => {
           item.remove();
           console.log(item);
            completedTaskList.appendChild(item);
            checkbtn.style.display='none';
           
        }).catch(err => console.log(err));
    }
}