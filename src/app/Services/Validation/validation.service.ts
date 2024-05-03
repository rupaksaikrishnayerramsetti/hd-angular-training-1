import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validateName(name: string): string | null {
    if (name.length < 3) {
      return "Input data should be greater than 3 characters";
    } else if (name.length > 32) {
      return "Input data should be less than 33 characters";
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      return "Invalid input which contains numbers or special characters";
    }
    return null;
  }
}
