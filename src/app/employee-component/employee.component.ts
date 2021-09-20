import { Component } from "@angular/core";
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from "@angular/forms";
import { EmployeeService } from "./employee.service";
import { employee } from "./shared.model";

@Component({
    selector:"employee",
    templateUrl:'./employee.component.html',
    styleUrls:['./employee.component.css']
})
export class EmployeeComponent{
   
    employees: employee[];
    employeeForm=new FormGroup({
      name:new FormControl(''),
      product:new FormControl('')
    });
    constructor(private service:EmployeeService){
      this.employees=this.service.getEmployees(); 
      
    }
    addNewEmployee(){
      this.employees=this.service.addEmployee();
      this.employeeForm.reset();
    }
    onSave(i:number,f:FormGroup){
      this.service.saveEmployee(i,this.employeeForm.value.name,this.employeeForm.value.product)
      console.log(this.employeeForm.value.name)
    }
    onEdit(index:number){
        this.employees=this.service.editEmployee(index);
    }
    onDelete(i:number){
      this.employees=this.service.deleteEmployee(i);
    }  
}