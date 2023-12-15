// HomePage.js
import React from 'react';
import Scheduler from './scheduler';

const HomePage = () => {
  // Sample events data
  const events = [
    { start_date: '2020-06-10 6:00', end_date: '2020-06-10 8:00', text: 'Event 1', id: 1 },
    { start_date: '2020-06-13 10:00', end_date: '2020-06-13 18:00', text: 'Event 2', id: 2 }
  ];

  return (
    <div>
      <h1>My Calendar Page</h1>
      <Scheduler events={events} />
      {/* Other content for your page */}
    </div>
  );
};

export default HomePage;
