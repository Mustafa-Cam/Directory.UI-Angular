import { Component, Input, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Directory } from 'src/app/Models/Directory';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';
import { DirectoryService } from 'src/app/Services/directory.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  @Input() directoryy?: Directory;
  title = 'Directory.UI';
  directory: Directory[] = [];
  directoryToEdit?: Directory;
   users:any=[];

  private directoryDataSubject = new BehaviorSubject<Directory[]>([]);
  directoryData$ = this.directoryDataSubject.asObservable();  
  newresult:any= [];
  isHidden:boolean =true;
  public fullName : string = "";
  public role!:string; // ! Bu kodda role adında bir sınıf özelliği (class property) tanımlanmıştır. ! işareti, bu özelliğin asla "null" veya "undefined" olmayacağını belirtir. 
  public firstName : string = "";
  public ID : number = 0;
 
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
  
  constructor(
    private directoryservice: DirectoryService,
    private api: ApiService,
    private auth: AuthService,
    private userStore: UserStoreService
    ) {}

  toggleVisibility() {
    this.isHidden = !this.isHidden; // isVisible değerini tersine çevir
  }


  ngOnInit(): void {
    this.userStore.getIDFromStore()
    .subscribe(value => {
      // console.log(value);
      const IDFromToken = this.auth.getIdFromToken();
      this.ID=IDFromToken;
      console.log(IDFromToken); 
      // if(this.directoryToEdit){
      //   this.directoryToEdit.userId=IDFromToken;
      // }
    })
    // this.loadData();
    
 
    this.directoryservice
    .getDirectory()
    .subscribe((result: Directory[]) => { // subscribe sunucudan dönen veriyi alıyor sonrada işlem falan yapıyoruz
      for (const directoryitem of result) {
    // const id = directoryitem.id;
    if(directoryitem.userId==this.ID){
      this.newresult.push(directoryitem)
      this.directory =this.newresult; 
    }
  } 
        console.log(result)
        console.log(this.directory)
        this.directoryDataSubject.next(this.newresult);
        // console.log(result);
      });

      this.userStore.getFullNameFromStore() // component e ekleme için 
      .subscribe(val=>{
        const fullNameFromToken = this.auth.getfullNameFromToken();
        this.fullName = val || fullNameFromToken
      });

      this.userStore.getFirstNameFromStore() // component e ekleme için 
      .subscribe(val=>{
        const firstNameFromToken = this.auth.getFirstNameFromToken();
        this.firstName = val || firstNameFromToken
      });
    
      this.userStore.getRoleFromStore() // component e ekleme için 
      .subscribe(val=>{
        const roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
      })
    }
    
updateDirectoryList(directory: Directory[]) {
  this.directory = directory;
  this.directoryDataSubject.next(directory);
  this.directoryToEdit = undefined;
}

initNewDirectory() {
  this.directoryToEdit = new Directory();
  this.directoryToEdit.userId=this.ID;
  if(!this.isHidden){
    this.isHidden = true;
    // console.log(this.isHidden)
  }
  else{
    this.isHidden=false;
    // console.log(this.isHidden)

  }
}
 logout(){
    this.auth.signOut();
    this.firstName="";
    // this.newresult=[];
  }
editdirectory(directory: Directory=new Directory()) {
  this.directoryToEdit = directory;
  console.log(directory);
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
function refreshData() {
  throw new Error('Function not implemented.');
}

