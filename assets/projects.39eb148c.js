import{d as t,c as i}from"./index.a22b8b47.js";import{b as s,N as d,j as e,h as l,s as n}from"./vendor.34d8105b.js";import{R as o,a as m,b as h}from"./index.esm.d054ca86.js";const p=({project:a})=>{const c=async r=>{r.preventDefault(),a.id&&await t.projects.delete(a.id)};return s(d,{to:`/projects/${a.id}`,className:"project-card",children:[s("div",{className:"project-card__overlay",children:[e("button",{className:"project-card__action",onClick:r=>c(r),children:e(o,{})}),e("button",{className:"project-card__action",children:e(m,{})})]}),s("header",{className:"project-card__header",children:[" ",a.name]}),e("img",{src:"https://source.unsplash.com/featured?technology",style:{width:"100%"},alt:""}),s("ul",{className:"project-card__list",children:[s("li",{className:"project-card__list-item",children:["Files: ",a.itemIds.length]}),s("li",{className:"project-card__list-item",children:["Created: ",a.created.toLocaleDateString()]})]})]})},u=()=>{const a=l.exports.useLiveQuery(()=>t.projects.orderBy("created").reverse().toArray());return s("div",{className:"page",children:[s("header",{className:"aside__header",children:[s("button",{className:"btn",onClick:()=>i(),children:[e(h,{className:"font-size--l"}),e("span",{className:"font-size--m",children:" New"})]}),a&&e("p",{className:"font-size--s",children:`PROJECTS: ${a.length}`})]}),e("div",{className:"aside",children:e("div",{className:"aside__list project__list",children:a&&a.map(c=>e(p,{project:c},c.id))})}),e("div",{children:e(n,{})})]})};export{u as default};
