import {DepartmentModel} from "./department.model";

export class Employee {
    id?: number;
    name?: string;
    email?: string;
    gender?: string;
    dob?: Date;
    image?: string;
    department?: {
        id: number;
        dname: string;
    };
}