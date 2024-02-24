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
  styleUrls: ['./medicine.component.css']
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
      quantity: ['', Validators.required],
      unitPrice: ['', Validators.required],
      totalPrice: ['', Validators.required], // Corrected 'totalPrice' control name
      productionDate: ['', Validators.required],
      generic: [null, Validators.required],
      manufacturer: [null, Validators.required]
    });
  }

  calculateTotalPrice(): void {
    const quantityControl = this.medicineForm.get('quantity');
    const unitPriceControl = this.medicineForm.get('unitPrice');
  
    if (quantityControl !== null && unitPriceControl !== null) {
      const quantity = quantityControl.value;
      const unitPrice = unitPriceControl.value;
  
      if (quantity !== null && unitPrice !== null) {
        const totalPrice = quantity * unitPrice;
        this.medicineForm.get('totalPrice')?.setValue(totalPrice); // Corrected 'totalPrice' control name
      }
    }
  }

  private loadGeneric() {
    this.genericService.getAll().subscribe({
      next: (data: any) => {
        this.generic = data;
      },
      error: (error: any) => {
        console.error('Error loading generic data', error);
      }
    });
  }

  private loadManufacturer() {
    this.manufacturerService.getAllManufacturers().subscribe({
      next: (data: any) => {
        this.manufacturer = data;
      },
      error: (error: any) => {
        console.error('Error loading manufacturer data', error);
      }
    });
  }

  private loadMedicines() {
    this.medicineService.getall().subscribe({
      next: (data: any) => {
        this.medicine = data;
      },
      error: (error: any) => {
        console.error('Error loading medicine data', error);
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
        error => console.error('Error creating medicine', error)
      );
    }
  }
}
