import{r as a,R as p,j as e}from"./index-Ct0UOXmm.js";import{C as w}from"./CodeDialog-CxWZFxDL.js";import{$ as te,a as ne}from"./useFocusRing-BwtZ2rwJ.js";import{w as se}from"./use-active-press-DStzcK9h.js";import{l as re,b as de}from"./use-default-value-D3Ybj_xn.js";import{Y as ie,K as L,p as ce,o as y,a as le,V as oe}from"./render-DMwXrKoH.js";import{e as he}from"./use-resolve-button-type-yd4cTZn6.js";import{y as ue}from"./use-sync-refs-CLSd0TG6.js";import{a as ge}from"./disabled-D8pPKoLq.js";import{g as be,j as me,W as x}from"./field-MozAsfUL.js";import{Z as S,V as we,u as xe,N as Se}from"./label-CVnTvbsT.js";import{s as pe}from"./bugs-BJ7ScNGK.js";import{m as ke}from"./dom-BlW_0b_t.js";import{M as fe,H as Ne,w as je}from"./description-CcSXqif1.js";import{o as D}from"./keyboard-C1Wiwm26.js";import{C as k}from"./card-Ca2rFNYr.js";import{B as Ee}from"./BreadcrumbComp-CrB7aHeN.js";import"./index-CDOj5QJd.js";import"./vsc-dark-plus-BFNuSAyr.js";import"./highlight-CR4RLcvi.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./owner-CYR0F7kW.js";import"./hidden-CbXc7YDF.js";import"./CardBox-DRaXwASi.js";import"./chevron-right-H7UwKVHv.js";import"./createLucideIcon-BhlIJAXk.js";let v=a.createContext(null);v.displayName="GroupContext";let ye=a.Fragment;function Ce(n){var d;let[s,i]=a.useState(null),[l,o]=we(),[h,r]=Ne(),c=a.useMemo(()=>({switch:s,setSwitch:i}),[s,i]),u={},b=n,g=L();return p.createElement(r,{name:"Switch.Description",value:h},p.createElement(o,{name:"Switch.Label",value:l,props:{htmlFor:(d=c.switch)==null?void 0:d.id,onClick(j){s&&(ke(j.currentTarget)&&j.preventDefault(),s.click(),s.focus({preventScroll:!0}))}}},p.createElement(v.Provider,{value:c},g({ourProps:u,theirProps:b,slot:{},defaultTag:ye,name:"Switch.Group"}))))}let ve="button";function ze(n,d){var s;let i=a.useId(),l=xe(),o=ge(),{id:h=l||`headlessui-switch-${i}`,disabled:r=o||!1,checked:c,defaultChecked:u,onChange:b,name:g,value:j,form:R,autoFocus:C=!1,...T}=n,z=a.useContext(v),[W,B]=a.useState(null),P=a.useRef(null),A=ue(P,d,z===null?null:z.setSwitch,B),f=re(u),[E,N]=de(c,b,f??!1),O=ce(),[G,$]=a.useState(!1),F=y(()=>{$(!0),N==null||N(!E),O.nextFrame(()=>{$(!1)})}),H=y(m=>{if(pe(m.currentTarget))return m.preventDefault();m.preventDefault(),F()}),I=y(m=>{m.key===D.Space?(m.preventDefault(),F()):m.key===D.Enter&&be(m.currentTarget)}),V=y(m=>m.preventDefault()),K=Se(),M=je(),{isFocusVisible:U,focusProps:q}=te({autoFocus:C}),{isHovered:J,hoverProps:X}=ne({isDisabled:r}),{pressed:Y,pressProps:Z}=se({disabled:r}),_=le({checked:E,disabled:r,hover:J,focus:U,active:Y,autofocus:C,changing:G}),Q=oe({id:h,ref:A,role:"switch",type:he(n,W),tabIndex:n.tabIndex===-1?0:(s=n.tabIndex)!=null?s:0,"aria-checked":E,"aria-labelledby":K,"aria-describedby":M,disabled:r||void 0,autoFocus:C,onClick:H,onKeyUp:I,onKeyPress:V},q,X,Z),ee=a.useCallback(()=>{if(f!==void 0)return N==null?void 0:N(f)},[N,f]),ae=L();return p.createElement(p.Fragment,null,g!=null&&p.createElement(me,{disabled:r,data:{[g]:j||"on"},overrides:{type:"checkbox",checked:E},form:R,onReset:ee}),ae({ourProps:Q,theirProps:T,slot:_,defaultTag:ve,name:"Switch"}))}let $e=ie(ze),Fe=Ce,De=S,Le=fe,t=Object.assign($e,{Group:Fe,Label:De,Description:Le});const Re=`import { useState } from 'react'\r
import { Switch } from '@headlessui/react'\r
\r
const BasicSwitchCode = () => {\r
  const [enabledSwith1, setEnabledSwitch1] = useState(false)\r
  const [enabledSwith2, setEnabledSwitch2] = useState(false)\r
  const [enabledSwith3, setEnabledSwitch3] = useState(false)\r
  const [enabledSwith4, setEnabledSwitch4] = useState(false)\r
  const [enabledSwith5, setEnabledSwitch5] = useState(false)\r
  const [enabledSwith6, setEnabledSwitch6] = useState(false)\r
\r
  return (\r
    <div>\r
      <div className='flex flex-wrap gap-3'>\r
        <Switch\r
          checked={enabledSwith1}\r
          onChange={setEnabledSwitch1}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-primary'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith2}\r
          onChange={setEnabledSwitch2}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-secondary'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith3}\r
          onChange={setEnabledSwitch3}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-success'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith4}\r
          onChange={setEnabledSwitch4}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-error'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith5}\r
          onChange={setEnabledSwitch5}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-warning'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith6}\r
          onChange={setEnabledSwitch6}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-info'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default BasicSwitchCode\r
`,Te=`import { useState } from 'react'\r
import { Switch } from '@headlessui/react'\r
\r
const DefaultOnCode = () => {\r
  const [enabledSwith1, setEnabledSwitch1] = useState(true)\r
  const [enabledSwith2, setEnabledSwitch2] = useState(true)\r
  const [enabledSwith3, setEnabledSwitch3] = useState(true)\r
  const [enabledSwith4, setEnabledSwitch4] = useState(true)\r
  const [enabledSwith5, setEnabledSwitch5] = useState(true)\r
  const [enabledSwith6, setEnabledSwitch6] = useState(true)\r
\r
  return (\r
    <div>\r
      <div className='flex flex-wrap gap-3'>\r
        <Switch\r
          checked={enabledSwith1}\r
          onChange={setEnabledSwitch1}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-primary'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith2}\r
          onChange={setEnabledSwitch2}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-secondary'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith3}\r
          onChange={setEnabledSwitch3}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-success'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith4}\r
          onChange={setEnabledSwitch4}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-error'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith5}\r
          onChange={setEnabledSwitch5}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-warning'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith6}\r
          onChange={setEnabledSwitch6}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-info'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default DefaultOnCode\r
`,We=`import { useState } from 'react'\r
import { Switch, Field } from '@headlessui/react'\r
\r
const DisableSwitchesCode = () => {\r
  const [enabledSwith1, setEnabledSwitch1] = useState(true)\r
  const [enabledSwith2, setEnabledSwitch2] = useState(true)\r
  const [enabledSwith3, setEnabledSwitch3] = useState(true)\r
  const [enabledSwith4, setEnabledSwitch4] = useState(true)\r
  const [enabledSwith5, setEnabledSwitch5] = useState(true)\r
  const [enabledSwith6, setEnabledSwitch6] = useState(true)\r
\r
  return (\r
    <div>\r
      <Field className='flex flex-wrap gap-3' disabled>\r
        <Switch\r
          checked={enabledSwith1}\r
          onChange={setEnabledSwitch1}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 transition data-[checked]:bg-primary'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith2}\r
          onChange={setEnabledSwitch2}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 transition data-[checked]:bg-secondary'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith3}\r
          onChange={setEnabledSwitch3}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 transition data-[checked]:bg-success'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith4}\r
          onChange={setEnabledSwitch4}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 transition data-[checked]:bg-error'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith5}\r
          onChange={setEnabledSwitch5}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 transition data-[checked]:bg-warning'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith6}\r
          onChange={setEnabledSwitch6}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 transition data-[checked]:bg-info'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
      </Field>\r
    </div>\r
  )\r
}\r
\r
export default DisableSwitchesCode\r
`,Be=`import { useState } from 'react'\r
import { Switch } from '@headlessui/react'\r
\r
const RenderAsElements = () => {\r
  const [enabledSwith1, setEnabledSwitch1] = useState(false)\r
  const [enabledSwith2, setEnabledSwitch2] = useState(false)\r
  const [enabledSwith3, setEnabledSwitch3] = useState(false)\r
  const [enabledSwith4, setEnabledSwitch4] = useState(false)\r
  const [enabledSwith5, setEnabledSwitch5] = useState(false)\r
  const [enabledSwith6, setEnabledSwitch6] = useState(false)\r
\r
  return (\r
    <div>\r
      <div className='flex flex-wrap gap-3'>\r
        <Switch\r
          as='div'\r
          checked={enabledSwith1}\r
          onChange={setEnabledSwitch1}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-primary'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          as='div'\r
          checked={enabledSwith2}\r
          onChange={setEnabledSwitch2}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-secondary'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          as='div'\r
          checked={enabledSwith3}\r
          onChange={setEnabledSwitch3}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-success'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          as='div'\r
          checked={enabledSwith4}\r
          onChange={setEnabledSwitch4}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-error'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          as='div'\r
          checked={enabledSwith5}\r
          onChange={setEnabledSwitch5}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-warning'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          as='div'\r
          checked={enabledSwith6}\r
          onChange={setEnabledSwitch6}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-info'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
        </Switch>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default RenderAsElements\r
`,Pe=`import { useState } from 'react'\r
import { Switch, Field, Label } from '@headlessui/react'\r
\r
const WithLabelSwitchCode = () => {\r
  const [enabledSwith1, setEnabledSwitch1] = useState(true)\r
  const [enabledSwith2, setEnabledSwitch2] = useState(true)\r
  const [enabledSwith3, setEnabledSwitch3] = useState(true)\r
  const [enabledSwith4, setEnabledSwitch4] = useState(true)\r
  const [enabledSwith5, setEnabledSwitch5] = useState(true)\r
\r
  return (\r
    <div>\r
      <div className='flex flex-wrap gap-3'>\r
        <Field>\r
          <Label className='block text-ld mb-2'>Enable</Label>\r
          <Switch\r
            checked={enabledSwith1}\r
            onChange={setEnabledSwitch1}\r
            className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-primary'>\r
            <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
          </Switch>\r
        </Field>\r
        <Field>\r
          <Label className='block text-ld mb-2'>Enable</Label>\r
          <Switch\r
            checked={enabledSwith2}\r
            onChange={setEnabledSwitch2}\r
            className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-secondary'>\r
            <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
          </Switch>\r
        </Field>\r
        <Field>\r
          <Label className='block text-ld mb-2'>Enable</Label>\r
          <Switch\r
            checked={enabledSwith3}\r
            onChange={setEnabledSwitch3}\r
            className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-error'>\r
            <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
          </Switch>\r
        </Field>\r
        <Field>\r
          <Label className='block text-ld mb-2'>Enable</Label>\r
          <Switch\r
            checked={enabledSwith4}\r
            onChange={setEnabledSwitch4}\r
            className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-warning'>\r
            <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
          </Switch>\r
        </Field>\r
        <Field>\r
          <Label className='block text-ld mb-2'>Enable</Label>\r
          <Switch\r
            checked={enabledSwith5}\r
            onChange={setEnabledSwitch5}\r
            className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-info'>\r
            <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />\r
          </Switch>\r
        </Field>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default WithLabelSwitchCode\r
`,Ae=`import { useState } from 'react'\r
import { Switch } from '@headlessui/react'\r
\r
const WithTransitionCode = () => {\r
  const [enabledSwith1, setEnabledSwitch1] = useState(true)\r
  const [enabledSwith2, setEnabledSwitch2] = useState(true)\r
  const [enabledSwith3, setEnabledSwitch3] = useState(true)\r
  const [enabledSwith4, setEnabledSwitch4] = useState(true)\r
  const [enabledSwith5, setEnabledSwitch5] = useState(true)\r
  const [enabledSwith6, setEnabledSwitch6] = useState(true)\r
\r
  return (\r
    <div>\r
      <div className='flex flex-wrap gap-3'>\r
        <Switch\r
          checked={enabledSwith1}\r
          onChange={setEnabledSwitch1}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition duration-700 data-[checked]:bg-primary'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition duration-700 group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith2}\r
          onChange={setEnabledSwitch2}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition duration-700 data-[checked]:bg-secondary'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition duration-700 group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith3}\r
          onChange={setEnabledSwitch3}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition duration-700 data-[checked]:bg-success'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition duration-700 group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith4}\r
          onChange={setEnabledSwitch4}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition duration-700 data-[checked]:bg-error'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition duration-700 group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith5}\r
          onChange={setEnabledSwitch5}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition duration-700 data-[checked]:bg-warning'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition duration-700 group-data-[checked]:translate-x-6' />\r
        </Switch>\r
        <Switch\r
          checked={enabledSwith6}\r
          onChange={setEnabledSwitch6}\r
          className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition duration-700 data-[checked]:bg-info'>\r
          <span className='size-4 translate-x-1 rounded-md bg-white transition duration-700 group-data-[checked]:translate-x-6' />\r
        </Switch>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default WithTransitionCode\r
`,Oe=()=>{const[n,d]=a.useState(!1),[s,i]=a.useState(!1),[l,o]=a.useState(!1),[h,r]=a.useState(!1),[c,u]=a.useState(!1),[b,g]=a.useState(!1);return e.jsx("div",{children:e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsx(t,{checked:n,onChange:d,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-primary",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:s,onChange:i,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-secondary",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:l,onChange:o,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-success",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:h,onChange:r,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-error",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:c,onChange:u,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-warning",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:b,onChange:g,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-info",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})})]})})},Ge=()=>e.jsx(k,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Basic Switches"}),e.jsx(Oe,{})]})})}),He=()=>{const[n,d]=a.useState(!0),[s,i]=a.useState(!0),[l,o]=a.useState(!0),[h,r]=a.useState(!0),[c,u]=a.useState(!0),[b,g]=a.useState(!0);return e.jsx("div",{children:e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsx(t,{checked:n,onChange:d,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-primary",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:s,onChange:i,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-secondary",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:l,onChange:o,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-success",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:h,onChange:r,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-error",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:c,onChange:u,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-warning",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:b,onChange:g,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-info",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})})]})})},Ie=()=>e.jsx(k,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Default On Switches"}),e.jsx(He,{})]})})}),Ve=()=>{const[n,d]=a.useState(!0),[s,i]=a.useState(!0),[l,o]=a.useState(!0),[h,r]=a.useState(!0),[c,u]=a.useState(!0),[b,g]=a.useState(!0);return e.jsx("div",{children:e.jsxs(x,{className:"flex flex-wrap gap-3",disabled:!0,children:[e.jsx(t,{checked:n,onChange:d,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 transition data-[checked]:bg-primary",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:s,onChange:i,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 transition data-[checked]:bg-secondary",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:l,onChange:o,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 transition data-[checked]:bg-success",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:h,onChange:r,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 transition data-[checked]:bg-error",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:c,onChange:u,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 transition data-[checked]:bg-warning",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:b,onChange:g,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 transition data-[checked]:bg-info",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})})]})})},Ke=()=>e.jsx(k,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Disabled Switches"}),e.jsx(Ve,{})]})})}),Me=()=>{const[n,d]=a.useState(!1),[s,i]=a.useState(!1),[l,o]=a.useState(!1),[h,r]=a.useState(!1),[c,u]=a.useState(!1),[b,g]=a.useState(!1);return e.jsx("div",{children:e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsx(t,{as:"div",checked:n,onChange:d,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-primary",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{as:"div",checked:s,onChange:i,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-secondary",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{as:"div",checked:l,onChange:o,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-success",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{as:"div",checked:h,onChange:r,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-error",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{as:"div",checked:c,onChange:u,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-warning",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})}),e.jsx(t,{as:"div",checked:b,onChange:g,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-info",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})})]})})},Ue=()=>e.jsx(k,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Rendering as Element"}),e.jsx(Me,{})]})})}),qe=()=>{const[n,d]=a.useState(!0),[s,i]=a.useState(!0),[l,o]=a.useState(!0),[h,r]=a.useState(!0),[c,u]=a.useState(!0);return e.jsx("div",{children:e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsxs(x,{children:[e.jsx(S,{className:"block text-ld mb-2",children:"Enable"}),e.jsx(t,{checked:n,onChange:d,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-primary",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})})]}),e.jsxs(x,{children:[e.jsx(S,{className:"block text-ld mb-2",children:"Enable"}),e.jsx(t,{checked:s,onChange:i,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-secondary",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})})]}),e.jsxs(x,{children:[e.jsx(S,{className:"block text-ld mb-2",children:"Enable"}),e.jsx(t,{checked:l,onChange:o,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-error",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})})]}),e.jsxs(x,{children:[e.jsx(S,{className:"block text-ld mb-2",children:"Enable"}),e.jsx(t,{checked:h,onChange:r,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-warning",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})})]}),e.jsxs(x,{children:[e.jsx(S,{className:"block text-ld mb-2",children:"Enable"}),e.jsx(t,{checked:c,onChange:u,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-info",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6"})})]})]})})},Je=()=>e.jsx(k,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Adding a Label"}),e.jsx(qe,{})]})})}),Xe=()=>{const[n,d]=a.useState(!0),[s,i]=a.useState(!0),[l,o]=a.useState(!0),[h,r]=a.useState(!0),[c,u]=a.useState(!0),[b,g]=a.useState(!0);return e.jsx("div",{children:e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsx(t,{checked:n,onChange:d,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition duration-700 data-[checked]:bg-primary",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition duration-700 group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:s,onChange:i,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition duration-700 data-[checked]:bg-secondary",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition duration-700 group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:l,onChange:o,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition duration-700 data-[checked]:bg-success",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition duration-700 group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:h,onChange:r,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition duration-700 data-[checked]:bg-error",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition duration-700 group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:c,onChange:u,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition duration-700 data-[checked]:bg-warning",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition duration-700 group-data-[checked]:translate-x-6"})}),e.jsx(t,{checked:b,onChange:g,className:"group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition duration-700 data-[checked]:bg-info",children:e.jsx("span",{className:"size-4 translate-x-1 rounded-md bg-white transition duration-700 group-data-[checked]:translate-x-6"})})]})})},Ye=()=>e.jsx(k,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Adding Transitions"}),e.jsx(Xe,{})]})})}),Ca=()=>{const n=[{to:"/",title:"Home"},{title:"Switch"}];return e.jsxs(e.Fragment,{children:[e.jsx(Ee,{title:"Switch",items:n}),e.jsxs("div",{className:"grid grid-cols-12 gap-7",children:[e.jsxs("div",{className:"col-span-12",children:[e.jsx(Ge,{}),e.jsx(w,{children:Re})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Ie,{}),e.jsx(w,{children:Te})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Ke,{}),e.jsx(w,{children:We})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Je,{}),e.jsx(w,{children:Pe})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Ye,{}),e.jsx(w,{children:Ae})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Ue,{}),e.jsx(w,{children:Be})]})]})]})};export{Ca as default};
