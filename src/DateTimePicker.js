import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateTimePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null); // State for Time Picker
  const [availability, setAvailability] = useState(''); // State for availability message

  // Check availability based on dates and time
  const checkAvailability = () => {
    // Example availability condition: Available if time is between 9 AM and 6 PM
    const openingTime = new Date();
    openingTime.setHours(9, 0); // 9:00 AM
    const closingTime = new Date();
    closingTime.setHours(18, 0); // 6:00 PM

    if (startDate && endDate && selectedTime) {
      // Check if selected time is within the available time range
      if (selectedTime >= openingTime && selectedTime <= closingTime) {
        setAvailability('Available');
      } else {
        setAvailability('Unavailable - Please choose a time between 9:00 AM and 6:00 PM');
      }
    } else {
      setAvailability('Please select both dates and time.');
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* From, To, and Time Picker on Same Line */}
      <div className="flex space-x-4">
        {/* From Date Picker */}
        <div className="flex flex-col w-1/3">
          <label className="mb-2 text-sm font-medium text-gray-700">From</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="Pp"
            className="border rounded-md p-2 w-full text-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholderText="Select start date"
          />
        </div>

        {/* To Date Picker */}
        <div className="flex flex-col w-1/3">
          <label className="mb-2 text-sm font-medium text-gray-700">To</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="Pp"
            className="border rounded-md p-2 w-full text-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholderText="Select end date"
          />
        </div>

        {/* Time Picker */}
        <div className="flex flex-col w-1/3">
          <label className="mb-2 text-sm font-medium text-gray-700">Time</label>
          <DatePicker
            selected={selectedTime}
            onChange={(time) => setSelectedTime(time)}
            showTimeSelect
            showTimeSelectOnly // Show only time selection
            timeIntervals={15} // Custom interval for time picker
            timeCaption="Time"
            dateFormat="hh:mm aa" // Format for time (12-hour clock with AM/PM)
            className="border rounded-md p-2 w-full text-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholderText="Select time"
          />
        </div>
      </div>

      {/* Button to Check Availability */}
      <button
        onClick={checkAvailability}
        className="bg-blue-500 text-white rounded-md py-2 px-4 mt-4 hover:bg-blue-600"
      >
        Check Availability
      </button>

      {/* Display Selected Dates and Time */}
      <div className="mt-4 p-4 border rounded-md bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Selected Date and Time</h3>
        <p className="text-sm text-gray-700">
          <strong>From Date:</strong> {startDate ? startDate.toLocaleString() : 'Not selected'}
        </p>
        <p className="text-sm text-gray-700">
          <strong>To Date:</strong> {endDate ? endDate.toLocaleString() : 'Not selected'}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Selected Time:</strong> {selectedTime ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Not selected'}
        </p>
      </div>

      {/* Display Availability Status */}
      {availability && (
        <div className="mt-4 p-4 border rounded-md bg-green-100">
          <h3 className="text-md font-semibold">{availability}</h3>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
