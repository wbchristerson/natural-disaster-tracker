(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[45],{693:function(e,t,i){"use strict";i.r(t);var o=i(20),r=i(161),n=i(162),a=i(165),s=i(164),d=i(1),l=i.n(d),c=i(621),p=i(623),h=i(628),u=function(e){Object(a.a)(i,e);var t=Object(s.a)(i);function i(e){var o;return Object(r.a)(this,i),(o=t.call(this,e)).state={reportDate:"",reportTime:"",reportSeverity:"",reportImageURL:"",reportComment:"",reportPeopleAffected:"",reportLatitude:"",reportLongitude:"",isValidReportDate:!0,isValidReportTime:!0,isValidReportSeverity:!0,isValidReportImageURL:!0,isValidReportPeopleAffected:!0,isValidReportLatitude:!0,isValidReportLongitude:!0,isModalOpen:!1,showToast:!1},o.backEndHost=Object(h.m)(),o.frontEndHost=Object(h.p)(),o.witnessReportId=parseInt(o.props.location.search.substring(4)),o.disasterId="",o.observerId="",o.originalReportDate="",o.originalReportTime="",o.originalReportSeverity="",o.originalReportImageURL="",o.originalReportComment="",o.originalReportPeopleAffected="",o.originalReportLatitude="",o.originalReportLongitude="",o}return Object(n.a)(i,[{key:"componentDidMount",value:function(){var e=this;fetch("".concat(this.backEndHost,"/api/witnessreports/").concat(this.witnessReportId)).then((function(e){return e.json()})).then((function(t){e.disasterId=t.disaster_id,e.observerId=t.observer_id,e.setState({reportDate:Object(h.r)(t.event_datetime),reportTime:Object(h.s)(t.event_datetime),reportSeverity:t.severity?t.severity.toString():"",reportImageURL:t.image_url?t.image_url:"",reportComment:t.comment?t.comment:"",reportPeopleAffected:t.people_affected.toString(),reportLatitude:t.location[0].toString(),reportLongitude:t.location[1].toString()}),e.originalReportDate=Object(h.r)(t.event_datetime),e.originalReportTime=Object(h.s)(t.event_datetime),e.originalReportSeverity=t.severity?t.severity.toString():"",e.originalReportImageURL=t.image_url?t.image_url:"",e.originalReportComment=t.comment?t.comment:"",e.originalReportPeopleAffected=t.people_affected.toString(),e.originalReportLatitude=t.location[0].toString(),e.originalReportLongitude=t.location[1].toString()})).catch((function(t){console.log("Error fetching disaster with id ",e.disasterId),console.log(t)}))}},{key:"onReportDateChange",value:function(e){this.setState({reportDate:e.target.value})}},{key:"onReportTimeChange",value:function(e){this.setState({reportTime:e.target.value})}},{key:"onReportPeopleAffectedChange",value:function(e){this.setState({reportPeopleAffected:e.target.value})}},{key:"onReportLatitudeChange",value:function(e){this.setState({reportLatitude:e.target.value})}},{key:"onReportLongitudeChange",value:function(e){this.setState({reportLongitude:e.target.value})}},{key:"onReportSeverityChange",value:function(e){this.setState({reportSeverity:e.target.value})}},{key:"onReportImageURLChange",value:function(e){this.setState({reportImageURL:e.target.value})}},{key:"onReportCommentChange",value:function(e){this.setState({reportComment:e.target.value})}},{key:"onSubmit",value:function(){var e=this,t=!0,i=!0,o=!0,r=!0,n=!0,a=!0,s=!0,d=this.state,l=d.reportDate,c=d.reportTime,p=d.reportSeverity,u=d.reportImageURL,m=d.reportComment,j=d.reportPeopleAffected,b=d.reportLatitude,g=d.reportLongitude;if(""==l&&(t=!1),Object(h.z)(c)||(i=!1),""==p||Object(h.y)(p,0,10)||(o=!1),""==u||Object(h.w)(u)||(r=!1),Object(h.x)(j)||(n=!1),Object(h.v)(b)||(a=!1),Object(h.v)(g)||(s=!1),t&&i&&o&&r&&n&&a&&s){var x={id:this.witnessReportId};l==this.originalReportDate&&c.trim()==this.originalReportTime.trim()||(x.event_datetime=new Date(l+"T"+Object(h.q)(c))),p.trim()!=this.originalReportSeverity.trim()&&(x.severity=parseInt(p.trim())),u.trim()!=this.originalReportImageURL.trim()&&(x.image_url=u.trim()),m.trim()!=this.originalReportComment.trim()&&(x.comment=m.trim()),j.trim()!=this.originalReportPeopleAffected.trim()&&(x.people_affected=parseInt(j.trim())),b.trim()!=this.originalReportLatitude.trim()&&(x.location_latitude=parseFloat(b.trim())),g.trim()!=this.originalReportLongitude.trim()&&(x.location_longitude=parseFloat(g.trim())),this.setState({showToast:!1}),fetch("".concat(this.backEndHost,"/api/witnessreports"),{method:"PATCH",body:JSON.stringify(x),contentType:"application/json",headers:{"Content-Type":"application/json",Authorization:"Bearer "+Object(h.n)(h.e)}}).then((function(e){return e.json()})).then((function(t){401!=t.error||"authorization issue - 401 Unauthorized: The server could not verify that you are authorized to access the URL requested. You either supplied the wrong credentials (e.g. a bad password), or your browser doesn't understand how to supply the credentials required."!=t.message||t.success?(e.originalReportDate=Object(h.r)(t.event_datetime),e.originalReportTime=Object(h.s)(t.event_datetime),e.originalReportSeverity=t.severity?t.severity.toString():"",e.originalReportImageURL=t.image_url?t.image_url:"",e.originalReportComment=t.comment?t.comment:"",e.originalReportPeopleAffected=t.people_affected.toString(),e.originalReportLatitude=t.location[0].toString(),e.originalReportLongitude=t.location[1].toString(),t.error||e.setState({showToast:!0})):e.setState({isModalOpen:!0})})).catch((function(t){console.log("Error fetching disaster with id ",e.disasterId),console.log(t)}))}this.setState({isValidReportDate:t,isValidReportTime:i,isValidReportSeverity:o,isValidReportImageURL:r,isValidReportPeopleAffected:n,isValidReportLatitude:a,isValidReportLongitude:s})}},{key:"resetDisasterForm",value:function(){this.setState({reportDate:this.originalReportDate,reportTime:this.originalReportTime,reportSeverity:this.originalReportSeverity,reportImageURL:this.originalReportImageURL,reportComment:this.originalReportComment,reportPeopleAffected:this.originalReportPeopleAffected,reportLatitude:this.originalReportLatitude,reportLongitude:this.originalReportLongitude,isValidReportDate:!0,isValidReportTime:!0,isValidReportSeverity:!0,isValidReportImageURL:!0,isValidReportPeopleAffected:!0,isValidReportLatitude:!0,isValidReportLongitude:!0})}},{key:"onModalClose",value:function(){this.setState({isModalOpen:!1})}},{key:"render",value:function(){var e=this.state,t=e.reportDate,i=e.isValidReportDate,r=e.reportTime,n=e.isValidReportTime,a=e.reportPeopleAffected,s=e.isValidReportPeopleAffected,d=e.reportLatitude,l=e.isValidReportLatitude,u=e.reportLongitude,m=e.isValidReportLongitude,j=e.reportSeverity,b=e.isValidReportSeverity,g=e.reportImageURL,x=e.isValidReportImageURL,f=e.reportComment,R=e.isModalOpen,v=e.showToast,O=Object(h.n)(h.e),L=!O||""==O;return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(c.xb,{children:Object(o.jsx)(c.v,{xs:"12",children:Object(o.jsxs)(c.k,{children:[Object(o.jsxs)(c.o,{children:[Object(o.jsx)("h4",{children:"Edit Witness Report"}),L&&Object(o.jsx)("div",{className:"top-information-text",children:Object(h.t)("edit witness reports")})]}),Object(o.jsx)(c.l,{children:Object(o.jsxs)(c.K,{action:"",method:"post",encType:"multipart/form-data",className:"form-horizontal",children:[Object(o.jsxs)(c.L,{row:!0,children:[Object(o.jsx)(c.v,{md:"3",children:Object(o.jsx)(c.db,{htmlFor:"good-date-input",children:"Date Witnessed"})}),Object(o.jsxs)(c.v,{xs:"12",md:"9",children:[i&&Object(o.jsx)(c.T,{type:"date",id:"good-date-input",name:"good-date-input",placeholder:"date",value:t,onChange:this.onReportDateChange.bind(this)}),!i&&Object(o.jsx)(c.T,{type:"date",id:"bad-date-input",invalid:!0,name:"bad-date-input",placeholder:"date",value:t,onChange:this.onReportDateChange.bind(this)}),Object(o.jsx)(c.bb,{children:"Date provided is blank"}),Object(o.jsx)(c.M,{children:"Date of the report"})]})]}),Object(o.jsxs)(c.L,{row:!0,children:[Object(o.jsx)(c.v,{md:"3",children:Object(o.jsx)(c.db,{htmlFor:"time-input",children:"Time Witnessed"})}),Object(o.jsxs)(c.v,{xs:"12",md:"9",children:[n&&Object(o.jsx)(c.T,{id:"good-time-input",name:"good-time-input",placeholder:"Text",value:r,onChange:this.onReportTimeChange.bind(this)}),!n&&Object(o.jsx)(c.T,{id:"bad-time-input",invalid:!0,name:"bad-time-input",placeholder:"Text",value:r,onChange:this.onReportTimeChange.bind(this)}),Object(o.jsx)(c.bb,{children:"Time provided is blank or format is not recognized"}),Object(o.jsx)(c.M,{children:"Time of the report"})]})]}),Object(o.jsxs)(c.L,{row:!0,children:[Object(o.jsx)(c.v,{md:"3",children:Object(o.jsx)(c.db,{htmlFor:"people-affected-input",children:"Number Of People Affected"})}),Object(o.jsxs)(c.v,{xs:"12",md:"9",children:[s&&Object(o.jsx)(c.T,{id:"people-affected-input",name:"people-affected-input",placeholder:"Text",value:a,onChange:this.onReportPeopleAffectedChange.bind(this)}),!s&&Object(o.jsx)(c.T,{id:"people-affected-input",invalid:!0,name:"people-affected-input",placeholder:"Text",value:a,onChange:this.onReportPeopleAffectedChange.bind(this)}),Object(o.jsx)(c.bb,{children:"Number of people affected is blank or format is not recognized"}),Object(o.jsx)(c.M,{children:"Estimate of number of people affected"})]})]}),Object(o.jsxs)(c.L,{row:!0,children:[Object(o.jsx)(c.v,{md:"3",children:Object(o.jsx)(c.db,{htmlFor:"latitude-text-input",children:"Location Latitude"})}),Object(o.jsxs)(c.v,{xs:"12",md:"9",children:[l&&Object(o.jsx)(c.T,{id:"latitude-text-input",name:"latitude-text-input",placeholder:"0.00",onChange:this.onReportLatitudeChange.bind(this),value:d}),!l&&Object(o.jsx)(c.T,{invalid:!0,id:"latitude-text-input",name:"latitude-text-input",placeholder:"0.00",onChange:this.onReportLatitudeChange.bind(this),value:d}),Object(o.jsx)(c.bb,{children:"Location latitude is blank or format is not recognized"}),Object(o.jsx)(c.M,{children:"Signed latitude of disaster"})]})]}),Object(o.jsxs)(c.L,{row:!0,children:[Object(o.jsx)(c.v,{md:"3",children:Object(o.jsx)(c.db,{htmlFor:"longitude-text-input",children:"Location Longitude"})}),Object(o.jsxs)(c.v,{xs:"12",md:"9",children:[m&&Object(o.jsx)(c.T,{id:"longitude-text-input",name:"longitude-text-input",placeholder:"0.00",onChange:this.onReportLongitudeChange.bind(this),value:u}),!m&&Object(o.jsx)(c.T,{invalid:!0,id:"longitude-text-input",name:"longitude-text-input",placeholder:"0.00",onChange:this.onReportLongitudeChange.bind(this),value:u}),Object(o.jsx)(c.bb,{children:"Location longitude is blank or format is not recognized"}),Object(o.jsx)(c.M,{children:"Signed longitude of disaster"})]})]}),Object(o.jsxs)(c.L,{row:!0,children:[Object(o.jsx)(c.v,{md:"3",children:Object(o.jsx)(c.db,{htmlFor:"severity-text-input",children:"Severity (optional)"})}),Object(o.jsxs)(c.v,{xs:"12",md:"9",children:[b&&Object(o.jsx)(c.T,{id:"severity-text-input",name:"severity-text-input",placeholder:"0",onChange:this.onReportSeverityChange.bind(this),value:j}),!b&&Object(o.jsx)(c.T,{invalid:!0,id:"severity-text-input",name:"severity-text-input",placeholder:"0",onChange:this.onReportSeverityChange.bind(this),value:j}),Object(o.jsx)(c.bb,{children:"Format of severity is not recognized or out of range"}),Object(o.jsx)(c.M,{children:"Severity of disaster on a scale of 0 to 10, integral values only"})]})]}),Object(o.jsxs)(c.L,{row:!0,children:[Object(o.jsx)(c.v,{md:"3",children:Object(o.jsx)(c.db,{htmlFor:"image-url-text-input",children:"Image URL (optional)"})}),Object(o.jsxs)(c.v,{xs:"12",md:"9",children:[x&&Object(o.jsx)(c.T,{id:"image-url-text-input",name:"image-url-text-input",placeholder:"Text",onChange:this.onReportImageURLChange.bind(this),value:g}),!x&&Object(o.jsx)(c.T,{invalid:!0,id:"image-url-text-input",name:"image-url-text-input",placeholder:"Text",onChange:this.onReportImageURLChange.bind(this),value:g}),Object(o.jsx)(c.bb,{children:"Format of image URL is not recognized"}),Object(o.jsx)(c.M,{children:"Image of disaster (must be hosted on Internet already)"})]})]}),Object(o.jsxs)(c.L,{row:!0,children:[Object(o.jsx)(c.v,{md:"3",children:Object(o.jsx)(c.db,{htmlFor:"textarea-input",children:"Comment (optional)"})}),Object(o.jsx)(c.v,{xs:"12",md:"9",children:Object(o.jsx)(c.Lb,{name:"textarea-input",id:"textarea-input",rows:"9",placeholder:"Content...",onChange:this.onReportCommentChange.bind(this),value:f})})]})]})}),Object(o.jsxs)(c.m,{children:[Object(o.jsxs)(c.f,{type:"submit",size:"sm",color:"primary",onClick:this.onSubmit.bind(this),children:[Object(o.jsx)(p.a,{name:"cil-scrubber"})," Submit"]}),Object(o.jsxs)(c.f,{type:"reset",size:"sm",color:"danger",onClick:this.resetDisasterForm.bind(this),children:[Object(o.jsx)(p.a,{name:"cil-ban"})," Reset"]})]})]})})}),Object(o.jsxs)(c.hb,{show:R,onClose:this.onModalClose.bind(this),children:[Object(o.jsx)(c.kb,{closeButton:!0,children:Object(o.jsx)(c.lb,{children:"Failure To Edit Witness Report"})}),Object(o.jsx)(c.ib,{children:Object(h.u)("edit witness reports")}),Object(o.jsx)(c.jb,{children:Object(o.jsx)(c.f,{color:"secondary",onClick:this.onModalClose.bind(this),children:"OK"})})]}),Object(o.jsx)(c.Pb,{position:"top-center",children:Object(o.jsxs)(c.Mb,{show:v,autohide:5e3,fade:!0,children:[Object(o.jsx)(c.Ob,{closeButton:!0,children:"Witness Report Updated"}),Object(o.jsx)(c.Nb,{children:"The witness report has been updated successfully!"})]},"toast")},"toaster-top-center")]})}}]),i}(l.a.Component);t.default=u}}]);
//# sourceMappingURL=45.f022fd5e.chunk.js.map