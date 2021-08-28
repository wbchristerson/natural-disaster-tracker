(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[6],{541:function(e,t,i){"use strict";i.r(t);var a=i(38),n=i(159),s=i(160),l=i(162),o=i(161),c=i(1),d=i.n(c),r=i(498),h=i(499),j=function(e){Object(l.a)(i,e);var t=Object(o.a)(i);function i(e){var a;return Object(n.a)(this,i),(a=t.call(this,e)).state={informalName:"",officialName:"",disasterType:h.b[0],isOngoing:!1,latitude:"",longitude:"",isValidInformalName:!0,isValidOfficialName:!0,isValidDisasterType:!0,isValidLatitude:!0,isValidLongitude:!0,isModalOpen:!1,authorizationFailure:null,showToast:!1},a.backEndHost=Object(h.m)(),a.frontEndHost=Object(h.p)(),a}return Object(s.a)(i,[{key:"onInformalNameChange",value:function(e){this.setState({informalName:e.target.value})}},{key:"onOfficialNameChange",value:function(e){this.setState({officialName:e.target.value})}},{key:"onDisasterTypeChange",value:function(e){this.setState({disasterType:e.target.value})}},{key:"onIsOngoingChange",value:function(e){this.setState({isOngoing:!this.state.isOngoing})}},{key:"onLatitudeChange",value:function(e){this.setState({latitude:e.target.value})}},{key:"onLongitudeChange",value:function(e){this.setState({longitude:e.target.value})}},{key:"onSubmit",value:function(){var e=this,t=!0,i=!0,a=!0,n=!0,s=!0,l=this.state,o=l.informalName,c=l.officialName,d=l.disasterType,r=l.isOngoing,j=l.latitude,u=l.longitude;""===o&&(t=!1),""===c&&(i=!1),"Please select"===d&&(a=!1),Object(h.v)(j)||(n=!1),Object(h.v)(u)||(s=!1),t&&i&&a&&n&&s&&(this.setState({showToast:!1}),fetch("".concat(this.backEndHost,"/api/disasters"),{method:"POST",body:JSON.stringify({informal_name:o,official_name:c,disaster_type:d,is_ongoing:r,location_latitude:j,location_longitude:u}),contentType:"application/json",headers:{"Content-Type":"application/json",Authorization:"Bearer "+Object(h.n)(h.e)}}).then((function(t){401===t.status&&"UNAUTHORIZED"===t.statusText||403===t.status&&"FORBIDDEN"===t.statusText?e.setState({isModalOpen:!0,authorizationFailure:t.status}):200===t.status&&e.setState({showToast:!0})})).catch((function(e){return console.log("error!!!: ",e)}))),this.setState({isValidInformalName:t,isValidOfficialName:i,isValidDisasterType:a,isValidLatitude:n,isValidLongitude:s})}},{key:"resetDisasterForm",value:function(){this.setState({informalName:"",officialName:"",disasterType:"",isOngoing:!1,latitude:"",longitude:"",isValidInformalName:!0,isValidOfficialName:!0,isValidDisasterType:!0,isValidLatitude:!0,isValidLongitude:!0})}},{key:"onModalClose",value:function(){this.setState({isModalOpen:!1,authorizationFailure:null})}},{key:"render",value:function(){var e=this,t=this.state,i=t.isModalOpen,n=t.authorizationFailure,s=t.showToast,l=t.informalName,o=t.isValidInformalName,c=t.isValidOfficialName,d=t.isValidDisasterType,j=t.isValidLatitude,u=t.isValidLongitude,m=t.isOngoing,b=t.disasterType,O=t.officialName,f=t.latitude,g=t.longitude;return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(r.J,{className:"single-disaster-container card-top-margin",children:Object(a.jsx)(r.j,{xs:"12",className:"single-disaster-card",children:Object(a.jsxs)(r.f,{children:[Object(a.jsxs)(r.i,{children:[Object(a.jsx)("h4",{children:"Add Disaster Listing"}),Object(a.jsx)("div",{className:"top-information-text",children:Object(h.l)("add disaster listings")})]}),Object(a.jsx)(r.g,{children:Object(a.jsxs)(r.o,{action:"",method:"post",encType:"multipart/form-data",className:"form-horizontal",children:[Object(a.jsxs)(r.p,{row:!0,children:[Object(a.jsx)(r.j,{md:"3",children:Object(a.jsx)(r.z,{htmlFor:"informal-name-input",children:"Informal Name"})}),Object(a.jsxs)(r.j,{xs:"12",md:"9",children:[o&&Object(a.jsx)(r.x,{id:"informal-name-input",name:"informal-name-input",placeholder:"Text",value:l,onChange:this.onInformalNameChange.bind(this)}),!o&&Object(a.jsx)(r.x,{id:"informal-name-input",invalid:!0,name:"informal-name-input",placeholder:"Text",value:l,onChange:this.onInformalNameChange.bind(this)}),Object(a.jsx)(r.y,{children:"Informal name is blank or format is not recognized"}),Object(a.jsx)(r.q,{children:"The colloquial name of the disaster"})]})]}),Object(a.jsxs)(r.p,{row:!0,children:[Object(a.jsx)(r.j,{md:"3",children:Object(a.jsx)(r.z,{htmlFor:"official-name-input",children:"Official Name"})}),Object(a.jsxs)(r.j,{xs:"12",md:"9",children:[c&&Object(a.jsx)(r.x,{id:"official-name-input",name:"official-name-input",placeholder:"Text",value:O,onChange:this.onOfficialNameChange.bind(this)}),!c&&Object(a.jsx)(r.x,{id:"official-name-input",invalid:!0,name:"official-name-input",placeholder:"Text",value:O,onChange:this.onOfficialNameChange.bind(this)}),Object(a.jsx)(r.y,{children:"Official name is blank or format is not recognized"}),Object(a.jsx)(r.q,{children:"The identifying name of the disaster"})]})]}),Object(a.jsxs)(r.p,{row:!0,children:[Object(a.jsx)(r.j,{md:"3",children:Object(a.jsx)(r.z,{htmlFor:"select",children:"Disaster Type"})}),Object(a.jsxs)(r.j,{xs:"12",md:"9",children:[d&&Object(a.jsx)(r.K,{custom:!0,name:"select",id:"select",value:b,onChange:this.onDisasterTypeChange.bind(this),children:h.b.map((function(e){return Object(a.jsx)("option",{value:e,children:e},e)}))}),!d&&Object(a.jsx)(r.K,{invalid:!0,custom:!0,name:"select",id:"select",value:b,onChange:this.onDisasterTypeChange.bind(this),children:h.b.map((function(e){return Object(a.jsx)("option",{value:e,children:e},e)}))}),Object(a.jsx)(r.y,{children:"No disaster type is selected"})]})]}),Object(a.jsxs)(r.p,{row:!0,children:[Object(a.jsx)(r.j,{tag:"label",sm:"3",className:"col-form-label",children:"Disaster Ongoing"}),Object(a.jsx)(r.j,{sm:"1",children:Object(a.jsx)(r.L,{id:"add-disaster-ongoing-switch",className:"mr-1",color:"danger",shape:"pill",checked:m,onChange:this.onIsOngoingChange.bind(this)})}),Object(a.jsx)(r.j,{sm:"3",children:Object(a.jsx)(r.z,{htmlFor:"add-disaster-ongoing-switch",children:m?"Yes":"No"})})]}),Object(a.jsxs)(r.p,{row:!0,children:[Object(a.jsx)(r.j,{md:"3",children:Object(a.jsx)(r.z,{htmlFor:"latitude-input",children:"Latitude"})}),Object(a.jsxs)(r.j,{xs:"12",md:"9",children:[j&&Object(a.jsx)(r.x,{id:"latitude-input",name:"latitude-input",placeholder:"Disaster Latitude",value:f,onChange:this.onLatitudeChange.bind(this)}),!j&&Object(a.jsx)(r.x,{invalid:!0,id:"latitude-input",name:"latitude-input",placeholder:"Disaster Latitude",value:f,onChange:this.onLatitudeChange.bind(this)}),Object(a.jsx)(r.y,{children:"Provided latitude is blank or format is not recognized"}),Object(a.jsx)(r.q,{className:"help-block",children:"The latitude of the disaster"})]})]}),Object(a.jsxs)(r.p,{row:!0,children:[Object(a.jsx)(r.j,{md:"3",children:Object(a.jsx)(r.z,{htmlFor:"longitude-input",children:"Longitude"})}),Object(a.jsxs)(r.j,{xs:"12",md:"9",children:[u&&Object(a.jsx)(r.x,{name:"longitude-input",placeholder:"Disaster Latitude",value:g,onChange:this.onLongitudeChange.bind(this)}),!u&&Object(a.jsx)(r.x,{invalid:!0,id:"longitude-input",name:"longitude-input",placeholder:"Disaster Latitude",value:g,onChange:this.onLongitudeChange.bind(this)}),Object(a.jsx)(r.y,{children:"Provided longitude is blank or format is not recognized"}),Object(a.jsx)(r.q,{className:"help-block",children:"The longitude of the disaster"})]})]})]})}),Object(a.jsxs)(r.h,{children:[Object(a.jsx)(r.d,{type:"submit",size:"md",color:"primary",onClick:this.onSubmit.bind(this),children:"Submit"}),Object(a.jsx)(r.d,{className:"right-button-in-group",type:"reset",size:"md",color:"danger",onClick:this.resetDisasterForm.bind(this),children:"Reset"})]})]})})}),Object(a.jsxs)(r.D,{show:i,onClose:this.onModalClose.bind(this),children:[Object(a.jsx)(r.G,{closeButton:!0,children:Object(a.jsx)(r.H,{children:"Failure To Create Disaster Listing"})}),Object(a.jsx)(r.E,{children:Object(h.j)("add disaster listings",n)}),Object(a.jsx)(r.F,{children:Object(a.jsx)(r.d,{color:"secondary",onClick:function(){return e.onModalClose()},children:"OK"})})]}),Object(a.jsx)(r.Q,{position:"top-center",children:Object(a.jsxs)(r.N,{show:s,autohide:5e3,fade:!0,children:[Object(a.jsx)(r.P,{closeButton:!0,children:"Disaster Listing Added"}),Object(a.jsx)(r.O,{children:"The disaster listing for ".concat(l," has been added successfully!")})]},"toast")},"toaster-top-center")]})}}]),i}(d.a.Component);t.default=j}}]);
//# sourceMappingURL=6.b3703a47.chunk.js.map