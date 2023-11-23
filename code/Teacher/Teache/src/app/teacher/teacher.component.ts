import { Component, OnInit } from '@angular/core';
import { TeacherModel } from './teacher.model';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class EmployeeComponent implements OnInit {

  employeeModel : TeacherModel=new TeacherModel();
  formValue !: FormGroup;

  employeeData: any;



  

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      department: [''],
      gender: [''],
      hobby: [''],
      

    });

    this.getAll();

  }

  saveEmployee() {

    
      this.teachermodel.name = this.formValue.value.firstName;
      this.employeeModel.department = this.formValue.value.department;
      this.employeeModel.email = this.formValue.value.email;
      this.employeeModel.cell = this.formValue.value.cell;
      this.employeeModel.salary = this.formValue.value.salary;
  
      this.api.employeePost(this.employeeModel)
        .subscribe(res => {
          console.log(res);
          alert("Employee Added")
          this.formValue.reset();
          this.getAll();
          
        },
          err => {
            alert("Data Not save")
          }
  
        )
    }


    getAll(){
      this.api.getAllEmployee()
      .subscribe(res => {
        this.employeeData=res;     
        
      })
    }

    deleteEmployee(row:any){
      this.api.deleteEmployee(row.id)
      .subscribe(res => {
        console.log(res);
        alert("Employee Deleted")
        this.formValue.reset();
        this.getAll();
        
      },
        err => {
          alert("Data Not Daved")
        }

      )

    }

    
  onEdite(row: any) {
    this.employeeModel.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['cell'].setValue(row.cell);
    this.formValue.controls['salary'].setValue(row.salary);

  }

  employeeEdit(){

    this.employeeModel.firstName = this.formValue.value.firstName;
    this.employeeModel.lastName = this.formValue.value.lastName;
    this.employeeModel.email = this.formValue.value.email;
    this.employeeModel.cell = this.formValue.value.cell;
    this.employeeModel.salary = this.formValue.value.salary;

    this.api.editEmployee(this.employeeModel.id, this.employeeModel)
    .subscribe(res => {
      console.log(res);
      alert("Employee Updated")
      this.formValue.reset();
      this.getAll();
      
    },
      err => {
        alert("Data Not Update")
      }

    )

  }



}
