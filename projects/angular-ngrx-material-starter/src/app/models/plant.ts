import { Photo } from './photo';
import { PlantNeed } from './plantNeed';

export interface Plant {
  id: number;
  name: string;
  description: string;
  roomId: number;
  roomName: string;
  photoUrl: string;
  photos: Photo[];
  plantNeeds: PlantNeed[];
}
