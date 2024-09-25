import { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    name?: string;
    lastname?: string;
    groups?: string[];
    notifications?: string[];
    comparePassword: (candidatePassword: string) => Promise<boolean>;
    expoPushToken?: any;  // Añadimos el campo expoPushToken

  }
  