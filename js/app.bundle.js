!function(n){var e={};function t(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return n[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=n,t.c=e,t.i=function(n){return n},t.d=function(n,e,o){t.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:o})},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=11)}([function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){var n="tasks",e=void 0;function t(){return JSON.parse(localStorage.getItem(n))||[]}function o(){localStorage.setItem(n,JSON.stringify(e))}function i(n){return e.filter(n).map(function(n){return n.id})}return{init:function(){e=t()},getTasks:t,addTask:function(n){var t=e.length;return e.push({id:t,description:n,completed:!1}),o(),t},switchTaskStatus:function(n){var t=!e[n].completed;return e[n].completed=t,o(),t},getCompletedTaskIds:function(){return i(function(n){return!0===n.completed})},getActiveTaskIds:function(){return i(function(n){return!1===n.completed})},removeTask:function(n){e=e.filter(function(e){return e.id!==n}),o()},resetTasks:function(){e=[],localStorage.removeItem(n)}}}()},function(n,e){n.exports=function(n){var e=[];return e.toString=function(){return this.map(function(e){var t=function(n,e){var t=n[1]||"",o=n[3];if(!o)return t;if(e&&"function"==typeof btoa){var i=(a=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),r=o.sources.map(function(n){return"/*# sourceURL="+o.sourceRoot+n+" */"});return[t].concat(r).concat([i]).join("\n")}var a;return[t].join("\n")}(e,n);return e[2]?"@media "+e[2]+"{"+t+"}":t}).join("")},e.i=function(n,t){"string"==typeof n&&(n=[[null,n,""]]);for(var o={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(o[r]=!0)}for(i=0;i<n.length;i++){var a=n[i];"number"==typeof a[0]&&o[a[0]]||(t&&!a[2]?a[2]=t:t&&(a[2]="("+a[2]+") and ("+t+")"),e.push(a))}},e}},function(n,e,t){var o,i,r,a={},s=(o=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===i&&(i=o.apply(this,arguments)),i}),d=(r={},function(n){if(void 0===r[n]){var e=function(n){return document.querySelector(n)}.call(this,n);if(e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(n){e=null}r[n]=e}return r[n]}),l=null,c=0,u=[],p=t(10);function f(n,e){for(var t=0;t<n.length;t++){var o=n[t],i=a[o.id];if(i){i.refs++;for(var r=0;r<i.parts.length;r++)i.parts[r](o.parts[r]);for(;r<o.parts.length;r++)i.parts.push(x(o.parts[r],e))}else{var s=[];for(r=0;r<o.parts.length;r++)s.push(x(o.parts[r],e));a[o.id]={id:o.id,refs:1,parts:s}}}}function b(n,e){for(var t=[],o={},i=0;i<n.length;i++){var r=n[i],a=e.base?r[0]+e.base:r[0],s={css:r[1],media:r[2],sourceMap:r[3]};o[a]?o[a].parts.push(s):t.push(o[a]={id:a,parts:[s]})}return t}function h(n,e){var t=d(n.insertInto);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=u[u.length-1];if("top"===n.insertAt)o?o.nextSibling?t.insertBefore(e,o.nextSibling):t.appendChild(e):t.insertBefore(e,t.firstChild),u.push(e);else if("bottom"===n.insertAt)t.appendChild(e);else{if("object"!=typeof n.insertAt||!n.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var i=d(n.insertInto+" "+n.insertAt.before);t.insertBefore(e,i)}}function m(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n);var e=u.indexOf(n);e>=0&&u.splice(e,1)}function y(n){var e=document.createElement("style");return n.attrs.type="text/css",g(e,n.attrs),h(n,e),e}function g(n,e){Object.keys(e).forEach(function(t){n.setAttribute(t,e[t])})}function x(n,e){var t,o,i,r,a,s;if(e.transform&&n.css){if(!(r=e.transform(n.css)))return function(){};n.css=r}if(e.singleton){var d=c++;t=l||(l=y(e)),o=k.bind(null,t,d,!1),i=k.bind(null,t,d,!0)}else n.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(a=e,s=document.createElement("link"),a.attrs.type="text/css",a.attrs.rel="stylesheet",g(s,a.attrs),h(a,s),o=function(n,e,t){var o=t.css,i=t.sourceMap,r=void 0===e.convertToAbsoluteUrls&&i;(e.convertToAbsoluteUrls||r)&&(o=p(o));i&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var a=new Blob([o],{type:"text/css"}),s=n.href;n.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,t=s,e),i=function(){m(t),t.href&&URL.revokeObjectURL(t.href)}):(t=y(e),o=function(n,e){var t=e.css,o=e.media;o&&n.setAttribute("media",o);if(n.styleSheet)n.styleSheet.cssText=t;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(t))}}.bind(null,t),i=function(){m(t)});return o(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;o(n=e)}else i()}}n.exports=function(n,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=s()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var t=b(n,e);return f(t,e),function(n){for(var o=[],i=0;i<t.length;i++){var r=t[i];(s=a[r.id]).refs--,o.push(s)}n&&f(b(n,e),e);for(i=0;i<o.length;i++){var s;if(0===(s=o[i]).refs){for(var d=0;d<s.parts.length;d++)s.parts[d]();delete a[s.id]}}}};var v,w=(v=[],function(n,e){return v[n]=e,v.filter(Boolean).join("\n")});function k(n,e,t,o){var i=t?"":o.css;if(n.styleSheet)n.styleSheet.cssText=w(e,i);else{var r=document.createTextNode(i),a=n.childNodes;a[e]&&n.removeChild(a[e]),a.length?n.insertBefore(r,a[e]):n.appendChild(r)}}},function(n,e,t){"use strict";var o=r(t(0)),i=r(t(7));function r(n){return n&&n.__esModule?n:{default:n}}!function(n){n.addEventListener("load",function(){o.default.init(),i.default.init()})}(window)},function(n,e,t){var o=t(8);"string"==typeof o&&(o=[[n.i,o,""]]);var i={hmr:!0,transform:void 0};t(2)(o,i);o.locals&&(n.exports=o.locals)},function(n,e,t){var o=t(9);"string"==typeof o&&(o=[[n.i,o,""]]);var i={hmr:!0,transform:void 0};t(2)(o,i);o.locals&&(n.exports=o.locals)},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={getCurrentDay:function(n){return["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date(n).getDay()]},getCurrentDate:function(n){var e=new Date(n),t=(e=e.getDate())%10,o=e%100;return 1===t&&11!==o?e+"st":2===t&&12!==o?e+"nd":3===t&&13!==o?e+"rd":e+"th"},getCurrentMonth:function(n){return["January","February","March","April","May","June","July","August","September","October","November","December"][new Date(n).getMonth()]},showElement:function(n){n.style.display="block"},hideElement:function(n){n.style.display="none"}}},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){return function(n,e){if(Array.isArray(n))return n;if(Symbol.iterator in Object(n))return function(n,e){var t=[],o=!0,i=!1,r=void 0;try{for(var a,s=n[Symbol.iterator]();!(o=(a=s.next()).done)&&(t.push(a.value),!e||t.length!==e);o=!0);}catch(n){i=!0,r=n}finally{try{!o&&s.return&&s.return()}finally{if(i)throw r}}return t}(n,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=a(t(6)),r=a(t(0));function a(n){return n&&n.__esModule?n:{default:n}}e.default=function(){var n={},e=document.getElementById("date"),t=document.getElementById("month"),a=document.getElementById("task-count"),s=document.getElementById("new-task-input"),d=document.getElementById("new-task-button"),l=document.getElementById("task-list"),c=document.getElementById("show-menu"),u=document.getElementById("show-all"),p=document.getElementById("show-active"),f=document.getElementById("show-completed"),b=l.querySelector(".empty-list-message");function h(){var n,e=r.default.getActiveTaskIds().length;n=e,a.innerHTML=n+" Active tasks"}function m(e){Object.entries(n).forEach(function(n){var t=o(n,2),r=t[0],a=t[1];e.includes(Number(r))?i.default.showElement(a):i.default.hideElement(a)})}function y(){var n=r.default.getTasks();h(),0===Object.entries(n).length?(i.default.showElement(b),i.default.hideElement(c)):(i.default.hideElement(b),i.default.showElement(c))}function g(n){[u,p,f].forEach(function(e){e.className=e===n?"active":""})}function x(e,t,o){var i=document.createElement("li");i.innerHTML='\n      <div class="checkbox">\n          <input type="checkbox" id="checkbox-'+e+'" '+(o?"checked":"")+'/>\n          <label for="checkbox-'+e+'"></label>\n      </div>\n      <p class="'+(o?"completed":"")+'">'+t+'</p>\n      <span class="remove-task" title="Remove this task">&#10005;</span>\n    ',n[e]=i,i.querySelector("input").addEventListener("click",function(){return o=n[t=e].querySelector("p"),i=r.default.switchTaskStatus(t),o.className=!0===i?"completed":"",void h();var t,o,i}),i.querySelector("span").addEventListener("click",function(){return t=e,r.default.removeTask(t),l.removeChild(n[t]),void delete n[t];var t}),l.insertBefore(i,l.firstChild)}function v(){var n=s.value;n.length>0&&(x(r.default.addTask(n),n,!1),s.value="")}function w(){d.addEventListener("click",v),s.addEventListener("keyup",function(n){13===n.keyCode&&d.click()}),l.addEventListener("DOMNodeInserted",y),l.addEventListener("DOMNodeRemoved",y),u.addEventListener("click",function(){Object.values(n).forEach(function(n){i.default.showElement(n)}),g(u)}),p.addEventListener("click",function(){m(r.default.getActiveTaskIds()),g(p)}),f.addEventListener("click",function(){m(r.default.getCompletedTaskIds()),g(f)})}return{init:function(){var n,o,a,s;w(),n=Date.now(),o=i.default.getCurrentDay(n),a=i.default.getCurrentDate(n),s=i.default.getCurrentMonth(n),e.innerHTML='<span class="day">'+o+",</span> "+a,t.innerHTML=s,i.default.hideElement(c),r.default.getTasks().forEach(function(n){x(n.id,n.description,n.completed)});var d=document.querySelector("section");i.default.showElement(d)}}}()},function(n,e,t){(n.exports=t(1)(!1)).push([n.i,"html, body {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  height: 100%;\n  margin: 0;\n  width: 100%; }\n\nbody {\n  background: #2c3e50;\n  color: #374A5C;\n  font-family: 'Roboto', sans-serif;\n  font-size: 17px;\n  font-style: normal;\n  font-weight: 300; }\n  body img {\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n    z-index: -1; }\n  body h1 {\n    color: #F6F6F6;\n    font-size: 45px;\n    font-weight: 100;\n    margin-top: 100px;\n    text-align: center; }\n    @media (max-width: 600px) {\n      body h1 {\n        margin-top: 25px;\n        font-size: 40px; } }\n    body h1 .line {\n      display: inline-block; }\n  body div.new-task {\n    font-size: 0;\n    margin-top: 40px;\n    padding: 0 10px;\n    text-align: center; }\n    @media (max-width: 600px) {\n      body div.new-task {\n        margin-top: 25px; } }\n    body div.new-task input {\n      border: 0;\n      border-radius: 5px 0 0 5px;\n      -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n              box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      color: #27ae60;\n      font-size: 18px;\n      font-weight: 100;\n      height: 36px;\n      outline: none;\n      padding: 0 12px;\n      width: 265px; }\n      @media (max-width: 600px) {\n        body div.new-task input {\n          width: calc(100% - 110px);\n          border-radius: 0; } }\n      body div.new-task input::-webkit-input-placeholder {\n        color: #939393; }\n      body div.new-task input:-ms-input-placeholder {\n        color: #939393; }\n      body div.new-task input::-ms-input-placeholder {\n        color: #939393; }\n      body div.new-task input::placeholder {\n        color: #939393; }\n    body div.new-task button {\n      background: #2CC36B;\n      border: 0;\n      border-radius: 0 5px 5px 0;\n      -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n              box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      color: #F6F6F6;\n      font-size: 18px;\n      font-weight: 100;\n      height: 36px;\n      outline: none;\n      padding: 0;\n      vertical-align: top;\n      width: 110px; }\n      @media (max-width: 600px) {\n        body div.new-task button {\n          border-radius: 0; } }\n      body div.new-task button:hover, body div.new-task button:active {\n        background: #27ae60;\n        cursor: pointer;\n        -webkit-transition: background 0.15s ease-in 0s;\n        transition: background 0.15s ease-in 0s; }\n  body section {\n    background: #F6F6F6;\n    border-radius: 5px;\n    -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n    display: none;\n    margin: 20px auto 100px;\n    width: 500px; }\n    @media (max-width: 600px) {\n      body section {\n        width: 100%;\n        border-radius: 0;\n        margin: 10px auto 30px; } }\n    body section .heading {\n      background: #EFEFEF;\n      border-bottom: 1px solid #E0E0E0;\n      border-radius: 5px 5px 0 0;\n      padding: 15px;\n      position: relative; }\n      body section .heading p {\n        margin: 0; }\n        body section .heading p#date {\n          color: #2CC36B;\n          font-size: 21px; }\n          body section .heading p#date .day {\n            font-weight: 300; }\n        body section .heading p#month {\n          font-size: 16px; }\n        body section .heading p#task-count {\n          position: absolute;\n          right: 15px;\n          top: 27px; }\n    body section ul#task-list {\n      list-style-type: none;\n      margin: 0;\n      overflow: auto;\n      padding: 0; }\n      body section ul#task-list li {\n        border-bottom: 1px solid #E0E0E0;\n        padding: 20px 15px;\n        position: relative; }\n        body section ul#task-list li .checkbox {\n          display: inline-block;\n          position: relative;\n          vertical-align: middle;\n          width: 20px; }\n          body section ul#task-list li .checkbox label {\n            background: white;\n            border: 1px solid #374A5C;\n            border-radius: 4px;\n            cursor: pointer;\n            height: 18px;\n            left: 0;\n            position: absolute;\n            top: 1px;\n            width: 18px; }\n            body section ul#task-list li .checkbox label:after {\n              border: 3px solid #374A5C;\n              border-right: none;\n              border-top: none;\n              content: '';\n              height: 4px;\n              left: 4px;\n              opacity: 0;\n              position: absolute;\n              top: 4px;\n              -webkit-transform: rotate(-45deg);\n                      transform: rotate(-45deg);\n              width: 8px; }\n          body section ul#task-list li .checkbox input[type=checkbox] {\n            visibility: hidden; }\n            body section ul#task-list li .checkbox input[type=checkbox]:checked + label:after {\n              opacity: 1; }\n        body section ul#task-list li p {\n          display: inline-block;\n          font-size: 20px;\n          font-weight: 300;\n          margin: 0;\n          overflow: hidden;\n          padding-left: 10px;\n          text-overflow: ellipsis;\n          vertical-align: middle;\n          white-space: nowrap;\n          width: calc(100% - 65px); }\n          body section ul#task-list li p.completed {\n            text-decoration: line-through; }\n        body section ul#task-list li span.remove-task {\n          color: red;\n          display: inline-block;\n          float: right;\n          font-size: 19px;\n          vertical-align: middle; }\n          body section ul#task-list li span.remove-task:hover, body section ul#task-list li span.remove-task:active {\n            cursor: pointer; }\n        body section ul#task-list li:hover {\n          background: #EFEFEF; }\n      body section ul#task-list p.empty-list-message {\n        margin: 20px;\n        text-align: center; }\n    body section ul#show-menu {\n      list-style-type: none;\n      margin: 0;\n      padding: 0;\n      text-align: center; }\n      body section ul#show-menu li {\n        display: inline-block;\n        margin: 5px;\n        padding: 5px; }\n        body section ul#show-menu li.active {\n          color: #2CC36B; }\n        body section ul#show-menu li:hover {\n          color: #2CC36B;\n          cursor: pointer; }\n",""])},function(n,e,t){(n.exports=t(1)(!1)).push([n.i,"",""])},function(n,e){n.exports=function(n){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!n||"string"!=typeof n)return n;var t=e.protocol+"//"+e.host,o=t+e.pathname.replace(/\/[^\/]*$/,"/");return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(n,e){var i,r=e.trim().replace(/^"(.*)"$/,function(n,e){return e}).replace(/^'(.*)'$/,function(n,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(r)?n:(i=0===r.indexOf("//")?r:0===r.indexOf("/")?t+r:o+r.replace(/^\.\//,""),"url("+JSON.stringify(i)+")")})}},function(n,e,t){t(3),t(4),n.exports=t(5)}]);