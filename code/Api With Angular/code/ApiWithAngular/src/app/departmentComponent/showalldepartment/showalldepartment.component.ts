import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../service/department.service';
import { DepartmentModel } from '../../model/department.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-showalldepartment',
  templateUrl: './showalldepartment.component.html',
  styleUrl: './showalldepartment.component.css'
})
export class ShowalldepartmentComponent implements OnInit{
 
  departmentModel:DepartmentModel=new DepartmentModel();

  departmentData:any;
  formValue !: FormGroup;


constructor(private depService:DepartmentService, private formBuilder:FormBuilder){}

  ngOnInit(): void {

    this.formValue=this.formBuilder.group(
      {
        dname:['']
      }
    );


    this.getAllDep();
  }


getAllDep(){
  this.depService.getAllDep()
  .subscribe(
    res=>{
      this.departmentData=res
    }
  )
}

saveDep(){
  this.departmentModel.dname=this.formValue.value.dname;
  this.depService.saveDep(this.departmentModel)
  .subscribe(res=>{
    this.formValue.reset();
    this.getAllDep();
  },
  err=>{
    alert("Data Not Save")
  }
    
  )
}

}
