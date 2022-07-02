import { Component, OnInit } from '@angular/core';
import {CartService} from "../../service/cart.service"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private cartService:CartService) { }

  public totalitem:number = 0;
  public searchTerm:string = "";
  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe((res)=>{
      this.totalitem = res.length;
    })
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

}
