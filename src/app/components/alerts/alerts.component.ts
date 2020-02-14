import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modals/modal.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  alertObj = {
    type: '',
    message: '',
    timeout: 2000
  }

  launchModal: boolean = false;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.launchAlert();
  }

  launchAlert() {
    this.modalService.launchModalAlert.subscribe(alert => {
      if(alert){
        this.alertObj.type = alert.type;
        this.alertObj.message = alert.message;
        this.launchModal = true;
         setTimeout(()=> {
          this.launchModal = false;
         },2000)
      }
    });
  }

}
