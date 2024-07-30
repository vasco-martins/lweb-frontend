import { LiveAnnouncer } from '@angular/cdk/a11y';
import { D } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import { MatSortModule, Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

interface ServerResponse {
  servers: any[];
  pagination: {
    page: number;
    total: number;
  };
}

@Component({
  selector: 'app-servers-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlider,
    MatCardModule,
    MatFormFieldModule,
    MatLabel,
    MatSliderModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './servers-list.component.html',
  styleUrl: './servers-list.component.css',
})
export class ServersListComponent {
  response: any;
  servers: any = new MatTableDataSource<any>();
  pagination: any = [];
  currentPage: number = 1;
  totalLength: number = 0;
  search: string = '';
  hddType: number = 0;
  gridSize: string = '0';
  displayedColumns: string[] = ['model', 'ram', 'hdd', 'location', 'price'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSlider) slider!: MatSlider;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.getServers();
  }

  formatLabel(value: number): string {
    const values = [
      '0',
      '250GB',
      '500GB',
      '1TB',
      '2TB',
      '4TB',
      '8TB',
      '12TB',
      '24TB',
      '48TB',
      '72TB',
    ];

    return values[value - 1];
  }

  getServers() {
    const SERVER_URL = 'http://servers.test/';

    this.http
      .get<ServerResponse>(SERVER_URL, {
        params: {
          page: this.paginator.pageIndex,
          search: this.search,
          hddType: this.hddType,
          storage: this.formatLabel(parseInt(this.gridSize)),
        },
      })
      .subscribe(
        (response) => {
          this.response = response;
          this.servers = new MatTableDataSource<any>(this.response.servers);
          this.pagination = this.response.pagination;

          this.servers.pagination = this.response.pagination.page;
          this.totalLength = this.response.pagination.total;
        },
        (error) => {
          console.error('Error fetching servers:', error);
        }
      );
  }
}
