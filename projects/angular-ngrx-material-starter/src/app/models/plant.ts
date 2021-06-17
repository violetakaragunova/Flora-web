import { Photo } from './photo';

export interface Plant {
  id: number;
  name: string;
  description: string;
  roomId: number;
  photoUrl: string;
  photos: Photo[];
}
