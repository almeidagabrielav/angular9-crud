import { Atributo } from './atributo.model';
export interface Tabela {
    Id?: number
    Nome: string
    Esquema: string 
    Atributos: Atributo[]
}