import React from 'react';
import ReactDOM from 'react-dom';

import FullCalendar from 'rc-calendar/lib/FullCalendar';



import Select from 'rc-select';

function onSelect(value) {
  //console.log('select', dateFormatter.format(value));
}

const CalendarComponent = React.createClass({
  getInitialState() {
    return {
      type: 'date',
    };
  },
  onTypeChange(type) {
    this.setState({
      type,
    });
  },


  componentDidMount: function() {
    $(".rc-calendar-table").find("th").each(function(i) {
        $(this).html("<span class='rc-calendar-column-header'><input type='checkbox'>"+$(this).prop("title")+"</span>");
    });

  },
  render() {
    return (
      <div style={{ zIndex: 1000, position: 'relative' }}>
        
        <FullCalendar
          style={{ margin: 10 }}
          Select={Select}
          fullscreen
          onSelect={onSelect}
          type={this.state.type}
          onTypeChange={this.onTypeChange}
          
        />
      </div>
    );
  },
});

module.exports = CalendarComponent;