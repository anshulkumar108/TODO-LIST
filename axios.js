let input = document.getElementById('Item');
let description = document.getElementById('description');
let addTask = document.getElementById('addTask');
let body=document.getElementById('container')
let completedTaskList=document.getElementById('completed')
//console.log(completedTaskList)

window.addEventListener("DOMContentLoaded", getTaskDetails);

addTask.addEventListener('click', addTaskDetails);

function addTaskDetails(e) {

    e.preventDefault();

    input = input.value;
    description = description.value
    const data = { input, description };

    localStorage.setItem(input, JSON.stringify(data));

    axios.post('https://crudcrud.com/api/a9998faf621847ccbfd9c7986a8be995/todolist', data)
    .then((response) => {
        let output = ` <li>
        ${data.input}   ${data.description}
        <button id="check" class="checkbtn"><i class="fa fa-check"></i></button>
        <button id="delete" class="delBtn" ><i class="fa fa-trash"></i></button>
    </li>`
        
        input.value = "";
        description.value = "";
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
    
    //post(data)
}


function getTaskDetails() {
    axios.get('https://crudcrud.com/api/a9998faf621847ccbfd9c7986a8be995/todolist')
        .then((response) => {
            const ul = document.createElement('ul');
            response.data.forEach(element => {
                const li=document.createElement('li');
               
              let Taskoutput  = ` <li id="${element._id}">${element.input}   ${element.description}
            <button id="check" class="checkbtn" onclick="updateTaskList()"><i class="fa fa-check"></i></button>
            <button id="delete" class="delBtn" onclick="deleteTask(${element._id})"><i class="fa fa-trash"></i></button>
            </li>`
                li.innerHTML=Taskoutput
                ul.appendChild(li)
                console.log(Taskoutput);
               
                
            });
             document.body.appendChild(ul);
        })
}

function deleteTask(id) {
    console.log(1)
        axios.delete(`https://crudcrud.com/api/a9998faf621847ccbfd9c7986a8be995/todolist/${id}`)
            .then((response) => {
               console.log(response)
            }).catch(err => console.log(err));
    }

  function updateTaskList(e){
    console.log(2);
    if(e.target.classList.contains("checkbtn")){
        var item=e.target.parentElement;
        var id=item.getAttribute('id')
        console.log(1);
        axios.delete(`https://crudcrud.com/api/a9998faf621847ccbfd9c7986a8be995/todolist/${id}`)
        .then((response) => {
         console.log(item);
         item.remove();
        completedTaskList.appendChild(item);
           
        }).catch(err => console.log(err));
    }
}