import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

import { Vehicle } from '../../services/vehicle';
import { Veiculo } from '../../models/veiculo.model';
import { VehicleData } from '../../models/vehicle-data.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  veiculos: Veiculo[] = [];
  veiculoSelecionado?: Veiculo;

  vin: string = '';
  vinPesquisado: string = '';
  dadosVeiculo?: VehicleData;
  mensagemErro: string = '';

  private pesquisaVin = new Subject<string>();

  constructor(private vehicleService: Vehicle) { }

  ngOnInit(): void {
    this.carregarVeiculos();

    this.pesquisaVin.pipe(
      debounceTime(500),
      filter((vin: string) => vin.trim().length > 0),
      distinctUntilChanged()
    ).subscribe((vin: string) => {
      this.consultarVin(vin);
    });
  }

  carregarVeiculos(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (veiculos) => {
        this.veiculos = veiculos;

        if (this.veiculos.length > 0) {
          this.veiculoSelecionado = this.veiculos[0];
        }
      },
      error: (erro) => {
        console.error('Erro ao carregar veículos:', erro);
      }
    });
  }

  buscarVin(): void {
    this.mensagemErro = '';
    this.dadosVeiculo = undefined;

    if (!this.vin.trim()) {
      this.mensagemErro = 'Digite um VIN para realizar a busca.';
      return;
    }

    this.pesquisaVin.next(this.vin.trim());
  }

  consultarVin(vin: string): void {
  this.vehicleService.getVehicleData(vin).subscribe({
    next: (dados) => {
      this.vinPesquisado = vin;
      this.dadosVeiculo = dados;
    },
    error: () => {
      this.dadosVeiculo = undefined;
      this.mensagemErro = 'VIN não encontrado.';
    }
  });
}


}