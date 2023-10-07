import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Directory } from '../Models/Directory';


//! Servisler sunucudan veri çekme veri gönderme gibi işlemlerde kullanılır.
@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  private url = 'Directory';  
  //! Bağımlılıkların constructor içinde tanımlanması, Angular CLI ve Angular tarafından otomatik olarak işlenir ve bağımlılıkların enjekte edilmesini sağlar.
  newresult:any= [];
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
/*
! Observable'ların temel görevleri şunlardır:

!Asenkron Veri Akışı Yönetimi: 
Observable'lar, asenkron işlemler sonucu oluşan veri akışını temsil eder. Örneğin, HTTP istekleri, kullanıcı etkileşimleri veya zamanlayıcılar gibi asenkron olayları takip etmek ve bu olaylarla çalışmak için kullanılır.

!Veri Yayılımı ve İzleme: 
Observable'lar, bir kaynaktan gelen verilerin yayılmasını ve bu verilerin izlenmesini sağlar. Bir Observable, bir veya birden çok değeri içerebilir ve bu değerler zaman içinde sırayla yayılır. Bu, özellikle kullanıcı arayüzü güncellemeleri veya gerçek zamanlı veri akışlarını izlemek için faydalıdır.

!Veri Dönüşümü ve İşleme:
 Observable'lar, veriyi dönüştürmek, filtrelemek veya işlemek için operatörlerle birlikte kullanılabilir. Bu sayede veriyi dönüştürmek veya işlemek için karmaşık işlemler gerçekleştirmek mümkün olur.

!Hata İşleme:
 Observable'lar, hataları ele almak için bir mekanizma sunar. Hata durumları, Observable'ın içindeki akışı etkileyebilir ve bu hataların nasıl işleneceği belirlenebilir.

!İptal ve Temizleme:
 Observable'lar, işlem tamamlandığında veya artık gerekli olmadığında iptal edilebilirler. Bu, kaynakların ve belleğin etkin bir şekilde yönetilmesine yardımcı olur.


!Sonuç olarak, Angular uygulamalarında HTTP istekleri yapmak için HttpClient ile birlikte Observable'ları kullanmanız gerekmektedir. Bu sayede asenkron veri akışını düzgün bir şekilde yönetebilir ve veriyi işleyebilirsiniz.
 */