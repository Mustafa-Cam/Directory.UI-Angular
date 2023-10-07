import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { Directory } from 'src/app/Models/Directory';
import { DirectoryService } from 'src/app/Services/directory.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-directory',
  templateUrl: './edit-directory.component.html',
  styleUrls: ['./edit-directory.component.css']
})
export class EditDirectoryComponent implements OnInit {
  @Input() directory?: Directory;
  @Output() directoryUpdated = new EventEmitter<Directory[]>();
  @Input() isHidden?:boolean;
  
  private destroy$ = new Subject<void>();
  public ID : number = 0;
  newresult:any= [];
  // router: any;
  //  Angular bileşenleri genellikle servisleri kullanarak verilere erişir veya dış kaynaklardan veri çeker. 
  constructor(
    private userStore: UserStoreService,
    private directoryService: DirectoryService,
    private auth: AuthService,
    private router: Router,
    // private cdr: ChangeDetectorRef, 
    private snackBar: MatSnackBar, // bilgilendirme mesajı için
    // private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userStore.getIDFromStore()
    .subscribe(value => {
      // console.log(value);
      const IDFromToken = this.auth.getIdFromToken();
      // console.log(IDFromToken);
      this.ID=  IDFromToken;
    }) 
  }

  onTelephoneInput(event: any) {
    if (this.directory) {
      const input = event.target.value;
      const numericInput = input.replace(/[^0-9]/g, ''); // Sadece rakamları tut
      this.directory.telephone = numericInput;
      event.target.value = this.directory.telephone; // Input değerini güncelle
    }
  }
  
  updateDirectory(directory: Directory) {
    if (this.directory) {
      console.log(directory)
      this.directoryService
        .updateDirectory(directory)
        .subscribe(
          (updatedDirectory: Directory[]) => {
            console.log(updatedDirectory);
            
            this.directoryUpdated.emit(updatedDirectory);
            this.router.navigate(['dashboard'])
            .then(() => {  window.location.reload();});
            this.snackBar.open('Kayıt başarıyla güncellendi.', 'Kapat', {
              duration: 3000, // Snackbar 3 saniye görünür
            });
          },
          (error) => {
            console.error('Kayıt güncellenirken bir hata oluştu:', error);
            this.snackBar.open('Kayıt güncellenirken bir hata oluştu.', 'Kapat', {
              duration: 3000,
            });
          }
        );
    }
  }

  createDirectory(directory: Directory) {
    if (this.directory) { 
      this.directory.userId=this.ID;
      this.directoryService.createDirectory(directory).subscribe(
        (updatedDirectories: Directory[]) => {
          
          this.directoryUpdated.emit(updatedDirectories);
          console.log(directory.userId)
          this.router.navigate(['dashboard'])
          .then(() => {  window.location.reload();});
          this.snackBar.open('Kayıt başarıyla eklendi.', 'Kapat', {
            duration: 3000, // Snackbar 3 saniye görünür
          });
        },
        (error) => {
          console.error('Kayıt oluşturulurken bir hata oluştu:', error);
          this.snackBar.open('Kayıt oluşturulurken bir hata oluştu.', 'Kapat', {
            duration: 3000,
          });
        }
      );
    }
  }

  deleteDirectory(directory: Directory) {
    if (window.confirm('Bu kaydı silmek istediğinize emin misiniz?')) {
      this.directoryService.deleteDirectory(directory).subscribe(
        (updatedDirectories: Directory[]) => {
          this.directoryUpdated.emit(updatedDirectories);
          this.router.navigate(['dashboard']).then(() => {
            window.location.reload();
          });
          this.snackBar.open('Kayıt başarıyla silindi.', 'Kapat', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Kayıt silinirken bir hata oluştu:', error);
          this.snackBar.open('Kayıt silinirken bir hata oluştu.', 'Kapat', {
            duration: 3000,
          });
        }
      );
    }
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
