export interface DashboardPlantNeed {
  quantity: number;
  needId: number;
  needName: string;
  nextAction:Date;
  lastActionDone: Date;
  lastActionDoneBy: string;
  shouldDisplay: boolean;
  }
  