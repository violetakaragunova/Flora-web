import { DashboardPlantNeed } from './dashboardPlantNeed';

export interface DashboardPlant {
  plantId: number;
  name: string;
  plantFamilyName: string;
  roomName: string;
  photoUrl: string;
  description: string;
  plantNeeds: DashboardPlantNeed[];
}
