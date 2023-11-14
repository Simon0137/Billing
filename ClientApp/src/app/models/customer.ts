export interface Customer {
  id: number;
  name?: string;
  email?: string;

  gender?: 'male' | 'female';
  tariffPlan?: 'free' | 'basic' | 'premium';
}
