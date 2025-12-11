// src/utils/types/email-type.ts
import { Document } from 'mongoose';

export interface Email extends Document {
  to: string;
  subject: string;
  template: string;
  context: any;
  attachments: string[];
  sentStatus: boolean;
  sentAt?: Date;
}

export interface UserEmail extends Document {
  to: string;
  subject: string;
  template: string;
  sentAt: Date;
}

export const EmailSchema = {
  to: { type: String, required: true },
  subject: { type: String, required: true },
  template: { type: String, required: true },
  context: { type: Object, default: {} },
  attachments: { type: [String], default: [] },
  sentStatus: { type: Boolean, required: true },
  sentAt: { type: Date, default: Date.now },
};

export const UserEmailSchema = {
  to: { type: String, required: true },
  subject: { type: String, required: true },
  template: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
};