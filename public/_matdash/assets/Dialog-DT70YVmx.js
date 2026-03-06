import{r as o,R as u,j as e}from"./index-hJ2SD4IE.js";import{C as A}from"./CodeDialog-BfgoSlBj.js";import{C as R}from"./card-lwgsVE9g.js";import{o as Pe}from"./keyboard-C1Wiwm26.js";import{E as fe}from"./use-event-listener-rrs4PgOc.js";import{I as _,u as xe,c as Se,e as Ae,x as Be,S as Re,k as ze,f as Me,p as We,l as le,t as Ye,X as Le}from"./portal-ClApNzv1.js";import{n as ge,Y as I,o as O,u as X,p as Ge,K as z,t as be,a as G,A as se}from"./render-D4HeI6Nr.js";import{y as Ke}from"./use-inert-others-YGvWIlJe.js";import{u as He,a as W,j as oe,x as Ve,S as Ue}from"./use-tab-direction-BXTGf5o0.js";import{l as he,O as ve,K as qe}from"./transition-BIOkyELt.js";import{y as K}from"./use-sync-refs-DDif7ltm.js";import{C as Qe}from"./close-provider-DcGvuaeM.js";import{u as ye,i as Y,s as Xe}from"./open-closed-mLyGyCh_.js";import{M as H,H as _e}from"./description-GQA3je54.js";import{f as we}from"./use-is-mounted-CESGucCS.js";import{m as J,n as Q}from"./active-element-history-CHrXP6Dj.js";import{f as ie,s as ce}from"./hidden-TglnW24O.js";import{n as L,i as ue,t as Je}from"./dom-BlW_0b_t.js";import{v as B,T as w,w as v,A as de}from"./focus-management-DBfrIV_1.js";import{d as Ze}from"./owner-Bbldmi17.js";import{A as et}from"./index-CqC0nXvj.js";import{m as me}from"./proxy-DeSjhgnm.js";import{B as tt}from"./BreadcrumbComp-O0ZCyfoZ.js";import"./index-u1GrS9Dt.js";import"./vsc-dark-plus-BS5XCmWA.js";import"./highlight-C_eLAOnJ.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./with-selector-q44Gv6ju.js";import"./disabled-CuDhUv8O.js";import"./CardBox-B317o365.js";import"./chevron-right-Dqa42BwH.js";import"./createLucideIcon-sKS6wsf3.js";const nt=`import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'\r
import { useState } from 'react'\r
\r
const BasicDialodCode = () => {\r
  let [isOpen, setIsOpen] = useState(false)\r
\r
  function open() {\r
    setIsOpen(true)\r
  }\r
\r
  function close() {\r
    setIsOpen(false)\r
  }\r
\r
  return (\r
    <div>\r
      <button onClick={open} className='ui-button bg-primary justify-center'>\r
        Open Dialog\r
      </button>\r
\r
      <Dialog\r
        open={isOpen}\r
        as='div'\r
        className='relative z-10 focus:outline-none'\r
        onClose={close}>\r
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>\r
          <div className='flex min-h-full items-center justify-center p-4'>\r
            <DialogPanel\r
              transition\r
              className='w-full max-w-md rounded-lg bg-white dark:bg-darkgray p-6 shadow-md dark:dark-shadow-md backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'>\r
              <DialogTitle as='h3' className='text-lg font-semibold text-ld'>\r
                Payment successful\r
              </DialogTitle>\r
              <p className='mt-2 text-sm text-bodytext'>\r
                Your payment has been successfully submitted. We’ve sent you an\r
                email with all of the details of your order.\r
              </p>\r
              <div className='mt-4 flex gap-3'>\r
                <button\r
                  className='ui-button-small px-6 bg-info'\r
                  onClick={close}>\r
                  Got it, thanks!\r
                </button>\r
                <button\r
                  onClick={() => setIsOpen(false)}\r
                  className='ui-button-small bg-error px-6'>\r
                  Cancel\r
                </button>\r
              </div>\r
            </DialogPanel>\r
          </div>\r
        </div>\r
      </Dialog>\r
    </div>\r
  )\r
}\r
\r
export default BasicDialodCode\r
`,rt=`import {\r
  Description,\r
  Dialog,\r
  DialogPanel,\r
  DialogTitle,\r
} from '@headlessui/react'\r
import { AnimatePresence, motion } from 'framer-motion'\r
import { useState } from 'react'\r
\r
const FramerMotionDialogCode = () => {\r
  let [isOpen, setIsOpen] = useState(false)\r
\r
  return (\r
    <div>\r
      <button\r
        onClick={() => setIsOpen(true)}\r
        className='ui-button bg-warning justify-center'>\r
        Open dialog\r
      </button>\r
      <AnimatePresence>\r
        {isOpen && (\r
          <Dialog\r
            static\r
            open={isOpen}\r
            onClose={() => setIsOpen(false)}\r
            className='relative z-50'>\r
            <motion.div\r
              initial={{ opacity: 0 }}\r
              animate={{ opacity: 1 }}\r
              exit={{ opacity: 0 }}\r
              className='fixed inset-0 bg-black/30'\r
            />\r
            <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>\r
              <DialogPanel\r
                as={motion.div}\r
                initial={{ opacity: 0, scale: 0.95 }}\r
                animate={{ opacity: 1, scale: 1 }}\r
                exit={{ opacity: 0, scale: 0.95 }}\r
                className='w-full max-w-md rounded-lg bg-white dark:bg-darkgray p-6 shadow-md dark:dark-shadow-md'>\r
                <DialogTitle className='text-lg font-semibold text-ld'>\r
                  Framer Motion Dialog\r
                </DialogTitle>\r
                <Description className='mt-2 text-sm text-bodytext'>\r
                  This will permanently deactivate your account\r
                </Description>\r
                <p className='mt-2 text-sm text-bodytext'>\r
                  Are you sure you want to deactivate your account? All of your\r
                  data will be permanently removed.\r
                </p>\r
                <div className='flex gap-3 mt-5'>\r
                  <button\r
                    onClick={() => setIsOpen(false)}\r
                    className='ui-button-small px-6 bg-error'>\r
                    Cancel\r
                  </button>\r
                  <button\r
                    onClick={() => setIsOpen(false)}\r
                    className='ui-button-small px-6 bg-warning'>\r
                    Deactivate\r
                  </button>\r
                </div>\r
              </DialogPanel>\r
            </div>\r
          </Dialog>\r
        )}\r
      </AnimatePresence>\r
    </div>\r
  )\r
}\r
\r
export default FramerMotionDialogCode\r
`,at=`import {\r
  Description,\r
  Dialog,\r
  DialogPanel,\r
  DialogTitle,\r
} from '@headlessui/react'\r
import { useState } from 'react'\r
\r
const ScrollableDialogCode = () => {\r
  let [isOpen, setIsOpen] = useState(false)\r
\r
  return (\r
    <div>\r
      <button\r
        onClick={() => setIsOpen(true)}\r
        className='ui-button bg-success justify-center'>\r
        Open Dialog\r
      </button>\r
      <Dialog\r
        open={isOpen}\r
        onClose={() => setIsOpen(false)}\r
        className='z-50 realtive'>\r
        <div className='fixed inset-0 w-screen overflow-y-auto p-4'>\r
          <div className='flex min-h-full items-center justify-center'>\r
            <DialogPanel className='max-w-lg space-y-4 rounded-lg bg-white dark:bg-darkgray p-6 shadow-md dark:dark-shadow-md backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'>\r
              <DialogTitle className='text-lg font-semibold text-ld '>\r
                Deactivate account\r
              </DialogTitle>\r
              <Description className='mt-3 text-sm text-bodytext'>\r
                This will permanently deactivate your account\r
              </Description>\r
              <p className='mt-2 text-sm text-bodytext'>\r
                Are you sure you want to deactivate your account? All of your\r
                data will be permanently removed.\r
              </p>\r
              <div className='flex gap-3 mt-3'>\r
                <button\r
                  className='ui-button-small px-6 bg-info'\r
                  onClick={() => setIsOpen(false)}>\r
                  Cancel\r
                </button>\r
                <button\r
                  onClick={() => setIsOpen(false)}\r
                  className='ui-button-small bg-error px-6'>\r
                  Deactivate\r
                </button>\r
              </div>\r
            </DialogPanel>\r
          </div>\r
        </div>\r
      </Dialog>\r
    </div>\r
  )\r
}\r
\r
export default ScrollableDialogCode\r
`,lt=`import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'\r
import { useState } from 'react'\r
\r
const TransitionDialogCode = () => {\r
  let [isOpen, setIsOpen] = useState(false)\r
\r
  return (\r
    <div>\r
      <button\r
        onClick={() => setIsOpen(true)}\r
        className='ui-button bg-error justify-center'>\r
        Open Dialog\r
      </button>\r
\r
      <Dialog\r
        open={isOpen}\r
        onClose={() => setIsOpen(false)}\r
        transition\r
        className='fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0 z-50'>\r
        <div className='fixed inset-0 z-50 w-screen overflow-y-auto'>\r
          <div className='flex min-h-full items-center justify-center p-4'>\r
            <DialogPanel\r
              transition\r
              className='w-full max-w-md rounded-lg bg-white dark:bg-darkgray p-6 shadow-md dark:dark-shadow-md '>\r
              <DialogTitle as='h3' className='text-lg font-semibold text-ld'>\r
                Transition Dialog\r
              </DialogTitle>\r
              <p className='mt-2 text-sm text-bodytext'>\r
                Your payment has been successfully submitted. We’ve sent you an\r
                email with all of the details of your order.\r
              </p>\r
              <div className='mt-4 flex gap-3'>\r
                <button\r
                  className='ui-button-small px-6 bg-info'\r
                  onClick={() => setIsOpen(false)}>\r
                  Got it, thanks!\r
                </button>\r
                <button\r
                  onClick={() => setIsOpen(false)}\r
                  className='ui-button-small bg-error px-6'>\r
                  Cancel\r
                </button>\r
              </div>\r
            </DialogPanel>\r
          </div>\r
        </div>\r
      </Dialog>\r
    </div>\r
  )\r
}\r
\r
export default TransitionDialogCode\r
`,st=`import { useState } from 'react'\r
import {\r
  Description,\r
  Dialog,\r
  DialogBackdrop,\r
  DialogPanel,\r
  DialogTitle,\r
} from '@headlessui/react'\r
\r
const WithBackdropCode = () => {\r
  let [isOpen, setIsOpen] = useState(false)\r
  return (\r
    <div>\r
      <button\r
        onClick={() => setIsOpen(true)}\r
        className='ui-button bg-secondary justify-center'>\r
        Open Dialog\r
      </button>\r
      <Dialog\r
        open={isOpen}\r
        onClose={() => setIsOpen(false)}\r
        className='relative z-50'>\r
        {/* The backdrop, rendered as a fixed sibling to the panel container */}\r
        <DialogBackdrop className='fixed inset-0 bg-black/30' />\r
\r
        {/* Full-screen container to center the panel */}\r
        <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>\r
          {/* The actual dialog panel  */}\r
          <DialogPanel\r
            transition\r
            className='w-full max-w-md rounded-lg bg-white dark:bg-darkgray p-6 shadow-md dark:dark-shadow-md backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'>\r
            <DialogTitle className='text-lg font-semibold text-ld'>\r
              Deactivate account\r
            </DialogTitle>\r
            <Description className='mt-2 text-sm text-bodytext'>\r
              This will permanently deactivate your account\r
            </Description>\r
            <p className='mt-2 text-sm text-bodytext'>\r
              Are you sure you want to deactivate your account? All of your data\r
              will be permanently removed.\r
            </p>\r
            <div className='flex gap-3 mt-4'>\r
              <button\r
                onClick={() => setIsOpen(false)}\r
                className='ui-button-small bg-error'>\r
                Cancel\r
              </button>\r
              <button\r
                onClick={() => setIsOpen(false)}\r
                className='ui-button-small bg-warning'>\r
                Deactivate\r
              </button>\r
            </div>\r
          </DialogPanel>\r
        </div>\r
      </Dialog>\r
    </div>\r
  )\r
}\r
\r
export default WithBackdropCode\r
`;function ot(t,n=typeof document<"u"?document.defaultView:null,r){let a=_(t,"escape");fe(n,"keydown",l=>{a&&(l.defaultPrevented||l.key===Pe.Escape&&r(l))})}function it(){var t;let[n]=o.useState(()=>typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(pointer: coarse)"):null),[r,a]=o.useState((t=n==null?void 0:n.matches)!=null?t:!1);return ge(()=>{if(!n)return;function l(i){a(i.matches)}return n.addEventListener("change",l),()=>n.removeEventListener("change",l)},[n]),r}function Ne(t){if(!t)return new Set;if(typeof t=="function")return new Set(t());let n=new Set;for(let r of t.current)Je(r.current)&&n.add(r.current);return n}let ct="div";var C=(t=>(t[t.None=0]="None",t[t.InitialFocus=1]="InitialFocus",t[t.TabLock=2]="TabLock",t[t.FocusLock=4]="FocusLock",t[t.RestoreFocus=8]="RestoreFocus",t[t.AutoFocus=16]="AutoFocus",t))(C||{});function ut(t,n){let r=o.useRef(null),a=K(r,n),{initialFocus:l,initialFocusFallback:i,containers:d,features:s=15,...m}=t;he()||(s=0);let c=xe(r.current);ft(s,{ownerDocument:c});let f=xt(s,{ownerDocument:c,container:r,initialFocus:l,initialFocusFallback:i});gt(s,{ownerDocument:c,container:r,containers:d,previousActiveElement:f});let T=He(),N=O(x=>{if(!L(r.current))return;let k=r.current;(g=>g())(()=>{X(T.current,{[W.Forwards]:()=>{B(k,w.First,{skipElements:[x.relatedTarget,i]})},[W.Backwards]:()=>{B(k,w.Last,{skipElements:[x.relatedTarget,i]})}})})}),h=_(!!(s&2),"focus-trap#tab-lock"),b=Ge(),j=o.useRef(!1),D={ref:a,onKeyDown(x){x.key=="Tab"&&(j.current=!0,b.requestAnimationFrame(()=>{j.current=!1}))},onBlur(x){if(!(s&4))return;let k=Ne(d);L(r.current)&&k.add(r.current);let g=x.relatedTarget;ue(g)&&g.dataset.headlessuiFocusGuard!=="true"&&(je(k,g)||(j.current?B(r.current,X(T.current,{[W.Forwards]:()=>w.Next,[W.Backwards]:()=>w.Previous})|w.WrapAround,{relativeTo:x.target}):ue(x.target)&&v(x.target)))}},y=z();return u.createElement(u.Fragment,null,h&&u.createElement(ie,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:N,features:ce.Focusable}),y({ourProps:D,theirProps:m,defaultTag:ct,name:"FocusTrap"}),h&&u.createElement(ie,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:N,features:ce.Focusable}))}let dt=I(ut),mt=Object.assign(dt,{features:C});function pt(t=!0){let n=o.useRef(Q.slice());return J(([r],[a])=>{a===!0&&r===!1&&be(()=>{n.current.splice(0)}),a===!1&&r===!0&&(n.current=Q.slice())},[t,Q,n]),O(()=>{var r;return(r=n.current.find(a=>a!=null&&a.isConnected))!=null?r:null})}function ft(t,{ownerDocument:n}){let r=!!(t&8),a=pt(r);J(()=>{r||Ze(n==null?void 0:n.body)&&v(a())},[r]),Se(()=>{r&&v(a())})}function xt(t,{ownerDocument:n,container:r,initialFocus:a,initialFocusFallback:l}){let i=o.useRef(null),d=_(!!(t&1),"focus-trap#initial-focus"),s=we();return J(()=>{if(t===0)return;if(!d){l!=null&&l.current&&v(l.current);return}let m=r.current;m&&be(()=>{if(!s.current)return;let c=n==null?void 0:n.activeElement;if(a!=null&&a.current){if((a==null?void 0:a.current)===c){i.current=c;return}}else if(m.contains(c)){i.current=c;return}if(a!=null&&a.current)v(a.current);else{if(t&16){if(B(m,w.First|w.AutoFocus)!==de.Error)return}else if(B(m,w.First)!==de.Error)return;if(l!=null&&l.current&&(v(l.current),(n==null?void 0:n.activeElement)===l.current))return;console.warn("There are no focusable elements inside the <FocusTrap />")}i.current=n==null?void 0:n.activeElement})},[l,d,t]),i}function gt(t,{ownerDocument:n,container:r,containers:a,previousActiveElement:l}){let i=we(),d=!!(t&4);fe(n==null?void 0:n.defaultView,"focus",s=>{if(!d||!i.current)return;let m=Ne(a);L(r.current)&&m.add(r.current);let c=l.current;if(!c)return;let f=s.target;L(f)?je(m,f)?(l.current=f,v(f)):(s.preventDefault(),s.stopPropagation(),v(c)):v(l.current)},!0)}function je(t,n){for(let r of t)if(r.contains(n))return!0;return!1}var bt=(t=>(t[t.Open=0]="Open",t[t.Closed=1]="Closed",t))(bt||{}),ht=(t=>(t[t.SetTitleId=0]="SetTitleId",t))(ht||{});let vt={0(t,n){return t.titleId===n.id?t:{...t,titleId:n.id}}},Z=o.createContext(null);Z.displayName="DialogContext";function V(t){let n=o.useContext(Z);if(n===null){let r=new Error(`<${t} /> is missing a parent <Dialog /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,V),r}return n}function yt(t,n){return X(n.type,vt,t,n)}let pe=I(function(t,n){let r=o.useId(),{id:a=`headlessui-dialog-${r}`,open:l,onClose:i,initialFocus:d,role:s="dialog",autoFocus:m=!0,__demoMode:c=!1,unmount:f=!1,...T}=t,N=o.useRef(!1);s=function(){return s==="dialog"||s==="alertdialog"?s:(N.current||(N.current=!0,console.warn(`Invalid role [${s}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)),"dialog")}();let h=ye();l===void 0&&h!==null&&(l=(h&Y.Open)===Y.Open);let b=o.useRef(null),j=K(b,n),D=xe(b.current),y=l?0:1,[x,k]=o.useReducer(yt,{titleId:null,descriptionId:null,panelRef:o.createRef()}),g=O(()=>i(!1)),ee=O(p=>k({type:0,id:p})),F=he()?y===0:!1,[De,ke]=Ae(),Ce={get current(){var p;return(p=x.panelRef.current)!=null?p:b.current}},U=Ve(),{resolveContainers:q}=Ue({mainTreeNode:U,portals:De,defaultContainers:[Ce]}),te=h!==null?(h&Y.Closing)===Y.Closing:!1;Ke(c||te?!1:F,{allowed:O(()=>{var p,ae;return[(ae=(p=b.current)==null?void 0:p.closest("[data-headlessui-portal]"))!=null?ae:null]}),disallowed:O(()=>{var p;return[(p=U==null?void 0:U.closest("body > *:not(#headlessui-portal-root)"))!=null?p:null]})});let E=Be.get(null);ge(()=>{if(F)return E.actions.push(a),()=>E.actions.pop(a)},[E,a,F]);let ne=Re(E,o.useCallback(p=>E.selectors.isTop(p,a),[E,a]));ze(ne,q,p=>{p.preventDefault(),g()}),ot(ne,D==null?void 0:D.defaultView,p=>{p.preventDefault(),p.stopPropagation(),document.activeElement&&"blur"in document.activeElement&&typeof document.activeElement.blur=="function"&&document.activeElement.blur(),g()}),Me(c||te?!1:F,D,q),We(F,b,g);let[Oe,Te]=_e(),Fe=o.useMemo(()=>[{dialogState:y,close:g,setTitleId:ee,unmount:f},x],[y,g,ee,f,x]),re=G({open:y===0}),Ee={ref:j,id:a,role:s,tabIndex:-1,"aria-modal":c?void 0:y===0?!0:void 0,"aria-labelledby":x.titleId,"aria-describedby":Oe,unmount:f},Ie=!it(),S=C.None;F&&!c&&(S|=C.RestoreFocus,S|=C.TabLock,m&&(S|=C.AutoFocus),Ie&&(S|=C.InitialFocus));let $e=z();return u.createElement(Xe,null,u.createElement(le,{force:!0},u.createElement(Ye,null,u.createElement(Z.Provider,{value:Fe},u.createElement(Le,{target:b},u.createElement(le,{force:!1},u.createElement(Te,{slot:re},u.createElement(ke,null,u.createElement(mt,{initialFocus:d,initialFocusFallback:b,containers:q,features:S},u.createElement(Qe,{value:g},$e({ourProps:Ee,theirProps:T,slot:re,defaultTag:wt,features:Nt,visible:y===0,name:"Dialog"})))))))))))}),wt="div",Nt=se.RenderStrategy|se.Static;function jt(t,n){let{transition:r=!1,open:a,...l}=t,i=ye(),d=t.hasOwnProperty("open")||i!==null,s=t.hasOwnProperty("onClose");if(!d&&!s)throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");if(!d)throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");if(!s)throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");if(!i&&typeof t.open!="boolean")throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${t.open}`);if(typeof t.onClose!="function")throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${t.onClose}`);return(a!==void 0||r)&&!l.static?u.createElement(oe,null,u.createElement(qe,{show:a,transition:r,unmount:l.unmount},u.createElement(pe,{ref:n,...l}))):u.createElement(oe,null,u.createElement(pe,{ref:n,open:a,...l}))}let Dt="div";function kt(t,n){let r=o.useId(),{id:a=`headlessui-dialog-panel-${r}`,transition:l=!1,...i}=t,[{dialogState:d,unmount:s},m]=V("Dialog.Panel"),c=K(n,m.panelRef),f=G({open:d===0}),T=O(D=>{D.stopPropagation()}),N={ref:c,id:a,onClick:T},h=l?ve:o.Fragment,b=l?{unmount:s}:{},j=z();return u.createElement(h,{...b},j({ourProps:N,theirProps:i,slot:f,defaultTag:Dt,name:"Dialog.Panel"}))}let Ct="div";function Ot(t,n){let{transition:r=!1,...a}=t,[{dialogState:l,unmount:i}]=V("Dialog.Backdrop"),d=G({open:l===0}),s={ref:n,"aria-hidden":!0},m=r?ve:o.Fragment,c=r?{unmount:i}:{},f=z();return u.createElement(m,{...c},f({ourProps:s,theirProps:a,slot:d,defaultTag:Ct,name:"Dialog.Backdrop"}))}let Tt="h2";function Ft(t,n){let r=o.useId(),{id:a=`headlessui-dialog-title-${r}`,...l}=t,[{dialogState:i,setTitleId:d}]=V("Dialog.Title"),s=K(n);o.useEffect(()=>(d(a),()=>d(null)),[a,d]);let m=G({open:i===0}),c={ref:s,id:a};return z()({ourProps:c,theirProps:l,slot:m,defaultTag:Tt,name:"Dialog.Title"})}let Et=I(jt),$=I(kt),It=I(Ot),P=I(Ft),M=Object.assign(Et,{Panel:$,Title:P,Description:H});const $t=()=>{let[t,n]=o.useState(!1);function r(){n(!0)}function a(){n(!1)}return e.jsxs("div",{children:[e.jsx("button",{onClick:r,className:"ui-button bg-primary justify-center",children:"Open Dialog"}),e.jsx(M,{open:t,as:"div",className:"relative z-10 focus:outline-none",onClose:a,children:e.jsx("div",{className:"fixed inset-0 z-10 w-screen overflow-y-auto",children:e.jsx("div",{className:"flex min-h-full items-center justify-center p-4",children:e.jsxs($,{transition:!0,className:"w-full max-w-md rounded-lg bg-white dark:bg-darkgray p-6 shadow-md dark:dark-shadow-md backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0",children:[e.jsx(P,{as:"h3",className:"text-lg font-semibold text-ld",children:"Payment successful"}),e.jsx("p",{className:"mt-2 text-sm text-bodytext",children:"Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order."}),e.jsxs("div",{className:"mt-4 flex gap-3",children:[e.jsx("button",{className:"ui-button-small px-6 bg-info",onClick:a,children:"Got it, thanks!"}),e.jsx("button",{onClick:()=>n(!1),className:"ui-button-small bg-error px-6",children:"Cancel"})]})]})})})})]})},Pt=()=>e.jsx("div",{children:e.jsx(R,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Rounded Inputs form"}),e.jsx($t,{})]})})})}),St=()=>{let[t,n]=o.useState(!1);return e.jsxs("div",{children:[e.jsx("button",{onClick:()=>n(!0),className:"ui-button bg-secondary justify-center",children:"Open Dialog"}),e.jsxs(M,{open:t,onClose:()=>n(!1),className:"relative z-50",children:[e.jsx(It,{className:"fixed inset-0 bg-black/30"}),e.jsx("div",{className:"fixed inset-0 flex w-screen items-center justify-center p-4",children:e.jsxs($,{transition:!0,className:"w-full max-w-md rounded-lg bg-white dark:bg-darkgray p-6 shadow-md dark:dark-shadow-md backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0",children:[e.jsx(P,{className:"text-lg font-semibold text-ld",children:"Deactivate account"}),e.jsx(H,{className:"mt-2 text-sm text-bodytext",children:"This will permanently deactivate your account"}),e.jsx("p",{className:"mt-2 text-sm text-bodytext",children:"Are you sure you want to deactivate your account? All of your data will be permanently removed."}),e.jsxs("div",{className:"flex gap-3 mt-4",children:[e.jsx("button",{onClick:()=>n(!1),className:"ui-button-small bg-error",children:"Cancel"}),e.jsx("button",{onClick:()=>n(!1),className:"ui-button-small bg-warning",children:"Deactivate"})]})]})})]})]})},At=()=>e.jsx("div",{children:e.jsx(R,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Dialog With Backdrop"}),e.jsx(St,{})]})})})}),Bt=()=>{let[t,n]=o.useState(!1);return e.jsxs("div",{children:[e.jsx("button",{onClick:()=>n(!0),className:"ui-button bg-warning justify-center",children:"Open dialog"}),e.jsx(et,{children:t&&e.jsxs(M,{static:!0,open:t,onClose:()=>n(!1),className:"relative z-50",children:[e.jsx(me.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 bg-black/30"}),e.jsx("div",{className:"fixed inset-0 flex w-screen items-center justify-center p-4",children:e.jsxs($,{as:me.div,initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},className:"w-full max-w-md rounded-lg bg-white dark:bg-darkgray p-6 shadow-md dark:dark-shadow-md",children:[e.jsx(P,{className:"text-lg font-semibold text-ld",children:"Framer Motion Dialog"}),e.jsx(H,{className:"mt-2 text-sm text-bodytext",children:"This will permanently deactivate your account"}),e.jsx("p",{className:"mt-2 text-sm text-bodytext",children:"Are you sure you want to deactivate your account? All of your data will be permanently removed."}),e.jsxs("div",{className:"flex gap-3 mt-5",children:[e.jsx("button",{onClick:()=>n(!1),className:"ui-button-small px-6 bg-error",children:"Cancel"}),e.jsx("button",{onClick:()=>n(!1),className:"ui-button-small px-6 bg-warning",children:"Deactivate"})]})]})})]})})]})},Rt=()=>e.jsx("div",{children:e.jsx(R,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Framer Motion Dialog"}),e.jsx(Bt,{})]})})})}),zt=()=>{let[t,n]=o.useState(!1);return e.jsxs("div",{children:[e.jsx("button",{onClick:()=>n(!0),className:"ui-button bg-success justify-center",children:"Open Dialog"}),e.jsx(M,{open:t,onClose:()=>n(!1),className:"z-50 realtive",children:e.jsx("div",{className:"fixed inset-0 w-screen overflow-y-auto p-4",children:e.jsx("div",{className:"flex min-h-full items-center justify-center",children:e.jsxs($,{className:"max-w-lg space-y-4 rounded-lg bg-white dark:bg-darkgray p-6 shadow-md dark:dark-shadow-md backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0",children:[e.jsx(P,{className:"text-lg font-semibold text-ld ",children:"Deactivate account"}),e.jsx(H,{className:"mt-3 text-sm text-bodytext",children:"This will permanently deactivate your account"}),e.jsx("p",{className:"mt-2 text-sm text-bodytext",children:"Are you sure you want to deactivate your account? All of your data will be permanently removed."}),e.jsxs("div",{className:"flex gap-3 mt-3",children:[e.jsx("button",{className:"ui-button-small px-6 bg-info",onClick:()=>n(!1),children:"Cancel"}),e.jsx("button",{onClick:()=>n(!1),className:"ui-button-small bg-error px-6",children:"Deactivate"})]})]})})})})]})},Mt=()=>e.jsx("div",{children:e.jsx(R,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Scrollable Dialog"}),e.jsx(zt,{})]})})})}),Wt=()=>{let[t,n]=o.useState(!1);return e.jsxs("div",{children:[e.jsx("button",{onClick:()=>n(!0),className:"ui-button bg-error justify-center",children:"Open Dialog"}),e.jsx(M,{open:t,onClose:()=>n(!1),transition:!0,className:"fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0 z-50",children:e.jsx("div",{className:"fixed inset-0 z-50 w-screen overflow-y-auto",children:e.jsx("div",{className:"flex min-h-full items-center justify-center p-4",children:e.jsxs($,{transition:!0,className:"w-full max-w-md rounded-lg bg-white dark:bg-darkgray p-6 shadow-md dark:dark-shadow-md ",children:[e.jsx(P,{as:"h3",className:"text-lg font-semibold text-ld",children:"Transition Dialog"}),e.jsx("p",{className:"mt-2 text-sm text-bodytext",children:"Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order."}),e.jsxs("div",{className:"mt-4 flex gap-3",children:[e.jsx("button",{className:"ui-button-small px-6 bg-info",onClick:()=>n(!1),children:"Got it, thanks!"}),e.jsx("button",{onClick:()=>n(!1),className:"ui-button-small bg-error px-6",children:"Cancel"})]})]})})})})]})},Yt=()=>e.jsx(R,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Transitions Dialog"}),e.jsx(Wt,{})]})})}),Lt=[{to:"/",title:"Home"},{title:"Dialog"}],kn=()=>e.jsxs(e.Fragment,{children:[e.jsx(tt,{title:"Dialog",items:Lt}),e.jsxs("div",{className:"grid grid-cols-12 gap-7",children:[e.jsxs("div",{className:"col-span-12",children:[e.jsx(Pt,{}),e.jsx(A,{children:nt})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(At,{}),e.jsx(A,{children:st})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Mt,{}),e.jsx(A,{children:at})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Yt,{}),e.jsx(A,{children:lt})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Rt,{}),e.jsx(A,{children:rt})]})]})]});export{kn as default};
