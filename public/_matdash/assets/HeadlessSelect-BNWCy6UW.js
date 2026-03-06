import{j as e}from"./index-hJ2SD4IE.js";import{C as t}from"./CodeDialog-BfgoSlBj.js";import{k as a}from"./select-BVBlmu6W.js";import{C as r}from"./card-lwgsVE9g.js";import{M as n}from"./description-GQA3je54.js";import{W as s}from"./field-hecxh0Wm.js";import{Z as l}from"./label-C8OIUv8U.js";import{B as o}from"./BreadcrumbComp-O0ZCyfoZ.js";import"./index-u1GrS9Dt.js";import"./vsc-dark-plus-BS5XCmWA.js";import"./highlight-C_eLAOnJ.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./useFocusRing-BV3_HsUU.js";import"./use-active-press-DRsr-MUW.js";import"./owner-Bbldmi17.js";import"./render-D4HeI6Nr.js";import"./disabled-CuDhUv8O.js";import"./use-sync-refs-DDif7ltm.js";import"./hidden-TglnW24O.js";import"./dom-BlW_0b_t.js";import"./CardBox-B317o365.js";import"./chevron-right-Dqa42BwH.js";import"./createLucideIcon-sKS6wsf3.js";const c=`import { Select } from '@headlessui/react'\r
\r
const BasicSelectCode = () => {\r
  return (\r
    <>\r
      <div className='max-w-sm'>\r
        <Select\r
          name='status'\r
          aria-label='Project status'\r
          className='ui-form-control rounded-md my-4 p-2! dark:bg-darkgray'>\r
          <option value='active'>Active</option>\r
          <option value='paused'>Paused</option>\r
          <option value='delayed'>Delayed</option>\r
          <option value='canceled'>Canceled</option>\r
        </Select>\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default BasicSelectCode\r
`,d=`import { Description, Field, Label, Select } from '@headlessui/react'\r
\r
const DisableSelectCode = () => {\r
  return (\r
    <>\r
      <div className='max-w-sm'>\r
        <Field disabled>\r
          <Label className='text-ld mb-1 block data-[disabled]:opacity-50'>\r
            Project status\r
          </Label>\r
          <Description className='mb-2 text-darklink text-xs data-[disabled]:opacity-50'>\r
            This will be visible to clients on the project.\r
          </Description>\r
          <Select\r
            name='status'\r
            aria-label='Project status'\r
            className='ui-form-control rounded-md data-[disabled]:opacity-50 !p-2'>\r
            <option value='active'>Active</option>\r
            <option value='paused'>Paused</option>\r
            <option value='delayed'>Delayed</option>\r
            <option value='canceled'>Canceled</option>\r
          </Select>\r
        </Field>\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default DisableSelectCode\r
`,m=`import { Description, Field, Label, Select } from '@headlessui/react'\r
\r
const WithDescriptionSelectCode = () => {\r
  return (\r
    <>\r
      <div className='max-w-sm'>\r
        <Field>\r
          <Label className='text-ld mb-1 block'>Project status</Label>\r
          <Description className='mb-2 text-darklink dark:text-gray-500 text-xs'>\r
            This will be visible to clients on the project.\r
          </Description>\r
          <Select\r
            name='status'\r
            aria-label='Project status'\r
            className='ui-form-control rounded-md !p-2 dark:bg-darkgray'>\r
            <option value='active'>Active</option>\r
            <option value='paused'>Paused</option>\r
            <option value='delayed'>Delayed</option>\r
            <option value='canceled'>Canceled</option>\r
          </Select>\r
        </Field>\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default WithDescriptionSelectCode\r
`,p=`import { Field, Label, Select } from '@headlessui/react'\r
\r
const WithLabelSelectCode = () => {\r
  return (\r
    <>\r
      <div className='max-w-sm'>\r
        <Field>\r
          <Label className='text-ld mb-2 block'>Project status</Label>\r
          <Select\r
            name='status'\r
            aria-label='Project status'\r
            className='ui-form-control rounded-md p-2! dark:bg-darkgray'>\r
            <option value='active'>Active</option>\r
            <option value='paused'>Paused</option>\r
            <option value='delayed'>Delayed</option>\r
            <option value='canceled'>Canceled</option>\r
          </Select>\r
        </Field>\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default WithLabelSelectCode\r
`,u=()=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"max-w-sm",children:e.jsxs(a,{name:"status","aria-label":"Project status",className:"ui-form-control rounded-md my-4 p-2! dark:bg-darkgray",children:[e.jsx("option",{value:"active",children:"Active"}),e.jsx("option",{value:"paused",children:"Paused"}),e.jsx("option",{value:"delayed",children:"Delayed"}),e.jsx("option",{value:"canceled",children:"Canceled"})]})})}),x=()=>e.jsx(r,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Basic Select"}),e.jsx(u,{})]})})}),j=()=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"max-w-sm",children:e.jsxs(s,{disabled:!0,children:[e.jsx(l,{className:"text-ld mb-1 block data-[disabled]:opacity-50",children:"Project status"}),e.jsx(n,{className:"mb-2 text-darklink text-xs data-[disabled]:opacity-50",children:"This will be visible to clients on the project."}),e.jsxs(a,{name:"status","aria-label":"Project status",className:"ui-form-control rounded-md data-[disabled]:opacity-50 !p-2",children:[e.jsx("option",{value:"active",children:"Active"}),e.jsx("option",{value:"paused",children:"Paused"}),e.jsx("option",{value:"delayed",children:"Delayed"}),e.jsx("option",{value:"canceled",children:"Canceled"})]})]})})}),h=()=>e.jsx(r,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Disabeld Select"}),e.jsx(j,{})]})})}),b=()=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"max-w-sm",children:e.jsxs(s,{children:[e.jsx(l,{className:"text-ld mb-1 block",children:"Project status"}),e.jsx(n,{className:"mb-2 text-darklink dark:text-gray-500 text-xs",children:"This will be visible to clients on the project."}),e.jsxs(a,{name:"status","aria-label":"Project status",className:"ui-form-control rounded-md !p-2 dark:bg-darkgray",children:[e.jsx("option",{value:"active",children:"Active"}),e.jsx("option",{value:"paused",children:"Paused"}),e.jsx("option",{value:"delayed",children:"Delayed"}),e.jsx("option",{value:"canceled",children:"Canceled"})]})]})})}),v=()=>e.jsx(r,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"With Descrioption Select"}),e.jsx(b,{})]})})}),N=()=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"max-w-sm",children:e.jsxs(s,{children:[e.jsx(l,{className:"text-ld mb-2 block",children:"Project status"}),e.jsxs(a,{name:"status","aria-label":"Project status",className:"ui-form-control rounded-md p-2! dark:bg-darkgray",children:[e.jsx("option",{value:"active",children:"Active"}),e.jsx("option",{value:"paused",children:"Paused"}),e.jsx("option",{value:"delayed",children:"Delayed"}),e.jsx("option",{value:"canceled",children:"Canceled"})]})]})})}),S=()=>e.jsx(r,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"With Label Select"}),e.jsx(N,{})]})})}),O=()=>{const i=[{to:"/",title:"Home"},{title:"Select"}];return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Select",items:i}),e.jsxs("div",{className:"grid grid-cols-12 gap-7",children:[e.jsxs("div",{className:" col-span-12",children:[e.jsx(x,{}),e.jsx(t,{children:c})]}),e.jsxs("div",{className:" col-span-12",children:[e.jsx(S,{}),e.jsx(t,{children:p})]}),e.jsxs("div",{className:" col-span-12",children:[e.jsx(v,{}),e.jsx(t,{children:m})]}),e.jsxs("div",{className:" col-span-12",children:[e.jsx(h,{}),e.jsx(t,{children:d})]})]})]})};export{O as default};
