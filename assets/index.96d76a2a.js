var H=Object.defineProperty,V=Object.defineProperties;var B=Object.getOwnPropertyDescriptors;var A=Object.getOwnPropertySymbols;var $=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable;var _=(e,t,a)=>t in e?H(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,h=(e,t)=>{for(var a in t||(t={}))$.call(t,a)&&_(e,a,t[a]);if(A)for(var a of A(t))G.call(t,a)&&_(e,a,t[a]);return e},u=(e,t)=>V(e,B(t));var f=(e,t,a)=>(_(e,typeof t!="symbol"?t+"":t,a),a);import{j as r,v as Y,g as K,D as q,u as J,a as Q,b as o,C as S,r as c,O as w,c as F,d as P,e as y,H as x,S as U,L as W,T as R,G as X,f as Z,R as D,h as ee,F as L,N as p,i as re,k as d,l as v,B as te,m as b,n as ae,o as se,P as oe}from"./vendor.bcd75120.js";const le=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const n of l)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(l){const n={};return l.integrity&&(n.integrity=l.integrity),l.referrerpolicy&&(n.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?n.credentials="include":l.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(l){if(l.ep)return;l.ep=!0;const n=a(l);fetch(l.href,n)}};le();const ne="modulepreload",M={},ce="/madam3D/",m=function(t,a){return!a||a.length===0?t():Promise.all(a.map(s=>{if(s=`${ce}${s}`,s in M)return;M[s]=!0;const l=s.endsWith(".css"),n=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${n}`))return;const i=document.createElement("link");if(i.rel=l?"stylesheet":ne,l||(i.as="script",i.crossOrigin=""),i.href=s,document.head.appendChild(i),l)return new Promise((k,I)=>{i.addEventListener("load",k),i.addEventListener("error",I)})})).then(()=>t())};function ie(e){return r("svg",u(h({width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},e),{children:r("g",{fill:"none",children:r("path",{d:"M8.75 3h6.5a.75.75 0 0 1 .743.648L16 3.75V7h1.75A3.25 3.25 0 0 1 21 10.25v6.5A3.25 3.25 0 0 1 17.75 20H6.25A3.25 3.25 0 0 1 3 16.75v-6.5A3.25 3.25 0 0 1 6.25 7H8V3.75a.75.75 0 0 1 .648-.743L8.75 3h6.5h-6.5zm9 5.5H6.25a1.75 1.75 0 0 0-1.75 1.75v6.5c0 .966.784 1.75 1.75 1.75h11.5a1.75 1.75 0 0 0 1.75-1.75v-6.5a1.75 1.75 0 0 0-1.75-1.75zm-3.25-4h-5V7h5V4.5z",fill:"currentColor"})})}))}function de(e){return r("svg",u(h({width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 16 16"},e),{children:r("g",{fill:"none",children:r("path",{d:"M7.313 1.262a1 1 0 0 1 1.374 0l4.844 4.579c.3.283.469.678.469 1.09v5.57a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 9 12.5V10a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v2.5A1.5 1.5 0 0 1 5.5 14h-2A1.5 1.5 0 0 1 2 12.5V6.93c0-.412.17-.807.47-1.09l4.843-4.58zM8 1.988l-4.844 4.58A.5.5 0 0 0 3 6.93v5.57a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V10a1.5 1.5 0 0 1 1.5-1.5h1A1.5 1.5 0 0 1 10 10v2.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V6.93a.5.5 0 0 0-.156-.363L8 1.988z",fill:"currentColor"})})}))}function he(e){return r("svg",u(h({width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},e),{children:r("g",{fill:"none",children:r("path",{d:"M12.012 2.25c.734.008 1.465.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.927 1.116l1.401-.615a.75.75 0 0 1 .85.174a9.792 9.792 0 0 1 2.204 3.792a.75.75 0 0 1-.271.825l-1.242.916a1.381 1.381 0 0 0 0 2.226l1.243.915a.75.75 0 0 1 .272.826a9.797 9.797 0 0 1-2.204 3.792a.75.75 0 0 1-.848.175l-1.407-.617a1.38 1.38 0 0 0-1.926 1.114l-.169 1.526a.75.75 0 0 1-.572.647a9.518 9.518 0 0 1-4.406 0a.75.75 0 0 1-.572-.647l-.168-1.524a1.382 1.382 0 0 0-1.926-1.11l-1.406.616a.75.75 0 0 1-.849-.175a9.798 9.798 0 0 1-2.204-3.796a.75.75 0 0 1 .272-.826l1.243-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.271-.826a9.793 9.793 0 0 1 2.204-3.792a.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65c.717-.159 1.45-.243 2.201-.252zm0 1.5a9.135 9.135 0 0 0-1.354.117l-.109.977A2.886 2.886 0 0 1 6.525 7.17l-.898-.394a8.293 8.293 0 0 0-1.348 2.317l.798.587a2.881 2.881 0 0 1 0 4.643l-.799.588c.32.842.776 1.626 1.348 2.322l.905-.397a2.882 2.882 0 0 1 4.017 2.318l.11.984c.889.15 1.798.15 2.687 0l.11-.984a2.881 2.881 0 0 1 4.018-2.322l.905.396a8.296 8.296 0 0 0 1.347-2.318l-.798-.588a2.881 2.881 0 0 1 0-4.643l.796-.587a8.293 8.293 0 0 0-1.348-2.317l-.896.393a2.884 2.884 0 0 1-4.023-2.324l-.11-.976a8.988 8.988 0 0 0-1.333-.117zM12 8.25a3.75 3.75 0 1 1 0 7.5a3.75 3.75 0 0 1 0-7.5zm0 1.5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5z",fill:"currentColor"})})}))}function ue(e){return r("svg",u(h({width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},e),{children:r("g",{fill:"none",children:r("path",{d:"M12 2c5.523 0 10 4.478 10 10s-4.477 10-10 10S2 17.522 2 12S6.477 2 12 2zm0 1.667c-4.595 0-8.333 3.738-8.333 8.333c0 4.595 3.738 8.333 8.333 8.333c4.595 0 8.333-3.738 8.333-8.333c0-4.595-3.738-8.333-8.333-8.333zM12 15.5a1 1 0 1 1 0 2a1 1 0 0 1 0-2zm0-8.75a2.75 2.75 0 0 1 2.75 2.75c0 1.01-.297 1.574-1.051 2.359l-.169.171c-.622.622-.78.886-.78 1.47a.75.75 0 0 1-1.5 0c0-1.01.297-1.574 1.051-2.359l.169-.171c.622-.622.78-.886.78-1.47a1.25 1.25 0 0 0-2.493-.128l-.007.128a.75.75 0 0 1-1.5 0A2.75 2.75 0 0 1 12 6.75z",fill:"currentColor"})})}))}var j;(function(e){e[e.STL=0]="STL",e[e.OBJ=1]="OBJ",e[e.GCODE=2]="GCODE",e[e.THREE_MF=3]="THREE_MF",e[e.NOT_SUPPORTED=4]="NOT_SUPPORTED"})(j||(j={}));class me extends q{constructor(t="AppDb"){super(t);f(this,"folders");f(this,"projects");f(this,"files");this.version(1).stores({folders:"id, name, filePath,created",projects:"id, name, created, updated",files:"id,name, folderId, type, size, created"}),this.folders=this.table("folders"),this.projects=this.table("projects"),this.files=this.table("files")}}let g;function pe(){g=new me}const er=async(e="",t=[])=>{const a=new Date,s={id:Y(),created:a,updated:a,name:e,itemIds:t};try{return s.name===""&&(s.name=K({words:3}).dashed),await g.projects.add(s),s}catch(l){console.error("error adding project to database: ",l)}return s},ge=()=>J(),N=Q;const fe=({fileUrl:e="http://localhost:3000/src/images/arm_joiner_double.stl"})=>{const t=F(U,e),a=c.exports.useRef(null);t.computeBoundingSphere();const s=t.boundingSphere?t.boundingSphere.radius:0,l=40/s;return r(P,{alignTop:!0,children:r("mesh",{geometry:t,ref:a,scale:l,children:r("meshNormalMaterial",{flatShading:!0})})})};function ve(){const{progress:e}=y();return o(x,{center:!0,children:[e," % loaded"]})}const _e=({fileUrl:e="http://localhost:3000/src/images/arm_joiner_double.stl"})=>o(S,{style:{},camera:{position:[1,70,100],fov:50,near:10,far:400},children:[r("pointLight",{position:[100,100,100]}),r("pointLight",{position:[-100,-100,-100]}),r("gridHelper",{args:[80,12,"magenta","cyan"]}),o(c.exports.Suspense,{fallback:r(ve,{}),children:[r(fe,{fileUrl:e}),r(w,{})]})]}),Se=({fileUrl:e="http://localhost:3000/src/images/servo_motor.3mf"})=>{const t=new W;new R(t);const a=F(R,e);return r(P,{alignTop:!0,children:r("primitive",{object:a})})};function we(){const{progress:e}=y();return o(x,{center:!0,children:[e," % loaded"]})}const Fe=({fileUrl:e="http://localhost:3000/src/images/servo_motor.3mf"})=>o(S,{style:{},camera:{position:[1,70,100],fov:50,near:10,far:200},children:[r("pointLight",{position:[100,100,100]}),r("pointLight",{position:[-100,-100,-100]}),r("gridHelper",{args:[80,12,"magenta","cyan"]}),o(c.exports.Suspense,{fallback:r(we,{}),children:[r(Se,{fileUrl:e}),r(w,{})]})]}),Pe=({fileUrl:e="http://localhost:3000/src/images/demo.gcode"})=>{const t=F(X,e);return r(P,{alignTop:!0,children:r("primitive",{object:t})})};function ye(){const{progress:e}=y();return o(x,{center:!0,children:[e," % loaded"]})}const xe=({fileUrl:e="http://localhost:3000/src/images/demo.gcode"})=>o(S,{style:{},camera:{position:[1,70,100],fov:110,near:10,far:400},children:[r("pointLight",{position:[100,100,100]}),r("pointLight",{position:[-100,-100,-100]}),r("gridHelper",{args:[200,12,"magenta","cyan"]}),o(c.exports.Suspense,{fallback:r(ye,{}),children:[r(Pe,{fileUrl:e}),r(w,{})]})]}),Ae=()=>(Z(0),c.exports.useState([]),o("div",{children:[r(_e,{}),r(Fe,{}),r(xe,{})]})),Re=c.exports.lazy(()=>m(()=>import("./Help.ae60959a.js"),["assets/Help.ae60959a.js","assets/vendor.bcd75120.js"])),De=c.exports.lazy(()=>m(()=>import("./Project.b95bad2c.js"),["assets/Project.b95bad2c.js","assets/vendor.bcd75120.js"])),Le=c.exports.lazy(()=>m(()=>import("./Projects.07bdd75c.js"),["assets/Projects.07bdd75c.js","assets/Projects.cc4c0c9f.css","assets/vendor.bcd75120.js","assets/index.esm.d8119274.js"])),be=c.exports.lazy(()=>m(()=>import("./Settings.006a529e.js"),["assets/Settings.006a529e.js","assets/Settings.499fb991.css","assets/vendor.bcd75120.js"])),Me=c.exports.lazy(()=>m(()=>import("./Home.677c3648.js"),["assets/Home.677c3648.js","assets/Home.bfa2b119.css","assets/vendor.bcd75120.js"])),je=D.lazy(()=>m(()=>import("./Folders.10c2c8c3.js"),["assets/Folders.10c2c8c3.js","assets/Folders.26231e93.css","assets/index.esm.d8119274.js","assets/vendor.bcd75120.js"])),Ne=c.exports.lazy(()=>m(()=>import("./folder-16-regular.8eaf657e.js"),["assets/folder-16-regular.8eaf657e.js","assets/vendor.bcd75120.js"])),Ce=()=>{const e=ee.exports.useLiveQuery(()=>g.folders.orderBy("created").reverse().toArray()),t=N(a=>{var s;return(s=a.folderReducer.currentFolder)==null?void 0:s.id});return o(L,{children:[o("nav",{className:"menu",children:[o("ul",{className:"menu__list",children:[r("li",{className:"menu__item",children:o(p,{className:"menu__link",to:"/",children:[r(de,{className:"menu__svg"}),"Home"]})}),r("li",{className:"menu__item",children:r(c.exports.Suspense,{fallback:r("div",{children:"Loading..."}),children:o(p,{className:"menu__link",to:t?`/folders/${t}`:"/folders",children:[r(Ne,{className:"menu__svg"}),"Folders"]})})}),r("li",{className:"menu__item",children:o(p,{className:"menu__link",to:"/projects",children:[r(ie,{className:"menu__svg"}),"Projects"]})})]}),o("ul",{className:"menu__list",children:[r("li",{children:o(p,{className:"menu__link",to:"/settings",children:[r(he,{className:"menu__svg"}),"Settings"]})}),r("li",{className:"menu__item",children:o(p,{className:"menu__link",to:"/help",children:[r(ue,{className:"menu__svg"}),"Help"]})})]})]}),r("main",{children:o(c.exports.Suspense,{fallback:r("div",{children:"Loading..."}),children:[o(re,{children:[r(d,{path:"/help",element:r(Re,{})}),r(d,{path:"/folders",element:r(je,{allFolders:e}),children:r(d,{path:":folderId",element:r("div",{children:"ok"})})}),r(d,{path:"/projects",element:r(Le,{}),children:r(d,{path:":projectId",element:r(De,{})})}),r(d,{path:"/settings",element:r(be,{})}),r(d,{path:"temp",element:r(Ae,{})}),r(d,{path:"/",element:r(Me,{})})]})," "]})})]})};function Ee(e){return r("svg",u(h({width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 20 20"},e),{children:o("g",{fill:"none",children:[r("path",{d:"M8 7a2 2 0 1 1 4 0a2 2 0 0 1-4 0z",fill:"currentColor"}),r("path",{d:"M7.5 10h5a1.5 1.5 0 0 1 1.5 1.5c0 1.116-.459 2.01-1.212 2.615c-.741.595-1.735.885-2.788.885c-1.053 0-2.047-.29-2.788-.885C6.46 13.51 6 12.616 6 11.5A1.5 1.5 0 0 1 7.5 10z",fill:"currentColor"}),r("path",{d:"M10 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16zm-7 8a7 7 0 1 1 14 0a7 7 0 0 1-14 0z",fill:"currentColor"})]})}))}function Te(e){return r("svg",u(h({width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 28 28"},e),{children:r("g",{fill:"none",children:r("path",{d:"M11.5 2a9.5 9.5 0 0 1 9.5 9.5c0 2.082-.67 4.007-1.805 5.573l6.366 6.366a1.5 1.5 0 0 1-2.008 2.225l-.114-.103l-6.366-6.366A9.458 9.458 0 0 1 11.5 21a9.5 9.5 0 0 1 0-19zm0 3a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13z",fill:"currentColor"})})}))}const ze={searchText:""},C=v({name:"search",initialState:ze,reducers:{setSearchText(e,t){e.searchText=t.payload.trim().toLowerCase()},clearSearchText(e){e.searchText=""}}}),{setSearchText:Oe,clearSearchText:ke}=C.actions;var Ie=C.reducer;const He=()=>{const e=N(s=>s.searchReducer.searchText),t=ge();function a(s){s.preventDefault(),t(ke())}return r("form",{className:"search",children:o("div",{className:"search__container",children:[r("input",{className:"search__input",type:"text",name:"search",id:"search",placeholder:"Filter Models",autoComplete:"true",value:e,onChange:s=>t(Oe(s.target.value))}),r("button",{onClick:s=>a(s),className:"search__button",children:e.length?"X":r(Te,{style:{}})})]})})},Ve=()=>o("header",{className:"header",children:[r("div",{className:"header__logo",children:"madam3D"}),r("div",{className:"header__search",children:r(He,{})}),r("div",{className:"header__profile",children:r(Ee,{})})]});function Be(){return r(L,{children:o("div",{className:"app",children:[r(Ve,{}),r(te,{basename:"madam3D".toString(),children:r("div",{className:"app-content",children:r(Ce,{})})})]})})}const $e={selectedParts:[]},E=v({name:"selectedFolderItems",initialState:$e,reducers:{removePart(e,t){e.selectedParts=e.selectedParts.filter(a=>a.id!=t.payload)},clearParts(e){e.selectedParts=[]},addPart(e,t){e.selectedParts.push(t.payload)},removeAllPartsForFolder(e,t){e.selectedParts=e.selectedParts.filter(a=>a.folderId!==t.payload)}}}),{removePart:rr,clearParts:tr,addPart:ar,removeAllPartsForFolder:Ge}=E.actions;var Ye=E.reducer;const Ke={currentFolder:null,showDialog:!1,cursor:0,currentRootFolder:null},qe=b("getKnownFoldersAsync",async()=>{try{return await g.folders.toArray()}catch(e){throw new Error(`Error fetching data from local database. ${e}`)}}),Je=b("deleteFolderAsync",async(e,t)=>{t.dispatch(Ge(e));try{return await g.folders.delete(e),e}catch(a){throw new Error(`Error deleting folder from local database. ${a}`)}}),T=v({name:"folder",initialState:Ke,reducers:{hideDeleteFolderDialog(e){e.showDialog=!1},showDeleteFolderDialog(e){e.showDialog=!0},setCurrentFolder(e,t){e.currentFolder=t.payload},setCurrentRootFolder(e,t){e.currentRootFolder=t.payload},deleteFolder(e){},setCursor(e,t){e.cursor=t.payload}},extraReducers:e=>{e.addCase(Je.fulfilled,(t,a)=>{t.currentFolder=null,t.showDialog=!1}).addCase(qe.fulfilled,(t,a)=>{})}}),{hideDeleteFolderDialog:sr,showDeleteFolderDialog:or,setCurrentFolder:lr,setCurrentRootFolder:nr,setCursor:cr}=T.actions;var Qe=T.reducer;const Ue={partsFilter:"allFiles",show:{gcode:!1,obj:!1,stl:!0,threeMF:!0},folder:{settingDetailsIsOpen:!1,searchFiltersParts:!0}},z=v({name:"settings",initialState:Ue,reducers:{toggleGcode(e){e.show.gcode=!e.show.gcode},toggleStl(e){e.show.stl=!e.show.stl},toggle3mf(e){e.show.threeMF=!e.show.threeMF},toggleObj(e){e.show.obj=!e.show.obj},setPartFilter(e,t){e.partsFilter=t.payload},toggleSettingsDetails(e){e.folder.settingDetailsIsOpen=!e.folder.settingDetailsIsOpen},toggleSearchFiltersParts(e){e.folder.searchFiltersParts=!e.folder.searchFiltersParts}}}),{toggleGcode:ir,toggle3mf:dr,setPartFilter:hr,toggleObj:ur,toggleStl:mr,toggleSettingsDetails:pr,toggleSearchFiltersParts:gr}=z.actions;var We=z.reducer;const O=ae({reducer:{searchReducer:Ie,settingsReducer:We,folderReducer:Qe,selectedFolderItemsReducer:Ye}});pe();se.render(r(D.StrictMode,{children:r(oe,{store:O,children:r(Be,{})})}),document.getElementById("root"));window.Cypress&&(window.store=O);export{_e as B,j as F,Fe as a,xe as b,er as c,g as d,ge as e,ar as f,mr as g,dr as h,ir as i,gr as j,or as k,hr as l,lr as m,nr as n,sr as o,Je as p,rr as r,cr as s,pr as t,N as u};
