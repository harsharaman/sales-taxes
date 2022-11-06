import Goods from "../Goods";
import { ITax } from "./helpers";

export default class TaxManager {
    /**
     * All taxes that must be applied
     */
    private allTaxes: ITax[] = [];

    /**
     * Calculate the total tax applicable to an item
     */
    calculate(goods: Goods): number {
        return this.allTaxes.reduce((totalAmount: number, tax: ITax) => {
            return totalAmount + tax.calculate(goods);
        }, 0);
    }

    /**
     * Add the relevant tax to the item
     */
    addTax(tax: ITax): this {
        this.allTaxes.push(tax);
        return this;
    }
}