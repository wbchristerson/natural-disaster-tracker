(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[6],{624:function(e,n,t){"use strict";t.d(n,"a",(function(){return r}));var a=t(636);function r(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var t=[],a=!0,r=!1,o=void 0;try{for(var s,c=e[Symbol.iterator]();!(a=(s=c.next()).done)&&(t.push(s.value),!n||t.length!==n);a=!0);}catch(i){r=!0,o=i}finally{try{a||null==c.return||c.return()}finally{if(r)throw o}}return t}}(e,n)||Object(a.a)(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},628:function(e,n,t){"use strict";t.d(n,"e",(function(){return o})),t.d(n,"a",(function(){return s})),t.d(n,"c",(function(){return c})),t.d(n,"b",(function(){return i})),t.d(n,"g",(function(){return l})),t.d(n,"f",(function(){return u})),t.d(n,"d",(function(){return d})),t.d(n,"m",(function(){return m})),t.d(n,"n",(function(){return h})),t.d(n,"l",(function(){return p})),t.d(n,"h",(function(){return f})),t.d(n,"i",(function(){return j})),t.d(n,"x",(function(){return g})),t.d(n,"v",(function(){return v})),t.d(n,"t",(function(){return x})),t.d(n,"w",(function(){return N})),t.d(n,"u",(function(){return O})),t.d(n,"o",(function(){return y})),t.d(n,"q",(function(){return _})),t.d(n,"p",(function(){return I})),t.d(n,"j",(function(){return w})),t.d(n,"k",(function(){return z})),t.d(n,"r",(function(){return D})),t.d(n,"s",(function(){return k}));var a=t(624),r=t(636);var o="user_access_token",s="No data available from witness reports",c="observer_database_id",i=["Please select","Earthquake","Flood","Wildfire","Tornado","Hurricane","Tsunami","Landslide","Avalanche","Volcano","Other"],l="user_picture",u="user_nickname",d=10,b=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function m(e){var n,t=function(e,n){var t;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(t=Object(r.a)(e))||n&&e&&"number"===typeof e.length){t&&(e=t);var a=0,o=function(){};return{s:o,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,c=!0,i=!1;return{s:function(){t=e[Symbol.iterator]()},n:function(){var e=t.next();return c=e.done,e},e:function(e){i=!0,s=e},f:function(){try{c||null==t.return||t.return()}finally{if(i)throw s}}}}(document.cookie.split(";"));try{for(t.s();!(n=t.n()).done;){var a=n.value.split("=");if((a[0]+"").trim()===e)return a[1]}}catch(o){t.e(o)}finally{t.f()}return""}function h(){return"https://sample-will.herokuapp.com"}function p(){return"https://sample-will.herokuapp.com"}function f(e){return e||s}function j(e){var n=Object(a.a)(e,2),t=n[0],r=n[1];return Math.abs(t)+"\xb0 "+(t>=0?"N":"S")+", "+(Math.abs(r)+"\xb0 "+(r>=0?"E":"W"))}function g(e){if(!/^\s*\d?\d:\d\d(:\d\d)?\s*$/.test(e))return!1;e.trim();var n=parseInt(":"==e.charAt(1)?e.slice(0,1):e.slice(0,2)),t=parseInt(":"==e.charAt(1)?e.slice(2,4):e.slice(3,5)),a=e.length>5?parseInt(":"==e.charAt(1)?e.slice(5,7):e.slice(6,8)):null;return 0<=n&&n<24&&0<=t&&t<60&&0<=a&&a<60}function v(e){return/^\s*\d+\s*$/.test(e)}function x(e){if(!/^\s*-?0*\d\d?\d?(\.\d*)?\s*$/.test(e))return!1;var n=parseInt(e);return-180<=n&&n<=180}function N(e,n,t){if(!/^\s*\d+\s*$/.test(e))return!1;var a=parseInt(e);return n<=a&&a<=t}function O(e){return!0}function y(e){var n=e.trim();return 4==n.length?"0"+n+":00":5==n.length?n+":00":n}function S(e){var n=e.split(" "),t=Object(a.a)(n,6),r=(t[0],t[1]),o=t[2],s=t[3],c=t[4],i=(t[5],c.split(":")),l=Object(a.a)(i,3),u=l[0],d=l[1],m=l[2],h=(b.indexOf(o)+1).toString()+"/"+r+"/"+s;return new Date(h+" "+(u+":"+d+":"+m+" UTC"))}function C(e,n){for(var t=e.toString(),a=t,r=0;r<n-t.length;r++)a="0"+a;return a}function _(e){var n=S(e);return C(n.getHours(),2)+":"+C(n.getMinutes(),2)+":"+C(n.getSeconds(),2)}function I(e){var n=S(e),t=C(n.getMonth()+1,2),a=C(n.getDate(),2);return C(n.getFullYear(),2)+"-"+t+"-"+a}function w(e,n){return"A failure occurred. The ability to ".concat(e," requires admin \n    privileges and it looks like those have not been granted to you. If you \n    would like admin privileges, please ").concat(401==n?"create an account by signing up (for free!) and":""," email me at \n    wbchristerson@gmail.com with your username.")}function z(e){var n=m(o);return"Please note that the ability to ".concat(e," requires admin privileges. If you do \n    not have admin privileges and would like them, please ").concat(n?"":"create an account by signing up (for free!) and"," email me at wbchristerson@gmail.com with\n    your username.")}function D(e){return"Note that you must be logged-in to ".concat(e,". If you do not \n    have an account, you can create one for free by signing up.")}function k(e){return"A failure occurred. You must be logged-in to ".concat(e,". You can\n     create an account (for free!) by signing up.")}},635:function(e,n,t){"use strict";var a=t(1),r=t.n(a),o=r.a.lazy((function(){return t.e(36).then(t.bind(null,694))})),s=r.a.lazy((function(){return t.e(8).then(t.bind(null,656))})),c=r.a.lazy((function(){return t.e(13).then(t.bind(null,657))})),i=r.a.lazy((function(){return t.e(14).then(t.bind(null,658))})),l=r.a.lazy((function(){return t.e(15).then(t.bind(null,659))})),u=r.a.lazy((function(){return t.e(16).then(t.bind(null,660))})),d=r.a.lazy((function(){return t.e(17).then(t.bind(null,661))})),b=r.a.lazy((function(){return t.e(18).then(t.bind(null,662))})),m=r.a.lazy((function(){return t.e(19).then(t.bind(null,663))})),h=r.a.lazy((function(){return t.e(20).then(t.bind(null,664))})),p=r.a.lazy((function(){return t.e(21).then(t.bind(null,665))})),f=r.a.lazy((function(){return t.e(22).then(t.bind(null,666))})),j=r.a.lazy((function(){return t.e(23).then(t.bind(null,667))})),g=r.a.lazy((function(){return t.e(24).then(t.bind(null,668))})),v=r.a.lazy((function(){return t.e(25).then(t.bind(null,669))})),x=r.a.lazy((function(){return t.e(26).then(t.bind(null,670))})),N=r.a.lazy((function(){return t.e(27).then(t.bind(null,671))})),O=r.a.lazy((function(){return t.e(46).then(t.bind(null,672))})),y=r.a.lazy((function(){return t.e(28).then(t.bind(null,673))})),S=r.a.lazy((function(){return t.e(29).then(t.bind(null,674))})),C=r.a.lazy((function(){return t.e(30).then(t.bind(null,675))})),_=r.a.lazy((function(){return Promise.all([t.e(1),t.e(31)]).then(t.bind(null,676))})),I=r.a.lazy((function(){return Promise.all([t.e(1),t.e(39)]).then(t.bind(null,695))})),w=r.a.lazy((function(){return Promise.all([t.e(2),t.e(52),t.e(9)]).then(t.bind(null,680))})),z=r.a.lazy((function(){return Promise.all([t.e(2),t.e(51),t.e(10)]).then(t.bind(null,681))})),D=r.a.lazy((function(){return Promise.all([t.e(2),t.e(32)]).then(t.bind(null,630))})),k=r.a.lazy((function(){return t.e(33).then(t.bind(null,682))})),T=r.a.lazy((function(){return t.e(34).then(t.bind(null,683))})),A=r.a.lazy((function(){return t.e(35).then(t.bind(null,684))})),P=r.a.lazy((function(){return t.e(11).then(t.bind(null,685))})),B=[{path:"/",exact:!0,name:"Home"},{path:"/dashboard",name:"Dashboard",component:I},{path:"/theme",name:"Theme",component:P,exact:!0},{path:"/theme/colors",name:"Colors",component:P},{path:"/theme/typography",name:"Typography",component:r.a.lazy((function(){return t.e(37).then(t.bind(null,686))}))},{path:"/base",name:"Base",component:i,exact:!0},{path:"/base/breadcrumbs",name:"Breadcrumbs",component:c},{path:"/base/cards",name:"Cards",component:i},{path:"/base/carousels",name:"Carousel",component:l},{path:"/base/collapses",name:"Collapse",component:u},{path:"/base/forms",name:"Forms",component:d},{path:"/base/jumbotrons",name:"Jumbotrons",component:b},{path:"/base/list-groups",name:"List Groups",component:m},{path:"/base/navbars",name:"Navbars",component:h},{path:"/base/navs",name:"Navs",component:p},{path:"/base/paginations",name:"Paginations",component:f},{path:"/base/popovers",name:"Popovers",component:j},{path:"/base/progress-bar",name:"Progress Bar",component:g},{path:"/base/switches",name:"Switches",component:v},{path:"/base/tables",name:"Tables",component:s},{path:"/base/tabs",name:"Tabs",component:x},{path:"/base/tooltips",name:"Tooltips",component:N},{path:"/buttons",name:"Buttons",component:C,exact:!0},{path:"/buttons/buttons",name:"Buttons",component:C},{path:"/buttons/button-dropdowns",name:"Dropdowns",component:y},{path:"/buttons/button-groups",name:"Button Groups",component:S},{path:"/buttons/brand-buttons",name:"Brand Buttons",component:O},{path:"/charts",name:"Charts",component:_},{path:"/icons",exact:!0,name:"Icons",component:w},{path:"/icons/coreui-icons",name:"CoreUI Icons",component:w},{path:"/icons/flags",name:"Flags",component:z},{path:"/icons/brands",name:"Brands",component:D},{path:"/notifications",name:"Notifications",component:k,exact:!0},{path:"/notifications/alerts",name:"Alerts",component:k},{path:"/notifications/badges",name:"Badges",component:T},{path:"/notifications/modals",name:"Modals",component:A},{path:"/notifications/toaster",name:"Toaster",component:o},{path:"/widgets",name:"Widgets",component:r.a.lazy((function(){return Promise.all([t.e(1),t.e(7)]).then(t.bind(null,687))}))},{path:"/users",exact:!0,name:"Users",component:r.a.lazy((function(){return t.e(41).then(t.bind(null,688))}))},{path:"/users/:id",exact:!0,name:"User Details",component:r.a.lazy((function(){return t.e(40).then(t.bind(null,689))}))},{path:"/add-disaster-event",name:"Add Disaster Event",component:r.a.lazy((function(){return t.e(42).then(t.bind(null,690))}))},{path:"/single-disaster-display",name:"Single Disaster Display",component:r.a.lazy((function(){return t.e(45).then(t.bind(null,691))}))},{path:"/edit-disaster-event",name:"Edit Disaster Event",component:r.a.lazy((function(){return t.e(43).then(t.bind(null,692))}))},{path:"/edit-witness-report",name:"Edit Witness Report",component:r.a.lazy((function(){return t.e(44).then(t.bind(null,693))}))}];n.a=B},636:function(e,n,t){"use strict";t.d(n,"a",(function(){return r}));var a=t(639);function r(e,n){if(e){if("string"===typeof e)return Object(a.a)(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Object(a.a)(e,n):void 0}}},637:function(e,n,t){"use strict";t.r(n);var a=t(20),r=(t(1),t(643));n.default=function(){return Object(a.jsxs)("div",{className:"c-app c-default-layout",children:[Object(a.jsx)(r.e,{}),Object(a.jsxs)("div",{className:"c-wrapper",children:[Object(a.jsx)(r.c,{}),Object(a.jsx)("div",{className:"c-body",children:Object(a.jsx)(r.a,{})}),Object(a.jsx)(r.b,{})]})]})}},639:function(e,n,t){"use strict";function a(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,a=new Array(n);t<n;t++)a[t]=e[t];return a}t.d(n,"a",(function(){return a}))},643:function(e,n,t){"use strict";t.d(n,"a",(function(){return b})),t.d(n,"b",(function(){return h})),t.d(n,"c",(function(){return g})),t.d(n,"d",(function(){return v})),t.d(n,"e",(function(){return O}));var a=t(20),r=t(44),o=t(1),s=t.n(o),c=t(19),i=t(621),l=t(635),u=Object(a.jsx)("div",{className:"pt-3 text-center",children:Object(a.jsx)("div",{className:"sk-spinner sk-spinner-pulse"})}),d=function(){return Object(a.jsx)("main",{className:"c-main",children:Object(a.jsx)(i.x,{fluid:!0,children:Object(a.jsx)(o.Suspense,{fallback:u,children:Object(a.jsxs)(c.d,{children:[l.a.map((function(e,n){return e.component&&Object(a.jsx)(c.b,{path:e.path,exact:e.exact,name:e.name,render:function(n){return Object(a.jsx)(i.I,{children:Object(a.jsx)(e.component,Object(r.a)({},n))})}},n)})),Object(a.jsx)(c.a,{from:"/",to:"/dashboard"})]})})})})},b=s.a.memo(d),m=function(){return Object(a.jsxs)(i.J,{fixed:!1,children:[Object(a.jsxs)("div",{children:[Object(a.jsx)("a",{href:"https://coreui.io",target:"_blank",rel:"noopener noreferrer",children:"CoreUI"}),Object(a.jsx)("span",{className:"ml-1",children:"\xa9 2020 creativeLabs."})]}),Object(a.jsxs)("div",{className:"mfs-auto",children:[Object(a.jsx)("span",{className:"mr-1",children:"Powered by"}),Object(a.jsx)("a",{href:"https://coreui.io/react",target:"_blank",rel:"noopener noreferrer",children:"CoreUI for React"})]})]})},h=s.a.memo(m),p=t(166),f=t(623),j=t(628),g=function(){var e=Object(p.b)(),n=Object(p.c)((function(e){return e.sidebarShow})),t=""==Object(j.m)(j.e);return Object(a.jsxs)(i.N,{withSubheader:!0,children:[Object(a.jsx)(i.Rb,{inHeader:!0,className:"ml-md-3 d-lg-none",onClick:function(){var t=!![!1,"responsive"].includes(n)||"responsive";e({type:"set",sidebarShow:t})}}),Object(a.jsx)(i.Rb,{inHeader:!0,className:"ml-3 d-md-down-none",onClick:function(){var t=![!0,"responsive"].includes(n)&&"responsive";e({type:"set",sidebarShow:t})}}),Object(a.jsx)(i.O,{className:"mx-auto d-lg-none",to:"/",children:Object(a.jsx)(f.a,{name:"logo",height:"48",alt:"Logo"})}),Object(a.jsxs)(i.P,{className:"d-md-down-none mr-auto",children:[Object(a.jsx)(i.Q,{className:"px-3",children:Object(a.jsx)(i.R,{to:"/dashboard",children:"Dashboard"})}),Object(a.jsx)(i.Q,{className:"px-3",children:Object(a.jsx)(i.R,{to:"/users",children:"Users"})}),Object(a.jsx)(i.Q,{className:"px-3",children:Object(a.jsx)(i.R,{children:"Settings"})})]}),Object(a.jsxs)(i.P,{className:"px-3",children:[!t&&Object(a.jsx)("div",{className:"top-log-in-greeting",children:"Hello, ".concat(Object(j.m)(j.f),"!")}),t&&Object(a.jsx)("div",{className:"login-box auth0-box before",children:Object(a.jsx)("a",{className:"btn btn-primary btn-lg btn-login btn-block",href:"".concat(Object(j.l)(),"/my-login"),children:"Log In"})}),!t&&Object(a.jsx)("div",{className:"logged-in-box auth0-box logged-in",children:Object(a.jsx)("a",{className:"btn btn-primary btn-lg btn-logout btn-block",href:"".concat(Object(j.l)(),"/my-logout"),children:"Logout"})}),Object(a.jsx)(v,{})]}),Object(a.jsxs)(i.Hb,{className:"px-3 justify-content-between",children:[Object(a.jsx)(i.e,{className:"border-0 c-subheader-nav m-0 px-0 px-md-3",routes:l.a}),Object(a.jsxs)("div",{className:"d-md-down-none mfe-2 c-subheader-nav",children:[Object(a.jsx)(i.eb,{className:"c-subheader-nav-link",href:"#",children:Object(a.jsx)(f.a,{name:"cil-speech",alt:"Settings"})}),Object(a.jsxs)(i.eb,{className:"c-subheader-nav-link","aria-current":"page",to:"/dashboard",children:[Object(a.jsx)(f.a,{name:"cil-graph",alt:"Dashboard"}),"\xa0Dashboard"]}),Object(a.jsxs)(i.eb,{className:"c-subheader-nav-link",href:"#",children:[Object(a.jsx)(f.a,{name:"cil-settings",alt:"Settings"}),"\xa0Settings"]})]})]})]})},v=function(){var e=""==Object(j.m)(j.e);return console.log(Object(j.m)(j.g).slice(1,-1)),Object(a.jsxs)(i.A,{inNav:!0,className:"c-header-nav-items mx-2",direction:"down",children:[!e&&Object(a.jsx)(i.F,{className:"c-header-nav-link",caret:!1,children:Object(a.jsx)("div",{className:"c-avatar",children:Object(a.jsx)(i.S,{src:Object(j.m)(j.g).slice(1,-1),className:"c-avatar-img",alt:"admin@bootstrapmaster.com"})})}),Object(a.jsxs)(i.E,{className:"pt-0",placement:"bottom-end",children:[Object(a.jsx)(i.D,{header:!0,tag:"div",color:"light",className:"text-center",children:Object(a.jsx)("strong",{children:"Account"})}),Object(a.jsxs)(i.D,{children:[Object(a.jsx)(f.a,{name:"cil-bell",className:"mfe-2"}),"Updates",Object(a.jsx)(i.b,{color:"info",className:"mfs-auto",children:"42"})]}),Object(a.jsxs)(i.D,{children:[Object(a.jsx)(f.a,{name:"cil-envelope-open",className:"mfe-2"}),"Messages",Object(a.jsx)(i.b,{color:"success",className:"mfs-auto",children:"42"})]}),Object(a.jsxs)(i.D,{children:[Object(a.jsx)(f.a,{name:"cil-task",className:"mfe-2"}),"Tasks",Object(a.jsx)(i.b,{color:"danger",className:"mfs-auto",children:"42"})]}),Object(a.jsxs)(i.D,{children:[Object(a.jsx)(f.a,{name:"cil-comment-square",className:"mfe-2"}),"Comments",Object(a.jsx)(i.b,{color:"warning",className:"mfs-auto",children:"42"})]}),Object(a.jsx)(i.D,{header:!0,tag:"div",color:"light",className:"text-center",children:Object(a.jsx)("strong",{children:"Settings"})}),Object(a.jsxs)(i.D,{children:[Object(a.jsx)(f.a,{name:"cil-user",className:"mfe-2"}),"Profile"]}),Object(a.jsxs)(i.D,{children:[Object(a.jsx)(f.a,{name:"cil-settings",className:"mfe-2"}),"Settings"]}),Object(a.jsxs)(i.D,{children:[Object(a.jsx)(f.a,{name:"cil-credit-card",className:"mfe-2"}),"Payments",Object(a.jsx)(i.b,{color:"secondary",className:"mfs-auto",children:"42"})]}),Object(a.jsxs)(i.D,{children:[Object(a.jsx)(f.a,{name:"cil-file",className:"mfe-2"}),"Projects",Object(a.jsx)(i.b,{color:"primary",className:"mfs-auto",children:"42"})]}),Object(a.jsx)(i.D,{divider:!0}),Object(a.jsxs)(i.D,{children:[Object(a.jsx)(f.a,{name:"cil-lock-locked",className:"mfe-2"}),"Lock Account"]})]})]})},x=(t(637),[{_tag:"CSidebarNavItem",name:"Dashboard",to:"/dashboard",icon:Object(a.jsx)(f.a,{name:"cil-speedometer",customClasses:"c-sidebar-nav-icon"}),badge:{color:"info",text:"NEW"}},{_tag:"CSidebarNavTitle",_children:["Theme"]},{_tag:"CSidebarNavItem",name:"Colors",to:"/theme/colors",icon:"cil-drop"},{_tag:"CSidebarNavItem",name:"Typography",to:"/theme/typography",icon:"cil-pencil"},{_tag:"CSidebarNavTitle",_children:["Components"]},{_tag:"CSidebarNavDropdown",name:"Base",route:"/base",icon:"cil-puzzle",_children:[{_tag:"CSidebarNavItem",name:"Breadcrumb",to:"/base/breadcrumbs"},{_tag:"CSidebarNavItem",name:"Cards",to:"/base/cards"},{_tag:"CSidebarNavItem",name:"Carousel",to:"/base/carousels"},{_tag:"CSidebarNavItem",name:"Collapse",to:"/base/collapses"},{_tag:"CSidebarNavItem",name:"Forms",to:"/base/forms"},{_tag:"CSidebarNavItem",name:"Jumbotron",to:"/base/jumbotrons"},{_tag:"CSidebarNavItem",name:"List group",to:"/base/list-groups"},{_tag:"CSidebarNavItem",name:"Navs",to:"/base/navs"},{_tag:"CSidebarNavItem",name:"Navbars",to:"/base/navbars"},{_tag:"CSidebarNavItem",name:"Pagination",to:"/base/paginations"},{_tag:"CSidebarNavItem",name:"Popovers",to:"/base/popovers"},{_tag:"CSidebarNavItem",name:"Progress",to:"/base/progress-bar"},{_tag:"CSidebarNavItem",name:"Switches",to:"/base/switches"},{_tag:"CSidebarNavItem",name:"Tables",to:"/base/tables"},{_tag:"CSidebarNavItem",name:"Tabs",to:"/base/tabs"},{_tag:"CSidebarNavItem",name:"Tooltips",to:"/base/tooltips"}]},{_tag:"CSidebarNavDropdown",name:"Buttons",route:"/buttons",icon:"cil-cursor",_children:[{_tag:"CSidebarNavItem",name:"Buttons",to:"/buttons/buttons"},{_tag:"CSidebarNavItem",name:"Brand buttons",to:"/buttons/brand-buttons"},{_tag:"CSidebarNavItem",name:"Buttons groups",to:"/buttons/button-groups"},{_tag:"CSidebarNavItem",name:"Dropdowns",to:"/buttons/button-dropdowns"}]},{_tag:"CSidebarNavItem",name:"Charts",to:"/charts",icon:"cil-chart-pie"},{_tag:"CSidebarNavDropdown",name:"Icons",route:"/icons",icon:"cil-star",_children:[{_tag:"CSidebarNavItem",name:"CoreUI Free",to:"/icons/coreui-icons",badge:{color:"success",text:"NEW"}},{_tag:"CSidebarNavItem",name:"CoreUI Flags",to:"/icons/flags"},{_tag:"CSidebarNavItem",name:"CoreUI Brands",to:"/icons/brands"}]},{_tag:"CSidebarNavDropdown",name:"Notifications",route:"/notifications",icon:"cil-bell",_children:[{_tag:"CSidebarNavItem",name:"Alerts",to:"/notifications/alerts"},{_tag:"CSidebarNavItem",name:"Badges",to:"/notifications/badges"},{_tag:"CSidebarNavItem",name:"Modal",to:"/notifications/modals"},{_tag:"CSidebarNavItem",name:"Toaster",to:"/notifications/toaster"}]},{_tag:"CSidebarNavItem",name:"Widgets",to:"/widgets",icon:"cil-calculator",badge:{color:"info",text:"NEW"}},{_tag:"CSidebarNavDivider"},{_tag:"CSidebarNavTitle",_children:["Extras"]},{_tag:"CSidebarNavDropdown",name:"Pages",route:"/pages",icon:"cil-star",_children:[{_tag:"CSidebarNavItem",name:"Login",to:"/login"},{_tag:"CSidebarNavItem",name:"Register",to:"/register"},{_tag:"CSidebarNavItem",name:"Error 404",to:"/404"},{_tag:"CSidebarNavItem",name:"Error 500",to:"/500"}]},{_tag:"CSidebarNavItem",name:"Disabled",icon:"cil-ban",badge:{color:"secondary",text:"NEW"},addLinkClass:"c-disabled",disabled:!0},{_tag:"CSidebarNavDivider",className:"m-2"},{_tag:"CSidebarNavTitle",_children:["Labels"]},{_tag:"CSidebarNavItem",name:"Label danger",to:"",icon:{name:"cil-star",className:"text-danger"},label:!0},{_tag:"CSidebarNavItem",name:"Label info",to:"",icon:{name:"cil-star",className:"text-info"},label:!0},{_tag:"CSidebarNavItem",name:"Label warning",to:"",icon:{name:"cil-star",className:"text-warning"},label:!0},{_tag:"CSidebarNavDivider",className:"m-2"}]),N=function(){var e=Object(p.b)(),n=Object(p.c)((function(e){return e.sidebarShow}));return Object(a.jsxs)(i.zb,{show:n,onShowChange:function(n){return e({type:"set",sidebarShow:n})},children:[Object(a.jsxs)(i.Ab,{className:"d-md-down-none",to:"/",children:[Object(a.jsx)(f.a,{className:"c-sidebar-brand-full",name:"logo-negative",height:35}),Object(a.jsx)(f.a,{className:"c-sidebar-brand-minimized",name:"sygnet",height:35})]}),Object(a.jsx)(i.Cb,{children:Object(a.jsx)(i.y,{items:x,components:{CSidebarNavDivider:i.Db,CSidebarNavDropdown:i.Eb,CSidebarNavItem:i.Fb,CSidebarNavTitle:i.Gb}})}),Object(a.jsx)(i.Bb,{className:"c-d-md-down-none"})]})},O=s.a.memo(N)}}]);
//# sourceMappingURL=6.5e0ae933.chunk.js.map