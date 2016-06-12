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
    
$(".rc-calendar-table").find("td").each(function(i) {
     $(this).html('<div class="rc-calendar-date"><a class="link" href="#">Edit</a><p>5</p><div class="gray-section"><div class="occupied"><span>70</span>Occupied</div><div class="total"><span>70</span>Total seats</div></div><div class="gray-section2"><div class="total">Total seats <input type="text" ></div></div></div>');
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