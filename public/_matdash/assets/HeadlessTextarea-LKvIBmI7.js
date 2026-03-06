import{j as e}from"./index-B0HXAnM_.js";import{W as o}from"./WithLabelCode-Cq3iEGQw.js";import{C as r}from"./CodeDialog-C1N4vVlG.js";import{M as a}from"./textarea-CCExUFIO.js";import{C as t}from"./card-Cg1w-DhQ.js";import{M as n}from"./description-D5Wtlf8n.js";import{W as s}from"./field-0YNh-R2m.js";import{Z as i}from"./label-z49PO6XA.js";import{B as l}from"./BreadcrumbComp-9UXnI3U7.js";import"./index-BfJfxS1b.js";import"./vsc-dark-plus-C_odMC5h.js";import"./highlight-hCPzqiPq.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./useFocusRing-Cf8l_oKM.js";import"./render-wzWQcPy5.js";import"./disabled-Cmc0bqKc.js";import"./use-sync-refs-DQhvWRpV.js";import"./hidden-CXVWdIK3.js";import"./dom-BlW_0b_t.js";import"./CardBox-DnrW3_OL.js";import"./chevron-right-CYEh_jNb.js";import"./createLucideIcon-9FnylcZ7.js";const c=`import { Textarea } from '@headlessui/react'\r
\r
const BasicTextareaCode = () => {\r
  return (\r
    <>\r
      <div>\r
        <Textarea\r
          name='description'\r
          className='ui-form-control rounded-lg'\r
          rows={6}></Textarea>\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default BasicTextareaCode\r
`,m=`import { Description, Field, Label, Textarea } from '@headlessui/react'\r
\r
const DisableTextAreaCode = () => {\r
  return (\r
    <>\r
      <div>\r
        <Field disabled>\r
          <Label className='text-ld mb-1 block font-medium data-[disabled]:opacity-50'>\r
            Type Here\r
          </Label>\r
          <Description className='text-darklink dark:text-gray-500 text-xs mb-2 data-[disabled]:opacity-50'>\r
            Add any extra information about your event here.\r
          </Description>\r
          <Textarea\r
            name='description'\r
            className='ui-form-control rounded-lg data-[disabled]:bg-gray-100 dark:data-[disabled]:bg-dark'\r
            rows={6}></Textarea>\r
        </Field>\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default DisableTextAreaCode\r
`,x=`import { Description, Field, Label, Textarea } from '@headlessui/react'\r
\r
const WithDescriptionTextareaCode = () => {\r
  return (\r
    <>\r
      <div>\r
        <Field>\r
          <Label className='text-ld mb-1 block font-medium'>Type Here</Label>\r
          <Description className='text-darklink dark:text-gray-500 text-xs mb-2'>\r
            Add any extra information about your event here.\r
          </Description>\r
          <Textarea\r
            name='description'\r
            className='ui-form-control rounded-lg'\r
            rows={6}></Textarea>\r
        </Field>\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default WithDescriptionTextareaCode\r
`,p=()=>e.jsx(e.Fragment,{children:e.jsx("div",{children:e.jsx(a,{name:"description",className:"ui-form-control rounded-lg",rows:6})})}),h=()=>e.jsx(t,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Basic Textarea"}),e.jsx(p,{})]})})}),b=()=>e.jsx(e.Fragment,{children:e.jsx("div",{children:e.jsxs(s,{disabled:!0,children:[e.jsx(i,{className:"text-ld mb-1 block font-medium data-[disabled]:opacity-50",children:"Type Here"}),e.jsx(n,{className:"text-darklink dark:text-gray-500 text-xs mb-2 data-[disabled]:opacity-50",children:"Add any extra information about your event here."}),e.jsx(a,{name:"description",className:"ui-form-control rounded-lg data-[disabled]:bg-gray-100 dark:data-[disabled]:bg-dark",rows:6})]})})}),j=()=>e.jsx(t,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Disabled Textarea"}),e.jsx(b,{})]})})}),u=()=>e.jsx(e.Fragment,{children:e.jsx("div",{children:e.jsxs(s,{children:[e.jsx(i,{className:"text-ld mb-1 block font-medium",children:"Type Here"}),e.jsx(n,{className:"text-darklink dark:text-gray-500 text-xs mb-2",children:"Add any extra information about your event here."}),e.jsx(a,{name:"description",className:"ui-form-control rounded-lg",rows:6})]})})}),f=()=>e.jsx(t,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Discription With Textarea"}),e.jsx(u,{})]})})}),T=()=>e.jsx(e.Fragment,{children:e.jsx("div",{children:e.jsxs(s,{children:[e.jsx(i,{className:"text-ld mb-2 block font-medium",children:"Description"}),e.jsx(a,{name:"description",className:"ui-form-control rounded-lg",rows:4})]})})}),N=()=>e.jsx(t,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Label With Textarea"}),e.jsx(T,{})]})})}),P=()=>{const d=[{to:"/",title:"Home"},{title:"Textarea"}];return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"Textarea",items:d}),e.jsxs("div",{className:"grid grid-cols-12 gap-7",children:[e.jsxs("div",{className:"col-span-12",children:[e.jsx(h,{}),e.jsx(r,{children:c})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(N,{}),e.jsx(r,{children:o})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(f,{}),e.jsx(r,{children:x})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(j,{}),e.jsx(r,{children:m})]})]})]})};export{P as default};
