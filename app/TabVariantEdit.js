import { Tabs, Tab } from 'react-tab-view'
import React, { Component, PropTypes } from 'react'
var CalendarComponent = require("./calendarComponent.js")
var GregorianCalendar = require('gregorian-calendar');
var date1 = new GregorianCalendar(); // defaults to en_US
var moment = require("moment");
var now = new Date();
if (now.getMonth() == 11) {
    var current = new Date(now.getFullYear() + 2, 0, 1);
} else {
    var current = new Date(now.getFullYear(), now.getMonth() + 2, 1);
}
date1.setTime(current);

var date2 = new GregorianCalendar(); // defaults to en_US
var now = new Date();
if (now.getMonth() == 11) {
    var current = new Date(now.getFullYear() + 3, 0, 1);
} else {
    var current = new Date(now.getFullYear(), now.getMonth() + 3, 1);
}
date2.setTime(current);
var date = new GregorianCalendar(); // defaults to en_US
var now = new Date();
if (now.getMonth() == 11) {
    var current = new Date(now.getFullYear() + 1, 0, 1);
} else {
    var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
}
date.setTime(current);

var TabVariantEditComponent = React.createClass({
  getInitialState: function () {
   
    return {
     
      variantDates: {}
    }
  },
componentDidMount: function() {
    var urlparams = {

                    }
                    var data = {}
                    var clientInfo = this.props.config().getClientInfo();
                    var header = {};
                    var self = this;
     this.props.config().httpInterceptor(this.props.config().url().VARIANT, 'GET', data , header, this.props.config().getClientInfo()).then(
                function(result){
                  console.log(">>>>>>");
                  console.log(result.variants["152"]);
                  self.setState({
                    variantDates: result.variants["152"]
                  });
                  for(var item in result.variants["152"]){


                      $("[title='"+moment(item).format('YYYY-M-D')+"']").addClass("active");  
                      $("[title='"+moment(item).format('YYYY-M-D')+"'] .total").html(result.variants["152"][item].sold_count+"/"+result.variants["152"][item].capacity);
                    }
                },
                function(result){
                      let message = JSON.parse(result.responseText);
                     
                });
    console.log("======================");
    $(document).on("click",".weekday",function(e){
  console.log("sfasf");
     var self = e.target;
     console.log($(e.target).val());
     if($(e.target).is(":checked")){
      $(e.target).closest(".rc-calendar-table").find("td").each(function(i) {
        if(parseInt($(self).val()) == parseInt(moment($(this).prop("title")).isoWeekday())){
          console.log($(this).find("div").html());
          if($(this).find("p").hasClass("grey")){
            $(this).removeClass("active");
          }else{
            $(this).addClass("active");
          }
        }
    });  
     }else{
      $(e.target).closest(".rc-calendar-table").find("td").each(function(i) {
        if(parseInt($(self).val()) == parseInt(moment($(this).prop("title")).isoWeekday())){
         
          $(this).removeClass("active");
        }
    });
     }
    
});
    $(".rc-calendar-table").first().find("td").each(function(i) {
  console.log("step"+i);
      if(parseInt($(this).find("div").html()) < parseInt($(".rc-calendar-today").find("div").html())){
        $(this).html('<div class="rc-calendar-date"><a class="link" href="#">Edit</a><p class=" grey">'+$(this).find("div").html()+'</p></div>');
      }else{
        $(this).html('<div class="rc-calendar-date"><a class="link" href="#">Edit</a><p>'+$(this).find("div").html()+'</p><div class="gray-section"><div class="total">0/0</div></div><div class="gray-section2"><div class="total">Total seats <input type="text" ></div></div></div>');
      }
   
     
    });
    $(".rc-calendar-table:not(:first)").find("td").each(function(i) {
     
      
        $(this).html('<div class="rc-calendar-date"><a class="link" href="#">Edit</a><p>'+$(this).find("div").html()+'</p><div class="gray-section"><div class="total">0/0</div></div><div class="gray-section2"><div class="total">Total seats <input type="text" ></div></div></div>');
      
     
    });
    $(".patterns").on("click",function(e){

        $(".patterns").removeClass("active");
        $(".patterns").find("input").prop("checked",false);
        $(this).find("input").prop("checked","checked");
        $(this).addClass("active");
        $(".rc-calendar-table:first .rc-calendar-column-header input").each(function(i){
                if($(this).is(":checked")){
                    $(this).trigger("click"); 
                }
                  
            });

        $(".rc-calendar-table:first").find("td").removeClass("active");
        if($(this).data("pattern") == "1"){
            $(".rc-calendar-table:first .rc-calendar-column-header input").each(function(i){
                if(!$(this).is(":checked")){
                    $(this).trigger("click"); 
                }
                  
            });
        }else if($(this).data("pattern") == "2"){
            if(!$(".rc-calendar-table:first .rc-calendar-column-header input[value='7']").is(":checked")){
                $(".rc-calendar-table:first .rc-calendar-column-header input[value='7']").trigger("click");
            }
             if(!$(".rc-calendar-table:first .rc-calendar-column-header input[value='6']").is(":checked")){
                $(".rc-calendar-table:first .rc-calendar-column-header input[value='6']").trigger("click");
            }
        }else{
            if(!$(".rc-calendar-table:first .rc-calendar-column-header input[value='1']").is(":checked")){
                $(".rc-calendar-table:first .rc-calendar-column-header input[value='1']").trigger("click");
            }
              if(!$(".rc-calendar-table:first .rc-calendar-column-header input[value='2']").is(":checked")){
                $(".rc-calendar-table:first .rc-calendar-column-header input[value='2']").trigger("click");
            }
             if(!$(".rc-calendar-table:first .rc-calendar-column-header input[value='3']").is(":checked")){
                $(".rc-calendar-table:first .rc-calendar-column-header input[value='3']").trigger("click");
            }
             if(!$(".rc-calendar-table:first .rc-calendar-column-header input[value='4']").is(":checked")){
                $(".rc-calendar-table:first .rc-calendar-column-header input[value='4']").trigger("click");
            }
             if(!$(".rc-calendar-table:first .rc-calendar-column-header input[value='5']").is(":checked")){
                $(".rc-calendar-table:first .rc-calendar-column-header input[value='5']").trigger("click");
            }
        }
    })

  },
  render: function() {

    return (
      <div>
        <Tabs headers={["Edit Private tour variant"]}>
            
          <Tab>
            <div className="tab-content">
            <div className="tab-pane active" >
                <h3>Customize Dates & Seats</h3>
                <div className="seat-options">
                    <div className="item patterns" data-pattern="1">
                        <input type="radio" name="seat-option" id="cb1" />
                        <label for="cb1">All Days</label>
                        <input type="text" placeholder="Seats" />
                    </div>
                   <div className="item patterns" data-pattern="2">
                        <input type="radio" name="seat-option" id="cb2" />
                        <label for="cb2">All Weekends</label>
                        <input type="text" placeholder="Seats" />
                    </div>
                    <div className="item patterns" data-pattern="3">
                        <input type="radio" name="seat-option" id="cb3" />
                        <label for="cb3">All Weekdays</label>
                        <input type="text" placeholder="Seats" />
                    </div>
                    
                
                </div>
                 <div className="seat-options repeat-text">
                    <div className="item item-border">
                        <input type="checkbox" id="repeat_action" />
                        <label>Repeat for upcoming months</label>
                    </div>
                    
                
                </div>
                <div className="scroll-bar">
                    <div className="calendar">
                        <CalendarComponent month={date}/>
                    </div>
                    <div className="calendar">
                        <CalendarComponent month={date1} />
                    </div>
                    <div className="calendar">
                        <CalendarComponent month={date2} />
                    </div>
                </div>
                <h3>With Breakfast</h3>
                <p>Get your jungle gear on because it's time to go on an African Safari. </p>
                <p className="price-edit"> <input type="text" placeholder="Amount" /> per adult</p>
                <hr />
                <h3>Without Breakfast</h3>
                <p>Get your jungle gear on because it's time to go on an African Safari. </p>
                <p className="price-edit"> <input type="text" placeholder="Amount" /> per adult</p>
                <p className="price-edit"> <input type="text" placeholder="Amount" /> per infant</p>
                <hr />
                <p></p>
                <button className="btn btn-secondary">Update Changes</button>
                
                <button className="btn btn-cancel">Cancel</button>
              
            </div>
          </div>

        </Tab>    
        
       
        </Tabs>
        
      </div>
    )
  }
});



module.exports = TabVariantEditComponent;