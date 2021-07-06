export interface PlantNeed {
  id: number;
  monthFromName: string;
  monthToName: string;
  monthFrom: number;
  monthTo: number;
  quantity: number;
  frequency: number;
  frequencyType: string
  frequencyTypeId: number;
  needId: number;
  plantId: number;
  needName: string;
}
