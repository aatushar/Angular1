import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../model/invoice.model';
import { InvoiceService } from '../../service/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {
  formData: Invoice = {
    customerName: '',
    invoiceNumber: '',
    orderNumber: '',
    invoiceDate: new Date(),
    terms: '',
    dueDate: new Date(),
    salesPerson: ''
  };

  constructor(private invoiceService: InvoiceService) {}
  // ngOnInit(): void {
  //   this.calculateDueDate();
  // }

  onSubmit(): void {
    this.invoiceService.createInvoice(this.formData)
      .subscribe(() => {
        console.log('Invoice created successfully');
        // Optionally, navigate to another route or show a success message
      }, error => {
        console.error('Error creating invoice:', error);
        // Optionally, display an error message to the user
      });
  }


  calculateDueDate(): void {
    const currentDate = new Date();
    const terms = this.formData.terms;
    const dueDateField = this.formData.dueDate;

    if (terms === 'Net10') {
      currentDate.setDate(currentDate.getDate() - 10); // Subtract 10 days
    } else if (terms === 'Net15') {
      currentDate.setDate(currentDate.getDate() - 15); // Subtract 15 days
    } else if (terms === 'Net30') {
      currentDate.setDate(currentDate.getDate() - 30); // Subtract 30 days
    } else if (terms === 'Net45') {
      currentDate.setDate(currentDate.getDate() - 45); // Subtract 45 days
    } else if (terms === 'Net60') {
      currentDate.setDate(currentDate.getDate() - 60); // Subtract 60 days
    } else if (terms === 'DueOnReceipt') {
      // Due on Receipt, set the due date to the current date
    }

    // Set the calculated due date to the due date field
    this.formData.dueDate = currentDate;
  }

}
