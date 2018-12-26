import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {

    constructor(public http : HttpClient, public storage : StorageService) {
    }

    findByEmail(email: string) {
 
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
   }

   getImagemFromBucket(id : String) : Observable<any> {
       let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
       return this.http.get(url, {responseType : "blob"});
   }

   inserirCliente(obj : ClienteDTO){
       return this.http.post(
           `${API_CONFIG.baseUrl}/clientes`,
           obj,
           {
               observe: "response",
               responseType: "text"
           }
       );
   }
}