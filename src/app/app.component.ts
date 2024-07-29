import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {//組件實作OnInit介面是Angular生命週期鉤子(lifecycle hook) 
  //實作並非繼承 而是須實現該介面的方法
  //初始化組件時會呼叫ngOnInit()方法
  http = inject(HttpClient);//類似C#欄位同樣能使用訪問修飾 並在該類別都能使用 但get set需自行定義
  title = 'client';
  users: any;//等價於JS動態型別可隨意更換型別 如果users:unknown 賦值後必須明確給予型別才可使用否則報錯
  ngOnInit(): void {//初始化時呼叫該方法並且介面規定無傳回值
    this.http.get('https://localhost:7016/api/users').subscribe({//get使用Observable物件封裝的請求能力,並且response會被Observable接收
      //但Observable物件是懶加載 必須訂閱subscribe才會啟動執行 HttpClient返回的是冷Observable 不會長時間存在 
      //但WebSocket、事件流或持續性的計時器 長時間存在或持續發送數據 需要手動取消訂閱來避免內存洩漏
      next:response =>this.users = response,//類似於Promise物件中的then catch finally 但稍有地方不同
      error: error=> console.log(error),
      complete: ()=>console.log('Request has completed')
    })
  }
}
