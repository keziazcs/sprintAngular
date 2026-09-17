import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { Veiculo } from '../models/veiculo.model';
import { VehicleData } from '../models/vehicle-data.model';

@Injectable({
  providedIn: 'root'
})
export class Vehicle {

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<Veiculo[]> {
    return this.http
      .get<{ vehicles: Veiculo[] }>(`${this.apiUrl}/vehicles`)
      .pipe(
        pluck('vehicles'),
        map((veiculos: Veiculo[]) => veiculos)
      );
  }

  getVehicleData(vin: string): Observable<VehicleData> {
    return this.http
      .post<VehicleData>(
        `${this.apiUrl}/vehicleData`,
        { vin }
      )
      .pipe(
        map((dados: VehicleData) => dados)
      );
  }
}