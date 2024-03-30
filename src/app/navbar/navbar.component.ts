import { Component } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logout() {
  this.appState.authState = {}
  this.router.navigateByUrl('/login')

  }
  login() {
  this.router.navigateByUrl('/login')

  }
  actions : Array<any> = [
    {title: "Home", "route":"/admin/home", icon :"house"},
    {title: "Products", "route":"/admin/products", icon :"arrow-down-up"},
    {title: "New Product", "route":"/admin/newProduct", icon :"plus-circle"}
  ];

  currentAction:any;


  constructor(public appState: AppStateService,
              public loadingService : LoadingService,
              public router : Router) {

  }

  setCurrentAction(action: any[]) {
    this.currentAction = action;
  }
}
