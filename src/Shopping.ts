import Goods from "./Goods"

export class ShoppingItem {
    /**
     * Individual shopped item with quantity
     */
    private goods: Goods;
    private quantity: number;

    constructor(goods: Goods, quantity: number) {
        this.goods = goods;
        this.quantity = quantity;
    }

    /**
     * Getters
     */
    getGoods(): Goods {
        return this.goods;
    }

    getQuantity(): number {
        return this.quantity;
    }
}

export class ShoppedItems {
    private items: ShoppingItem[] = [];

    /**
     * Shop many of the same product
     */
    add(goods: Goods, quantity: number): this {
        quantity = quantity || 1;
        this.items.push(new ShoppingItem(goods, quantity));
        return this;
    }

    /**
     * Get shopped items
     */
    getShoppedItems(): ShoppingItem[] {
        return this.items;
    }
}