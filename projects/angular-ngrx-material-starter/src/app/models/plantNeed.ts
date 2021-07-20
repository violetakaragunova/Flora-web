export interface PlantNeed {
  id: number;
  monthFromName: string;
  monthToName: string;
  monthFromId: number;
  monthToId: number;
  quantity: number;
  frequency: number;
  frequencyType: string
  frequencyTypeId: number;
  needId: number;
  plantId: number;
  needName: string;
}
