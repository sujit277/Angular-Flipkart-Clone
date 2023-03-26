import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() products: any;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  /* Method for Removing Specific Cart Items */
  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
}
