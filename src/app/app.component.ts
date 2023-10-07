import { Component } from '@angular/core';
import { Directory } from './Models/Directory';
import { DirectoryService } from './Services/directory.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Directory.UI';
  directory: Directory[] = [];
  directoryToEdit?: Directory;

  private directoryDataSubject = new BehaviorSubject<Directory[]>([]);
  directoryData$ = this.directoryDataSubject.asObservable();  

  isHidden:boolean =true;

  // columnDefs = [
  //   { headerName: 'Ad', field: 'firstName' },
  //   { headerName: 'Soyad', field: 'lastName' },
  //   { headerName: 'Telefon', field: 'telephone' },
  //   {
  //     headerName: 'Düzenle',
  //     cellRenderer: 'editButtonRenderer',
  //     cellRendererParams: {
  //       clicked: this.editdirectory.bind(this),
  //     },
  //   },
  // ];

  constructor(private directoryservice: DirectoryService) {}

  toggleVisibility() {
    this.isHidden = !this.isHidden; // isVisible değerini tersine çevir
  }

  ngOnInit(): void {
    this.directoryservice
      .getDirectory()
      .subscribe((result: Directory[]) => {
        this.directory = result; 
        this.directoryDataSubject.next(result);
        // console.log(result);
      });
  }

updateDirectoryList(directory: Directory[]) {
  this.directory = directory;
  this.directoryDataSubject.next(directory);
  this.directoryToEdit = undefined;
}

initNewDirectory() {
  this.directoryToEdit = new Directory();
  if(!this.isHidden){
    this.isHidden = true;
    // console.log(this.isHidden)
  }
  else{
    this.isHidden=true;
    // console.log(this.isHidden)

  }
}

editdirectory(directory: Directory=new Directory()) {
  this.directoryToEdit = directory;
  if(!this.isHidden){
    this.isHidden = true;
    // console.log(this.isHidden)
  }
  else{
    this.isHidden=false;
    // console.log(this.isHidden)
  }
}  
}

    // showAddForm = false; // Yeni kişi ekleme formunu göstermek/gizlemek için kullanılır
    // newContact: Directory = new Directory(); // Yeni kişi bilgilerini tutmak için kullanılır

    // addContact() {
    //   this.directory.push(this.newContact); // Yeni kişiyi rehbere ekler
    //   this.newContact = new Directory(); // Yeni kişi nesnesini sıfırlar
    //   this.showAddForm = false; // Yeni kişi ekleme formunu kapatır
    // }
  
