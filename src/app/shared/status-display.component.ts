import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tl-status-display',
  templateUrl: './status-display.component.html',
  styleUrls: ['./status-display.component.css']
})
export class StatusDisplayComponent implements OnInit {
  @Input() status: boolean;
  message: string;

  constructor() { }

  ngOnInit() {
    if (this.status) this.message='Done';
    else this.message='Not Done';
  }

}
