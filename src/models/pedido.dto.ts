import { ItemPedidoDTO } from './item-pedido.dto';
import { RefDTO } from "./ref.dto";
import { PagamentoDTO } from "./pagemento.dto";

export interface PedidoDTO {
    cliente : RefDTO;
    enderecoDeEntrega: RefDTO;
    pagamento: PagamentoDTO;
    items : ItemPedidoDTO[];
}