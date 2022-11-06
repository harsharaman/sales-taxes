import Goods from "../Goods";

export function roundUp (number: number, precision: number): number {
    return (Math.ceil(number / precision) * precision);
}

export interface ITax {
    calculate(goods: Goods): number;
}