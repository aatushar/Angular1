import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/employeemodel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { DepartmentModel } from '../../model/department.model';
import { DepartmentService } from '../../service/department.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  employees: Employee[] = [];
  departments: DepartmentModel[] = [];
  employeeForm!: FormGroup;

  constructor(
    private employeeService: EmployeeService, 
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    ){}

  ngOnInit(): void {
    this.loadEmployees();
    this.initEmployeeForm();
    this.loadDepartments();
  }

  private loadEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      data => this.employees = data,
      error => console.error('Error fetching employees', error)
    );
  }

  private loadDepartments() {
    this.departmentService.getAllDep().subscribe(
      data => this.departments = data,
      error => console.error('Error fetching departments', error)
    );
  }

  private initEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      eCellNo: ['', Validators.required],
      dob: [''],
      image: [''],
      department: [null, Validators.required] // Assuming you have a department dropdown
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employeeData: Employee = this.employeeForm.value;
      this.employeeService.createEmployee(employeeData).subscribe(
        response => {
          console.log('Employee created successfully', response);
          this.loadEmployees(); // Refresh the list of employees after creation
          this.employeeForm.reset(); // Reset the form
        },
        error => alert('Error creating employee')
      );
    }
  }

}
