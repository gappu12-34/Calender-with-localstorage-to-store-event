// App.js
// import React from 'react';
import React, { Component } from 'react';
import Scheduler from './components/scheduler';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
//import HomePage from './pages/HomePage';
import './App.css';


const localStorageKey = 'calendarEvents';

class App extends Component {
  state = {
    currentTimeFormatState: true,
    messages: [],
    events: [],
  };

  componentDidMount() {
    // Load events from localStorage 
    const storedEvents = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    this.setState({ events: storedEvents });
  }

  addMessage(message) {
    const maxLogLength = 5;
    const newMessage = { message };
    const messages = [
      newMessage,
      ...this.state.messages
    ];

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
    this.setState({ messages });
  }

  logDataUpdate = (action, ev, id) => {
    const text = ev && ev.text ? ` (${ev.text})` : '';
    const message = `event ${action}: ${id} ${text}`;
    this.addMessage(message);
  }

  handleTimeFormatStateChange = (state) => {
    this.setState({
      currentTimeFormatState: state
    });
  }

  handleEventUpdate = (updatedEvents) => {
    // Update state with the new events and save to localStorage
    this.setState({ events: updatedEvents }, () => {
      localStorage.setItem(localStorageKey, JSON.stringify(updatedEvents));
    });
  }

  render() {
    const { currentTimeFormatState, messages, events } = this.state;
    return (
      <div>
        <div className="tool-bar">
          <Toolbar
            timeFormatState={currentTimeFormatState}
            onTimeFormatStateChange={this.handleTimeFormatStateChange}
          />
        </div>
        <div className='scheduler-container'>
          <Scheduler
            events={events}
            timeFormatState={currentTimeFormatState}
            onDataUpdated={this.logDataUpdate}
            onEventUpdate={this.handleEventUpdate}
          />
        </div>
        <MessageArea
          messages={messages}
        />
      </div>
    );
  }
}

export default App;
