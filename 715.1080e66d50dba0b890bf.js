(window.webpackJsonphabbiton=window.webpackJsonphabbiton||[]).push([[715],{6715:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>O});var r=t(7294),o=t.n(r),a=t(6550),l=t(6441),c="C:\\Web\\habbiton\\src\\elements\\InputField\\InputField.js";function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function u(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function m(e){var n=(0,r.useContext)(l.N).settings,t=e.inputId,a=e.inputType,i=e.placeholder,s=e.label,m=e.className,f=e.value,p=e.onChange,A={color:n.color},d={background:n.inputBg,border:n.inputBorder},y="flex-column ".concat(m);return o().createElement("div",{className:y,__self:this,__source:{fileName:c,lineNumber:20,columnNumber:9}},o().createElement(b,{forId:t,caption:s,theme:A,__self:this,__source:{fileName:c,lineNumber:21,columnNumber:13}}),o().createElement("input",{id:t,style:u(u({},d),A),type:a,placeholder:i,value:f,min:1,onChange:function(e){var n=e.target.value;return"number"===a&&(n=+n),p(n)},__self:this,__source:{fileName:c,lineNumber:26,columnNumber:13}}))}function b(e){var n=e.caption,t=e.forId,r=e.theme;return n?o().createElement("label",{htmlFor:t,style:r,__self:this,__source:{fileName:c,lineNumber:51,columnNumber:9}},n):""}var f=t(3379),p=t.n(f),A=t(2475),d={insert:"head",singleton:!1};p()(A.Z,d);A.Z.locals;var y="C:\\Web\\habbiton\\src\\elements\\WeekdaySelector\\WeekdaySelector.js";function N(e){var n=this,t={color:(0,r.useContext)(l.N).settings.color},a=e.selection,c=e.onSelect,i=["Mon","Tue","Wed","Thu","Fri","Sun","Sat"].map((function(e,t){return o().createElement("div",{key:e,__self:n,__source:{fileName:y,lineNumber:15,columnNumber:13}},o().createElement("input",{className:"weekdaySelector-input",id:e,type:"checkbox",name:"option2",value:"true",key:e,checked:a[t],onChange:function(e){return c(t,e.target.checked)},__self:n,__source:{fileName:y,lineNumber:16,columnNumber:17}}),o().createElement("label",{className:"weekdaySelector-label",htmlFor:e,__self:n,__source:{fileName:y,lineNumber:26,columnNumber:17}},e))}));return o().createElement("div",{className:"flex-column margin-bottom",__self:this,__source:{fileName:y,lineNumber:32,columnNumber:9}},o().createElement("div",{className:"weekdaySelector-caption",style:t,__self:this,__source:{fileName:y,lineNumber:33,columnNumber:13}},"Active days"),o().createElement("div",{className:"flex-row",__self:this,__source:{fileName:y,lineNumber:34,columnNumber:13}},i))}var _=t(2033),h="C:\\Web\\habbiton\\src\\routes\\Edit.js";function g(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function k(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?g(Object(t),!0).forEach((function(n){v(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):g(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function v(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function w(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var t=[],r=!0,o=!1,a=void 0;try{for(var l,c=e[Symbol.iterator]();!(r=(l=c.next()).done)&&(t.push(l.value),!n||t.length!==n);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return t}(e,n)||function(e,n){if(!e)return;if("string"==typeof e)return E(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return E(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function O(e){var n,t=(0,a.k6)(),c=e.habits,i=e.updateHabits,u=(0,a.UO)().id;n=u?c.find((function(e){return e.key===+u})):{title:"",dateRange:[(0,_.L)(),null],countNumber:1,weekDays:[!0,!0,!0,!0,!0,!1,!1]};var s=w((0,r.useState)(n),2),b=s[0],f=s[1],p=(0,r.useContext)(l.N).settings,A={background:p.contentBg},d={color:p.color};return o().createElement("div",{className:"block flex-column margin-bottom",style:A,__self:this,__source:{fileName:h,lineNumber:42,columnNumber:9}},o().createElement("h1",{style:d,__self:this,__source:{fileName:h,lineNumber:43,columnNumber:13}},u?"Edit ":"Add new ","habit"),o().createElement(m,{className:"margin-bottom",inputId:"caption",label:"Caption",placeholder:"Habit name",inputType:"text",value:b.title,onChange:function(e){return f(k(k({},b),{title:e}))},__self:this,__source:{fileName:h,lineNumber:48,columnNumber:13}}),o().createElement(m,{className:"margin-bottom",inputId:"countNumber",label:"How many times per day",inputType:"number",value:b.countNumber,onChange:function(e){return f(k(k({},b),{countNumber:e}))},__self:this,__source:{fileName:h,lineNumber:58,columnNumber:13}}),o().createElement(N,{selection:b.weekDays,onSelect:function(e,n){var t=b.weekDays.slice(0);t[e]=n,f(k(k({},b),{weekDays:t}))},__self:this,__source:{fileName:h,lineNumber:67,columnNumber:13}}),o().createElement("div",{className:"flex-row",__self:this,__source:{fileName:h,lineNumber:76,columnNumber:13}},o().createElement("button",{type:"button",className:"button-accented",onClick:function(){var e=u||+c.sort((function(e,n){return e.key-n.key})).reverse()[0].key+1,n=k(k({},b),{key:+e});i(n,u),t.push("/")},__self:this,__source:{fileName:h,lineNumber:77,columnNumber:17}},u?"Save":"Add"),o().createElement("button",{type:"button",className:"button-unaccented margin-left",style:d,onClick:function(){return t.push("/")},__self:this,__source:{fileName:h,lineNumber:85,columnNumber:17}},"Cancel")))}},2475:(e,n,t)=>{"use strict";t.d(n,{Z:()=>c});var r=t(4015),o=t.n(r),a=t(3645),l=t.n(a)()(o());l.push([e.id,"@keyframes fadeInAnimation {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n.weekdaySelector-caption {\n  margin: 0 0 4px 0;\n  padding: 0;\n  font-size: 14px;\n  font-weight: bold;\n  transition: 0.5s ease-out;\n}\n.weekdaySelector-input {\n  display: none;\n}\n.weekdaySelector-input:checked + .weekdaySelector-label {\n  background: #7fd7e7;\n  color: #fff;\n}\n.weekdaySelector-label {\n  cursor: pointer;\n  display: block;\n  padding: 6px 12px;\n  margin-right: 12px;\n  background: #fafbfc;\n  color: #9e9e9e;\n}\n","",{version:3,sources:["webpack://./src/constants.less","webpack://./src/elements/WeekdaySelector/WeekdaySelector.less"],names:[],mappings:"AAOA;EACI;IAAI,UAAA;ECLN;EDME;IAAM,UAAA;ECHR;AACF;AAJI;EACI,iBAAA;EACA,UAAA;EACA,eAAA;EACA,iBAAA;EACA,yBAAA;AAMR;AAJI;EACI,aAAA;AAMR;AALQ;EACI,mBAAA;EACA,WAAA;AAOZ;AAHI;EACI,eAAA;EACA,cAAA;EACA,iBAAA;EACA,kBAAA;EACA,mBAAA;EACA,cAAA;AAKR",sourcesContent:["@background: #fff;\n@light: #d7f9ff;\n@accentColor: #f58b79;\n@transition: 0.5s ease-out;\n\n@fadeIn: fadeInAnimation 0.5s ease-in;\n\n@keyframes fadeInAnimation {\n    0% {opacity:0;}\n    100% {opacity:1;}\n}\n",'@import "../../constants.less";\n\n.weekdaySelector {\n    &-caption {\n        margin: 0 0 4px 0;\n        padding: 0;\n        font-size: 14px;\n        font-weight: bold;\n        transition: @transition;\n    }\n    &-input {\n        display: none;\n        &:checked + .weekdaySelector-label {\n            background: #7fd7e7;\n            color: #fff;\n        }\n    }\n\n    &-label {\n        cursor: pointer;\n        display: block;\n        padding: 6px 12px;\n        margin-right: 12px;\n        background: #fafbfc;\n        color: #9e9e9e;\n    }\n}\n'],sourceRoot:""}]);const c=l}}]);