interface IGoods {
    name: string;
    price: number;
    type?: EType;
    imported?: boolean;
}

enum EType {
    BOOKS,
    FOOD,
    MEDICAL,
    OTHER
}

export default class Goods {
    /**
     * To describe the sold goods
     */
    private name: string;
    private price: number;
    private type: EType;
    private imported: boolean;

    constructor ({name, price, type, imported}: IGoods) {
        this.name = name;
        this.price = price;
        this.type = type || EType.OTHER; // Assumption: If the type of goods is not specified it is considered of type Other.
        this.imported = imported || false; // Assumption: goods are normally not imported
    }

    /**
     * Getters
     */
    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getType(): EType {
        return this.type;
    }

    isImported(): boolean {
        return this.imported;
    }  
}