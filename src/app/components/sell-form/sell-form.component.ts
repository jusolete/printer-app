import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal/';

@Component({
  selector: 'app-sell-form',
  templateUrl: './sell-form.component.html',
  styleUrls: ['./sell-form.component.css']
})
export class SellFormComponent implements OnInit {

  modalRef: BsModalRef;

  saleItem: any = {
    client: '',
    items: [],
    totalSalePrice: 0,
    noteDate: undefined,
    formError: false
  }

  formObject: any[] = [{
    quantity: undefined,
    length: undefined,
    height: undefined,
    totalMeterSquares: undefined,
    unitPrice: undefined,
    unitTotalPrice: undefined,
    observations: '',
    fileName: '',
    totalItemPrice: 0,
    formError: false
  }]

  constructor(private modalService:BsModalService) { }

  ngOnInit() {

  }

  addNewSale() {
    this.formObject.push({
      quantity: undefined,
      length: undefined,
      height: undefined,
      totalMeterSquares: undefined,
      unitPrice: undefined,
      unitTotalPrice: undefined,
      observations: '',
      fileName: '',
      totalItemPrice: 0,
      formError: false
    });
  }

  calculateSize(index) {
    if (this.formObject[index].length != undefined && this.formObject[index].height != undefined) {
      this.formObject[index].totalMeterSquares = this.formObject[index].length * this.formObject[index].height;
      if (this.formObject[index].unitPrice != undefined) {
        this.calculatePiecePrice(index);
        this.calculateTotalItemPrice(index);
      }
    }
  }

  calculatePiecePrice(index) {
    if (this.formObject[index].totalMeterSquares != undefined) {
      this.formObject[index].unitTotalPrice = this.formObject[index].totalMeterSquares * this.formObject[index].unitPrice;
      this.calculateTotalItemPrice(index);
    }
  }

  calculateTotalItemPrice(index) {
    if (this.formObject[index].quantity != undefined && this.formObject[index].unitPrice != undefined && this.formObject[index].length != undefined && this.formObject[index].height != undefined) {
      this.formObject[index].totalItemPrice = this.formObject[index].unitTotalPrice * this.formObject[index].quantity;
    }
  }

  validateFormFields() {
    let arrValidations = [];
    for (const obj of this.formObject) {
      if (obj.quantity != undefined && obj.length != undefined && obj.height != undefined && obj.unitPrice != undefined && obj.fileName != '') {
        obj.formError = false;
        debugger
        arrValidations.push(true);
      } else {
        obj.formError = true;
        debugger
        break;
      }
    }
    return arrValidations.length;
  }

  validateMainData() {
    if (this.saleItem.client != '' && this.saleItem.noteDate != undefined) {
      this.saleItem.formError = false;
      return true
    }
    this.saleItem.formError = true;
    return false;
  }

  calculateTotals(){
    let total = 0;
    for(const item of this.formObject){
      total += item.totalItemPrice;
    }
    return total;
    debugger
  }

  saveOrder(template) {
    let size = this.validateFormFields()
    if (size === this.formObject.length && this.validateMainData()) {
      this.saleItem.totalSalePrice = this.calculateTotals();
      this.openModal(template);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(template: TemplateRef<any>){
    this.modalRef.hide();
  }

  selectedDate(event) {
    debugger
  }

  removeSale(index) {
    this.formObject.splice(index, 1);
  }

}
