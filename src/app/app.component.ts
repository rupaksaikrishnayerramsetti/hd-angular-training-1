import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from './Services/SearchAPI/search.service';
import { ValidationService } from './Services/Validation/validation.service';
import { AuthGuardService } from './Services/AuthGuard/auth-guard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppRoutingModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [SearchService, ValidationService, AuthGuardService]
})
export class AppComponent {
  title = 'hd-angular-training-1';
}
