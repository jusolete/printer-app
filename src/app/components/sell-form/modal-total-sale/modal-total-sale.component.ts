import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal/';

@Component({
  selector: 'app-modal-total-sale',
  templateUrl: './modal-total-sale.component.html',
  styleUrls: ['./modal-total-sale.component.css']
})
export class ModalTotalSaleComponent implements OnInit {

  modalRef: BsModalRef;


  constructor(private modalService:BsModalService) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(template: TemplateRef<any>){
    this.modalRef.hide();
  }

}
