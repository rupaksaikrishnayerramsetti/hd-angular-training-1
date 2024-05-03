import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SearchService } from '../../Services/SearchAPI/search.service';

@Component({
  selector: 'app-university-table',
  templateUrl: './university-table.component.html',
  styleUrls: ['./university-table.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule]
})
export class UniversityTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'state-province', 'domains'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private searchService: SearchService) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.searchUniversities();
  }

  searchUniversities() {
    this.searchService.searchUniversities('India').subscribe((data: any) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }
}