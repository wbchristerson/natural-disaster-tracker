(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[7],{621:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var i=n(44),s=n(20),r=n(159),a=n(1),o=n.n(a),c=n(620),d=function(e){var t=e.name,n=e.text,a=Object(r.a)(e,["name","text"]),o=t?"https://coreui.io/react/docs/components/".concat(t):e.href;return Object(s.jsx)("div",{className:"card-header-actions",children:Object(s.jsx)(c.eb,Object(i.a)(Object(i.a)({},a),{},{href:o,rel:"noreferrer noopener",target:"_blank",className:"card-header-action",children:Object(s.jsx)("small",{className:"text-muted",children:n||"docs"})}))})},l=o.a.memo(d)},622:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var i=n(624);function s(e,t){if(e){if("string"===typeof e)return Object(i.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(i.a)(e,t):void 0}}},623:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var i=n(622);function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],i=!0,s=!1,r=void 0;try{for(var a,o=e[Symbol.iterator]();!(i=(a=o.next()).done)&&(n.push(a.value),!t||n.length!==t);i=!0);}catch(c){s=!0,r=c}finally{try{i||null==o.return||o.return()}finally{if(s)throw r}}return n}}(e,t)||Object(i.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},624:function(e,t,n){"use strict";function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}n.d(t,"a",(function(){return i}))},627:function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"a",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"b",(function(){return c})),n.d(t,"j",(function(){return l})),n.d(t,"k",(function(){return u})),n.d(t,"i",(function(){return h})),n.d(t,"e",(function(){return b})),n.d(t,"f",(function(){return j})),n.d(t,"u",(function(){return m})),n.d(t,"s",(function(){return p})),n.d(t,"q",(function(){return f})),n.d(t,"t",(function(){return O})),n.d(t,"r",(function(){return x})),n.d(t,"l",(function(){return g})),n.d(t,"n",(function(){return y})),n.d(t,"m",(function(){return W})),n.d(t,"g",(function(){return N})),n.d(t,"h",(function(){return C})),n.d(t,"o",(function(){return S})),n.d(t,"p",(function(){return k}));var i=n(623),s=n(622);var r="user_access_token",a="No data available from witness reports",o="observer_database_id",c=["Please select","Earthquake","Flood","Wildfire","Tornado","Hurricane","Tsunami","Landslide","Avalanche","Volcano","Other"],d=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function l(e){var t,n=function(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=Object(s.a)(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,c=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return o=e.done,e},e:function(e){c=!0,a=e},f:function(){try{o||null==n.return||n.return()}finally{if(c)throw a}}}}(document.cookie.split(";"));try{for(n.s();!(t=n.n()).done;){var i=t.value.split("=");if((i[0]+"").trim()===e)return i[1]}}catch(r){n.e(r)}finally{n.f()}return""}function u(){return"https://sample-will.herokuapp.com"}function h(){return"https://sample-will.herokuapp.com"}function b(e){return e||a}function j(e){var t=Object(i.a)(e,2),n=t[0],s=t[1];return Math.abs(n)+"\xb0 "+(n>=0?"N":"S")+", "+(Math.abs(s)+"\xb0 "+(s>=0?"E":"W"))}function m(e){if(!/^\s*\d?\d:\d\d(:\d\d)?\s*$/.test(e))return!1;e.trim();var t=parseInt(":"==e.charAt(1)?e.slice(0,1):e.slice(0,2)),n=parseInt(":"==e.charAt(1)?e.slice(2,4):e.slice(3,5)),i=e.length>5?parseInt(":"==e.charAt(1)?e.slice(5,7):e.slice(6,8)):null;return 0<=t&&t<24&&0<=n&&n<60&&0<=i&&i<60}function p(e){return/^\s*\d+\s*$/.test(e)}function f(e){if(!/^\s*-?0*\d\d?\d?(\.\d*)?\s*$/.test(e))return!1;var t=parseInt(e);return-180<=t&&t<=180}function O(e,t,n){if(!/^\s*\d+\s*$/.test(e))return!1;var i=parseInt(e);return t<=i&&i<=n}function x(e){return/^\s*.*(\.jpg|\.jpeg|\.png)\s*$/.test(e)}function g(e){var t=e.trim();return 4==t.length?"0"+t+":00":5==t.length?t+":00":t}function v(e){var t=e.split(" "),n=Object(i.a)(t,6),s=(n[0],n[1]),r=n[2],a=n[3],o=n[4],c=(n[5],o.split(":")),l=Object(i.a)(c,3),u=l[0],h=l[1],b=l[2],j=(d.indexOf(r)+1).toString()+"/"+s+"/"+a;return new Date(j+" "+(u+":"+h+":"+b+" UTC"))}function w(e,t){for(var n=e.toString(),i=n,s=0;s<t-n.length;s++)i="0"+i;return i}function y(e){var t=v(e);return w(t.getHours(),2)+":"+w(t.getMinutes(),2)+":"+w(t.getSeconds(),2)}function W(e){var t=v(e),n=w(t.getMonth()+1,2),i=w(t.getDate(),2);return w(t.getFullYear(),2)+"-"+n+"-"+i}function N(e,t){return"A failure occurred. The ability to ".concat(e," requires admin \n    privileges and it looks like those have not been granted to you. If you \n    would like admin privileges, please ").concat(401==t?"create an account by signing up (for free!) and":""," email me at \n    wbchristerson@gmail.com with your username.")}function C(e){var t=l(r);return"Please note that the ability to ".concat(e," requires admin privileges. If you do \n    not have admin privileges and would like them, please ").concat(t?"":"create an account by signing up (for free!) and"," email me at wbchristerson@gmail.com with\n    your username.")}function S(e){return"Note that you must be logged-in to ".concat(e,". If you do not \n    have an account, you can create one for free by signing up.")}function k(e){return"A failure occurred. You must be logged-in to ".concat(e,". You can\n     create an account (for free!) by signing up.")}},688:function(e,t,n){"use strict";n.r(t);var i=n(20),s=n(162),r=n(163),a=n(165),o=n(164),c=n(1),d=n.n(c),l=n(620),u=n(625),h=(n(621),n(627)),b=function(e){Object(a.a)(n,e);var t=Object(o.a)(n);function n(e){var i;return Object(s.a)(this,n),(i=t.call(this,e)).state={page:1,average_severity:null,disaster_type:null,first_observance:null,id:e.location.search.substring(4),informal_name:null,is_ongoing:!1,last_observance:null,location:null,num_reports:0,official_name:null,people_affected:0,reports:[],witnessReportFormVisible:!1,newWitnessedDate:"",newWitnessedTime:"",newWitnessedNumPeople:"",newWitnessedLatitude:"",newWitnessedLongitude:"",newWitnessedSeverity:"",newWitnessedImageURL:"",newWitnessedComment:"",witnessedDateValid:!0,witnessedTimeValid:!0,witnessedNumPeopleValid:!0,witnessedLatitudeValid:!0,witnessedLongitudeValid:!0,witnessedSeverityValid:!0,witnessedImageURLValid:!0,confirmationModalReportId:null,isModalOpen:!1,isWitnessReportModalOpen:!1,isDeletionModalOpen:!1,authorizationFailure:null},i.backEndHost=Object(h.i)(),i.frontEndHost=Object(h.k)(),i.disasterId=parseInt(i.props.location.search.substring(4)),i}return Object(r.a)(n,[{key:"componentDidMount",value:function(){this.fetchDisasterInformation(this.disasterId)}},{key:"fetchDisasterInformation",value:function(e){var t=this;fetch("".concat(this.backEndHost,"/api/disasters/").concat(e,"?page=").concat(this.state.page)).then((function(e){return e.json()})).then((function(e){t.setState({average_severity:e.average_severity,disaster_type:e.disaster_type,first_observance:e.first_observance,last_observance:e.last_observance,informal_name:e.informal_name,is_ongoing:e.is_ongoing,location:e.location,num_reports:e.num_reports,official_name:e.official_name,people_affected:e.people_affected,reports:e.reports})})).catch((function(t){console.log("Error fetching disaster with id ",e),console.log(t)}))}},{key:"setWitnessReportFormVisible",value:function(e){this.setState({witnessReportFormVisible:e})}},{key:"onNewWitnessedDateChange",value:function(e){this.setState({newWitnessedDate:e.target.value})}},{key:"onNewWitnessedTimeChange",value:function(e){this.setState({newWitnessedTime:e.target.value})}},{key:"onNewWitnessedNumPeopleChange",value:function(e){this.setState({newWitnessedNumPeople:e.target.value})}},{key:"onNewWitnessedLatitudeChange",value:function(e){this.setState({newWitnessedLatitude:e.target.value})}},{key:"onNewWitnessedLongitudeChange",value:function(e){this.setState({newWitnessedLongitude:e.target.value})}},{key:"onNewWitnessedSeverityChange",value:function(e){this.setState({newWitnessedSeverity:e.target.value})}},{key:"onNewWitnessedImageURLChange",value:function(e){var t=e.target.value;t.length>250&&(t=t.substring(0,250)),this.setState({newWitnessedImageURL:t})}},{key:"onNewWitnesseedCommentChange",value:function(e){var t=e.target.value;t.length>500&&(t=t.substring(0,500)),this.setState({newWitnessedComment:t})}},{key:"clearWitnessReportForm",value:function(){this.setState({newWitnessedDate:"",newWitnessedTime:"",newWitnessedNumPeople:"",newWitnessedLatitude:"",newWitnessedLongitude:"",newWitnessedSeverity:"",newWitnessedImageURL:"",newWitnessedComment:"",witnessedDateValid:!0,witnessedTimeValid:!0,witnessedNumPeopleValid:!0,witnessedLatitudeValid:!0,witnessedLongitudeValid:!0,witnessedSeverityValid:!0,witnessedImageURLValid:!0})}},{key:"onNewWitnessReportSubmit",value:function(){var e=this,t=this.state,n=t.id,i=t.newWitnessedDate,s=t.newWitnessedTime,r=t.newWitnessedNumPeople,a=t.newWitnessedLatitude,o=t.newWitnessedLongitude,c=t.newWitnessedSeverity,d=t.newWitnessedImageURL,l=t.newWitnessedComment,u=!0,b=!0,j=!0,m=!0,p=!0,f=!0,O=!0;""==i&&(u=!1),Object(h.u)(s)||(b=!1),Object(h.s)(r)||(j=!1),Object(h.q)(a)||(m=!1),Object(h.q)(o)||(p=!1),""==c||Object(h.t)(c,0,10)||(f=!1),""==d||Object(h.r)(d)||(O=!1),this.setState({witnessedDateValid:u,witnessedTimeValid:b,witnessedNumPeopleValid:j,witnessedLatitudeValid:m,witnessedLongitudeValid:p,witnessedSeverityValid:f,witnessedImageURLValid:O}),u&&b&&j&&m&&p&&f&&O&&fetch("".concat(this.backEndHost,"/api/witnessreports"),{method:"POST",body:JSON.stringify({disaster_id:this.state.id,observer_id:Object(h.j)(h.c),event_datetime:new Date(i+"T"+Object(h.l)(s)),severity:c?parseInt(c.trim()):null,image_url:d?d.trim():null,comment:l?l.trim():null,people_affected:parseInt(r.trim()),location_latitude:parseFloat(a.trim()),location_longitude:parseFloat(o.trim())}),contentType:"application/json",headers:{"Content-Type":"application/json",Authorization:"Bearer "+Object(h.j)(h.d)}}).then((function(e){return e.json()})).then((function(t){401!=t.error||t.success||"authorization issue - 401 Unauthorized: The server could not verify that you are authorized to access the URL requested. You either supplied the wrong credentials (e.g. a bad password), or your browser doesn't understand how to supply the credentials required."!=t.message?(e.clearWitnessReportForm(),e.setState({witnessReportFormVisible:!1}),e.fetchDisasterInformation(e.state.id)):e.setState({AuthorizationFailure:401,isWitnessReportModalOpen:!0})})).catch((function(e){console.log("Error fetching disaster with id ",n),console.log(e)}))}},{key:"getAddWitnessReportForm",value:function(){var e=this,t=this.state,n=t.newWitnessedDate,s=t.newWitnessedTime,r=t.witnessedDateValid,a=t.witnessedTimeValid,o=t.witnessedNumPeopleValid,c=t.witnessedLatitudeValid,d=t.witnessedLongitudeValid,b=t.witnessedSeverityValid,j=t.witnessedImageURLValid,m=Object(h.j)(h.d),p=!m||""==m;return Object(i.jsxs)(l.k,{children:[Object(i.jsxs)(l.o,{children:[Object(i.jsxs)("div",{className:"individual-disaster-header-block",children:[Object(i.jsx)("h4",{className:"with-no-bottom-margin",children:"New Witness Report"}),Object(i.jsx)(l.g,{onClick:function(){return e.setWitnessReportFormVisible(!1)}})]}),p&&Object(i.jsx)("div",{className:"top-information-text",children:Object(h.o)("add witness reports")})]}),Object(i.jsx)(l.l,{children:Object(i.jsxs)(l.K,{action:"",method:"post",encType:"multipart/form-data",className:"form-horizontal",children:[Object(i.jsxs)(l.L,{row:!0,children:[Object(i.jsx)(l.v,{md:"3",children:Object(i.jsx)(l.db,{htmlFor:"date-input",children:"Date Witnessed"})}),Object(i.jsxs)(l.v,{xs:"12",md:"9",children:[r&&Object(i.jsx)(l.T,{type:"date",id:"date-input",name:"date-input",placeholder:"date",value:n,onChange:this.onNewWitnessedDateChange.bind(this)}),!r&&Object(i.jsx)(l.T,{invalid:!0,type:"date",id:"date-input",name:"date-input",placeholder:"date",value:n,onChange:this.onNewWitnessedDateChange.bind(this)}),Object(i.jsx)(l.bb,{children:"Date provided is blank"}),Object(i.jsx)(l.M,{children:"Date of the report"})]})]}),Object(i.jsxs)(l.L,{row:!0,children:[Object(i.jsx)(l.v,{md:"3",children:Object(i.jsx)(l.db,{htmlFor:"time-text-input",children:"Time (HH:MM:SS)"})}),Object(i.jsxs)(l.v,{xs:"12",md:"9",children:[a&&Object(i.jsx)(l.T,{required:!0,id:"time-text-input",name:"time-text-input",placeholder:"HH:MM:SS",onChange:this.onNewWitnessedTimeChange.bind(this),value:s}),!a&&Object(i.jsx)(l.T,{required:!0,invalid:!0,id:"time-text-input",name:"time-text-input",placeholder:"HH:MM:SS",onChange:this.onNewWitnessedTimeChange.bind(this),value:s}),Object(i.jsx)(l.bb,{children:"Time provided is blank or format is not recognized"}),Object(i.jsx)(l.M,{children:"Time of the disaster in hours, minutes, and optional seconds format"})]})]}),Object(i.jsxs)(l.L,{row:!0,children:[Object(i.jsx)(l.v,{md:"3",children:Object(i.jsx)(l.db,{htmlFor:"people-affected-text-input",children:"Number Of People Affected"})}),Object(i.jsxs)(l.v,{xs:"12",md:"9",children:[o&&Object(i.jsx)(l.T,{id:"people-affected-text-input",name:"people-affected-text-input",placeholder:"0",onChange:this.onNewWitnessedNumPeopleChange.bind(this),value:this.state.newWitnessedNumPeople}),!o&&Object(i.jsx)(l.T,{invalid:!0,id:"people-affected-text-input",name:"people-affected-text-input",placeholder:"0",onChange:this.onNewWitnessedNumPeopleChange.bind(this),value:this.state.newWitnessedNumPeople}),Object(i.jsx)(l.bb,{children:"Number of people affected is blank or format is not recognized"}),Object(i.jsx)(l.M,{children:"Estimate of number of people affected"})]})]}),Object(i.jsxs)(l.L,{row:!0,children:[Object(i.jsx)(l.v,{md:"3",children:Object(i.jsx)(l.db,{htmlFor:"latitude-text-input",children:"Location Latitude"})}),Object(i.jsxs)(l.v,{xs:"12",md:"9",children:[c&&Object(i.jsx)(l.T,{id:"latitude-text-input",name:"latitude-text-input",placeholder:"0.00",onChange:this.onNewWitnessedLatitudeChange.bind(this),value:this.state.newWitnessedLatitude}),!c&&Object(i.jsx)(l.T,{invalid:!0,id:"latitude-text-input",name:"latitude-text-input",placeholder:"0.00",onChange:this.onNewWitnessedLatitudeChange.bind(this),value:this.state.newWitnessedLatitude}),Object(i.jsx)(l.bb,{children:"Location latitude is blank or format is not recognized"}),Object(i.jsx)(l.M,{children:"Signed latitude of disaster"})]})]}),Object(i.jsxs)(l.L,{row:!0,children:[Object(i.jsx)(l.v,{md:"3",children:Object(i.jsx)(l.db,{htmlFor:"longitude-text-input",children:"Location Longitude"})}),Object(i.jsxs)(l.v,{xs:"12",md:"9",children:[d&&Object(i.jsx)(l.T,{id:"longitude-text-input",name:"longitude-text-input",placeholder:"0.00",onChange:this.onNewWitnessedLongitudeChange.bind(this),value:this.state.newWitnessedLongitude}),!d&&Object(i.jsx)(l.T,{invalid:!0,id:"longitude-text-input",name:"longitude-text-input",placeholder:"0.00",onChange:this.onNewWitnessedLongitudeChange.bind(this),value:this.state.newWitnessedLongitude}),Object(i.jsx)(l.bb,{children:"Location longitude is blank or format is not recognized"}),Object(i.jsx)(l.M,{children:"Signed longitude of disaster"})]})]}),Object(i.jsxs)(l.L,{row:!0,children:[Object(i.jsx)(l.v,{md:"3",children:Object(i.jsx)(l.db,{htmlFor:"severity-text-input",children:"Severity (optional)"})}),Object(i.jsxs)(l.v,{xs:"12",md:"9",children:[b&&Object(i.jsx)(l.T,{id:"severity-text-input",name:"severity-text-input",placeholder:"0",onChange:this.onNewWitnessedSeverityChange.bind(this),value:this.state.newWitnessedSeverity}),!b&&Object(i.jsx)(l.T,{invalid:!0,id:"severity-text-input",name:"severity-text-input",placeholder:"0",onChange:this.onNewWitnessedSeverityChange.bind(this),value:this.state.newWitnessedSeverity}),Object(i.jsx)(l.bb,{children:"Format of severity is not recognized or out of range"}),Object(i.jsx)(l.M,{children:"Severity of disaster on a scale of 0 to 10, integral values only"})]})]}),Object(i.jsxs)(l.L,{row:!0,children:[Object(i.jsx)(l.v,{md:"3",children:Object(i.jsx)(l.db,{htmlFor:"image-url-text-input",children:"Image URL (optional)"})}),Object(i.jsxs)(l.v,{xs:"12",md:"9",children:[j&&Object(i.jsx)(l.T,{id:"image-url-text-input",name:"image-url-text-input",placeholder:"Text",onChange:this.onNewWitnessedImageURLChange.bind(this),value:this.state.newWitnessedImageURL}),!j&&Object(i.jsx)(l.T,{invalid:!0,id:"image-url-text-input",name:"image-url-text-input",placeholder:"Text",onChange:this.onNewWitnessedImageURLChange.bind(this),value:this.state.newWitnessedImageURL}),Object(i.jsx)(l.bb,{children:"Format of image URL is not recognized"}),Object(i.jsx)(l.M,{children:"Image of disaster (must be hosted on Internet already)"})]})]}),Object(i.jsxs)(l.L,{row:!0,children:[Object(i.jsx)(l.v,{md:"3",children:Object(i.jsx)(l.db,{htmlFor:"textarea-input",children:"Comment (optional)"})}),Object(i.jsx)(l.v,{xs:"12",md:"9",children:Object(i.jsx)(l.Mb,{name:"textarea-input",id:"textarea-input",rows:"9",placeholder:"Content...",onChange:this.onNewWitnesseedCommentChange.bind(this),value:this.state.newWitnessedComment})})]})]})}),Object(i.jsxs)(l.m,{children:[Object(i.jsxs)(l.f,{type:"submit",size:"sm",color:"primary",onClick:this.onNewWitnessReportSubmit.bind(this),children:[Object(i.jsx)(u.a,{name:"cil-scrubber"})," Submit"]}),Object(i.jsxs)(l.f,{type:"reset",size:"sm",color:"danger",onClick:this.clearWitnessReportForm.bind(this),children:[Object(i.jsx)(u.a,{name:"cil-ban"})," Reset"]})]})]})}},{key:"initiateDeleteConfirmation",value:function(e){this.setState({confirmationModalReportId:e,isModalOpen:!0})}},{key:"onModalClose",value:function(){this.setState({confirmationModalReportId:null,isModalOpen:!1})}},{key:"onWitnessReportModalClose",value:function(){this.setState({isWitnessReportModalOpen:!1})}},{key:"onDeletionModalClose",value:function(){this.setState({isDeletionModalOpen:!1,authorizationFailure:null})}},{key:"onConfirmedDelete",value:function(){var e=this;fetch("".concat(this.backEndHost,"/api/witnessreports/").concat(this.state.confirmationModalReportId),{method:"DELETE",contentType:"application/json",headers:{"Content-Type":"application/json",Authorization:"Bearer "+Object(h.j)(h.d)}}).then((function(e){return e.json()})).then((function(t){console.log(t),401!=t.error||"authorization issue - 401 Unauthorized: The server could not verify that you are authorized to access the URL requested. You either supplied the wrong credentials (e.g. a bad password), or your browser doesn't understand how to supply the credentials required."!=t.message||t.success?403!=t.error||"authorization incorrect permission - 403 Forbidden: You don't have the permission to access the requested resource. It is either read-protected or not readable by the server."!=t.message||t.success?(e.onModalClose(),e.fetchDisasterInformation(e.disasterId)):e.setState({isDeletionModalOpen:!0,authorizationFailure:403}):e.setState({isDeletionModalOpen:!0,authorizationFailure:401})})).catch((function(t){console.log("Error fetching disaster with id ",e.disasterId),console.log(t)})),this.onModalClose()}},{key:"render",value:function(){var e=this,t=this.state,n=t.average_severity,s=t.disaster_type,r=t.first_observance,a=t.last_observance,o=t.is_ongoing,c=t.location,d=t.num_reports,b=t.people_affected,j=t.witnessReportFormVisible,m=t.authorizationFailure,p=[{disasterField:"Average Severity",disasterValue:Object(h.e)(n)},{disasterField:"Disaster Type",disasterValue:s?s.charAt(0).toUpperCase()+s.slice(1):h.a},{disasterField:"First Observance",disasterValue:Object(h.e)(r)},{disasterField:"Last Observance",disasterValue:Object(h.e)(a)},{disasterField:"Location",disasterValue:c?Object(h.f)(c):h.a},{disasterField:"Number Of Reports",disasterValue:d},{disasterField:"People Affected",disasterValue:Object(h.e)(b)}];return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(l.xb,{children:Object(i.jsx)(l.v,{xs:"12",children:Object(i.jsxs)(l.k,{children:[Object(i.jsx)(l.o,{className:"disaster-header",children:Object(i.jsxs)(l.fb,{children:[Object(i.jsx)("div",{className:"card-header-actions",children:Object(i.jsx)(l.b,{className:"mr-1 float-right",color:"".concat(o?"danger":"success"),children:"".concat(o?"On-Going":"Not On-Going")})}),Object(i.jsxs)(l.gb,{action:!0,active:!0,children:[Object(i.jsxs)("div",{className:"individual-disaster-header-block",children:[Object(i.jsx)("h2",{children:this.state.informal_name}),Object(i.jsx)("h2",{children:this.state.official_name})]}),Object(i.jsxs)("div",{className:"individual-disaster-header-block",children:[Object(i.jsx)("h6",{children:"Informal Name"}),Object(i.jsx)("h6",{children:"Official Name"})]})]})]})}),Object(i.jsxs)(l.l,{children:[p.map((function(e){return Object(i.jsx)(l.K,{children:Object(i.jsxs)(l.L,{row:!0,children:[Object(i.jsx)(l.v,{md:"3",className:"disaster-data-text",children:Object(i.jsx)(l.db,{children:e.disasterField})}),Object(i.jsx)(l.v,{xs:"12",md:"9",children:Object(i.jsx)("p",{className:"form-control-static disaster-data-text",children:e.disasterValue})})]})},e.disasterField)})),Object(i.jsx)(l.f,{block:!0,className:"btn btn-primary btn-lg btn-block inner-button",color:"primary",onClick:function(){return e.setWitnessReportFormVisible(!j)},children:j?"Close Form":"Add Witness Report"}),Object(i.jsx)(l.w,{className:"with-top-padding",show:j,children:this.getAddWitnessReportForm()})]})]})})}),this.state.reports.map((function(t,n){return Object(i.jsx)(l.xb,{children:Object(i.jsx)(l.v,{xs:"12",sm:"12",md:"12",children:Object(i.jsxs)(l.k,{children:[Object(i.jsx)(l.o,{}),t.image_url&&Object(i.jsx)("img",{className:"d-block w-100 set-disaster-max-height",src:t.image_url,alt:"slide 1"}),Object(i.jsxs)(l.l,{children:[Object(i.jsx)("table",{className:"table table-hover table-outline mb-0 d-none d-sm-table",children:Object(i.jsx)("tbody",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{className:"text-center",children:Object(i.jsxs)("div",{className:"c-avatar",children:[Object(i.jsx)("img",{src:t.user_photograph_url,className:"c-avatar-img",alt:""+t.username}),Object(i.jsx)("span",{className:"c-avatar-status bg-success"})]})}),Object(i.jsxs)("td",{children:[Object(i.jsx)("div",{children:t.username}),Object(i.jsxs)("div",{className:"small text-muted",children:[Object(i.jsx)("span",{children:"New"})," | Registered: Jan 1, 2015"]})]}),Object(i.jsx)("td",{className:"text-center",children:Object(i.jsx)(u.a,{height:25,name:"cif-us",title:"us",id:"us"})}),Object(i.jsxs)("td",{children:[Object(i.jsxs)("div",{className:"clearfix",children:[Object(i.jsx)("div",{className:"float-left",children:Object(i.jsx)("strong",{children:"50%"})}),Object(i.jsx)("div",{className:"float-right",children:Object(i.jsx)("small",{className:"text-muted",children:"Jun 11, 2015 - Jul 10, 2015"})})]}),Object(i.jsx)(l.vb,{className:"progress-xs",color:"success",value:"50"})]}),Object(i.jsx)("td",{className:"text-center",children:Object(i.jsx)(u.a,{height:25,name:"cib-cc-mastercard"})}),Object(i.jsxs)("td",{children:[Object(i.jsx)("div",{className:"small text-muted",children:"Last login"}),Object(i.jsx)("strong",{children:"10 sec ago"})]})]})})}),t.comment&&Object(i.jsx)("h5",{children:'"'.concat(t.comment,'"')}),Object(i.jsx)("h6",{children:"Observer: ".concat(t.username)}),Object(i.jsx)("h6",{children:"Severity: ".concat(t.severity)}),Object(i.jsx)("h6",{children:"Observance time: ".concat(t.event_datetime)}),Object(i.jsx)("h6",{children:"Report id: ".concat(t.id)}),Object(i.jsx)("h6",{children:"Location: ".concat(Object(h.f)(t.location))}),Object(i.jsx)("h6",{children:"People affected: ".concat(t.people_affected)}),Object(i.jsxs)("div",{className:"button-row",children:[Object(i.jsx)("div",{className:"auth0-box",children:Object(i.jsx)("a",{className:"btn btn-primary",href:"".concat(e.frontEndHost,"/#/edit-witness-report?id=").concat(t.id),children:"Edit Witness Report"})}),Object(i.jsx)(l.f,{color:"primary",onClick:function(){return e.initiateDeleteConfirmation(t.id)},children:"Delete Witness Report"})]})]})]})})},n)})),Object(i.jsxs)(l.hb,{show:this.state.isModalOpen,onClose:this.onModalClose.bind(this),children:[Object(i.jsx)(l.kb,{closeButton:!0,children:Object(i.jsx)(l.lb,{children:"Confirmation Of Deletion"})}),Object(i.jsx)(l.ib,{children:"Are you sure that you want to delete this witness report? The operation cannot be undone."}),Object(i.jsxs)(l.jb,{children:[Object(i.jsx)(l.f,{onClick:this.onConfirmedDelete.bind(this),color:"primary",children:"Yes, delete it"})," ",Object(i.jsx)(l.f,{color:"secondary",onClick:function(){return e.onModalClose()},children:"Cancel"})]})]}),Object(i.jsxs)(l.hb,{show:this.state.isWitnessReportModalOpen,onClose:this.onWitnessReportModalClose.bind(this),children:[Object(i.jsx)(l.kb,{closeButton:!0,children:Object(i.jsx)(l.lb,{children:"Failure To Create Witness Report"})}),Object(i.jsx)(l.ib,{children:Object(h.p)("create witness reports")}),Object(i.jsx)(l.jb,{children:Object(i.jsx)(l.f,{color:"secondary",onClick:this.onWitnessReportModalClose.bind(this),children:"OK"})})]}),Object(i.jsxs)(l.hb,{show:this.state.isDeletionModalOpen,onClose:this.onDeletionModalClose.bind(this),children:[Object(i.jsx)(l.kb,{closeButton:!0,children:Object(i.jsx)(l.lb,{children:"Failure To Delete Witness Report"})}),Object(i.jsx)(l.ib,{children:Object(h.g)("delete witness reports",m)}),Object(i.jsx)(l.jb,{children:Object(i.jsx)(l.f,{color:"secondary",onClick:this.onDeletionModalClose.bind(this),children:"OK"})})]})]})}}]),n}(d.a.Component);t.default=b}}]);
//# sourceMappingURL=7.13cccaec.chunk.js.map