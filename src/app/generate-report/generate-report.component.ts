import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportGroupParticipantsComponent } from '../report-group-participants/report-group-participants.component';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent implements OnInit {
  reportType: string;

  constructor(private router: Router) { 
    this.reportType = '';
  }

  ngOnInit(): void {}

  public chooseReport(type: string){
    this.reportType = type;
  }
}
