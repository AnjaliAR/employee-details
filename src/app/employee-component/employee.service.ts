import { Injectable } from '@angular/core';
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
  constructor() {}
  getEmployees() {
    return this.employees.slice();
  }
  editEmployee(i: number) {
    this.employees[i].editable = true;
    return this.employees.slice();
  }
  deleteEmployee(i: number) {
     this.employees.splice(i, 1);
     return this.employees.slice();
  }
  saveEmployee(i:number,empname:string,empproduct:number){
      this.employees[i].editable=false;
      this.employees[i].name=empname;
      this.employees[i].product=empproduct;
      return this.employees.slice();
  }
  addEmployee(){
    let emp=new employee();
    emp.editable=true;
    this.employees.push(emp);
    return this.employees.slice();
  }
}
