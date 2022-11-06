import Receipt from "./Receipt";
import { ShoppedItems, ShoppingItem } from "./Shopping";
import { roundUp } from "./tax/helpers";
import TaxManager from "./tax/TaxManager";

export default class ReceiptGenerator {
    private taxManager: TaxManager;

    constructor(taxManager: TaxManager) {
        this.taxManager = taxManager;
    }

    /**
     * Generate a receipt for the shopping cart
     */
    generate(cart: ShoppedItems): Receipt {
        return cart.getShoppedItems().reduce((receipt: Receipt, item: ShoppingItem) => {
            let goods = item.getGoods();
            let tax = this.taxManager.calculate(goods);
            let quantity = item.getQuantity();
            return receipt.addEntry({
                goods,
                tax,
                quantity
            })
        }, new Receipt());
    }

    /**
     * Render the generated receipt in the given format
     */
    render(receipt: Receipt): Array<string> {
        let result = [];
        let totalTax = 0;
        let totalAmount = 0;

        receipt.getEntries().forEach((entry) => {
            result.push(
                entry.quantity + ' ' +
                (entry.goods.isImported() ? 'imported' : '') +
                entry.goods.getName() + ': ' +
                entry.price?.toFixed(2)
            );
            totalTax += entry.tax * entry.quantity;
            if (entry.price) {
                totalAmount += entry.price 
            }
    });
    result.push('Sales Taxes: ' + roundUp(totalTax, 0.01).toFixed(2));
    result.push('Total: ' + roundUp(totalAmount, 0.01).toFixed(2));

    return result;
    }
}