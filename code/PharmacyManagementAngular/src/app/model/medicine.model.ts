
export class Medicine{

    id?: number;
    name?: string;
    quantity?: number;
    unitPrice?: number;
    productionDate?: Date;
    expiryDate?: Date;
        
    generic?: {
    
        id: number;
        name: string;
        description: string
    
    }

    manufacturer?: {
   
        id: number;
        name: string;
        contactPersonName: string;
        contactPersonCellNo: string;
        email: string;
        address: string;
    
    
    }
    

}