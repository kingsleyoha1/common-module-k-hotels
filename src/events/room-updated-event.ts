import { Subjects } from './subjects';

export interface RoomUpdatedEvent {
  subject: Subjects.RoomUpdated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
    orderId?: string;
  };
}
