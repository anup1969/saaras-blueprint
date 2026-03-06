import{j as e}from"./index-B0HXAnM_.js";import{C as n}from"./CodeDialog-C1N4vVlG.js";import{C as m}from"./CardBox-DnrW3_OL.js";import{M as a}from"./description-D5Wtlf8n.js";import{W as l}from"./field-0YNh-R2m.js";import{X as r}from"./input-5pjG2JzL.js";import{Z as s}from"./label-z49PO6XA.js";import{C as t}from"./card-Cg1w-DhQ.js";import{B as d}from"./BreadcrumbComp-9UXnI3U7.js";import"./index-BfJfxS1b.js";import"./vsc-dark-plus-C_odMC5h.js";import"./highlight-hCPzqiPq.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./render-wzWQcPy5.js";import"./use-sync-refs-DQhvWRpV.js";import"./disabled-Cmc0bqKc.js";import"./hidden-CXVWdIK3.js";import"./useFocusRing-Cf8l_oKM.js";import"./dom-BlW_0b_t.js";import"./chevron-right-CYEh_jNb.js";import"./createLucideIcon-9FnylcZ7.js";const i=`import { Description, Field, Input, Label } from '@headlessui/react'\r
\r
const InputWithDescriptionCode = () => {\r
  return (\r
    <div>\r
      <div>\r
        <Field className='w-full mb-3'>\r
          <Label className='mb-1 block text-ld'>Name</Label>\r
          <Description className='text-darklink dark:text-gray-500 text-xs'>\r
            Use your real name so people will recognize you.\r
          </Description>\r
          <Input\r
            type='text'\r
            className='ui-form-control rounded-md py-2.5 px-3 w-full mt-2'\r
            name='full_name'\r
          />\r
        </Field>\r
        <Field className='w-full mb-3'>\r
          <Label className='mb-1 block text-ld'>Email</Label>\r
          <Description className='text-darklink dark:text-gray-500 text-xs'>\r
            Use your real Email so people will recognize you.\r
          </Description>\r
          <Input\r
            type='email'\r
            className='ui-form-control rounded-md py-2.5 px-3 w-full mt-2'\r
            name='full_name'\r
          />\r
        </Field>\r
        <Field className='w-full '>\r
          <Label className='mb-1 block text-ld'>Password</Label>\r
          <Description className='text-darklink dark:text-gray-500 text-xs'>\r
            Use your real Password so people will recognize you.\r
          </Description>\r
          <Input\r
            type='password'\r
            className='ui-form-control rounded-md py-2.5 px-3 w-full mt-2'\r
            name='full_name'\r
          />\r
        </Field>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default InputWithDescriptionCode\r
`,o=`import { Field, Input, Label } from '@headlessui/react'\r
\r
const InputWithLblCode = () => {\r
  return (\r
    <div>\r
      <div>\r
        <Field className='w-full mb-3'>\r
          <Label className='mb-2 block text-ld'>Name</Label>\r
          <Input\r
            type='text'\r
            className='ui-form-control rounded-md py-2.5 px-3 w-full'\r
            name='full_name'\r
          />\r
        </Field>\r
        <Field className='w-full mb-3'>\r
          <Label className='mb-2 block text-ld'>Email</Label>\r
          <Input\r
            type='email'\r
            className='ui-form-control rounded-md py-2.5 px-3 w-full'\r
            name='full_name'\r
          />\r
        </Field>\r
        <Field className='w-full '>\r
          <Label className='mb-2 block text-ld'>Password</Label>\r
          <Input\r
            type='password'\r
            className='ui-form-control rounded-md py-2.5 px-3 w-full'\r
            name='full_name'\r
          />\r
        </Field>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default InputWithLblCode\r
`,c=`import { Field, Input, Label } from '@headlessui/react'\r
\r
const SquareWithLblCode = () => {\r
  return (\r
    <div>\r
      <div>\r
        <Field className='w-full mb-3'>\r
          <Label className='mb-2 block text-ld'>Name</Label>\r
          <Input\r
            type='text'\r
            className='ui-form-control rounded-md py-2.5 px-3 w-full'\r
            name='full_name'\r
          />\r
        </Field>\r
        <Field className='w-full mb-3'>\r
          <Label className='mb-2 block text-ld'>Email</Label>\r
          <Input\r
            type='email'\r
            className='ui-form-control rounded-md py-2.5 px-3 w-full'\r
            name='full_name'\r
          />\r
        </Field>\r
        <Field className='w-full '>\r
          <Label className='mb-2 block text-ld'>Password</Label>\r
          <Input\r
            type='password'\r
            className='ui-form-control rounded-md py-2.5 px-3 w-full'\r
            name='full_name'\r
          />\r
        </Field>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default SquareWithLblCode\r
`,p=()=>e.jsx("div",{children:e.jsxs(m,{children:[e.jsx("div",{className:"flex items-center justify-between mb-4",children:e.jsx("h4",{className:"text-lg font-semibold",children:"Disabled Input With Description"})}),e.jsxs(l,{className:"w-full mb-3",disabled:!0,children:[e.jsx(s,{className:"mb-1 block text-ld data-[disabled]:opacity-50",children:"Name"}),e.jsx(a,{className:"text-darklink dark:text-gray-500 text-xs data-[disabled]:opacity-50",children:"Use your real name so people will recognize you."}),e.jsx(r,{type:"text",className:"ui-form-control rounded-md py-2.5 px-3 w-full mt-2 data-[disabled]:opacity-50",name:"full_name"})]}),e.jsxs(l,{className:"w-full mb-3",disabled:!0,children:[e.jsx(s,{className:"mb-1 block text-ld data-[disabled]:opacity-50",children:"Email"}),e.jsx(a,{className:"text-darklink dark:text-gray-500 text-xs data-[disabled]:opacity-50",children:"Use your real Email so people will recognize you."}),e.jsx(r,{type:"email",className:"ui-form-control rounded-md py-2.5 px-3 w-full mt-2 data-[disabled]:opacity-50",name:"full_name"})]}),e.jsxs(l,{className:"w-full ",disabled:!0,children:[e.jsx(s,{className:"mb-1 block text-ld data-[disabled]:opacity-50",children:"Password"}),e.jsx(a,{className:"text-darklink dark:text-gray-500 text-xs data-[disabled]:opacity-50",children:"Use your real Password so people will recognize you."}),e.jsx(r,{type:"password",className:"ui-form-control rounded-md py-2.5 px-3 w-full mt-2 data-[disabled]:opacity-50",name:"full_name"})]})]})}),u=()=>e.jsx("div",{children:e.jsxs("div",{children:[e.jsxs(l,{className:"w-full mb-3",children:[e.jsx(s,{className:"mb-1 block text-ld",children:"Name"}),e.jsx(a,{className:"text-darklink dark:text-gray-500 text-xs",children:"Use your real name so people will recognize you."}),e.jsx(r,{type:"text",className:"ui-form-control rounded-md py-2.5 px-3 w-full mt-2",name:"full_name"})]}),e.jsxs(l,{className:"w-full mb-3",children:[e.jsx(s,{className:"mb-1 block text-ld",children:"Email"}),e.jsx(a,{className:"text-darklink dark:text-gray-500 text-xs",children:"Use your real Email so people will recognize you."}),e.jsx(r,{type:"email",className:"ui-form-control rounded-md py-2.5 px-3 w-full mt-2",name:"full_name"})]}),e.jsxs(l,{className:"w-full ",children:[e.jsx(s,{className:"mb-1 block text-ld",children:"Password"}),e.jsx(a,{className:"text-darklink dark:text-gray-500 text-xs",children:"Use your real Password so people will recognize you."}),e.jsx(r,{type:"password",className:"ui-form-control rounded-md py-2.5 px-3 w-full mt-2",name:"full_name"})]})]})}),x=()=>e.jsx(t,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Input With Description"}),e.jsx(u,{})]})})}),b=()=>e.jsx("div",{children:e.jsxs("div",{children:[e.jsxs(l,{className:"w-full mb-3",children:[e.jsx(s,{className:"mb-2 block text-ld",children:"Name"}),e.jsx(r,{type:"text",className:"ui-form-control rounded-md py-2.5 px-3 w-full",name:"full_name"})]}),e.jsxs(l,{className:"w-full mb-3",children:[e.jsx(s,{className:"mb-2 block text-ld",children:"Email"}),e.jsx(r,{type:"email",className:"ui-form-control rounded-md py-2.5 px-3 w-full",name:"full_name"})]}),e.jsxs(l,{className:"w-full ",children:[e.jsx(s,{className:"mb-2 block text-ld",children:"Password"}),e.jsx(r,{type:"password",className:"ui-form-control rounded-md py-2.5 px-3 w-full",name:"full_name"})]})]})}),f=()=>e.jsx(t,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Input With Label"}),e.jsx(b,{})]})})}),N=()=>e.jsx("div",{children:e.jsxs("div",{children:[e.jsxs(l,{className:"w-full mb-3",children:[e.jsx(s,{className:"mb-2 block text-ld",children:"Name"}),e.jsx(r,{type:"text",className:"ui-form-control rounded-md py-2.5 px-3 w-full",name:"full_name"})]}),e.jsxs(l,{className:"w-full mb-3",children:[e.jsx(s,{className:"mb-2 block text-ld",children:"Email"}),e.jsx(r,{type:"email",className:"ui-form-control rounded-md py-2.5 px-3 w-full",name:"full_name"})]}),e.jsxs(l,{className:"w-full ",children:[e.jsx(s,{className:"mb-2 block text-ld",children:"Password"}),e.jsx(r,{type:"password",className:"ui-form-control rounded-md py-2.5 px-3 w-full",name:"full_name"})]})]})}),h=()=>e.jsx(t,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Square Input With Label"}),e.jsx(N,{})]})})}),j=[{to:"/",title:"Home"},{title:"input"}],Z=()=>e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"input",items:j}),e.jsxs("div",{className:"grid grid-cols-12 gap-7",children:[e.jsxs("div",{className:"col-span-12",children:[e.jsx(f,{}),e.jsx(n,{children:o})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(h,{}),e.jsx(n,{children:c})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(x,{}),e.jsx(n,{children:i})]}),e.jsx("div",{className:"col-span-12",children:e.jsx(p,{})})]})]});export{Z as default};
