import{r as c,R as E,au as Le,j as t,I as K}from"./index-Ct0UOXmm.js";import{C as Y}from"./CodeDialog-CxWZFxDL.js";import{$ as Je,a as Xe}from"./useFocusRing-BwtZ2rwJ.js";import{w as et}from"./use-active-press-DStzcK9h.js";import{u as tt}from"./use-by-comparator-D3d_VDIQ.js";import{l as nt,b as st}from"./use-default-value-D3Ybj_xn.js";import{u as Z,Y as ne,o as _,a as J,V as Ve,K as se,p as ot,c as it,n as ye,A as Pe,b as rt}from"./render-DMwXrKoH.js";import{F as at,b as lt,y as ct,R as dt,T as ut,w as mt,A as pt}from"./floating-CjEA_Xk5.js";import{p as xt,c as de,a as v,f as le,b as ht,L as bt,S as ce,s as ft,u as vt}from"./element-movement-zkVTdiGA.js";import{y as gt}from"./use-inert-others-1R3oIamm.js";import{T as wt,a as we,x as He,b as jt,c as Lt,S,u as Re,p as yt,f as Ot,t as Nt,k as St}from"./portal-DIXKWA5m.js";import{e as Pt}from"./use-resolve-button-type-yd4cTZn6.js";import{y as oe}from"./use-sync-refs-CLSd0TG6.js";import{s as Rt}from"./use-text-value-eEs9C5cl.js";import{u as $t,N as Tt,x as Ct,c as It,i as me}from"./open-closed-C6YNpIXJ.js";import{a as Dt}from"./disabled-D8pPKoLq.js";import{j as Bt,g as Et,W as ie}from"./field-MozAsfUL.js";import{u as Kt}from"./frozen-4wjY2SKe.js";import{Z as pe,u as kt,N as Mt,V as Ft}from"./label-CVnTvbsT.js";import{n as At}from"./dom-BlW_0b_t.js";import{G as Wt,R as _t,T as $e,H as Vt,I as Ht}from"./focus-management-DhxUlEdq.js";import{d as zt}from"./owner-CYR0F7kW.js";import{w as Qt,M as Oe}from"./description-CcSXqif1.js";import{o as j}from"./keyboard-C1Wiwm26.js";import{C as X}from"./card-Ca2rFNYr.js";import{C as ee}from"./CardBox-DRaXwASi.js";import{A as Ut}from"./index-IYlUB0bw.js";import{m as qt}from"./proxy-BMhP_BJf.js";import{B as Gt}from"./BreadcrumbComp-CrB7aHeN.js";import"./index-CDOj5QJd.js";import"./vsc-dark-plus-BFNuSAyr.js";import"./highlight-CR4RLcvi.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./bugs-BJ7ScNGK.js";import"./with-selector-V0on0Xim.js";import"./hidden-CbXc7YDF.js";import"./chevron-right-H7UwKVHv.js";import"./createLucideIcon-BhlIJAXk.js";var Yt=Object.defineProperty,Zt=(e,s,n)=>s in e?Yt(e,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[s]=n,Te=(e,s,n)=>(Zt(e,typeof s!="symbol"?s+"":s,n),n),L=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(L||{}),Q=(e=>(e[e.Single=0]="Single",e[e.Multi=1]="Multi",e))(Q||{}),ue=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(ue||{}),ze=(e=>(e[e.OpenListbox=0]="OpenListbox",e[e.CloseListbox=1]="CloseListbox",e[e.GoToOption=2]="GoToOption",e[e.Search=3]="Search",e[e.ClearSearch=4]="ClearSearch",e[e.SelectOption=5]="SelectOption",e[e.RegisterOptions=6]="RegisterOptions",e[e.UnregisterOptions=7]="UnregisterOptions",e[e.SetButtonElement=8]="SetButtonElement",e[e.SetOptionsElement=9]="SetOptionsElement",e[e.SortOptions=10]="SortOptions",e[e.MarkButtonAsMoved=11]="MarkButtonAsMoved",e))(ze||{});function Ce(e,s=n=>n){let n=e.activeOptionIndex!==null?e.options[e.activeOptionIndex]:null,o=Wt(s(e.options.slice()),r=>r.dataRef.current.domRef.current),i=n?o.indexOf(n):null;return i===-1&&(i=null),{options:o,activeOptionIndex:i}}let Jt={1(e){if(e.dataRef.current.disabled||e.listboxState===1)return e;let s=e.buttonElement?de.Tracked(ht(e.buttonElement)):e.buttonPositionState;return{...e,activeOptionIndex:null,pendingFocus:{focus:v.Nothing},listboxState:1,__demoMode:!1,buttonPositionState:s}},0(e,s){if(e.dataRef.current.disabled||e.listboxState===0)return e;let n=e.activeOptionIndex,{isSelected:o}=e.dataRef.current,i=e.options.findIndex(r=>o(r.dataRef.current.value));return i!==-1&&(n=i),{...e,frozenValue:!1,pendingFocus:s.focus,listboxState:0,activeOptionIndex:n,__demoMode:!1,buttonPositionState:de.Idle}},2(e,s){var n,o,i,r,p;if(e.dataRef.current.disabled||e.listboxState===1)return e;let m={...e,searchQuery:"",activationTrigger:(n=s.trigger)!=null?n:1,__demoMode:!1};if(s.focus===v.Nothing)return{...m,activeOptionIndex:null};if(s.focus===v.Specific)return{...m,activeOptionIndex:e.options.findIndex(b=>b.id===s.id)};if(s.focus===v.Previous){let b=e.activeOptionIndex;if(b!==null){let w=e.options[b].dataRef.current.domRef,u=le(s,{resolveItems:()=>e.options,resolveActiveIndex:()=>e.activeOptionIndex,resolveId:a=>a.id,resolveDisabled:a=>a.dataRef.current.disabled});if(u!==null){let a=e.options[u].dataRef.current.domRef;if(((o=w.current)==null?void 0:o.previousElementSibling)===a.current||((i=a.current)==null?void 0:i.previousElementSibling)===null)return{...m,activeOptionIndex:u}}}}else if(s.focus===v.Next){let b=e.activeOptionIndex;if(b!==null){let w=e.options[b].dataRef.current.domRef,u=le(s,{resolveItems:()=>e.options,resolveActiveIndex:()=>e.activeOptionIndex,resolveId:a=>a.id,resolveDisabled:a=>a.dataRef.current.disabled});if(u!==null){let a=e.options[u].dataRef.current.domRef;if(((r=w.current)==null?void 0:r.nextElementSibling)===a.current||((p=a.current)==null?void 0:p.nextElementSibling)===null)return{...m,activeOptionIndex:u}}}}let f=Ce(e),d=le(s,{resolveItems:()=>f.options,resolveActiveIndex:()=>f.activeOptionIndex,resolveId:b=>b.id,resolveDisabled:b=>b.dataRef.current.disabled});return{...m,...f,activeOptionIndex:d}},3:(e,s)=>{if(e.dataRef.current.disabled||e.listboxState===1)return e;let n=e.searchQuery!==""?0:1,o=e.searchQuery+s.value.toLowerCase(),i=(e.activeOptionIndex!==null?e.options.slice(e.activeOptionIndex+n).concat(e.options.slice(0,e.activeOptionIndex+n)):e.options).find(p=>{var m;return!p.dataRef.current.disabled&&((m=p.dataRef.current.textValue)==null?void 0:m.startsWith(o))}),r=i?e.options.indexOf(i):-1;return r===-1||r===e.activeOptionIndex?{...e,searchQuery:o}:{...e,searchQuery:o,activeOptionIndex:r,activationTrigger:1}},4(e){return e.dataRef.current.disabled||e.listboxState===1||e.searchQuery===""?e:{...e,searchQuery:""}},5(e){return e.dataRef.current.mode===0?{...e,frozenValue:!0}:{...e}},6:(e,s)=>{let n=e.options.concat(s.options),o=e.activeOptionIndex;if(e.pendingFocus.focus!==v.Nothing&&(o=le(e.pendingFocus,{resolveItems:()=>n,resolveActiveIndex:()=>e.activeOptionIndex,resolveId:i=>i.id,resolveDisabled:i=>i.dataRef.current.disabled})),e.activeOptionIndex===null){let{isSelected:i}=e.dataRef.current;if(i){let r=n.findIndex(p=>i==null?void 0:i(p.dataRef.current.value));r!==-1&&(o=r)}}return{...e,options:n,activeOptionIndex:o,pendingFocus:{focus:v.Nothing},pendingShouldSort:!0}},7:(e,s)=>{let n=e.options,o=[],i=new Set(s.options);for(let[r,p]of n.entries())if(i.has(p.id)&&(o.push(r),i.delete(p.id),i.size===0))break;if(o.length>0){n=n.slice();for(let r of o.reverse())n.splice(r,1)}return{...e,options:n,activationTrigger:1}},8:(e,s)=>e.buttonElement===s.element?e:{...e,buttonElement:s.element},9:(e,s)=>e.optionsElement===s.element?e:{...e,optionsElement:s.element},10:e=>e.pendingShouldSort?{...e,...Ce(e),pendingShouldSort:!1}:e,11(e){return e.buttonPositionState.kind!=="Tracked"?e:{...e,buttonPositionState:de.Moved}}};class Ne extends wt{constructor(s){super(s),Te(this,"actions",{onChange:n=>{let{onChange:o,compare:i,mode:r,value:p}=this.state.dataRef.current;return Z(r,{0:()=>o==null?void 0:o(n),1:()=>{let m=p.slice(),f=m.findIndex(d=>i(d,n));return f===-1?m.push(n):m.splice(f,1),o==null?void 0:o(m)}})},registerOption:we(()=>{let n=[],o=new Set;return[(i,r)=>{o.has(r)||(o.add(r),n.push({id:i,dataRef:r}))},()=>(o.clear(),this.send({type:6,options:n.splice(0)}))]}),unregisterOption:we(()=>{let n=[];return[o=>n.push(o),()=>{this.send({type:7,options:n.splice(0)})}]}),goToOption:we(()=>{let n=null;return[(o,i)=>{n={type:2,...o,trigger:i}},()=>n&&this.send(n)]}),closeListbox:()=>{this.send({type:1})},openListbox:n=>{this.send({type:0,focus:n})},selectActiveOption:()=>{var n;if(this.state.activeOptionIndex!==null){let{dataRef:o}=this.state.options[this.state.activeOptionIndex];this.actions.selectOption(o.current.value)}else this.state.dataRef.current.mode===0&&(this.actions.closeListbox(),(n=this.state.buttonElement)==null||n.focus({preventScroll:!0}))},selectOption:n=>{this.send({type:5,value:n})},search:n=>{this.send({type:3,value:n})},clearSearch:()=>{this.send({type:4})},setButtonElement:n=>{this.send({type:8,element:n})},setOptionsElement:n=>{this.send({type:9,element:n})}}),Te(this,"selectors",{activeDescendantId(n){var o;let i=n.activeOptionIndex,r=n.options;return i===null||(o=r[i])==null?void 0:o.id},isActive(n,o){var i;let r=n.activeOptionIndex,p=n.options;return r!==null?((i=p[r])==null?void 0:i.id)===o:!1},hasFrozenValue(n){return n.frozenValue},shouldScrollIntoView(n,o){return n.__demoMode||n.listboxState!==0||n.activationTrigger===0?!1:this.isActive(n,o)},didButtonMove(n){return n.buttonPositionState.kind==="Moved"}}),this.on(6,()=>{requestAnimationFrame(()=>{this.send({type:10})})});{let n=this.state.id,o=He.get(null);this.disposables.add(o.on(jt.Push,i=>{!o.selectors.isTop(i,n)&&this.state.listboxState===0&&this.actions.closeListbox()})),this.on(0,()=>o.actions.push(n)),this.on(1,()=>o.actions.pop(n))}this.disposables.group(n=>{this.on(1,o=>{o.buttonElement&&(n.dispose(),n.add(xt(o.buttonElement,o.buttonPositionState,()=>{this.send({type:11})})))})}),this.on(5,(n,o)=>{var i;this.actions.onChange(o.value),this.state.dataRef.current.mode===0&&(this.actions.closeListbox(),(i=this.state.buttonElement)==null||i.focus({preventScroll:!0}))})}static new({id:s,__demoMode:n=!1}){return new Ne({id:s,dataRef:{current:{}},listboxState:n?0:1,options:[],searchQuery:"",activeOptionIndex:null,activationTrigger:1,buttonElement:null,optionsElement:null,pendingShouldSort:!1,pendingFocus:{focus:v.Nothing},frozenValue:!1,__demoMode:n,buttonPositionState:de.Idle})}reduce(s,n){return Z(n.type,Jt,s,n)}}const Qe=c.createContext(null);function Se(e){let s=c.useContext(Qe);if(s===null){let n=new Error(`<${e} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,Ue),n}return s}function Ue({id:e,__demoMode:s=!1}){let n=c.useMemo(()=>Ne.new({id:e,__demoMode:s}),[]);return Lt(()=>n.dispose()),n}let xe=c.createContext(null);xe.displayName="ListboxDataContext";function re(e){let s=c.useContext(xe);if(s===null){let n=new Error(`<${e} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,re),n}return s}let Xt=c.Fragment;function en(e,s){let n=c.useId(),o=Dt(),{value:i,defaultValue:r,form:p,name:m,onChange:f,by:d,invalid:b=!1,disabled:w=o||!1,horizontal:u=!1,multiple:a=!1,__demoMode:g=!1,...D}=e;const T=u?"horizontal":"vertical";let V=oe(s),k=nt(r),[y=a?[]:void 0,C]=st(i,f,k),O=Ue({id:n,__demoMode:g}),H=c.useRef({static:!1,hold:!1}),U=c.useRef(new Map),M=tt(d),q=c.useCallback(N=>Z(x.mode,{[Q.Multi]:()=>y.some(te=>M(te,N)),[Q.Single]:()=>M(y,N)}),[y]),x=J({value:y,disabled:w,invalid:b,mode:a?Q.Multi:Q.Single,orientation:T,onChange:C,compare:M,isSelected:q,optionsPropsRef:H,listRef:U});ye(()=>{O.state.dataRef.current=x},[x]);let B=S(O,N=>N.listboxState),F=He.get(null),G=S(F,c.useCallback(N=>F.selectors.isTop(N,n),[F,n])),[A,h]=S(O,N=>[N.buttonElement,N.optionsElement]);St(G,[A,h],(N,te)=>{O.send({type:ze.CloseListbox}),Vt(te,Ht.Loose)||(N.preventDefault(),A==null||A.focus())});let W=J({open:B===L.Open,disabled:w,invalid:b,value:y}),[he,be]=Ft({inherit:!0}),ae={ref:V},fe=c.useCallback(()=>{if(k!==void 0)return C==null?void 0:C(k)},[C,k]),ve=se();return E.createElement(be,{value:he,props:{htmlFor:A==null?void 0:A.id},slot:{open:B===L.Open,disabled:w}},E.createElement(pt,null,E.createElement(Qe.Provider,{value:O},E.createElement(xe.Provider,{value:x},E.createElement(It,{value:Z(B,{[L.Open]:me.Open,[L.Closed]:me.Closed})},m!=null&&y!=null&&E.createElement(Bt,{disabled:w,data:{[m]:y},form:p,onReset:fe}),ve({ourProps:ae,theirProps:D,slot:W,defaultTag:Xt,name:"Listbox"}))))))}let tn="button";function nn(e,s){let n=c.useId(),o=kt(),i=re("Listbox.Button"),r=Se("Listbox.Button"),{id:p=o||`headlessui-listbox-button-${n}`,disabled:m=i.disabled||!1,autoFocus:f=!1,...d}=e,b=oe(s,at(),r.actions.setButtonElement),w=lt(),[u,a,g]=S(r,h=>[h.listboxState,h.buttonElement,h.optionsElement]),D=u===L.Open;bt(D,{trigger:a,action:c.useCallback(h=>{if(a!=null&&a.contains(h.target))return ce.Ignore;let W=h.target.closest('[role="option"]:not([data-disabled])');return At(W)?ce.Select(W):g!=null&&g.contains(h.target)?ce.Ignore:ce.Close},[a,g]),close:r.actions.closeListbox,select:r.actions.selectActiveOption});let T=_(h=>{switch(h.key){case j.Enter:Et(h.currentTarget);break;case j.Space:case j.ArrowDown:h.preventDefault(),r.actions.openListbox({focus:i.value?v.Nothing:v.First});break;case j.ArrowUp:h.preventDefault(),r.actions.openListbox({focus:i.value?v.Nothing:v.Last});break}}),V=_(h=>{switch(h.key){case j.Space:h.preventDefault();break}}),k=ft(h=>{var W;r.state.listboxState===L.Open?(Le.flushSync(()=>r.actions.closeListbox()),(W=r.state.buttonElement)==null||W.focus({preventScroll:!0})):(h.preventDefault(),r.actions.openListbox({focus:v.Nothing}))}),y=_(h=>h.preventDefault()),C=Mt([p]),O=Qt(),{isFocusVisible:H,focusProps:U}=Je({autoFocus:f}),{isHovered:M,hoverProps:q}=Xe({isDisabled:m}),{pressed:x,pressProps:B}=et({disabled:m}),F=J({open:u===L.Open,active:x||u===L.Open,disabled:m,invalid:i.invalid,value:i.value,hover:M,focus:H,autofocus:f}),G=S(r,h=>h.listboxState===L.Open),A=Ve(w(),{ref:b,id:p,type:Pt(e,a),"aria-haspopup":"listbox","aria-controls":g==null?void 0:g.id,"aria-expanded":G,"aria-labelledby":C,"aria-describedby":O,disabled:m||void 0,autoFocus:f,onKeyDown:T,onKeyUp:V,onKeyPress:y},k,U,q,B);return se()({ourProps:A,theirProps:d,slot:F,defaultTag:tn,name:"Listbox.Button"})}let qe=c.createContext(!1),sn="div",on=Pe.RenderStrategy|Pe.Static;function rn(e,s){let n=c.useId(),{id:o=`headlessui-listbox-options-${n}`,anchor:i,portal:r=!1,modal:p=!0,transition:m=!1,...f}=e,d=ct(i),[b,w]=c.useState(null);d&&(r=!0);let u=re("Listbox.Options"),a=Se("Listbox.Options"),[g,D,T,V]=S(a,l=>[l.listboxState,l.buttonElement,l.optionsElement,l.__demoMode]),k=Re(D),y=Re(T),C=$t(),[O,H]=Tt(m,b,C!==null?(C&me.Open)===me.Open:g===L.Open);yt(O,D,a.actions.closeListbox);let U=V?!1:p&&g===L.Open;Ot(U,y);let M=V?!1:p&&g===L.Open;gt(M,{allowed:c.useCallback(()=>[D,T],[D,T])});let q=S(a,a.selectors.didButtonMove)?!1:O,x=S(a,a.selectors.hasFrozenValue)&&!e.static,B=Kt(x,u.value),F=c.useCallback(l=>u.compare(B,l),[u.compare,B]),G=S(a,l=>{var z;if(d==null||!((z=d==null?void 0:d.to)!=null&&z.includes("selection")))return null;let ge=l.options.findIndex(Ze=>F(Ze.dataRef.current.value));return ge===-1&&(ge=0),ge}),A=(()=>{if(d==null)return;if(G===null)return{...d,inner:void 0};let l=Array.from(u.listRef.current.values());return{...d,inner:{listRef:{current:l},index:G}}})(),[h,W]=dt(A),he=ut(),be=oe(s,d?h:null,a.actions.setOptionsElement,w),ae=ot();c.useEffect(()=>{let l=T;l&&g===L.Open&&(zt(l)||l==null||l.focus({preventScroll:!0}))},[g,T]);let fe=_(l=>{var z;switch(ae.dispose(),l.key){case j.Space:if(a.state.searchQuery!=="")return l.preventDefault(),l.stopPropagation(),a.actions.search(l.key);case j.Enter:l.preventDefault(),l.stopPropagation(),a.actions.selectActiveOption();break;case Z(u.orientation,{vertical:j.ArrowDown,horizontal:j.ArrowRight}):return l.preventDefault(),l.stopPropagation(),a.actions.goToOption({focus:v.Next});case Z(u.orientation,{vertical:j.ArrowUp,horizontal:j.ArrowLeft}):return l.preventDefault(),l.stopPropagation(),a.actions.goToOption({focus:v.Previous});case j.Home:case j.PageUp:return l.preventDefault(),l.stopPropagation(),a.actions.goToOption({focus:v.First});case j.End:case j.PageDown:return l.preventDefault(),l.stopPropagation(),a.actions.goToOption({focus:v.Last});case j.Escape:l.preventDefault(),l.stopPropagation(),Le.flushSync(()=>a.actions.closeListbox()),(z=a.state.buttonElement)==null||z.focus({preventScroll:!0});return;case j.Tab:l.preventDefault(),l.stopPropagation(),Le.flushSync(()=>a.actions.closeListbox()),_t(a.state.buttonElement,l.shiftKey?$e.Previous:$e.Next);break;default:l.key.length===1&&(a.actions.search(l.key),ae.setTimeout(()=>a.actions.clearSearch(),350));break}}),ve=S(a,l=>{var z;return(z=l.buttonElement)==null?void 0:z.id}),N=J({open:g===L.Open}),te=Ve(d?he():{},{id:o,ref:be,"aria-activedescendant":S(a,a.selectors.activeDescendantId),"aria-multiselectable":u.mode===Q.Multi?!0:void 0,"aria-labelledby":ve,"aria-orientation":u.orientation,onKeyDown:fe,role:"listbox",tabIndex:g===L.Open?0:void 0,style:{...f.style,...W,"--button-width":mt(O,D,!0).width},...Ct(H)}),Ge=se(),Ye=c.useMemo(()=>u.mode===Q.Multi?u:{...u,isSelected:F},[u,F]);return E.createElement(Nt,{enabled:r?e.static||O:!1,ownerDocument:k},E.createElement(xe.Provider,{value:Ye},Ge({ourProps:te,theirProps:f,slot:N,defaultTag:sn,features:on,visible:q,name:"Listbox.Options"})))}let an="div";function ln(e,s){let n=c.useId(),{id:o=`headlessui-listbox-option-${n}`,disabled:i=!1,value:r,...p}=e,m=c.useContext(qe)===!0,f=re("Listbox.Option"),d=Se("Listbox.Option"),b=S(d,x=>d.selectors.isActive(x,o)),w=f.isSelected(r),u=c.useRef(null),a=Rt(u),g=it({disabled:i,value:r,domRef:u,get textValue(){return a()}}),D=oe(s,u,x=>{x?f.listRef.current.set(o,x):f.listRef.current.delete(o)}),T=S(d,x=>d.selectors.shouldScrollIntoView(x,o));ye(()=>{if(T)return rt().requestAnimationFrame(()=>{var x,B;(B=(x=u.current)==null?void 0:x.scrollIntoView)==null||B.call(x,{block:"nearest"})})},[T,u]),ye(()=>{if(!m)return d.actions.registerOption(o,g),()=>d.actions.unregisterOption(o)},[g,o,m]);let V=_(x=>{if(i)return x.preventDefault();d.actions.selectOption(r)}),k=_(()=>{if(i)return d.actions.goToOption({focus:v.Nothing});d.actions.goToOption({focus:v.Specific,id:o})}),y=vt(),C=_(x=>y.update(x)),O=_(x=>{y.wasMoved(x)&&(i||b&&d.state.activationTrigger===ue.Pointer||d.actions.goToOption({focus:v.Specific,id:o},ue.Pointer))}),H=_(x=>{y.wasMoved(x)&&(i||b&&d.state.activationTrigger===ue.Pointer&&d.actions.goToOption({focus:v.Nothing}))}),U=J({active:b,focus:b,selected:w,disabled:i,selectedOption:w&&m}),M=m?{}:{id:o,ref:D,role:"option",tabIndex:i===!0?void 0:-1,"aria-disabled":i===!0?!0:void 0,"aria-selected":w,disabled:void 0,onClick:V,onFocus:k,onPointerEnter:C,onMouseEnter:C,onPointerMove:O,onMouseMove:O,onPointerLeave:H,onMouseLeave:H},q=se();return!w&&m?null:q({ourProps:M,theirProps:p,slot:U,defaultTag:an,name:"Listbox.Option"})}let cn=c.Fragment;function dn(e,s){let{options:n,placeholder:o,...i}=e,r={ref:oe(s)},p=re("ListboxSelectedOption"),m=J({}),f=p.value===void 0||p.value===null||p.mode===Q.Multi&&Array.isArray(p.value)&&p.value.length===0,d=se();return E.createElement(qe.Provider,{value:!0},d({ourProps:r,theirProps:{...i,children:E.createElement(E.Fragment,null,o&&f?o:n)},slot:m,defaultTag:cn,name:"ListboxSelectedOption"}))}let un=ne(en),P=ne(nn),mn=pe,R=ne(rn),$=ne(ln),pn=ne(dn),I=Object.assign(un,{Button:P,Label:mn,Options:R,Option:$,SelectedOption:pn});const xn=`import {\r
  Listbox,\r
  ListboxButton,\r
  ListboxOption,\r
  ListboxOptions,\r
} from "@headlessui/react";\r
import { useState } from "react";\r
import { Icon } from "@iconify/react";\r
\r
const people = [\r
  { id: 1, name: "Durward Reynolds" },\r
  { id: 2, name: "Kenton Towne" },\r
  { id: 3, name: "Therese Wunsch" },\r
  { id: 4, name: "Benedict Kessler" },\r
  { id: 5, name: "Katelyn Rohan" },\r
];\r
\r
const BasicListCode = () => {\r
  const [selectedPerson, setSelectedPerson] = useState(people[0])\r
\r
  return (\r
    <div>\r
      <Listbox value={selectedPerson} onChange={setSelectedPerson}>\r
        <ListboxButton className='ui-button bg-primary justify-between items-center gap-3'>\r
          {selectedPerson.name}{' '}\r
          <Icon icon='solar:alt-arrow-down-outline' height={18} />\r
        </ListboxButton>\r
        <ListboxOptions anchor='bottom' className='ui-dropdown '>\r
          {people.map((person) => (\r
            <ListboxOption\r
              key={person.id}\r
              value={person}\r
              className='ui-dropdown-item'>\r
              {person.name}\r
            </ListboxOption>\r
          ))}\r
        </ListboxOptions>\r
      </Listbox>\r
    </div>\r
  )\r
}\r
\r
export default BasicListCode\r
`,hn=`import { useState } from 'react'\r
import { Icon } from '@iconify/react'\r
import {\r
  Field,\r
  Listbox,\r
  ListboxButton,\r
  ListboxOption,\r
  ListboxOptions,\r
} from '@headlessui/react'\r
\r
const people = [\r
  { id: 1, name: 'Durward Reynolds' },\r
  { id: 2, name: 'Kenton Towne' },\r
  { id: 3, name: 'Therese Wunsch' },\r
  { id: 4, name: 'Benedict Kessler' },\r
  { id: 5, name: 'Katelyn Rohan' },\r
]\r
\r
const DisableListboxCode = () => {\r
  const [selectedPerson, setSelectedPerson] = useState(people[0])\r
\r
  return (\r
    <div>\r
      <div>\r
        <Field className='flex gap-3 items-center w-fit' disabled>\r
          <Listbox value={selectedPerson} onChange={setSelectedPerson}>\r
            <ListboxButton className='ui-button bg-slate-500 justify-between items-center gap-3 w-full'>\r
              {selectedPerson.name}{' '}\r
              <Icon icon='solar:alt-arrow-down-outline' height={18} />\r
            </ListboxButton>\r
            <ListboxOptions anchor='bottom' className='ui-dropdown'>\r
              {people.map((person) => (\r
                <ListboxOption\r
                  key={person.id}\r
                  value={person}\r
                  className='ui-dropdown-item'>\r
                  {person.name}\r
                </ListboxOption>\r
              ))}\r
            </ListboxOptions>\r
          </Listbox>\r
        </Field>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default DisableListboxCode\r
`,bn=`import { useState } from 'react'\r
import { Icon } from '@iconify/react'\r
import {\r
  Description,\r
  Field,\r
  Label,\r
  Listbox,\r
  ListboxButton,\r
  ListboxOption,\r
  ListboxOptions,\r
} from '@headlessui/react'\r
\r
const people = [\r
  { id: 1, name: 'Durward Reynolds', available: true },\r
  { id: 2, name: 'Kenton Towne', available: true },\r
  { id: 3, name: 'Therese Wunsch', available: false },\r
  { id: 4, name: 'Benedict Kessler', available: false },\r
  { id: 5, name: 'Katelyn Rohan', available: true },\r
]\r
\r
const DisableListboxOptionCode = () => {\r
  const [selectedPerson, setSelectedPerson] = useState(people[0])\r
\r
  return (\r
    <div>\r
      <Field className='w-fit'>\r
        <Label className='text-sm mb-1 text-ld'>Assignee:</Label>\r
        <Description className='text-xs mb-2'>\r
          This person will have full access to this project.\r
        </Description>\r
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>\r
          <ListboxButton className='ui-button bg-success  justify-between items-center gap-3 w-full'>\r
            {selectedPerson.name}{' '}\r
            <Icon icon='solar:alt-arrow-down-outline' height={18} />\r
          </ListboxButton>\r
          <ListboxOptions anchor='bottom' className='ui-dropdown'>\r
            {people.map((person) => (\r
              <ListboxOption\r
                key={person.id}\r
                value={person}\r
                className='ui-dropdown-item data-[disabled]:opacity-50 data-[disabled]:hover:text-darklink'\r
                disabled={!person.available}>\r
                {person.name}\r
              </ListboxOption>\r
            ))}\r
          </ListboxOptions>\r
        </Listbox>\r
      </Field>\r
    </div>\r
  )\r
}\r
\r
export default DisableListboxOptionCode\r
`,fn=`import { useState } from 'react'\r
import { Icon } from '@iconify/react'\r
import {\r
  Field,\r
  Label,\r
  Listbox,\r
  ListboxButton,\r
  ListboxOption,\r
  ListboxOptions,\r
} from '@headlessui/react'\r
\r
const people = [\r
  { id: 1, name: 'Durward Reynolds' },\r
  { id: 2, name: 'Kenton Towne' },\r
  { id: 3, name: 'Therese Wunsch' },\r
  { id: 4, name: 'Benedict Kessler' },\r
  { id: 5, name: 'Katelyn Rohan' },\r
]\r
\r
const LabelWithListcode = () => {\r
  const [selectedPerson, setSelectedPerson] = useState(people[0])\r
\r
  return (\r
    <div>\r
      <Field className='flex gap-3 items-center w-fit'>\r
        <Label className='block text-ld font-medium'>Assignee:</Label>\r
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>\r
          <ListboxButton className='ui-button bg-secondary justify-between items-center gap-3 w-full'>\r
            {selectedPerson.name}{' '}\r
            <Icon icon='solar:alt-arrow-down-outline' height={18} />\r
          </ListboxButton>\r
          <ListboxOptions anchor='bottom' className='ui-dropdown'>\r
            {people.map((person) => (\r
              <ListboxOption\r
                key={person.id}\r
                value={person}\r
                className='ui-dropdown-item'>\r
                {person.name}\r
              </ListboxOption>\r
            ))}\r
          </ListboxOptions>\r
        </Listbox>\r
      </Field>\r
    </div>\r
  )\r
}\r
\r
export default LabelWithListcode\r
`,vn=`import { useState } from 'react'\r
import { Icon } from '@iconify/react'\r
import {\r
  Description,\r
  Field,\r
  Label,\r
  Listbox,\r
  ListboxButton,\r
  ListboxOption,\r
  ListboxOptions,\r
} from '@headlessui/react'\r
\r
const people = [\r
  { id: 1, name: 'Durward Reynolds' },\r
  { id: 2, name: 'Kenton Towne' },\r
  { id: 3, name: 'Therese Wunsch' },\r
  { id: 4, name: 'Benedict Kessler' },\r
  { id: 5, name: 'Katelyn Rohan' },\r
]\r
\r
const ListBoxWithHtmlCode = () => {\r
  const [selectedPerson, setSelectedPerson] = useState(people[0])\r
\r
  return (\r
    <div>\r
      <form action='/projects/1' method='post ' className='flex gap-3 w-fit'>\r
        <Field className='w-full'>\r
          <Label className='text-sm mb-1 text-ld'>Assignee:</Label>\r
          <Description className='text-xs mb-2'>\r
            This person will have full access to this project.\r
          </Description>\r
          <Listbox\r
            name='assignee'\r
            value={selectedPerson}\r
            onChange={setSelectedPerson}>\r
            <span className='flex gap-3'>\r
              <ListboxButton className='ui-button bg-primary  justify-between items-center gap-3 w-full'>\r
                {selectedPerson.name}{' '}\r
                <Icon icon='solar:alt-arrow-down-outline' height={18} />\r
              </ListboxButton>\r
              <button className='ui-button bg-secondary'>Submit</button>\r
            </span>\r
            <ListboxOptions anchor='bottom' className='ui-dropdown'>\r
              {people.map((person) => (\r
                <ListboxOption\r
                  key={person.id}\r
                  value={person}\r
                  className='ui-dropdown-item'>\r
                  {person.name}\r
                </ListboxOption>\r
              ))}\r
            </ListboxOptions>\r
          </Listbox>\r
        </Field>\r
      </form>\r
    </div>\r
  )\r
}\r
\r
export default ListBoxWithHtmlCode\r
`,gn=`import { useState } from 'react'\r
import { Icon } from '@iconify/react'\r
import {\r
  Description,\r
  Field,\r
  Listbox,\r
  ListboxButton,\r
  ListboxOption,\r
  ListboxOptions,\r
} from '@headlessui/react'\r
\r
const people = [\r
  { id: 1, name: 'Durward Reynolds', available: true },\r
  { id: 2, name: 'Kenton Towne', available: true },\r
  { id: 3, name: 'Therese Wunsch', available: false },\r
  { id: 4, name: 'Benedict Kessler', available: false },\r
  { id: 5, name: 'Katelyn Rohan', available: true },\r
]\r
\r
const ListDescCode = () => {\r
  const [selectedPerson, setSelectedPerson] = useState(people[0])\r
\r
  return (\r
    <div>\r
      <Field className='w-fit'>\r
        <Description className='text-xs mb-2'>\r
          This person will have full access to this project. This person will\r
          have full access to this project.\r
        </Description>\r
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>\r
          <ListboxButton className='ui-button bg-warning  justify-between items-center gap-3 w-full'>\r
            {selectedPerson.name}{' '}\r
            <Icon icon='solar:alt-arrow-down-outline' height={18} />\r
          </ListboxButton>\r
          <ListboxOptions anchor='bottom' className='ui-dropdown'>\r
            {people.map((person) => (\r
              <ListboxOption\r
                key={person.id}\r
                value={person}\r
                className='ui-dropdown-item'>\r
                {person.name}\r
              </ListboxOption>\r
            ))}\r
          </ListboxOptions>\r
        </Listbox>\r
      </Field>\r
    </div>\r
  )\r
}\r
\r
export default ListDescCode\r
`,Ie=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],wn=()=>{const[e,s]=c.useState(Ie[0]);return t.jsx("div",{children:t.jsxs(I,{value:e,onChange:s,children:[t.jsxs(P,{className:"ui-button bg-primary justify-between items-center gap-3",children:[e.name," ",t.jsx(K,{icon:"solar:alt-arrow-down-outline",height:18})]}),t.jsx(R,{anchor:"bottom",className:"ui-dropdown ",children:Ie.map(n=>t.jsx($,{value:n,className:"ui-dropdown-item",children:n.name},n.id))})]})})},jn=()=>t.jsx(X,{className:"p-0",children:t.jsx("div",{children:t.jsxs("div",{className:"p-6",children:[t.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Basic Listbox"}),t.jsx(wn,{})]})})}),De=[{id:1,name:"Durward Reynolds",available:!0},{id:2,name:"Kenton Towne",available:!0},{id:3,name:"Therese Wunsch",available:!1},{id:4,name:"Benedict Kessler",available:!1},{id:5,name:"Katelyn Rohan",available:!0}],Ln=()=>{const[e,s]=c.useState(De[0]);return t.jsx("div",{children:t.jsxs(ie,{className:"w-fit",children:[t.jsx(pe,{className:"text-sm mb-1 text-ld",children:"Assignee:"}),t.jsx(Oe,{className:"text-xs mb-2",children:"This person will have full access to this project."}),t.jsxs(I,{value:e,onChange:s,children:[t.jsxs(P,{className:"ui-button bg-success  justify-between items-center gap-3 w-full",children:[e.name," ",t.jsx(K,{icon:"solar:alt-arrow-down-outline",height:18})]}),t.jsx(R,{anchor:"bottom",className:"ui-dropdown",children:De.map(n=>t.jsx($,{value:n,className:"ui-dropdown-item data-[disabled]:opacity-50 data-[disabled]:hover:text-darklink",disabled:!n.available,children:n.name},n.id))})]})]})})},yn=()=>t.jsx(X,{className:"p-0",children:t.jsx("div",{children:t.jsxs("div",{className:"p-6",children:[t.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Disable Listbox Option"}),t.jsx(Ln,{})]})})}),Be=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],On=()=>{const[e,s]=c.useState(Be[0]);return t.jsx("div",{children:t.jsx("div",{children:t.jsx(ie,{className:"flex gap-3 items-center w-fit",disabled:!0,children:t.jsxs(I,{value:e,onChange:s,children:[t.jsxs(P,{className:"ui-button bg-slate-500 justify-between items-center gap-3 w-full",children:[e.name," ",t.jsx(K,{icon:"solar:alt-arrow-down-outline",height:18})]}),t.jsx(R,{anchor:"bottom",className:"ui-dropdown",children:Be.map(n=>t.jsx($,{value:n,className:"ui-dropdown-item",children:n.name},n.id))})]})})})})},Nn=()=>t.jsx(X,{className:"p-0",children:t.jsx("div",{children:t.jsxs("div",{className:"p-6",children:[t.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Disable Listbox"}),t.jsx(On,{})]})})}),Ee=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],Sn=()=>{const[e,s]=c.useState(Ee[0]);return t.jsx("div",{children:t.jsxs(ee,{children:[t.jsx("div",{className:"flex items-center justify-between mb-2",children:t.jsx("h4",{className:"text-lg font-semibold",children:"Horizontal Listbox"})}),t.jsxs(I,{value:e,onChange:s,children:[t.jsxs(P,{className:"ui-button bg-info justify-between items-center gap-3",children:[e.name," ",t.jsx(K,{icon:"solar:alt-arrow-down-outline",height:18})]}),t.jsx(R,{anchor:"bottom",className:"ui-dropdown w-80 !max-w-80 flex flex-row",children:Ee.map(n=>t.jsx($,{value:n,className:"ui-dropdown-item",children:n.name},n.id))})]})]})})},Ke=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],Pn=()=>{const[e,s]=c.useState(Ke[0]);return t.jsx("div",{children:t.jsxs(ie,{className:"flex gap-3 items-center w-fit",children:[t.jsx(pe,{className:"block text-ld font-medium",children:"Assignee:"}),t.jsxs(I,{value:e,onChange:s,children:[t.jsxs(P,{className:"ui-button bg-secondary justify-between items-center gap-3 w-full",children:[e.name," ",t.jsx(K,{icon:"solar:alt-arrow-down-outline",height:18})]}),t.jsx(R,{anchor:"bottom",className:"ui-dropdown",children:Ke.map(n=>t.jsx($,{value:n,className:"ui-dropdown-item",children:n.name},n.id))})]})]})})},Rn=()=>t.jsx(X,{className:"p-0",children:t.jsx("div",{children:t.jsxs("div",{className:"p-6",children:[t.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Label With Listbox"}),t.jsx(Pn,{})]})})}),ke=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],$n=()=>{const[e,s]=c.useState(ke[0]);return t.jsx("div",{children:t.jsxs(ee,{children:[t.jsx("div",{className:"flex items-center justify-between mb-2",children:t.jsx("h4",{className:"text-lg font-semibold",children:"Listbox With Framer Motion "})}),t.jsx(I,{value:e,onChange:s,children:({open:n})=>t.jsxs("div",{children:[t.jsxs(P,{className:"ui-button bg-secondary justify-between items-center gap-3",children:[e.name," ",t.jsx(K,{icon:"solar:alt-arrow-down-outline",height:18})]}),t.jsx(Ut,{children:n&&t.jsx(R,{static:!0,as:qt.div,initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},anchor:"bottom",className:"origin-top ui-dropdown ",children:ke.map(o=>t.jsx($,{value:o,className:"ui-dropdown-item",children:o.name},o.id))})})]})})]})})},Me=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],Tn=()=>{const[e,s]=c.useState(Me[0]);return t.jsx("div",{children:t.jsxs(ee,{children:[t.jsx("div",{className:"flex items-center justify-between mb-2",children:t.jsx("h4",{className:"text-lg font-semibold",children:"Listbox With Transitions"})}),t.jsxs(I,{value:e,onChange:s,children:[t.jsxs(P,{className:"ui-button bg-primary justify-between items-center gap-3",children:[e.name," ",t.jsx(K,{icon:"solar:alt-arrow-down-outline",height:18})]}),t.jsx(R,{anchor:"bottom",transition:!0,className:"ui-dropdown origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0",children:Me.map(n=>t.jsx($,{value:n,className:"ui-dropdown-item",children:n.name},n.id))})]})]})})},Fe=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],Cn=()=>{const[e,s]=c.useState(Fe[0]);return t.jsx("div",{children:t.jsxs(ee,{children:[t.jsx("div",{className:"flex items-center justify-between mb-2",children:t.jsx("h4",{className:"text-lg font-semibold",children:"Listbox Width"})}),t.jsxs(I,{value:e,onChange:s,children:[t.jsxs(P,{className:"ui-button bg-error justify-between items-center gap-3",children:[e.name," ",t.jsx(K,{icon:"solar:alt-arrow-down-outline",height:18})]}),t.jsx(R,{anchor:"bottom",className:"ui-dropdown w-80 !max-w-80",children:Fe.map(n=>t.jsx($,{value:n,className:"ui-dropdown-item",children:n.name},n.id))})]})]})})},Ae=[{id:1,name:"Durward Reynolds",available:!0},{id:2,name:"Kenton Towne",available:!0},{id:3,name:"Therese Wunsch",available:!1},{id:4,name:"Benedict Kessler",available:!1},{id:5,name:"Katelyn Rohan",available:!0}],In=()=>{const[e,s]=c.useState(Ae[0]);return t.jsx("div",{children:t.jsxs(ie,{className:"w-fit",children:[t.jsx(Oe,{className:"text-xs mb-2",children:"This person will have full access to this project. This person will have full access to this project."}),t.jsxs(I,{value:e,onChange:s,children:[t.jsxs(P,{className:"ui-button bg-warning  justify-between items-center gap-3 w-full",children:[e.name," ",t.jsx(K,{icon:"solar:alt-arrow-down-outline",height:18})]}),t.jsx(R,{anchor:"bottom",className:"ui-dropdown",children:Ae.map(n=>t.jsx($,{value:n,className:"ui-dropdown-item",children:n.name},n.id))})]})]})})},Dn=()=>t.jsx(X,{className:"p-0",children:t.jsx("div",{children:t.jsxs("div",{className:"p-6",children:[t.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Listbox With Description"}),t.jsx(In,{})]})})}),We=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],Bn=()=>{const[e,s]=c.useState(We[0]);return t.jsx("div",{children:t.jsx("form",{action:"/projects/1",method:"post ",className:"flex gap-3 w-fit",children:t.jsxs(ie,{className:"w-full",children:[t.jsx(pe,{className:"text-sm mb-1 text-ld",children:"Assignee:"}),t.jsx(Oe,{className:"text-xs mb-2",children:"This person will have full access to this project."}),t.jsxs(I,{name:"assignee",value:e,onChange:s,children:[t.jsxs("span",{className:"flex gap-3",children:[t.jsxs(P,{className:"ui-button bg-primary  justify-between items-center gap-3 w-full",children:[e.name," ",t.jsx(K,{icon:"solar:alt-arrow-down-outline",height:18})]}),t.jsx("button",{className:"ui-button bg-secondary",children:"Submit"})]}),t.jsx(R,{anchor:"bottom",className:"ui-dropdown",children:We.map(n=>t.jsx($,{value:n,className:"ui-dropdown-item",children:n.name},n.id))})]})]})})})},En=()=>t.jsx(X,{className:"p-0",children:t.jsx("div",{children:t.jsxs("div",{className:"p-6",children:[t.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Using HTML forms"}),t.jsx(Bn,{})]})})}),je=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],Kn=()=>{const[e,s]=c.useState([je[0],je[1]]);return t.jsx("div",{children:t.jsxs(ee,{children:[t.jsx("div",{className:"flex items-center justify-between mb-2",children:t.jsx("h4",{className:"text-lg font-semibold",children:"Selecting Multiple Values"})}),t.jsxs(I,{value:e,onChange:s,multiple:!0,children:[t.jsx(P,{className:"ui-button bg-success justify-between items-center gap-3",children:e.map(n=>n.name).join(", ")}),t.jsx(R,{anchor:"bottom",className:"origin-top ui-dropdown",children:je.map(n=>t.jsx($,{value:n,className:"ui-dropdown-item",children:n.name},n.id))})]})]})})},_e=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}];let kn=c.forwardRef(function(s,n){return t.jsx("button",{ref:n,...s})});const Mn=()=>{const[e,s]=c.useState(_e[0]);return t.jsx("div",{children:t.jsxs(ee,{children:[t.jsx("div",{className:"flex items-center justify-between mb-2",children:t.jsx("h4",{className:"text-lg font-semibold",children:"Rendering as Different Elements "})}),t.jsxs(I,{value:e,onChange:s,children:[t.jsxs(P,{as:kn,className:"ui-button bg-error justify-between items-center gap-3",children:[e.name," ",t.jsx(K,{icon:"solar:alt-arrow-down-outline",height:18})]}),t.jsx(R,{anchor:"bottom",as:"ul",className:"ui-dropdown",children:_e.map(n=>t.jsx($,{as:"li",value:n,className:"ui-dropdown-item",children:n.name},n.id))})]})]})})},Fn=[{to:"/",title:"Home"},{title:"Listbox"}],Ps=()=>t.jsxs(t.Fragment,{children:[t.jsx(Gt,{title:"Listbox",items:Fn}),t.jsxs("div",{className:"grid grid-cols-12 gap-7",children:[t.jsxs("div",{className:"col-span-12",children:[t.jsx(jn,{}),t.jsx(Y,{children:xn})]}),t.jsxs("div",{className:"col-span-12",children:[t.jsx(Rn,{}),t.jsx(Y,{children:fn})]}),t.jsxs("div",{className:" col-span-12",children:[t.jsx(Nn,{}),t.jsx(Y,{children:hn})]}),t.jsxs("div",{className:" col-span-12",children:[t.jsx(yn,{}),t.jsx(Y,{children:bn})]}),t.jsxs("div",{className:" col-span-12",children:[t.jsx(Dn,{}),t.jsx(Y,{children:gn})]}),t.jsxs("div",{className:" col-span-12",children:[t.jsx(En,{}),t.jsx(Y,{children:vn})]}),t.jsx("div",{className:" col-span-12",children:t.jsx(Cn,{})}),t.jsx("div",{className:" col-span-12",children:t.jsx(Sn,{})}),t.jsx("div",{className:" col-span-12",children:t.jsx(Tn,{})}),t.jsx("div",{className:" col-span-12",children:t.jsx($n,{})}),t.jsx("div",{className:" col-span-12",children:t.jsx(Kn,{})}),t.jsx("div",{className:" col-span-12",children:t.jsx(Mn,{})})]})]});export{Ps as default};
