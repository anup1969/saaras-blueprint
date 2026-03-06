import{r as i,R as y,j as e,I as ye}from"./index-DnCCvGy7.js";import{C as U}from"./CodeDialog-CpkCWLkI.js";import{$ as de,a as le}from"./useFocusRing-BrSZtp7z.js";import{u as Se}from"./use-by-comparator-DwUW4B60.js";import{l as Ce,b as De}from"./use-default-value-CAki5Vnb.js";import{Y,c as ce,n as pe,o as O,V as ue,a as q,K as Q,u as we}from"./render-C57vWSTB.js";import{y as X}from"./use-sync-refs-BiJlwbXn.js";import{a as me}from"./disabled-CGDlQYBP.js";import{g as $e,j as Be,W as V}from"./field-BOh78wwU.js";import{Z as A,u as Fe,N as Pe,V as he}from"./label-BivTskuh.js";import{s as xe}from"./bugs-BJ7ScNGK.js";import{v as ae,T as M,A as ne,G as ze}from"./focus-management-BHGvY4IY.js";import{d as K}from"./owner-BJvmbhZ9.js";import{M as fe,w as Ee,H as be}from"./description-CrMm8HRH.js";import{o as B}from"./keyboard-C1Wiwm26.js";import{C as W}from"./card-sr3AlwUz.js";import{B as Le}from"./BreadcrumbComp-CkvqLna6.js";import"./index-CfcantPz.js";import"./vsc-dark-plus-DCm8Deni.js";import"./highlight-UM_loo16.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./hidden-9Lbw2LUr.js";import"./dom-BlW_0b_t.js";import"./CardBox-BlybE14U.js";import"./chevron-right-KgmLBFR_.js";import"./createLucideIcon-Cw6eFU3v.js";var Te=(a=>(a[a.RegisterOption=0]="RegisterOption",a[a.UnregisterOption=1]="UnregisterOption",a))(Te||{});let Ie={0(a,n){let r=[...a.options,{id:n.id,element:n.element,propsRef:n.propsRef}];return{...a,options:ze(r,s=>s.element.current)}},1(a,n){let r=a.options.slice(),s=a.options.findIndex(m=>m.id===n.id);return s===-1?a:(r.splice(s,1),{...a,options:r})}},Z=i.createContext(null);Z.displayName="RadioGroupDataContext";function J(a){let n=i.useContext(Z);if(n===null){let r=new Error(`<${a} /> is missing a parent <RadioGroup /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,J),r}return n}let _=i.createContext(null);_.displayName="RadioGroupActionsContext";function ee(a){let n=i.useContext(_);if(n===null){let r=new Error(`<${a} /> is missing a parent <RadioGroup /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,ee),r}return n}function Ue(a,n){return we(n.type,Ie,a,n)}let Oe="div";function Ae(a,n){let r=i.useId(),s=me(),{id:m=`headlessui-radiogroup-${r}`,value:P,form:g,name:v,onChange:l,by:f,disabled:c=s||!1,defaultValue:h,tabIndex:S=0,...k}=a,b=Se(f),[j,C]=i.useReducer(Ue,{options:[]}),o=j.options,[z,E]=he(),[D,L]=be(),w=i.useRef(null),T=X(w,n),p=Ce(h),[u,$]=De(P,l,p),N=i.useMemo(()=>o.find(t=>!t.propsRef.current.disabled),[o]),R=i.useMemo(()=>o.some(t=>b(t.propsRef.current.value,u)),[o,u]),x=O(t=>{var I;if(c||b(t,u))return!1;let d=(I=o.find(G=>b(G.propsRef.current.value,t)))==null?void 0:I.propsRef.current;return d!=null&&d.disabled?!1:($==null||$(t),!0)}),ge=O(t=>{if(!w.current)return;let I=o.filter(d=>d.propsRef.current.disabled===!1).map(d=>d.element.current);switch(t.key){case B.Enter:$e(t.currentTarget);break;case B.ArrowLeft:case B.ArrowUp:if(t.preventDefault(),t.stopPropagation(),ae(I,M.Previous|M.WrapAround)===ne.Success){let d=o.find(G=>K(G.element.current));d&&x(d.propsRef.current.value)}break;case B.ArrowRight:case B.ArrowDown:if(t.preventDefault(),t.stopPropagation(),ae(I,M.Next|M.WrapAround)===ne.Success){let d=o.find(G=>K(G.element.current));d&&x(d.propsRef.current.value)}break;case B.Space:{t.preventDefault(),t.stopPropagation();let d=o.find(G=>K(G.element.current));d&&x(d.propsRef.current.value)}break}}),re=O(t=>(C({type:0,...t}),()=>C({type:1,id:t.id}))),ve=i.useMemo(()=>({value:u,firstOption:N,containsCheckedOption:R,disabled:c,compare:b,tabIndex:S,...j}),[u,N,R,c,b,S,j]),ke=i.useMemo(()=>({registerOption:re,change:x}),[re,x]),Re={ref:T,id:m,role:"radiogroup","aria-labelledby":z,"aria-describedby":D,onKeyDown:ge},je=q({value:u}),Ne=i.useCallback(()=>{if(p!==void 0)return x(p)},[x,p]),Ge=Q();return y.createElement(L,{name:"RadioGroup.Description"},y.createElement(E,{name:"RadioGroup.Label"},y.createElement(_.Provider,{value:ke},y.createElement(Z.Provider,{value:ve},v!=null&&y.createElement(Be,{disabled:c,data:{[v]:u||"on"},overrides:{type:"radio",checked:u!=null},form:g,onReset:Ne}),Ge({ourProps:Re,theirProps:k,slot:je,defaultTag:Oe,name:"RadioGroup"})))))}let We="div";function He(a,n){var r;let s=J("RadioGroup.Option"),m=ee("RadioGroup.Option"),P=i.useId(),{id:g=`headlessui-radiogroup-option-${P}`,value:v,disabled:l=s.disabled||!1,autoFocus:f=!1,...c}=a,h=i.useRef(null),S=X(h,n),[k,b]=he(),[j,C]=be(),o=ce({value:v,disabled:l});pe(()=>m.registerOption({id:g,element:h,propsRef:o}),[g,m,h,o]);let z=O(R=>{var x;if(xe(R.currentTarget))return R.preventDefault();m.change(v)&&((x=h.current)==null||x.focus())}),E=((r=s.firstOption)==null?void 0:r.id)===g,{isFocusVisible:D,focusProps:L}=de({autoFocus:f}),{isHovered:w,hoverProps:T}=le({isDisabled:l}),p=s.compare(s.value,v),u=ue({ref:S,id:g,role:"radio","aria-checked":p?"true":"false","aria-labelledby":k,"aria-describedby":j,"aria-disabled":l?!0:void 0,tabIndex:l?-1:p||!s.containsCheckedOption&&E?s.tabIndex:-1,onClick:l?void 0:z,autoFocus:f},L,T),$=q({checked:p,disabled:l,active:D,hover:w,focus:D,autofocus:f}),N=Q();return y.createElement(C,{name:"RadioGroup.Description"},y.createElement(b,{name:"RadioGroup.Label"},N({ourProps:u,theirProps:c,slot:$,defaultTag:We,name:"RadioGroup.Option"})))}let Me="span";function Ve(a,n){var r;let s=J("Radio"),m=ee("Radio"),P=i.useId(),g=Fe(),v=me(),{id:l=g||`headlessui-radio-${P}`,value:f,disabled:c=s.disabled||v||!1,autoFocus:h=!1,...S}=a,k=i.useRef(null),b=X(k,n),j=Pe(),C=Ee(),o=ce({value:f,disabled:c});pe(()=>m.registerOption({id:l,element:k,propsRef:o}),[l,m,k,o]);let z=O(N=>{var R;if(xe(N.currentTarget))return N.preventDefault();m.change(f)&&((R=k.current)==null||R.focus())}),{isFocusVisible:E,focusProps:D}=de({autoFocus:h}),{isHovered:L,hoverProps:w}=le({isDisabled:c}),T=((r=s.firstOption)==null?void 0:r.id)===l,p=s.compare(s.value,f),u=ue({ref:b,id:l,role:"radio","aria-checked":p?"true":"false","aria-labelledby":j,"aria-describedby":C,"aria-disabled":c?!0:void 0,tabIndex:c?-1:p||!s.containsCheckedOption&&T?s.tabIndex:-1,autoFocus:h,onClick:c?void 0:z},D,w),$=q({checked:p,disabled:c,hover:L,focus:E,autofocus:h});return Q()({ourProps:u,theirProps:S,slot:$,defaultTag:Me,name:"Radio"})}let Ke=Y(Ae),Ye=Y(He),F=Y(Ve),qe=A,Qe=fe,H=Object.assign(Ke,{Option:Ye,Radio:F,Label:qe,Description:Qe});const Xe=`import { useState } from 'react'\r
import { Icon } from '@iconify/react'\r
import { Radio, RadioGroup } from '@headlessui/react'\r
\r
const plans = [\r
  { name: 'Startup', ram: '12GB', cpus: '6 CPUs', disk: '256GB SSD disk' },\r
  { name: 'Business', ram: '16GB', cpus: '8 CPUs', disk: '512GB SSD disk' },\r
  { name: 'Enterprise', ram: '32GB', cpus: '12 CPUs', disk: '1TB SSD disk' },\r
]\r
\r
const BasicRadioGroupCode = () => {\r
  const [selected, setSelected] = useState(plans[0])\r
\r
  return (\r
    <div>\r
      <div className='mx-auto w-full'>\r
        <RadioGroup\r
          value={selected}\r
          onChange={setSelected}\r
          aria-label='Server size'\r
          className='space-y-4'>\r
          {plans.map((plan) => (\r
            <Radio\r
              key={plan.name}\r
              value={plan}\r
              className='group relative flex cursor-pointer rounded-md bg-lightgray dark:bg-dark py-4 px-5 text-ld shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-primary data-[checked]:bg-primary dark:data-[checked]:bg-primary'>\r
              <div className='flex w-full items-center justify-between'>\r
                <div className='text-sm'>\r
                  <p className='font-semibold text-ld text-base group-data-[checked]:text-white'>\r
                    {plan.name}\r
                  </p>\r
                  <div className='flex gap-2 text-ld dark:text-gray-500 text-sm group-data-[checked]:text-white/50 dark:group-data-[checked]:text-white'>\r
                    <div>{plan.ram}</div>\r
                    <div aria-hidden='true'>&middot;</div>\r
                    <div>{plan.cpus}</div>\r
                    <div aria-hidden='true'>&middot;</div>\r
                    <div>{plan.disk}</div>\r
                  </div>\r
                </div>\r
\r
                <Icon\r
                  icon='solar:check-circle-linear'\r
                  height={20}\r
                  className='opacity-0 transition group-data-[checked]:opacity-100 text-white'\r
                />\r
              </div>\r
            </Radio>\r
          ))}\r
        </RadioGroup>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default BasicRadioGroupCode\r
`,Ze=`import { Field, Label, Radio, RadioGroup } from '@headlessui/react'\r
\r
const plans = [\r
  'Developing',\r
  'Designing',\r
  'Coding',\r
  'Graphics Design',\r
  'Accounting',\r
  'Frontend',\r
]\r
\r
const DisabledRadioGroupCode = () => {\r
  return (\r
    <>\r
      <div>\r
        <RadioGroup\r
          aria-label='Server size'\r
          className='flex flex-col gap-3'>\r
          {plans.map((plan) => (\r
            <Field key={plan} className='flex items-center gap-3 '>\r
              <Radio\r
                disabled\r
                value={plan}\r
                className='group cursor-pointer flex size-5 items-center justify-center rounded-full border border-ld bg-white dark:bg-transparent data-[checked]:bg-primary dark:data-[checked]:bg-primary outline-0'>\r
                <span className='invisible size-2 rounded-full bg-white group-data-[checked]:visible' />\r
              </Radio>\r
              <Label className='text-sm text-ld cursor-pointer opacity-50'>\r
                {plan}\r
              </Label>\r
            </Field>\r
          ))}\r
        </RadioGroup>\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default DisabledRadioGroupCode\r
`,Je=`import { useState } from 'react'\r
import { Field, Label, Radio, RadioGroup } from '@headlessui/react'\r
\r
const plans = [\r
  'Developing',\r
  'Designing',\r
  'Coding',\r
  'Graphics Design',\r
  'Accounting',\r
  'Frontend',\r
]\r
\r
const MainRadioGroupCode = () => {\r
  const [selected, setSelected] = useState(plans[0])\r
\r
  return (\r
    <div>\r
      <RadioGroup\r
        value={selected}\r
        onChange={setSelected}\r
        aria-label='Server size'\r
        className='flex flex-col gap-3'>\r
        {plans.map((plan) => (\r
          <Field key={plan} className='flex items-center gap-3'>\r
            <Radio\r
              value={plan}\r
              className='group cursor-pointer flex size-5 items-center justify-center rounded-full border border-ld bg-white dark:bg-transparent data-[checked]:bg-primary dark:data-[checked]:bg-primary outline-0'>\r
              <span className='invisible size-2 rounded-full bg-white group-data-[checked]:visible' />\r
            </Radio>\r
            <Label className='text-sm text-ld cursor-pointer'>{plan}</Label>\r
          </Field>\r
        ))}\r
      </RadioGroup>\r
    </div>\r
  )\r
}\r
\r
export default MainRadioGroupCode\r
`,_e=`import { useState } from 'react'\r
import { Description, Field, Label, Radio, RadioGroup } from '@headlessui/react'\r
\r
const plans = [\r
  { name: 'Startup', description: '12GB, 6 CPUs, 256GB SSD disk' },\r
  { name: 'Business', description: '16GB, 8 CPUs, 512GB SSD disk' },\r
  { name: 'Enterprise', description: '32GB, 12 CPUs, 1TB SSD disk' },\r
]\r
\r
const RadioGroupWithDescCode = () => {\r
  const [selected, setSelected] = useState(plans[0])\r
\r
  return (\r
    <div>\r
      <RadioGroup\r
        value={selected}\r
        onChange={setSelected}\r
        aria-label='Server size'\r
        className='flex flex-col gap-3'>\r
        {plans.map((plan) => (\r
          <Field\r
            key={plan.name}\r
            className='flex items-center gap-3 bg-lightgray dark:bg-dark py-2 px-4 rounded-full '>\r
            <Radio\r
              value={plan}\r
              className='group cursor-pointer flex size-5 items-center justify-center rounded-full border border-ld bg-white dark:bg-transparent data-[checked]:bg-primary dark:data-[checked]:bg-primary outline-0'>\r
              <span className='invisible size-2 rounded-full bg-white group-data-[checked]:visible ' />\r
            </Radio>\r
            <div>\r
              <Label className='text-ld cursor-pointer'>{plan.name}</Label>\r
              <Description className='text-darklink dark:text-gray-500 text-xs'>\r
                {plan.description}\r
              </Description>\r
            </div>\r
          </Field>\r
        ))}\r
      </RadioGroup>\r
    </div>\r
  )\r
}\r
\r
export default RadioGroupWithDescCode\r
`,er=`import { useState } from 'react'\r
import { Field, Label, Radio, RadioGroup } from '@headlessui/react'\r
\r
const plans = [\r
  'Developing',\r
  'Designing',\r
  'Coding',\r
  'Graphics Design',\r
  'Accounting',\r
  'Frontend',\r
  'Seo',\r
]\r
\r
const WithHtmlRadioFormCode = () => {\r
  const [selected, setSelected] = useState(plans[0])\r
\r
  return (\r
    <div>\r
      <form action='/plans' method='post'>\r
        <RadioGroup\r
          value={selected}\r
          onChange={setSelected}\r
          aria-label='Server size'\r
          className='flex flex-col gap-3'>\r
          {plans.map((plan) => (\r
            <Field key={plan} className='flex items-center gap-3'>\r
              <Radio\r
                value={plan}\r
                className='group cursor-pointer flex size-5 items-center justify-center rounded-full border border-ld bg-white dark:bg-transparent data-[checked]:bg-primary dark:data-[checked]:bg-primary outline-0'>\r
                <span className='invisible size-2 rounded-full bg-white group-data-[checked]:visible' />\r
              </Radio>\r
              <Label className='text-sm text-ld cursor-pointer'>{plan}</Label>\r
            </Field>\r
          ))}\r
        </RadioGroup>\r
        <div className='flex gap-3 mt-4'>\r
          <button className='ui-button bg-primary'>Submit</button>\r
          <button className='ui-button bg-error'>Cancel</button>\r
        </div>\r
      </form>\r
    </div>\r
  )\r
}\r
\r
export default WithHtmlRadioFormCode\r
`,se=[{name:"Startup",ram:"12GB",cpus:"6 CPUs",disk:"256GB SSD disk"},{name:"Business",ram:"16GB",cpus:"8 CPUs",disk:"512GB SSD disk"},{name:"Enterprise",ram:"32GB",cpus:"12 CPUs",disk:"1TB SSD disk"}],rr=()=>{const[a,n]=i.useState(se[0]);return e.jsx("div",{children:e.jsx("div",{className:"mx-auto w-full",children:e.jsx(H,{value:a,onChange:n,"aria-label":"Server size",className:"space-y-4",children:se.map(r=>e.jsx(F,{value:r,className:"group relative flex cursor-pointer rounded-md bg-lightgray dark:bg-dark py-4 px-5 text-ld shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-primary data-[checked]:bg-primary dark:data-[checked]:bg-primary",children:e.jsxs("div",{className:"flex w-full items-center justify-between",children:[e.jsxs("div",{className:"text-sm",children:[e.jsx("p",{className:"font-semibold text-ld text-base group-data-[checked]:text-white",children:r.name}),e.jsxs("div",{className:"flex gap-2 text-ld dark:text-gray-500 text-sm group-data-[checked]:text-white/50 dark:group-data-[checked]:text-white",children:[e.jsx("div",{children:r.ram}),e.jsx("div",{"aria-hidden":"true",children:"·"}),e.jsx("div",{children:r.cpus}),e.jsx("div",{"aria-hidden":"true",children:"·"}),e.jsx("div",{children:r.disk})]})]}),e.jsx(ye,{icon:"solar:check-circle-linear",height:20,className:"opacity-0 transition group-data-[checked]:opacity-100 text-white"})]})},r.name))})})})},ar=()=>e.jsx(W,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Styling Radio Group"}),e.jsx(rr,{})]})})}),nr=["Developing","Designing","Coding","Graphics Design","Accounting","Frontend"],sr=()=>e.jsx(e.Fragment,{children:e.jsx("div",{children:e.jsx(H,{"aria-label":"Server size",className:"flex flex-col gap-3",children:nr.map(a=>e.jsxs(V,{className:"flex items-center gap-3 ",children:[e.jsx(F,{disabled:!0,value:a,className:"group cursor-pointer flex size-5 items-center justify-center rounded-full border border-ld bg-white dark:bg-transparent data-[checked]:bg-primary dark:data-[checked]:bg-primary outline-0",children:e.jsx("span",{className:"invisible size-2 rounded-full bg-white group-data-[checked]:visible"})}),e.jsx(A,{className:"text-sm text-ld cursor-pointer opacity-50",children:a})]},a))})})}),ir=()=>e.jsx(W,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Disabled Radio Group"}),e.jsx(sr,{})]})})}),ie=["Developing","Designing","Coding","Graphics Design","Accounting","Frontend"],tr=()=>{const[a,n]=i.useState(ie[0]);return e.jsx("div",{children:e.jsx(H,{value:a,onChange:n,"aria-label":"Server size",className:"flex flex-col gap-3",children:ie.map(r=>e.jsxs(V,{className:"flex items-center gap-3",children:[e.jsx(F,{value:r,className:"group cursor-pointer flex size-5 items-center justify-center rounded-full border border-ld bg-white dark:bg-transparent data-[checked]:bg-primary dark:data-[checked]:bg-primary outline-0",children:e.jsx("span",{className:"invisible size-2 rounded-full bg-white group-data-[checked]:visible"})}),e.jsx(A,{className:"text-sm text-ld cursor-pointer",children:r})]},r))})})},or=()=>e.jsx(W,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Simple Radio Group"}),e.jsx(tr,{})]})})}),te=[{name:"Startup",description:"12GB, 6 CPUs, 256GB SSD disk"},{name:"Business",description:"16GB, 8 CPUs, 512GB SSD disk"},{name:"Enterprise",description:"32GB, 12 CPUs, 1TB SSD disk"}],dr=()=>{const[a,n]=i.useState(te[0]);return e.jsx("div",{children:e.jsx(H,{value:a,onChange:n,"aria-label":"Server size",className:"flex flex-col gap-3",children:te.map(r=>e.jsxs(V,{className:"flex items-center gap-3 bg-lightgray dark:bg-dark py-2 px-4 rounded-full ",children:[e.jsx(F,{value:r,className:"group cursor-pointer flex size-5 items-center justify-center rounded-full border border-ld bg-white dark:bg-transparent data-[checked]:bg-primary dark:data-[checked]:bg-primary outline-0",children:e.jsx("span",{className:"invisible size-2 rounded-full bg-white group-data-[checked]:visible "})}),e.jsxs("div",{children:[e.jsx(A,{className:"text-ld cursor-pointer",children:r.name}),e.jsx(fe,{className:"text-darklink dark:text-gray-500 text-xs",children:r.description})]})]},r.name))})})},lr=()=>e.jsx(W,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"With Description"}),e.jsx(dr,{})]})})}),oe=["Developing","Designing","Coding","Graphics Design","Accounting","Frontend","Seo"],cr=()=>{const[a,n]=i.useState(oe[0]);return e.jsx("div",{children:e.jsxs("form",{action:"/plans",method:"post",children:[e.jsx(H,{value:a,onChange:n,"aria-label":"Server size",className:"flex flex-col gap-3",children:oe.map(r=>e.jsxs(V,{className:"flex items-center gap-3",children:[e.jsx(F,{value:r,className:"group cursor-pointer flex size-5 items-center justify-center rounded-full border border-ld bg-white dark:bg-transparent data-[checked]:bg-primary dark:data-[checked]:bg-primary outline-0",children:e.jsx("span",{className:"invisible size-2 rounded-full bg-white group-data-[checked]:visible"})}),e.jsx(A,{className:"text-sm text-ld cursor-pointer",children:r})]},r))}),e.jsxs("div",{className:"flex gap-3 mt-4",children:[e.jsx("button",{className:"ui-button bg-primary",children:"Submit"}),e.jsx("button",{className:"ui-button bg-error",children:"Cancel"})]})]})})},pr=()=>e.jsx(W,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"With HTML forms"}),e.jsx(cr,{})]})})}),ur=[{to:"/",title:"Home"},{title:"RadioGRoup"}],Wr=()=>e.jsxs(e.Fragment,{children:[e.jsx(Le,{title:"Radio Group",items:ur}),e.jsxs("div",{className:"grid grid-cols-12 gap-7",children:[e.jsxs("div",{className:"  col-span-12",children:[e.jsx(or,{}),e.jsx(U,{children:Je})]}),e.jsxs("div",{className:" col-span-12",children:[e.jsx(lr,{}),e.jsx(U,{children:_e})]}),e.jsxs("div",{className:" col-span-12",children:[e.jsx(ir,{}),e.jsx(U,{children:Ze})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(ar,{}),e.jsx(U,{children:Xe})]}),e.jsxs("div",{className:" col-span-12",children:[e.jsx(pr,{}),e.jsx(U,{children:er})]})]})]});export{Wr as default};
