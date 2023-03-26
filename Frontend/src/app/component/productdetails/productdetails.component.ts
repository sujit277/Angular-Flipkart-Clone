import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent implements OnInit {
  productId: any;
  productData: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.api.getProductById(this.productId).subscribe((data: any) => {
      this.productData = data;
    });
  }

  addToCart(item: any) {
    this.cartService.addtoCart(item);
  }
}
