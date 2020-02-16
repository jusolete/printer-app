import { Component, OnInit, ViewChild } from '@angular/core';
import {NotesService} from '../../services/notes/notes.service';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';

@Component({
  selector: 'app-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.css']
})
export class ListSalesComponent implements OnInit {

  @ViewChild('modal', { static: false }) autoShownModal: ModalDirective;

  constructor(private notesService:NotesService) { }

  ngOnInit() {
  }

  queryObj = {
    date: '',
    noteId: '',
    client: ''
  }

  salesList:any[]= [];

  selectedSale:any = {}

  searchForSale() {
    let queryString = `?`;
    let dateString = ``;
    let clientString = ``;
    let noteString = ``;

    if (this.queryObj.date && String(this.queryObj.date).length > 0) {
      let date = new Date(this.queryObj.date).toLocaleDateString();
      let formatDate = date.split('/');
      let sentDate = `${formatDate[2]}-${formatDate[1]}-${formatDate[0]}`
      dateString = `date=${sentDate}`
      queryString = queryString.concat(dateString);
      debugger
      queryString = queryString.concat('&');
    }

    if (this.queryObj.client && this.queryObj.client.length > 0) {
      clientString = `client=${this.queryObj.client}`
      queryString = queryString.concat(clientString);
      queryString = queryString.concat('&');
    }

    if (this.queryObj.noteId && this.queryObj.noteId.length > 0) {
      noteString = `id=${this.queryObj.noteId}`
      queryString = queryString.concat(noteString);
      queryString = queryString.concat('&');
    }
    
    this.notesService.searchNote(queryString).subscribe(response => {
          this.salesList = [];
          if(response['ok'] == true){
              this.salesList = response['success'];
          }
    },error => {
        
    });

    
  }

  openSale(sale){
    this.selectedSale = sale;
    this.openModal();
    debugger
  }


  openModal(){
    this.autoShownModal.show();
  }

  closeModal(){
    this.autoShownModal.hide();
  }

}
