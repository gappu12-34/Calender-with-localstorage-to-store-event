import React, { Component } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';

const scheduler = window.scheduler;

const localStorageKey = 'calendarEvents';

export default class Scheduler extends Component {
  componentDidMount() {
    scheduler.skin = 'material';
    scheduler.config.header = [
      'day',
      'week',
      'month',
      'date',
      'prev',
      'today',
      'next'
    ];
    scheduler.config.hour_date = '%g:%i %A';
    scheduler.xy.scale_width = 70;

    this.initSchedulerEvents();
    this.loadEventsFromLocalStorage(); // Load events from localStorage

    const { events } = this.props;
    scheduler.init(this.schedulerContainer, new Date(2023, 12, 12));
  //  scheduler.clearAll();
    scheduler.parse(events);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.timeFormatState !== nextProps.timeFormatState;
  }

  componentDidUpdate() {
    scheduler.render();
  }

  setHoursScaleFormat(state) {
    scheduler.config.hour_date = state ? '%H:%i' : '%g:%i %A';
    scheduler.templates.hour_scale = scheduler.date.date_to_str(
      scheduler.config.hour_date
    );
  }

  initSchedulerEvents() {
    const onDataUpdated = this.props.onDataUpdated;

    scheduler.attachEvent('onEventAdded', (id, ev) => {
      if (onDataUpdated) {
        onDataUpdated('create', ev, id);
        this.saveEventsToLocalStorage();
      }
    });

    scheduler.attachEvent('onEventChanged', (id, ev) => {
      if (onDataUpdated) {
        onDataUpdated('update', ev, id);
        this.saveEventsToLocalStorage();
      }
    });

    scheduler.attachEvent('onEventDeleted', (id, ev) => {
      if (onDataUpdated) {
        onDataUpdated('delete', ev, id);
        this.saveEventsToLocalStorage();
      }
    });
  }

  saveEventsToLocalStorage() {
    const events = scheduler.getEvents();
    localStorage.setItem(localStorageKey, JSON.stringify(events));
  }

  loadEventsFromLocalStorage() {
    const storedEvents = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    if (storedEvents.length > 0) {
      scheduler.parse(storedEvents);
    }
  }

  render() {
    const { timeFormatState } = this.props;
    this.setHoursScaleFormat(timeFormatState);
    return (
      <div
        ref={(input) => {
          this.schedulerContainer = input;
        }}
        style={{ width: '100%', height: '100%' }}
      ></div>
    );
  }
}
