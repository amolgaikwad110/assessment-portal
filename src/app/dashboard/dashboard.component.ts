import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// import { allData } from './chartsData';
// import { gridData } from './gridData';
import * as XLSX from 'xlsx';
import { AssessmentService } from '../assessment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  //Graph params

  // Graph Data
  allData: any[] = [];

  data: any[] = [];

  // Graph data wrt technology
  technologiesData: any[] = [];

  // gridData
  gridData = []

  view: any = [800, 490];
  schemeType: string = 'ordinal'; //ordinal or linear
  gradient: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  legendTitle: string = '';
  legendTitleMulti: string = 'Stage';
  legendPosition: string = 'right'; //right or below
  legend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Stage';
  yAxisLabel: string = 'Profile Count';
  animations: boolean = true;
  showGridLines: boolean = false;
  showDataLabel: boolean = true; //number on bars
  barPadding: number = 10;
  tooltipDisabled: boolean = false;
  roundEdges: boolean = false;
  isDisplayBarChart: boolean = true;
  isDisplayCombinedBarChart: boolean = false;
  selectedItem: string = '';

  //Material table params
  displayedColumns = ['id', 'fullName', 'enterpriseId', 'stage', 'technology'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  //export file name
  exportGridFileName: string = '';
  exportGraphFileName: string = '';

  constructor(private service: AssessmentService) { }

  ngOnInit(): void {

    // get graphData
    this.service.getGraphData().subscribe((res: any) => {
      this.allData = res;

      var graphdata = this.allData.filter((arrayItem) => {
        if (arrayItem.name == 'Angular') {
          return arrayItem.series;
        }
        return;
      });

      this.data = graphdata[0].series;


      this.legendTitle = 'Angular';
      this.selectedItem = 'Angular';

    });

    // get employeeData
    this.service.getEmployees().subscribe((res: any) => {
      this.gridData = res;

      var grid = this.gridData.filter((item: any) => {
        if (item.technology == 'Angular') {
          return item;
        }
        return;
      });


      this.dataSource = new MatTableDataSource(grid);
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
  }

  clickMenu(id: any): void {
    // if (id !== 'allData') {
    var graphdata = this.allData.filter((arrayItem) => {
      if (arrayItem.name == id) {
        return arrayItem.series;
      }
      return;
    });
    this.data = graphdata[0].series;
    this.legendTitle = id;
    this.isDisplayBarChart = true;
    this.isDisplayCombinedBarChart = false;
    this.selectedItem = id;

    var grid = this.gridData.filter((item: any) => {
      if (item.technology == id) {
        return item;
      }
      return;
    });

    this.dataSource = new MatTableDataSource(grid);
    // } else {
    //   this.legendTitle = 'Technologies';
    //   this.isDisplayBarChart = false;
    //   this.isDisplayCombinedBarChart = true;
    //   this.xAxisLabel = 'Technologies';
    //   this.selectedItem = 'allData';

    //   this.dataSource = new MatTableDataSource(this.gridData);
    // }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportGridInXlsx() {
    let element = document.getElementById('profiles-table');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    this.exportGridFileName = this.selectedItem + '_profiles.xlsx';
    XLSX.writeFile(wb, this.exportGridFileName);
  }

  exportCompleteGridInXlsx() {
    let element = document.getElementById('profiles-table');

    var grid = this.gridData.filter((item: any) => {
      if (item.technology == this.selectedItem) {
        return item;
      }
      return;
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(grid);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    this.exportGridFileName = this.selectedItem + '_all_profiles.xlsx';
    XLSX.writeFile(wb, this.exportGridFileName);
  }
}
