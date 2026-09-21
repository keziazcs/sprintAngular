import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';

import { Vehicle } from '../../services/vehicle';
import { Auth } from '../../services/auth';

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

  menuAberto: boolean = false;

  private pesquisaVin = new Subject<string>();

  constructor(
    private vehicleService: Vehicle,
    private router: Router,
    private authService: Auth
  ) { }

  ngOnInit(): void {

    this.carregarVeiculos();

    this.pesquisaVin
      .pipe(
        debounceTime(500),
        filter((vin: string) => vin.trim().length > 0),
        distinctUntilChanged()
      )
      .subscribe((vin: string) => {
        this.consultarVin(vin);
      });
  }

  carregarVeiculos(): void {

    this.vehicleService.getVehicles().subscribe({

      next: (veiculos: Veiculo[]) => {

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

  selecionarVeiculo(id: string): void {

    const veiculo = this.veiculos.find(
      (item) => String(item.id) === id
    );

    if (veiculo) {
      this.veiculoSelecionado = veiculo;
    }
  }

  buscarVin(): void {

    this.mensagemErro = '';
    this.dadosVeiculo = undefined;

    const vinDigitado = this.vin.trim();

    if (!vinDigitado) {
      this.mensagemErro =
        'Digite um VIN para realizar a busca.';
      return;
    }

    this.pesquisaVin.next(vinDigitado);
  }

  consultarVin(vin: string): void {

    this.vehicleService
      .getVehicleData(vin)
      .subscribe({

        next: (dados: VehicleData) => {
          this.vinPesquisado = vin;
          this.dadosVeiculo = dados;
          this.mensagemErro = '';
        },

        error: () => {
          this.dadosVeiculo = undefined;
          this.mensagemErro = 'VIN não encontrado.';
        }

      });
  }

  alternarMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  irParaHome(): void {
    this.menuAberto = false;
    this.router.navigate(['/home']);
  }

  logout(): void {
    this.menuAberto = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}