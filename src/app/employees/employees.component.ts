import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeInfo, EmployeesService } from '../employees.service';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees = new BehaviorSubject<EmployeeInfo[]>([]);
  currentEmployee: Employee = {id:-1, name: '', dept:'', post:'', years:'', score:''};
  createEmployee = false;
  editEmployee = false;
  editEmployeeForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private employeesModel: EmployeesService) { }

  ngOnInit() {
    this.employeesModel.subscribe(this.employees);
    this.editEmployeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      dept: ['', Validators.required],
      post: ['', Validators.required],
      years: ['', Validators.required],
      score: ['', Validators.required]
    });
  }

  onSelectEmployee(id: number) {
    this.currentEmployee = this.employeesModel.getEmployee(id);
  }

  employeeSelected(): boolean {
    return this.currentEmployee.id >= 0;
  }

  onNewEmployee() {
    this.editEmployeeForm.reset();
    this.createEmployee = true;
    this.editEmployee = true;
  }

  onEditEmployee() {
    if (this.currentEmployee.id < 0) return;
    this.editEmployeeForm.get('name').setValue(this.currentEmployee.name);
    this.editEmployeeForm.get('dept').setValue(this.currentEmployee.dept);
    this.editEmployeeForm.get('post').setValue(this.currentEmployee.post);
    this.editEmployeeForm.get('years').setValue(this.currentEmployee.years);
    this.editEmployeeForm.get('score').setValue(this.currentEmployee.score);
    this.createEmployee = false;
    this.editEmployee = true;
  }

  onDeleteEmployee() {
    if (this.currentEmployee.id < 0) return;
    this.employeesModel.deleteEmployee(this.currentEmployee.id);
    this.currentEmployee = {id:-1, name: '', dept:'', post:'', years:'', score:''};
    this.editEmployee = false;
  }

  updateEmployee() {
    if (!this.editEmployeeForm.valid) return;
    const name = this.editEmployeeForm.get('name').value;
    const dept = this.editEmployeeForm.get('dept').value;
    const post = this.editEmployeeForm.get('post').value;
    const years = this.editEmployeeForm.get('years').value;
    const score = this.editEmployeeForm.get('score').value;
    if (this.createEmployee) {
      this.currentEmployee = this.employeesModel.addEmployee(name, dept, post, years, score);
    } else {
      const id = this.currentEmployee.id;
      this.employeesModel.updateEmployee(id, name, dept, post, years, score);
      this.currentEmployee = {id, name, dept, post, years, score};
    }
    this.editEmployee = false;
  }
}