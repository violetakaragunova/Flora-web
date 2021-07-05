import { DashboardPlantNeed } from "./dashboardPlantNeed";

export interface DashboardPlant {
  plantId: number;
  roomName: string;
  photoUrl: string;
  plantNeeds: DashboardPlantNeed[];
}
