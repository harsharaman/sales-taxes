import Goods from "../src/Goods";
import ReceiptGenerator from "../src/ReceiptGenerator";
import { ShoppedItems } from "../src/Shopping";
import BasicSalesTax from "../src/tax/BasicSalesTax";
import ImportDuty from "../src/tax/ImportDuty";
import TaxManager from "../src/tax/TaxManager";

test("Scenario #1", () => {
    let cart = new ShoppedItems()
        .add(new Goods({ name: "book", price: 12.49, type: Goods.EXCLUSIONTYPES.BOOKS}))
        .add(new Goods({ name: "music CD", price: 14.99, type: Goods.EXCLUSIONTYPES.OTHER}))
        .add(new Goods({ name: "chocolate bar", price: 0.85, type: Goods.EXCLUSIONTYPES.FOOD}));

    let tax = new TaxManager()
        .addTax(new BasicSalesTax())
        .addTax(new ImportDuty());

    let receiptGenerator = new ReceiptGenerator(tax);
    let receipt = receiptGenerator.generate(cart);
    let output = receiptGenerator.render(receipt);

    expect(output).toEqual([
        '1 book: 12.49',
        '1 music CD: 16.49',
        '1 chocolate bar: 0.85',
        'Sales Taxes: 1.50',
        'Total: 29.84'
    ])
});

test("Scenario #2", () => {
    let cart = new ShoppedItems()
        .add(new Goods({ name: "box of chocolates", price: 10.00, type: Goods.EXCLUSIONTYPES.FOOD, imported: true}))
        .add(new Goods({ name: "bottle of perfume", price: 47.50, type: Goods.EXCLUSIONTYPES.OTHER, imported: true}));

    let tax = new TaxManager()
        .addTax(new BasicSalesTax())
        .addTax(new ImportDuty());

    let receiptGenerator = new ReceiptGenerator(tax);
    let receipt = receiptGenerator.generate(cart);
    let output = receiptGenerator.render(receipt);

    expect(output).toEqual([
        '1 imported box of chocolates: 10.50',
        '1 imported bottle of perfume: 54.65',
        'Sales Taxes: 7.65',
        'Total: 65.15'
    ])
});

test("Scenario #3", () => {
    let cart = new ShoppedItems()
        .add(new Goods({ name: "bottle of perfume", price: 27.99, imported: true }))
        .add(new Goods({ name: "bottle of perfume", price: 18.99}))
        .add(new Goods({ name: "packet of headache pills", price: 9.75, type: Goods.EXCLUSIONTYPES.MEDICAL}))
        .add(new Goods({ name: "box of chocolates", price: 11.25, type: Goods.EXCLUSIONTYPES.FOOD, imported: true}));

    let tax = new TaxManager()
        .addTax(new BasicSalesTax())
        .addTax(new ImportDuty());

    let receiptGenerator = new ReceiptGenerator(tax);
    let receipt = receiptGenerator.generate(cart);
    let output = receiptGenerator.render(receipt);

    expect(output).toEqual([
        '1 imported bottle of perfume: 32.19',
        '1 bottle of perfume: 20.89',
        '1 packet of headache pills: 9.75',
        '1 imported box of chocolates: 11.85',
        'Sales Taxes: 6.71',
        'Total: 74.68'
    ]);
});