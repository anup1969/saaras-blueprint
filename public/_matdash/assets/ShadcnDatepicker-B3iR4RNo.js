import{R as n,j as e,B as i,m as o}from"./index-Ct0UOXmm.js";import{C as c}from"./calendar-CJtmD-VY.js";import{P as m,a as d,b as l}from"./popover-B4UcNIaf.js";import{C as p}from"./calendar-DRreACkh.js";import{f as t}from"./format-DmHpw79j.js";import{C as x}from"./card-Ca2rFNYr.js";import{a as h}from"./addDays-DUX3p28w.js";import{C as a}from"./CodeDialog-CxWZFxDL.js";import{B as f}from"./BreadcrumbComp-CrB7aHeN.js";import"./createLucideIcon-BhlIJAXk.js";import"./chevron-right-H7UwKVHv.js";import"./chevron-down-C2qAVYfx.js";import"./en-US-D4gC_zRa.js";import"./constructFrom-rJN6zrQ_.js";import"./index-CDOj5QJd.js";import"./vsc-dark-plus-BFNuSAyr.js";import"./highlight-CR4RLcvi.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./CardBox-DRaXwASi.js";const j=()=>{const[r,s]=n.useState();return e.jsx(e.Fragment,{children:e.jsx("div",{className:"flex flex-wrap items-center gap-3 ",children:e.jsxs(m,{children:[e.jsx(d,{asChild:!0,children:e.jsxs(i,{variant:"outline",className:o("max-w-sm justify-start text-left font-normal group",!r&&"text-muted-foreground"),children:[e.jsx(p,{className:"mr-2 h-4 w-4 text-primary group-hover:text-white"}),r?t(r,"PPP"):e.jsx("span",{className:"text-primary group-hover:text-white",children:"Pick a date"})]})}),e.jsx(l,{className:"w-auto p-0",children:e.jsx(c,{mode:"single",selected:r,onSelect:s,initialFocus:!0})})]})})})},u=()=>e.jsx(e.Fragment,{children:e.jsx(x,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Basic Datepicker"}),e.jsx(j,{})]})})})}),g=`'use client'\r
\r
import Basicdatepicker from './code/BasicDatepickerCode'\r
import { Card } from 'src/components/ui/card'\r
\r
const BasicDatepicker = () => {\r
  return (\r
    <>\r
      <Card className='p-0'>\r
        <div>\r
          <div className='p-6'>\r
            <h4 className='text-lg font-semibold mb-4'>Basic Datepicker</h4>\r
            <Basicdatepicker />\r
          </div>\r
        </div>\r
      </Card>\r
    </>\r
  )\r
}\r
\r
export default BasicDatepicker\r
`,C=()=>{const[r,s]=n.useState({from:new Date(2022,0,20),to:h(new Date(2022,0,20),20)});return e.jsx(e.Fragment,{children:e.jsx("div",{className:"flex flex-wrap items-center gap-3  max-w-sm",children:e.jsxs(m,{children:[e.jsx(d,{asChild:!0,children:e.jsxs(i,{id:"date",variant:"outline",className:o("w-full justify-start text-left font-normal",!r&&"text-muted-foreground"),children:[e.jsx(p,{}),r!=null&&r.from?r.to?e.jsxs(e.Fragment,{children:[t(r.from,"LLL dd, y")," -"," ",t(r.to,"LLL dd, y")]}):t(r.from,"LLL dd, y"):e.jsx("span",{children:"Pick a date"})]})}),e.jsx(l,{className:"w-full p-0",align:"start",children:e.jsx(c,{initialFocus:!0,mode:"range",defaultMonth:r==null?void 0:r.from,selected:r,onSelect:s,numberOfMonths:2})})]})})})},k=()=>e.jsx(e.Fragment,{children:e.jsx(x,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Date Range Picker"}),e.jsx(C,{})]})})})}),v=`'use client'\r
\r
import { Card } from 'src/components/ui/card'\r
import Rangedatepicker from './code/DateRangePickerCode'\r
\r
const DateRangePicker = () => {\r
  return (\r
    <>\r
      <Card className='p-0'>\r
        <div>\r
          <div className='p-6'>\r
            <h4 className='text-lg font-semibold mb-4'>Date Range Picker</h4>\r
            <Rangedatepicker />\r
          </div>\r
        </div>\r
      </Card>\r
    </>\r
  )\r
}\r
\r
export default DateRangePicker\r
`,D=[{to:"/",title:"Home"},{title:"Datepicker"}],K=()=>e.jsxs(e.Fragment,{children:[e.jsx(f,{title:"Datepicker",items:D}),e.jsxs("div",{className:"flex flex-col gap-7",children:[e.jsxs("div",{children:[e.jsx(u,{}),e.jsx(a,{children:g})]}),e.jsxs("div",{children:[e.jsx(k,{}),e.jsx(a,{children:v})]})]})]});export{K as default};
