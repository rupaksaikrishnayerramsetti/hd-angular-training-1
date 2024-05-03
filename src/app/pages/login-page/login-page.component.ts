import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ValidationService } from '../../Services/Validation/validation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  name: string = '';
  errorMessage: string | null = '';
  hasError: boolean = false;

  constructor(private router: Router, private validateService: ValidationService) {}

  handlechange() {
    this.errorMessage = this.validateService.validateName(this.name);
    this.hasError = !!this.errorMessage;
    console.log(this.errorMessage, this.hasError);
  }

  continue() {
    this.errorMessage = this.validateService.validateName(this.name);
    this.hasError = !!this.errorMessage;
    if (!this.hasError) {
      const username = this.name.toLowerCase();
      localStorage.setItem('name', username);
      this.router.navigate(['/search']);
    }
  }

  cancel() {
    this.name = '';
    this.errorMessage = '';
    this.hasError = false;
  }
}
