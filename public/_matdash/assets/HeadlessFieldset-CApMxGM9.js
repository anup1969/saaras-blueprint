import{r as x,R as o,j as e}from"./index-B0HXAnM_.js";import{C as p}from"./CodeDialog-C1N4vVlG.js";import{M as a}from"./description-D5Wtlf8n.js";import{W as i}from"./field-0YNh-R2m.js";import{n as S}from"./dom-BlW_0b_t.js";import{Y as h,a as I,K as M}from"./render-wzWQcPy5.js";import{y as $}from"./use-sync-refs-DQhvWRpV.js";import{a as T,l as E}from"./disabled-Cmc0bqKc.js";import{V as W,Z as n}from"./label-z49PO6XA.js";import{X as f}from"./input-5pjG2JzL.js";import{k as j}from"./select-BHEaShVw.js";import{M as N}from"./textarea-CCExUFIO.js";import{C as b}from"./card-Cg1w-DhQ.js";import{B as A}from"./BreadcrumbComp-9UXnI3U7.js";import"./index-BfJfxS1b.js";import"./vsc-dark-plus-C_odMC5h.js";import"./highlight-hCPzqiPq.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./hidden-CXVWdIK3.js";import"./useFocusRing-Cf8l_oKM.js";import"./use-active-press-Dxcia4TV.js";import"./owner-DrGvqvJ-.js";import"./CardBox-DnrW3_OL.js";import"./chevron-right-CYEh_jNb.js";import"./createLucideIcon-9FnylcZ7.js";function U(r){let t=typeof r=="string"?r:void 0,[l,d]=x.useState(t);return[t??l,x.useCallback(s=>{t||S(s)&&d(s.tagName.toLowerCase())},[t])]}let u="fieldset";function B(r,t){var l;let d=T(),{disabled:s=d||!1,...y}=r,[v,F]=U((l=r.as)!=null?l:u),m=$(t,F),[c,D]=W(),C=I({disabled:s}),w=v==="fieldset"?{ref:m,"aria-labelledby":c,disabled:s||void 0}:{ref:m,role:"group","aria-labelledby":c,"aria-disabled":s||void 0},L=M();return o.createElement(E,{value:s},o.createElement(D,null,L({ourProps:w,theirProps:y,slot:C,defaultTag:u,name:"Fieldset"})))}let g=h(B);function R(r,t){return o.createElement(n,{as:"div",ref:t,...r})}let k=h(R);const H=`import {\r
  Description,\r
  Field,\r
  Fieldset,\r
  Input,\r
  Label,\r
  Legend,\r
  Select,\r
  Textarea,\r
} from '@headlessui/react'\r
\r
const DisabledFieldsetCode = () => {\r
  return (\r
    <div>\r
      <Fieldset\r
        className='space-y-6 rounded-xl bg-lightgray dark:bg-dark p-6'\r
        disabled>\r
        <Legend className='text-base/7 font-semibold dark:text-white text-dark'>\r
          Shipping Details\r
        </Legend>\r
        <Field>\r
          <Label className='text-ld font-medium text-sm'>Street address</Label>\r
          <Input className='w-full ui-form-control rounded-md py-2 px-3 mt-3' />\r
        </Field>\r
        <Field>\r
          <Label className='text-ld font-medium text-sm'>Country</Label>\r
          <Description className='text-darklink text-xs mt-1 dark:text-gray-500'>\r
            We currently only ship to North America.\r
          </Description>\r
\r
          <div className='relative'>\r
            <Select className='ui-form-control rounded-md mt-3 p-2'>\r
              <option>Canada</option>\r
              <option>Mexico</option>\r
              <option>United States</option>\r
            </Select>\r
          </div>\r
        </Field>\r
        <Field>\r
          <Label className='text-ld font-medium text-sm'>Delivery notes</Label>\r
          <Description className='text-xs text-darklink mt-1 dark:text-gray-500'>\r
            If you have a tiger, we'd like to know about it.\r
          </Description>\r
          <Textarea className='ui-form-control rounded-lg mt-3' rows={3} />\r
        </Field>\r
      </Fieldset>\r
    </div>\r
  )\r
}\r
\r
export default DisabledFieldsetCode\r
`,P=`import {\r
  Description,\r
  Field,\r
  Fieldset,\r
  Input,\r
  Label,\r
  Legend,\r
  Select,\r
  Textarea,\r
} from '@headlessui/react'\r
\r
const FieldsetCode = () => {\r
  return (\r
    <div>\r
      <div>\r
        <Fieldset className='space-y-6 rounded-xl bg-lightgray dark:bg-dark p-6'>\r
          <Legend className='text-base/7 font-semibold dark:text-white text-dark'>\r
            Shipping Details\r
          </Legend>\r
          <Field>\r
            <Label className='text-ld font-medium text-sm'>\r
              Street address\r
            </Label>\r
            <Input className='w-full ui-form-control rounded-md py-2 px-3 mt-3' />\r
          </Field>\r
          <Field>\r
            <Label className='text-ld font-medium text-sm'>Country</Label>\r
            <Description className='text-darklink text-xs mt-1 dark:text-gray-500'>\r
              We currently only ship to North America.\r
            </Description>\r
\r
            <div className='relative'>\r
              <Select className='ui-form-control rounded-md mt-3 p-2'>\r
                <option>Canada</option>\r
                <option>Mexico</option>\r
                <option>United States</option>\r
              </Select>\r
            </div>\r
          </Field>\r
          <Field>\r
            <Label className='text-ld font-medium text-sm'>\r
              Delivery notes\r
            </Label>\r
            <Description className='text-xs text-darklink dark:text-gray-500 mt-1'>\r
              If you have a tiger, we'd like to know about it.\r
            </Description>\r
            <Textarea className='ui-form-control rounded-lg mt-3' rows={3} />\r
          </Field>\r
        </Fieldset>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default FieldsetCode\r
`,K=()=>e.jsx("div",{children:e.jsxs(g,{className:"space-y-6 rounded-xl bg-lightgray dark:bg-dark p-6",disabled:!0,children:[e.jsx(k,{className:"text-base/7 font-semibold dark:text-white text-dark",children:"Shipping Details"}),e.jsxs(i,{children:[e.jsx(n,{className:"text-ld font-medium text-sm",children:"Street address"}),e.jsx(f,{className:"w-full ui-form-control rounded-md py-2 px-3 mt-3"})]}),e.jsxs(i,{children:[e.jsx(n,{className:"text-ld font-medium text-sm",children:"Country"}),e.jsx(a,{className:"text-darklink text-xs mt-1 dark:text-gray-500",children:"We currently only ship to North America."}),e.jsx("div",{className:"relative",children:e.jsxs(j,{className:"ui-form-control rounded-md mt-3 p-2",children:[e.jsx("option",{children:"Canada"}),e.jsx("option",{children:"Mexico"}),e.jsx("option",{children:"United States"})]})})]}),e.jsxs(i,{children:[e.jsx(n,{className:"text-ld font-medium text-sm",children:"Delivery notes"}),e.jsx(a,{className:"text-xs text-darklink mt-1 dark:text-gray-500",children:"If you have a tiger, we'd like to know about it."}),e.jsx(N,{className:"ui-form-control rounded-lg mt-3",rows:3})]})]})}),V=()=>e.jsx(b,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Disable Fieldset Form"}),e.jsx(K,{})]})})}),X=()=>e.jsx("div",{children:e.jsx("div",{children:e.jsxs(g,{className:"space-y-6 rounded-xl bg-lightgray dark:bg-dark p-6",children:[e.jsx(k,{className:"text-base/7 font-semibold dark:text-white text-dark",children:"Shipping Details"}),e.jsxs(i,{children:[e.jsx(n,{className:"text-ld font-medium text-sm",children:"Street address"}),e.jsx(f,{className:"w-full ui-form-control rounded-md py-2 px-3 mt-3"})]}),e.jsxs(i,{children:[e.jsx(n,{className:"text-ld font-medium text-sm",children:"Country"}),e.jsx(a,{className:"text-darklink text-xs mt-1 dark:text-gray-500",children:"We currently only ship to North America."}),e.jsx("div",{className:"relative",children:e.jsxs(j,{className:"ui-form-control rounded-md mt-3 p-2",children:[e.jsx("option",{children:"Canada"}),e.jsx("option",{children:"Mexico"}),e.jsx("option",{children:"United States"})]})})]}),e.jsxs(i,{children:[e.jsx(n,{className:"text-ld font-medium text-sm",children:"Delivery notes"}),e.jsx(a,{className:"text-xs text-darklink dark:text-gray-500 mt-1",children:"If you have a tiger, we'd like to know about it."}),e.jsx(N,{className:"ui-form-control rounded-lg mt-3",rows:3})]})]})})}),Y=()=>e.jsx(b,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Fieldset Form"}),e.jsx(X,{})]})})}),Z=[{to:"/",title:"Home"},{title:"Fieldset"}],ke=()=>e.jsxs(e.Fragment,{children:[e.jsx(A,{title:"Fieldset",items:Z}),e.jsxs("div",{className:"grid grid-cols-12 gap-7",children:[e.jsxs("div",{className:"col-span-12",children:[e.jsx(Y,{}),e.jsx(p,{children:P})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(V,{}),e.jsx(p,{children:H})]})]})]});export{ke as default};
