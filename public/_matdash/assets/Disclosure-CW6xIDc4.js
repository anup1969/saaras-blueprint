import{R as N,r as a,j as e,I as p}from"./index-BoNr0JGX.js";import{C as z}from"./CodeDialog-_oyCzuNE.js";import{$ as te,a as re}from"./useFocusRing-85OD7Fsl.js";import{w as se}from"./use-active-press-nebW6P8B.js";import{Y as T,o as b,a as M,V as U,K as F,d as ae,u as R,A as X}from"./render-Cf3VyR8s.js";import{e as ne}from"./use-resolve-button-type-BC-unCYO.js";import{y as A,T as ie}from"./use-sync-refs-BT09qo3v.js";import{u as oe,N as le,i as E,x as ce,s as de,c as ue}from"./open-closed-DO53-7y6.js";import{C as me}from"./close-provider-DJDvD-X4.js";import{s as pe}from"./bugs-BJ7ScNGK.js";import{i as Y}from"./dom-BlW_0b_t.js";import{l as xe}from"./owner-Bt04AvpD.js";import{o as B}from"./keyboard-C1Wiwm26.js";import{C as k}from"./card-vkvqasdW.js";import{y as he}from"./close-button-CLDv19Q_.js";import{A as $}from"./index-99uSBEBu.js";import{m as L}from"./proxy-dh2Uf8l3.js";import{B as ye}from"./BreadcrumbComp-Chbekl54.js";import"./index-ZNjr_w1p.js";import"./vsc-dark-plus-DFfyWk_Y.js";import"./highlight-BsgCmQTy.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./button-DF252h7F.js";import"./disabled-BmWJng7l.js";import"./CardBox-CQoLG162.js";import"./chevron-right-DKLkMv9e.js";import"./createLucideIcon-C_6kNXZz.js";var _;let fe=(_=N.startTransition)!=null?_:function(t){t()};var ge=(t=>(t[t.Open=0]="Open",t[t.Closed=1]="Closed",t))(ge||{}),ve=(t=>(t[t.ToggleDisclosure=0]="ToggleDisclosure",t[t.CloseDisclosure=1]="CloseDisclosure",t[t.SetButtonId=2]="SetButtonId",t[t.SetPanelId=3]="SetPanelId",t[t.SetButtonElement=4]="SetButtonElement",t[t.SetPanelElement=5]="SetPanelElement",t))(ve||{});let we={0:t=>({...t,disclosureState:R(t.disclosureState,{0:1,1:0})}),1:t=>t.disclosureState===1?t:{...t,disclosureState:1},2(t,r){return t.buttonId===r.buttonId?t:{...t,buttonId:r.buttonId}},3(t,r){return t.panelId===r.panelId?t:{...t,panelId:r.panelId}},4(t,r){return t.buttonElement===r.element?t:{...t,buttonElement:r.element}},5(t,r){return t.panelElement===r.element?t:{...t,panelElement:r.element}}},O=a.createContext(null);O.displayName="DisclosureContext";function W(t){let r=a.useContext(O);if(r===null){let u=new Error(`<${t} /> is missing a parent <Disclosure /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(u,W),u}return r}let H=a.createContext(null);H.displayName="DisclosureAPIContext";function q(t){let r=a.useContext(H);if(r===null){let u=new Error(`<${t} /> is missing a parent <Disclosure /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(u,q),u}return r}let K=a.createContext(null);K.displayName="DisclosurePanelContext";function Ne(){return a.useContext(K)}function je(t,r){return R(r.type,we,t,r)}let De=a.Fragment;function be(t,r){let{defaultOpen:u=!1,...h}=t,m=a.useRef(null),y=A(r,ie(o=>{m.current=o},t.as===void 0||ae(t.as))),f=a.useReducer(je,{disclosureState:u?0:1,buttonElement:null,panelElement:null,buttonId:null,panelId:null}),[{disclosureState:s,buttonId:n},j]=f,i=b(o=>{j({type:1});let v=xe(m.current);if(!v||!n)return;let w=o?Y(o)?o:"current"in o&&Y(o.current)?o.current:v.getElementById(n):v.getElementById(n);w==null||w.focus()}),I=a.useMemo(()=>({close:i}),[i]),g=M({open:s===0,close:i}),D={ref:y},C=F();return N.createElement(O.Provider,{value:f},N.createElement(H.Provider,{value:I},N.createElement(me,{value:i},N.createElement(ue,{value:R(s,{0:E.Open,1:E.Closed})},C({ourProps:D,theirProps:h,slot:g,defaultTag:De,name:"Disclosure"})))))}let Ie="button";function Ce(t,r){let u=a.useId(),{id:h=`headlessui-disclosure-button-${u}`,disabled:m=!1,autoFocus:y=!1,...f}=t,[s,n]=W("Disclosure.Button"),j=Ne(),i=j===null?!1:j===s.panelId,I=a.useRef(null),g=A(I,r,b(l=>{if(!i)return n({type:4,element:l})}));a.useEffect(()=>{if(!i)return n({type:2,buttonId:h}),()=>{n({type:2,buttonId:null})}},[h,n,i]);let D=b(l=>{var P;if(i){if(s.disclosureState===1)return;switch(l.key){case B.Space:case B.Enter:l.preventDefault(),l.stopPropagation(),n({type:0}),(P=s.buttonElement)==null||P.focus();break}}else switch(l.key){case B.Space:case B.Enter:l.preventDefault(),l.stopPropagation(),n({type:0});break}}),C=b(l=>{switch(l.key){case B.Space:l.preventDefault();break}}),o=b(l=>{var P;pe(l.currentTarget)||m||(i?(n({type:0}),(P=s.buttonElement)==null||P.focus()):n({type:0}))}),{isFocusVisible:v,focusProps:w}=te({autoFocus:y}),{isHovered:S,hoverProps:V}=re({isDisabled:m}),{pressed:Q,pressProps:G}=se({disabled:m}),Z=M({open:s.disclosureState===0,hover:S,active:Q,disabled:m,focus:v,autofocus:y}),J=ne(t,s.buttonElement),ee=i?U({ref:g,type:J,disabled:m||void 0,autoFocus:y,onKeyDown:D,onClick:o},w,V,G):U({ref:g,id:h,type:J,"aria-expanded":s.disclosureState===0,"aria-controls":s.panelElement?s.panelId:void 0,disabled:m||void 0,autoFocus:y,onKeyDown:D,onKeyUp:C,onClick:o},w,V,G);return F()({ourProps:ee,theirProps:f,slot:Z,defaultTag:Ie,name:"Disclosure.Button"})}let Pe="div",ze=X.RenderStrategy|X.Static;function Be(t,r){let u=a.useId(),{id:h=`headlessui-disclosure-panel-${u}`,transition:m=!1,...y}=t,[f,s]=W("Disclosure.Panel"),{close:n}=q("Disclosure.Panel"),[j,i]=a.useState(null),I=A(r,b(S=>{fe(()=>s({type:5,element:S}))}),i);a.useEffect(()=>(s({type:3,panelId:h}),()=>{s({type:3,panelId:null})}),[h,s]);let g=oe(),[D,C]=le(m,j,g!==null?(g&E.Open)===E.Open:f.disclosureState===0),o=M({open:f.disclosureState===0,close:n}),v={ref:I,id:h,...ce(C)},w=F();return N.createElement(de,null,N.createElement(K.Provider,{value:f.panelId},w({ourProps:v,theirProps:y,slot:o,defaultTag:Pe,features:ze,visible:D,name:"Disclosure.Panel"})))}let ke=T(be),c=T(Ce),d=T(Be),x=Object.assign(ke,{Button:c,Panel:d});const Ee=`import {\r
  Disclosure,\r
  DisclosureButton,\r
  DisclosurePanel,\r
} from '@headlessui/react'\r
import { Icon } from '@iconify/react'\r
\r
const BasicDisclosureCode = () => {\r
  return (\r
    <div>\r
      <div className='w-full  divide-y divide-border dark:divide-darkborder rounded-xl bg-lightgray dark:bg-dark'>\r
        <Disclosure as='div' className='py-4 px-6' defaultOpen={true}>\r
          <DisclosureButton className='group flex w-full items-center justify-between'>\r
            <span className='text-sm font-medium text-ld group-data-[hover]:text-primary'>\r
              What is your refund policy?\r
            </span>\r
            <Icon\r
              icon='solar:alt-arrow-down-outline'\r
              height={18}\r
              className='size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180'\r
            />\r
          </DisclosureButton>\r
          <DisclosurePanel className='mt-2 text-xs text-bodytext'>\r
            Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete\r
            text) is dummy text that is not meant to mean anything. It is used\r
            as a placeholder in magazine\r
          </DisclosurePanel>\r
        </Disclosure>\r
        <Disclosure as='div' className='py-4 px-6'>\r
          <DisclosureButton className='group flex w-full items-center justify-between'>\r
            <span className='text-sm font-medium text-ld group-data-[hover]:text-primary'>\r
              Can I reserve a magazine?\r
            </span>\r
            <Icon\r
              icon='solar:alt-arrow-down-outline'\r
              height={18}\r
              className='size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180'\r
            />\r
          </DisclosureButton>\r
          <DisclosurePanel className='mt-2 text-xs text-bodytext'>\r
            Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete\r
            text) is dummy text that is not meant to mean anything. It is used\r
            as a placeholder in magazine\r
          </DisclosurePanel>\r
        </Disclosure>\r
        <Disclosure as='div' className='py-4 px-6'>\r
          <DisclosureButton className='group flex w-full items-center justify-between'>\r
            <span className='text-sm font-medium text-ld group-data-[hover]:text-primary'>\r
              Do I have the right to return an item?\r
            </span>\r
            <Icon\r
              icon='solar:alt-arrow-down-outline'\r
              height={18}\r
              className='size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180'\r
            />\r
          </DisclosureButton>\r
          <DisclosurePanel className='mt-2 text-xs text-bodytext'>\r
            Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete\r
            text) is dummy text that is not meant to mean anything. It is used\r
            as a placeholder in magazine\r
          </DisclosurePanel>\r
        </Disclosure>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default BasicDisclosureCode\r
`,Se=`import {\r
  Disclosure,\r
  DisclosureButton,\r
  DisclosurePanel,\r
  CloseButton,\r
} from "@headlessui/react";\r
import MyCustomLink from "../MyLink";\r
import { Icon } from "@iconify/react";\r
\r
const ClosingDisclosureCode = () => {\r
  return (\r
    <div>\r
      <Disclosure>\r
        <DisclosureButton className='group bg-primary ui-button'>\r
          Open mobile menu\r
          <Icon\r
            icon='solar:alt-arrow-down-outline'\r
            height={18}\r
            className='size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180'\r
          />\r
        </DisclosureButton>\r
        <DisclosurePanel className='px-4 py-1'>\r
          <CloseButton as={MyCustomLink}>Go with your link</CloseButton>\r
        </DisclosurePanel>\r
      </Disclosure>\r
    </div>\r
  )\r
}\r
\r
export default ClosingDisclosureCode\r
`,$e=`import {\r
  Disclosure,\r
  DisclosureButton,\r
  DisclosurePanel,\r
} from '@headlessui/react'\r
import { AnimatePresence, motion } from 'framer-motion'\r
import { Icon } from '@iconify/react'\r
\r
const FramerMotionCode = () => {\r
  return (\r
    <div>\r
      <div className='w-full divide-y divide-border dark:divide-darkborder rounded-xl bg-lightgray dark:bg-dark'>\r
        <Disclosure as='div' className='py-4 px-6'>\r
          {({ open }) => (\r
            <>\r
              <DisclosureButton className='group flex w-full items-center justify-between'>\r
                <span className='text-sm font-medium text-ld group-data-[hover]:text-primary'>\r
                  What is your refund policy?\r
                </span>\r
                <Icon\r
                  icon='solar:alt-arrow-down-outline'\r
                  height={18}\r
                  className='size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180'\r
                />\r
              </DisclosureButton>\r
              <div className='overflow-hidden'>\r
                <AnimatePresence>\r
                  {open && (\r
                    <DisclosurePanel\r
                      static\r
                      as={motion.div}\r
                      initial={{ opacity: 0, y: -24 }}\r
                      animate={{ opacity: 1, y: 0 }}\r
                      exit={{ opacity: 0, y: -24 }}\r
                      className='origin-top text-xs mt-2 text-bodytext'>\r
                      Lorem ipsum dolor sit amet, consectetur adipisici elit…’\r
                      (complete text) is dummy text that is not meant to mean\r
                      anything. It is used as a placeholder in magazine\r
                      layouts,Lorem ipsum dolor sit amet, consectetur adipisici\r
                      elit…’ (complete text) is dummy text that is not meant to\r
                      mean anything. It is used as a placeholder in magazine\r
                      layouts,\r
                    </DisclosurePanel>\r
                  )}\r
                </AnimatePresence>\r
              </div>\r
            </>\r
          )}\r
        </Disclosure>\r
        <Disclosure as='div' className='py-4 px-6'>\r
          {({ open }) => (\r
            <>\r
              <DisclosureButton className='group flex w-full items-center justify-between'>\r
                <span className='text-sm font-medium text-ld group-data-[hover]:text-primary'>\r
                  Can I reserve a magazine?\r
                </span>\r
                <Icon\r
                  icon='solar:alt-arrow-down-outline'\r
                  height={18}\r
                  className='size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180'\r
                />\r
              </DisclosureButton>\r
              <div className='overflow-hidden'>\r
                <AnimatePresence>\r
                  {open && (\r
                    <DisclosurePanel\r
                      static\r
                      as={motion.div}\r
                      initial={{ opacity: 0, y: -24 }}\r
                      animate={{ opacity: 1, y: 0 }}\r
                      exit={{ opacity: 0, y: -24 }}\r
                      className='origin-top text-xs text-bodytext mt-2'>\r
                      Lorem ipsum dolor sit amet, consectetur adipisici elit…’\r
                      (complete text) is dummy text that is not meant to mean\r
                      anything. It is used as a placeholder in magazine\r
                      layouts,Lorem ipsum dolor sit amet, consectetur adipisici\r
                      elit…’ (complete text) is dummy text that is not meant to\r
                      mean anything. It is used as a placeholder in magazine\r
                      layouts,\r
                    </DisclosurePanel>\r
                  )}\r
                </AnimatePresence>\r
              </div>\r
            </>\r
          )}\r
        </Disclosure>\r
        <Disclosure as='div' className='py-4 px-6'>\r
          {({ open }) => (\r
            <>\r
              <DisclosureButton className='group flex w-full items-center justify-between'>\r
                <span className='text-sm font-medium text-ld group-data-[hover]:text-primary'>\r
                  Do I have the right to return an item?\r
                </span>\r
                <Icon\r
                  icon='solar:alt-arrow-down-outline'\r
                  height={18}\r
                  className='size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180'\r
                />\r
              </DisclosureButton>\r
              <div className='overflow-hidden'>\r
                <AnimatePresence>\r
                  {open && (\r
                    <DisclosurePanel\r
                      static\r
                      as={motion.div}\r
                      initial={{ opacity: 0, y: -24 }}\r
                      animate={{ opacity: 1, y: 0 }}\r
                      exit={{ opacity: 0, y: -24 }}\r
                      className='origin-top text-xs text-bodytext mt-2'>\r
                      Lorem ipsum dolor sit amet, consectetur adipisici elit…’\r
                      (complete text) is dummy text that is not meant to mean\r
                      anything. It is used as a placeholder in magazine\r
                      layouts,Lorem ipsum dolor sit amet, consectetur adipisici\r
                      elit…’ (complete text) is dummy text that is not meant to\r
                      mean anything. It is used as a placeholder in magazine\r
                      layouts,\r
                    </DisclosurePanel>\r
                  )}\r
                </AnimatePresence>\r
              </div>\r
            </>\r
          )}\r
        </Disclosure>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default FramerMotionCode\r
`,Le=`import { forwardRef } from 'react'\r
import {\r
  Disclosure,\r
  DisclosureButton,\r
  DisclosurePanel,\r
} from '@headlessui/react'\r
import { Icon } from '@iconify/react'\r
let MyCustomButton = forwardRef(function (props: any, ref: any) {\r
  return <button className='...' ref={ref} {...props} />\r
})\r
\r
const RenderDiclosureCode = () => {\r
  return (\r
    <div className='w-fit'>\r
      <Disclosure as='div'>\r
        <DisclosureButton\r
          as={MyCustomButton}\r
          className='group bg-secondary ui-button w-full'>\r
          What languages do you support?\r
          <Icon\r
            icon='solar:alt-arrow-down-outline'\r
            height={18}\r
            className='size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180'\r
          />\r
        </DisclosureButton>\r
        <DisclosurePanel as='ul' className='px-4 py-3'>\r
          <li className='py-1'>HTML</li>\r
          <li className='py-1'>CSS</li>\r
          <li className='py-1'>JavaScript</li>\r
        </DisclosurePanel>\r
      </Disclosure>\r
    </div>\r
  )\r
}\r
\r
export default RenderDiclosureCode\r
`,Te=`import {\r
  Disclosure,\r
  DisclosureButton,\r
  DisclosurePanel,\r
} from '@headlessui/react'\r
import { Icon } from '@iconify/react'\r
\r
const TransitionCode = () => {\r
  return (\r
    <div>\r
      <div className='w-full divide-y divide-border dark:divide-darkborder rounded-xl bg-lightgray dark:bg-dark'>\r
        <Disclosure as='div' className='py-4 px-6' defaultOpen={true}>\r
          <DisclosureButton className='group flex w-full items-center justify-between'>\r
            <span className='text-sm font-medium text-ld group-data-[hover]:text-primary'>\r
              What is your refund policy?\r
            </span>\r
            <Icon\r
              icon='solar:alt-arrow-down-outline'\r
              height={18}\r
              className='size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180'\r
            />\r
          </DisclosureButton>\r
          <DisclosurePanel\r
            transition\r
            className='mt-2 text-xs text-bodytext origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0'>\r
            Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete\r
            text) is dummy text that is not meant to mean anything. It is used\r
            as a placeholder in magazine\r
          </DisclosurePanel>\r
        </Disclosure>\r
        <Disclosure as='div' className='py-4 px-6'>\r
          <DisclosureButton className='group flex w-full items-center justify-between'>\r
            <span className='text-sm font-medium text-ld group-data-[hover]:text-primary'>\r
              Can I reserve a magazine?\r
            </span>\r
            <Icon\r
              icon='solar:alt-arrow-down-outline'\r
              height={18}\r
              className='size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180'\r
            />\r
          </DisclosureButton>\r
          <DisclosurePanel\r
            transition\r
            className='mt-2 text-xs text-bodytext origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0'>\r
            Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete\r
            text) is dummy text that is not meant to mean anything. It is used\r
            as a placeholder in magazine\r
          </DisclosurePanel>\r
        </Disclosure>\r
        <Disclosure as='div' className='py-4 px-6'>\r
          <DisclosureButton className='group flex w-full items-center justify-between'>\r
            <span className='text-sm font-medium text-ld group-data-[hover]:text-primary'>\r
              Do I have the right to return an item?\r
            </span>\r
            <Icon\r
              icon='solar:alt-arrow-down-outline'\r
              height={18}\r
              className='size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180'\r
            />\r
          </DisclosureButton>\r
          <DisclosurePanel\r
            transition\r
            className='mt-2 text-xs text-bodytext origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0'>\r
            Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete\r
            text) is dummy text that is not meant to mean anything. It is used\r
            as a placeholder in magazine\r
          </DisclosurePanel>\r
        </Disclosure>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default TransitionCode\r
`,Me=()=>e.jsx("div",{children:e.jsxs("div",{className:"w-full  divide-y divide-border dark:divide-darkborder rounded-xl bg-lightgray dark:bg-dark",children:[e.jsxs(x,{as:"div",className:"py-4 px-6",defaultOpen:!0,children:[e.jsxs(c,{className:"group flex w-full items-center justify-between",children:[e.jsx("span",{className:"text-sm font-medium text-ld group-data-[hover]:text-primary",children:"What is your refund policy?"}),e.jsx(p,{icon:"solar:alt-arrow-down-outline",height:18,className:"size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"})]}),e.jsx(d,{className:"mt-2 text-xs text-bodytext",children:"Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine"})]}),e.jsxs(x,{as:"div",className:"py-4 px-6",children:[e.jsxs(c,{className:"group flex w-full items-center justify-between",children:[e.jsx("span",{className:"text-sm font-medium text-ld group-data-[hover]:text-primary",children:"Can I reserve a magazine?"}),e.jsx(p,{icon:"solar:alt-arrow-down-outline",height:18,className:"size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"})]}),e.jsx(d,{className:"mt-2 text-xs text-bodytext",children:"Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine"})]}),e.jsxs(x,{as:"div",className:"py-4 px-6",children:[e.jsxs(c,{className:"group flex w-full items-center justify-between",children:[e.jsx("span",{className:"text-sm font-medium text-ld group-data-[hover]:text-primary",children:"Do I have the right to return an item?"}),e.jsx(p,{icon:"solar:alt-arrow-down-outline",height:18,className:"size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"})]}),e.jsx(d,{className:"mt-2 text-xs text-bodytext",children:"Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine"})]})]})}),Fe=()=>e.jsx(k,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Basic Disclosure"}),e.jsx(Me,{})]})})}),Re=({children:t})=>e.jsx("a",{href:"/samplepage",children:t}),Ae=()=>e.jsx("div",{children:e.jsxs(x,{children:[e.jsxs(c,{className:"group bg-primary ui-button",children:["Open mobile menu",e.jsx(p,{icon:"solar:alt-arrow-down-outline",height:18,className:"size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"})]}),e.jsx(d,{className:"px-4 py-1",children:e.jsx(he,{as:Re,children:"Go with your link"})})]})}),Oe=()=>e.jsx("div",{children:e.jsx(k,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Closing Disclosures Manually"}),e.jsx(Ae,{})]})})})}),We=()=>e.jsx("div",{children:e.jsxs("div",{className:"w-full divide-y divide-border dark:divide-darkborder rounded-xl bg-lightgray dark:bg-dark",children:[e.jsx(x,{as:"div",className:"py-4 px-6",children:({open:t})=>e.jsxs(e.Fragment,{children:[e.jsxs(c,{className:"group flex w-full items-center justify-between",children:[e.jsx("span",{className:"text-sm font-medium text-ld group-data-[hover]:text-primary",children:"What is your refund policy?"}),e.jsx(p,{icon:"solar:alt-arrow-down-outline",height:18,className:"size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"})]}),e.jsx("div",{className:"overflow-hidden",children:e.jsx($,{children:t&&e.jsx(d,{static:!0,as:L.div,initial:{opacity:0,y:-24},animate:{opacity:1,y:0},exit:{opacity:0,y:-24},className:"origin-top text-xs mt-2 text-bodytext",children:"Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts,Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts,"})})})]})}),e.jsx(x,{as:"div",className:"py-4 px-6",children:({open:t})=>e.jsxs(e.Fragment,{children:[e.jsxs(c,{className:"group flex w-full items-center justify-between",children:[e.jsx("span",{className:"text-sm font-medium text-ld group-data-[hover]:text-primary",children:"Can I reserve a magazine?"}),e.jsx(p,{icon:"solar:alt-arrow-down-outline",height:18,className:"size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"})]}),e.jsx("div",{className:"overflow-hidden",children:e.jsx($,{children:t&&e.jsx(d,{static:!0,as:L.div,initial:{opacity:0,y:-24},animate:{opacity:1,y:0},exit:{opacity:0,y:-24},className:"origin-top text-xs text-bodytext mt-2",children:"Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts,Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts,"})})})]})}),e.jsx(x,{as:"div",className:"py-4 px-6",children:({open:t})=>e.jsxs(e.Fragment,{children:[e.jsxs(c,{className:"group flex w-full items-center justify-between",children:[e.jsx("span",{className:"text-sm font-medium text-ld group-data-[hover]:text-primary",children:"Do I have the right to return an item?"}),e.jsx(p,{icon:"solar:alt-arrow-down-outline",height:18,className:"size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"})]}),e.jsx("div",{className:"overflow-hidden",children:e.jsx($,{children:t&&e.jsx(d,{static:!0,as:L.div,initial:{opacity:0,y:-24},animate:{opacity:1,y:0},exit:{opacity:0,y:-24},className:"origin-top text-xs text-bodytext mt-2",children:"Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts,Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts,"})})})]})})]})}),He=()=>e.jsx("div",{children:e.jsx(k,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Disclosure With Framer Motion"}),e.jsx(We,{})]})})})});let Ke=a.forwardRef(function(t,r){return e.jsx("button",{className:"...",ref:r,...t})});const Ve=()=>e.jsx("div",{className:"w-fit",children:e.jsxs(x,{as:"div",children:[e.jsxs(c,{as:Ke,className:"group bg-secondary ui-button w-full",children:["What languages do you support?",e.jsx(p,{icon:"solar:alt-arrow-down-outline",height:18,className:"size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"})]}),e.jsxs(d,{as:"ul",className:"px-4 py-3",children:[e.jsx("li",{className:"py-1",children:"HTML"}),e.jsx("li",{className:"py-1",children:"CSS"}),e.jsx("li",{className:"py-1",children:"JavaScript"})]})]})}),Ge=()=>e.jsx("div",{children:e.jsx(k,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Rendering As Different Elements"}),e.jsx(Ve,{})]})})})}),Je=()=>e.jsx("div",{children:e.jsxs("div",{className:"w-full divide-y divide-border dark:divide-darkborder rounded-xl bg-lightgray dark:bg-dark",children:[e.jsxs(x,{as:"div",className:"py-4 px-6",defaultOpen:!0,children:[e.jsxs(c,{className:"group flex w-full items-center justify-between",children:[e.jsx("span",{className:"text-sm font-medium text-ld group-data-[hover]:text-primary",children:"What is your refund policy?"}),e.jsx(p,{icon:"solar:alt-arrow-down-outline",height:18,className:"size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"})]}),e.jsx(d,{transition:!0,className:"mt-2 text-xs text-bodytext origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0",children:"Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine"})]}),e.jsxs(x,{as:"div",className:"py-4 px-6",children:[e.jsxs(c,{className:"group flex w-full items-center justify-between",children:[e.jsx("span",{className:"text-sm font-medium text-ld group-data-[hover]:text-primary",children:"Can I reserve a magazine?"}),e.jsx(p,{icon:"solar:alt-arrow-down-outline",height:18,className:"size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"})]}),e.jsx(d,{transition:!0,className:"mt-2 text-xs text-bodytext origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0",children:"Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine"})]}),e.jsxs(x,{as:"div",className:"py-4 px-6",children:[e.jsxs(c,{className:"group flex w-full items-center justify-between",children:[e.jsx("span",{className:"text-sm font-medium text-ld group-data-[hover]:text-primary",children:"Do I have the right to return an item?"}),e.jsx(p,{icon:"solar:alt-arrow-down-outline",height:18,className:"size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"})]}),e.jsx(d,{transition:!0,className:"mt-2 text-xs text-bodytext origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0",children:"Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine"})]})]})}),Ue=()=>e.jsx("div",{children:e.jsx(k,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Transitions Disclosure"}),e.jsx(Je,{})]})})})}),Xe=[{to:"/",title:"Home"},{title:"Disclosure"}],It=()=>e.jsxs(e.Fragment,{children:[e.jsx(ye,{title:"Disclosure",items:Xe}),e.jsxs("div",{className:"grid grid-cols-12 gap-7",children:[e.jsxs("div",{className:"col-span-12",children:[e.jsx(Fe,{}),e.jsx(z,{children:Ee})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Ue,{}),e.jsx(z,{children:Te})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Oe,{}),e.jsx(z,{children:Se})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Ge,{}),e.jsx(z,{children:Le})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(He,{}),e.jsx(z,{children:$e})]})]})]});export{It as default};
