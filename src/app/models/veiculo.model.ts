export interface Veiculo {
  id: number | string;
  vehicle: string;
  volumetotal: number;
  connected: number;
  softwareUpdates: number;
  img: string;
}

export interface Veiculos extends Array<Veiculo> {}

export interface VeiculosAPI {
  vehicles: Veiculos;
}