(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[9],{622:function(e,s,t){"use strict";function c(e,s){(null==s||s>e.length)&&(s=e.length);for(var t=0,c=new Array(s);t<s;t++)c[t]=e[t];return c}t.d(s,"a",(function(){return c}))},623:function(e,s,t){"use strict";t.d(s,"a",(function(){return r}));var c=t(622);function r(e,s){if(e){if("string"===typeof e)return Object(c.a)(e,s);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Object(c.a)(e,s):void 0}}},626:function(e,s){!function(e,s){for(var t in s)e[t]=s[t]}(s,function(e){var s={};function t(c){if(s[c])return s[c].exports;var r=s[c]={i:c,l:!1,exports:{}};return e[c].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=s,t.d=function(e,s,c){t.o(e,s)||Object.defineProperty(e,s,{enumerable:!0,get:c})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,s){if(1&s&&(e=t(e)),8&s)return e;if(4&s&&"object"==typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(t.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&s&&"string"!=typeof e)for(var r in e)t.d(c,r,function(s){return e[s]}.bind(null,r));return c},t.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(s,"a",s),s},t.o=function(e,s){return Object.prototype.hasOwnProperty.call(e,s)},t.p="",t(t.s=0)}([function(e,s,t){"use strict";t.r(s),t.d(s,"deepObjectsMerge",(function(){return c})),t.d(s,"getColor",(function(){return i})),t.d(s,"getStyle",(function(){return l})),t.d(s,"hexToRgb",(function(){return o})),t.d(s,"hexToRgba",(function(){return j})),t.d(s,"makeUid",(function(){return d})),t.d(s,"omitByKeys",(function(){return b})),t.d(s,"pickByKeys",(function(){return m})),t.d(s,"rgbToHex",(function(){return x}));var c=function e(s,t){for(var c=0,r=Object.keys(t);c<r.length;c++){var a=r[c];t[a]instanceof Object&&Object.assign(t[a],e(s[a],t[a]))}return Object.assign(s||{},t),s},r=function(){for(var e={},s=document.styleSheets,t="",c=s.length-1;c>-1;c--){for(var r=s[c].cssRules,a=r.length-1;a>-1;a--)if(".ie-custom-properties"===r[a].selectorText){t=r[a].cssText;break}if(t)break}return(t=t.substring(t.lastIndexOf("{")+1,t.lastIndexOf("}"))).split(";").forEach((function(s){if(s){var t=s.split(": ")[0],c=s.split(": ")[1];t&&c&&(e["--".concat(t.trim())]=c.trim())}})),e},a=function(){return Boolean(document.documentMode)&&document.documentMode>=10},n=function(e){return e.match(/^--.*/i)},l=function(e){var s,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body;if(n(e)&&a()){var c=r();s=c[e]}else s=window.getComputedStyle(t,null).getPropertyValue(e).replace(/^\s/,"");return s},i=function(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body,t="--".concat(e),c=l(t,s);return c||e},o=function(e){if(void 0===e)throw new TypeError("Hex color is not defined");var s,t,c;if(!e.match(/^#(?:[0-9a-f]{3}){1,2}$/i))throw new Error("".concat(e," is not a valid hex color"));return 7===e.length?(s=parseInt(e.slice(1,3),16),t=parseInt(e.slice(3,5),16),c=parseInt(e.slice(5,7),16)):(s=parseInt(e.slice(1,2),16),t=parseInt(e.slice(2,3),16),c=parseInt(e.slice(3,5),16)),"rgba(".concat(s,", ").concat(t,", ").concat(c,")")},j=function(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;if(void 0===e)throw new TypeError("Hex color is not defined");var t,c,r,a=e.match(/^#(?:[0-9a-f]{3}){1,2}$/i);if(!a)throw new Error("".concat(e," is not a valid hex color"));return 7===e.length?(t=parseInt(e.slice(1,3),16),c=parseInt(e.slice(3,5),16),r=parseInt(e.slice(5,7),16)):(t=parseInt(e.slice(1,2),16),c=parseInt(e.slice(2,3),16),r=parseInt(e.slice(3,5),16)),"rgba(".concat(t,", ").concat(c,", ").concat(r,", ").concat(s/100,")")},d=function(){return"uid-"+Math.random().toString(36).substr(2)},b=function(e,s){for(var t={},c=Object.keys(e),r=0;r<c.length;r++)!s.includes(c[r])&&(t[c[r]]=e[c[r]]);return t},m=function(e,s){for(var t={},c=0;c<s.length;c++)t[s[c]]=e[s[c]];return t},x=function(e){if(void 0===e)throw new TypeError("Hex color is not defined");if("transparent"===e)return"#00000000";var s=e.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);if(!s)throw new Error("".concat(e," is not a valid rgb color"));var t="0".concat(parseInt(s[1],10).toString(16)),c="0".concat(parseInt(s[2],10).toString(16)),r="0".concat(parseInt(s[3],10).toString(16));return"#".concat(t.slice(-2)).concat(c.slice(-2)).concat(r.slice(-2))},h={deepObjectsMerge:c,getColor:i,getStyle:l,hexToRgb:o,hexToRgba:j,makeUid:d,omitByKeys:b,pickByKeys:m,rgbToHex:x};s.default=h}]))},636:function(e,s,t){"use strict";t.d(s,"a",(function(){return a})),t.d(s,"c",(function(){return n})),t.d(s,"b",(function(){return l}));var c=t(623);function r(e){var s,t=function(e,s){var t;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(t=Object(c.a)(e))||s&&e&&"number"===typeof e.length){t&&(e=t);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,l=!0,i=!1;return{s:function(){t=e[Symbol.iterator]()},n:function(){var e=t.next();return l=e.done,e},e:function(e){i=!0,n=e},f:function(){try{l||null==t.return||t.return()}finally{if(i)throw n}}}}(document.cookie.split(";"));try{for(t.s();!(s=t.n()).done;){var r=s.value.split("=");if((r[0]+"").trim()===e)return r[1]}}catch(a){t.e(a)}finally{t.f()}return""}function a(){var e=r("user_access_token");if(null===e||void 0===e||""===e)return e;var s=e.split('"');return s.length<5?"":s[4].slice(0,-1)}function n(){return"https://sample-will.herokuapp.com"}function l(){return"https://sample-will.herokuapp.com"}},689:function(e,s,t){"use strict";t.r(s);var c=t(20),r=t(162),a=t(163),n=t(166),l=t(165),i=t(1),o=t.n(i),j=t(620),d=t(625),b=t(636),m=t(44),x=t(628),h=t(626),u=Object(h.getStyle)("success")||"#4dbd74",O=Object(h.getStyle)("info")||"#20a8d8",g=Object(h.getStyle)("danger")||"#f86c6b",p=function(e){var s=function(e,s){return Math.floor(Math.random()*(s-e+1)+e)},t=function(){for(var e=[],t=[],c=[],r=0;r<=27;r++)e.push(s(50,200)),t.push(s(80,100)),c.push(65);return[{label:"My First dataset",backgroundColor:Object(h.hexToRgba)(O,10),borderColor:O,pointHoverBackgroundColor:O,borderWidth:2,data:e},{label:"My Second dataset",backgroundColor:"transparent",borderColor:u,pointHoverBackgroundColor:u,borderWidth:2,data:t},{label:"My Third dataset",backgroundColor:"transparent",borderColor:g,pointHoverBackgroundColor:g,borderWidth:1,borderDash:[8,5],data:c}]}(),r={maintainAspectRatio:!1,legend:{display:!1},scales:{xAxes:[{gridLines:{drawOnChartArea:!1}}],yAxes:[{ticks:{beginAtZero:!0,maxTicksLimit:5,stepSize:Math.ceil(50),max:250},gridLines:{display:!0}}]},elements:{point:{radius:0,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}};return Object(c.jsx)(x.c,Object(m.a)(Object(m.a)({},e),{},{datasets:t,options:r,labels:["Mo","Tu","We","Th","Fr","Sa","Su","Mo","Tu","We","Th","Fr","Sa","Su","Mo","Tu","We","Th","Fr","Sa","Su","Mo","Tu","We","Th","Fr","Sa","Su"]}))},v=Object(i.lazy)((function(){return t.e(26).then(t.bind(null,640))})),N=Object(i.lazy)((function(){return t.e(42).then(t.bind(null,639))})),f=function(e){Object(n.a)(t,e);var s=Object(l.a)(t);function t(e){var c;return Object(r.a)(this,t),(c=s.call(this,e)).state={totalDisasters:0,disasterList:[],page:1},c.backEndHost=Object(b.b)(),c.frontEndHost=Object(b.c)(),c}return Object(a.a)(t,[{key:"componentDidMount",value:function(){this.fetchDisasters()}},{key:"fetchDisasters",value:function(){var e=this;fetch("".concat(this.backEndHost,"/api/disasters?page=").concat(this.state.page),{headers:{"Access-Control-Allow-Origin":"*"}}).then((function(e){return e.json()})).then((function(s){console.log(s),e.setState({totalDisasters:s.totalDisasters,disasterList:s.disasters})})).catch((function(e){console.log(e)}))}},{key:"getUsers",value:function(){}},{key:"render",value:function(){var e=(new Date).getSeconds();return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)("div",{className:"login-box auth0-box before",children:[Object(c.jsx)("img",{src:"https://i.cloudup.com/StzWWrY34s.png",alt:"Auth0 login"}),Object(c.jsx)("h3",{children:"Auth0 Example"}),Object(c.jsx)("p",{children:"Zero friction identity infrastructure, built for developers"}),Object(c.jsx)("a",{className:"btn btn-primary btn-lg btn-login btn-block",href:"".concat(this.backEndHost,"/my-login"),children:"Log In"})]}),Object(c.jsxs)("div",{className:"logged-in-box auth0-box logged-in",children:[Object(c.jsx)("h1",{id:"logo",children:Object(c.jsx)("img",{src:"//cdn.auth0.com/samples/auth0_logo_final_blue_RGB.png",alt:"logo"})}),Object(c.jsx)("a",{className:"btn btn-primary btn-lg btn-logout btn-block",href:"".concat(this.backEndHost,"/my-logout"),children:"Logout"})]}),Object(c.jsx)(j.f,{block:!0,color:"primary",onClick:this.getUsers,children:"Primary"}),Object(c.jsx)("div",{className:"logged-in-box auth0-box logged-in",children:Object(c.jsx)("a",{className:"btn btn-primary btn-lg btn-logout btn-block",href:"".concat(this.frontEndHost,"/#/add-disaster-event"),children:"Add Disaster Event"})}),Object(c.jsx)("div",{className:"my-test ".concat(e%3===0?"main-image-1":e%3===1?"main-image-2":"main-image-3"),children:Object(c.jsxs)("div",{className:"card-overlay",children:[Object(c.jsx)("h1",{className:"display-3 main-top-text",children:"Disaster Reporter"}),Object(c.jsx)("p",{className:"main-bottom-text",children:"See And Write Reports About Natural Disasters In Your Area"})]})}),this.state.disasterList.map((function(e,s){return Object(c.jsx)(j.wb,{children:Object(c.jsx)(j.u,{xs:"12",sm:"12",md:"12",children:Object(c.jsxs)(j.j,{children:[Object(c.jsxs)(j.n,{children:["".concat(e.informal_name," - Official Name: ").concat(e.official_name),Object(c.jsx)("div",{className:"card-header-actions",children:Object(c.jsx)(j.b,{className:"mr-1 float-right",color:"".concat(e.is_ongoing?"danger":"success"),children:"".concat(e.is_ongoing?"On-Going":"Not On-Going")})})]}),e.random_observer_url&&Object(c.jsx)("img",{className:"d-block w-100 set-disaster-max-height",src:e.random_witness_image,alt:"slide 1"}),Object(c.jsxs)(j.k,{children:[e.random_observer&&Object(c.jsx)("table",{className:"table table-hover table-outline mb-0 d-none d-sm-table",children:Object(c.jsx)("tbody",{children:Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{className:"text-center",children:Object(c.jsxs)("div",{className:"c-avatar",children:[Object(c.jsx)("img",{src:e.random_observer_url,className:"c-avatar-img",alt:"admin@bootstrapmaster.com"}),Object(c.jsx)("span",{className:"c-avatar-status bg-success"})]})}),Object(c.jsxs)("td",{children:[Object(c.jsx)("div",{children:e.random_observer}),Object(c.jsxs)("div",{className:"small text-muted",children:[Object(c.jsx)("span",{children:"New"})," | Registered: Jan 1, 2015"]})]}),Object(c.jsx)("td",{className:"text-center",children:Object(c.jsx)(d.a,{height:25,name:"cif-us",title:"us",id:"us"})}),Object(c.jsxs)("td",{children:[Object(c.jsxs)("div",{className:"clearfix",children:[Object(c.jsx)("div",{className:"float-left",children:Object(c.jsx)("strong",{children:"50%"})}),Object(c.jsx)("div",{className:"float-right",children:Object(c.jsx)("small",{className:"text-muted",children:"Jun 11, 2015 - Jul 10, 2015"})})]}),Object(c.jsx)(j.ub,{className:"progress-xs",color:"success",value:"50"})]}),Object(c.jsx)("td",{className:"text-center",children:Object(c.jsx)(d.a,{height:25,name:"cib-cc-mastercard"})}),Object(c.jsxs)("td",{children:[Object(c.jsx)("div",{className:"small text-muted",children:"Last login"}),Object(c.jsx)("strong",{children:"10 sec ago"})]})]})})}),e.random_comment&&Object(c.jsx)("h5",{children:'"'.concat(e.random_comment,'"')}),e.random_observer&&Object(c.jsx)("h6",{children:"Observer: ".concat(e.random_observer)}),e.average_severity&&Object(c.jsx)("h6",{children:"Average severity: ".concat(e.average_severity)}),e.disaster_type&&Object(c.jsx)("h6",{children:"Disaster type: ".concat(e.disaster_type)}),e.first_observance&&Object(c.jsx)("h6",{children:"First observance: ".concat(e.first_observance)}),e.last_observance&&Object(c.jsx)("h6",{children:"Last observance: ".concat(e.last_observance)}),Object(c.jsx)("h6",{children:"id: ".concat(e.id)}),Object(c.jsx)("h6",{children:"Location: (".concat(e.location[0],", ").concat(e.location[1],")")}),Object(c.jsx)("h6",{children:"Number Of Reports: ".concat(e.num_reports)}),e.people_affected&&Object(c.jsx)("h6",{children:"People affected: ".concat(e.people_affected)})]})]})})},s)})),Object(c.jsx)(v,{}),Object(c.jsxs)(j.j,{children:[Object(c.jsxs)(j.k,{children:[Object(c.jsxs)(j.wb,{children:[Object(c.jsxs)(j.u,{sm:"5",children:[Object(c.jsx)("h4",{id:"traffic",className:"card-title mb-0",children:"Traffic"}),Object(c.jsx)("div",{className:"small text-muted",children:"November 2017"})]}),Object(c.jsxs)(j.u,{sm:"7",className:"d-none d-md-block",children:[Object(c.jsx)(j.f,{color:"primary",className:"float-right",children:Object(c.jsx)(d.a,{name:"cil-cloud-download"})}),Object(c.jsx)(j.g,{className:"float-right mr-3",children:["Day","Month","Year"].map((function(e){return Object(c.jsx)(j.f,{color:"outline-secondary",className:"mx-0",active:"Month"===e,children:e},e)}))})]})]}),Object(c.jsx)(p,{style:{height:"300px",marginTop:"40px"}})]}),Object(c.jsx)(j.l,{children:Object(c.jsxs)(j.wb,{className:"text-center",children:[Object(c.jsxs)(j.u,{md:!0,sm:"12",className:"mb-sm-2 mb-0",children:[Object(c.jsx)("div",{className:"text-muted",children:"Visits"}),Object(c.jsx)("strong",{children:"29.703 Users (40%)"}),Object(c.jsx)(j.ub,{className:"progress-xs mt-2",precision:1,color:"success",value:40})]}),Object(c.jsxs)(j.u,{md:!0,sm:"12",className:"mb-sm-2 mb-0 d-md-down-none",children:[Object(c.jsx)("div",{className:"text-muted",children:"Unique"}),Object(c.jsx)("strong",{children:"24.093 Users (20%)"}),Object(c.jsx)(j.ub,{className:"progress-xs mt-2",precision:1,color:"info",value:40})]}),Object(c.jsxs)(j.u,{md:!0,sm:"12",className:"mb-sm-2 mb-0",children:[Object(c.jsx)("div",{className:"text-muted",children:"Pageviews"}),Object(c.jsx)("strong",{children:"78.706 Views (60%)"}),Object(c.jsx)(j.ub,{className:"progress-xs mt-2",precision:1,color:"warning",value:40})]}),Object(c.jsxs)(j.u,{md:!0,sm:"12",className:"mb-sm-2 mb-0",children:[Object(c.jsx)("div",{className:"text-muted",children:"New Users"}),Object(c.jsx)("strong",{children:"22.123 Users (80%)"}),Object(c.jsx)(j.ub,{className:"progress-xs mt-2",precision:1,color:"danger",value:40})]}),Object(c.jsxs)(j.u,{md:!0,sm:"12",className:"mb-sm-2 mb-0 d-md-down-none",children:[Object(c.jsx)("div",{className:"text-muted",children:"Bounce Rate"}),Object(c.jsx)("strong",{children:"Average Rate (40.15%)"}),Object(c.jsx)(j.ub,{className:"progress-xs mt-2",precision:1,value:40})]})]})})]}),Object(c.jsx)(N,{withCharts:!0}),Object(c.jsx)(j.wb,{children:Object(c.jsx)(j.u,{children:Object(c.jsxs)(j.j,{children:[Object(c.jsxs)(j.n,{children:["Traffic "," & "," Sales"]}),Object(c.jsxs)(j.k,{children:[Object(c.jsxs)(j.wb,{children:[Object(c.jsxs)(j.u,{xs:"12",md:"6",xl:"6",children:[Object(c.jsxs)(j.wb,{children:[Object(c.jsx)(j.u,{sm:"6",children:Object(c.jsxs)(j.i,{color:"info",children:[Object(c.jsx)("small",{className:"text-muted",children:"New Clients"}),Object(c.jsx)("br",{}),Object(c.jsx)("strong",{className:"h4",children:"9,123"})]})}),Object(c.jsx)(j.u,{sm:"6",children:Object(c.jsxs)(j.i,{color:"danger",children:[Object(c.jsx)("small",{className:"text-muted",children:"Recurring Clients"}),Object(c.jsx)("br",{}),Object(c.jsx)("strong",{className:"h4",children:"22,643"})]})})]}),Object(c.jsx)("hr",{className:"mt-0"}),Object(c.jsxs)("div",{className:"progress-group mb-4",children:[Object(c.jsx)("div",{className:"progress-group-prepend",children:Object(c.jsx)("span",{className:"progress-group-text",children:"Monday"})}),Object(c.jsxs)("div",{className:"progress-group-bars",children:[Object(c.jsx)(j.ub,{className:"progress-xs",color:"info",value:"34"}),Object(c.jsx)(j.ub,{className:"progress-xs",color:"danger",value:"78"})]})]}),Object(c.jsxs)("div",{className:"progress-group mb-4",children:[Object(c.jsx)("div",{className:"progress-group-prepend",children:Object(c.jsx)("span",{className:"progress-group-text",children:"Tuesday"})}),Object(c.jsxs)("div",{className:"progress-group-bars",children:[Object(c.jsx)(j.ub,{className:"progress-xs",color:"info",value:"56"}),Object(c.jsx)(j.ub,{className:"progress-xs",color:"danger",value:"94"})]})]}),Object(c.jsxs)("div",{className:"progress-group mb-4",children:[Object(c.jsx)("div",{className:"progress-group-prepend",children:Object(c.jsx)("span",{className:"progress-group-text",children:"Wednesday"})}),Object(c.jsxs)("div",{className:"progress-group-bars",children:[Object(c.jsx)(j.ub,{className:"progress-xs",color:"info",value:"12"}),Object(c.jsx)(j.ub,{className:"progress-xs",color:"danger",value:"67"})]})]}),Object(c.jsxs)("div",{className:"progress-group mb-4",children:[Object(c.jsx)("div",{className:"progress-group-prepend",children:Object(c.jsx)("span",{className:"progress-group-text",children:"Thursday"})}),Object(c.jsxs)("div",{className:"progress-group-bars",children:[Object(c.jsx)(j.ub,{className:"progress-xs",color:"info",value:"43"}),Object(c.jsx)(j.ub,{className:"progress-xs",color:"danger",value:"91"})]})]}),Object(c.jsxs)("div",{className:"progress-group mb-4",children:[Object(c.jsx)("div",{className:"progress-group-prepend",children:Object(c.jsx)("span",{className:"progress-group-text",children:"Friday"})}),Object(c.jsxs)("div",{className:"progress-group-bars",children:[Object(c.jsx)(j.ub,{className:"progress-xs",color:"info",value:"22"}),Object(c.jsx)(j.ub,{className:"progress-xs",color:"danger",value:"73"})]})]}),Object(c.jsxs)("div",{className:"progress-group mb-4",children:[Object(c.jsx)("div",{className:"progress-group-prepend",children:Object(c.jsx)("span",{className:"progress-group-text",children:"Saturday"})}),Object(c.jsxs)("div",{className:"progress-group-bars",children:[Object(c.jsx)(j.ub,{className:"progress-xs",color:"info",value:"53"}),Object(c.jsx)(j.ub,{className:"progress-xs",color:"danger",value:"82"})]})]}),Object(c.jsxs)("div",{className:"progress-group mb-4",children:[Object(c.jsx)("div",{className:"progress-group-prepend",children:Object(c.jsx)("span",{className:"progress-group-text",children:"Sunday"})}),Object(c.jsxs)("div",{className:"progress-group-bars",children:[Object(c.jsx)(j.ub,{className:"progress-xs",color:"info",value:"9"}),Object(c.jsx)(j.ub,{className:"progress-xs",color:"danger",value:"69"})]})]}),Object(c.jsx)("div",{className:"legend text-center",children:Object(c.jsxs)("small",{children:[Object(c.jsx)("sup",{className:"px-1",children:Object(c.jsx)(j.b,{shape:"pill",color:"info",children:"\xa0"})}),"New clients \xa0",Object(c.jsx)("sup",{className:"px-1",children:Object(c.jsx)(j.b,{shape:"pill",color:"danger",children:"\xa0"})}),"Recurring clients"]})})]}),Object(c.jsxs)(j.u,{xs:"12",md:"6",xl:"6",children:[Object(c.jsxs)(j.wb,{children:[Object(c.jsx)(j.u,{sm:"6",children:Object(c.jsxs)(j.i,{color:"warning",children:[Object(c.jsx)("small",{className:"text-muted",children:"Pageviews"}),Object(c.jsx)("br",{}),Object(c.jsx)("strong",{className:"h4",children:"78,623"})]})}),Object(c.jsx)(j.u,{sm:"6",children:Object(c.jsxs)(j.i,{color:"success",children:[Object(c.jsx)("small",{className:"text-muted",children:"Organic"}),Object(c.jsx)("br",{}),Object(c.jsx)("strong",{className:"h4",children:"49,123"})]})})]}),Object(c.jsx)("hr",{className:"mt-0"}),Object(c.jsxs)("div",{className:"progress-group mb-4",children:[Object(c.jsxs)("div",{className:"progress-group-header",children:[Object(c.jsx)(d.a,{className:"progress-group-icon",name:"cil-user"}),Object(c.jsx)("span",{className:"title",children:"Male"}),Object(c.jsx)("span",{className:"ml-auto font-weight-bold",children:"43%"})]}),Object(c.jsx)("div",{className:"progress-group-bars",children:Object(c.jsx)(j.ub,{className:"progress-xs",color:"warning",value:"43"})})]}),Object(c.jsxs)("div",{className:"progress-group mb-5",children:[Object(c.jsxs)("div",{className:"progress-group-header",children:[Object(c.jsx)(d.a,{className:"progress-group-icon",name:"cil-user-female"}),Object(c.jsx)("span",{className:"title",children:"Female"}),Object(c.jsx)("span",{className:"ml-auto font-weight-bold",children:"37%"})]}),Object(c.jsx)("div",{className:"progress-group-bars",children:Object(c.jsx)(j.ub,{className:"progress-xs",color:"warning",value:"37"})})]}),Object(c.jsxs)("div",{className:"progress-group",children:[Object(c.jsxs)("div",{className:"progress-group-header",children:[Object(c.jsx)(d.a,{className:"progress-group-icon",name:"cil-globe-alt"}),Object(c.jsx)("span",{className:"title",children:"Organic Search"}),Object(c.jsxs)("span",{className:"ml-auto font-weight-bold",children:["191,235 ",Object(c.jsx)("span",{className:"text-muted small",children:"(56%)"})]})]}),Object(c.jsx)("div",{className:"progress-group-bars",children:Object(c.jsx)(j.ub,{className:"progress-xs",color:"success",value:"56"})})]}),Object(c.jsxs)("div",{className:"progress-group",children:[Object(c.jsxs)("div",{className:"progress-group-header",children:[Object(c.jsx)(d.a,{name:"cib-facebook",className:"progress-group-icon"}),Object(c.jsx)("span",{className:"title",children:"Facebook"}),Object(c.jsxs)("span",{className:"ml-auto font-weight-bold",children:["51,223 ",Object(c.jsx)("span",{className:"text-muted small",children:"(15%)"})]})]}),Object(c.jsx)("div",{className:"progress-group-bars",children:Object(c.jsx)(j.ub,{className:"progress-xs",color:"success",value:"15"})})]}),Object(c.jsxs)("div",{className:"progress-group",children:[Object(c.jsxs)("div",{className:"progress-group-header",children:[Object(c.jsx)(d.a,{name:"cib-twitter",className:"progress-group-icon"}),Object(c.jsx)("span",{className:"title",children:"Twitter"}),Object(c.jsxs)("span",{className:"ml-auto font-weight-bold",children:["37,564 ",Object(c.jsx)("span",{className:"text-muted small",children:"(11%)"})]})]}),Object(c.jsx)("div",{className:"progress-group-bars",children:Object(c.jsx)(j.ub,{className:"progress-xs",color:"success",value:"11"})})]}),Object(c.jsxs)("div",{className:"progress-group",children:[Object(c.jsxs)("div",{className:"progress-group-header",children:[Object(c.jsx)(d.a,{name:"cib-linkedin",className:"progress-group-icon"}),Object(c.jsx)("span",{className:"title",children:"LinkedIn"}),Object(c.jsxs)("span",{className:"ml-auto font-weight-bold",children:["27,319 ",Object(c.jsx)("span",{className:"text-muted small",children:"(8%)"})]})]}),Object(c.jsx)("div",{className:"progress-group-bars",children:Object(c.jsx)(j.ub,{className:"progress-xs",color:"success",value:"8"})})]}),Object(c.jsx)("div",{className:"divider text-center",children:Object(c.jsx)(j.f,{color:"link",size:"sm",className:"text-muted",children:Object(c.jsx)(d.a,{name:"cil-options"})})})]})]}),Object(c.jsx)("br",{}),Object(c.jsxs)("table",{className:"table table-hover table-outline mb-0 d-none d-sm-table",children:[Object(c.jsx)("thead",{className:"thead-light",children:Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{className:"text-center",children:Object(c.jsx)(d.a,{name:"cil-people"})}),Object(c.jsx)("th",{children:"User"}),Object(c.jsx)("th",{className:"text-center",children:"Country"}),Object(c.jsx)("th",{children:"Usage"}),Object(c.jsx)("th",{className:"text-center",children:"Payment Method"}),Object(c.jsx)("th",{children:"Activity"})]})}),Object(c.jsxs)("tbody",{children:[Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{className:"text-center",children:Object(c.jsxs)("div",{className:"c-avatar",children:[Object(c.jsx)("img",{src:"avatars/1.jpg",className:"c-avatar-img",alt:"admin@bootstrapmaster.com"}),Object(c.jsx)("span",{className:"c-avatar-status bg-success"})]})}),Object(c.jsxs)("td",{children:[Object(c.jsx)("div",{children:"Yiorgos Avraamu"}),Object(c.jsxs)("div",{className:"small text-muted",children:[Object(c.jsx)("span",{children:"New"})," | Registered: Jan 1, 2015"]})]}),Object(c.jsx)("td",{className:"text-center",children:Object(c.jsx)(d.a,{height:25,name:"cif-us",title:"us",id:"us"})}),Object(c.jsxs)("td",{children:[Object(c.jsxs)("div",{className:"clearfix",children:[Object(c.jsx)("div",{className:"float-left",children:Object(c.jsx)("strong",{children:"50%"})}),Object(c.jsx)("div",{className:"float-right",children:Object(c.jsx)("small",{className:"text-muted",children:"Jun 11, 2015 - Jul 10, 2015"})})]}),Object(c.jsx)(j.ub,{className:"progress-xs",color:"success",value:"50"})]}),Object(c.jsx)("td",{className:"text-center",children:Object(c.jsx)(d.a,{height:25,name:"cib-cc-mastercard"})}),Object(c.jsxs)("td",{children:[Object(c.jsx)("div",{className:"small text-muted",children:"Last login"}),Object(c.jsx)("strong",{children:"10 sec ago"})]})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{className:"text-center",children:Object(c.jsxs)("div",{className:"c-avatar",children:[Object(c.jsx)("img",{src:"avatars/2.jpg",className:"c-avatar-img",alt:"admin@bootstrapmaster.com"}),Object(c.jsx)("span",{className:"c-avatar-status bg-danger"})]})}),Object(c.jsxs)("td",{children:[Object(c.jsx)("div",{children:"Avram Tarasios"}),Object(c.jsxs)("div",{className:"small text-muted",children:[Object(c.jsx)("span",{children:"Recurring"})," | Registered: Jan 1, 2015"]})]}),Object(c.jsx)("td",{className:"text-center",children:Object(c.jsx)(d.a,{height:25,name:"cif-br",title:"br",id:"br"})}),Object(c.jsxs)("td",{children:[Object(c.jsxs)("div",{className:"clearfix",children:[Object(c.jsx)("div",{className:"float-left",children:Object(c.jsx)("strong",{children:"10%"})}),Object(c.jsx)("div",{className:"float-right",children:Object(c.jsx)("small",{className:"text-muted",children:"Jun 11, 2015 - Jul 10, 2015"})})]}),Object(c.jsx)(j.ub,{className:"progress-xs",color:"info",value:"10"})]}),Object(c.jsx)("td",{className:"text-center",children:Object(c.jsx)(d.a,{height:25,name:"cib-cc-visa"})}),Object(c.jsxs)("td",{children:[Object(c.jsx)("div",{className:"small text-muted",children:"Last login"}),Object(c.jsx)("strong",{children:"5 minutes ago"})]})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{className:"text-center",children:Object(c.jsxs)("div",{className:"c-avatar",children:[Object(c.jsx)("img",{src:"avatars/3.jpg",className:"c-avatar-img",alt:"admin@bootstrapmaster.com"}),Object(c.jsx)("span",{className:"c-avatar-status bg-warning"})]})}),Object(c.jsxs)("td",{children:[Object(c.jsx)("div",{children:"Quintin Ed"}),Object(c.jsxs)("div",{className:"small text-muted",children:[Object(c.jsx)("span",{children:"New"})," | Registered: Jan 1, 2015"]})]}),Object(c.jsx)("td",{className:"text-center",children:Object(c.jsx)(d.a,{height:25,name:"cif-in",title:"in",id:"in"})}),Object(c.jsxs)("td",{children:[Object(c.jsxs)("div",{className:"clearfix",children:[Object(c.jsx)("div",{className:"float-left",children:Object(c.jsx)("strong",{children:"74%"})}),Object(c.jsx)("div",{className:"float-right",children:Object(c.jsx)("small",{className:"text-muted",children:"Jun 11, 2015 - Jul 10, 2015"})})]}),Object(c.jsx)(j.ub,{className:"progress-xs",color:"warning",value:"74"})]}),Object(c.jsx)("td",{className:"text-center",children:Object(c.jsx)(d.a,{height:25,name:"cib-stripe"})}),Object(c.jsxs)("td",{children:[Object(c.jsx)("div",{className:"small text-muted",children:"Last login"}),Object(c.jsx)("strong",{children:"1 hour ago"})]})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{className:"text-center",children:Object(c.jsxs)("div",{className:"c-avatar",children:[Object(c.jsx)("img",{src:"avatars/4.jpg",className:"c-avatar-img",alt:"admin@bootstrapmaster.com"}),Object(c.jsx)("span",{className:"c-avatar-status bg-secondary"})]})}),Object(c.jsxs)("td",{children:[Object(c.jsx)("div",{children:"En\xe9as Kwadwo"}),Object(c.jsxs)("div",{className:"small text-muted",children:[Object(c.jsx)("span",{children:"New"})," | Registered: Jan 1, 2015"]})]}),Object(c.jsx)("td",{className:"text-center",children:Object(c.jsx)(d.a,{height:25,name:"cif-fr",title:"fr",id:"fr"})}),Object(c.jsxs)("td",{children:[Object(c.jsxs)("div",{className:"clearfix",children:[Object(c.jsx)("div",{className:"float-left",children:Object(c.jsx)("strong",{children:"98%"})}),Object(c.jsx)("div",{className:"float-right",children:Object(c.jsx)("small",{className:"text-muted",children:"Jun 11, 2015 - Jul 10, 2015"})})]}),Object(c.jsx)(j.ub,{className:"progress-xs",color:"danger",value:"98"})]}),Object(c.jsx)("td",{className:"text-center",children:Object(c.jsx)(d.a,{height:25,name:"cib-paypal"})}),Object(c.jsxs)("td",{children:[Object(c.jsx)("div",{className:"small text-muted",children:"Last login"}),Object(c.jsx)("strong",{children:"Last month"})]})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{className:"text-center",children:Object(c.jsxs)("div",{className:"c-avatar",children:[Object(c.jsx)("img",{src:"avatars/5.jpg",className:"c-avatar-img",alt:"admin@bootstrapmaster.com"}),Object(c.jsx)("span",{className:"c-avatar-status bg-success"})]})}),Object(c.jsxs)("td",{children:[Object(c.jsx)("div",{children:"Agapetus Tade\xe1\u0161"}),Object(c.jsxs)("div",{className:"small text-muted",children:[Object(c.jsx)("span",{children:"New"})," | Registered: Jan 1, 2015"]})]}),Object(c.jsx)("td",{className:"text-center",children:Object(c.jsx)(d.a,{height:25,name:"cif-es",title:"es",id:"es"})}),Object(c.jsxs)("td",{children:[Object(c.jsxs)("div",{className:"clearfix",children:[Object(c.jsx)("div",{className:"float-left",children:Object(c.jsx)("strong",{children:"22%"})}),Object(c.jsx)("div",{className:"float-right",children:Object(c.jsx)("small",{className:"text-muted",children:"Jun 11, 2015 - Jul 10, 2015"})})]}),Object(c.jsx)(j.ub,{className:"progress-xs",color:"info",value:"22"})]}),Object(c.jsx)("td",{className:"text-center",children:Object(c.jsx)(d.a,{height:25,name:"cib-google-pay"})}),Object(c.jsxs)("td",{children:[Object(c.jsx)("div",{className:"small text-muted",children:"Last login"}),Object(c.jsx)("strong",{children:"Last week"})]})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{className:"text-center",children:Object(c.jsxs)("div",{className:"c-avatar",children:[Object(c.jsx)("img",{src:"avatars/6.jpg",className:"c-avatar-img",alt:"admin@bootstrapmaster.com"}),Object(c.jsx)("span",{className:"c-avatar-status bg-danger"})]})}),Object(c.jsxs)("td",{children:[Object(c.jsx)("div",{children:"Friderik D\xe1vid"}),Object(c.jsxs)("div",{className:"small text-muted",children:[Object(c.jsx)("span",{children:"New"})," | Registered: Jan 1, 2015"]})]}),Object(c.jsx)("td",{className:"text-center",children:Object(c.jsx)(d.a,{height:25,name:"cif-pl",title:"pl",id:"pl"})}),Object(c.jsxs)("td",{children:[Object(c.jsxs)("div",{className:"clearfix",children:[Object(c.jsx)("div",{className:"float-left",children:Object(c.jsx)("strong",{children:"43%"})}),Object(c.jsx)("div",{className:"float-right",children:Object(c.jsx)("small",{className:"text-muted",children:"Jun 11, 2015 - Jul 10, 2015"})})]}),Object(c.jsx)(j.ub,{className:"progress-xs",color:"success",value:"43"})]}),Object(c.jsx)("td",{className:"text-center",children:Object(c.jsx)(d.a,{height:25,name:"cib-cc-amex"})}),Object(c.jsxs)("td",{children:[Object(c.jsx)("div",{className:"small text-muted",children:"Last login"}),Object(c.jsx)("strong",{children:"Yesterday"})]})]})]})]})]})]})})})]})}}]),t}(o.a.Component);s.default=f}}]);
//# sourceMappingURL=9.3d437240.chunk.js.map