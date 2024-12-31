import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  items: any = [];
  constructor(private api: ApiService) { }

  ngOnInit() {
   
    this.getData();
  }
  deleteData(data: any) {
    
    if (confirm('Are you sure you want to remove this product?'))
      this.api.deleteData(data.id).subscribe(
        res => {
          alert('Product removed successfully');
          this.getData();
          
        }

      )
  }
  getData() {
    this.api.getItems().subscribe((res) => {
       console.log(res);
       
      this.items = res;
      
    });
  }
  increaseQuantity(item: any) {
    item.quantity += 1;
    this.api.updateQuantity(item.id, item.quantity).subscribe();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.api.updateQuantity(item.id, item.quantity).subscribe();
    }
  }

}
