let input=document.getElementById('Item');
let taskDetail=document.getElementById('description')
let addBtn=document.getElementById('addTask');
const notCompleted=document.getElementById('pending');
const completed=document.getElementById('completed');



addBtn.addEventListener('click', (e)=>{
   // console.log(1);
   e.preventDefault();


const newLi=document.createElement('li');
const checkbtn=document.createElement('button');
const delBtn=document.createElement('button');
 
checkbtn.innerHTML='<i class="fa fa-check"></i>';
delBtn.innerHTML='<i class="fa fa-trash"></i>';

if(input.value !==''){
    const obj={
        input: input.value,
        taskDetail: taskDetail.value
    }
   // newLi.textContent=obj.input + ' ' + obj.taskDetail;
    //console.log(newLi.textContent);
    localStorage.setItem("Task" , JSON.stringify(obj.taskDetail));

    newLi.textContent=JSON.parse(localStorage.getItem('Task'));
   
    input.value='';
    taskDetail.value='';

    newLi.appendChild(checkbtn);
    newLi.appendChild(delBtn);
    notCompleted.appendChild(newLi);

}

checkbtn.addEventListener('click', function(){
    const parent=this.parentNode;
    parent.remove();
    completed.appendChild(parent);
    checkbtn.style.display='none';
 
})

delBtn.addEventListener('click', function(){
    const parent=this.parentNode;
    parent.remove();

})

})

