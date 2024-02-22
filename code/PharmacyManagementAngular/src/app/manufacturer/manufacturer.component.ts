import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Manufacturer } from '../model/manufacturer.model';
import { ManufacturerService } from '../service/manufacturer.service';


@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {

  manufacturers: Manufacturer[] = [];
  selectedManufacturer?: Manufacturer;
  isEditing = false;
  manufacturerForm!: FormGroup;

  constructor(
    private manufacturerService: ManufacturerService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadManufacturers();
    this.initManufacturerForm();
  }

  private initManufacturerForm() {
    this.manufacturerForm = this.formBuilder.group({
      name: ['', Validators.required],
      contactPersonName: ['', Validators.required],
      contactPersonCellNo: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  loadManufacturers(): void {
    this.manufacturerService.getAllManufacturers().subscribe({
      next: (data: any) => {
        this.manufacturers = data;
      },
      error: (error: any) => {
        console.error('Error loading manufacturers', error);
      }
    });
  }

  onSelect(manufacturer: Manufacturer): void {
    this.selectedManufacturer = manufacturer;
    this.isEditing = true;
  }

  addManufacturer(): void {
    this.selectedManufacturer = {};
    this.isEditing = true;
  }

  saveManufacturer(): void {
    if (this.manufacturerForm.valid) {
      const manufacturerData: Manufacturer = this.manufacturerForm.value;
      if (this.selectedManufacturer && this.selectedManufacturer.id) {
        manufacturerData.id = this.selectedManufacturer.id;
        this.manufacturerService.updateManufacturer(manufacturerData).subscribe(() => {
          this.isEditing = false;
          this.loadManufacturers();
        });
      } else {
        this.manufacturerService.createManufacturer(manufacturerData).subscribe(() => {
          this.isEditing = false;
          this.loadManufacturers();
        });
      }
    }
  }

  deleteManufacturer(id: number): void {
    if (confirm('Are you sure you want to delete this manufacturer?')) {
      this.manufacturerService.deleteManufacturer(id).subscribe(() => {
        this.loadManufacturers();
      });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.manufacturerForm.reset();
  }

  clearForm(): void {
    this.manufacturerForm.reset();
  }
}
