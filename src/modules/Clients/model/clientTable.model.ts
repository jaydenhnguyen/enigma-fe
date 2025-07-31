export const CLIENT_TABLE_COLUMN_LABEL = {
  hiredUs: 'Hired Us',
  fullName: 'Full Name',
  email: 'Email',
  phone: 'Phone Number',
  moveDates: 'Move Dates',
  eventsAssociated: 'Events Associated',
  currentStatus: 'Current Status',
  statusHistory: {
    modifiedToStatus: 'Modified Status',
    timestamp: 'Time',
    _id: 'Modified By',
  },
  utm: {
    utm_source: 'Utm source',
    utm_medium: 'Utm medium',
    utm_campaign: 'Utm campaign',
    utm_term: 'Utm term',
    utm_content: 'Utm content',
  },
  assignee: 'Assignee',
};

export const CLIENT_TABLE_COLUMN_KEY = {
  hiredUs: 'hiredUs',
  fullName: 'fullName',
  email: 'email',
  phone: 'phone',
  moveDates: 'moveDates',
  eventsAssociated: 'eventsAssociated',
  currentStatus: 'currentStatus',
  statusHistory: {
    modifiedToStatus: 'modifiedToStatus',
    timestamp: 'timestamp',
    _id: '_id',
  },
  utm: {
    utm_source: 'utm_source',
    utm_medium: 'utm_medium',
    utm_campaign: 'utm_campaign',
    utm_term: 'utm_term',
    utm_content: 'utm_content',
  },
  assignee: 'assignee',
};

export type ClientTableData = {
  _id: string;
  hiredUs: boolean;
  fullName: string;
  email: string;
  phone: string;
  moveDates: Date[];
  eventsAssociated: string[];
  currentStatus: string;
  statusHistory: {
    modifiedToStatus: string;
    timestamp: Date;
    modifiedBy: string | undefined;
  };
  utm?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
  };
  assignee: string[];
};
