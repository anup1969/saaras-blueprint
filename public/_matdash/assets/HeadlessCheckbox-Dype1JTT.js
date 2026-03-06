import{r as s,R as f,j as e,a1 as y}from"./index-CW78-08q.js";import{W as J}from"./WithLabelCode-Cq3iEGQw.js";import{C as h}from"./CodeDialog-DRC5ECma.js";import{$ as Q,a as ee}from"./useFocusRing-C4a7XbRQ.js";import{w as re}from"./use-active-press-B3Qy7rBF.js";import{l as ne,b as se}from"./use-default-value-N_-AhSAK.js";import{Y as ae,p as te,o as g,V as ie,a as oe,K as ce}from"./render-PQ-Pxh_K.js";import{a as de}from"./disabled-ya7cIcFn.js";import{j as le,g as he,W as a}from"./field-Bn1M1Eus.js";import{u as xe,N as pe,Z as t}from"./label-UoigDyJw.js";import{s as me}from"./bugs-BJ7ScNGK.js";import{w as be,M as ue}from"./description-CcLMe4Pd.js";import{o as w}from"./keyboard-C1Wiwm26.js";import{C as x}from"./card-BmJIY3HQ.js";import{C as W}from"./CardBox-CJgwgOI2.js";import{B as ke}from"./BreadcrumbComp-mrdJNCbj.js";import"./index-DaNAaBSr.js";import"./vsc-dark-plus-CoILpeng.js";import"./highlight-DCblhEs5.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./owner-DjBRcPii.js";import"./hidden-BQ-70OtW.js";import"./use-sync-refs-r_6MKybg.js";import"./dom-BlW_0b_t.js";import"./chevron-right-B2L8yKO6.js";import"./createLucideIcon-BxwgNh2l.js";let ge="span";function je(r,n){let o=s.useId(),c=xe(),p=de(),{id:m=c||`headlessui-checkbox-${o}`,disabled:l=p||!1,autoFocus:v=!1,checked:E,defaultChecked:F,onChange:S,name:N,value:B,form:M,indeterminate:j=!1,tabIndex:D=0,...T}=r,b=ne(F),[k,u]=se(E,S,b??!1),$=pe(),U=be(),H=te(),[P,L]=s.useState(!1),C=g(()=>{L(!0),u==null||u(!k),H.nextFrame(()=>{L(!1)})}),R=g(d=>{if(me(d.currentTarget))return d.preventDefault();d.preventDefault(),C()}),A=g(d=>{d.key===w.Space?(d.preventDefault(),C()):d.key===w.Enter&&he(d.currentTarget)}),K=g(d=>d.preventDefault()),{isFocusVisible:z,focusProps:I}=Q({autoFocus:v}),{isHovered:V,hoverProps:G}=ee({isDisabled:l}),{pressed:O,pressProps:X}=re({disabled:l}),Y=ie({ref:n,id:m,role:"checkbox","aria-checked":j?"mixed":k?"true":"false","aria-labelledby":$,"aria-describedby":U,"aria-disabled":l?!0:void 0,indeterminate:j?"true":void 0,tabIndex:l?void 0:D,onKeyUp:l?void 0:A,onKeyPress:l?void 0:K,onClick:l?void 0:R},I,G,X),Z=oe({checked:k,disabled:l,hover:V,focus:z,active:O,indeterminate:j,changing:P,autofocus:v}),_=s.useCallback(()=>{if(b!==void 0)return u==null?void 0:u(b)},[u,b]),q=ce();return f.createElement(f.Fragment,null,N!=null&&f.createElement(le,{disabled:l,data:{[N]:B||"on"},overrides:{type:"checkbox",checked:k},form:M,onReset:_}),q({ourProps:Y,theirProps:T,slot:Z,defaultTag:ge,name:"Checkbox"}))}let i=ae(je);const fe=`import { useState } from 'react'\r
import { Checkbox, Field, Label } from '@headlessui/react'\r
\r
const DisableCheckCode = () => {\r
  const [enabled, setEnabled] = useState(false)\r
\r
  return (\r
    <div>\r
      <div className='flex flex-col gap-3'>\r
        <div>\r
          <Field disabled className='flex items-center gap-3'>\r
            <Checkbox\r
              checked={enabled}\r
              onChange={setEnabled}\r
              className='group block size-4 rounded border bg-white data-[checked]:bg-blue-500 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500'>\r
              <svg\r
                className='stroke-white opacity-0 group-data-[checked]:opacity-100'\r
                viewBox='0 0 14 14'\r
                fill='none'>\r
                <path\r
                  d='M3 8L6 11L11 3.5'\r
                  strokeWidth={2}\r
                  strokeLinecap='round'\r
                  strokeLinejoin='round'\r
                />\r
              </svg>\r
            </Checkbox>\r
            <Label className='data-[disabled]:opacity-50'>\r
              Enable beta features\r
            </Label>\r
          </Field>\r
        </div>\r
        <div>\r
          <Field disabled className='flex items-center gap-3'>\r
            <Checkbox\r
              checked={enabled}\r
              onChange={setEnabled}\r
              className='group block size-4 rounded border bg-white data-[checked]:bg-blue-500 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500'>\r
              <svg\r
                className='stroke-white opacity-0 group-data-[checked]:opacity-100'\r
                viewBox='0 0 14 14'\r
                fill='none'>\r
                <path\r
                  d='M3 8L6 11L11 3.5'\r
                  strokeWidth={2}\r
                  strokeLinecap='round'\r
                  strokeLinejoin='round'\r
                />\r
              </svg>\r
            </Checkbox>\r
            <Label className='data-[disabled]:opacity-50'>\r
              Enable beta features\r
            </Label>\r
          </Field>\r
        </div>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default DisableCheckCode\r
`,ve=`import { useState } from 'react'\r
import { Checkbox, Field, Label } from '@headlessui/react'\r
\r
const TransitionCheckCode = () => {\r
  const [enabled, setEnabled] = useState(false)\r
  const [enabled1, setEnabled1] = useState(false)\r
  const [enabled2, setEnabled2] = useState(false)\r
\r
  return (\r
    <div>\r
      <div className='flex flex-col gap-3'>\r
        <div>\r
          <Field className='flex items-center gap-3'>\r
            <Checkbox\r
              checked={enabled}\r
              onChange={setEnabled}\r
              className='group block ui-checkbox'>\r
              <svg\r
                className='stroke-white opacity-0 transition group-data-[checked]:opacity-100'\r
                viewBox='0 0 14 14'\r
                fill='none'\r
                height={15}>\r
                <path\r
                  d='M3 8L6 11L11 3.5'\r
                  strokeWidth={2}\r
                  strokeLinecap='round'\r
                  strokeLinejoin='round'\r
                />\r
              </svg>\r
            </Checkbox>\r
            <Label className='cursor-pointer'>Checkbox With Transitoin</Label>\r
          </Field>\r
        </div>\r
        <div>\r
          <Field className='flex items-center gap-3'>\r
            <Checkbox\r
              checked={enabled1}\r
              onChange={setEnabled1}\r
              className='group block ui-checkbox'>\r
              <svg\r
                className='stroke-white opacity-0 transition group-data-[checked]:opacity-100'\r
                viewBox='0 0 14 14'\r
                fill='none'\r
                height={15}>\r
                <path\r
                  d='M3 8L6 11L11 3.5'\r
                  strokeWidth={2}\r
                  strokeLinecap='round'\r
                  strokeLinejoin='round'\r
                />\r
              </svg>\r
            </Checkbox>\r
            <Label className='cursor-pointer'>Checkbox With Transitoin</Label>\r
          </Field>\r
        </div>\r
        <div>\r
          <Field className='flex items-center gap-3'>\r
            <Checkbox\r
              checked={enabled2}\r
              onChange={setEnabled2}\r
              className='group block ui-checkbox'>\r
              <svg\r
                className='stroke-white opacity-0 transition group-data-[checked]:opacity-100'\r
                viewBox='0 0 14 14'\r
                fill='none'\r
                height={15}>\r
                <path\r
                  d='M3 8L6 11L11 3.5'\r
                  strokeWidth={2}\r
                  strokeLinecap='round'\r
                  strokeLinejoin='round'\r
                />\r
              </svg>\r
            </Checkbox>\r
            <Label className='cursor-pointer'>Checkbox With Transitoin</Label>\r
          </Field>\r
        </div>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default TransitionCheckCode\r
`,Ne=`import { useState } from 'react'\r
import { Checkbox, Field, Label } from '@headlessui/react'\r
\r
const UsingHtmlFormCode = () => {\r
  const [enabled, setEnabled] = useState(false)\r
\r
  return (\r
    <div>\r
      <form action='/accounts' method='post'>\r
        <Field className='flex items-center gap-3'>\r
          <Checkbox\r
            checked={enabled}\r
            onChange={setEnabled}\r
            name='terms-of-service'\r
            className='group block ui-checkbox'>\r
            <svg\r
              className='stroke-white opacity-0 group-data-[checked]:opacity-100'\r
              viewBox='0 0 14 14'\r
              fill='none'\r
              height={15}>\r
              <path\r
                d='M3 8L6 11L11 3.5'\r
                strokeWidth={2}\r
                strokeLinecap='round'\r
                strokeLinejoin='round'\r
              />\r
            </svg>\r
          </Checkbox>\r
          <Label className='cursor-pointer'>\r
            Agree to terms and conditions\r
          </Label>\r
        </Field>\r
        <div className='flex gap-3 mt-4'>\r
          <button className='ui-button bg-primary justify-center'>\r
            Submit\r
          </button>\r
          <button className='ui-button bg-error justify-center'>Cancel</button>\r
        </div>\r
      </form>\r
    </div>\r
  )\r
}\r
\r
export default UsingHtmlFormCode\r
`,Le=`import { Checkbox, Field, Label } from '@headlessui/react'\r
\r
const UsingUncontrolledCode = () => {\r
  return (\r
    <div>\r
      <form action='/accounts' method='post'>\r
        <Field className='flex items-center gap-3'>\r
          <Checkbox\r
            defaultChecked={true}\r
            name='terms-of-service'\r
            className='group block ui-checkbox'>\r
            <svg\r
              className='stroke-white opacity-0 group-data-[checked]:opacity-100'\r
              viewBox='0 0 14 14'\r
              fill='none'>\r
              <path\r
                d='M3 8L6 11L11 3.5'\r
                strokeWidth={2}\r
                strokeLinecap='round'\r
                strokeLinejoin='round'\r
              />\r
            </svg>\r
          </Checkbox>\r
          <Label className='cursor-pointer'>\r
            Agree to terms and conditions\r
          </Label>\r
        </Field>\r
        <div className='flex gap-3 mt-4'>\r
          <button className='ui-button bg-primary justify-center'>\r
            Submit\r
          </button>\r
          <button className='ui-button bg-error justify-center'>Cancel</button>\r
        </div>\r
      </form>\r
    </div>\r
  )\r
}\r
\r
export default UsingUncontrolledCode\r
`,Ce=`import { useState } from 'react'\r
import { Checkbox, Description, Field, Label } from '@headlessui/react'\r
\r
const WithDescriptionCode = () => {\r
  const [enabled, setEnabled] = useState(false)\r
\r
  return (\r
    <div>\r
      <div>\r
        <Field className='flex gap-3'>\r
          <Checkbox\r
            checked={enabled}\r
            onChange={setEnabled}\r
            className='group block ui-checkbox'>\r
            <svg\r
              className='stroke-white opacity-0 group-data-[checked]:opacity-100 rounded'\r
              viewBox='0 0 14 14'\r
              fill='none'\r
              height={15}>\r
              <path\r
                d='M3 8L6 11L11 3.5'\r
                strokeWidth={2}\r
                strokeLinecap='round'\r
                strokeLinejoin='round'\r
              />\r
            </svg>\r
          </Checkbox>\r
          <div>\r
            <Label>Enable beta features</Label>\r
            <Description>\r
              This will give you early access to new features we're developing.\r
            </Description>\r
          </div>\r
        </Field>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default WithDescriptionCode\r
`,ye=()=>{const[r,n]=s.useState(!1);return e.jsx("div",{children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("div",{children:e.jsxs(a,{disabled:!0,className:"flex items-center gap-3",children:[e.jsx(i,{checked:r,onChange:n,className:"group block size-4 rounded border bg-white data-[checked]:bg-blue-500 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500",children:e.jsx("svg",{className:"stroke-white opacity-0 group-data-[checked]:opacity-100",viewBox:"0 0 14 14",fill:"none",children:e.jsx("path",{d:"M3 8L6 11L11 3.5",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx(t,{className:"data-[disabled]:opacity-50",children:"Enable beta features"})]})}),e.jsx("div",{children:e.jsxs(a,{disabled:!0,className:"flex items-center gap-3",children:[e.jsx(i,{checked:r,onChange:n,className:"group block size-4 rounded border bg-white data-[checked]:bg-blue-500 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500",children:e.jsx("svg",{className:"stroke-white opacity-0 group-data-[checked]:opacity-100",viewBox:"0 0 14 14",fill:"none",children:e.jsx("path",{d:"M3 8L6 11L11 3.5",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx(t,{className:"data-[disabled]:opacity-50",children:"Enable beta features"})]})})]})})},we=()=>e.jsx(x,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Disable Checkbox"}),e.jsx(ye,{})]})})}),We=()=>{const[r,n]=s.useState(!1),[o,c]=s.useState(!1),[p,m]=s.useState(!1);return e.jsx("div",{children:e.jsxs(W,{children:[e.jsx("div",{className:"flex items-center justify-between mb-2",children:e.jsx("h4",{className:"text-lg font-semibold",children:"Render As a Div Elements"})}),e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("div",{children:e.jsxs(a,{className:"flex items-center gap-3",children:[e.jsx(i,{as:"div",checked:r,onChange:n,className:"group block ui-checkbox",children:e.jsx("svg",{className:"stroke-white opacity-0 transition group-data-[checked]:opacity-100",viewBox:"0 0 14 14",fill:"none",height:15,children:e.jsx("path",{d:"M3 8L6 11L11 3.5",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx(t,{className:"cursor-pointer",children:"Checkbox With Transitoin"})]})}),e.jsx("div",{children:e.jsxs(a,{className:"flex items-center gap-3",children:[e.jsx(i,{as:"div",checked:o,onChange:c,className:"group block ui-checkbox",children:e.jsx("svg",{className:"stroke-white opacity-0 transition group-data-[checked]:opacity-100",viewBox:"0 0 14 14",fill:"none",height:15,children:e.jsx("path",{d:"M3 8L6 11L11 3.5",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx(t,{className:"cursor-pointer",children:"Checkbox With Transitoin"})]})}),e.jsx("div",{children:e.jsxs(a,{className:"flex items-center gap-3",children:[e.jsx(i,{as:"div",checked:p,onChange:m,className:"group block ui-checkbox",children:e.jsx("svg",{className:"stroke-white opacity-0 transition group-data-[checked]:opacity-100",viewBox:"0 0 14 14",fill:"none",height:15,children:e.jsx("path",{d:"M3 8L6 11L11 3.5",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx(t,{className:"cursor-pointer",children:"Checkbox With Transitoin"})]})})]})]})})},Ee=()=>{const[r,n]=s.useState(!1);return e.jsx("div",{children:e.jsxs(W,{children:[e.jsx("div",{className:"flex items-center justify-between mb-2",children:e.jsx("h4",{className:"text-lg font-semibold",children:"Render Props"})}),e.jsx("div",{className:"flex flex-col gap-3",children:e.jsx("div",{children:e.jsxs(a,{className:"flex gap-3",children:[e.jsx(i,{checked:r,onChange:n,as:s.Fragment,children:({checked:o,disabled:c})=>e.jsx("span",{className:y("group block h-[18px] w-[18px] rounded border border-bordergray dark:border-darkborder bg-white dark:bg-transparent data-[checked]:bg-primary dark:data-[checked]:bg-primary",!o&&"bg-white",o&&!c&&"bg-primary",o&&c&&"bg-gray-500",c&&"cursor-not-allowed opacity-50"),children:e.jsx("svg",{className:y("stroke-white",o?"opacity-100":"opacity-0"),viewBox:"0 0 14 14",fill:"none",height:15,children:e.jsx("path",{d:"M3 8L6 11L11 3.5",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})})})}),e.jsx(t,{children:"Each component also exposes information about its current state via render props that you can use to conditionally apply different styles or render different content."})]})})})]})})},Fe=()=>{const[r,n]=s.useState(!1),[o,c]=s.useState(!1),[p,m]=s.useState(!1);return e.jsx("div",{children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("div",{children:e.jsxs(a,{className:"flex items-center gap-3",children:[e.jsx(i,{checked:r,onChange:n,className:"group block ui-checkbox",children:e.jsx("svg",{className:"stroke-white opacity-0 transition group-data-[checked]:opacity-100",viewBox:"0 0 14 14",fill:"none",height:15,children:e.jsx("path",{d:"M3 8L6 11L11 3.5",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx(t,{className:"cursor-pointer",children:"Checkbox With Transitoin"})]})}),e.jsx("div",{children:e.jsxs(a,{className:"flex items-center gap-3",children:[e.jsx(i,{checked:o,onChange:c,className:"group block ui-checkbox",children:e.jsx("svg",{className:"stroke-white opacity-0 transition group-data-[checked]:opacity-100",viewBox:"0 0 14 14",fill:"none",height:15,children:e.jsx("path",{d:"M3 8L6 11L11 3.5",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx(t,{className:"cursor-pointer",children:"Checkbox With Transitoin"})]})}),e.jsx("div",{children:e.jsxs(a,{className:"flex items-center gap-3",children:[e.jsx(i,{checked:p,onChange:m,className:"group block ui-checkbox",children:e.jsx("svg",{className:"stroke-white opacity-0 transition group-data-[checked]:opacity-100",viewBox:"0 0 14 14",fill:"none",height:15,children:e.jsx("path",{d:"M3 8L6 11L11 3.5",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx(t,{className:"cursor-pointer",children:"Checkbox With Transitoin"})]})})]})})},Se=()=>e.jsx(x,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Transitions Checkbox"}),e.jsx(Fe,{})]})})}),Be=()=>{const[r,n]=s.useState(!1);return e.jsx("div",{children:e.jsxs("form",{action:"/accounts",method:"post",children:[e.jsxs(a,{className:"flex items-center gap-3",children:[e.jsx(i,{checked:r,onChange:n,name:"terms-of-service",className:"group block ui-checkbox",children:e.jsx("svg",{className:"stroke-white opacity-0 group-data-[checked]:opacity-100",viewBox:"0 0 14 14",fill:"none",height:15,children:e.jsx("path",{d:"M3 8L6 11L11 3.5",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx(t,{className:"cursor-pointer",children:"Agree to terms and conditions"})]}),e.jsxs("div",{className:"flex gap-3 mt-4",children:[e.jsx("button",{className:"ui-button bg-primary justify-center",children:"Submit"}),e.jsx("button",{className:"ui-button bg-error justify-center",children:"Cancel"})]})]})})},Me=()=>e.jsx(x,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"With HTML Forms"}),e.jsx(Be,{})]})})}),De=()=>e.jsx("div",{children:e.jsxs("form",{action:"/accounts",method:"post",children:[e.jsxs(a,{className:"flex items-center gap-3",children:[e.jsx(i,{defaultChecked:!0,name:"terms-of-service",className:"group block ui-checkbox",children:e.jsx("svg",{className:"stroke-white opacity-0 group-data-[checked]:opacity-100",viewBox:"0 0 14 14",fill:"none",children:e.jsx("path",{d:"M3 8L6 11L11 3.5",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx(t,{className:"cursor-pointer",children:"Agree to terms and conditions"})]}),e.jsxs("div",{className:"flex gap-3 mt-4",children:[e.jsx("button",{className:"ui-button bg-primary justify-center",children:"Submit"}),e.jsx("button",{className:"ui-button bg-error justify-center",children:"Cancel"})]})]})}),Te=()=>e.jsx(x,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Using as Uncontrolled"}),e.jsx(De,{})]})})}),$e=()=>{const[r,n]=s.useState(!1);return e.jsx("div",{children:e.jsx("div",{children:e.jsxs(a,{className:"flex gap-3",children:[e.jsx(i,{checked:r,onChange:n,className:"group block ui-checkbox",children:e.jsx("svg",{className:"stroke-white opacity-0 group-data-[checked]:opacity-100 rounded",viewBox:"0 0 14 14",fill:"none",height:15,children:e.jsx("path",{d:"M3 8L6 11L11 3.5",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsxs("div",{children:[e.jsx(t,{children:"Enable beta features"}),e.jsx(ue,{children:"This will give you early access to new features we're developing."})]})]})})})},Ue=()=>e.jsx(x,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"With Discription"}),e.jsx($e,{})]})})}),He=()=>{const[r,n]=s.useState(!1),[o,c]=s.useState(!1);return e.jsx("div",{children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("div",{children:e.jsxs(a,{className:"flex items-center gap-3",children:[e.jsx(i,{checked:r,onChange:n,className:"group block ui-checkbox",children:e.jsx("svg",{className:"stroke-white opacity-0 group-data-[checked]:opacity-100 rounded",viewBox:"0 0 14 14",fill:"none",height:15,children:e.jsx("path",{d:"M3 8L6 11L11 3.5",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx(t,{className:"cursor-pointer",children:"Checkbox With Label"})]})}),e.jsx("div",{children:e.jsxs(a,{className:"flex items-center gap-3",children:[e.jsx(i,{checked:o,onChange:c,className:"group block ui-checkbox",children:e.jsx("svg",{className:"stroke-white opacity-0 group-data-[checked]:opacity-100 rounded",viewBox:"0 0 14 14",fill:"none",height:15,children:e.jsx("path",{d:"M3 8L6 11L11 3.5",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx(t,{className:"cursor-pointer",children:"Checkbox With Label"})]})})]})})},Pe=()=>e.jsx(x,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Checkbox Label"}),e.jsx(He,{})]})})}),Re=[{to:"/",title:"Home"},{title:"Checkbox"}],br=()=>e.jsxs("div",{children:[e.jsx(ke,{title:"Checkbox",items:Re}),e.jsxs("div",{className:"grid grid-cols-12 gap-7",children:[e.jsxs("div",{className:"col-span-12",children:[e.jsx(Pe,{}),e.jsx(h,{children:J})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Ue,{}),e.jsx(h,{children:Ce})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(we,{}),e.jsx(h,{children:fe})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Me,{}),e.jsx(h,{children:Ne})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Te,{}),e.jsx(h,{children:Le})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Se,{}),e.jsx(h,{children:ve})]}),e.jsx("div",{className:"col-span-12",children:e.jsx(We,{})}),e.jsx("div",{className:"col-span-12",children:e.jsx(Ee,{})})]})]});export{br as default};
