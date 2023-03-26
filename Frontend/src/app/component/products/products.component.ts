import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private api: ApiService, private cartService: CartService) {}

  productList: any;
  priceProductList: any;
  public searchKey = '';
  public filterCategory: any;
  high!: string;
  low!: string;
  star!: string;

  ngOnInit(): void {
    this.api.getProduct().subscribe((data) => {
      this.productList = data;
      this.filterCategory = data;
      this.productList.forEach((element: any) => {
        if (
          element.category === "women's clothing" ||
          element.category == "men's clothing"
        ) {
          element.category = 'fashion';
        }
      });
    });
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  addToCart(item: any) {
    this.cartService.addtoCart(item);
  }

  filter(category: string) {
    this.filterCategory = this.productList.filter((element: any) => {
      if (element.category == category || category == '') {
        return element;
      }
    });
  }

  //Method for filtering Products by Price
  filterByPrice() {
    this.api.getProduct().subscribe((data) => {
      this.productList = data;
      this.priceProductList = this.productList.filter((element: any) => {
        if (element.price <= this.high && element.price >= this.low) {
          return element;
        }
      });
      this.filterCategory = this.priceProductList;
    });
  }

  //Method for filtering Products by Star rating
  filterStar() {
    this.api.getProduct().subscribe((data) => {
      this.productList = data;
      this.priceProductList = this.productList.filter((element: any) => {
        if (element.rating >= this.star) {
          return element;
        }
      });
      this.filterCategory = this.priceProductList;
    });
  }

  resetProducts() {
    this.api.getProduct().subscribe((data) => {
      this.productList = data;
      this.filterCategory = data;
      this.productList.forEach((element: any) => {
        if (
          element.category === "women's clothing" ||
          element.category == "men's clothing"
        ) {
          element.category = 'fashion';
        }
      });
    });
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }
}
