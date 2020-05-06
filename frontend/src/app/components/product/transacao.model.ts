import { Tabela } from './tabela.model';
export interface Transacao {
    Id?: number
    TipoAlteracao: string
    UsuarioId: number
    Ip: string
    Guid: string 
    Tabelas: Tabela[]
}
