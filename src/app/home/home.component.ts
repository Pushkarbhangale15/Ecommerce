import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any = [];
  items: any = [];

  constructor(private api: ApiService) { }
  getProducts(){
    this.api.getProducts().subscribe((data) => {
      this.products = data.products;
      // console.log(typeof this.products);
      // console.log(data); // Add this line
    });
  }
  
  addToCart(product: any) {


    
    this.api.addToCart(product);
  }

  ngOnInit(){
    this.getProducts();

  }
}