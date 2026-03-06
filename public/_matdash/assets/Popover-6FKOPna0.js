import{r as l,R as k,j as e}from"./index-DnCCvGy7.js";import{C as _}from"./CodeDialog-CpkCWLkI.js";import{$ as Le,a as ze}from"./useFocusRing-BrSZtp7z.js";import{w as Ve}from"./use-active-press-Br-zeXHT.js";import{F as He,y as Ye,R as Qe,T as Ze,w as qe,A as Ue}from"./floating-D_6juAuy.js";import{u as ee,Y as ne,o as j,a as ce,V as be,K as ue,n as Je,c as Se,A as he}from"./render-C57vWSTB.js";import{E as Xe}from"./use-event-listener-BkLJ1STJ.js";import{T as et,x as tt,c as rt,S as te,u as Ie,p as at,f as nt,t as ot,d as st,e as dt,k as it}from"./portal-DR2kcqlZ.js";import{e as lt}from"./use-resolve-button-type-DTROQ9Nz.js";import{u as Fe,x as ct,S as ut,j as Ae,a as L}from"./use-tab-direction-CXw8I1Bd.js";import{y as re,T as mt}from"./use-sync-refs-BiJlwbXn.js";import{u as Me,N as Oe,i as ae,x as Re,s as pt,c as ht}from"./open-closed-D-xlvcuf.js";import{C as De}from"./close-provider-jtdUDZ3H.js";import{f as ye,s as ke}from"./hidden-9Lbw2LUr.js";import{s as Te}from"./bugs-BJ7ScNGK.js";import{n as Ne,i as xt}from"./dom-BlW_0b_t.js";import{x as je,v as Q,T as z,H as vt,A as Pe,I as ft}from"./focus-management-BHGvY4IY.js";import{l as gt,e as le,r as we}from"./owner-BJvmbhZ9.js";import{o as Y}from"./keyboard-C1Wiwm26.js";import{C as G}from"./card-sr3AlwUz.js";import{y as bt}from"./close-button-DoRzSjTH.js";import{A as yt}from"./index-BJAUgXmE.js";import{m as kt}from"./proxy-8iZTi6sZ.js";import{B as Nt}from"./BreadcrumbComp-CkvqLna6.js";import"./index-CfcantPz.js";import"./vsc-dark-plus-DCm8Deni.js";import"./highlight-UM_loo16.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./with-selector-BIgJnxpl.js";import"./button-B-xebL10.js";import"./disabled-CGDlQYBP.js";import"./CardBox-BlybE14U.js";import"./chevron-right-KgmLBFR_.js";import"./createLucideIcon-Cw6eFU3v.js";var Pt=Object.defineProperty,jt=(t,n,r)=>n in t?Pt(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,Ee=(t,n,r)=>(jt(t,typeof n!="symbol"?n+"":n,r),r),g=(t=>(t[t.Open=0]="Open",t[t.Closed=1]="Closed",t))(g||{}),wt=(t=>(t[t.OpenPopover=0]="OpenPopover",t[t.ClosePopover=1]="ClosePopover",t[t.SetButton=2]="SetButton",t[t.SetButtonId=3]="SetButtonId",t[t.SetPanel=4]="SetPanel",t[t.SetPanelId=5]="SetPanelId",t))(wt||{});let Ct={0:t=>t.popoverState===0?t:{...t,popoverState:0,__demoMode:!1},1(t){return t.popoverState===1?t:{...t,popoverState:1,__demoMode:!1}},2(t,n){return t.button===n.button?t:{...t,button:n.button}},3(t,n){return t.buttonId===n.buttonId?t:{...t,buttonId:n.buttonId}},4(t,n){return t.panel===n.panel?t:{...t,panel:n.panel}},5(t,n){return t.panelId===n.panelId?t:{...t,panelId:n.panelId}}};class Ce extends et{constructor(n){super(n),Ee(this,"actions",{close:()=>this.send({type:1}),refocusableClose:r=>{this.actions.close();let h=r?Ne(r)?r:"current"in r&&Ne(r.current)?r.current:this.state.button:this.state.button;h==null||h.focus()},open:()=>this.send({type:0}),setButtonId:r=>this.send({type:3,buttonId:r}),setButton:r=>this.send({type:2,button:r}),setPanelId:r=>this.send({type:5,panelId:r}),setPanel:r=>this.send({type:4,panel:r})}),Ee(this,"selectors",{isPortalled:r=>{var h;if(!r.button||!r.panel)return!1;let v=(h=gt(r.button))!=null?h:document;for(let N of v.querySelectorAll("body > *"))if(Number(N==null?void 0:N.contains(r.button))^Number(N==null?void 0:N.contains(r.panel)))return!0;let f=je(v),d=f.indexOf(r.button),a=(d+f.length-1)%f.length,C=(d+1)%f.length,w=f[a],s=f[C];return!r.panel.contains(w)&&!r.panel.contains(s)}});{let r=this.state.id,h=tt.get(null);this.on(0,()=>h.actions.push(r)),this.on(1,()=>h.actions.pop(r))}}static new({id:n,__demoMode:r=!1}){return new Ce({id:n,__demoMode:r,popoverState:r?0:1,buttons:{current:[]},button:null,buttonId:null,panel:null,panelId:null,beforePanelSentinel:{current:null},afterPanelSentinel:{current:null},afterButtonSentinel:{current:null}})}reduce(n,r){return ee(r.type,Ct,n,r)}}const _e=l.createContext(null);function xe(t){let n=l.useContext(_e);if(n===null){let r=new Error(`<${t} /> is missing a parent <Popover /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,xe),r}return n}function Bt({id:t,__demoMode:n=!1}){let r=l.useMemo(()=>Ce.new({id:t,__demoMode:n}),[]);return rt(()=>r.dispose()),r}let Be=l.createContext(null);Be.displayName="PopoverGroupContext";function Ge(){return l.useContext(Be)}let ve=l.createContext(null);ve.displayName="PopoverPanelContext";function $t(){return l.useContext(ve)}let St="div";function It(t,n){var r;let h=l.useId(),{__demoMode:v=!1,...f}=t,d=Bt({id:h,__demoMode:v}),a=l.useRef(null),C=re(n,mt(i=>{a.current=i})),[w,s,N,P,F]=te(d,l.useCallback(i=>[i.popoverState,i.button,i.panel,i.buttonId,i.panelId],[])),A=st((r=a.current)!=null?r:s),p=Se(P),x=Se(F),b=l.useMemo(()=>({buttonId:p,panelId:x,close:d.actions.close}),[p,x,d]),y=Ge(),c=y==null?void 0:y.registerPopover,B=j(()=>{var i,$;let M=le((i=a.current)!=null?i:s);return($=y==null?void 0:y.isFocusWithinPopoverGroup())!=null?$:M&&((s==null?void 0:s.contains(M))||(N==null?void 0:N.contains(M)))});l.useEffect(()=>c==null?void 0:c(b),[c,b]);let[oe,se]=dt(),V=ct(s),K=ut({mainTreeNode:V,portals:oe,defaultContainers:[{get current(){return d.state.button}},{get current(){return d.state.panel}}]});Xe(A,"focus",i=>{var $,M,D,J,T,X;i.target!==window&&xt(i.target)&&d.state.popoverState===g.Open&&(B()||d.state.button&&d.state.panel&&(K.contains(i.target)||(M=($=d.state.beforePanelSentinel.current)==null?void 0:$.contains)!=null&&M.call($,i.target)||(J=(D=d.state.afterPanelSentinel.current)==null?void 0:D.contains)!=null&&J.call(D,i.target)||(X=(T=d.state.afterButtonSentinel.current)==null?void 0:T.contains)!=null&&X.call(T,i.target)||d.actions.close()))},!0);let Z=w===g.Open;it(Z,K.resolveContainers,(i,$)=>{d.actions.close(),vt($,ft.Loose)||(i.preventDefault(),s==null||s.focus())});let de=ce({open:w===g.Open,close:d.actions.refocusableClose}),ie=te(d,l.useCallback(i=>ee(i.popoverState,{[g.Open]:ae.Open,[g.Closed]:ae.Closed}),[])),q={ref:C},U=ue();return k.createElement(Ae,{node:V},k.createElement(Ue,null,k.createElement(ve.Provider,{value:null},k.createElement(_e.Provider,{value:d},k.createElement(De,{value:d.actions.refocusableClose},k.createElement(ht,{value:ie},k.createElement(se,null,U({ourProps:q,theirProps:f,slot:de,defaultTag:St,name:"Popover"}))))))))}let Et="button";function Ft(t,n){let r=l.useId(),{id:h=`headlessui-popover-button-${r}`,disabled:v=!1,autoFocus:f=!1,...d}=t,a=xe("Popover.Button"),[C,w,s,N,P,F,A]=te(a,l.useCallback(o=>[o.popoverState,a.selectors.isPortalled(o),o.button,o.buttonId,o.panel,o.panelId,o.afterButtonSentinel],[])),p=l.useRef(null),x=`headlessui-focus-sentinel-${l.useId()}`,b=Ge(),y=b==null?void 0:b.closeOthers,c=$t()!==null;l.useEffect(()=>{if(!c)return a.actions.setButtonId(h),()=>a.actions.setButtonId(null)},[c,h,a]);let[B]=l.useState(()=>Symbol()),oe=re(p,n,He(),j(o=>{if(!c){if(o)a.state.buttons.current.push(B);else{let u=a.state.buttons.current.indexOf(B);u!==-1&&a.state.buttons.current.splice(u,1)}a.state.buttons.current.length>1&&console.warn("You are already using a <Popover.Button /> but only 1 <Popover.Button /> is supported."),o&&a.actions.setButton(o)}})),se=re(p,n),V=j(o=>{var u,S,R;if(c){if(a.state.popoverState===g.Closed)return;switch(o.key){case Y.Space:case Y.Enter:o.preventDefault(),(S=(u=o.target).click)==null||S.call(u),a.actions.close(),(R=a.state.button)==null||R.focus();break}}else switch(o.key){case Y.Space:case Y.Enter:o.preventDefault(),o.stopPropagation(),a.state.popoverState===g.Closed?(y==null||y(a.state.buttonId),a.actions.open()):a.actions.close();break;case Y.Escape:if(a.state.popoverState!==g.Open)return y==null?void 0:y(a.state.buttonId);if(!p.current)return;let W=le(p.current);if(W&&!p.current.contains(W))return;o.preventDefault(),o.stopPropagation(),a.actions.close();break}}),K=j(o=>{c||o.key===Y.Space&&o.preventDefault()}),Z=j(o=>{var u,S;Te(o.currentTarget)||v||(c?(a.actions.close(),(u=a.state.button)==null||u.focus()):(o.preventDefault(),o.stopPropagation(),a.state.popoverState===g.Closed?(y==null||y(a.state.buttonId),a.actions.open()):a.actions.close(),(S=a.state.button)==null||S.focus()))}),de=j(o=>{o.preventDefault(),o.stopPropagation()}),{isFocusVisible:ie,focusProps:q}=Le({autoFocus:f}),{isHovered:U,hoverProps:i}=ze({isDisabled:v}),{pressed:$,pressProps:M}=Ve({disabled:v}),D=C===g.Open,J=ce({open:D,active:$||D,disabled:v,hover:U,focus:ie,autofocus:f}),T=lt(t,s),X=c?be({ref:se,type:T,onKeyDown:V,onClick:Z,disabled:v||void 0,autoFocus:f},q,i,M):be({ref:oe,id:N,type:T,"aria-expanded":C===g.Open,"aria-controls":P?F:void 0,disabled:v||void 0,autoFocus:f,onKeyDown:V,onKeyUp:K,onClick:Z,onMouseDown:de},q,i,M),me=Fe(),fe=j(()=>{if(!Ne(a.state.panel))return;let o=a.state.panel;function u(){ee(me.current,{[L.Forwards]:()=>Q(o,z.First),[L.Backwards]:()=>Q(o,z.Last)})===Pe.Error&&Q(je(we(a.state.button)).filter(S=>S.dataset.headlessuiFocusGuard!=="true"),ee(me.current,{[L.Forwards]:z.Next,[L.Backwards]:z.Previous}),{relativeTo:a.state.button})}u()}),m=ue();return k.createElement(k.Fragment,null,m({ourProps:X,theirProps:d,slot:J,defaultTag:Et,name:"Popover.Button"}),D&&!c&&w&&k.createElement(ye,{id:x,ref:A,features:ke.Focusable,"data-headlessui-focus-guard":!0,as:"button",type:"button",onFocus:fe}))}let At="div",Mt=he.RenderStrategy|he.Static;function Ke(t,n){let r=l.useId(),{id:h=`headlessui-popover-backdrop-${r}`,transition:v=!1,...f}=t,d=xe("Popover.Backdrop"),a=te(d,l.useCallback(b=>b.popoverState,[])),[C,w]=l.useState(null),s=re(n,w),N=Me(),[P,F]=Oe(v,C,N!==null?(N&ae.Open)===ae.Open:a===g.Open),A=j(b=>{if(Te(b.currentTarget))return b.preventDefault();d.actions.close()}),p=ce({open:a===g.Open}),x={ref:s,id:h,"aria-hidden":!0,onClick:A,...Re(F)};return ue()({ourProps:x,theirProps:f,slot:p,defaultTag:At,features:Mt,visible:P,name:"Popover.Backdrop"})}let Ot="div",Rt=he.RenderStrategy|he.Static;function Dt(t,n){let r=l.useId(),{id:h=`headlessui-popover-panel-${r}`,focus:v=!1,anchor:f,portal:d=!1,modal:a=!1,transition:C=!1,...w}=t,s=xe("Popover.Panel"),N=te(s,s.selectors.isPortalled),[P,F,A,p,x]=te(s,l.useCallback(m=>[m.popoverState,m.button,m.__demoMode,m.beforePanelSentinel,m.afterPanelSentinel],[])),b=`headlessui-focus-sentinel-before-${r}`,y=`headlessui-focus-sentinel-after-${r}`,c=l.useRef(null),B=Ye(f),[oe,se]=Qe(B),V=Ze();B&&(d=!0);let[K,Z]=l.useState(null),de=re(c,n,B?oe:null,s.actions.setPanel,Z),ie=Ie(F),q=Ie(c.current);Je(()=>(s.actions.setPanelId(h),()=>s.actions.setPanelId(null)),[h,s]);let U=Me(),[i,$]=Oe(C,K,U!==null?(U&ae.Open)===ae.Open:P===g.Open);at(i,F,s.actions.close),nt(A?!1:a&&i,q);let M=j(m=>{var o;switch(m.key){case Y.Escape:if(s.state.popoverState!==g.Open||!c.current)return;let u=le(c.current);if(u&&!c.current.contains(u))return;m.preventDefault(),m.stopPropagation(),s.actions.close(),(o=s.state.button)==null||o.focus();break}});l.useEffect(()=>{var m;t.static||P===g.Closed&&((m=t.unmount)==null||m)&&s.actions.setPanel(null)},[P,t.unmount,t.static,s]),l.useEffect(()=>{if(A||!v||P!==g.Open||!c.current)return;let m=le(c.current);c.current.contains(m)||Q(c.current,z.First)},[A,v,c.current,P]);let D=ce({open:P===g.Open,close:s.actions.refocusableClose}),J=be(B?V():{},{ref:de,id:h,onKeyDown:M,onBlur:v&&P===g.Open?m=>{var o,u,S,R,W;let H=m.relatedTarget;H&&c.current&&((o=c.current)!=null&&o.contains(H)||(s.actions.close(),((S=(u=p.current)==null?void 0:u.contains)!=null&&S.call(u,H)||(W=(R=x.current)==null?void 0:R.contains)!=null&&W.call(R,H))&&H.focus({preventScroll:!0})))}:void 0,tabIndex:-1,style:{...w.style,...se,"--button-width":qe(i,F,!0).width},...Re($)}),T=Fe(),X=j(()=>{let m=c.current;if(!m)return;function o(){ee(T.current,{[L.Forwards]:()=>{var u;Q(m,z.First)===Pe.Error&&((u=s.state.afterPanelSentinel.current)==null||u.focus())},[L.Backwards]:()=>{var u;(u=s.state.button)==null||u.focus({preventScroll:!0})}})}o()}),me=j(()=>{let m=c.current;if(!m)return;function o(){ee(T.current,{[L.Forwards]:()=>{var u;if(!s.state.button)return;let S=(u=we(s.state.button))!=null?u:document.body,R=je(S),W=R.indexOf(s.state.button),H=R.slice(0,W+1),pe=[...R.slice(W+1),...H];for(let ge of pe.slice())if(ge.dataset.headlessuiFocusGuard==="true"||K!=null&&K.contains(ge)){let $e=pe.indexOf(ge);$e!==-1&&pe.splice($e,1)}Q(pe,z.First,{sorted:!1})},[L.Backwards]:()=>{var u;Q(m,z.Previous)===Pe.Error&&((u=s.state.button)==null||u.focus())}})}o()}),fe=ue();return k.createElement(pt,null,k.createElement(ve.Provider,{value:h},k.createElement(De,{value:s.actions.refocusableClose},k.createElement(ot,{enabled:d?t.static||i:!1,ownerDocument:ie},i&&N&&k.createElement(ye,{id:b,ref:p,features:ke.Focusable,"data-headlessui-focus-guard":!0,as:"button",type:"button",onFocus:X}),fe({ourProps:J,theirProps:w,slot:D,defaultTag:Ot,features:Rt,visible:i,name:"Popover.Panel"}),i&&N&&k.createElement(ye,{id:y,ref:x,features:ke.Focusable,"data-headlessui-focus-guard":!0,as:"button",type:"button",onFocus:me})))))}let Tt="div";function _t(t,n){let r=l.useRef(null),h=re(r,n),[v,f]=l.useState([]),d=j(p=>{f(x=>{let b=x.indexOf(p);if(b!==-1){let y=x.slice();return y.splice(b,1),y}return x})}),a=j(p=>(f(x=>[...x,p]),()=>d(p))),C=j(()=>{var p;let x=we(r.current);if(!x)return!1;let b=le(r.current);return(p=r.current)!=null&&p.contains(b)?!0:v.some(y=>{var c,B;return((c=x.getElementById(y.buttonId.current))==null?void 0:c.contains(b))||((B=x.getElementById(y.panelId.current))==null?void 0:B.contains(b))})}),w=j(p=>{for(let x of v)x.buttonId.current!==p&&x.close()}),s=l.useMemo(()=>({registerPopover:a,unregisterPopover:d,isFocusWithinPopoverGroup:C,closeOthers:w}),[a,d,C,w]),N=ce({}),P=t,F={ref:h},A=ue();return k.createElement(Ae,null,k.createElement(Be.Provider,{value:s},A({ourProps:F,theirProps:P,slot:N,defaultTag:Tt,name:"Popover.Group"})))}let Gt=ne(It),I=ne(Ft),Kt=ne(Ke),We=ne(Ke),E=ne(Dt),Wt=ne(_t),O=Object.assign(Gt,{Button:I,Backdrop:We,Overlay:Kt,Panel:E,Group:Wt});const Lt=`import { PopoverButton, PopoverPanel, Popover } from '@headlessui/react'\r
\r
const BasicPopoverCode = () => {\r
  return (\r
    <div>\r
      <div className='w-fit'>\r
        <div className='flex gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm'>\r
          <div className='text-sm font-semibold text-ld'>Products</div>\r
          <Popover>\r
            <PopoverButton className='block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white'>\r
              Solutions\r
            </PopoverButton>\r
            <PopoverPanel\r
              transition\r
              anchor='bottom'\r
              className='divide-y divide-border dark:divide-darkborder rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'>\r
              <div className='p-3'>\r
                <a\r
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted'\r
                  href='#'>\r
                  <p className='text-sm font-semibold text-ld'>Insights</p>\r
                  <p className='text-ld text-sm'>\r
                    Measure actions your users take\r
                  </p>\r
                </a>\r
                <a\r
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted '\r
                  href='#'>\r
                  <p className='text-sm font-semibold text-ld'>Automations</p>\r
                  <p className='text-ld text-sm'>\r
                    Create your own targeted content\r
                  </p>\r
                </a>\r
                <a\r
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted '\r
                  href='#'>\r
                  <p className='text-sm font-semibold text-ld'>Reports</p>\r
                  <p className='text-ld text-sm'>\r
                    Keep track of your growth\r
                  </p>\r
                </a>\r
              </div>\r
              <div className='p-3'>\r
                <a\r
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted '\r
                  href='#'>\r
                  <p className='text-sm font-semibold text-ld'>Documentation</p>\r
                  <p className='text-ld text-sm'>\r
                    Start integrating products and tools\r
                  </p>\r
                </a>\r
              </div>\r
            </PopoverPanel>\r
          </Popover>\r
          <div className='text-sm font-semibold text-ld'>Pricing</div>\r
        </div>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default BasicPopoverCode\r
`,zt=`import {\r
  CloseButton,\r
  Popover,\r
  PopoverButton,\r
  PopoverPanel,\r
} from "@headlessui/react";\r
import MyLink from "../MyLink";\r
\r
const ClosingManuallyCode = () => {\r
  return (\r
    <div>\r
      <div className='w-fit'>\r
        <div className='gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm flex justify-center'>\r
          <Popover>\r
            <PopoverButton className='block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white'>\r
              Open Popover\r
            </PopoverButton>\r
            <PopoverPanel\r
              anchor='bottom'\r
              className='w-52 py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'>\r
              <CloseButton as={MyLink}>Insights</CloseButton>\r
            </PopoverPanel>\r
          </Popover>\r
        </div>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default ClosingManuallyCode\r
`,Vt=`import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'\r
import { AnimatePresence, motion } from 'framer-motion'\r
\r
const FramerPopoverCode = () => {\r
  return (\r
    <div>\r
      <div className='w-fit'>\r
        <div className='gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm flex justify-center'>\r
          <Popover>\r
            {({ open }) => (\r
              <>\r
                <PopoverButton className='block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white'>\r
                  Framer Motion\r
                </PopoverButton>\r
                <AnimatePresence>\r
                  {open && (\r
                    <PopoverPanel\r
                      static\r
                      as={motion.div}\r
                      initial={{ opacity: 0, scale: 0.95 }}\r
                      animate={{ opacity: 1, scale: 1 }}\r
                      exit={{ opacity: 0, scale: 0.95 }}\r
                      anchor='bottom'\r
                      className='flex origin-top flex-col w-52 z-[60] py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md'>\r
                      <a href='/analytics' className='ui-dropdown-item'>\r
                        Analytics\r
                      </a>\r
                      <a href='/engagement' className='ui-dropdown-item'>\r
                        Engagement\r
                      </a>\r
                      <a href='/security' className='ui-dropdown-item'>\r
                        Security\r
                      </a>\r
                      <a href='/integrations' className='ui-dropdown-item'>\r
                        Integrations\r
                      </a>\r
                    </PopoverPanel>\r
                  )}\r
                </AnimatePresence>\r
              </>\r
            )}\r
          </Popover>\r
        </div>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default FramerPopoverCode\r
`,Ht=`import { PopoverButton, PopoverPanel, Popover } from '@headlessui/react'\r
\r
const GroupingPopoverCode = () => {\r
  return (\r
    <div>\r
      <div className='w-fit'>\r
        <div className='flex gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm'>\r
          <Popover>\r
            <PopoverButton className='block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white'>\r
              Products\r
            </PopoverButton>\r
            <PopoverPanel\r
              transition\r
              anchor='bottom'\r
              className='divide-y divide-border dark:divide-darkborder rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'>\r
              <div className='p-3'>\r
                <a\r
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted'\r
                  href='#'>\r
                  <p className='text-sm font-semibold text-ld'>Insights</p>\r
                  <p className='text-ld text-sm'>\r
                    Measure actions your users take\r
                  </p>\r
                </a>\r
                <a\r
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted '\r
                  href='#'>\r
                  <p className='text-sm font-semibold text-ld'>Automations</p>\r
                  <p className='text-ld text-sm'>\r
                    Create your own targeted content\r
                  </p>\r
                </a>\r
                <a\r
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted '\r
                  href='#'>\r
                  <p className='text-sm font-semibold text-ld'>Reports</p>\r
                  <p className='text-ld text-sm'>\r
                    Keep track of your growth\r
                  </p>\r
                </a>\r
              </div>\r
              <div className='p-3'>\r
                <a\r
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted '\r
                  href='#'>\r
                  <p className='text-sm font-semibold text-ld'>Documentation</p>\r
                  <p className='text-ld text-sm'>\r
                    Start integrating products and tools\r
                  </p>\r
                </a>\r
              </div>\r
            </PopoverPanel>\r
          </Popover>\r
          <Popover>\r
            <PopoverButton className='block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white'>\r
              Solutions\r
            </PopoverButton>\r
            <PopoverPanel\r
              transition\r
              anchor='bottom'\r
              className='divide-y divide-border dark:divide-darkborder rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'>\r
              <div className='p-3'>\r
                <a\r
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted'\r
                  href='#'>\r
                  <p className='text-sm font-semibold text-ld'>Insights</p>\r
                  <p className='text-ld text-sm'>\r
                    Measure actions your users take\r
                  </p>\r
                </a>\r
                <a\r
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted '\r
                  href='#'>\r
                  <p className='text-sm font-semibold text-ld'>Automations</p>\r
                  <p className='text-ld text-sm'>\r
                    Create your own targeted content\r
                  </p>\r
                </a>\r
                <a\r
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted '\r
                  href='#'>\r
                  <p className='text-sm font-semibold text-ld'>Reports</p>\r
                  <p className='text-ld text-sm'>\r
                    Keep track of your growth\r
                  </p>\r
                </a>\r
              </div>\r
              <div className='p-3'>\r
                <a\r
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted '\r
                  href='#'>\r
                  <p className='text-sm font-semibold text-ld'>Documentation</p>\r
                  <p className='text-ld text-sm'>\r
                    Start integrating products and tools\r
                  </p>\r
                </a>\r
              </div>\r
            </PopoverPanel>\r
          </Popover>\r
          <Popover>\r
            <PopoverButton className='block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white'>\r
              Pricing\r
            </PopoverButton>\r
            <PopoverPanel\r
              transition\r
              anchor='bottom'\r
              className='divide-y divide-border dark:divide-darkborder rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'>\r
              <div className='p-3'>\r
                <a\r
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted'\r
                  href='#'>\r
                  <p className='text-sm font-semibold text-ld'>Insights</p>\r
                  <p className='text-ld text-sm'>\r
                    Measure actions your users take\r
                  </p>\r
                </a>\r
                <a\r
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted '\r
                  href='#'>\r
                  <p className='text-sm font-semibold text-ld'>Automations</p>\r
                  <p className='text-ld text-sm'>\r
                    Create your own targeted content\r
                  </p>\r
                </a>\r
                <a\r
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted '\r
                  href='#'>\r
                  <p className='text-sm font-semibold text-ld'>Reports</p>\r
                  <p className='text-ld text-sm'>\r
                    Keep track of your growth\r
                  </p>\r
                </a>\r
              </div>\r
              <div className='p-3'>\r
                <a\r
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted '\r
                  href='#'>\r
                  <p className='text-sm font-semibold text-ld'>Documentation</p>\r
                  <p className='text-ld text-sm'>\r
                    Start integrating products and tools\r
                  </p>\r
                </a>\r
              </div>\r
            </PopoverPanel>\r
          </Popover>\r
        </div>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default GroupingPopoverCode\r
`,Yt=`import {\r
  Popover,\r
  PopoverButton,\r
  PopoverPanel,\r
  PopoverBackdrop,\r
} from '@headlessui/react'\r
\r
const PopoverBgDropcode = () => {\r
  return (\r
    <div>\r
      <div className='w-fit'>\r
        <div className='gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm flex justify-center'>\r
          <Popover className='relative '>\r
            <PopoverButton className='block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white'>\r
              Open Popover\r
            </PopoverButton>\r
            <PopoverBackdrop className='fixed inset-0 bg-black/15 z-50' />\r
            <PopoverPanel\r
              transition\r
              anchor='bottom'\r
              className='w-52 z-[60] py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'>\r
              <div className='flex flex-col gap-1'>\r
                <a href='/analytics' className='ui-dropdown-item'>\r
                  Analytics\r
                </a>\r
                <a href='/engagement' className='ui-dropdown-item'>\r
                  Engagement\r
                </a>\r
                <a href='/security' className='ui-dropdown-item'>\r
                  Security\r
                </a>\r
                <a href='/integrations' className='ui-dropdown-item'>\r
                  Integrations\r
                </a>\r
              </div>\r
            </PopoverPanel>\r
          </Popover>\r
        </div>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default PopoverBgDropcode\r
`,Qt=`import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'\r
\r
const PopoverPositionCode = () => {\r
  return (\r
    <div>\r
      <div className='w-fit'>\r
        <div className='gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm w-full flex justify-center'>\r
          <Popover className='relative flex justify-center'>\r
            <PopoverButton className='block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white'>\r
              Top Popover\r
            </PopoverButton>\r
            <PopoverPanel\r
              transition\r
              anchor='top start'\r
              className='w-52 py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'>\r
              <div className='flex flex-col gap-1'>\r
                <a href='/analytics' className='ui-dropdown-item'>\r
                  Analytics\r
                </a>\r
                <a href='/engagement' className='ui-dropdown-item'>\r
                  Engagement\r
                </a>\r
                <a href='/security' className='ui-dropdown-item'>\r
                  Security\r
                </a>\r
                <a href='/integrations' className='ui-dropdown-item'>\r
                  Integrations\r
                </a>\r
              </div>\r
            </PopoverPanel>\r
          </Popover>\r
        </div>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default PopoverPositionCode\r
`,Zt=`import { PopoverButton, PopoverPanel, Popover } from "@headlessui/react";\r
\r
const PopoverTransitionCode = () => {\r
  return (\r
    <div>\r
      <div className='w-fit'>\r
        <div className='gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm flex justify-center'>\r
          <Popover className='relative '>\r
            <PopoverButton className='block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white'>\r
              Open Popover\r
            </PopoverButton>\r
            <PopoverPanel\r
              transition\r
              anchor='bottom'\r
              className='w-52 z-[60] py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0'>\r
              <div className='flex flex-col gap-1'>\r
                <a href='/analytics' className='ui-dropdown-item'>\r
                  Analytics\r
                </a>\r
                <a href='/engagement' className='ui-dropdown-item'>\r
                  Engagement\r
                </a>\r
                <a href='/security' className='ui-dropdown-item'>\r
                  Security\r
                </a>\r
                <a href='/integrations' className='ui-dropdown-item'>\r
                  Integrations\r
                </a>\r
              </div>\r
            </PopoverPanel>\r
          </Popover>\r
        </div>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default PopoverTransitionCode\r
`,qt=`import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'\r
\r
const PopoverWidthCode = () => {\r
  return (\r
    <div>\r
      <div className='w-fit'>\r
        <div className='gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm flex justify-center'>\r
          <Popover className='relative '>\r
            <PopoverButton className='block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white'>\r
              Open Popover\r
            </PopoverButton>\r
            <PopoverPanel\r
              transition\r
              anchor='bottom'\r
              className='w-52 py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'>\r
              <div className='flex flex-col gap-1'>\r
                <a href='/analytics' className='ui-dropdown-item'>\r
                  Analytics\r
                </a>\r
                <a href='/engagement' className='ui-dropdown-item'>\r
                  Engagement\r
                </a>\r
                <a href='/security' className='ui-dropdown-item'>\r
                  Security\r
                </a>\r
                <a href='/integrations' className='ui-dropdown-item'>\r
                  Integrations\r
                </a>\r
              </div>\r
            </PopoverPanel>\r
          </Popover>\r
        </div>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default PopoverWidthCode\r
`,Ut=`import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'\r
import { forwardRef } from 'react'\r
\r
let MyCustomButton = forwardRef(function (props: any, ref: any) {\r
  return <button className='...' ref={ref} {...props} />\r
})\r
\r
const RenderPopoverCode = () => {\r
  return (\r
    <div className='w-fit'>\r
      <div className='flex gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm'>\r
        <Popover as='nav'>\r
          <PopoverButton\r
            as={MyCustomButton}\r
            className='block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white'>\r
            Render As Form View\r
          </PopoverButton>\r
          <PopoverPanel\r
            as='form'\r
            className='w-60 py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'>\r
            <div className='flex flex-col gap-1'>\r
              <a href='/analytics' className='ui-dropdown-item'>\r
                Analytics\r
              </a>\r
              <a href='/engagement' className='ui-dropdown-item'>\r
                Engagement\r
              </a>\r
              <a href='/security' className='ui-dropdown-item'>\r
                Security\r
              </a>\r
              <a href='/integrations' className='ui-dropdown-item'>\r
                Integrations\r
              </a>\r
            </div>\r
          </PopoverPanel>\r
        </Popover>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default RenderPopoverCode\r
`,Jt=()=>e.jsx("div",{children:e.jsx("div",{className:"w-fit",children:e.jsxs("div",{className:"flex gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm",children:[e.jsx("div",{className:"text-sm font-semibold text-ld",children:"Products"}),e.jsxs(O,{children:[e.jsx(I,{className:"block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white",children:"Solutions"}),e.jsxs(E,{transition:!0,anchor:"bottom",className:"divide-y divide-border dark:divide-darkborder rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0",children:[e.jsxs("div",{className:"p-3",children:[e.jsxs("a",{className:"block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted",href:"#",children:[e.jsx("p",{className:"text-sm font-semibold text-ld",children:"Insights"}),e.jsx("p",{className:"text-ld text-sm",children:"Measure actions your users take"})]}),e.jsxs("a",{className:"block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted ",href:"#",children:[e.jsx("p",{className:"text-sm font-semibold text-ld",children:"Automations"}),e.jsx("p",{className:"text-ld text-sm",children:"Create your own targeted content"})]}),e.jsxs("a",{className:"block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted ",href:"#",children:[e.jsx("p",{className:"text-sm font-semibold text-ld",children:"Reports"}),e.jsx("p",{className:"text-ld text-sm",children:"Keep track of your growth"})]})]}),e.jsx("div",{className:"p-3",children:e.jsxs("a",{className:"block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted ",href:"#",children:[e.jsx("p",{className:"text-sm font-semibold text-ld",children:"Documentation"}),e.jsx("p",{className:"text-ld text-sm",children:"Start integrating products and tools"})]})})]})]}),e.jsx("div",{className:"text-sm font-semibold text-ld",children:"Pricing"})]})})}),Xt=()=>e.jsx("div",{children:e.jsx(G,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Basic Popover"}),e.jsx(Jt,{})]})})})}),er=({children:t})=>e.jsx("a",{className:"ui-dropdown-item",href:"/samplepage",children:t}),tr=()=>e.jsx("div",{children:e.jsx("div",{className:"w-fit",children:e.jsx("div",{className:"gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm flex justify-center",children:e.jsxs(O,{children:[e.jsx(I,{className:"block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white",children:"Open Popover"}),e.jsx(E,{anchor:"bottom",className:"w-52 py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0",children:e.jsx(bt,{as:er,children:"Insights"})})]})})})}),rr=()=>e.jsx("div",{children:e.jsx(G,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Closing Popovers Manually"}),e.jsx(tr,{})]})})})}),ar=()=>e.jsx("div",{children:e.jsx("div",{className:"w-fit",children:e.jsx("div",{className:"gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm flex justify-center",children:e.jsx(O,{children:({open:t})=>e.jsxs(e.Fragment,{children:[e.jsx(I,{className:"block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white",children:"Framer Motion"}),e.jsx(yt,{children:t&&e.jsxs(E,{static:!0,as:kt.div,initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},anchor:"bottom",className:"flex origin-top flex-col w-52 z-[60] py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md",children:[e.jsx("a",{href:"/analytics",className:"ui-dropdown-item",children:"Analytics"}),e.jsx("a",{href:"/engagement",className:"ui-dropdown-item",children:"Engagement"}),e.jsx("a",{href:"/security",className:"ui-dropdown-item",children:"Security"}),e.jsx("a",{href:"/integrations",className:"ui-dropdown-item",children:"Integrations"})]})})]})})})})}),nr=()=>e.jsx("div",{children:e.jsx(G,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Framer Motion Popover"}),e.jsx(ar,{})]})})})}),or=()=>e.jsx("div",{children:e.jsx("div",{className:"w-fit",children:e.jsxs("div",{className:"flex gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm",children:[e.jsxs(O,{children:[e.jsx(I,{className:"block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white",children:"Products"}),e.jsxs(E,{transition:!0,anchor:"bottom",className:"divide-y divide-border dark:divide-darkborder rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0",children:[e.jsxs("div",{className:"p-3",children:[e.jsxs("a",{className:"block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted",href:"#",children:[e.jsx("p",{className:"text-sm font-semibold text-ld",children:"Insights"}),e.jsx("p",{className:"text-ld text-sm",children:"Measure actions your users take"})]}),e.jsxs("a",{className:"block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted ",href:"#",children:[e.jsx("p",{className:"text-sm font-semibold text-ld",children:"Automations"}),e.jsx("p",{className:"text-ld text-sm",children:"Create your own targeted content"})]}),e.jsxs("a",{className:"block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted ",href:"#",children:[e.jsx("p",{className:"text-sm font-semibold text-ld",children:"Reports"}),e.jsx("p",{className:"text-ld text-sm",children:"Keep track of your growth"})]})]}),e.jsx("div",{className:"p-3",children:e.jsxs("a",{className:"block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted ",href:"#",children:[e.jsx("p",{className:"text-sm font-semibold text-ld",children:"Documentation"}),e.jsx("p",{className:"text-ld text-sm",children:"Start integrating products and tools"})]})})]})]}),e.jsxs(O,{children:[e.jsx(I,{className:"block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white",children:"Solutions"}),e.jsxs(E,{transition:!0,anchor:"bottom",className:"divide-y divide-border dark:divide-darkborder rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0",children:[e.jsxs("div",{className:"p-3",children:[e.jsxs("a",{className:"block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted",href:"#",children:[e.jsx("p",{className:"text-sm font-semibold text-ld",children:"Insights"}),e.jsx("p",{className:"text-ld text-sm",children:"Measure actions your users take"})]}),e.jsxs("a",{className:"block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted ",href:"#",children:[e.jsx("p",{className:"text-sm font-semibold text-ld",children:"Automations"}),e.jsx("p",{className:"text-ld text-sm",children:"Create your own targeted content"})]}),e.jsxs("a",{className:"block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted ",href:"#",children:[e.jsx("p",{className:"text-sm font-semibold text-ld",children:"Reports"}),e.jsx("p",{className:"text-ld text-sm",children:"Keep track of your growth"})]})]}),e.jsx("div",{className:"p-3",children:e.jsxs("a",{className:"block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted ",href:"#",children:[e.jsx("p",{className:"text-sm font-semibold text-ld",children:"Documentation"}),e.jsx("p",{className:"text-ld text-sm",children:"Start integrating products and tools"})]})})]})]}),e.jsxs(O,{children:[e.jsx(I,{className:"block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white",children:"Pricing"}),e.jsxs(E,{transition:!0,anchor:"bottom",className:"divide-y divide-border dark:divide-darkborder rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0",children:[e.jsxs("div",{className:"p-3",children:[e.jsxs("a",{className:"block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted",href:"#",children:[e.jsx("p",{className:"text-sm font-semibold text-ld",children:"Insights"}),e.jsx("p",{className:"text-ld text-sm",children:"Measure actions your users take"})]}),e.jsxs("a",{className:"block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted ",href:"#",children:[e.jsx("p",{className:"text-sm font-semibold text-ld",children:"Automations"}),e.jsx("p",{className:"text-ld text-sm",children:"Create your own targeted content"})]}),e.jsxs("a",{className:"block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted ",href:"#",children:[e.jsx("p",{className:"text-sm font-semibold text-ld",children:"Reports"}),e.jsx("p",{className:"text-ld text-sm",children:"Keep track of your growth"})]})]}),e.jsx("div",{className:"p-3",children:e.jsxs("a",{className:"block rounded-sm py-2 px-3 transition hover:bg-lightgray hover:dark:bg-darkmuted ",href:"#",children:[e.jsx("p",{className:"text-sm font-semibold text-ld",children:"Documentation"}),e.jsx("p",{className:"text-ld text-sm",children:"Start integrating products and tools"})]})})]})]})]})})}),sr=()=>e.jsx("div",{children:e.jsx(G,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Grouping Related Popover"}),e.jsx(or,{})]})})})}),dr=()=>e.jsx("div",{children:e.jsx("div",{className:"w-fit",children:e.jsx("div",{className:"gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm flex justify-center",children:e.jsxs(O,{className:"relative ",children:[e.jsx(I,{className:"block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white",children:"Open Popover"}),e.jsx(We,{className:"fixed inset-0 bg-black/15 z-50"}),e.jsx(E,{transition:!0,anchor:"bottom",className:"w-52 z-[60] py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0",children:e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("a",{href:"/analytics",className:"ui-dropdown-item",children:"Analytics"}),e.jsx("a",{href:"/engagement",className:"ui-dropdown-item",children:"Engagement"}),e.jsx("a",{href:"/security",className:"ui-dropdown-item",children:"Security"}),e.jsx("a",{href:"/integrations",className:"ui-dropdown-item",children:"Integrations"})]})})]})})})}),ir=()=>e.jsx("div",{children:e.jsx(G,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Popover Backdrop"}),e.jsx(dr,{})]})})})}),lr=()=>e.jsx("div",{children:e.jsx("div",{className:"w-fit",children:e.jsx("div",{className:"gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm w-full flex justify-center",children:e.jsxs(O,{className:"relative flex justify-center",children:[e.jsx(I,{className:"block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white",children:"Top Popover"}),e.jsx(E,{transition:!0,anchor:"top start",className:"w-52 py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0",children:e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("a",{href:"/analytics",className:"ui-dropdown-item",children:"Analytics"}),e.jsx("a",{href:"/engagement",className:"ui-dropdown-item",children:"Engagement"}),e.jsx("a",{href:"/security",className:"ui-dropdown-item",children:"Security"}),e.jsx("a",{href:"/integrations",className:"ui-dropdown-item",children:"Integrations"})]})})]})})})}),cr=()=>e.jsx("div",{children:e.jsx(G,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Popover Positioning"}),e.jsx(lr,{})]})})})}),ur=()=>e.jsx("div",{children:e.jsx("div",{className:"w-fit",children:e.jsx("div",{className:"gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm flex justify-center",children:e.jsxs(O,{className:"relative ",children:[e.jsx(I,{className:"block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white",children:"Open Popover"}),e.jsx(E,{transition:!0,anchor:"bottom",className:"w-52 z-[60] py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0",children:e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("a",{href:"/analytics",className:"ui-dropdown-item",children:"Analytics"}),e.jsx("a",{href:"/engagement",className:"ui-dropdown-item",children:"Engagement"}),e.jsx("a",{href:"/security",className:"ui-dropdown-item",children:"Security"}),e.jsx("a",{href:"/integrations",className:"ui-dropdown-item",children:"Integrations"})]})})]})})})}),mr=()=>e.jsx("div",{children:e.jsx(G,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Popover Transitions"}),e.jsx(ur,{})]})})})}),pr=()=>e.jsx("div",{children:e.jsx("div",{className:"w-fit",children:e.jsx("div",{className:"gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm flex justify-center",children:e.jsxs(O,{className:"relative ",children:[e.jsx(I,{className:"block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white",children:"Open Popover"}),e.jsx(E,{transition:!0,anchor:"bottom",className:"w-52 py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0",children:e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("a",{href:"/analytics",className:"ui-dropdown-item",children:"Analytics"}),e.jsx("a",{href:"/engagement",className:"ui-dropdown-item",children:"Engagement"}),e.jsx("a",{href:"/security",className:"ui-dropdown-item",children:"Security"}),e.jsx("a",{href:"/integrations",className:"ui-dropdown-item",children:"Integrations"})]})})]})})})}),hr=()=>e.jsx("div",{children:e.jsx(G,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Popover Width"}),e.jsx(pr,{})]})})})});let xr=l.forwardRef(function(t,n){return e.jsx("button",{className:"...",ref:n,...t})});const vr=()=>e.jsx("div",{className:"w-fit",children:e.jsx("div",{className:"flex gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm",children:e.jsxs(O,{as:"nav",children:[e.jsx(I,{as:xr,className:"block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white",children:"Render As Form View"}),e.jsx(E,{as:"form",className:"w-60 py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0",children:e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("a",{href:"/analytics",className:"ui-dropdown-item",children:"Analytics"}),e.jsx("a",{href:"/engagement",className:"ui-dropdown-item",children:"Engagement"}),e.jsx("a",{href:"/security",className:"ui-dropdown-item",children:"Security"}),e.jsx("a",{href:"/integrations",className:"ui-dropdown-item",children:"Integrations"})]})})]})})}),fr=()=>e.jsx("div",{children:e.jsx(G,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Rendering Different Elements"}),e.jsx(vr,{})]})})})}),gr=[{to:"/",title:"Home"},{title:"Popover"}],ra=()=>e.jsxs(e.Fragment,{children:[e.jsx(Nt,{title:"Popover",items:gr}),e.jsxs("div",{className:"grid grid-cols-12 gap-7",children:[e.jsxs("div",{className:"col-span-12",children:[e.jsx(Xt,{}),e.jsx(_,{children:Lt})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(sr,{}),e.jsx(_,{children:Ht})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(hr,{}),e.jsx(_,{children:qt})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(cr,{}),e.jsx(_,{children:Qt})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(ir,{}),e.jsx(_,{children:Yt})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(mr,{}),e.jsx(_,{children:Zt})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(nr,{}),e.jsx(_,{children:Vt})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(rr,{}),e.jsx(_,{children:zt})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(fr,{}),e.jsx(_,{children:Ut})]})]})]});export{ra as default};
