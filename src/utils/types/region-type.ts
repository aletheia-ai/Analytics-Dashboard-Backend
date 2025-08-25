import { Document } from 'mongoose';

export interface Region extends Document {
  regionId: number;
  name: string;
}
