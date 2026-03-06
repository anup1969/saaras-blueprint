import{j as s,R as p}from"./index-BoNr0JGX.js";import{C as g,a as d,b as i,c as o,d as r,e as n,f as u,U as l,g as e,h as B}from"./command-Bw_oEY8-.js";import{C as f}from"./calendar-0zjJ907C.js";import{S as c,C as m,a as t,b as x}from"./smile-CMy0ITwS.js";import{C as N}from"./card-vkvqasdW.js";import{d as S}from"./dialog-D_e__PsD.js";import{C}from"./CodeDialog-_oyCzuNE.js";import{B as D}from"./BreadcrumbComp-Chbekl54.js";import"./createLucideIcon-C_6kNXZz.js";import"./index-ZNjr_w1p.js";import"./vsc-dark-plus-DFfyWk_Y.js";import"./highlight-BsgCmQTy.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./CardBox-CQoLG162.js";import"./chevron-right-DKLkMv9e.js";const y=()=>s.jsx(s.Fragment,{children:s.jsxs(g,{className:"rounded-lg border border-ld mt-4",children:[s.jsx(d,{placeholder:"Type a command or search..."}),s.jsxs(i,{children:[s.jsx(o,{children:"No results found."}),s.jsxs(r,{heading:"Suggestions",children:[s.jsxs(n,{children:[s.jsx(f,{}),s.jsx("span",{children:"Calendar"})]}),s.jsxs(n,{children:[s.jsx(c,{}),s.jsx("span",{children:"Search Emoji"})]}),s.jsxs(n,{disabled:!0,children:[s.jsx(m,{}),s.jsx("span",{children:"Calculator"})]})]}),s.jsx(u,{}),s.jsxs(r,{heading:"Settings",children:[s.jsxs(n,{children:[s.jsx(l,{}),s.jsx("span",{children:"Profile"}),s.jsx(e,{children:"⌘P"})]}),s.jsxs(n,{children:[s.jsx(t,{}),s.jsx("span",{children:"Billing"}),s.jsx(e,{children:"⌘B"})]}),s.jsxs(n,{children:[s.jsx(x,{}),s.jsx("span",{children:"Settings"}),s.jsx(e,{children:"⌘S"})]})]})]})]})}),E=()=>s.jsx(N,{className:"p-0",children:s.jsx("div",{children:s.jsxs("div",{className:"p-6",children:[s.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Basic Command"}),s.jsx(y,{})]})})}),P=`'use client'\r
\r
import Basiccommand from './code/BasicCommandCode'\r
import { Card } from 'src/components/ui/card'\r
\r
const BasicCommand = () => {\r
  return (\r
    <Card className='p-0'>\r
      <div>\r
        <div className='p-6'>\r
          <h4 className='text-lg font-semibold mb-4'>Basic Command</h4>\r
          <Basiccommand />\r
        </div>\r
      </div>\r
    </Card>\r
  )\r
}\r
\r
export default BasicCommand\r
`,k=()=>{const[b,j]=p.useState(!1);return p.useEffect(()=>{const h=a=>{a.key==="j"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),j(v=>!v))};return document.addEventListener("keydown",h),()=>document.removeEventListener("keydown",h)},[]),s.jsxs(s.Fragment,{children:[s.jsxs("p",{className:"text-sm text-ld flex gap-2 mt-4",children:["Press",s.jsxs("kbd",{className:"pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted dark:bg-darkmuted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100",children:[s.jsx("span",{className:"text-xs",children:"⌘"}),"J"]})]}),s.jsxs(g,{className:"rounded-lg border border-ld mt-4",children:[s.jsx(d,{className:"border-none",placeholder:"Type a command or search..."}),s.jsxs(i,{children:[s.jsx(o,{children:"No results found."}),s.jsxs(r,{heading:"Settings",children:[s.jsxs(n,{children:[s.jsx(c,{}),s.jsx("span",{children:"Search Emoji"})]}),s.jsxs(n,{disabled:!0,children:[s.jsx(m,{}),s.jsx("span",{children:"Calculator"})]}),s.jsxs(n,{children:[s.jsx(l,{}),s.jsx("span",{children:"Profile"}),s.jsx(e,{children:"⌘P"})]}),s.jsxs(n,{children:[s.jsx(t,{}),s.jsx("span",{children:"Billing"}),s.jsx(e,{children:"⌘B"})]}),s.jsxs(n,{children:[s.jsx(x,{}),s.jsx("span",{children:"Settings"}),s.jsx(e,{children:"⌘S"})]})]})]})]}),s.jsxs(B,{open:b,onOpenChange:j,children:[s.jsx(S,{className:"sr-only",children:"Command Dialog"})," ",s.jsx(d,{placeholder:"Type a command or search..."}),s.jsxs(i,{children:[s.jsx(o,{children:"No results found."}),s.jsxs(r,{heading:"Suggestions",children:[s.jsxs(n,{children:[s.jsx(f,{}),s.jsx("span",{children:"Calendar"})]}),s.jsxs(n,{children:[s.jsx(c,{}),s.jsx("span",{children:"Search Emoji"})]}),s.jsxs(n,{children:[s.jsx(m,{}),s.jsx("span",{children:"Calculator"})]})]}),s.jsx(u,{}),s.jsxs(r,{heading:"Settings",children:[s.jsxs(n,{children:[s.jsx(l,{}),s.jsx("span",{children:"Profile"}),s.jsx(e,{children:"⌘P"})]}),s.jsxs(n,{children:[s.jsx(t,{}),s.jsx("span",{children:"Billing"}),s.jsx(e,{children:"⌘B"})]}),s.jsxs(n,{children:[s.jsx(x,{}),s.jsx("span",{children:"Settings"}),s.jsx(e,{children:"⌘S"})]})]})]})]})]})},T=()=>s.jsx(s.Fragment,{children:s.jsx(N,{className:"p-0",children:s.jsx("div",{children:s.jsxs("div",{className:"p-6",children:[s.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Basic Command"}),s.jsx(k,{})]})})})}),w=`'use client'\r
\r
import { Card } from 'src/components/ui/card'\r
import Dialogcommand from './code/DialogCommandCode'\r
\r
const DialogCommand = () => {\r
  return (\r
    <>\r
      <Card className='p-0'>\r
        <div>\r
          <div className='p-6'>\r
            <h4 className='text-lg font-semibold mb-4'>Basic Command</h4>\r
            <Dialogcommand />\r
          </div>\r
        </div>\r
      </Card>\r
    </>\r
  )\r
}\r
\r
export default DialogCommand\r
`,F=[{to:"/",title:"Home"},{title:"Command"}],Y=()=>s.jsxs("div",{children:[s.jsx(D,{title:"Command",items:F}),s.jsxs("div",{className:"flex flex-col gap-7",children:[s.jsxs("div",{children:[s.jsx(E,{}),s.jsx(C,{children:P})]}),s.jsxs("div",{children:[s.jsx(T,{}),s.jsx(C,{children:w})]})]})]});export{Y as default};
