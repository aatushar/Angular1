import { Medicine } from "./medicine.model";


export class Product{

    id?: number;
    name?: string;
    quantity?: number;
    unitPrice?: number;
    totalPrice?: number;
    productionDate?: Date;
    expireDate?: Date;
    medicine?: Medicine;

}