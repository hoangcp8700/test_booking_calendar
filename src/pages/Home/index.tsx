import React, { useMemo } from 'react';
import './index.css';

const staffData = [
  { id: 'staff-1', name: 'Staff 1' },
  { id: 'staff-2', name: 'Staff 2' },
  { id: 'staff-3', name: 'Staff 3' },
  { id: 'staff-4', name: 'Staff 4' },
  { id: 'staff-5', name: 'Staff 5' },
];

const bookingData = [
  {
    id: 'booking-1',
    date: '2020-01-01',
    startTime: '10:00',
    endTime: '12:00',
    staffId: 'staff-1',
    title: 'goi dau 1',
  },
  {
    id: 'booking-2',
    date: '2020-01-01',
    startTime: '14:00',
    endTime: '15:00',
    staffId: 'staff-1',
    title: 'massage',
  },
  {
    id: 'booking-3',
    date: '2020-01-01',
    startTime: '8:00',
    endTime: '9:00',
    staffId: 'staff-3',
    title: 'nhuom toc',
  },
  {
    id: 'booking-4',
    date: '2020-01-01',
    startTime: '10:00',
    endTime: '11:00',
    staffId: 'staff-4',
    title: 'massage',
  },
  {
    id: 'booking-5',
    date: '2020-01-01',
    startTime: '16:00',
    endTime: '18:00',
    staffId: 'staff-4',
    title: 'ray tai',
  },
  {
    id: 'booking-6',
    date: '2020-01-01',
    startTime: '20:00',
    endTime: '23:00',
    staffId: 'staff-1',
    title: 'nhuom toc + goi dau',
  },
  {
    id: 'booking-7',
    date: '2020-01-01',
    startTime: '10:00',
    endTime: '11:00',
    staffId: 'staff-1',
    title: 'massage 2',
  },
  {
    id: 'booking-8',
    date: '2020-01-01',
    startTime: '5:00',
    endTime: '6:00',
    staffId: '',
    title: 'massage 322',
  },
];
interface BookingType {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  staffId: string;
  title: string;
}
const Home: React.FC = () => {
  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  const { withStaff: bookingsWithStaff, withoutStaff: bookingsWithoutStaff } = bookingData.reduce(
    (result, booking) => {
      if (booking.staffId) {
        result.withStaff.push(booking);
      } else {
        result.withoutStaff.push(booking);
      }
      return result;
    },
    { withStaff: [] as BookingType[], withoutStaff: [] as BookingType[] },
  );

  const sortedBookingsWithStaff = useMemo(
    () =>
      staffData.slice().sort((a, b) => {
        const bookingsA = bookingsWithStaff.filter((booking) => booking.staffId === a.id).length;
        const bookingsB = bookingsWithStaff.filter((booking) => booking.staffId === b.id).length;
        return bookingsB - bookingsA;
      }),
    [bookingsWithStaff],
  );

  const calculateRowSpan = (startTimeValue: string, endTimeValue: string) => {
    const startTime = +new Date(`2000-01-01T${startTimeValue}:00`);
    const endTime = +new Date(`2000-01-01T${endTimeValue}:00`);
    const bookingDurationInHours = (endTime - startTime) / (60 * 60 * 1000); // Convert milliseconds to hours
    return Math.ceil(bookingDurationInHours);
  };
  return (
    <table className='booking_table'>
      <thead>
        <tr>
          <th>Time</th>
          {bookingsWithoutStaff?.length > 0 && <th>Unassign</th>}
          {sortedBookingsWithStaff.map((staff) => (
            <th key={staff.id} style={{ width: 300 }}>
              {staff.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((timeSlot) => (
          <tr key={timeSlot}>
            <td width={50} style={{ background: 'blue' }}>
              {timeSlot}
            </td>
            {/* // TODO */}
            {/* {bookingsWithoutStaff?.map((booking) => {
              if (booking.startTime <= timeSlot && booking.endTime > timeSlot) {
                return (
                  <td
                    key={`${booking.id}-${timeSlot}`}
                    rowSpan={calculateRowSpan(booking.startTime, booking.endTime)}
                    style={{ background: 'red', color: 'white' }}
                  >
                    {booking.title}
                  </td>
                );
              }
              return null;
            })} */}
            {sortedBookingsWithStaff.map((staff) => {
              const matchingBooking = bookingData.find(
                (booking) =>
                  booking.staffId === staff.id && booking.startTime <= timeSlot && booking.endTime > timeSlot,
              );

              if (matchingBooking) {
                if (timeSlot === matchingBooking.startTime) {
                  return (
                    <td
                      key={`${matchingBooking.id}-${timeSlot}`}
                      rowSpan={calculateRowSpan(matchingBooking.startTime, matchingBooking.endTime)}
                      style={{ background: 'red', color: 'white' }}
                    >
                      {matchingBooking.title}
                    </td>
                  );
                }
                return null;
              }
              return <td key={`${staff.id}-${timeSlot}`} />;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Home;
