var U=Object.defineProperty,q=Object.defineProperties;var G=Object.getOwnPropertyDescriptors;var M=Object.getOwnPropertySymbols;var J=Object.prototype.hasOwnProperty,Q=Object.prototype.propertyIsEnumerable;var k=(e,r,s)=>r in e?U(e,r,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[r]=s,f=(e,r)=>{for(var s in r||(r={}))J.call(r,s)&&k(e,s,r[s]);if(M)for(var s of M(r))Q.call(r,s)&&k(e,s,r[s]);return e},v=(e,r)=>q(e,G(r));var x=(e,r,s)=>(k(e,typeof r!="symbol"?r+"":r,s),s);import{j as n,a as t,D as T,C as K,r as u,O as W,u as X,b as Z,c as ee,H as te,S as re,d as ae,e as ne,f as z,g as P,F as D,m as se,N as _,R as I,h as le,i as ce,k as j,l as ie,n as oe,o as de,p as N,B as he,q as ue,s as me,t as pe,P as ge}from"./vendor.f1e60159.js";const fe=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))c(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function s(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerpolicy&&(l.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?l.credentials="include":a.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function c(a){if(a.ep)return;a.ep=!0;const l=s(a);fetch(a.href,l)}};fe();const ve=()=>n("div",{children:[t("h2",{children:"Help"}),n("ul",{children:[n("li",{children:[t("a",{href:"https://github.com/react-spring/gltfjsx",children:t("code",{children:"@react-three/gltfjsx"})})," ","\u2013 turns GLTFs into JSX components"]}),n("li",{children:[t("a",{href:"https://github.com/react-spring/drei",children:t("code",{children:"@react-three/drei"})})," ","\u2013 useful helpers for react-three-fiber"]}),n("li",{children:[t("a",{href:"https://github.com/react-spring/react-postprocessing",children:t("code",{children:"@react-three/postprocessing"})})," ","\u2013 post-processing effects"]}),n("li",{children:[t("a",{href:"https://github.com/react-spring/react-three-flex",children:t("code",{children:"@react-three/flex"})})," ","\u2013 flexbox for react-three-fiber"]}),n("li",{children:[t("a",{href:"https://github.com/react-spring/react-xr",children:t("code",{children:"@react-three/xr"})})," ","\u2013 VR/AR controllers and events"]}),n("li",{children:[t("a",{href:"https://github.com/react-spring/use-cannon",children:t("code",{children:"@react-three/cannon"})})," ","\u2013 physics based hooks"]}),n("li",{children:[t("a",{href:"https://github.com/react-spring/zustand",children:t("code",{children:"zustand"})})," ","\u2013 state management"]}),n("li",{children:[t("a",{href:"https://github.com/react-spring/react-spring",children:t("code",{children:"react-spring"})})," ","\u2013 a spring-physics-based animation library"]}),n("li",{children:[t("a",{href:"https://github.com/react-spring/react-use-gesture",children:t("code",{children:"react-use-gesture"})})," ","\u2013 mouse/touch gestures"]}),n("li",{children:[t("a",{href:"https://github.com/pmndrs/leva",children:t("code",{children:"leva"})})," ","\u2013 create GUI controls in seconds"]})]})]});var L;(function(e){e[e.STL=0]="STL",e[e.OBJ=1]="OBJ",e[e.GCODE=2]="GCODE"})(L||(L={}));class _e extends T{constructor(){super("myAppDb");x(this,"folders");x(this,"projects");x(this,"files");this.version(1).stores({folders:"++id, name, filePath,created",projects:"++id, name, created, updated",files:"id,name, folderId, type, size, created"}),this.folders=this.table("folders"),this.projects=this.table("projects"),this.files=this.table("files")}}let h;function Ne(){h=new _e}const ye=async(e="",r=[])=>{const s=new Date,c={created:s,updated:s,name:e,itemIds:[]},a=await h.projects.add(c);return a>0&&(c.id=a),c.name===""&&(c.name=`Project ${a}`,await h.projects.update(a,{name:`Project ${a}`})),c},we=({fileUrl:e="http://localhost:3000/src/images/arm_joiner_double.stl"})=>{const r=X(re,e),s=u.exports.useRef(null);r.computeBoundingSphere();const c=r.boundingSphere?r.boundingSphere.radius:0,a=40/c;return t(Z,{alignTop:!0,children:t("mesh",{geometry:r,ref:s,scale:a,children:t("meshNormalMaterial",{flatShading:!0})})})};function be(){const{progress:e}=ee();return n(te,{center:!0,children:[e," % loaded"]})}const Ce=({fileUrl:e="http://localhost:3000/src/images/arm_joiner_double.stl"})=>n(K,{style:{},camera:{position:[1,70,100],fov:50,near:10,far:200},children:[t("pointLight",{position:[100,100,100]}),t("pointLight",{position:[-100,-100,-100]}),t("gridHelper",{args:[80,12,"magenta","cyan"]}),n(u.exports.Suspense,{fallback:t(be,{}),children:[t(we,{fileUrl:e}),t(W,{})]})]});const w=()=>ne(),F=ae,De={selectedItems:[]},H=z({name:"selectedFolderItems",initialState:De,reducers:{addItem(e,r){e.selectedItems.push(r.payload)},removeItem(e,r){e.selectedItems=e.selectedItems.filter(s=>s!=r.payload)},clear(e){e.selectedItems=[]}}}),{addItem:Fe,removeItem:Se,clear:ot}=H.actions;var xe=H.reducer;const Ae=({file:e})=>n("div",{className:"card",children:[t(Ce,{fileUrl:e.imageUrl}),t(ke,{file:e})]}),ke=({file:e})=>{const r=F(a=>a.selectedFolderItemsReducer.selectedItems.includes(e.id)),s=w(),c=a=>{a.stopPropagation(),s(r?Se(e.id):Fe(e.id)),console.log("clicked")};return t("div",{className:"card-overlay",onClick:a=>c(a),children:n("div",{className:"overlay-content",children:[t("p",{className:"card-filename",children:e.name}),t("div",{className:"overlay-checkbox",children:t("input",{type:"checkbox",checked:r,readOnly:!0})})]})})};const je={currentFolder:null,showDialog:!1,cursor:0},Le=P("getKnownFoldersAsync",async()=>{try{return await h.folders.toArray()}catch(e){throw new Error(`Error fetching data from local database. ${e}`)}}),B=P("deleteFolderAsync",async e=>{try{return await h.folders.delete(e),e}catch(r){throw new Error(`Error deleting folder from local database. ${r}`)}}),E=z({name:"folder",initialState:je,reducers:{hideDeleteFolderDialog(e){e.showDialog=!1},showDeleteFolderDialog(e){e.showDialog=!0},setCurrentFolder(e,r){e.currentFolder=r.payload},deleteFolder(e){},setCursor(e,r){e.cursor=r.payload}},extraReducers:e=>{e.addCase(B.fulfilled,(r,s)=>{r.showDialog=!1}).addCase(Le.fulfilled,(r,s)=>{})}}),{hideDeleteFolderDialog:Re,showDeleteFolderDialog:Me,setCurrentFolder:O,setCursor:$}=E.actions;var ze=E.reducer;const Pe=({folderId:e})=>{const r=F(d=>d.folderReducer.cursor),s=w(),[c,a]=u.exports.useState([]),[l,o]=u.exports.useState([]),[m,p]=u.exports.useState(4),A=async d=>{if(!d)return;let g=[];for await(const i of d.handle.values())if(i.kind==="file"&&i.name.endsWith(".stl")){const y=await d.handle.getFileHandle(i.name),S=await y.getFile(),C=URL.createObjectURL(S),Y=b(S,y,C,d.id);g.push(Y)}return g;function b(i,y,S,C){return{id:se(`${i.name}${C}`),created:new Date(i.lastModified),folderId:C,handle:y,name:i.name,printed:!1,size:i.size,type:L.STL,updated:new Date(i.lastModified),description:"",imageUrl:S,projectId:[C]}}},R=(d=1,g=0,b=c)=>{let i=g+d;i+d<0?(s($(0)),i=0):i>=Math.ceil(b.length/m)&&(i=Math.ceil(b.length/m)-1,console.log("page",i));const y=b.slice(i*m,(i+1)*m);o(y),s($(i))};return console.log("page modelList cursor",r),u.exports.useEffect(()=>{(async()=>{const d=await h.folders.where({id:e}).first();if(!d)return;const g=await A(d);g?(a(g),R(0,0,g)):a([])})()},[e]),n(D,{children:[e&&t(Ie,{paginate:R,currentPage:r,totalPages:Math.ceil(c.length/m)}),t("div",{className:"model-list",children:l==null?void 0:l.map(d=>t(Ae,{file:d},d.imageUrl))})]})},Ie=({currentPage:e,paginate:r,totalPages:s})=>n("div",{className:"pagination",children:[t("button",{className:"btn pagination__btn",onClick:()=>r(-1,e),children:"Previous"}),n("p",{className:"pagination__txt",children:[e+1|0," of ",s|0]}),t("button",{className:"btn pagination__btn",onClick:()=>r(1,e),children:"next"})]}),He=({folder:e})=>{const r=w();return typeof e=="undefined"?null:n("div",{className:"aside__details",children:[t("div",{children:t("button",{onClick:()=>{(e==null?void 0:e.id)&&r(Me())},children:"delete"})}),n("ul",{children:[t("li",{children:(e==null?void 0:e.filePath)||(e==null?void 0:e.name)}),n("li",{children:[e==null?void 0:e.id," one"]}),t("li",{children:e==null?void 0:e.created})]})]})};const Be=({children:e,title:r,show:s})=>t(D,{children:s&&t("div",{className:"dialog",children:n("div",{className:"dialog__container",children:[t("h4",{className:"dialog__title",children:r}),e]})})});function Ee({folder:e}){var a;const r=F(l=>l.folderReducer),s=w(),c=()=>{(e==null?void 0:e.id)&&s(B(e.id))};return n(Be,{title:"Delete Folder",show:r.showDialog,children:[t("p",{children:"Are you sure you want to delete the folder:"}),t("p",{children:(a=r.currentFolder)==null?void 0:a.name}),n("div",{className:"dialog__buttons",children:[t("button",{className:"btn dialog__btn",onClick:()=>s(Re()),children:"no"}),t("button",{className:"btn dialog__btn",onClick:c,children:"Yes"})]})]})}async function V(e){let r=await e.queryPermission();return console.log(r),r==="prompt"&&(r=await e.requestPermission()),r==="granted"}const Oe=async e=>{if(await V(e)===!1)return;let r=[];for await(const s of e.entries())try{s[1].kind==="file"&&(r=[...r,s[1]])}catch(c){console.error(`Error: getting files in the folder ${e.name}`,c)}return r},$e=({folder:e})=>{const r=w(),[s,c]=u.exports.useState();return u.exports.useEffect(()=>{e.handle.queryPermission().then(l=>c(l))},[e]),t("li",{className:"folder__item",onClick:async()=>{if(await V(e.handle)){const o={created:e.created.toDateString(),id:e.id,name:e.name,updated:e.updated.toDateString(),filePath:e.filePath};r(O(o)),c("granted")}},children:t(_,{className:`folder__link folder__item--${s}`,to:`/folders/${e.id}`,children:e.name})})},Ve=({allFolders:e})=>{const r=F(a=>a.folderReducer.currentFolder),s=w();console.log("storeCurrentFolder",r==null?void 0:r.id);const c=async a=>{a.preventDefault();try{const l=await window.showDirectoryPicker({});if(l.kind==="directory"){const o=new Date,m={handle:l,created:o,updated:o,name:l.name};try{const p=await h.folders.add(m);if(p>0){const A={id:p,name:l.name,created:o.toLocaleString(),updated:o.toLocaleString()};s(O(A))}}catch(p){console.log(`Error saving folder: ${p}`)}}}catch(l){console.error(`Error: ${l}`)}};return n("div",{className:"page",children:[t(Ee,{folder:r}),t("header",{className:"aside__header",children:n("button",{className:"btn",onClick:a=>c(a),children:[t(I,{className:"font-size--l"}),t("span",{className:"font-size--m",children:" Add Folder"})]})}),n("div",{className:"aside aside--small",children:[t("ul",{className:"aside__list folder__list",children:e&&e.map(a=>t($e,{folder:a},a.id))}),t(He,{folder:r})]}),r&&t(Pe,{folderId:r.id})]})};const Ye=({project:e})=>{const r=async s=>{s.preventDefault(),e.id&&await h.projects.delete(e.id)};return n(_,{to:`/projects/${e.id}`,className:"project-card",children:[n("div",{className:"project-card__overlay",children:[t("button",{className:"project-card__action",onClick:s=>r(s),children:t(le,{})}),t("button",{className:"project-card__action",children:t(ce,{})})]}),n("header",{className:"project-card__header",children:[" ",e.name]}),t("img",{src:"https://source.unsplash.com/featured?technology",style:{width:"100%"},alt:""}),n("ul",{className:"project-card__list",children:[n("li",{className:"project-card__list-item",children:["Files: ",e.itemIds.length]}),n("li",{className:"project-card__list-item",children:["Created: ",e.created.toLocaleDateString()]})]})]})},Ue=()=>{const e=j.exports.useLiveQuery(()=>h.projects.orderBy("created").reverse().toArray());return n("div",{className:"page",children:[n("header",{className:"aside__header",children:[n("button",{className:"btn",onClick:()=>ye(),children:[t(I,{className:"font-size--l"}),t("span",{className:"font-size--m",children:" New"})]}),e&&t("p",{className:"font-size--s",children:`PROJECTS: ${e.length}`})]}),t("div",{className:"aside",children:t("div",{className:"aside__list project__list",children:e&&e.map(r=>t(Ye,{project:r},r.id))})}),t("div",{children:t(ie,{})})]})},qe=()=>{let e=oe();return t("div",{children:n("h2",{children:["Project number:",e.projectId]})})},Ge=()=>t("div",{children:t("h2",{children:"Settings"})}),Je=({selectedFolder:e})=>{const[r,s]=u.exports.useState(null),c=async()=>{const a=await Oe(e.handle);a&&s(a.filter(l=>l.name.endsWith(".stl")))};return u.exports.useEffect(()=>{c()},[e]),n(D,{children:[n("p",{children:["total: ",(r==null?void 0:r.length)||0]}),t("ul",{children:r&&(r==null?void 0:r.map(a=>t("li",{children:a.name},a.name)))})]})},Qe=()=>{const[e,r]=u.exports.useState(null),s=j.exports.useLiveQuery(()=>h.folders.orderBy("created").reverse().toArray()),c=async a=>{a.preventDefault();try{const l=await window.showDirectoryPicker({});if(l.kind==="directory"){const o=new Date,m={handle:l,created:o,updated:o,name:l.name};try{let p=await h.folders.add(m);r(m)}catch(p){console.log(`Error saving folder: ${p}`)}}}catch(l){console.error(`Error: ${l}`)}};return n("div",{children:[t("h1",{children:"home"}),t("button",{onClick:a=>c(a),children:"Add Folder"}),t("button",{onClick:()=>console.log("TODO"),children:"clear"}),t("ul",{children:s&&s.map(a=>n("li",{onClick:()=>r(a),children:[a.name," ",a.updated.toLocaleDateString()]},a.name))}),e&&t(Je,{selectedFolder:e})]})};function Te(e){return t("svg",v(f({width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 16 16"},e),{children:t("g",{fill:"none",children:t("path",{d:"M2 5v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H7.175l-1.113-.89A.5.5 0 0 0 5.75 3H4a2 2 0 0 0-2 2zm1 0a1 1 0 0 1 1-1h1.575l.868.694l-.886.806H3V5zm4.593 0H12a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6.5h2.75a.5.5 0 0 0 .336-.13L7.593 5z",fill:"currentColor"})})}))}function Ke(e){return t("svg",v(f({width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},e),{children:t("g",{fill:"none",children:t("path",{d:"M8.75 3h6.5a.75.75 0 0 1 .743.648L16 3.75V7h1.75A3.25 3.25 0 0 1 21 10.25v6.5A3.25 3.25 0 0 1 17.75 20H6.25A3.25 3.25 0 0 1 3 16.75v-6.5A3.25 3.25 0 0 1 6.25 7H8V3.75a.75.75 0 0 1 .648-.743L8.75 3h6.5h-6.5zm9 5.5H6.25a1.75 1.75 0 0 0-1.75 1.75v6.5c0 .966.784 1.75 1.75 1.75h11.5a1.75 1.75 0 0 0 1.75-1.75v-6.5a1.75 1.75 0 0 0-1.75-1.75zm-3.25-4h-5V7h5V4.5z",fill:"currentColor"})})}))}function We(e){return t("svg",v(f({width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 16 16"},e),{children:t("g",{fill:"none",children:t("path",{d:"M7.313 1.262a1 1 0 0 1 1.374 0l4.844 4.579c.3.283.469.678.469 1.09v5.57a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 9 12.5V10a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v2.5A1.5 1.5 0 0 1 5.5 14h-2A1.5 1.5 0 0 1 2 12.5V6.93c0-.412.17-.807.47-1.09l4.843-4.58zM8 1.988l-4.844 4.58A.5.5 0 0 0 3 6.93v5.57a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V10a1.5 1.5 0 0 1 1.5-1.5h1A1.5 1.5 0 0 1 10 10v2.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V6.93a.5.5 0 0 0-.156-.363L8 1.988z",fill:"currentColor"})})}))}function Xe(e){return t("svg",v(f({width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},e),{children:t("g",{fill:"none",children:t("path",{d:"M12.012 2.25c.734.008 1.465.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.927 1.116l1.401-.615a.75.75 0 0 1 .85.174a9.792 9.792 0 0 1 2.204 3.792a.75.75 0 0 1-.271.825l-1.242.916a1.381 1.381 0 0 0 0 2.226l1.243.915a.75.75 0 0 1 .272.826a9.797 9.797 0 0 1-2.204 3.792a.75.75 0 0 1-.848.175l-1.407-.617a1.38 1.38 0 0 0-1.926 1.114l-.169 1.526a.75.75 0 0 1-.572.647a9.518 9.518 0 0 1-4.406 0a.75.75 0 0 1-.572-.647l-.168-1.524a1.382 1.382 0 0 0-1.926-1.11l-1.406.616a.75.75 0 0 1-.849-.175a9.798 9.798 0 0 1-2.204-3.796a.75.75 0 0 1 .272-.826l1.243-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.271-.826a9.793 9.793 0 0 1 2.204-3.792a.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65c.717-.159 1.45-.243 2.201-.252zm0 1.5a9.135 9.135 0 0 0-1.354.117l-.109.977A2.886 2.886 0 0 1 6.525 7.17l-.898-.394a8.293 8.293 0 0 0-1.348 2.317l.798.587a2.881 2.881 0 0 1 0 4.643l-.799.588c.32.842.776 1.626 1.348 2.322l.905-.397a2.882 2.882 0 0 1 4.017 2.318l.11.984c.889.15 1.798.15 2.687 0l.11-.984a2.881 2.881 0 0 1 4.018-2.322l.905.396a8.296 8.296 0 0 0 1.347-2.318l-.798-.588a2.881 2.881 0 0 1 0-4.643l.796-.587a8.293 8.293 0 0 0-1.348-2.317l-.896.393a2.884 2.884 0 0 1-4.023-2.324l-.11-.976a8.988 8.988 0 0 0-1.333-.117zM12 8.25a3.75 3.75 0 1 1 0 7.5a3.75 3.75 0 0 1 0-7.5zm0 1.5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5z",fill:"currentColor"})})}))}function Ze(e){return t("svg",v(f({width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},e),{children:t("g",{fill:"none",children:t("path",{d:"M12 2c5.523 0 10 4.478 10 10s-4.477 10-10 10S2 17.522 2 12S6.477 2 12 2zm0 1.667c-4.595 0-8.333 3.738-8.333 8.333c0 4.595 3.738 8.333 8.333 8.333c4.595 0 8.333-3.738 8.333-8.333c0-4.595-3.738-8.333-8.333-8.333zM12 15.5a1 1 0 1 1 0 2a1 1 0 0 1 0-2zm0-8.75a2.75 2.75 0 0 1 2.75 2.75c0 1.01-.297 1.574-1.051 2.359l-.169.171c-.622.622-.78.886-.78 1.47a.75.75 0 0 1-1.5 0c0-1.01.297-1.574 1.051-2.359l.169-.171c.622-.622.78-.886.78-1.47a1.25 1.25 0 0 0-2.493-.128l-.007.128a.75.75 0 0 1-1.5 0A2.75 2.75 0 0 1 12 6.75z",fill:"currentColor"})})}))}const et=()=>{const e=j.exports.useLiveQuery(()=>h.folders.orderBy("created").reverse().toArray()),r=F(s=>{var c;return(c=s.folderReducer.currentFolder)==null?void 0:c.id});return n(D,{children:[n("nav",{className:"menu",children:[n("ul",{className:"menu__list",children:[t("li",{className:"menu__item",children:n(_,{className:"menu__link",to:"/",children:[t(We,{className:"menu__svg"}),"Home"]})}),t("li",{className:"menu__item",children:n(_,{className:"menu__link",to:r?`/folders/${r}`:"/folders",children:[t(Te,{className:"menu__svg"}),"Folders"]})}),t("li",{className:"menu__item",children:n(_,{className:"menu__link",to:"/projects",children:[t(Ke,{className:"menu__svg"}),"Projects"]})})]}),n("ul",{className:"menu__list",children:[t("li",{children:n(_,{className:"menu__link",to:"/settings",children:[t(Xe,{className:"menu__svg"}),"Settings"]})}),t("li",{className:"menu__item",children:n(_,{className:"menu__link",to:"/help",children:[t(Ze,{className:"menu__svg"}),"Help"]})})]})]}),t("main",{children:n(de,{children:[t(N,{path:"/help",element:t(ve,{})}),t(N,{path:"/folders",element:t(Ve,{allFolders:e}),children:t(N,{path:":folderId",element:t("div",{children:"ok"})})}),t(N,{path:"/projects",element:t(Ue,{}),children:t(N,{path:":projectId",element:t(qe,{})})}),t(N,{path:"/settings",element:t(Ge,{})}),t(N,{path:"/",element:t(Qe,{})})]})})]})};function tt(e){return t("svg",v(f({width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 20 20"},e),{children:n("g",{fill:"none",children:[t("path",{d:"M8 7a2 2 0 1 1 4 0a2 2 0 0 1-4 0z",fill:"currentColor"}),t("path",{d:"M7.5 10h5a1.5 1.5 0 0 1 1.5 1.5c0 1.116-.459 2.01-1.212 2.615c-.741.595-1.735.885-2.788.885c-1.053 0-2.047-.29-2.788-.885C6.46 13.51 6 12.616 6 11.5A1.5 1.5 0 0 1 7.5 10z",fill:"currentColor"}),t("path",{d:"M10 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16zm-7 8a7 7 0 1 1 14 0a7 7 0 0 1-14 0z",fill:"currentColor"})]})}))}function rt(e){return t("svg",v(f({width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 28 28"},e),{children:t("g",{fill:"none",children:t("path",{d:"M11.5 2a9.5 9.5 0 0 1 9.5 9.5c0 2.082-.67 4.007-1.805 5.573l6.366 6.366a1.5 1.5 0 0 1-2.008 2.225l-.114-.103l-6.366-6.366A9.458 9.458 0 0 1 11.5 21a9.5 9.5 0 0 1 0-19zm0 3a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13z",fill:"currentColor"})})}))}const at=()=>{function e(r){r.preventDefault()}return t("form",{className:"search",children:n("div",{className:"search__container",children:[t("input",{className:"search__input",type:"text",name:"search",id:"search",placeholder:"Search",autoComplete:"false"}),t("button",{onClick:r=>e(r),className:"search__button",children:t(rt,{style:{}})})]})})},nt=()=>n("header",{className:"header",children:[t("div",{className:"header__logo",children:"madam3D"}),t("div",{className:"header__search",children:t(at,{})}),t("div",{className:"header__profile",children:t(tt,{})})]});function st(){return t(D,{children:n("div",{className:"app",children:[t(nt,{}),t(he,{children:t("div",{className:"app-content",children:t(et,{})})})]})})}const lt=ue({reducer:{folderReducer:ze,selectedFolderItemsReducer:xe}});Ne();me.render(t(pe.StrictMode,{children:t(ge,{store:lt,children:t(st,{})})}),document.getElementById("root"));
