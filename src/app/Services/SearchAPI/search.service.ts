import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://universities.hipolabs.com/search';

  constructor(private http: HttpClient) {}

  searchUniversities(country: string) {
    return this.http.get(`${this.apiUrl}?country=${country}`);
  }
}
