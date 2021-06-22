export interface PlantNeed {
    id:number;
    monthFrom: number;
    monthTo: number;
    quantity: number;
    frequency: number;
    frequencyType: string;
    needId: number;
    plantId: number;
    needName: string;
  }