function createUnityInstance(e,t,r){function n(e,r){if(!n.aborted&&t.showBanner)return"error"==r&&(n.aborted=!0),t.showBanner(e,r);switch(r){case"error":console.error(e);break;case"warning":console.warn(e);break;default:console.log(e)}}function o(e){var t=e.reason||e.error,r=t?t.toString():e.message||e.reason||"",n=t&&t.stack?t.stack.toString():"";if(n.startsWith(r)&&(n=n.substring(r.length)),r+="\n"+n.trim(),r&&f.stackTraceRegExp&&f.stackTraceRegExp.test(r)){var o=e.filename||t&&(t.fileName||t.sourceURL)||"",a=e.lineno||t&&(t.lineNumber||t.line)||0;i(r,o,a)}}function a(e){e.preventDefault()}function i(e,t,r){if(e.indexOf("fullscreen error")==-1){if(f.startupErrorHandler)return void f.startupErrorHandler(e,t,r);if(!(f.errorHandler&&f.errorHandler(e,t,r)||(console.log("Invoking error handler due to\n"+e),"function"==typeof dump&&dump("Invoking error handler due to\n"+e),i.didShowErrorMessage))){var e="An error occurred running the Unity content on this page. See your browser JavaScript console for more info. The error was:\n"+e;e.indexOf("DISABLE_EXCEPTION_CATCHING")!=-1?e="An exception has occurred, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project WebGL player settings to be able to catch the exception or see the stack trace.":e.indexOf("Cannot enlarge memory arrays")!=-1?e="Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings.":e.indexOf("Invalid array buffer length")==-1&&e.indexOf("Invalid typed array length")==-1&&e.indexOf("out of memory")==-1&&e.indexOf("could not allocate memory")==-1||(e="The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings."),alert(e),i.didShowErrorMessage=!0}}}function s(e,t){if("symbolsUrl"!=e){var n=f.downloadProgress[e];n||(n=f.downloadProgress[e]={started:!1,finished:!1,lengthComputable:!1,total:0,loaded:0}),"object"!=typeof t||"progress"!=t.type&&"load"!=t.type||(n.started||(n.started=!0,n.lengthComputable=t.lengthComputable),n.total=t.total,n.loaded=t.loaded,"load"==t.type&&(n.finished=!0));var o=0,a=0,i=0,s=0,c=0;for(var e in f.downloadProgress){var n=f.downloadProgress[e];if(!n.started)return 0;i++,n.lengthComputable?(o+=n.loaded,a+=n.total,s++):n.finished||c++}var u=i?(i-c-(a?s*(a-o)/a:0))/i:0;r(.9*u)}}function c(e,t){return new Promise(function(r,n){try{for(var o in b)if(b[o].hasUnityMarker(e)){t&&console.log('You can reduce startup time if you configure your web server to add "Content-Encoding: '+o+'" response header when serving "'+t+'" file.');var a=b[o];if(!a.worker){var i=URL.createObjectURL(new Blob(["this.require = ",a.require.toString(),"; this.decompress = ",a.decompress.toString(),"; this.onmessage = ",function(e){var t={id:e.data.id,decompressed:this.decompress(e.data.compressed)};postMessage(t,t.decompressed?[t.decompressed.buffer]:[])}.toString(),"; postMessage({ ready: true });"],{type:"application/javascript"}));a.worker=new Worker(i),a.worker.onmessage=function(e){return e.data.ready?void URL.revokeObjectURL(i):(this.callbacks[e.data.id](e.data.decompressed),void delete this.callbacks[e.data.id])},a.worker.callbacks={},a.worker.nextCallbackId=0}var s=a.worker.nextCallbackId++;return a.worker.callbacks[s]=r,void a.worker.postMessage({id:s,compressed:e},[e.buffer])}r(e)}catch(e){n(e)}})}function u(e){s(e);var t=f.cacheControl(f[e]),r=f.companyName&&f.productName?f.cachedFetch:f.fetchWithProgress,o=f[e],a=/file:\/\//.exec(o)?"same-origin":void 0,i=r(f[e],{method:"GET",companyName:f.companyName,productName:f.productName,productVersion:f.productVersion,control:t,mode:a,onProgress:function(t){s(e,t)}});return i.then(function(t){return c(t.parsedBody,f[e])}).catch(function(t){var r="Failed to download file "+f[e];"file:"==location.protocol?n(r+". Loading web pages via a file:// URL without a web server is not supported by this browser. Please use a local development web server to host Unity content, or use the Unity Build and Run option.","error"):console.error(r)})}function d(){return u("frameworkUrl").then(function(e){var t=URL.createObjectURL(new Blob([e],{type:"application/javascript"}));return new Promise(function(e,r){var o=document.createElement("script");o.src=t,o.onload=function(){if("undefined"==typeof unityFramework||!unityFramework){var r=[["br","br"],["gz","gzip"]];for(var a in r){var i=r[a];if(f.frameworkUrl.endsWith("."+i[0])){var s="Unable to parse "+f.frameworkUrl+"!";if("file:"==location.protocol)return void n(s+" Loading pre-compressed (brotli or gzip) content via a file:// URL without a web server is not supported by this browser. Please use a local development web server to host compressed Unity content, or use the Unity Build and Run option.","error");if(s+=' This can happen if build compression was enabled but web server hosting the content was misconfigured to not serve the file with HTTP Response Header "Content-Encoding: '+i[1]+'" present. Check browser Console and Devtools Network tab to debug.',"br"==i[0]&&"http:"==location.protocol){var c=["localhost","127.0.0.1"].indexOf(location.hostname)!=-1?"":"Migrate your server to use HTTPS.";s=/Firefox/.test(navigator.userAgent)?"Unable to parse "+f.frameworkUrl+'!<br>If using custom web server, verify that web server is sending .br files with HTTP Response Header "Content-Encoding: br". Brotli compression may not be supported in Firefox over HTTP connections. '+c+' See <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1670675">https://bugzilla.mozilla.org/show_bug.cgi?id=1670675</a> for more information.':"Unable to parse "+f.frameworkUrl+'!<br>If using custom web server, verify that web server is sending .br files with HTTP Response Header "Content-Encoding: br". Brotli compression may not be supported over HTTP connections. Migrate your server to use HTTPS.'}return void n(s,"error")}}n("Unable to parse "+f.frameworkUrl+"! The file is corrupt, or compression was misconfigured? (check Content-Encoding HTTP Response Header on web server)","error")}var u=unityFramework;unityFramework=null,o.onload=null,URL.revokeObjectURL(t),e(u)},o.onerror=function(e){n("Unable to load file "+f.frameworkUrl+"! Check that the file exists on the remote server. (also check browser Console and Devtools Network tab to debug)","error")},document.body.appendChild(o),f.deinitializers.push(function(){document.body.removeChild(o)})})})}function l(){Promise.all([d(),u("codeUrl")]).then(function(e){f.wasmBinary=e[1],e[0](f)});var e=u("dataUrl");f.preRun.push(function(){f.addRunDependency("dataUrl"),e.then(function(e){var t=new DataView(e.buffer,e.byteOffset,e.byteLength),r=0,n="UnityWebData1.0\0";if(!String.fromCharCode.apply(null,e.subarray(r,r+n.length))==n)throw"unknown data format";r+=n.length;var o=t.getUint32(r,!0);for(r+=4;r<o;){var a=t.getUint32(r,!0);r+=4;var i=t.getUint32(r,!0);r+=4;var s=t.getUint32(r,!0);r+=4;var c=String.fromCharCode.apply(null,e.subarray(r,r+s));r+=s;for(var u=0,d=c.indexOf("/",u)+1;d>0;u=d,d=c.indexOf("/",u)+1)f.FS_createPath(c.substring(0,u),c.substring(u,d-1),!0,!0);f.FS_createDataFile(c,null,e.subarray(a,a+i),!0,!0,!0)}f.removeRunDependency("dataUrl")})})}r=r||function(){};var f={canvas:e,webglContextAttributes:{preserveDrawingBuffer:!1},cacheControl:function(e){return e==f.dataUrl||e.match(/\.bundle/)?"must-revalidate":"no-store"},streamingAssetsUrl:"StreamingAssets",downloadProgress:{},deinitializers:[],intervals:{},setInterval:function(e,t){var r=window.setInterval(e,t);return this.intervals[r]=!0,r},clearInterval:function(e){delete this.intervals[e],window.clearInterval(e)},preRun:[],postRun:[],print:function(e){console.log(e)},printErr:function(e){console.error(e),"string"==typeof e&&e.indexOf("wasm streaming compile failed")!=-1&&(e.toLowerCase().indexOf("mime")!=-1?n('HTTP Response Header "Content-Type" configured incorrectly on the server for file '+f.codeUrl+' , should be "application/wasm". Startup time performance will suffer.',"warning"):n('WebAssembly streaming compilation failed! This can happen for example if "Content-Encoding" HTTP header is incorrectly enabled on the server for file '+f.codeUrl+", but the file is not pre-compressed on disk (or vice versa). Check the Network tab in browser Devtools to debug server header configuration.","warning"))},locateFile:function(e){return e},disabledCanvasEvents:["contextmenu","dragstart"]};for(var h in t)f[h]=t[h];f.streamingAssetsUrl=new URL(f.streamingAssetsUrl,document.URL).href;var p=f.disabledCanvasEvents.slice();p.forEach(function(t){e.addEventListener(t,a)}),window.addEventListener("error",o),window.addEventListener("unhandledrejection",o);var m="",g="";document.addEventListener("webkitfullscreenchange",function(t){var r=document.webkitCurrentFullScreenElement;r===e?e.style.width&&(m=e.style.width,g=e.style.height,e.style.width="100%",e.style.height="100%"):m&&(e.style.width=m,e.style.height=g,m="",g="")}),f.deinitializers.push(function(){f.disableAccessToMediaDevices(),p.forEach(function(t){e.removeEventListener(t,a)}),window.removeEventListener("error",o),window.removeEventListener("unhandledrejection",o);for(var t in f.intervals)window.clearInterval(t);f.intervals={}}),f.QuitCleanup=function(){for(var e=0;e<f.deinitializers.length;e++)f.deinitializers[e]();f.deinitializers=[],"function"==typeof f.onQuit&&f.onQuit()};var v={Module:f,SetFullscreen:function(){return f.SetFullscreen?f.SetFullscreen.apply(f,arguments):void f.print("Failed to set Fullscreen mode: Player not loaded yet.")},SendMessage:function(){return f.SendMessage?f.SendMessage.apply(f,arguments):void f.print("Failed to execute SendMessage: Player not loaded yet.")},Quit:function(){return new Promise(function(e,t){f.shouldQuit=!0,f.onQuit=e})},GetMemoryInfo:function(){var e=f._getMemInfo();return{totalWASMHeapSize:f.HEAPU32[e>>2],usedWASMHeapSize:f.HEAPU32[(e>>2)+1],totalJSHeapSize:f.HEAPF64[(e>>3)+1],usedJSHeapSize:f.HEAPF64[(e>>3)+2]}}};f.SystemInfo=function(){function e(e,t,r){return e=RegExp(e,"i").exec(t),e&&e[r]}for(var t,r,n,o,a,i,s=navigator.userAgent+" ",c=[["Firefox","Firefox"],["OPR","Opera"],["Edg","Edge"],["SamsungBrowser","Samsung Browser"],["Trident","Internet Explorer"],["MSIE","Internet Explorer"],["Chrome","Chrome"],["CriOS","Chrome on iOS Safari"],["FxiOS","Firefox on iOS Safari"],["Safari","Safari"]],u=0;u<c.length;++u)if(r=e(c[u][0]+"[/ ](.*?)[ \\)]",s,1)){t=c[u][1];break}"Safari"==t&&(r=e("Version/(.*?) ",s,1)),"Internet Explorer"==t&&(r=e("rv:(.*?)\\)? ",s,1)||r);for(var d=[["Windows (.*?)[;)]","Windows"],["Android ([0-9_.]+)","Android"],["iPhone OS ([0-9_.]+)","iPhoneOS"],["iPad.*? OS ([0-9_.]+)","iPadOS"],["FreeBSD( )","FreeBSD"],["OpenBSD( )","OpenBSD"],["Linux|X11()","Linux"],["Mac OS X ([0-9_.]+)","MacOS"],["bot|google|baidu|bing|msn|teoma|slurp|yandex","Search Bot"]],l=0;l<d.length;++l)if(o=e(d[l][0],s,1)){n=d[l][1],o=o.replace(/_/g,".");break}var f={"NT 5.0":"2000","NT 5.1":"XP","NT 5.2":"Server 2003","NT 6.0":"Vista","NT 6.1":"7","NT 6.2":"8","NT 6.3":"8.1","NT 10.0":"10"};o=f[o]||o,a=document.createElement("canvas"),a&&(gl=a.getContext("webgl2"),glVersion=gl?2:0,gl||(gl=a&&a.getContext("webgl"))&&(glVersion=1),gl&&(i=gl.getExtension("WEBGL_debug_renderer_info")&&gl.getParameter(37446)||gl.getParameter(7937)));var h="undefined"!=typeof SharedArrayBuffer,p="object"==typeof WebAssembly&&"function"==typeof WebAssembly.compile;return{width:screen.width,height:screen.height,userAgent:s.trim(),browser:t||"Unknown browser",browserVersion:r||"Unknown version",mobile:/Mobile|Android|iP(ad|hone)/.test(navigator.appVersion),os:n||"Unknown OS",osVersion:o||"Unknown OS Version",gpu:i||"Unknown GPU",language:navigator.userLanguage||navigator.language,hasWebGL:glVersion,hasCursorLock:!!document.body.requestPointerLock,hasFullscreen:!!document.body.requestFullscreen||!!document.body.webkitRequestFullscreen,hasThreads:h,hasWasm:p,hasWasmThreads:!1}}(),f.abortHandler=function(e){return i(e,"",0),!0},Error.stackTraceLimit=Math.max(Error.stackTraceLimit||0,50),f.readBodyWithProgress=function(){function e(e,t){if(!t)return 0;var r=e.headers.get("Content-Encoding"),n=parseInt(e.headers.get("Content-Length"));switch(r){case"br":return Math.round(5*n);case"gzip":return Math.round(4*n);default:return n}}function t(t,r){function n(){return"undefined"==typeof a?t.arrayBuffer().then(function(e){return r({type:"progress",total:e.length,loaded:0,lengthComputable:i}),new Uint8Array(e)}):a.read().then(function(e){return e.done?o():(d+e.value.length<=c.length?(c.set(e.value,d),l=d+e.value.length):u.push(e.value),d+=e.value.length,r({type:"progress",total:Math.max(s,d),loaded:d,lengthComputable:i}),n())})}function o(){if(d===s)return c;if(d<s)return c.slice(0,d);var e=new Uint8Array(d);e.set(c,0);for(var t=l,r=0;r<u.length;++r)e.set(u[r],t),t+=u[r].length;return e}var a=t.body?t.body.getReader():void 0,i="undefined"!=typeof t.headers.get("Content-Length"),s=e(t,i),c=new Uint8Array(s),u=[],d=0,l=0;return i||console.warn("[UnityCache] Response is served without Content-Length header. Please reconfigure server to include valid Content-Length for better download performance."),n().then(function(e){return r({type:"load",total:e.length,loaded:e.length,lengthComputable:i}),t.parsedBody=e,t})}return t}(),f.fetchWithProgress=function(){function e(e,t){var r=function(){};return t&&t.onProgress&&(r=t.onProgress),fetch(e,t).then(function(e){return f.readBodyWithProgress(e,r)})}return e}(),f.UnityCache=function(){function e(e){console.log("[UnityCache] "+e)}function t(){var t=this;this.isConnected=this.connect().then(function(){return t.cleanUpCache()}),this.isConnected.catch(function(t){e("Error when initializing cache: "+t)})}var r={name:"UnityCache",version:4},n={name:"RequestMetaDataStore",version:1},o={name:"RequestStore",version:1},a={name:"WebAssembly",version:1},i=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB,s=null;return t.getInstance=function(){return s||(s=new t),s},t.destroyInstance=function(){return s?s.close().then(function(){s=null}):Promise.resolve()},t.prototype.clearCache=function(){function e(r){if(0===r.length)return Promise.resolve();var n=r.pop();return t.cache.delete(n).then(function(){return e(r)})}var t=this;return this.isConnected.then(function(){return t.execute(n.name,"clear",[])}).then(function(){return t.cache.keys()}).then(function(t){return e(t)})},t.UnityCacheDatabase=r,t.RequestMetaDataStore=n,t.MaximumCacheSize=1073741824,t.prototype.loadRequest=function(e){var t=this;return t.isConnected.then(function(){return Promise.all([t.cache.match(e),t.loadRequestMetaData(e)])}).then(function(e){if("undefined"!=typeof e[0]&&"undefined"!=typeof e[1])return{response:e[0],metaData:e[1]}})},t.prototype.loadRequestMetaData=function(e){var t="string"==typeof e?e:e.url;return this.execute(n.name,"get",[t])},t.prototype.updateRequestMetaData=function(e){return this.execute(n.name,"put",[e])},t.prototype.storeRequest=function(e,t){var r=this;return r.isConnected.then(function(){return r.cache.put(e,t)})},t.prototype.close=function(){return this.isConnected.then(function(){this.database&&(this.database.close(),this.database=null),this.cache&&(this.cache=null)}.bind(this))},t.prototype.connect=function(){var e=this;if("undefined"==typeof i)return Promise.reject(new Error("Could not connect to cache: IndexedDB is not supported."));if("undefined"==typeof window.caches)return Promise.reject(new Error("Could not connect to cache: Cache API is not supported."));var t=new Promise(function(t,n){function o(){e.openDBTimeout&&(clearTimeout(e.openDBTimeout),e.openDBTimeout=null)}try{e.openDBTimeout=setTimeout(function(){"undefined"==typeof e.database&&n(new Error("Could not connect to cache: Database timeout."))},2e4);var a=i.open(r.name,r.version);a.onupgradeneeded=e.upgradeDatabase.bind(e),a.onsuccess=function(r){o(),e.database=r.target.result,t()},a.onerror=function(t){o(),e.database=null,n(new Error("Could not connect to database."))}}catch(t){o(),e.database=null,e.cache=null,n(new Error("Could not connect to cache: Could not connect to database."))}}).then(function(){var e=r.name+"_"+f.companyName+"_"+f.productName;return caches.open(e)}).then(function(t){e.cache=t});return t},t.prototype.upgradeDatabase=function(e){var t=e.target.result;if(!t.objectStoreNames.contains(n.name)){var r=t.createObjectStore(n.name,{keyPath:"url"});["accessedAt","updatedAt"].forEach(function(e){r.createIndex(e,e)})}t.objectStoreNames.contains(o.name)&&t.deleteObjectStore(o.name),t.objectStoreNames.contains(a.name)&&t.deleteObjectStore(a.name)},t.prototype.execute=function(e,t,r){return this.isConnected.then(function(){return new Promise(function(n,o){try{if(null===this.database)return void o(new Error("indexedDB access denied"));var a=["put","delete","clear"].indexOf(t)!=-1?"readwrite":"readonly",i=this.database.transaction([e],a),s=i.objectStore(e);"openKeyCursor"==t&&(s=s.index(r[0]),r=r.slice(1));var c=s[t].apply(s,r);c.onsuccess=function(e){n(e.target.result)},c.onerror=function(e){o(e)}}catch(e){o(e)}}.bind(this))}.bind(this))},t.prototype.getMetaDataEntries=function(){var e=this,t=0,r=[];return new Promise(function(o,a){var i=e.database.transaction([n.name],"readonly"),s=i.objectStore(n.name),c=s.openCursor();c.onsuccess=function(e){var n=e.target.result;n?(t+=n.value.size,r.push(n.value),n.continue()):o({metaDataEntries:r,cacheSize:t})},c.onerror=function(e){a(e)}})},t.prototype.cleanUpCache=function(){var e=this;return this.getMetaDataEntries().then(function(r){function o(t){return new Promise(function(r,o){var a=e.database.transaction([n.name],"readwrite"),i=a.objectStore(n.name);i.delete(t),a.oncomplete=r,a.onerror=o})}function a(){if(0===c.length)return Promise.resolve();var t=c.pop();return e.cache.delete(t.url).then(function(e){if(e)return o(t.url)}).then(function(){return a()})}for(var i=r.metaDataEntries,s=r.cacheSize,c=[],u=[],d=0;d<i.length;++d)i[d].version!=f.productVersion?(c.push(i[d]),s-=i[d].size):u.push(i[d]);u.sort(function(e,t){return e.accessedAt-t.accessedAt});for(var d=0;d<u.length&&!(s<t.MaximumCacheSize);++d)c.push(u[d]),s-=u[d].size;return a()})},t}(),f.cachedFetch=function(){function e(e){console.log("[UnityCache] "+e)}function t(e){return t.link=t.link||document.createElement("a"),t.link.href=e,t.link.href}function r(e){var t=window.location.href.match(/^[a-z]+:\/\/[^\/]+/);return!t||e.lastIndexOf(t[0],0)}function n(e,t){return(!t||!t.method||"GET"===t.method)&&((!t||["must-revalidate","immutable"].indexOf(t.control)!=-1)&&!!e.match("^https?://"))}function o(o,c){function u(t,r){return fetch(t,r).then(function(n){if(!f.enabled||f.revalidated)return n;if(304===n.status)return f.revalidated=!0,d.updateRequestMetaData(f.metaData).then(function(){e("'"+f.metaData.url+"' successfully revalidated and served from the indexedDB cache")}).catch(function(t){e("'"+f.metaData.url+"' successfully revalidated but not stored in the indexedDB cache due to the error: "+t)}),s(f.response,r.onProgress);if(200==n.status){f.response=n,f.metaData.updatedAt=f.metaData.accessedAt,f.revalidated=!0;var o=n.clone();return s(n,r.onProgress).then(function(r){return f.metaData.size=r.parsedBody.length,Promise.all([d.storeRequest(t,o),d.updateRequestMetaData(f.metaData)]).then(function(){e("'"+l+"' successfully downloaded and stored in the indexedDB cache")}).catch(function(t){e("'"+l+"' successfully downloaded but not stored in the indexedDB cache due to the error: "+t)}),r})}return e("'"+l+"' request failed with status: "+n.status+" "+n.statusText),s(n,r.onProgress)})}var d=a.getInstance(),l=t("string"==typeof o?o:o.url),f={enabled:n(l,c)};return c&&(f.control=c.control,f.companyName=c.companyName,f.productName=c.productName,f.productVersion=c.productVersion),f.revalidated=!1,f.metaData={url:l,accessedAt:Date.now(),version:f.productVersion},f.response=null,f.enabled?d.loadRequest(l).then(function(t){if(!t)return u(o,c);var n=t.response,a=t.metaData;if(f.response=n,f.metaData.size=a.size,f.metaData.updatedAt=a.updatedAt,"immutable"==f.control)return f.revalidated=!0,d.updateRequestMetaData(a).then(function(){e("'"+f.metaData.url+"' served from the indexedDB cache without revalidation")}),s(n,c.onProgress);if(r(l)&&(n.headers.get("Last-Modified")||n.headers.get("ETag")))return fetch(l,{method:"HEAD"}).then(function(t){return f.revalidated=["Last-Modified","ETag"].every(function(e){return!n.headers.get(e)||n.headers.get(e)==t.headers.get(e)}),f.revalidated?(d.updateRequestMetaData(a).then(function(){e("'"+f.metaData.url+"' successfully revalidated and served from the indexedDB cache")}),s(f.response,c.onProgress)):u(o,c)});c=c||{};var i=c.headers||{};return c.headers=i,n.headers.get("Last-Modified")?(i["If-Modified-Since"]=n.headers.get("Last-Modified"),i["Cache-Control"]="no-cache"):n.headers.get("ETag")&&(i["If-None-Match"]=n.headers.get("ETag"),i["Cache-Control"]="no-cache"),u(o,c)}).catch(function(t){return e("Failed to load '"+f.metaData.url+"' from indexedDB cache due to the error: "+t),i(o,c)}):i(o,c)}var a=f.UnityCache,i=f.fetchWithProgress,s=f.readBodyWithProgress;return o}();var b={};return new Promise(function(e,t){if(f.SystemInfo.hasWebGL)if(1==f.SystemInfo.hasWebGL){var n='Your browser does not support graphics API "WebGL 2" which is required for this content.';"Safari"==f.SystemInfo.browser&&parseInt(f.SystemInfo.browserVersion)<15&&(n+=f.SystemInfo.mobile||navigator.maxTouchPoints>1?"\nUpgrade to iOS 15 or later.":"\nUpgrade to Safari 15 or later."),t(n)}else f.SystemInfo.hasWasm?(f.startupErrorHandler=t,r(0),f.postRun.push(function(){r(1),delete f.startupErrorHandler,e(v)}),l()):t("Your browser does not support WebAssembly.");else t("Your browser does not support WebGL.")})}