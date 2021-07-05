import { Photo } from './photo';
import { PlantNeed } from './plantNeed';

export interface Plant {
  id: number;
  name: string;
  description: string;
  roomName: string;
  photoUrl: string;
  photos: Photo[];
  plantNeeds: PlantNeed[];
}
