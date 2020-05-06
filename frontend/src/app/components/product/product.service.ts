import { Atributo } from './atributo.model';
import { Tabela } from './tabela.model';
import { Transacao } from './transacao.model';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3001/products';
  urlMonitorarTransacoes = "http://127.0.0.1:8000/transacoes/";

  transacao: Transacao;
  tabelas: Tabela[];
  atributos: Atributo[];

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  postTransacao(product:Product) : Observable<Transacao> {
    this.atributos = 
    [
      {
        CampoAlterado: "name",
        ValorInicial: "",
        ValorFinal: product.name 
      },
      {
        CampoAlterado: "price",
        ValorInicial: "",
        ValorFinal: product.price.toString()
      },
    ];
    this.tabelas = 
    [
      {
        Nome: "product",
        Esquema: "xxx",
        Atributos: this.atributos
      }
    ];
    this.transacao = {
      TipoAlteracao: "INSERT",
      UsuarioId: 2,
      Ip: "12450400",
      Guid: "a965b2c0-8f36-11ea-a65a-34238774efe4",
      Tabelas: this.tabelas
    };
    var data = {
      "TipoAlteracao": "INSERT",
      "UsuarioId": "24",
      "Ip": "127845778",
      "Guid": "a965b2c0-8f36-11ea-a65a-34238774efe4",
      "Tabelas": [
      {
        "Nome": "Product",
        "Esquema": "xxx",
        "Atributos": [
          {
            "CampoAlterado": "name",
            "ValorInicial": "",
            "ValorFinal": product.name 
          },
          {
            "CampoAlterado": "price",
            "ValorInicial": "",
            "ValorFinal": product.price.toString()
          }
        ]
      }]
    };
    console.log(this.http);
    return this.http.post<Transacao>(this.urlMonitorarTransacoes, data).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  create(product: Product) : Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  } 

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  update(product : Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any) : Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }
  
}
