import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Directory } from '../Models/Directory';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  private url = 'Directory';  

  constructor(private http:HttpClient) {}
  public getDirectory():Observable<Directory[]> {
    return this.http.get<Directory[]>(`${environment.apiUrl}/${this.url}`);
  }


  public updateDirectory(directory:Directory):Observable<Directory[]> {
    return this.http.put<Directory[]>(`${environment.apiUrl}/${this.url}`,directory);
  }

  public createDirectory(directory:Directory):Observable<Directory[]> {
    return this.http.post<Directory[]>(`${environment.apiUrl}/${this.url}`,directory);
  }

  public deleteDirectory(directory:Directory):Observable<Directory[]> {
    return this.http.delete<Directory[]>(`${environment.apiUrl}/${this.url}/${directory.id}`);
  }

}
