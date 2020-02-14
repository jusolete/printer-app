import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal/';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ModalService} from '../../services/modals/modal.service';
import { NotesService } from '../../services/notes/notes.service';
 

@Component({
  selector: 'app-sell-form',
  templateUrl: './sell-form.component.html',
  styleUrls: ['./sell-form.component.css']
})
export class SellFormComponent implements OnInit {

  modalRef: BsModalRef;

  @ViewChild('modal',{static: false }) autoShownModal: ModalDirective;
  @ViewChild('modalSale',{static: false }) modalSale: ModalDirective;


  saleItem: any = {
    client: '',
    items: [],
    totalSalePrice: 0,
    noteDate: undefined,
    formError: false
  }

  formObject: any[] = []

  constructor(private modalService:BsModalService,
     private modalLoadingService:ModalService, private notesService: NotesService) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.openAskModal();
  }

  openAskModal(){
    this.autoShownModal.show();
  }

  addPrintingProduct(){
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
      formError: false,
      isPrintingItem:true
    });
    this.autoShownModal.hide();
  }

  addPromotionalProduct(){
    this.formObject.push({
      quantity: undefined,
      length: '',
      height: '',
      totalMeterSquares: undefined,
      unitPrice: undefined,
      unitTotalPrice: undefined,
      observations: '',
      fileName: '',
      totalItemPrice: 0,
      formError: false,
      isPrintingItem:false
    });
    this.autoShownModal.hide();

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

  calculateItemPrice(index){
    if(this.formObject[index].quantity != undefined && this.formObject[index].unitPrice != undefined){
     this.formObject[index].totalItemPrice = this.formObject[index].quantity * this.formObject[index].unitPrice;
    }
  }

  saveOrder(template) {
    let size = this.validateFormFields()
    if (size === this.formObject.length && this.validateMainData()) {
      this.saleItem.totalSalePrice = this.calculateTotals();
      this.modalSale.show();
      this.saleItem.items = this.formObject;
    }
  }


  endOrder(template){
    let notificationObj = {};
    this.modalLoadingService.launchModalService(true);
    this.modalSale.hide();
    this.notesService.saveNote(this.saleItem).subscribe(response => {
      debugger
      notificationObj['type'] = 'success';
      notificationObj['message'] = 'Solicitud procesada correctamente';
      this.modalLoadingService.launchModalService(false);
      this.modalLoadingService.launchAlertService(notificationObj);
      debugger
    },(error => {
      this.modalLoadingService.launchModalService(false);
      notificationObj['type'] = 'danger';
      notificationObj['message'] = 'Ha ocurrido un error al procesar la solicitud';
      this.modalLoadingService.launchAlertService(notificationObj);
      debugger
    }));
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(template: TemplateRef<any>){
    this.modalRef.hide();
  }

  hideModal(){
    this.autoShownModal.hide();
    debugger
  }

  selectedDate(event) {
    debugger
  }

  removeSale(index) {
    this.formObject.splice(index, 1);
  }

}
