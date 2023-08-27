import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { Directory } from 'src/app/Models/Directory';
import { DirectoryService } from 'src/app/Services/directory.service';

@Component({
  selector: 'app-edit-directory',
  templateUrl: './edit-directory.component.html',
  styleUrls: ['./edit-directory.component.css']
})
export class EditDirectoryComponent  implements OnInit{
@Input() directory? : Directory;
@Output() directoryUpdated = new EventEmitter<Directory[]>();
private destroy$ = new Subject<void>();
  
constructor(private directoryService: DirectoryService,private cdr: ChangeDetectorRef){}
  ngOnInit(): void {
  }
 
  updateDirectory(directory: Directory) {
    this.directoryService
      .updateDirectory(directory)
      .subscribe(
        (updatedDirectory: Directory[]) => {
          this.directoryUpdated.emit(updatedDirectory);
          // this.directoryToEdit = undefined; 
        // location.reload()
        }
      );
  }
  
createDirectory(directory: Directory){
  this.directoryService
  .createDirectory(directory)
  .subscribe((directory: Directory[])=>
  {this.directoryUpdated.emit(directory)
  location.reload()
  }
  )
}

deleteDirectory(directory: Directory) {
  this.directoryService.deleteDirectory(directory)
    // .pipe(takeUntil(this.destroy$))
    .subscribe(updatedDirectories => {
      this.directoryUpdated.emit(updatedDirectories);
      // this.cdr.detectChanges();
      // this.directoryToEdit = undefined; buna gerek yok
      // location.reload();
    });
}
ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
}