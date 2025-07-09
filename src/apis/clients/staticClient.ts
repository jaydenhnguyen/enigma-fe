import { Client, ClientDetail } from "src/modules/Clients"

export const staticClient: ClientDetail = {
  "_id": "6851e6a85ecd0d7814d551ee",
  "hiredUs": true,
  "fullName": "Sarah Johnson",
  "email": "sarah.johnson@gmail.com",
  "phone": "+1-555-0123",
  "moveDates": [
    "2025-08-15T00:00:00Z",
    "2025-08-16T00:00:00Z"
  ],
  "eventsAssociated": [
    "evt_001_2025_06_18_001",
    "evt_002_2025_06_18_002"
  ],
  "currentStatus": "Converted",
  "statusHistory": [
    {
      "modifiedToStatus": "Aware",
      "timestamp": "2025-06-01T10:00:00Z",
      "_id": "1c1a4a5b-da30-4449-bca5-2424f627f9a8"
    },
    {
      "modifiedToStatus": "Contacted",
      "timestamp": "2025-06-03T14:30:00Z",
      "_id": "1c1a4a5b-da30-4449-bca5-2424f627f9a8"
    },
    {
      "modifiedToStatus": "Nurturing",
      "timestamp": "2025-06-08T16:45:00Z",
      "_id": "1c1a4a5b-da30-4449-bca5-2424f627f9a8"
    }
  ],
  "utm": {
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "moving_services_q2",
    "utm_term": "professional_movers",
    "utm_content": "ad_variant_a"
  },
  "assignee": [
    "1c1a4a5b-da30-4449-bca5-2424f627f9a8"
  ],
  "createdAt": "2025-06-01T10:00:00Z",
  "updatedAt": "2025-06-17T09:30:00Z",
  "amountPaid": 1500
}

export const staticClients: Client[] = [
    {
        "moveDate": "2025-06-23T13:31:08.222Z",
        "fullName": "Miss Gloria Turner",
        "phone": "(819) 410-0225 x212",
        "email": "Elsie12@gmail.com",
        "createdAt": "2025-06-22T22:47:16.177Z",
        "updatedAt": "2024-10-23T08:15:03.887Z",
        "utm_campaign": "Handmade",
        "utm_metric": "TLS",
        "utm_source": "index",
        "utm_term": "Organized zero defect capability",
        "id": "1",
        "currentStatus": "converted",
        "amountPaid": 1200
    },
    {
        "moveDate": "2025-06-23T02:05:16.000Z",
        "fullName": "Alfonso Kuhn",
        "phone": "1-255-529-9214 x2990",
        "email": "Halie.Hoeger@yahoo.com",
        "createdAt": "2025-06-23T01:43:19.087Z",
        "updatedAt": "2025-01-10T22:58:07.738Z",
        "utm_campaign": "Ergonomic",
        "utm_metric": "EXE",
        "utm_source": "calculate",
        "currentStatus": "converted",
        "utm_term": "Cross-platform needs-based product",
        "id": "2",
        "amountPaid": 800
    },
    {
        "moveDate": "2025-06-22T22:26:56.266Z",
        "fullName": "Susie O'Keefe",
        "phone": "761-879-7979 x45676",
        "email": "Jennyfer.Schroeder@hotmail.com",
        "createdAt": "2025-06-22T22:01:50.586Z",
        "updatedAt": "2025-03-04T19:56:48.953Z",
        "utm_campaign": "Generic",
        "utm_metric": "HEX",
        "utm_source": "quantify",
        "currentStatus": "converted",
        "utm_term": "Profit-focused modular software",
        "id": "3",
        "amountPaid": 950
    },
    {
        "moveDate": "2025-06-23T08:08:40.709Z",
        "fullName": "Jessica Corwin",
        "phone": "926.776.1697 x9294",
        "email": "Westley69@hotmail.com",
        "createdAt": "2025-06-23T01:03:21.345Z",
        "updatedAt": "2025-03-04T06:10:26.886Z",
        "utm_campaign": "Refined",
        "utm_metric": "PCI",
        "utm_source": "reboot",
        "utm_term": "Programmable needs-based circuit",
        "id": "4",
        "currentStatus": "converted",
        "amountPaid": 1100
    },
    {
        "moveDate": "2025-06-23T13:41:49.696Z",
        "fullName": "Everett Gerhold IV",
        "phone": "996-664-0198 x763",
        "email": "Cleo_Considine36@gmail.com",
        "createdAt": "2025-06-23T11:16:49.178Z",
        "updatedAt": "2024-08-03T18:46:13.682Z",
        "utm_campaign": "Sleek",
        "utm_metric": "SMS",
        "utm_source": "navigate",
        "currentStatus": "converted",
        "utm_term": "Synchronised systemic interface",
        "id": "5",
        "amountPaid": 1300
    },
    
]