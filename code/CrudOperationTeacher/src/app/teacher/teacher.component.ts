import { Component, OnInit } from '@angular/core';
import { TeacherModel } from './teacher.model';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { TeacherService } from '../service/teacher.service';





@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css',
  
})
export class TeacherComponent implements OnInit {

  teacherModel : TeacherModel=new TeacherModel();
  formValue!: FormGroup;
  teacherData: any;
  selectedHobbies: string[] = [];

  onHobbyChange(event: any, hobby: string) {
    if (event.target.checked) {
      // Add the hobby to the selectedHobbies array if it's checked
      this.selectedHobbies.push(hobby);
    } else {
      // Remove the hobby from the selectedHobbies array if it's unchecked
      const index = this.selectedHobbies.indexOf(hobby);
      if (index !== -1) {
        this.selectedHobbies.splice(index, 1);
      }
    }
  }

  isHobbySelected(hobby: string): boolean {
    return this.selectedHobbies.includes(hobby);
  }

  
  constructor(private teacher:TeacherService,private formBuilder:FormBuilder){

    
  }

// This section will need for form formcontrolName
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      department: [''],
      gender: [''],
      hobby:['']
      
    });
  

    this.getAll();
  }

    
  saveTeacher() {

    
    this.teacherModel.name = this.formValue.value.name;
    this.teacherModel.department = this.formValue.value.department;
    this.teacherModel.gender = this.formValue.value.gender;
    this.teacherModel.hobby = this.selectedHobbies;

    this.teacher.teacherPost(this.teacherModel)
      .subscribe(res => {
        console.log(res);
        alert("Teacher Added")
        this.formValue.reset();
        this.getAll();
        
      },
        err => {
          alert("Data Not save")
        }

      )
  }
  getAll(){
    this.teacher.getAllTeacher()
    .subscribe(res => {
      this.teacherData=res;     
      
    })
  }

  deleteTeacher(row:any){
    this.teacher.deleteTeacher(row.id)
    .subscribe(res => {
      console.log(res);
      alert("Teacher Deleted")
      this.formValue.reset();
      this.getAll();
      
    },
      err => {
        alert("Data Not Daved")
      }

    )

  }
  onEdite(row: any) {
    this.teacherModel.id=row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['department'].setValue(row.department);
    this.formValue.controls['gender'].setValue(row.gender);
    this.formValue.controls['hobby'].setValue(row.hobby);
    }


    TeacherEdit(){
    this.teacherModel.name = this.formValue.value.name;
    this.teacherModel.department = this.formValue.value.department;
    this.teacherModel.gender = this.formValue.value.gender;
    this.teacherModel.hobby = this.selectedHobbies;
   
  
      this.teacher.editTeacher(this.teacherModel.id, this.teacherModel)
      .subscribe(res => {
        console.log(res);
        alert("Teacher Updated")
        this.formValue.reset();
        this.getAll();
        
      },
        err => {
          alert("Data Not Update")
        }
  
      )
  
    }

}
