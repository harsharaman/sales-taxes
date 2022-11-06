import Goods from "../Goods";
import { ITax, roundUp } from "./helpers";

export default class ImportDuty implements ITax {
    calculate(goods: Goods): number {
        if (goods.isImported()) {
            return roundUp(goods.getPrice() * 0.05, 0.05);
        }
        return 0
    }  
} 