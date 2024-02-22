import { Component, OnInit } from '@angular/core';
import { Medicine } from '../../model/medicine.model';
import { Generic } from '../../model/generic.model';
import { Manufacturer } from '../../model/manufacturer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicineService } from '../../service/medicine.service';
import { GenericService } from '../../service/generic.service';
import { ManufacturerService } from '../../service/manufacturer.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrl: './medicine.component.css'
})
export class MedicineComponent implements OnInit {

  medicine: Medicine[] = [];
  generic: Generic[] = [];
  manufacturer: Manufacturer[] = [];

  medicineForm!: FormGroup;


  constructor(
    private medicineService: MedicineService,
    private genericService: GenericService,
    private manufacturerService: ManufacturerService,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    
    this.loadGeneric();
    this.loadManufacturer();
    this.loadMedicines();

    this.initMedicineForm();
  }

  private initMedicineForm() {
    this.medicineForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity:['', Validators.required],
      unitPrice:['', Validators.required],
      productionDate:['', Validators.required],
      expiryDate:['', Validators.required],
      generic: [null, Validators.required],
      manufacturer: [null, Validators.required] // Assuming you have a department dropdown
    });
  }


  private loadGeneric() {
    this.genericService.getAll().subscribe({
      next: (data: any) => {
        this.generic = data;
        console.log(this.generic)
      },
      error: (error: any) => {
        console.error('not found', error);
      }
    });
  }


  private loadManufacturer() {
    this.manufacturerService.getAllManufacturers().subscribe({
      next: (data: any) => {
        this.manufacturer = data;
      },
      error: (error: any) => {
        console.error('not found', error);
      }
    });
  }


  private loadMedicines(){
    this.medicineService.getall().subscribe({
      next: (data: any) => {
        this.medicine = data;
      },
      error: (error: any) => {
        console.error('not found', error);
      }
    });

  }


  onSubmit() {
    if (this.medicineForm.valid) {
      const medicineData: Medicine = this.medicineForm.value;
      this.medicineService.createMedicine(medicineData).subscribe(
        response => {
          console.log('Medicine created successfully', response);
          this.loadMedicines(); // Refresh the list of medicines after creation
          this.medicineForm.reset(); // Reset the form
        },
        error => alert('Error creating medicine')
      );
    }
  }



}
