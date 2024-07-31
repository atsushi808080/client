import {
  Component,
  EventEmitter,
  inject,
  input,
  output,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_service/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  userFromHomeComponent = input.required<any>(); //接收父組件用
  //@Output() cancelRegister = new EventEmitter();//輸出屬性 創建事件發射器
  cancelRegister = output<boolean>(); //輸出函數
  model: any = {};

  register() {
    this.accountService.register(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
      },
      error: (error) => this.toastr.error("註冊失敗")
      // error: (error) => this.toastr.error(error.error)
    });
  }

  cancel() {
    this.cancelRegister.emit(false); //子組件發射器
  }
}
