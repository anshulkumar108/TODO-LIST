const taskInput = document.getElementById("Item");
const taskDescription = document.getElementById("description");
const submit = document.getElementById("addTask");
const incompleteTasksList = document.getElementById("incomplete-tasks");
const completedTasksList = document.getElementById("completed-tasks");

window.addEventListener('DOMContentLoaded', getTaskDetails)

async function getTaskDetails() {
    console.log("loading")
    try {
        const response = await axios.get('https://crudcrud.com/api/dbe342b7e1d64e2083640f9b2c1fa5e0/TODO')
      //
           for(var i=0;i<response.data.length;i++){
             loadTask(response.data[i]);
           }
       
         
    } catch (error) {
        console.log(error);
    }

}


submit.addEventListener('click', async (e) => {
   e.preventDefault();
    console.log(1);

    if (taskInput.value === '' && taskDescription.value === '') {
        alert('Please enter a task.');
        return;
    }

    const task = {
        input: taskInput.value,
        description: taskDescription.value,
        completed: false
    }

    console.log(task);
    taskInput.value="";
    taskDescription.value="";
    //localStorage.setItem(task.input, JSON.stringify(task));
    try {
        const response = await axios.post('https://crudcrud.com/api/dbe342b7e1d64e2083640f9b2c1fa5e0/TODO', task);
        console.log(response);
    } catch (error) {
        console.log(error);
    }

   // window.reload();
   history.go(0);
})




function  loadTask (task) {
    const listItem = document.createElement("li");
    listItem.textContent=Object.values(task)[1] + " "+Object.values(task)[2] +" ";
    console.log('task',listItem);
  
    const delbtn = document.createElement('button')
    delbtn.ClassName = "belete";
    delbtn.id="del"
    delbtn.addEventListener('click',() => deleteTask(task._id));
    const delbtnText=document.createTextNode('delete')
    delbtn.appendChild(delbtnText);
    
    const checkBtn = document.createElement('button')
    checkBtn.className = "complete";
    checkBtn.id="check"
    checkBtn.addEventListener('click',() => editTask(task._id, task.input,task.description));
    const checkBtnText=document.createTextNode('completed')
    checkBtn.appendChild(checkBtnText);
    
    incomplete = document.getElementById('incomplete-tasks');
    complete = document.getElementById('completed-tasks')
    listItem.appendChild(checkBtn);
    listItem.appendChild(delbtn);
    if(task.completed){
        completedTasksList.appendChild(listItem)
        checkBtn.style.display = "none";
    }else{
        incompleteTasksList.appendChild(listItem)
    }
}





const editTask = async (id,taskInput, taskDescription) => {
    const updatedTask = {
        taskInput,
        taskDescription,
        completed:true,
    };

    try {
       const response= await axios.put(`https://crudcrud.com/api/dbe342b7e1d64e2083640f9b2c1fa5e0/TODO/${id}`, updatedTask);
       const res=response.data;
       console.log(res) ;
       history.go(0);
    } catch (error) {
        console.log(error);
    }
};

const deleteTask = async (id) =>{
    try{
        const response = await  axios.delete(`https://crudcrud.com/api/dbe342b7e1d64e2083640f9b2c1fa5e0/TODO/${id}`)
         history.go(0);
    }catch(error){
     console.log('error')
    }
}


