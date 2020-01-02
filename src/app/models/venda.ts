import { Produto } from './produto';

export interface Venda {
    id: string,
    codigoVenda : number,
    pedidos? : [Produto, number, number][],
    dataVenda : Date,
    dataEntrega : Date,
    precoTotal : number
}
