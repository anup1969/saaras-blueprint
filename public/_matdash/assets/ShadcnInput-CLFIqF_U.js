import{j as e,B as U,r as n,m as ne,R as _e}from"./index-Ct0UOXmm.js";import{I as f}from"./input-hN5mkNRk.js";import{C as $}from"./card-Ca2rFNYr.js";import{L as S}from"./label-DyPIvUCW.js";import{c as Ae}from"./createLucideIcon-BhlIJAXk.js";import{C as se}from"./CardBox-DRaXwASi.js";import{T as pe}from"./textarea-CQMcwSV0.js";import{u as ze,F as He,d as $e,e as Ye,f as Ve,g as qe,k as Je,h as Xe,t as Ze,o as Qe,s as Ke}from"./form-BPjLNikw.js";import{t as Ue}from"./use-toast-BI6f5zP2.js";import{B as et}from"./BreadcrumbComp-CrB7aHeN.js";import{C as T}from"./CodeDialog-CxWZFxDL.js";import"./chevron-right-H7UwKVHv.js";import"./index-CDOj5QJd.js";import"./vsc-dark-plus-BFNuSAyr.js";import"./highlight-CR4RLcvi.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tt=[["circle",{cx:"12.1",cy:"12.1",r:"1",key:"18d7e5"}]],nt=Ae("dot",tt),rt=()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"max-w-sm flex flex-col gap-5 mt-4",children:[e.jsx(f,{type:"text",placeholder:"Name"}),e.jsx(f,{type:"text",placeholder:"Comapny"}),e.jsx(f,{type:"email",placeholder:"Email"}),e.jsx(f,{type:"password",placeholder:"Password"})]})}),st=()=>e.jsx($,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"General Input"}),e.jsx(rt,{})]})})}),at=()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:" max-w-sm flex flex-col gap-5 mt-4",children:[e.jsxs("div",{children:[e.jsx(S,{htmlFor:"name",children:"Name"}),e.jsx(f,{type:"text"})]}),e.jsxs("div",{children:[e.jsx(S,{htmlFor:"email",children:"Email"}),e.jsx(f,{type:"email"})]}),e.jsxs("div",{children:[e.jsx(S,{htmlFor:"password",children:"Password"}),e.jsx(f,{type:"password"})]})]})}),ot=()=>e.jsx($,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Input With Label"}),e.jsx(at,{})]})})}),lt=()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"max-w-sm flex flex-col gap-5 mt-4",children:[e.jsxs("div",{children:[e.jsx(S,{htmlFor:"name",children:"Name"}),e.jsx(f,{type:"text"})]}),e.jsxs("div",{children:[e.jsx(S,{htmlFor:"email",children:"Email"}),e.jsx(f,{type:"email"})]}),e.jsxs("div",{children:[e.jsx(S,{htmlFor:"password",children:"Password"}),e.jsx(f,{type:"password"})]}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(U,{children:"Submit"}),e.jsx(U,{variant:"error",children:"Cancel"})]})]})}),it=()=>e.jsx($,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Input With Button"}),e.jsx(lt,{})]})})});var ct=Object.defineProperty,dt=Object.defineProperties,ut=Object.getOwnPropertyDescriptors,re=Object.getOwnPropertySymbols,Ne=Object.prototype.hasOwnProperty,Pe=Object.prototype.propertyIsEnumerable,ye=(t,r,s)=>r in t?ct(t,r,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[r]=s,pt=(t,r)=>{for(var s in r||(r={}))Ne.call(r,s)&&ye(t,s,r[s]);if(re)for(var s of re(r))Pe.call(r,s)&&ye(t,s,r[s]);return t},mt=(t,r)=>dt(t,ut(r)),xt=(t,r)=>{var s={};for(var i in t)Ne.call(t,i)&&r.indexOf(i)<0&&(s[i]=t[i]);if(t!=null&&re)for(var i of re(t))r.indexOf(i)<0&&Pe.call(t,i)&&(s[i]=t[i]);return s};function ht(t){let r=setTimeout(t,0),s=setTimeout(t,10),i=setTimeout(t,50);return[r,s,i]}function ft(t){let r=n.useRef();return n.useEffect(()=>{r.current=t}),r.current}var vt=18,Ce=40,jt=`${Ce}px`,bt=["[data-lastpass-icon-root]","com-1password-button","[data-dashlanecreated]",'[style$="2147483647 !important;"]'].join(",");function gt({containerRef:t,inputRef:r,pushPasswordManagerStrategy:s,isFocused:i}){let[y,m]=n.useState(!1),[L,N]=n.useState(!1),[W,Y]=n.useState(!1),V=n.useMemo(()=>s==="none"?!1:(s==="increase-width"||s==="experimental-no-flickering")&&y&&L,[y,L,s]),G=n.useCallback(()=>{let v=t.current,O=r.current;if(!v||!O||W||s==="none")return;let g=v,P=g.getBoundingClientRect().left+g.offsetWidth,_=g.getBoundingClientRect().top+g.offsetHeight/2,c=P-vt,q=_;document.querySelectorAll(bt).length===0&&document.elementFromPoint(c,q)===v||(m(!0),Y(!0))},[t,r,W,s]);return n.useEffect(()=>{let v=t.current;if(!v||s==="none")return;function O(){let P=window.innerWidth-v.getBoundingClientRect().right;N(P>=Ce)}O();let g=setInterval(O,1e3);return()=>{clearInterval(g)}},[t,s]),n.useEffect(()=>{let v=i||document.activeElement===r.current;if(s==="none"||!v)return;let O=setTimeout(G,0),g=setTimeout(G,2e3),P=setTimeout(G,5e3),_=setTimeout(()=>{Y(!0)},6e3);return()=>{clearTimeout(O),clearTimeout(g),clearTimeout(P),clearTimeout(_)}},[r,i,s,G]),{hasPWMBadge:y,willPushPWMBadge:V,PWM_BADGE_SPACE_WIDTH:jt}}var Oe=n.createContext({}),Fe=n.forwardRef((t,r)=>{var s=t,{value:i,onChange:y,maxLength:m,textAlign:L="left",pattern:N,placeholder:W,inputMode:Y="numeric",onComplete:V,pushPasswordManagerStrategy:G="increase-width",pasteTransformer:v,containerClassName:O,noScriptCSSFallback:g=It,render:P,children:_}=s,c=xt(s,["value","onChange","maxLength","textAlign","pattern","placeholder","inputMode","onComplete","pushPasswordManagerStrategy","pasteTransformer","containerClassName","noScriptCSSFallback","render","children"]),q,me,xe,he,fe;let[Ee,Le]=n.useState(typeof c.defaultValue=="string"?c.defaultValue:""),d=i??Ee,B=ft(d),J=n.useCallback(a=>{y==null||y(a),Le(a)},[y]),w=n.useMemo(()=>N?typeof N=="string"?new RegExp(N):N:null,[N]),u=n.useRef(null),oe=n.useRef(null),le=n.useRef({value:d,onChange:J,isIOS:typeof window<"u"&&((me=(q=window==null?void 0:window.CSS)==null?void 0:q.supports)==null?void 0:me.call(q,"-webkit-touch-callout","none"))}),ee=n.useRef({prev:[(xe=u.current)==null?void 0:xe.selectionStart,(he=u.current)==null?void 0:he.selectionEnd,(fe=u.current)==null?void 0:fe.selectionDirection]});n.useImperativeHandle(r,()=>u.current,[]),n.useEffect(()=>{let a=u.current,o=oe.current;if(!a||!o)return;le.current.value!==a.value&&le.current.onChange(a.value),ee.current.prev=[a.selectionStart,a.selectionEnd,a.selectionDirection];function x(){if(document.activeElement!==a){Z(null),Q(null);return}let l=a.selectionStart,h=a.selectionEnd,te=a.selectionDirection,I=a.maxLength,R=a.value,C=ee.current.prev,F=-1,E=-1,k;if(R.length!==0&&l!==null&&h!==null){let Me=l===h,We=l===R.length&&R.length<I;if(Me&&!We){let M=l;if(M===0)F=0,E=1,k="forward";else if(M===I)F=M-1,E=M,k="backward";else if(I>1&&R.length>1){let de=0;if(C[0]!==null&&C[1]!==null){k=M<C[1]?"backward":"forward";let Ge=C[0]===C[1]&&C[0]<I;k==="backward"&&!Ge&&(de=-1)}F=de+M,E=de+M+1}}F!==-1&&E!==-1&&F!==E&&u.current.setSelectionRange(F,E,k)}let Te=F!==-1?F:l,Se=E!==-1?E:h,ke=k??te;Z(Te),Q(Se),ee.current.prev=[Te,Se,ke]}if(document.addEventListener("selectionchange",x,{capture:!0}),x(),document.activeElement===a&&ie(!0),!document.getElementById("input-otp-style")){let l=document.createElement("style");if(l.id="input-otp-style",document.head.appendChild(l),l.sheet){let h="background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;";K(l.sheet,"[data-input-otp]::selection { background: transparent !important; color: transparent !important; }"),K(l.sheet,`[data-input-otp]:autofill { ${h} }`),K(l.sheet,`[data-input-otp]:-webkit-autofill { ${h} }`),K(l.sheet,"@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }"),K(l.sheet,"[data-input-otp] + * { pointer-events: all !important; }")}}let j=()=>{o&&o.style.setProperty("--root-height",`${a.clientHeight}px`)};j();let b=new ResizeObserver(j);return b.observe(a),()=>{document.removeEventListener("selectionchange",x,{capture:!0}),b.disconnect()}},[]);let[ve,je]=n.useState(!1),[X,ie]=n.useState(!1),[D,Z]=n.useState(null),[A,Q]=n.useState(null);n.useEffect(()=>{ht(()=>{var a,o,x,j;(a=u.current)==null||a.dispatchEvent(new Event("input"));let b=(o=u.current)==null?void 0:o.selectionStart,l=(x=u.current)==null?void 0:x.selectionEnd,h=(j=u.current)==null?void 0:j.selectionDirection;b!==null&&l!==null&&(Z(b),Q(l),ee.current.prev=[b,l,h])})},[d,X]),n.useEffect(()=>{B!==void 0&&d!==B&&B.length<m&&d.length===m&&(V==null||V(d))},[m,V,B,d]);let z=gt({containerRef:oe,inputRef:u,pushPasswordManagerStrategy:G,isFocused:X}),be=n.useCallback(a=>{let o=a.currentTarget.value.slice(0,m);if(o.length>0&&w&&!w.test(o)){a.preventDefault();return}typeof B=="string"&&o.length<B.length&&document.dispatchEvent(new Event("selectionchange")),J(o)},[m,J,B,w]),ge=n.useCallback(()=>{var a;if(u.current){let o=Math.min(u.current.value.length,m-1),x=u.current.value.length;(a=u.current)==null||a.setSelectionRange(o,x),Z(o),Q(x)}ie(!0)},[m]),Ie=n.useCallback(a=>{var o,x;let j=u.current;if(!v&&(!le.current.isIOS||!a.clipboardData||!j))return;let b=a.clipboardData.getData("text/plain"),l=v?v(b):b;a.preventDefault();let h=(o=u.current)==null?void 0:o.selectionStart,te=(x=u.current)==null?void 0:x.selectionEnd,I=(h!==te?d.slice(0,h)+l+d.slice(te):d.slice(0,h)+l+d.slice(h)).slice(0,m);if(I.length>0&&w&&!w.test(I))return;j.value=I,J(I);let R=Math.min(I.length,m-1),C=I.length;j.setSelectionRange(R,C),Z(R),Q(C)},[m,J,w,d]),Be=n.useMemo(()=>({position:"relative",cursor:c.disabled?"default":"text",userSelect:"none",WebkitUserSelect:"none",pointerEvents:"none"}),[c.disabled]),we=n.useMemo(()=>({position:"absolute",inset:0,width:z.willPushPWMBadge?`calc(100% + ${z.PWM_BADGE_SPACE_WIDTH})`:"100%",clipPath:z.willPushPWMBadge?`inset(0 ${z.PWM_BADGE_SPACE_WIDTH} 0 0)`:void 0,height:"100%",display:"flex",textAlign:L,opacity:"1",color:"transparent",pointerEvents:"all",background:"transparent",caretColor:"transparent",border:"0 solid transparent",outline:"0 solid transparent",boxShadow:"none",lineHeight:"1",letterSpacing:"-.5em",fontSize:"var(--root-height)",fontFamily:"monospace",fontVariantNumeric:"tabular-nums"}),[z.PWM_BADGE_SPACE_WIDTH,z.willPushPWMBadge,L]),De=n.useMemo(()=>n.createElement("input",mt(pt({autoComplete:c.autoComplete||"one-time-code"},c),{"data-input-otp":!0,"data-input-otp-placeholder-shown":d.length===0||void 0,"data-input-otp-mss":D,"data-input-otp-mse":A,inputMode:Y,pattern:w==null?void 0:w.source,"aria-placeholder":W,style:we,maxLength:m,value:d,ref:u,onPaste:a=>{var o;Ie(a),(o=c.onPaste)==null||o.call(c,a)},onChange:be,onMouseOver:a=>{var o;je(!0),(o=c.onMouseOver)==null||o.call(c,a)},onMouseLeave:a=>{var o;je(!1),(o=c.onMouseLeave)==null||o.call(c,a)},onFocus:a=>{var o;ge(),(o=c.onFocus)==null||o.call(c,a)},onBlur:a=>{var o;ie(!1),(o=c.onBlur)==null||o.call(c,a)}})),[be,ge,Ie,Y,we,m,A,D,c,w==null?void 0:w.source,d]),ce=n.useMemo(()=>({slots:Array.from({length:m}).map((a,o)=>{var x;let j=X&&D!==null&&A!==null&&(D===A&&o===D||o>=D&&o<A),b=d[o]!==void 0?d[o]:null,l=d[0]!==void 0?null:(x=W==null?void 0:W[o])!=null?x:null;return{char:b,placeholderChar:l,isActive:j,hasFakeCaret:j&&b===null}}),isFocused:X,isHovering:!c.disabled&&ve}),[X,ve,m,A,D,c.disabled,d]),Re=n.useMemo(()=>P?P(ce):n.createElement(Oe.Provider,{value:ce},_),[_,ce,P]);return n.createElement(n.Fragment,null,g!==null&&n.createElement("noscript",null,n.createElement("style",null,g)),n.createElement("div",{ref:oe,"data-input-otp-container":!0,style:Be,className:O},Re,n.createElement("div",{style:{position:"absolute",inset:0,pointerEvents:"none"}},De)))});Fe.displayName="Input";function K(t,r){try{t.insertRule(r)}catch{console.error("input-otp could not insert CSS rule:",r)}}var It=`
[data-input-otp] {
  --nojs-bg: white !important;
  --nojs-fg: black !important;

  background-color: var(--nojs-bg) !important;
  color: var(--nojs-fg) !important;
  caret-color: var(--nojs-fg) !important;
  letter-spacing: .25em !important;
  text-align: center !important;
  border: 1px solid var(--nojs-fg) !important;
  border-radius: 4px !important;
  width: 100% !important;
}
@media (prefers-color-scheme: dark) {
  [data-input-otp] {
    --nojs-bg: black !important;
    --nojs-fg: white !important;
  }
}`,wt="^[a-zA-Z0-9]+$";const ae=n.forwardRef(({className:t,containerClassName:r,...s},i)=>e.jsx(Fe,{ref:i,containerClassName:ne("flex items-center gap-2 has-[:disabled]:opacity-50",r),className:ne("disabled:cursor-not-allowed",t),...s}));ae.displayName="InputOTP";const H=n.forwardRef(({className:t,...r},s)=>e.jsx("div",{ref:s,className:ne("flex items-center",t),...r}));H.displayName="InputOTPGroup";const p=n.forwardRef(({index:t,className:r,...s},i)=>{const y=n.useContext(Oe),{char:m,hasFakeCaret:L,isActive:N}=y.slots[t];return e.jsxs("div",{ref:i,className:ne("relative flex h-10 w-10 items-center justify-center border-y border-r border-ld text-ld text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md ",N&&"z-10 ring-1 ring-primary ring-offset-primary dark:ring-primary dark:ring-offset-primary",r),...s,children:[m,L&&e.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center",children:e.jsx("div",{className:"h-4 w-px animate-caret-blink bg-neutral-950 duration-1000 dark:bg-neutral-50"})})]})});p.displayName="InputOTPSlot";const ue=n.forwardRef(({...t},r)=>e.jsx("div",{ref:r,role:"separator",...t,children:e.jsx(nt,{})}));ue.displayName="InputOTPSeparator";const Tt=()=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"max-w-sm mt-4",children:e.jsx(ae,{maxLength:6,pattern:wt,children:e.jsxs(H,{children:[e.jsx(p,{index:0}),e.jsx(p,{index:1}),e.jsx(p,{index:2}),e.jsx(p,{index:3}),e.jsx(p,{index:4}),e.jsx(p,{index:5})]})})})}),St=()=>e.jsx($,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"OTP Input"}),e.jsx(Tt,{})]})})}),yt=()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"max-w-sm flex flex-col gap-5 mt-4",children:[e.jsxs("div",{children:[e.jsx(S,{htmlFor:"name",children:"Name"}),e.jsx(f,{disabled:!0,type:"text"})]}),e.jsxs("div",{children:[e.jsx(S,{htmlFor:"email",children:"Email"}),e.jsx(f,{disabled:!0,type:"email"})]}),e.jsxs("div",{children:[e.jsx(S,{htmlFor:"password",children:"Password"}),e.jsx(f,{disabled:!0,type:"password"})]}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(U,{disabled:!0,children:"Submit"}),e.jsx(U,{disabled:!0,variant:"error",children:"Cancel"})]})]})}),Nt=()=>e.jsx($,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Disable Input"}),e.jsx(yt,{})]})})}),Pt=()=>e.jsxs(se,{children:[e.jsx("div",{className:"flex items-center justify-between mb-2",children:e.jsx("h4",{className:"text-lg font-semibold",children:"OTP Input Seprator"})}),e.jsxs(ae,{maxLength:6,children:[e.jsxs(H,{children:[e.jsx(p,{index:0}),e.jsx(p,{index:1})]}),e.jsx(ue,{}),e.jsxs(H,{children:[e.jsx(p,{index:2}),e.jsx(p,{index:3})]}),e.jsx(ue,{}),e.jsxs(H,{children:[e.jsx(p,{index:4}),e.jsx(p,{index:5})]})]})]}),Ct=()=>{const[t,r]=_e.useState("");return e.jsxs(se,{children:[e.jsx("div",{className:"flex items-center justify-between ",children:e.jsx("h4",{className:"text-lg font-semibold",children:"Controlled OTP Input"})}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(ae,{maxLength:6,value:t,onChange:s=>r(s),children:e.jsxs(H,{children:[e.jsx(p,{index:0}),e.jsx(p,{index:1}),e.jsx(p,{index:2}),e.jsx(p,{index:3}),e.jsx(p,{index:4}),e.jsx(p,{index:5})]})}),e.jsx("div",{className:" text-sm text-ld",children:t===""?e.jsx(e.Fragment,{children:"Enter your one-time password."}):e.jsxs(e.Fragment,{children:["You entered: ",t]})})]})]})},Ot=()=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"max-w-sm pt-4",children:e.jsx(pe,{placeholder:"Type your message here.",className:"h-[130px]"})})}),Ft=()=>e.jsx(e.Fragment,{children:e.jsx($,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Default Textarea"}),e.jsx(Ot,{})]})})})}),Et=()=>e.jsxs(se,{children:[e.jsx("div",{className:"flex items-center justify-between mb-2",children:e.jsx("h4",{className:"text-lg font-semibold",children:"Textarea with Label"})}),e.jsxs("div",{className:"grid w-full gap-1.5",children:[e.jsx(S,{htmlFor:"message-2",children:"Your Message"}),e.jsx(pe,{placeholder:"Type your message here.",id:"message-2"}),e.jsx("p",{className:"text-sm text-bodytext",children:"Your message will be copied to the support team."})]})]}),Lt=Qe({bio:Ke().min(10,{message:"Bio must be at least 10 characters."}).max(160,{message:"Bio must not be longer than 30 characters."})}),Bt=()=>{const t=ze({resolver:Ze(Lt)});function r(s){Ue({title:"You submitted the following values:",description:e.jsx("pre",{className:"mt-2 w-[340px] rounded-md bg-slate-950 p-4",children:e.jsx("code",{className:"text-white",children:JSON.stringify(s,null,2)})})})}return e.jsxs(se,{children:[e.jsx("div",{className:"flex items-center justify-between mb-2",children:e.jsx("h4",{className:"text-lg font-semibold",children:"Form Textarea"})}),e.jsx("div",{className:"max-w-sm",children:e.jsx(He,{...t,children:e.jsxs("form",{onSubmit:t.handleSubmit(r),className:"w-full space-y-6",children:[e.jsx($e,{control:t.control,name:"bio",render:({field:s})=>e.jsxs(Ye,{children:[e.jsx(Ve,{children:"Bio"}),e.jsx(qe,{children:e.jsx(pe,{placeholder:"Tell us a little bit about yourself",className:"resize-none w-full h-[150px]",...s})}),e.jsxs(Je,{children:["You can ",e.jsx("span",{children:"@mention"})," other users and organizations."]}),e.jsx(Xe,{})]})}),e.jsx(U,{type:"submit",children:"Submit"})]})})})]})},Dt=`'use client'\r
\r
import { Input } from 'src/components/ui/input'\r
\r
const SimpleInputcode = () => {\r
  return (\r
    <>\r
      <div className='max-w-sm flex flex-col gap-5 mt-4'>\r
        <Input type='text' placeholder='Name' />\r
        <Input type='text' placeholder='Comapny' />\r
        <Input type='email' placeholder='Email' />\r
        <Input type='password' placeholder='Password' />\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default SimpleInputcode\r
`,Rt=`'use client'\r
\r
import { Input } from 'src/components/ui/input'\r
import { Label } from 'src/components/ui/label'\r
\r
const InputLabelCode = () => {\r
  return (\r
    <>\r
      <div className=' max-w-sm flex flex-col gap-5 mt-4'>\r
        <div>\r
          <Label htmlFor='name'>Name</Label>\r
          <Input type='text' />\r
        </div>\r
        <div>\r
          <Label htmlFor='email'>Email</Label>\r
          <Input type='email' />\r
        </div>\r
        <div>\r
          <Label htmlFor='password'>Password</Label>\r
          <Input type='password' />\r
        </div>\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default InputLabelCode\r
`,kt=`'use client'\r
\r
import { Label } from 'src/components/ui/label'\r
import { Button } from 'src/components/ui/button'\r
import { Input } from 'src/components/ui/input'\r
\r
const InputWithButtonCode = () => {\r
  return (\r
    <>\r
      <div className='max-w-sm flex flex-col gap-5 mt-4'>\r
        <div>\r
          <Label htmlFor='name'>Name</Label>\r
          <Input type='text' />\r
        </div>\r
        <div>\r
          <Label htmlFor='email'>Email</Label>\r
          <Input type='email' />\r
        </div>\r
        <div>\r
          <Label htmlFor='password'>Password</Label>\r
          <Input type='password' />\r
        </div>\r
        <div className='flex gap-3'>\r
          <Button>Submit</Button>\r
          <Button variant={'error'}>Cancel</Button>\r
        </div>\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default InputWithButtonCode\r
`,Mt=`'use client'\r
\r
import { Input } from 'src/components/ui/input'\r
import { Label } from 'src/components/ui/label'\r
import { Button } from 'src/components/ui/button'\r
\r
const DisableInputWithButtonCode = () => {\r
  return (\r
    <>\r
      <div className='max-w-sm flex flex-col gap-5 mt-4'>\r
        <div>\r
          <Label htmlFor='name'>Name</Label>\r
          <Input disabled type='text' />\r
        </div>\r
        <div>\r
          <Label htmlFor='email'>Email</Label>\r
          <Input disabled type='email' />\r
        </div>\r
        <div>\r
          <Label htmlFor='password'>Password</Label>\r
          <Input disabled type='password' />\r
        </div>\r
        <div className='flex gap-3'>\r
          <Button disabled>Submit</Button>\r
          <Button disabled variant={'error'}>\r
            Cancel\r
          </Button>\r
        </div>\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default DisableInputWithButtonCode\r
`,Wt=`'use client'\r
\r
import { Textarea } from 'src/components/ui/textarea'\r
\r
const DefaultTextareaCode = () => {\r
  return (\r
    <>\r
      <div className='max-w-sm pt-4'>\r
        <Textarea placeholder='Type your message here.' className='h-[130px]' />\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default DefaultTextareaCode\r
`,Gt=`import { Textarea } from 'src/components/ui/textarea'\r
import { Label } from 'src/components/ui/label'\r
\r
const TextareaWithTextCode = () => {\r
    return (\r
        <>\r
            <div className='grid w-full gap-1.5'>\r
                <Label htmlFor='message-2'>Your Message</Label>\r
                <Textarea placeholder='Type your message here.' id='message-2' />\r
                <p className='text-sm text-bodytext'>\r
                    Your message will be copied to the support team.\r
                </p>\r
            </div>\r
        </>\r
    )\r
}\r
\r
export default TextareaWithTextCode\r
`,_t=`"use client";\r
\r
import { zodResolver } from "@hookform/resolvers/zod";\r
import { useForm } from "react-hook-form";\r
import { z } from "zod";\r
\r
import { toast } from "src/hooks/use-toast";\r
import { Button } from "src/components/ui/button";\r
import {\r
    Form,\r
    FormControl,\r
    FormDescription,\r
    FormField,\r
    FormItem,\r
    FormLabel,\r
    FormMessage,\r
} from "src/components/ui/form";\r
import { Textarea } from "src/components/ui/textarea";\r
\r
const FormSchema = z.object({\r
    bio: z\r
        .string()\r
        .min(10, {\r
            message: "Bio must be at least 10 characters.",\r
        })\r
        .max(160, {\r
            message: "Bio must not be longer than 30 characters.",\r
        }),\r
});\r
\r
const FormwithTextareaCode = () => {\r
    const form = useForm<z.infer<typeof FormSchema>>({\r
        resolver: zodResolver(FormSchema),\r
    });\r
\r
    function onSubmit(data: z.infer<typeof FormSchema>) {\r
        toast({\r
            title: "You submitted the following values:",\r
            description: (\r
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">\r
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>\r
                </pre>\r
            ),\r
        });\r
    }\r
\r
    return (\r
        <div className="max-w-sm">\r
            <Form {...form}>\r
                <form\r
                    onSubmit={form.handleSubmit(onSubmit)}\r
                    className="w-full space-y-6"\r
                >\r
                    <FormField\r
                        control={form.control}\r
                        name="bio"\r
                        render={({ field }) => (\r
                            <FormItem>\r
                                <FormLabel>Bio</FormLabel>\r
                                <FormControl>\r
                                    <Textarea\r
                                        placeholder="Tell us a little bit about yourself"\r
                                        className="resize-none w-full h-[150px]"\r
                                        {...field}\r
                                    />\r
                                </FormControl>\r
                                <FormDescription>\r
                                    You can <span>@mention</span> other users and organizations.\r
                                </FormDescription>\r
                                <FormMessage />\r
                            </FormItem>\r
                        )}\r
                    />\r
                    <Button type="submit">Submit</Button>\r
                </form>\r
            </Form>\r
        </div>\r
    );\r
};\r
\r
export default FormwithTextareaCode;\r
`,At=`"use client";\r
\r
\r
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";\r
import {\r
  InputOTP,\r
  InputOTPGroup,\r
  InputOTPSlot,\r
} from "src/components/ui/input-otp";\r
\r
\r
const OtpInputCode = () => {\r
  return (\r
    <>\r
      <div className="max-w-sm mt-4">\r
        <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} >\r
          <InputOTPGroup>\r
            <InputOTPSlot index={0} />\r
            <InputOTPSlot index={1} />\r
            <InputOTPSlot index={2} />\r
            <InputOTPSlot index={3} />\r
            <InputOTPSlot index={4} />\r
            <InputOTPSlot index={5} />\r
          </InputOTPGroup>\r
        </InputOTP>\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default OtpInputCode`,zt=`import {\r
    InputOTP,\r
    InputOTPGroup,\r
    InputOTPSeparator,\r
    InputOTPSlot,\r
} from "src/components/ui/input-otp";\r
\r
const OtpInputSepratorCode = () => {\r
    return (\r
        <>\r
            <InputOTP maxLength={6}>\r
                <InputOTPGroup>\r
                    <InputOTPSlot index={0} />\r
                    <InputOTPSlot index={1} />\r
                </InputOTPGroup>\r
                <InputOTPSeparator />\r
                <InputOTPGroup>\r
                    <InputOTPSlot index={2} />\r
                    <InputOTPSlot index={3} />\r
                </InputOTPGroup>\r
                <InputOTPSeparator />\r
                <InputOTPGroup>\r
                    <InputOTPSlot index={4} />\r
                    <InputOTPSlot index={5} />\r
                </InputOTPGroup>\r
            </InputOTP>\r
        </>\r
    );\r
};\r
\r
export default OtpInputSepratorCode;\r
`,Ht=`"use client";\r
\r
import React from "react";\r
import {\r
    InputOTP,\r
    InputOTPGroup,\r
    InputOTPSlot,\r
} from "src/components/ui/input-otp";\r
\r
const ControlledOtpInputCode = () => {\r
    const [value, setValue] = React.useState("");\r
    return (\r
        <div className="space-y-2">\r
            <InputOTP\r
                maxLength={6}\r
                value={value}\r
                onChange={(value) => setValue(value)}\r
            >\r
                <InputOTPGroup>\r
                    <InputOTPSlot index={0} />\r
                    <InputOTPSlot index={1} />\r
                    <InputOTPSlot index={2} />\r
                    <InputOTPSlot index={3} />\r
                    <InputOTPSlot index={4} />\r
                    <InputOTPSlot index={5} />\r
                </InputOTPGroup>\r
            </InputOTP>\r
            <div className=" text-sm text-ld">\r
                {value === "" ? (\r
                    <>Enter your one-time password.</>\r
                ) : (\r
                    <>You entered: {value}</>\r
                )}\r
            </div>\r
        </div>\r
    );\r
};\r
\r
export default ControlledOtpInputCode;\r
`,$t=[{to:"/",title:"Home"},{href:"",title:"Input"}],un=()=>e.jsxs(e.Fragment,{children:[e.jsx(et,{title:"Input",items:$t}),e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12",children:[e.jsx(st,{}),e.jsx(T,{children:Dt})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(ot,{}),e.jsx(T,{children:Rt})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(it,{}),e.jsx(T,{children:kt})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Nt,{}),e.jsx(T,{children:Mt})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Ft,{}),e.jsx(T,{children:Wt})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Et,{}),e.jsx(T,{children:Gt})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Bt,{}),e.jsx(T,{children:_t})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(St,{}),e.jsx(T,{children:At})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Pt,{}),e.jsx(T,{children:zt})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(Ct,{}),e.jsx(T,{children:Ht})]})]})]});export{un as default};
