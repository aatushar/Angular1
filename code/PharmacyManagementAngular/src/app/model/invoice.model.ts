export interface Invoice {
    id?: number;
    customerName: string;
    invoiceNumber: string;
    orderNumber: string;
    invoiceDate: Date;
    terms: string;
    dueDate: Date;
    salesPerson: string;
  }
  