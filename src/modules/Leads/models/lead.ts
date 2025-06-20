export interface Lead {
  id: string;
  name: string;
  movingDate: string;
  phone: string;
  email: string;
  leadStatus: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  leadCreationDate: string;
  leadModifiedDate: string;
  refusalReason?: string;
  utm_campaign?: string;
  utm_metric?: string;
  utm_source?: string;
}