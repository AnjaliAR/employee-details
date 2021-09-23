import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { employee } from './shared.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees: employee[] = [
    new employee('Dummy1', 1, false),
    new employee('Dummy2', 2, false),
    new employee('Dummy3', 3, false),
  ];
  employeeChanged=new Subject<employee[]>();
  constructor() {}
  getEmployees() {
    return of(this.employees.slice());
  }
  editEmployee(i:number,e:AbstractControl) {
    this.employees[i]=e.value;
    this.employeeChanged.next(this.employees.slice());
    console.log(this.employees);
  }
  deleteEmployee(i: number) {
     this.employees.splice(i, 1);
     this.employeeChanged.next(this.employees.slice());
     console.log(this.employees);
  }
  /*ssaveEmployee(i:number,empname:string,empproduct:number){
      this.employees[i].editable=false;
      this.employees[i].name=empname;
      this.employees[i].product=empproduct;
      return this.employees.slice();
  }*/
  addEmployee(e:AbstractControl){
    this.employees.push(e.value);
    this.employeeChanged.next(this.employees.slice());
  }
}

