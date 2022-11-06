import Goods from "../Goods";
import { ITax, roundUp } from "./helpers";

export default class BasicSalesTax implements ITax {
    static TAXEXCLUDUEDTYPES = [
        Goods.EXCLUSIONTYPES.BOOKS,
        Goods.EXCLUSIONTYPES.FOOD,
        Goods.EXCLUSIONTYPES.MEDICAL,
    ];

    calculate(goods: Goods): number { 
        if (BasicSalesTax.TAXEXCLUDUEDTYPES.indexOf(goods.getType()) !== -1) {
            return 0.0;
        }

        return roundUp(goods.getPrice() * 0.10, 0.05);
    }
}