import { Transacao } from './../transacao.model';
import { Atributo } from './../atributo.model';
import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  };

  transacao: Transacao;

  constructor(private productService: ProductService, private  router: Router) { }

  ngOnInit(): void {
  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado!')
      this.router.navigate(['/products'])
    })    
  }

  postTransacao(): void {
    this.productService.postTransacao(this.product).subscribe(
      (transacao: Transacao) => this.transacao = transacao
    );
    console.log(this.transacao);
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }  

}
