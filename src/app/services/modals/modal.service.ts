import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

    @Output() launchModalLoading: EventEmitter<any> = new EventEmitter();

  constructor() { }


  launchModalService(launch = false){
      this.launchModalLoading.emit(launch);
  }



}