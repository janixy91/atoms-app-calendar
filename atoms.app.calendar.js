(function(){"use strict";var __hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child},__indexOf=[].indexOf||function(item){for(var i=0,l=this.length;l>i;i++)if(i in this&&this[i]===item)return i;return-1};__.Extension.Calendar={},__.Extension.Calendar.Day=function(_super){function Day(){return Day.__super__.constructor.apply(this,arguments)}return __extends(Day,_super),Day.template='<span class="{{style}}{{^events}} disabled{{/events}}{{#today}} today{{/today}}{{#active}} active{{/active}}{{#if.event}} event{{/if.event}}{{#if.month}} month{{/if.month}}">{{day}}</span>',Day.base="Day",Day.events=["touch"],Day.prototype.setEvent=function(value){return this.attributes.event=value,this.el.addClass("event")},Day.prototype.removeEvent=function(){return delete this.attributes.event,this.el.removeClass("event")},Day}(Atoms.Class.Atom),Atoms.Molecule.Calendar=function(_super){function Calendar(attributes){var key,_i,_len,_ref;for(null==attributes&&(attributes={}),_ref=["months","days"],_i=0,_len=_ref.length;_len>_i;_i++)key=_ref[_i],attributes[key]||(attributes[key]=this.constructor["default"][key]);Calendar.__super__.constructor.call(this,attributes),this.events={},this.today=new Date,this.today=new Date(this.today.getFullYear(),this.today.getMonth(),this.today.getDate()),this.date(new Date(attributes.date||this.today))}return __extends(Calendar,_super),Calendar["extends"]=!0,Calendar.available=["Atom.Day","Molecule.Div"],Calendar.events=["select"],Calendar["default"]={months:["January","February","March","April","May","June","July","August","September","October","November","December"],days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],children:[{"Molecule.Div":{id:"header",children:[{"Atom.Button":{icon:"angle-left",style:"transparent",callbacks:["onPreviousMonth"]}},{"Atom.Heading":{id:"literal",value:"Year",size:"h4"}},{"Atom.Button":{icon:"angle-right",style:"transparent",callbacks:["onNextMonth"]}}]}}]},Calendar.child_class="App.Extension.Calendar.Day",Calendar.prototype.refresh=function(){return Calendar.__super__.refresh.apply(this,arguments),this.date(new Date(this.attributes.date||this.today))},Calendar.prototype.date=function(current){return this.current=null!=current?current:new Date,this._showMonth(this.current)},Calendar.prototype.setEvent=function(values,data){var value,_i,_len,_ref,_results;for(null==data&&(data={}),Array.isArray(values)||(values=[values]),_results=[],_i=0,_len=values.length;_len>_i;_i++)value=values[_i],this.events[value]=data,_results.push(null!=(_ref=this._find(value))&&"function"==typeof _ref.setEvent?_ref.setEvent(data):void 0);return _results},Calendar.prototype.removeEvent=function(values){var value,_i,_len,_ref,_results;for(Array.isArray(values)||(values=[values]),_results=[],_i=0,_len=values.length;_len>_i;_i++)value=values[_i],delete this.events[value],_results.push(null!=(_ref=this._find(value))&&"function"==typeof _ref.removeEvent?_ref.removeEvent():void 0);return _results},Calendar.prototype.removeAllEvents=function(){return this.events=[],this.date(this.current)},Calendar.prototype.onPreviousMonth=function(){return this._showMonth(this._previousMonth()),!1},Calendar.prototype.onNextMonth=function(){return this._showMonth(this._nextMonth()),!1},Calendar.prototype.onDayTouch=function(event,atom){var _ref;return null!=(_ref=atom.el.addClass("active").siblings())&&_ref.removeClass("active"),atom.attributes.date.getMonth()!==this.current.getMonth()?this.date(atom.attributes.date):this.current=atom.attributes.date,this.bubble("select",atom),!1},Calendar.prototype._showMonth=function(date){var child,day,first_day_of_month,index,key,last_day_of_month,previous_days,previous_month,values,_i,_j,_k,_l,_len,_len1,_len2,_m,_n,_ref,_ref1,_ref2,_ref3,_results;for(this.year=date.getFullYear(),this.month=date.getMonth(),this.header.literal.el.html(""+this.attributes.months[this.month]+" <small>"+this.year+"</small>"),_ref=["disabled","disable_previous_days"],_i=0,_len=_ref.length;_len>_i;_i++)key=_ref[_i],this.el.removeClass(key);for(this.attributes.disabled&&this.el.addClass("disabled"),this.attributes.disable_previous_days&&this.month===(new Date).getMonth()&&this.el.addClass("disable_previous_days"),_ref1=this.children,_j=0,_len1=_ref1.length;_len1>_j;_j++)child=_ref1[_j],"Day"===child.constructor.name&&child.destroy();for(this.children=[this.children[0]],_ref2=this.attributes.days,_k=0,_len2=_ref2.length;_len2>_k;_k++)day=_ref2[_k],this.appendChild(this.constructor.child_class,{day:day,summary:!0});for(first_day_of_month=new Date(this.year,this.month).getDay()-1,0>first_day_of_month&&(first_day_of_month=6),previous_month=this._previousMonth(),previous_days=this._daysInMonth(previous_month)-(first_day_of_month-1),day=_l=0;first_day_of_month>=0?first_day_of_month>_l:_l>first_day_of_month;day=first_day_of_month>=0?++_l:--_l)this.appendChild(this.constructor.child_class,{day:previous_days,current:!1}),previous_days++;for(day=_m=1,_ref3=this._daysInMonth(date);_ref3>=1?_ref3>=_m:_m>=_ref3;day=_ref3>=1?++_m:--_m)date=new Date(this.year,this.month,day),values={day:day,date:date,month:!0,today:this.today.toString().substring(4,15)===date.toString().substring(4,15),active:this.current.toString().substring(4,15)===date.toString().substring(4,15)},null!=this.events[date]&&(values.event=this.events[date]),this._active(date)&&(values.events=["touch"]),this.appendChild(this.constructor.child_class,values);for(last_day_of_month=new Date(this.year,this.month,this._daysInMonth(date)).getDay(),day=1,_results=[],index=_n=6;last_day_of_month>=6?last_day_of_month>=_n:_n>=last_day_of_month;index=last_day_of_month>=6?++_n:--_n)this.appendChild(this.constructor.child_class,{day:day,current:!1}),_results.push(day++);return _results},Calendar.prototype._previousMonth=function(){return new Date(this.year,this.month-1,1)},Calendar.prototype._nextMonth=function(){return new Date(this.year,this.month+1,1)},Calendar.prototype._daysInMonth=function(date){return 32-new Date(date.getYear(),date.getMonth(),32).getDate()},Calendar.prototype._find=function(date){var day,_i,_len,_ref;for(_ref=this.children,_i=0,_len=_ref.length;_len>_i;_i++)if(day=_ref[_i],date-day.attributes.date===0)return day},Calendar.prototype._active=function(date){var format_date;return this.attributes.disable_previous_days&&date<this.today?!1:(format_date=this._format(date),null!=this.attributes.available&&__indexOf.call(this.attributes.available,format_date)<0?!1:null!=this.attributes.from&&this.attributes.from>format_date?!1:null!=this.attributes.to&&this.attributes.to<format_date?!1:!0)},Calendar.prototype._format=function(date){var day,month,str;return date=new Date(date),str=""+date.getFullYear()+"/",month=date.getMonth()+1,str+=10>month?"0"+month+"/":""+month+"/",day=date.getDate(),str+=10>day?"0"+day:""+day},Calendar}(Atoms.Molecule.Div)}).call(this);