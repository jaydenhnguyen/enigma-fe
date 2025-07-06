import React from "react";

type EventDetailPopUpProps = {
  event?: any;
};

const EventDetailPopUp: React.FC<EventDetailPopUpProps> = ({ event }) =>  {
  return (
<div className="grid grid-cols-4 gap-6 text-gray-700 text-sm">

  {/* CLIENT INFORMATION */}
  <div className="space-y-4 col-span-1">
    <h3 className="text-lg font-semibold mb-2">Client Information</h3>

    <div>
      <label className="block mb-1 font-medium">Full Name</label>
      <input
        type="text"
        defaultValue="Kevin Dohery"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Phone Number</label>
      <input
        type="text"
        defaultValue="067999777888"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Email</label>
      <input
        type="email"
        defaultValue="dummy@email.com"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
  </div>

  {/* PICK-UP DETAILS */}
  <div className="space-y-4 col-span-1">
    <h3 className="text-lg font-semibold mb-2">Pick-up Details</h3>

    <div>
      <label className="block mb-1 font-medium">Pick-up Date</label>
      <input
        type="date"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Pick-up Time</label>
      <input
        type="time"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Pick-up Address</label>
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <div>
    <label className="block mb-1 font-medium">Number of Movers</label>
    <select
        defaultValue={event?.numberOfMovers || 1}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
    >
        {[1, 2, 3, 4, 5].map((num) => (
        <option key={num} value={num}>
            {num}
        </option>
        ))}
    </select>
    </div>

    <div>
      <label className="block mb-1 font-medium">Movers assigned</label>
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <div>
    <label className="block mb-1 font-medium">Number of Trucks</label>
    <select
        defaultValue={event?.numberOfTrucks || 1}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
    >
        {[1, 2, 3, 4, 5].map((num) => (
        <option key={num} value={num}>
            {num}
        </option>
        ))}
    </select>
    </div>


    <div>
      <label className="block mb-1 font-medium">Pick-up address size</label>
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
  </div>

  {/* DELIVERY DETAILS */}
  <div className="space-y-4 col-span-1">
    <h3 className="text-lg font-semibold mb-2">Delivery Details</h3>

    <div>
      <label className="block mb-1 font-medium">Delivery Date</label>
      <input
        type="date"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Delivery Time</label>
      <input
        type="time"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Delivery Address</label>
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <div>
    <label className="block mb-1 font-medium">Number of Movers</label>
    <select
        defaultValue={event?.numberOfMovers || 1}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
    >
        {[1, 2, 3, 4, 5].map((num) => (
        <option key={num} value={num}>
            {num}
        </option>
        ))}
    </select>
    </div>


    <div>
      <label className="block mb-1 font-medium">Movers assigned</label>
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <div>
    <label className="block mb-1 font-medium">Number of Trucks</label>
    <select
        defaultValue={event?.numberOfTrucks || 1}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
    >
        {[1, 2, 3, 4, 5].map((num) => (
        <option key={num} value={num}>
            {num}
        </option>
        ))}
    </select>
    </div>


    <div>
      <label className="block mb-1 font-medium">Delivery address size</label>
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
  </div>

  {/* INVENTORY & NOTES */}
  <div className="space-y-4 col-span-1">
    <h3 className="text-lg font-semibold mb-2">Inventory List</h3>
    <textarea
      rows={4}
      defaultValue="1 Queen Bed, 1 night stand, etc."
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
    />

    <h3 className="text-lg font-semibold mb-2">Note</h3>
    <textarea
      rows={3}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
    />

    <h3 className="text-lg font-semibold mb-2">Information for Employees</h3>

    <div>
      <label className="block mb-1 font-medium">Crew Arrival Address</label>
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Crew Arrival Time</label>
      <input
        type="time"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
  </div>
</div>
  );
};

export default EventDetailPopUp;