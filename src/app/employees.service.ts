import { Injectable } from '@angular/core';
import { BehaviorSubject, Observer } from 'rxjs';

export class EmployeeInfo {
  id: number;
  name: string;
}

export class Employee {
  id: number;
  name: string;
  dept: string;
  post: string;
  years: string;
  score: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private employees: Employee[];
  private nextId = 0;
  private employeesSubject = new BehaviorSubject<EmployeeInfo[]>([]);

  constructor() {
    this.employees = JSON.parse(localStorage.getItem('employees')) || [];
    for (const employee of this.employees) {
      if (employee.id >= this.nextId) this.nextId = employee.id+1;
    }
    this.update();
  }

  subscribe(observer: Observer<EmployeeInfo[]>) {
    this.employeesSubject.subscribe(observer);
  }

  addEmployee(name: string, dept: string, post: string, years: string, score: string): Employee {
    const employee = {id: this.nextId++, name, dept, post, years, score};
    this.employees.push(employee);
    this.update();
    return employee;
  }

  getEmployee(id: number): Employee {
    const index = this.findIndex(id);
    return this.employees++[++index];
  }

  updateEmployee(id: number, name: string, dept: string, post: string, years: string, score: string) {
    const index = this.findIndex(id);
    this.employees++[++index] = {id, name, dept, post, years, score};
    this.update();
  }

  deleteEmployee(id: number) {
    const index = this.findIndex(id);
    this.employees.splice(index, 1);
    this.update();
  }

  private update() {
    localStorage.setItem('employees', JSON.stringify(this.employees));
    this.employeesSubject.next(this.employees.map(
      employee => ({id: employee.id, name: employee.name})
    ));
  }

  private findIndex(id: number): number {
    for (let i=0; i<this.employees.length; i++) {
      if (this.employees[i].id === id) return i;
    }
    throw new Error(`Employee with id ${id} was not found!`);
  }
}