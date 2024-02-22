import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SalesService } from '../../service/sales.service';
import { MedicineService } from '../../service/medicine.service';
import { Medicine } from '../../model/medicine.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sales } from '../../model/sales.model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit, OnDestroy {
  salesForm!: FormGroup;
  medicine: Medicine[] = [];
  sales: Sales[] = [];
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private salesService: SalesService,
    private medicineService: MedicineService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.salesForm = this.formBuilder.group({
      quantitySold: ['', Validators.required],
      totalPrice: ['', Validators.required],
      unitPrice: ['', Validators.required],
      saleDate: ['', Validators.required],
      medicine: ['']
    });

    this.loadSalesData();
    this.loadMedicines();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  updateUnitPrice(): void {
    const control = this.salesForm.get('medicine');
    if (control != null) {
      const selectedMedicineId = control.value;
      console.log('Selected Medicine ID:', selectedMedicineId);
      console.log('Medicine Array:', this.medicine);
      const selectedMedicine = this.medicine.find(med => med.id == selectedMedicineId);
      console.log('Selected Medicine:', selectedMedicine);
      if (selectedMedicine) {
        this.salesForm.get('unitPrice')?.setValue(selectedMedicine.unitPrice);
        this.calculateTotalPrice();
      } else {
        console.log('Selected Medicine not found in the array');
      }
    }
  }
  
  
  

  calculateTotalPrice(): void {
    const quantityControl = this.salesForm.get('quantitySold');
    const unitPriceControl = this.salesForm.get('unitPrice');

    if (quantityControl !== null && unitPriceControl !== null) {
      const quantity = quantityControl.value;
      const unitPrice = unitPriceControl.value;

      if (quantity !== null && unitPrice !== null) {
        const totalPrice = quantity * unitPrice;
        this.salesForm.get('totalPrice')?.setValue(totalPrice);
      }
    }
  }

  onSubmit() {
    if (this.salesForm.valid) {
      const salesData: Sales = this.salesForm.value;
      this.salesService.addSale(salesData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          response => {
            console.log('Sale created successfully', response);
            this.loadSalesData(); // Refresh the list of sales after creation
            this.salesForm.reset(); // Reset the form
          },
          error => {
            console.error('Error creating sale', error);
            alert('Error creating sale');
          }
        );
    }
  }

  loadSalesData(): void {
    this.salesService.getAllSales()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.sales = data;
        },
        error => {
          console.error('Error loading sales data', error);
        }
      );
  }

  private loadMedicines() {
    this.medicineService.getall()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.medicine = data;
        },
        error => {
          console.error('Error loading medicines', error);
        }
      );
  }
}
