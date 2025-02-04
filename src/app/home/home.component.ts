import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  http = inject(HttpClient);//類似C#欄位同樣能使用訪問修飾 並在該類別都能使用 但get set需自行定義
  registerMode = false;
  users: any;//等價於JS動態型別可隨意更換型別 如果users:unknown 賦值後必須明確給予型別才可使用否則報錯

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle(){
    this.registerMode = !this.registerMode
  }

  cancelRegisterMode(event:boolean){
    this.registerMode = event;
  }

  getUsers(){
    this.http.get('https://localhost:7016/api/users').subscribe({//get使用Observable物件封裝的請求能力,並且response會被Observable接收
      //但Observable物件是懶加載 必須訂閱subscribe才會啟動執行 HttpClient返回的是冷Observable 不會長時間存在 
      //但WebSocket、事件流或持續性的計時器 長時間存在或持續發送數據 需要手動取消訂閱來避免內存洩漏
      next:response =>this.users = response,//類似於Promise物件中的then catch finally 但稍有地方不同
      error: error=> console.log(error),
      complete: ()=>console.log('Request has completed')
    })
  }
}
