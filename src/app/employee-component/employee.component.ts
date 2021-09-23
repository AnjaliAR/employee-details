import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { EmployeeService } from './employee.service';
import { employee } from './shared.model';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employeeForm = this.fb.group({
    employeearray: this.fb.array([]),
  });
  newEmp?:boolean;
  get employee(): FormArray {
    return this.employeeForm.get('employeearray') as FormArray;
  }
  
  constructor(private service: EmployeeService, private fb: FormBuilder) {}
  addNewEmployee() {
    this.newEmp=true;
    let emp = this.fb.group({
      name:[''],
      product: [],
      editable: true
    });
    this.employee.push(emp);
  }
  onSave(i: number,e:AbstractControl) {
    e.patchValue({
      editable:false
    });
    if(this.newEmp==false){
    this.service.editEmployee(i,e);
    console.log(this.employeeForm.value);
  }
  else{
    this.service.addEmployee(e);
  }
  }
  onEdit(e:AbstractControl) {
    this.newEmp=false;
    e.patchValue({
      editable:true
    })
  }
  onDelete(i: number) {
    this.employee.removeAt(i);
    this.service.deleteEmployee(i);
  }
  onClickSubmit(employeeForm:FormGroup){
    console.log(employeeForm.value);
  }
  onCancel(i:number, e:AbstractControl){
    e.patchValue({
      editable:false
    })
    if(this.newEmp==false)
    this.service.editEmployee(i,e);
    else{
      this.onDelete(i);
    }
  }
  ngOnInit() {
    this.service.getEmployees().subscribe((employeeData) => {
      for (let i = 0; i < employeeData.length; i++) {
        let emp = this.fb.group({
          name: employeeData[i].name,
          product: employeeData[i].product,
          editable: employeeData[i].editable,
        });
        this.employee.push(emp);
      }
    });
    console.log(this.employee.controls[0].value['name']);
  }
}
