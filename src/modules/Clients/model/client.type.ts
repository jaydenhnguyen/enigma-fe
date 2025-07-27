
export type Client = {
  _id: string;
  fullName: string;
  hiredUs: boolean,
  moveDates: Date[];
  phone: string;
  email: string;
  currentStatus: string;
  eventsAssociated: string[];
  createdAt: string;
  updatedAt: string;
  utm:{
    utm_campaign?: string,
    utm_medium?: string,
    utm_source?: string,
    utm_term?: string,
    utm_content?: string,
  };
   assignee: string[];
  statusHistory:{
    modifiedToStatus: string;
    timestamp: Date;
    modifiedBy: string | undefined;
  }
};

