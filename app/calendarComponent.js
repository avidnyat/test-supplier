import React from 'react';
import ReactDOM from 'react-dom';

import FullCalendar from 'rc-calendar/lib/FullCalendar';

var moment = require("moment");

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
    $(".rc-calendar-next-month-btn-day").hide();
    $(".rc-calendar-full-header-switcher").hide();
    $(".rc-calendar-table").first().find("th").each(function(i) {
        var weekday = (i==0)?7:i;
        $(this).html("<span class='rc-calendar-column-header'><input type='checkbox' value='"+weekday+"' class='weekday'>"+$(this).prop("title")+"</span>");
    });
    $(".rc-calendar-table:not(:first):not(:last)").find("th").each(function(i) {
        var weekday = (i==0)?7:i;
        $(this).html("<span class='rc-calendar-column-header'><input type='checkbox' value='"+weekday+"' class='weekday'>"+$(this).prop("title")+"</span>");
    });
    $(".rc-calendar-table").last().find("th").each(function(i) {
        var weekday = (i==0)?7:i;
        $(this).html("<span class='rc-calendar-column-header'><input type='checkbox' value='"+weekday+"' class='weekday'>"+$(this).prop("title")+"</span>");
    });
    



$(document).off("click","td").on("click","td",function(e){
    if(moment($(this).prop("title")).unix() >= moment($(".rc-calendar-today").prop("title")).unix()){
        if(!$(e.target).closest("td").hasClass("active")){
          console.log($(e.target));
          $(e.target).closest("td").addClass("active");
        }
      }
    });
  },
  render() {
    return (
      <div style={{ zIndex: 1000, position: 'relative' }}>
        
        <FullCalendar
          style={{ margin: 10 }}
          Select={Select}
          value={this.props.month}
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