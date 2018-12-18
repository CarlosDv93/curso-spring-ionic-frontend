import { Injectable } from "@angular/core";

@Injectable()
export class ClienteDTO{
    id:string;
    nome : string;
    email : string;
    imageUrl?: string //? é caso ele seja opcional
}