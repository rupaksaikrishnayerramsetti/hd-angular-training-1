import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../Services/SearchAPI/search.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  username: string | null | undefined;
  countries = ['India', 'France', 'Canada', 'Australia', 'Germany', 'Japan', 'Chile'];
  selectedCountry: string = this.countries[0];
  universities: any[] = [];
  otherCountry: string = ''; //Brazil, Ukraine, China, United Kingdom, United States
  searchCount!: number;
  currentPage: number = 1;
  itemsPerPage: number = 20;
  displayedColumns: string[] = ['name', 'state-province', 'domains'];
  loading: boolean = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private searchService: SearchService 
  ) {
    if(this.checkForLocalStorage() && localStorage.getItem('searchCount')){
      this.searchCount = parseInt(localStorage.getItem('searchCount') || '0', 10)
    }
  }

  ngOnInit() {
    this.username = this.getUsernameFromLocalStorage();
    if (!this.username) {
      this.router.navigate(['/login']);
    }
    this.username = this.username?.toUpperCase();
    // this.searchCount = this.getSearchCount();
    this.searchUniversities();
  }

  getUsernameFromLocalStorage(): string | null {
    if (this.checkForLocalStorage()) {
      return localStorage.getItem('name');
    }
    return null;
  }

  checkForLocalStorage(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  logout() {
    if (this.checkForLocalStorage()) {
      localStorage.removeItem('name');
      localStorage.removeItem('searchCount')
    }
    this.router.navigate(['/login']);
  }

  handleSearch() {
    this.searchUniversities();
    this.updateSearchCount();
  }

  searchUniversities() {
    this.loading = true;
    const country = this.otherCountry ? this.otherCountry : this.selectedCountry;
    this.searchService.searchUniversities(country).subscribe(
      (data: any) => {
        this.universities = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error searching universities:', error);
        this.loading = false;
      }
    );
    this.otherCountry = "";
  }  

  getSearchCount(): number {
    if (this.checkForLocalStorage()) {
      const count = localStorage.getItem('searchCount')
      return parseInt(count ? count : '0', 10);
    }
    return 0;
  }

  updateSearchCount() {
    if (this.checkForLocalStorage()) {
      this.searchCount = this.getSearchCount() + 1;
      localStorage.setItem('searchCount', this.searchCount.toString());
    }
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
  }

  getPaginatedUniversities(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.universities.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
