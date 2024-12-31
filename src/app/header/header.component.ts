import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  cartItemCount: number = 0;
  constructor(private api: ApiService) { }
   ngOnInit(): void {
    this.api.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });

    // Initialize the cart item count
    this.api.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }
  
}
