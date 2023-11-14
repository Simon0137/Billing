export interface Customer {
  id: number;
  name?: string;
  email?: string;
  date?: Date;
  gender?: 'male' | 'female';
  tariffPlan?: 'free' | 'basic' | 'premium';
}
