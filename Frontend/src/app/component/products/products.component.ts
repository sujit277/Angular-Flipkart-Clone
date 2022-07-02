import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ApiService } from "../../service/api.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private api: ApiService, private cartService: CartService) { }


  productList: any;
  priceProductList: any;
  public searchKey: string = "";
  public filterCategory: any;
  high!:string;
  low!:string;
  star!:string;
  ngOnInit(): void {
    this.api.getProduct().
      subscribe(res => {
        this.productList = res;
        this.filterCategory = res
        this.productList.forEach((a: any) => {
          if (a.category === "women's clothing" || a.category == "men's clothing") {
            a.category = "fashion";
          }
        })
      })
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }

  addToCart(item: any) {
    this.cartService.addtoCart(item);
  }

  filter(category: string) {
    this.filterCategory = this.productList
      .filter((a: any) => {
        if (a.category == category || category == '') {
          return a;
        }
      })
  }

  filterByPrice() {
    this.api.getProduct().
      subscribe(res => {
        this.productList = res;
        this.priceProductList = this.productList.filter((a: any) => {
          if (a.price <= this.high && a.price >= this.low) {
            return a;
          }
        })
        console.log(this.productList);;
        this.filterCategory = this.priceProductList
      })
  }

  filterStar(){
    this.api.getProduct().
      subscribe(res => {
        this.productList = res;
        this.priceProductList = this.productList.filter((a: any) => {
          if (a.rating >= this.star) {
            return a;
          }
        })
        console.log(this.productList);;
        this.filterCategory = this.priceProductList
      })
  }
}
