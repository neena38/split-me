export class FoodItem {
    name: string;
    price: number;
    participants:number[]; 
    constructor(name: string, price: number,participants:number[]){
        this.name = name;
        this.price = price;
        this.participants = participants
    }
    
}
