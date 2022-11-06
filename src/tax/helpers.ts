import Goods from "../Goods";

export function roundUp (number: number, precision: number): number {
    precision = precision || 0.01;
    return (Math.ceil(number / precision) * precision);
}

export interface ITax {
    calculate(goods: Goods): number;
}