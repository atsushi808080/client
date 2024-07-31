import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_service/account.service';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {//組件實作OnInit介面是Angular生命週期鉤子(lifecycle hook) 
  //實作並非繼承 而是須實現該介面的方法
  //初始化組件時會呼叫ngOnInit()方法
  
  private accountService = inject(AccountService);
  
  
  ngOnInit(): void {//初始化時呼叫該方法並且介面規定無傳回值
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
}
