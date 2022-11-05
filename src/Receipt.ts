import Goods from "./Goods";

interface IReceipt {
    goods: Goods;
    tax: number;
    quantity: number;
    price?: number;
}

export default class Receipt {
    private receiptEntries: IReceipt[] = [];

    /**
     * Getters
     */
    getEntries(): IReceipt[] { return this.receiptEntries; }

    /**
     * Add receipt entry
     * The function must calculate total price and return
     * an entry to the receipt
     */
    addEntry(entry: IReceipt): this {
        entry.price = this.calculateGrandTotal(entry);
        this.receiptEntries.push(entry);
        return this;
    }

    calculateGrandTotal(entry: IReceipt): number {
        return (entry.goods.getPrice() + entry.tax) * entry.quantity;
    }
}