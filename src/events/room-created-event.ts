import { Subjects } from './subjects';

export interface RoomCreatedEvent {
  subject: Subjects.RoomCreated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}
