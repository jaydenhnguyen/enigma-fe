import { type Event } from "src/modules/Events";

export const staticEvents: Event[] = [
  {
    "id": "evt_001_2025_06_18_001",
    "toLoad": true,
    "moveDate": "2025-06-18",
    "startTime": "2025-06-18T08:00:00Z",
    "finishTime": "2025-06-18T12:00:00Z",
    "fullAddress": "123 Main St, Toronto, ON M5V 2T6",
    "moversAssigned": [
      "Dima",
      "Joshi"
    ],
    "trucksAssigned": 1,
    "addressSize": "2 bedroom",
    "associatedEvent": [
      "evt_002_2025_06_18_002"
    ],
    "inventoryList": [
      "1 queen bed",
      "1 dresser",
      "1 sofa",
      "1 dining table",
      "4 dining chairs",
      "1 refrigerator",
      "1 washing machine"
    ],
    "extraServices": [
      "packing",
      "piano moving"
    ],
    "heardAboutUsFrom": "Google",
    "clientComments": "Please be careful with the piano",
    "amountPaid": 800,
    "amountDue": 200,
    "hstRate": 0.13,
    "total": 1130,
    "subtotal": 1000,
    "serviceRate": 150
  },
  {
    "id": "evt_002_2025_06_18_002",
    "toLoad": false,
    "moveDate": "2025-06-18",
    "startTime": "2025-06-18T14:00:00Z",
    "finishTime": "2025-06-18T18:00:00Z",
    "fullAddress": "456 Oak Ave, Mississauga, ON L5B 3Y7",
    "moversAssigned": [
      "Jayden",
      "Michael"
    ],
    "trucksAssigned": 1,
    "addressSize": "2 bedroom",
    "associatedEvent": [
      "evt_001_2025_06_18_001"
    ],
    "inventoryList": [
      "1 queen bed",
      "1 dresser",
      "1 sofa",
      "1 dining table",
      "4 dining chairs",
      "1 refrigerator",
      "1 washing machine"
    ],
    "extraServices": [
      "unpacking",
      "piano moving"
    ],
    "heardAboutUsFrom": "Google",
    "clientComments": "Delivery to 3rd floor apartment",
    "amountPaid": 0,
    "amountDue": 0,
    "hstRate": 0.13,
    "total": 0,
    "subtotal": 0,
    "serviceRate": 0
  },
  {
    "id": "evt_003_2025_06_19_001",
    "toLoad": true,
    "moveDate": "2025-06-19",
    "startTime": "2025-06-19T09:00:00Z",
    "finishTime": "2025-06-19T15:00:00Z",
    "fullAddress": "789 Elm St, Brampton, ON L6X 4R9",
    "moversAssigned": [
      "Liam",
      "Emma",
      "Olivia"
    ],
    "trucksAssigned": 2,
    "addressSize": "3 bedroom",
    "associatedEvent": [],
    "inventoryList": [
      "2 queen beds",
      "1 king bed",
      "3 dressers",
      "1 sectional sofa",
      "1 dining set",
      "1 refrigerator",
      "1 washer",
      "1 dryer",
      "1 piano"
    ],
    "extraServices": [
      "full packing",
      "piano moving",
      "storage"
    ],
    "heardAboutUsFrom": "Referral",
    "clientComments": "Large house move, lots of fragile items",
    "amountPaid": 1500,
    "amountDue": 500,
    "hstRate": 0.13,
    "total": 2260,
    "subtotal": 2000,
    "serviceRate": 200
  }
];

