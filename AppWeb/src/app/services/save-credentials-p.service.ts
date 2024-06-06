import { Injectable } from '@angular/core';
import { ICredentialsP } from '../models/credentialsP.model';
@Injectable({
  providedIn: 'root'
})
export class SaveCredentialsPService {
  credenciales: ICredentialsP ={
    nombre:'',
    apellido1: '',
    apellido2: '',
    cedula: 0
  }
  constructor() {
  }
  setCredenciales(nombre: string, apellido1:string, apellido2:string, cedula:number){
    this.credenciales.nombre = nombre;
    this.credenciales.apellido1 = apellido1;
    this.credenciales.apellido2 = apellido2;
    this.credenciales.cedula = cedula;
  }
  getCredenciales():ICredentialsP{
    return this.credenciales;
  }
}
