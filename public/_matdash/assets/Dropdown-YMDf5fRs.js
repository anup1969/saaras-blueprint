import{r as x,R,au as oe,j as e,I as M}from"./index-CW78-08q.js";import{C as L}from"./CodeDialog-DRC5ECma.js";import{$ as Te,a as Pe}from"./useFocusRing-C4a7XbRQ.js";import{w as Ee}from"./use-active-press-B3Qy7rBF.js";import{u as je,Y as F,o as S,p as Be,a as ne,V as be,K as _,n as Z,A as me,b as Ae}from"./render-PQ-Pxh_K.js";import{y as Le,R as Oe,T as Re,w as Fe,A as _e,b as He,F as Ge}from"./floating-C6eYABgK.js";import{p as Ue,c as J,a as f,f as z,b as Ke,u as Qe,L as Ve,S as Y,s as We}from"./element-movement-BbZLIwML.js";import{y as qe}from"./use-inert-others-W2fYjl6r.js";import{T as ze,a as pe,x as Ie,b as Ye,c as Ze,S as B,u as he,p as Je,f as Xe,t as en,k as nn}from"./portal-CQCUm35T.js";import{e as tn}from"./use-resolve-button-type-7cxUGDs4.js";import{y as te}from"./use-sync-refs-r_6MKybg.js";import{s as rn}from"./use-text-value-DP0YWZuY.js";import{u as on,N as sn,i as X,x as an,c as ln}from"./open-closed-4Djpi9n_.js";import{F as dn}from"./use-tree-walker-dd1c6lTC.js";import{n as un}from"./dom-BlW_0b_t.js";import{G as cn,R as mn,T as xe,K as ve,H as pn,I as hn}from"./focus-management-CvCJ9ylc.js";import{d as xn}from"./owner-DjBRcPii.js";import{H as gn}from"./description-CcLMe4Pd.js";import{o as v}from"./keyboard-C1Wiwm26.js";import{V as we,C as fn}from"./label-UoigDyJw.js";import{C as O}from"./card-BmJIY3HQ.js";import{C as re}from"./CardBox-CJgwgOI2.js";import{A as jn}from"./index-DvEJYGhg.js";import{m as bn}from"./proxy-XKVULd5X.js";import{B as In}from"./BreadcrumbComp-mrdJNCbj.js";import"./index-DaNAaBSr.js";import"./vsc-dark-plus-CoILpeng.js";import"./highlight-DCblhEs5.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./bugs-BJ7ScNGK.js";import"./with-selector-BYMhMrXh.js";import"./disabled-ya7cIcFn.js";import"./chevron-right-B2L8yKO6.js";import"./createLucideIcon-BxwgNh2l.js";var vn=Object.defineProperty,wn=(n,r,t)=>r in n?vn(n,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[r]=t,ge=(n,r,t)=>(wn(n,typeof r!="symbol"?r+"":r,t),t),w=(n=>(n[n.Open=0]="Open",n[n.Closed=1]="Closed",n))(w||{}),ee=(n=>(n[n.Pointer=0]="Pointer",n[n.Other=1]="Other",n))(ee||{}),c=(n=>(n[n.OpenMenu=0]="OpenMenu",n[n.CloseMenu=1]="CloseMenu",n[n.GoToItem=2]="GoToItem",n[n.Search=3]="Search",n[n.ClearSearch=4]="ClearSearch",n[n.RegisterItems=5]="RegisterItems",n[n.UnregisterItems=6]="UnregisterItems",n[n.SetButtonElement=7]="SetButtonElement",n[n.SetItemsElement=8]="SetItemsElement",n[n.SortItems=9]="SortItems",n[n.MarkButtonAsMoved=10]="MarkButtonAsMoved",n))(c||{});function fe(n,r=t=>t){let t=n.activeItemIndex!==null?n.items[n.activeItemIndex]:null,o=cn(r(n.items.slice()),a=>a.dataRef.current.domRef.current),s=t?o.indexOf(t):null;return s===-1&&(s=null),{items:o,activeItemIndex:s}}let Mn={1(n){if(n.menuState===1)return n;let r=n.buttonElement?J.Tracked(Ke(n.buttonElement)):n.buttonPositionState;return{...n,activeItemIndex:null,pendingFocus:{focus:f.Nothing},menuState:1,buttonPositionState:r}},0(n,r){return n.menuState===0?n:{...n,__demoMode:!1,pendingFocus:r.focus,menuState:0,buttonPositionState:J.Idle}},2:(n,r)=>{var t,o,s,a,d;if(n.menuState===1)return n;let g={...n,searchQuery:"",activationTrigger:(t=r.trigger)!=null?t:1,__demoMode:!1};if(r.focus===f.Nothing)return{...g,activeItemIndex:null};if(r.focus===f.Specific)return{...g,activeItemIndex:n.items.findIndex(i=>i.id===r.id)};if(r.focus===f.Previous){let i=n.activeItemIndex;if(i!==null){let P=n.items[i].dataRef.current.domRef,b=z(r,{resolveItems:()=>n.items,resolveActiveIndex:()=>n.activeItemIndex,resolveId:p=>p.id,resolveDisabled:p=>p.dataRef.current.disabled});if(b!==null){let p=n.items[b].dataRef.current.domRef;if(((o=P.current)==null?void 0:o.previousElementSibling)===p.current||((s=p.current)==null?void 0:s.previousElementSibling)===null)return{...g,activeItemIndex:b}}}}else if(r.focus===f.Next){let i=n.activeItemIndex;if(i!==null){let P=n.items[i].dataRef.current.domRef,b=z(r,{resolveItems:()=>n.items,resolveActiveIndex:()=>n.activeItemIndex,resolveId:p=>p.id,resolveDisabled:p=>p.dataRef.current.disabled});if(b!==null){let p=n.items[b].dataRef.current.domRef;if(((a=P.current)==null?void 0:a.nextElementSibling)===p.current||((d=p.current)==null?void 0:d.nextElementSibling)===null)return{...g,activeItemIndex:b}}}}let j=fe(n),k=z(r,{resolveItems:()=>j.items,resolveActiveIndex:()=>j.activeItemIndex,resolveId:i=>i.id,resolveDisabled:i=>i.dataRef.current.disabled});return{...g,...j,activeItemIndex:k}},3:(n,r)=>{let t=n.searchQuery!==""?0:1,o=n.searchQuery+r.value.toLowerCase(),s=(n.activeItemIndex!==null?n.items.slice(n.activeItemIndex+t).concat(n.items.slice(0,n.activeItemIndex+t)):n.items).find(d=>{var g;return((g=d.dataRef.current.textValue)==null?void 0:g.startsWith(o))&&!d.dataRef.current.disabled}),a=s?n.items.indexOf(s):-1;return a===-1||a===n.activeItemIndex?{...n,searchQuery:o}:{...n,searchQuery:o,activeItemIndex:a,activationTrigger:1}},4(n){return n.searchQuery===""?n:{...n,searchQuery:"",searchActiveItemIndex:null}},5:(n,r)=>{let t=n.items.concat(r.items.map(s=>s)),o=n.activeItemIndex;return n.pendingFocus.focus!==f.Nothing&&(o=z(n.pendingFocus,{resolveItems:()=>t,resolveActiveIndex:()=>n.activeItemIndex,resolveId:s=>s.id,resolveDisabled:s=>s.dataRef.current.disabled})),{...n,items:t,activeItemIndex:o,pendingFocus:{focus:f.Nothing},pendingShouldSort:!0}},6:(n,r)=>{let t=n.items,o=[],s=new Set(r.items);for(let[a,d]of t.entries())if(s.has(d.id)&&(o.push(a),s.delete(d.id),s.size===0))break;if(o.length>0){t=t.slice();for(let a of o.reverse())t.splice(a,1)}return{...n,items:t,activationTrigger:1}},7:(n,r)=>n.buttonElement===r.element?n:{...n,buttonElement:r.element},8:(n,r)=>n.itemsElement===r.element?n:{...n,itemsElement:r.element},9:n=>n.pendingShouldSort?{...n,...fe(n),pendingShouldSort:!1}:n,10(n){return n.buttonPositionState.kind!=="Tracked"?n:{...n,buttonPositionState:J.Moved}}};class ae extends ze{constructor(r){super(r),ge(this,"actions",{registerItem:pe(()=>{let t=[],o=new Set;return[(s,a)=>{o.has(a)||(o.add(a),t.push({id:s,dataRef:a}))},()=>(o.clear(),this.send({type:5,items:t.splice(0)}))]}),unregisterItem:pe(()=>{let t=[];return[o=>t.push(o),()=>this.send({type:6,items:t.splice(0)})]})}),ge(this,"selectors",{activeDescendantId(t){var o;let s=t.activeItemIndex,a=t.items;return s===null||(o=a[s])==null?void 0:o.id},isActive(t,o){var s;let a=t.activeItemIndex,d=t.items;return a!==null?((s=d[a])==null?void 0:s.id)===o:!1},shouldScrollIntoView(t,o){return t.__demoMode||t.menuState!==0||t.activationTrigger===0?!1:this.isActive(t,o)},didButtonMove(t){return t.buttonPositionState.kind==="Moved"}}),this.on(5,()=>{this.disposables.requestAnimationFrame(()=>{this.send({type:9})})});{let t=this.state.id,o=Ie.get(null);this.disposables.add(o.on(Ye.Push,s=>{!o.selectors.isTop(s,t)&&this.state.menuState===0&&this.send({type:1})})),this.on(0,()=>o.actions.push(t)),this.on(1,()=>o.actions.pop(t))}this.disposables.group(t=>{this.on(1,o=>{o.buttonElement&&(t.dispose(),t.add(Ue(o.buttonElement,o.buttonPositionState,()=>{this.send({type:10})})))})})}static new({id:r,__demoMode:t=!1}){return new ae({id:r,__demoMode:t,menuState:t?0:1,buttonElement:null,itemsElement:null,items:[],searchQuery:"",activeItemIndex:null,activationTrigger:1,pendingShouldSort:!1,pendingFocus:{focus:f.Nothing},buttonPositionState:J.Idle})}reduce(r,t){return je(t.type,Mn,r,t)}}const Me=x.createContext(null);function le(n){let r=x.useContext(Me);if(r===null){let t=new Error(`<${n} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,Ne),t}return r}function Ne({id:n,__demoMode:r=!1}){let t=x.useMemo(()=>ae.new({id:n,__demoMode:r}),[]);return Ze(()=>t.dispose()),t}let Nn=x.Fragment;function yn(n,r){let t=x.useId(),{__demoMode:o=!1,...s}=n,a=Ne({id:t,__demoMode:o}),[d,g,j]=B(a,N=>[N.menuState,N.itemsElement,N.buttonElement]),k=te(r),i=Ie.get(null),P=B(i,x.useCallback(N=>i.selectors.isTop(N,t),[i,t]));nn(P,[j,g],(N,y)=>{var D;a.send({type:c.CloseMenu}),pn(y,hn.Loose)||(N.preventDefault(),(D=a.state.buttonElement)==null||D.focus())});let b=S(()=>{a.send({type:c.CloseMenu})}),p=ne({open:d===w.Open,close:b}),I={ref:k},E=_();return R.createElement(_e,null,R.createElement(Me.Provider,{value:a},R.createElement(ln,{value:je(d,{[w.Open]:X.Open,[w.Closed]:X.Closed})},E({ourProps:I,theirProps:s,slot:p,defaultTag:Nn,name:"Menu"}))))}let Dn="button";function Sn(n,r){let t=le("Menu.Button"),o=x.useId(),{id:s=`headlessui-menu-button-${o}`,disabled:a=!1,autoFocus:d=!1,...g}=n,j=x.useRef(null),k=He(),i=te(r,j,Ge(),S(m=>t.send({type:c.SetButtonElement,element:m}))),P=S(m=>{switch(m.key){case v.Space:case v.Enter:case v.ArrowDown:m.preventDefault(),m.stopPropagation(),t.send({type:c.OpenMenu,focus:{focus:f.First}});break;case v.ArrowUp:m.preventDefault(),m.stopPropagation(),t.send({type:c.OpenMenu,focus:{focus:f.Last}});break}}),b=S(m=>{switch(m.key){case v.Space:m.preventDefault();break}}),[p,I,E]=B(t,m=>[m.menuState,m.buttonElement,m.itemsElement]),N=p===w.Open;Ve(N,{trigger:I,action:x.useCallback(m=>{if(I!=null&&I.contains(m.target))return Y.Ignore;let h=m.target.closest('[role="menuitem"]:not([data-disabled])');return un(h)?Y.Select(h):E!=null&&E.contains(m.target)?Y.Ignore:Y.Close},[I,E]),close:x.useCallback(()=>t.send({type:c.CloseMenu}),[]),select:x.useCallback(m=>m.click(),[])});let y=We(m=>{var h;a||(p===w.Open?(oe.flushSync(()=>t.send({type:c.CloseMenu})),(h=j.current)==null||h.focus({preventScroll:!0})):(m.preventDefault(),t.send({type:c.OpenMenu,focus:{focus:f.Nothing},trigger:ee.Pointer})))}),{isFocusVisible:D,focusProps:H}=Te({autoFocus:d}),{isHovered:K,hoverProps:G}=Pe({isDisabled:a}),{pressed:A,pressProps:Q}=Ee({disabled:a}),U=ne({open:p===w.Open,active:A||p===w.Open,disabled:a,hover:K,focus:D,autofocus:d}),V=be(k(),{ref:i,id:s,type:tn(n,j.current),"aria-haspopup":"menu","aria-controls":E==null?void 0:E.id,"aria-expanded":p===w.Open,disabled:a||void 0,autoFocus:d,onKeyDown:P,onKeyUp:b},y,H,G,Q);return _()({ourProps:V,theirProps:g,slot:U,defaultTag:Dn,name:"Menu.Button"})}let Cn="div",$n=me.RenderStrategy|me.Static;function kn(n,r){let t=x.useId(),{id:o=`headlessui-menu-items-${t}`,anchor:s,portal:a=!1,modal:d=!0,transition:g=!1,...j}=n,k=Le(s),i=le("Menu.Items"),[P,b]=Oe(k),p=Re(),[I,E]=x.useState(null),N=te(r,k?P:null,S(l=>i.send({type:c.SetItemsElement,element:l})),E),[y,D]=B(i,l=>[l.menuState,l.buttonElement]),H=he(D),K=he(I);k&&(a=!0);let G=on(),[A,Q]=sn(g,I,G!==null?(G&X.Open)===X.Open:y===w.Open);Je(A,D,()=>{i.send({type:c.CloseMenu})});let U=B(i,l=>l.__demoMode),V=U?!1:d&&y===w.Open;Xe(V,K);let m=U?!1:d&&y===w.Open;qe(m,{allowed:x.useCallback(()=>[D,I],[D,I])});let h=B(i,i.selectors.didButtonMove)?!1:A;x.useEffect(()=>{let l=I;l&&y===w.Open&&(xn(l)||l.focus({preventScroll:!0}))},[y,I]),dn(y===w.Open,{container:I,accept(l){return l.getAttribute("role")==="menuitem"?NodeFilter.FILTER_REJECT:l.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(l){l.setAttribute("role","none")}});let W=Be(),ye=S(l=>{var q,ue,ce;switch(W.dispose(),l.key){case v.Space:if(i.state.searchQuery!=="")return l.preventDefault(),l.stopPropagation(),i.send({type:c.Search,value:l.key});case v.Enter:if(l.preventDefault(),l.stopPropagation(),i.state.activeItemIndex!==null){let{dataRef:ke}=i.state.items[i.state.activeItemIndex];(ue=(q=ke.current)==null?void 0:q.domRef.current)==null||ue.click()}i.send({type:c.CloseMenu}),ve(i.state.buttonElement);break;case v.ArrowDown:return l.preventDefault(),l.stopPropagation(),i.send({type:c.GoToItem,focus:f.Next});case v.ArrowUp:return l.preventDefault(),l.stopPropagation(),i.send({type:c.GoToItem,focus:f.Previous});case v.Home:case v.PageUp:return l.preventDefault(),l.stopPropagation(),i.send({type:c.GoToItem,focus:f.First});case v.End:case v.PageDown:return l.preventDefault(),l.stopPropagation(),i.send({type:c.GoToItem,focus:f.Last});case v.Escape:l.preventDefault(),l.stopPropagation(),oe.flushSync(()=>i.send({type:c.CloseMenu})),(ce=i.state.buttonElement)==null||ce.focus({preventScroll:!0});break;case v.Tab:l.preventDefault(),l.stopPropagation(),oe.flushSync(()=>i.send({type:c.CloseMenu})),mn(i.state.buttonElement,l.shiftKey?xe.Previous:xe.Next);break;default:l.key.length===1&&(i.send({type:c.Search,value:l.key}),W.setTimeout(()=>i.send({type:c.ClearSearch}),350));break}}),De=S(l=>{switch(l.key){case v.Space:l.preventDefault();break}}),Se=ne({open:y===w.Open}),Ce=be(k?p():{},{"aria-activedescendant":B(i,i.selectors.activeDescendantId),"aria-labelledby":B(i,l=>{var q;return(q=l.buttonElement)==null?void 0:q.id}),id:o,onKeyDown:ye,onKeyUp:De,role:"menu",tabIndex:y===w.Open?0:void 0,ref:N,style:{...j.style,...b,"--button-width":Fe(A,D,!0).width},...an(Q)}),$e=_();return R.createElement(en,{enabled:a?n.static||A:!1,ownerDocument:H},$e({ourProps:Ce,theirProps:j,slot:Se,defaultTag:Cn,features:$n,visible:h,name:"Menu.Items"}))}let Tn=x.Fragment;function Pn(n,r){let t=x.useId(),{id:o=`headlessui-menu-item-${t}`,disabled:s=!1,...a}=n,d=le("Menu.Item"),g=B(d,h=>d.selectors.isActive(h,o)),j=x.useRef(null),k=te(r,j),i=B(d,h=>d.selectors.shouldScrollIntoView(h,o));Z(()=>{if(i)return Ae().requestAnimationFrame(()=>{var h,W;(W=(h=j.current)==null?void 0:h.scrollIntoView)==null||W.call(h,{block:"nearest"})})},[i,j]);let P=rn(j),b=x.useRef({disabled:s,domRef:j,get textValue(){return P()}});Z(()=>{b.current.disabled=s},[b,s]),Z(()=>(d.actions.registerItem(o,b),()=>d.actions.unregisterItem(o)),[b,o]);let p=S(()=>{d.send({type:c.CloseMenu})}),I=S(h=>{if(s)return h.preventDefault();d.send({type:c.CloseMenu}),ve(d.state.buttonElement)}),E=S(()=>{if(s)return d.send({type:c.GoToItem,focus:f.Nothing});d.send({type:c.GoToItem,focus:f.Specific,id:o})}),N=Qe(),y=S(h=>N.update(h)),D=S(h=>{N.wasMoved(h)&&(s||g||d.send({type:c.GoToItem,focus:f.Specific,id:o,trigger:ee.Pointer}))}),H=S(h=>{N.wasMoved(h)&&(s||g&&d.state.activationTrigger===ee.Pointer&&d.send({type:c.GoToItem,focus:f.Nothing}))}),[K,G]=we(),[A,Q]=gn(),U=ne({active:g,focus:g,disabled:s,close:p}),V={id:o,ref:k,role:"menuitem",tabIndex:s===!0?void 0:-1,"aria-disabled":s===!0?!0:void 0,"aria-labelledby":K,"aria-describedby":A,disabled:void 0,onClick:I,onFocus:E,onPointerEnter:y,onMouseEnter:y,onPointerMove:D,onMouseMove:D,onPointerLeave:H,onMouseLeave:H},m=_();return R.createElement(G,null,R.createElement(Q,null,m({ourProps:V,theirProps:a,slot:U,defaultTag:Tn,name:"Menu.Item"})))}let En="div";function Bn(n,r){let[t,o]=we(),s=n,a={ref:r,"aria-labelledby":t,role:"group"},d=_();return R.createElement(o,null,d({ourProps:a,theirProps:s,slot:{},defaultTag:En,name:"Menu.Section"}))}let An="header";function Ln(n,r){let t=x.useId(),{id:o=`headlessui-menu-heading-${t}`,...s}=n,a=fn();Z(()=>a.register(o),[o,a.register]);let d={id:o,ref:r,role:"presentation",...a.props};return _()({ourProps:d,theirProps:s,slot:{},defaultTag:An,name:"Menu.Heading"})}let On="div";function Rn(n,r){let t=n,o={ref:r,role:"separator"};return _()({ourProps:o,theirProps:t,slot:{},defaultTag:On,name:"Menu.Separator"})}let Fn=F(yn),C=F(Sn),$=F(kn),u=F(Pn),se=F(Bn),ie=F(Ln),de=F(Rn),T=Object.assign(Fn,{Button:C,Items:$,Item:u,Section:se,Heading:ie,Separator:de});const _n=`import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'\r
import { Icon } from '@iconify/react'\r
\r
const ButtonActionCode = () => {\r
  function showSettingsDialog() {\r
    alert('Open settings dialog!')\r
  }\r
  function showSupportDialog() {\r
    alert('Open Support dialog!')\r
  }\r
  function showLogoutDialog() {\r
    alert('Open Logout dialog!')\r
  }\r
\r
  return (\r
    <div>\r
      <Menu>\r
        <MenuButton className='ui-button bg-success gap-2'>\r
          My Action <Icon icon='solar:alt-arrow-down-outline' height={18} />\r
        </MenuButton>\r
        <MenuItems\r
          transition\r
          anchor='bottom'\r
          className='ui-dropdown ui-dropdown-animation'>\r
          <MenuItem>\r
            <button onClick={showSettingsDialog} className='ui-dropdown-item'>\r
              Settings\r
            </button>\r
          </MenuItem>\r
          <MenuItem>\r
            <button onClick={showSupportDialog} className='ui-dropdown-item'>\r
              Support\r
            </button>\r
          </MenuItem>\r
          <MenuItem>\r
            <button onClick={showLogoutDialog} className='ui-dropdown-item'>\r
              Logout\r
            </button>\r
          </MenuItem>\r
        </MenuItems>\r
      </Menu>\r
    </div>\r
  )\r
}\r
\r
export default ButtonActionCode\r
`,Hn=`import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'\r
import { Icon } from '@iconify/react/dist/iconify.js'\r
\r
const DisableItemCode = () => {\r
  return (\r
    <div>\r
      <Menu>\r
        <MenuButton className='ui-button bg-error gap-2'>\r
          My Profile <Icon icon='solar:alt-arrow-down-outline' height={18} />\r
        </MenuButton>\r
        <MenuItems\r
          transition\r
          anchor='bottom'\r
          className='ui-dropdown ui-dropdown-animation'>\r
          <MenuItem>\r
            <a className='ui-dropdown-item' href='/settings'>\r
              Settings\r
            </a>\r
          </MenuItem>\r
          <MenuItem>\r
            <a className='ui-dropdown-item' href='/support'>\r
              Support\r
            </a>\r
          </MenuItem>\r
          <MenuItem disabled>\r
            <a\r
              className='ui-dropdown-item data-[disabled]:opacity-50'\r
              href='/license'>\r
              License\r
            </a>\r
          </MenuItem>\r
          <MenuItem disabled>\r
            <a\r
              className='ui-dropdown-item data-[disabled]:opacity-50'\r
              href='/logout'>\r
              Logout\r
            </a>\r
          </MenuItem>\r
        </MenuItems>\r
      </Menu>\r
    </div>\r
  )\r
}\r
\r
export default DisableItemCode\r
`,Gn=`import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";\r
import { Icon } from "@iconify/react/dist/iconify.js";\r
\r
const DropdownPositionCode = () => {\r
  return (\r
    <div>\r
      <Menu>\r
        <MenuButton className='ui-button bg-secondary gap-2'>\r
          My Account <Icon icon='solar:alt-arrow-down-outline' height={18} />\r
        </MenuButton>\r
        <MenuItems\r
          transition\r
          anchor='top start'\r
          className='ui-dropdown ui-dropdown-animation'>\r
          <MenuItem>\r
            <a className='ui-dropdown-item' href='/settings'>\r
              Settings\r
            </a>\r
          </MenuItem>\r
          <MenuItem>\r
            <a className='ui-dropdown-item' href='/support'>\r
              Support\r
            </a>\r
          </MenuItem>\r
          <MenuItem>\r
            <a className='ui-dropdown-item' href='/license'>\r
              License\r
            </a>\r
          </MenuItem>\r
        </MenuItems>\r
      </Menu>\r
    </div>\r
  )\r
}\r
\r
export default DropdownPositionCode\r
`,Un=`import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'\r
import { Icon } from '@iconify/react'\r
\r
const DropdwonWidthCode = () => {\r
  return (\r
    <div>\r
      <Menu>\r
        <MenuButton className='ui-button  bg-primary gap-2'>\r
          My Account <Icon icon='solar:alt-arrow-down-outline' height={18} />\r
        </MenuButton>\r
        <MenuItems\r
          transition\r
          anchor='bottom'\r
          className='ui-dropdown ui-dropdown-animation !w-80 !max-w-80'>\r
          <MenuItem>\r
            <a className='ui-dropdown-item' href='/settings'>\r
              Settings\r
            </a>\r
          </MenuItem>\r
          <MenuItem>\r
            <a className='ui-dropdown-item' href='/support'>\r
              Support\r
            </a>\r
          </MenuItem>\r
          <MenuItem>\r
            <a className='ui-dropdown-item' href='/license'>\r
              License\r
            </a>\r
          </MenuItem>\r
        </MenuItems>\r
      </Menu>\r
    </div>\r
  )\r
}\r
\r
export default DropdwonWidthCode\r
`,Kn=`import {\r
  Menu,\r
  MenuButton,\r
  MenuItems,\r
  MenuSection,\r
  MenuHeading,\r
  MenuItem,\r
  MenuSeparator,\r
} from '@headlessui/react'\r
import { Icon } from '@iconify/react'\r
\r
const GroupItemCode = () => {\r
  return (\r
    <div>\r
      <Menu>\r
        <MenuButton className='ui-button bg-info gap-2'>\r
          My Groups\r
          <Icon icon='solar:alt-arrow-down-outline' height={18} />\r
        </MenuButton>\r
        <MenuItems\r
          transition\r
          anchor='bottom'\r
          className='ui-dropdown ui-dropdown-animation'>\r
          <MenuSection>\r
            <MenuHeading className='text-ld text-sm font-semibold px-4 py-1'>\r
              Settings\r
            </MenuHeading>\r
            <MenuItem>\r
              <a className='ui-dropdown-item' href='/profile'>\r
                My profile\r
              </a>\r
            </MenuItem>\r
            <MenuItem>\r
              <a className='ui-dropdown-item' href='/notifications'>\r
                Notifications\r
              </a>\r
            </MenuItem>\r
          </MenuSection>\r
          <MenuSeparator className='my-1 h-px bg-border dark:bg-darkborder' />\r
          <MenuSection>\r
            <MenuHeading className='text-ld text-sm font-semibold px-4 py-1'>\r
              Support\r
            </MenuHeading>\r
            <MenuItem>\r
              <a className='ui-dropdown-item' href='/support'>\r
                Documentation\r
              </a>\r
            </MenuItem>\r
            <MenuItem>\r
              <a className='ui-dropdown-item' href='/license'>\r
                License\r
              </a>\r
            </MenuItem>\r
          </MenuSection>\r
        </MenuItems>\r
      </Menu>\r
    </div>\r
  )\r
}\r
\r
export default GroupItemCode\r
`,Qn=`import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'\r
import { Icon } from '@iconify/react'\r
\r
const LinkDropdownCode = () => {\r
  return (\r
    <div>\r
      <Menu>\r
        <MenuButton className='ui-button bg-secondary gap-2'>\r
          My Account <Icon icon='solar:alt-arrow-down-outline' height={18} />\r
        </MenuButton>\r
        <MenuItems\r
          transition\r
          anchor='bottom'\r
          className='ui-dropdown ui-dropdown-animation'>\r
          <MenuItem>\r
            <a className='ui-dropdown-item' href='/settings'>\r
              Settings\r
            </a>\r
          </MenuItem>\r
          <MenuItem>\r
            <a className='ui-dropdown-item' href='/support'>\r
              Support\r
            </a>\r
          </MenuItem>\r
          <MenuItem>\r
            <a className='ui-dropdown-item' href='/license'>\r
              License\r
            </a>\r
          </MenuItem>\r
        </MenuItems>\r
      </Menu>\r
    </div>\r
  )\r
}\r
\r
export default LinkDropdownCode\r
`,Vn=`import {\r
  Menu,\r
  MenuButton,\r
  MenuItems,\r
  MenuItem,\r
  MenuSeparator,\r
} from '@headlessui/react'\r
import { Icon } from '@iconify/react'\r
\r
const SepratingItemsCode = () => {\r
  return (\r
    <div>\r
      <Menu>\r
        <MenuButton className='ui-button bg-warning gap-2'>\r
          My Account <Icon icon='solar:alt-arrow-down-outline' height={18} />\r
        </MenuButton>\r
        <MenuItems\r
          transition\r
          anchor='bottom'\r
          className='ui-dropdown ui-dropdown-animation'>\r
          <MenuItem>\r
            <a className='ui-dropdown-item' href='/settings'>\r
              Settings\r
            </a>\r
          </MenuItem>\r
          <MenuSeparator className='my-1 h-px bg-border dark:bg-darkborder' />\r
          <MenuItem>\r
            <a className='ui-dropdown-item' href='/support'>\r
              Support\r
            </a>\r
          </MenuItem>\r
          <MenuItem>\r
            <a className='ui-dropdown-item' href='/license'>\r
              License\r
            </a>\r
          </MenuItem>\r
        </MenuItems>\r
      </Menu>\r
    </div>\r
  )\r
}\r
\r
export default SepratingItemsCode\r
`,Wn=`\r
import {\r
    Dialog,\r
    DialogContent,\r
    DialogDescription,\r
    DialogHeader,\r
    DialogTitle,\r
    DialogTrigger,\r
} from "src/components/ui/dialog"\r
import { Button } from 'src/components/ui/button'\r
\r
const BasicDialogCode = () => {\r
    return (\r
        <>\r
            <div className="flex flex-wrap items-center gap-3 ">\r
                <Dialog>\r
                    <DialogTrigger asChild><Button>Open Dialog</Button></DialogTrigger>\r
                    <DialogContent >\r
                        <DialogHeader>\r
                            <DialogTitle>Are you absolutely sure?</DialogTitle>\r
                            <DialogDescription>\r
                                This action cannot be undone. This will permanently delete your account\r
                                and remove your data from our servers.\r
                            </DialogDescription>\r
                        </DialogHeader>\r
                    </DialogContent>\r
                </Dialog>\r
                <Dialog>\r
                    <DialogTrigger asChild><Button variant="secondary" >Open Dialog</Button></DialogTrigger>\r
                    <DialogContent >\r
                        <DialogHeader>\r
                            <DialogTitle>Are you absolutely sure?</DialogTitle>\r
                            <DialogDescription>\r
                                This action cannot be undone. This will permanently delete your account\r
                                and remove your data from our servers.\r
                            </DialogDescription>\r
                        </DialogHeader>\r
                    </DialogContent>\r
                </Dialog>\r
                <Dialog>\r
                    <DialogTrigger asChild><Button variant="warning" >Open Dialog</Button></DialogTrigger>\r
                    <DialogContent >\r
                        <DialogHeader>\r
                            <DialogTitle>Are you absolutely sure?</DialogTitle>\r
                            <DialogDescription>\r
                                This action cannot be undone. This will permanently delete your account\r
                                and remove your data from our servers.\r
                            </DialogDescription>\r
                        </DialogHeader>\r
                    </DialogContent>\r
                </Dialog>\r
                <Dialog>\r
                    <DialogTrigger asChild><Button variant="error" >Open Dialog</Button></DialogTrigger>\r
                    <DialogContent >\r
                        <DialogHeader>\r
                            <DialogTitle>Are you absolutely sure?</DialogTitle>\r
                            <DialogDescription>\r
                                This action cannot be undone. This will permanently delete your account\r
                                and remove your data from our servers.\r
                            </DialogDescription>\r
                        </DialogHeader>\r
                    </DialogContent>\r
                </Dialog>\r
            </div>\r
        </>\r
    )\r
}\r
\r
export default BasicDialogCode`,qn=()=>e.jsx("div",{children:e.jsxs(T,{children:[e.jsxs(C,{className:"ui-button bg-primary gap-2",children:["Options",e.jsx(M,{icon:"solar:alt-arrow-down-outline",height:18})]}),e.jsxs($,{transition:!0,anchor:"bottom",className:"ui-dropdown ui-dropdown-animation",children:[e.jsx(u,{children:e.jsxs("button",{className:"ui-dropdown-item group",children:[e.jsx(M,{icon:"solar:pen-new-square-outline",height:18}),"Edit",e.jsx("kbd",{className:"ms-auto hidden text-xs text-darklink group-data-[focus]:inline ",children:"⌘ E"})]})}),e.jsx(u,{children:e.jsxs("button",{className:"ui-dropdown-item group ",children:[e.jsx(M,{icon:"solar:copy-outline",height:18}),"Duplicate",e.jsx("kbd",{className:"ms-auto hidden text-xs text-darklink group-data-[focus]:inline",children:"⌘ D"})]})}),e.jsx(u,{children:e.jsxs("button",{className:"ui-dropdown-item group ",children:[e.jsx(M,{icon:"solar:archive-check-broken",height:18}),"Archive",e.jsx("kbd",{className:"ms-auto hidden text-xs text-darklink group-data-[focus]:inline",children:"⌘ A"})]})}),e.jsx(u,{children:e.jsxs("button",{className:"ui-dropdown-item group ",children:[e.jsx(M,{icon:"solar:trash-bin-minimalistic-2-outline",height:18}),"Delete",e.jsx("kbd",{className:"ms-auto hidden text-xs text-darklink group-data-[focus]:inline",children:"⌘ D"})]})})]})]})}),zn=()=>e.jsx("div",{children:e.jsx(O,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Basic Dropdown"}),e.jsx(qn,{})]})})})}),Yn=()=>{function n(){alert("Open settings dialog!")}function r(){alert("Open Support dialog!")}function t(){alert("Open Logout dialog!")}return e.jsx("div",{children:e.jsxs(T,{children:[e.jsxs(C,{className:"ui-button bg-success gap-2",children:["My Action ",e.jsx(M,{icon:"solar:alt-arrow-down-outline",height:18})]}),e.jsxs($,{transition:!0,anchor:"bottom",className:"ui-dropdown ui-dropdown-animation",children:[e.jsx(u,{children:e.jsx("button",{onClick:n,className:"ui-dropdown-item",children:"Settings"})}),e.jsx(u,{children:e.jsx("button",{onClick:r,className:"ui-dropdown-item",children:"Support"})}),e.jsx(u,{children:e.jsx("button",{onClick:t,className:"ui-dropdown-item",children:"Logout"})})]})]})})},Zn=()=>e.jsx("div",{children:e.jsx(O,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Button Action"}),e.jsx(Yn,{})]})})})}),Jn=({href:n,onClick:r,children:t})=>e.jsx("a",{className:"ui-dropdown-item",href:n,onClick:r,children:t}),Xn=()=>e.jsx("div",{children:e.jsxs(re,{children:[e.jsx("div",{className:"flex items-center justify-between mb-2",children:e.jsx("h4",{className:"text-lg font-semibold",children:"Closing Manually"})}),e.jsxs(T,{children:[e.jsxs(C,{className:"ui-button  bg-primary gap-2",children:["Terms ",e.jsx(M,{icon:"solar:alt-arrow-down-outline",height:18})]}),e.jsx($,{anchor:"bottom",className:"ui-dropdown",children:e.jsx(u,{children:({close:n})=>e.jsx(Jn,{href:"/",onClick:n,children:"Read and accept"})})})]})]})}),et=()=>e.jsx("div",{children:e.jsxs(T,{children:[e.jsxs(C,{className:"ui-button bg-error gap-2",children:["My Profile ",e.jsx(M,{icon:"solar:alt-arrow-down-outline",height:18})]}),e.jsxs($,{transition:!0,anchor:"bottom",className:"ui-dropdown ui-dropdown-animation",children:[e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/settings",children:"Settings"})}),e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/support",children:"Support"})}),e.jsx(u,{disabled:!0,children:e.jsx("a",{className:"ui-dropdown-item data-[disabled]:opacity-50",href:"/license",children:"License"})}),e.jsx(u,{disabled:!0,children:e.jsx("a",{className:"ui-dropdown-item data-[disabled]:opacity-50",href:"/logout",children:"Logout"})})]})]})}),nt=()=>e.jsx("div",{children:e.jsx(O,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Disable Items"}),e.jsx(et,{})]})})})}),tt=()=>e.jsx("div",{children:e.jsxs(T,{children:[e.jsxs(C,{className:"ui-button bg-secondary gap-2",children:["My Account ",e.jsx(M,{icon:"solar:alt-arrow-down-outline",height:18})]}),e.jsxs($,{transition:!0,anchor:"top start",className:"ui-dropdown ui-dropdown-animation",children:[e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/settings",children:"Settings"})}),e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/support",children:"Support"})}),e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/license",children:"License"})})]})]})}),rt=()=>e.jsx("div",{children:e.jsx(O,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Position"}),e.jsx(tt,{})]})})})}),ot=()=>e.jsx("div",{children:e.jsxs(T,{children:[e.jsxs(C,{className:"ui-button  bg-primary gap-2",children:["My Account ",e.jsx(M,{icon:"solar:alt-arrow-down-outline",height:18})]}),e.jsxs($,{transition:!0,anchor:"bottom",className:"ui-dropdown ui-dropdown-animation !w-80 !max-w-80",children:[e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/settings",children:"Settings"})}),e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/support",children:"Support"})}),e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/license",children:"License"})})]})]})}),st=()=>e.jsx("div",{children:e.jsx(O,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Dropdown Width"}),e.jsx(ot,{})]})})})}),it=()=>e.jsx("div",{children:e.jsxs(re,{children:[e.jsx("div",{className:"flex items-center justify-between mb-2",children:e.jsx("h4",{className:"text-lg font-semibold",children:"Framer Motion"})}),e.jsx(T,{children:({open:n})=>e.jsxs("div",{children:[e.jsxs(C,{className:"ui-button  bg-error gap-2",children:["My Account"," ",e.jsx(M,{icon:"solar:alt-arrow-down-outline",height:18})]}),e.jsx(jn,{children:n&&e.jsxs($,{static:!0,as:bn.div,initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},anchor:"bottom",className:"origin-top ui-dropdown ",children:[e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/settings",children:"Settings"})}),e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/support",children:"Support"})}),e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/license",children:"License"})})]})})]})})]})}),at=()=>e.jsx("div",{children:e.jsxs(T,{children:[e.jsxs(C,{className:"ui-button bg-info gap-2",children:["My Groups",e.jsx(M,{icon:"solar:alt-arrow-down-outline",height:18})]}),e.jsxs($,{transition:!0,anchor:"bottom",className:"ui-dropdown ui-dropdown-animation",children:[e.jsxs(se,{children:[e.jsx(ie,{className:"text-ld text-sm font-semibold px-4 py-1",children:"Settings"}),e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/profile",children:"My profile"})}),e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/notifications",children:"Notifications"})})]}),e.jsx(de,{className:"my-1 h-px bg-border dark:bg-darkborder"}),e.jsxs(se,{children:[e.jsx(ie,{className:"text-ld text-sm font-semibold px-4 py-1",children:"Support"}),e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/support",children:"Documentation"})}),e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/license",children:"License"})})]})]})]})}),lt=()=>e.jsx("div",{children:e.jsx(O,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Grouping Items"}),e.jsx(at,{})]})})})}),dt=()=>e.jsx("div",{children:e.jsxs(T,{children:[e.jsxs(C,{className:"ui-button bg-secondary gap-2",children:["My Account ",e.jsx(M,{icon:"solar:alt-arrow-down-outline",height:18})]}),e.jsxs($,{transition:!0,anchor:"bottom",className:"ui-dropdown ui-dropdown-animation",children:[e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/settings",children:"Settings"})}),e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/support",children:"Support"})}),e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/license",children:"License"})})]})]})}),ut=()=>e.jsx("div",{children:e.jsx(O,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Links Dropdown"}),e.jsx(dt,{})]})})})});let ct=x.forwardRef(function(n,r){return e.jsx("button",{className:"...",ref:r,...n})});const mt=()=>e.jsx("div",{children:e.jsxs(re,{children:[e.jsx("div",{className:"flex items-center justify-between mb-2",children:e.jsx("h4",{className:"text-lg font-semibold",children:"Rendering Elements"})}),e.jsxs(T,{children:[e.jsxs(C,{as:ct,className:"ui-button  bg-secondary gap-2",children:["My account ",e.jsx(M,{icon:"solar:alt-arrow-down-outline",height:18})]}),e.jsxs($,{anchor:"bottom",as:"section",className:"ui-dropdown ui-dropdown-animation",children:[e.jsx(u,{as:"a",className:"ui-dropdown-item",href:"/settings",children:"Settings"}),e.jsx(u,{as:"a",className:"ui-dropdown-item",href:"/support",children:"Support"}),e.jsx(u,{as:"a",className:"ui-dropdown-item",href:"/license",children:"License"})]})]})]})}),pt=()=>e.jsx("div",{children:e.jsxs(T,{children:[e.jsxs(C,{className:"ui-button bg-warning gap-2",children:["My Account ",e.jsx(M,{icon:"solar:alt-arrow-down-outline",height:18})]}),e.jsxs($,{transition:!0,anchor:"bottom",className:"ui-dropdown ui-dropdown-animation",children:[e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/settings",children:"Settings"})}),e.jsx(de,{className:"my-1 h-px bg-border dark:bg-darkborder"}),e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/support",children:"Support"})}),e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/license",children:"License"})})]})]})}),ht=()=>e.jsx("div",{children:e.jsx(O,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Separating Items"}),e.jsx(pt,{})]})})})}),xt=()=>e.jsx("div",{children:e.jsxs(re,{children:[e.jsx("div",{className:"flex items-center justify-between mb-2",children:e.jsx("h4",{className:"text-lg font-semibold",children:"Transitions"})}),e.jsxs(T,{children:[e.jsxs(C,{className:"ui-button  bg-success gap-2",children:["My Account ",e.jsx(M,{icon:"solar:alt-arrow-down-outline",height:18})]}),e.jsxs($,{transition:!0,anchor:"bottom",className:"ui-dropdown origin-top transition duration-500 ease-out data-[closed]:scale-95 data-[closed]:opacity-0",children:[e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/settings",children:"Settings"})}),e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/support",children:"Support"})}),e.jsx(u,{children:e.jsx("a",{className:"ui-dropdown-item",href:"/license",children:"License"})})]})]})]})}),gt=[{to:"/",title:"Home"},{title:"Dropdown"}],er=()=>e.jsxs(e.Fragment,{children:[e.jsx(In,{title:"Dropdown",items:gt}),e.jsxs("div",{className:"flex flex-col gap-7",children:[e.jsxs("div",{className:"",children:[e.jsx(zn,{}),e.jsx(L,{children:Wn})]}),e.jsxs("div",{className:"",children:[e.jsx(ut,{}),e.jsx(L,{children:Qn})]}),e.jsxs("div",{className:"",children:[e.jsx(Zn,{}),e.jsx(L,{children:_n})]}),e.jsxs("div",{className:"",children:[e.jsx(nt,{}),e.jsx(L,{children:Hn})]}),e.jsxs("div",{className:"",children:[e.jsx(ht,{}),e.jsx(L,{children:Vn})]}),e.jsxs("div",{className:"",children:[e.jsx(lt,{}),e.jsx(L,{children:Kn})]}),e.jsxs("div",{children:[e.jsx(rt,{}),e.jsx(L,{children:Gn})]}),e.jsxs("div",{children:[e.jsx(st,{}),e.jsx(L,{children:Un})]}),e.jsx("div",{children:e.jsx(xt,{})}),e.jsx("div",{children:e.jsx(it,{})}),e.jsx("div",{children:e.jsx(Xn,{})}),e.jsx("div",{children:e.jsx(mt,{})})]})]});export{er as default};
