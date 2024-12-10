const form=document.getElementById("form");
const tbody=document.getElementById("tbody");
const createButton=document.getElementById("login");

//save the row number to update later
let currentRow=null;

//form state "CREATE"|"UPDATE"
let formState="CREATE";

//array for storing the newly added employee objects
let employeeList=[];


let empId=1000;

const onSubmitForm=(event)=>{
    event.preventDefault();
    
    const employee={
    name:event.target.name.value,
    employeeId:++empId,
    mobileNumber:event.target.mobileNumber.value,
    salary:event.target.salary.value,
    team:event.target.team.value,
    role:event.target.role.value,
    company:event.target.company.value
     }
     if(formState==="CREATE"){
        //add employee
        addEmployee(employee);
    }
        else if(formState==="UPDATE"){
            //update employee
             
            updateEmployee(employee);
            formState="CREATE";
            createButton.innerText="Create Employee";
        }
        
        //after adding the employee reset the input values inside the form
        form.reset();
}
//update Employee
function updateEmployee(employee){
 console.log(currentRow); 
 let id=0; 
 console.log(employee.employeeId);
 empId--;
 for(let key in employee){
    if(key!="employeeId"){
     employee[key]=form[key].value;
     currentRow.cells[id].innerText=employee[key];
     id++;
 }
 if(key=="employeeId"){
   currentRow.cells[id].innerText=parseInt(currentRow.getAttribute("data_empId"));
     id++;
 }
}

}



form.addEventListener("submit",onSubmitForm);

function addEmployee(employee){
    let tr=document.createElement("tr");

    for(let key in employee){
        let td=document.createElement("td");
        td.innerText=employee[key];
        tr.append(td);
    }

    let editCell=document.createElement("td");
    let editSpan=document.createElement("span");
    editSpan.className="material-symbols-outlined";
    editSpan.id="edit";
    editSpan.setAttribute("data-empId",employee.employeeId);
    editSpan.innerText="edit";
    editCell.append(editSpan);

    let deleteCell=document.createElement("td");
    let deleteSpan=document.createElement("span");
    deleteSpan.className="material-symbols-outlined";
   deleteSpan.id="delete";
   deleteSpan.setAttribute("data-empId",employee.employeeId);
    deleteSpan.innerText="delete";
    deleteCell.append(deleteSpan);

    tr.setAttribute("data_empId",employee.employeeId);
    tr.append(editCell,deleteCell);    
    tbody.append(tr);
    employeeList.push(employee);

    //edit a row
    editSpan.addEventListener("click",editEmployeeDetails);

    //delete a row
    deleteSpan.addEventListener("click",deleteEmployee);

}

//function for edit a row
function editEmployeeDetails(event){
    const editButton=event.target;
      currentRow=editButton.parentNode.parentNode;
      console.log(currentRow);
    const currentEmployeeId=parseInt(editButton.getAttribute("data-empId"));
    console.log(currentEmployeeId);

    for(let i=0;i<employeeList.length;i++){
        if(currentEmployeeId===employeeList[i].employeeId){
            console.log(employeeList[i]);
            // updateRecord(employeeList[i]);
            fillFormWithData(employeeList[i]);
            break;
        }
    }
    
}

function fillFormWithData(employee){
    for (let key in employee) {
        if (key !== "employeeId") {
            // key = "salary" => form["salary"].value = employee["salary"]
            // console.log(form[key].value);
            form[key].value = employee[key];

        }
    }
    createButton.innerText="Update Employee";
    formState="UPDATE";
}

//function for delete a row
function deleteEmployee(event){
    if(formState==="UPDATE"){
        alert("please update employee before deleting!!");
        return;
    }

    const deleteButton=event.target;
    const record=deleteButton.parentNode.parentNode;
    record.remove();
    console.log(record);

    const currentEmployeeId=parseInt(deleteButton.getAttribute("data-empId"));

    for(let i=0;i<employeeList.length;i++){
        if(employeeList[i].employeeId===currentEmployeeId){
            employeeList.splice(i,1);
            break;
        }
    }
}