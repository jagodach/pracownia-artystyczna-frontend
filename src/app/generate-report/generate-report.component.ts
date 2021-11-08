import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportGroupParticipantsComponent } from '../report-group-participants/report-group-participants.component';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent implements OnInit {
  ACHIEVMENT_REPORT_STRING: string = '10 uczestników z największą liczą osiagnięć';
  GROUP_REPORT_STRING: string = 'Lista uczestników grupy';
  PARTICIPANT_REPORT_STRING: string = 'Raport dotyczący uczestnika (osiągnięcia i obecności)';

  groupReport: boolean;
  participantReport: boolean;
  achievmentReport: boolean;
  reportType: string;

  constructor(private router: Router) { 
    this.groupReport = true;
    this.participantReport = false;
    this.achievmentReport = false;
    this.reportType = '';
  }

  ngOnInit(): void {}

  public optionSelected() {
    console.log(this.reportType);
  }



}
