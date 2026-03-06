import{r as i,j as n,a1 as l,I as m}from"./index-hJ2SD4IE.js";import{C as s}from"./CodeDialog-BfgoSlBj.js";import{K as a,O as d}from"./transition-BIOkyELt.js";import{C as o}from"./card-lwgsVE9g.js";import{L as c}from"./button-B__1t1Uk.js";import{B as u}from"./BreadcrumbComp-O0ZCyfoZ.js";import"./index-u1GrS9Dt.js";import"./vsc-dark-plus-BS5XCmWA.js";import"./highlight-C_eLAOnJ.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./render-D4HeI6Nr.js";import"./use-is-mounted-CESGucCS.js";import"./use-sync-refs-DDif7ltm.js";import"./open-closed-mLyGyCh_.js";import"./useFocusRing-BV3_HsUU.js";import"./use-active-press-DRsr-MUW.js";import"./owner-Bbldmi17.js";import"./disabled-CuDhUv8O.js";import"./CardBox-B317o365.js";import"./chevron-right-Dqa42BwH.js";import"./createLucideIcon-sKS6wsf3.js";const p=`import { useState } from 'react'\r
import { Transition } from '@headlessui/react'\r
\r
const BasicTransactionCode = () => {\r
  const [open, setOpen] = useState(false)\r
\r
  return (\r
    <div>\r
      <button\r
        onClick={() => setOpen((open) => !open)}\r
        className='ui-button bg-primary justify-center'>\r
        Toggle Transition\r
      </button>\r
      <Transition show={open}>\r
        <div className='transition duration-300 ease-in data-[closed]:opacity-0 bg-lightgray dark:bg-dark rounded-sm shadow-md dark:shadow-dark-md p-4 w-72 '>\r
          I will fade in and out\r
        </div>\r
      </Transition>\r
    </div>\r
  )\r
}\r
\r
export default BasicTransactionCode\r
`,h=`import { useState } from 'react'\r
import { Button, Transition } from '@headlessui/react'\r
import { Icon } from '@iconify/react'\r
import clsx from 'clsx'\r
\r
const ClickTransitionCode = () => {\r
  let [isShowing, setIsShowing] = useState(true)\r
\r
  return (\r
    <div>\r
      <div className='flex flex-col items-center'>\r
        <div className='size-[6.25rem]'>\r
          <Transition show={isShowing}>\r
            <div\r
              className={clsx(\r
                'size-full rounded-xl bg-primary shadow-lg transition duration-400',\r
                'data-[closed]:scale-50 data-[closed]:rotate-[-120deg] data-[closed]:opacity-0',\r
                'data-[leave]:duration-200 data-[leave]:ease-in-out',\r
                'data-[leave]:data-[closed]:scale-95 data-[leave]:data-[closed]:rotate-[0deg]'\r
              )}\r
            />\r
          </Transition>\r
        </div>\r
\r
        <Button\r
          onClick={() => {\r
            setIsShowing(false)\r
            setTimeout(() => setIsShowing(true), 500)\r
          }}\r
          className=' transition data-[hover]:scale-105 ui-button justify-center bg-secondary gap-3 mt-4'>\r
          <Icon icon='solar:refresh-bold' height={20} />\r
          <span>Click to transition</span>\r
        </Button>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default ClickTransitionCode\r
`,x=`import { useState } from 'react'\r
import { Transition, TransitionChild } from '@headlessui/react'\r
\r
const CoordinationCode = () => {\r
  const [open, setOpen] = useState(false)\r
\r
  return (\r
    <div>\r
      <button\r
        onClick={() => setOpen(true)}\r
        className='ui-button bg-success justify-center'>\r
        Coordinating Transition\r
      </button>\r
      <Transition show={open}>\r
        {/* Backdrop */}\r
        <TransitionChild>\r
          <div\r
            className='fixed inset-0 bg-black/30 transition duration-300 data-[closed]:opacity-0'\r
            onClick={() => setOpen(false)}\r
          />\r
        </TransitionChild>\r
\r
        {/* Slide-in sidebar */}\r
        <TransitionChild>\r
          <div className='fixed inset-y-0 z-[50] left-0 w-80 bg-white dark:bg-dark transition duration-300 data-[closed]:-translate-x-full p-4'>\r
            <h3 className='text-lg mb-2'>This Is Sidebar</h3>\r
            <p>\r
              Lorem Ipsum is simply dummy text of the printing and typesetting\r
              industry. Lorem Ipsum has been the industry's standard dummy text\r
              ever since the 1500s, when an unknown printer took a galley of\r
              type and scrambled it to make a type specimen book. It has\r
              survived not only five centuries, but also the leap into\r
              electronic typesetting, remaining essentially unchanged.\r
            </p>\r
          </div>\r
        </TransitionChild>\r
      </Transition>\r
    </div>\r
  )\r
}\r
\r
export default CoordinationCode\r
`,v=`import { useState } from 'react'\r
import { Transition } from '@headlessui/react'\r
import clsx from 'clsx'\r
\r
const EnterLeaveTransitionCode = () => {\r
  const [open, setOpen] = useState(false)\r
\r
  return (\r
    <div>\r
      <div className='relative'>\r
        <button\r
          onClick={() => setOpen((open) => !open)}\r
          className='ui-button bg-secondary justify-center'>\r
          Enter Leave Transition\r
        </button>\r
        <Transition show={open}>\r
          <div\r
            className={clsx([\r
              // Base styles\r
              'absolute transition ease-in-out bg-white dark:bg-dark rounded-sm shadow-md dark:shadow-dark-md p-4 w-72 mt-1',\r
              // Shared closed styles\r
              'data-[closed]:opacity-0 ',\r
              // Entering styles\r
              'data-[enter]:duration-100 data-[enter]:data-[closed]:-translate-x-full',\r
              // Leaving styles\r
              'data-[leave]:duration-300 data-[leave]:data-[closed]:translate-x-full',\r
            ])}>\r
            I will enter from the left and leave to the right\r
          </div>\r
        </Transition>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default EnterLeaveTransitionCode\r
`,g=`import { useState } from 'react'\r
import { Transition, Button } from '@headlessui/react'\r
\r
const IntialTransitionCode = () => {\r
  const [open, setOpen] = useState(true)\r
\r
  return (\r
    <div>\r
      <div className='flex flex-col items-center'>\r
        <Transition show={open} appear={true}>\r
          <div className='transition duration-300 ease-in data-[closed]:opacity-0 bg-lightgray dark:bg-dark rounded-sm shadow-md dark:shadow-dark-md p-4 w-72'>\r
            I will fade in on initial render Lorem Ipsum is simply dummy text of\r
            the printing and typesetting industry.\r
          </div>\r
        </Transition>\r
        <Button\r
          onClick={() => setOpen((open) => !open)}\r
          className='transition data-[hover]:scale-105 ui-button justify-center bg-info gap-3 mt-5  '>\r
          On Intial Transition\r
        </Button>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default IntialTransitionCode\r
`,f=()=>{const[t,e]=i.useState(!1);return n.jsxs("div",{children:[n.jsx("button",{onClick:()=>e(r=>!r),className:"ui-button bg-primary justify-center",children:"Toggle Transition"}),n.jsx(a,{show:t,children:n.jsx("div",{className:"transition duration-300 ease-in data-[closed]:opacity-0 bg-lightgray dark:bg-dark rounded-sm shadow-md dark:shadow-dark-md p-4 w-72 ",children:"I will fade in and out"})})]})},j=()=>n.jsx("div",{children:n.jsx(o,{className:"p-0",children:n.jsx("div",{children:n.jsxs("div",{className:"p-6",children:[n.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Basic Transition"}),n.jsx(f,{})]})})})}),b=()=>{let[t,e]=i.useState(!0);return n.jsx("div",{children:n.jsxs("div",{className:"flex flex-col items-center",children:[n.jsx("div",{className:"size-[6.25rem]",children:n.jsx(a,{show:t,children:n.jsx("div",{className:l("size-full rounded-xl bg-primary shadow-lg transition duration-400","data-[closed]:scale-50 data-[closed]:rotate-[-120deg] data-[closed]:opacity-0","data-[leave]:duration-200 data-[leave]:ease-in-out","data-[leave]:data-[closed]:scale-95 data-[leave]:data-[closed]:rotate-[0deg]")})})}),n.jsxs(c,{onClick:()=>{e(!1),setTimeout(()=>e(!0),500)},className:" transition data-[hover]:scale-105 ui-button justify-center bg-secondary gap-3 mt-4",children:[n.jsx(m,{icon:"solar:refresh-bold",height:20}),n.jsx("span",{children:"Click to transition"})]})]})})},y=()=>n.jsx("div",{children:n.jsx(o,{className:"p-0",children:n.jsx("div",{children:n.jsxs("div",{className:"p-6",children:[n.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Click To Transition"}),n.jsx(b,{})]})})})}),T=()=>{const[t,e]=i.useState(!1);return n.jsxs("div",{children:[n.jsx("button",{onClick:()=>e(!0),className:"ui-button bg-success justify-center",children:"Coordinating Transition"}),n.jsxs(a,{show:t,children:[n.jsx(d,{children:n.jsx("div",{className:"fixed inset-0 bg-black/30 transition duration-300 data-[closed]:opacity-0",onClick:()=>e(!1)})}),n.jsx(d,{children:n.jsxs("div",{className:"fixed inset-y-0 z-[50] left-0 w-80 bg-white dark:bg-dark transition duration-300 data-[closed]:-translate-x-full p-4",children:[n.jsx("h3",{className:"text-lg mb-2",children:"This Is Sidebar"}),n.jsx("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."})]})})]})]})},k=()=>n.jsx("div",{children:n.jsx(o,{className:"p-0",children:n.jsx("div",{children:n.jsxs("div",{className:"p-6",children:[n.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Coordinating Transition"}),n.jsx(T,{})]})})})}),C=()=>{const[t,e]=i.useState(!1);return n.jsx("div",{children:n.jsxs("div",{className:"relative",children:[n.jsx("button",{onClick:()=>e(r=>!r),className:"ui-button bg-secondary justify-center",children:"Enter Leave Transition"}),n.jsx(a,{show:t,children:n.jsx("div",{className:l(["absolute transition ease-in-out bg-white dark:bg-dark rounded-sm shadow-md dark:shadow-dark-md p-4 w-72 mt-1","data-[closed]:opacity-0 ","data-[enter]:duration-100 data-[enter]:data-[closed]:-translate-x-full","data-[leave]:duration-300 data-[leave]:data-[closed]:translate-x-full"]),children:"I will enter from the left and leave to the right"})})]})})},w=()=>n.jsx("div",{children:n.jsx(o,{className:"p-0",children:n.jsx("div",{children:n.jsxs("div",{className:"p-6",children:[n.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Different Transition"}),n.jsx(C,{})]})})})}),N=()=>{const[t,e]=i.useState(!0);return n.jsx("div",{children:n.jsxs("div",{className:"flex flex-col items-center",children:[n.jsx(a,{show:t,appear:!0,children:n.jsx("div",{className:"transition duration-300 ease-in data-[closed]:opacity-0 bg-lightgray dark:bg-dark rounded-sm shadow-md dark:shadow-dark-md p-4 w-72",children:"I will fade in on initial render Lorem Ipsum is simply dummy text of the printing and typesetting industry."})}),n.jsx(c,{onClick:()=>e(r=>!r),className:"transition data-[hover]:scale-105 ui-button justify-center bg-info gap-3 mt-5  ",children:"On Intial Transition"})]})})},I=()=>n.jsx("div",{children:n.jsx(o,{className:"p-0",children:n.jsx("div",{children:n.jsxs("div",{className:"p-6",children:[n.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Transitioning On Initial Mount"}),n.jsx(N,{})]})})})}),S=[{to:"/",title:"Home"},{title:"Transition"}],_=()=>n.jsxs(n.Fragment,{children:[n.jsx(u,{title:"Transition",items:S}),n.jsxs("div",{className:"grid grid-cols-12 gap-7",children:[n.jsxs("div",{className:"col-span-12",children:[n.jsx(j,{}),n.jsx(s,{children:p})]}),n.jsxs("div",{className:"col-span-12",children:[n.jsx(w,{}),n.jsx(s,{children:v})]}),n.jsxs("div",{className:"col-span-12",children:[n.jsx(k,{}),n.jsx(s,{children:x})]}),n.jsxs("div",{className:"col-span-12",children:[n.jsx(y,{}),n.jsx(s,{children:h})]}),n.jsxs("div",{className:"col-span-12",children:[n.jsx(I,{}),n.jsx(s,{children:g})]})]})]});export{_ as default};
