import{r as d,au as se,R as B,j as s,a1 as Ue,I as He}from"./index-BoNr0JGX.js";import{C as le}from"./CodeDialog-_oyCzuNE.js";import{C as te}from"./CardBox-CQoLG162.js";import{$ as dt,a as ct}from"./useFocusRing-85OD7Fsl.js";import{w as yt}from"./use-active-press-nebW6P8B.js";import{u as wt}from"./use-by-comparator-G5D3vP6k.js";import{l as Ct,b as St}from"./use-default-value-BPzHLq5x.js";import{o as E,u as ce,Y as ge,p as jt,a as ye,V as Be,K as we,n as ae,c as kt,A as Ge,b as Ot}from"./render-Cf3VyR8s.js";import{F as Pt,y as Nt,R as Et,T as Tt,w as Xe,A as It}from"./floating-Edp2LMGy.js";import{a as M,p as Rt,c as xe,f as Ye,b as $t,u as Mt,L as Dt,S as fe,s as Ft,g as zt}from"./element-movement-xExsX4BL.js";import{y as At}from"./use-inert-others-34y_DOtv.js";import{T as Lt,x as ut,b as Kt,c as Vt,S as D,u as Je,p as Wt,f as Bt,t as _t,k as qt,n as Qt}from"./portal-BpNv34EY.js";import{l as Ze,n as Ut}from"./dom-BlW_0b_t.js";import{d as mt}from"./owner-Bt04AvpD.js";import{E as Ht}from"./use-event-listener-CKyTZDAX.js";import{e as Gt}from"./use-resolve-button-type-BC-unCYO.js";import{y as ke}from"./use-sync-refs-BT09qo3v.js";import{u as Xt,N as Yt,x as Jt,c as Zt,i as je}from"./open-closed-DO53-7y6.js";import{F as en}from"./use-tree-walker-YmhlclMc.js";import{m as et,n as tt}from"./active-element-history-x3Rr9JYY.js";import{a as tn}from"./disabled-BmWJng7l.js";import{j as nn,W as ue}from"./field-BbYODR6k.js";import{u as nt,s as on}from"./frozen-BSL5sBTd.js";import{Z as Oe,u as rn,N as _e,V as sn}from"./label-GviLZO2P.js";import{w as an}from"./description-BauTk5Zv.js";import{o as U}from"./keyboard-C1Wiwm26.js";import{G as ln}from"./focus-management-C0VJ9T5G.js";import{C as me}from"./card-vkvqasdW.js";import{A as dn}from"./index-99uSBEBu.js";import{m as cn}from"./proxy-dh2Uf8l3.js";import{B as un}from"./BreadcrumbComp-Chbekl54.js";import"./index-ZNjr_w1p.js";import"./vsc-dark-plus-DFfyWk_Y.js";import"./highlight-BsgCmQTy.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./bugs-BJ7ScNGK.js";import"./with-selector-giBxl6c-.js";import"./hidden-C_VJk_y1.js";import"./chevron-right-DKLkMv9e.js";import"./createLucideIcon-C_6kNXZz.js";function de(n,a,e){let r=e.initialDeps??[],o;function t(){var i,l,m,c;let u;e.key&&((i=e.debug)!=null&&i.call(e))&&(u=Date.now());const v=n();if(!(v.length!==r.length||v.some((p,g)=>r[g]!==p)))return o;r=v;let h;if(e.key&&((l=e.debug)!=null&&l.call(e))&&(h=Date.now()),o=a(...v),e.key&&((m=e.debug)!=null&&m.call(e))){const p=Math.round((Date.now()-u)*100)/100,g=Math.round((Date.now()-h)*100)/100,w=g/16,P=(R,T)=>{for(R=String(R);R.length<T;)R=" "+R;return R};console.info(`%c⏱ ${P(g,5)} /${P(p,5)} ms`,`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0,Math.min(120-120*w,120))}deg 100% 31%);`,e==null?void 0:e.key)}return(c=e==null?void 0:e.onChange)==null||c.call(e,o),o}return t.updateDeps=i=>{r=i},t}function ot(n,a){if(n===void 0)throw new Error("Unexpected undefined");return n}const mn=(n,a)=>Math.abs(n-a)<1.01,pn=(n,a,e)=>{let r;return function(...o){n.clearTimeout(r),r=n.setTimeout(()=>a.apply(this,o),e)}},rt=n=>{const{offsetWidth:a,offsetHeight:e}=n;return{width:a,height:e}},hn=n=>n,bn=n=>{const a=Math.max(n.startIndex-n.overscan,0),e=Math.min(n.endIndex+n.overscan,n.count-1),r=[];for(let o=a;o<=e;o++)r.push(o);return r},fn=(n,a)=>{const e=n.scrollElement;if(!e)return;const r=n.targetWindow;if(!r)return;const o=i=>{const{width:l,height:m}=i;a({width:Math.round(l),height:Math.round(m)})};if(o(rt(e)),!r.ResizeObserver)return()=>{};const t=new r.ResizeObserver(i=>{const l=()=>{const m=i[0];if(m!=null&&m.borderBoxSize){const c=m.borderBoxSize[0];if(c){o({width:c.inlineSize,height:c.blockSize});return}}o(rt(e))};n.options.useAnimationFrameWithResizeObserver?requestAnimationFrame(l):l()});return t.observe(e,{box:"border-box"}),()=>{t.unobserve(e)}},st={passive:!0},at=typeof window>"u"?!0:"onscrollend"in window,xn=(n,a)=>{const e=n.scrollElement;if(!e)return;const r=n.targetWindow;if(!r)return;let o=0;const t=n.options.useScrollendEvent&&at?()=>{}:pn(r,()=>{a(o,!1)},n.options.isScrollingResetDelay),i=u=>()=>{const{horizontal:v,isRtl:f}=n.options;o=v?e.scrollLeft*(f&&-1||1):e.scrollTop,t(),a(o,u)},l=i(!0),m=i(!1);m(),e.addEventListener("scroll",l,st);const c=n.options.useScrollendEvent&&at;return c&&e.addEventListener("scrollend",m,st),()=>{e.removeEventListener("scroll",l),c&&e.removeEventListener("scrollend",m)}},vn=(n,a,e)=>{if(a!=null&&a.borderBoxSize){const r=a.borderBoxSize[0];if(r)return Math.round(r[e.options.horizontal?"inlineSize":"blockSize"])}return n[e.options.horizontal?"offsetWidth":"offsetHeight"]},gn=(n,{adjustments:a=0,behavior:e},r)=>{var o,t;const i=n+a;(t=(o=r.scrollElement)==null?void 0:o.scrollTo)==null||t.call(o,{[r.options.horizontal?"left":"top"]:i,behavior:e})};class yn{constructor(a){this.unsubs=[],this.scrollElement=null,this.targetWindow=null,this.isScrolling=!1,this.measurementsCache=[],this.itemSizeCache=new Map,this.pendingMeasuredCacheIndexes=[],this.scrollRect=null,this.scrollOffset=null,this.scrollDirection=null,this.scrollAdjustments=0,this.elementsCache=new Map,this.observer=(()=>{let e=null;const r=()=>e||(!this.targetWindow||!this.targetWindow.ResizeObserver?null:e=new this.targetWindow.ResizeObserver(o=>{o.forEach(t=>{const i=()=>{this._measureElement(t.target,t)};this.options.useAnimationFrameWithResizeObserver?requestAnimationFrame(i):i()})}));return{disconnect:()=>{var o;(o=r())==null||o.disconnect(),e=null},observe:o=>{var t;return(t=r())==null?void 0:t.observe(o,{box:"border-box"})},unobserve:o=>{var t;return(t=r())==null?void 0:t.unobserve(o)}}})(),this.range=null,this.setOptions=e=>{Object.entries(e).forEach(([r,o])=>{typeof o>"u"&&delete e[r]}),this.options={debug:!1,initialOffset:0,overscan:1,paddingStart:0,paddingEnd:0,scrollPaddingStart:0,scrollPaddingEnd:0,horizontal:!1,getItemKey:hn,rangeExtractor:bn,onChange:()=>{},measureElement:vn,initialRect:{width:0,height:0},scrollMargin:0,gap:0,indexAttribute:"data-index",initialMeasurementsCache:[],lanes:1,isScrollingResetDelay:150,enabled:!0,isRtl:!1,useScrollendEvent:!1,useAnimationFrameWithResizeObserver:!1,...e}},this.notify=e=>{var r,o;(o=(r=this.options).onChange)==null||o.call(r,this,e)},this.maybeNotify=de(()=>(this.calculateRange(),[this.isScrolling,this.range?this.range.startIndex:null,this.range?this.range.endIndex:null]),e=>{this.notify(e)},{key:!1,debug:()=>this.options.debug,initialDeps:[this.isScrolling,this.range?this.range.startIndex:null,this.range?this.range.endIndex:null]}),this.cleanup=()=>{this.unsubs.filter(Boolean).forEach(e=>e()),this.unsubs=[],this.observer.disconnect(),this.scrollElement=null,this.targetWindow=null},this._didMount=()=>()=>{this.cleanup()},this._willUpdate=()=>{var e;const r=this.options.enabled?this.options.getScrollElement():null;if(this.scrollElement!==r){if(this.cleanup(),!r){this.maybeNotify();return}this.scrollElement=r,this.scrollElement&&"ownerDocument"in this.scrollElement?this.targetWindow=this.scrollElement.ownerDocument.defaultView:this.targetWindow=((e=this.scrollElement)==null?void 0:e.window)??null,this.elementsCache.forEach(o=>{this.observer.observe(o)}),this._scrollToOffset(this.getScrollOffset(),{adjustments:void 0,behavior:void 0}),this.unsubs.push(this.options.observeElementRect(this,o=>{this.scrollRect=o,this.maybeNotify()})),this.unsubs.push(this.options.observeElementOffset(this,(o,t)=>{this.scrollAdjustments=0,this.scrollDirection=t?this.getScrollOffset()<o?"forward":"backward":null,this.scrollOffset=o,this.isScrolling=t,this.maybeNotify()}))}},this.getSize=()=>this.options.enabled?(this.scrollRect=this.scrollRect??this.options.initialRect,this.scrollRect[this.options.horizontal?"width":"height"]):(this.scrollRect=null,0),this.getScrollOffset=()=>this.options.enabled?(this.scrollOffset=this.scrollOffset??(typeof this.options.initialOffset=="function"?this.options.initialOffset():this.options.initialOffset),this.scrollOffset):(this.scrollOffset=null,0),this.getFurthestMeasurement=(e,r)=>{const o=new Map,t=new Map;for(let i=r-1;i>=0;i--){const l=e[i];if(o.has(l.lane))continue;const m=t.get(l.lane);if(m==null||l.end>m.end?t.set(l.lane,l):l.end<m.end&&o.set(l.lane,!0),o.size===this.options.lanes)break}return t.size===this.options.lanes?Array.from(t.values()).sort((i,l)=>i.end===l.end?i.index-l.index:i.end-l.end)[0]:void 0},this.getMeasurementOptions=de(()=>[this.options.count,this.options.paddingStart,this.options.scrollMargin,this.options.getItemKey,this.options.enabled],(e,r,o,t,i)=>(this.pendingMeasuredCacheIndexes=[],{count:e,paddingStart:r,scrollMargin:o,getItemKey:t,enabled:i}),{key:!1}),this.getMeasurements=de(()=>[this.getMeasurementOptions(),this.itemSizeCache],({count:e,paddingStart:r,scrollMargin:o,getItemKey:t,enabled:i},l)=>{if(!i)return this.measurementsCache=[],this.itemSizeCache.clear(),[];this.measurementsCache.length===0&&(this.measurementsCache=this.options.initialMeasurementsCache,this.measurementsCache.forEach(u=>{this.itemSizeCache.set(u.key,u.size)}));const m=this.pendingMeasuredCacheIndexes.length>0?Math.min(...this.pendingMeasuredCacheIndexes):0;this.pendingMeasuredCacheIndexes=[];const c=this.measurementsCache.slice(0,m);for(let u=m;u<e;u++){const v=t(u),f=this.options.lanes===1?c[u-1]:this.getFurthestMeasurement(c,u),h=f?f.end+this.options.gap:r+o,p=l.get(v),g=typeof p=="number"?p:this.options.estimateSize(u),w=h+g,P=f?f.lane:u%this.options.lanes;c[u]={index:u,start:h,size:g,end:w,key:v,lane:P}}return this.measurementsCache=c,c},{key:!1,debug:()=>this.options.debug}),this.calculateRange=de(()=>[this.getMeasurements(),this.getSize(),this.getScrollOffset(),this.options.lanes],(e,r,o,t)=>this.range=e.length>0&&r>0?wn({measurements:e,outerSize:r,scrollOffset:o,lanes:t}):null,{key:!1,debug:()=>this.options.debug}),this.getVirtualIndexes=de(()=>{let e=null,r=null;const o=this.calculateRange();return o&&(e=o.startIndex,r=o.endIndex),this.maybeNotify.updateDeps([this.isScrolling,e,r]),[this.options.rangeExtractor,this.options.overscan,this.options.count,e,r]},(e,r,o,t,i)=>t===null||i===null?[]:e({startIndex:t,endIndex:i,overscan:r,count:o}),{key:!1,debug:()=>this.options.debug}),this.indexFromElement=e=>{const r=this.options.indexAttribute,o=e.getAttribute(r);return o?parseInt(o,10):(console.warn(`Missing attribute name '${r}={index}' on measured element.`),-1)},this._measureElement=(e,r)=>{const o=this.indexFromElement(e),t=this.measurementsCache[o];if(!t)return;const i=t.key,l=this.elementsCache.get(i);l!==e&&(l&&this.observer.unobserve(l),this.observer.observe(e),this.elementsCache.set(i,e)),e.isConnected&&this.resizeItem(o,this.options.measureElement(e,r,this))},this.resizeItem=(e,r)=>{const o=this.measurementsCache[e];if(!o)return;const t=this.itemSizeCache.get(o.key)??o.size,i=r-t;i!==0&&((this.shouldAdjustScrollPositionOnItemSizeChange!==void 0?this.shouldAdjustScrollPositionOnItemSizeChange(o,i,this):o.start<this.getScrollOffset()+this.scrollAdjustments)&&this._scrollToOffset(this.getScrollOffset(),{adjustments:this.scrollAdjustments+=i,behavior:void 0}),this.pendingMeasuredCacheIndexes.push(o.index),this.itemSizeCache=new Map(this.itemSizeCache.set(o.key,r)),this.notify(!1))},this.measureElement=e=>{if(!e){this.elementsCache.forEach((r,o)=>{r.isConnected||(this.observer.unobserve(r),this.elementsCache.delete(o))});return}this._measureElement(e,void 0)},this.getVirtualItems=de(()=>[this.getVirtualIndexes(),this.getMeasurements()],(e,r)=>{const o=[];for(let t=0,i=e.length;t<i;t++){const l=e[t],m=r[l];o.push(m)}return o},{key:!1,debug:()=>this.options.debug}),this.getVirtualItemForOffset=e=>{const r=this.getMeasurements();if(r.length!==0)return ot(r[pt(0,r.length-1,o=>ot(r[o]).start,e)])},this.getOffsetForAlignment=(e,r,o=0)=>{const t=this.getSize(),i=this.getScrollOffset();r==="auto"&&(r=e>=i+t?"end":"start"),r==="center"?e+=(o-t)/2:r==="end"&&(e-=t);const l=this.getTotalSize()+this.options.scrollMargin-t;return Math.max(Math.min(l,e),0)},this.getOffsetForIndex=(e,r="auto")=>{e=Math.max(0,Math.min(e,this.options.count-1));const o=this.measurementsCache[e];if(!o)return;const t=this.getSize(),i=this.getScrollOffset();if(r==="auto")if(o.end>=i+t-this.options.scrollPaddingEnd)r="end";else if(o.start<=i+this.options.scrollPaddingStart)r="start";else return[i,r];const l=r==="end"?o.end+this.options.scrollPaddingEnd:o.start-this.options.scrollPaddingStart;return[this.getOffsetForAlignment(l,r,o.size),r]},this.isDynamicMode=()=>this.elementsCache.size>0,this.scrollToOffset=(e,{align:r="start",behavior:o}={})=>{o==="smooth"&&this.isDynamicMode()&&console.warn("The `smooth` scroll behavior is not fully supported with dynamic size."),this._scrollToOffset(this.getOffsetForAlignment(e,r),{adjustments:void 0,behavior:o})},this.scrollToIndex=(e,{align:r="auto",behavior:o}={})=>{o==="smooth"&&this.isDynamicMode()&&console.warn("The `smooth` scroll behavior is not fully supported with dynamic size."),e=Math.max(0,Math.min(e,this.options.count-1));let t=0;const i=10,l=c=>{if(!this.targetWindow)return;const u=this.getOffsetForIndex(e,c);if(!u){console.warn("Failed to get offset for index:",e);return}const[v,f]=u;this._scrollToOffset(v,{adjustments:void 0,behavior:o}),this.targetWindow.requestAnimationFrame(()=>{const h=this.getScrollOffset(),p=this.getOffsetForIndex(e,f);if(!p){console.warn("Failed to get offset for index:",e);return}mn(p[0],h)||m(f)})},m=c=>{this.targetWindow&&(t++,t<i?this.targetWindow.requestAnimationFrame(()=>l(c)):console.warn(`Failed to scroll to index ${e} after ${i} attempts.`))};l(r)},this.scrollBy=(e,{behavior:r}={})=>{r==="smooth"&&this.isDynamicMode()&&console.warn("The `smooth` scroll behavior is not fully supported with dynamic size."),this._scrollToOffset(this.getScrollOffset()+e,{adjustments:void 0,behavior:r})},this.getTotalSize=()=>{var e;const r=this.getMeasurements();let o;if(r.length===0)o=this.options.paddingStart;else if(this.options.lanes===1)o=((e=r[r.length-1])==null?void 0:e.end)??0;else{const t=Array(this.options.lanes).fill(null);let i=r.length-1;for(;i>=0&&t.some(l=>l===null);){const l=r[i];t[l.lane]===null&&(t[l.lane]=l.end),i--}o=Math.max(...t.filter(l=>l!==null))}return Math.max(o-this.options.scrollMargin+this.options.paddingEnd,0)},this._scrollToOffset=(e,{adjustments:r,behavior:o})=>{this.options.scrollToFn(e,{behavior:o,adjustments:r},this)},this.measure=()=>{this.itemSizeCache=new Map,this.notify(!1)},this.setOptions(a)}}const pt=(n,a,e,r)=>{for(;n<=a;){const o=(n+a)/2|0,t=e(o);if(t<r)n=o+1;else if(t>r)a=o-1;else return o}return n>0?n-1:0};function wn({measurements:n,outerSize:a,scrollOffset:e,lanes:r}){const o=n.length-1,t=m=>n[m].start;if(n.length<=r)return{startIndex:0,endIndex:o};let i=pt(0,o,t,e),l=i;if(r===1)for(;l<o&&n[l].end<e+a;)l++;else if(r>1){const m=Array(r).fill(0);for(;l<o&&m.some(u=>u<e+a);){const u=n[l];m[u.lane]=u.end,l++}const c=Array(r).fill(e+a);for(;i>=0&&c.some(u=>u>=e);){const u=n[i];c[u.lane]=u.start,i--}i=Math.max(0,i-i%r),l=Math.min(o,l+(r-1-l%r))}return{startIndex:i,endIndex:l}}const it=typeof document<"u"?d.useLayoutEffect:d.useEffect;function Cn(n){const a=d.useReducer(()=>({}),{})[1],e={...n,onChange:(o,t)=>{var i;t?se.flushSync(a):a(),(i=n.onChange)==null||i.call(n,o,t)}},[r]=d.useState(()=>new yn(e));return r.setOptions(e),it(()=>r._didMount(),[]),it(()=>r._willUpdate()),r}function Sn(n){return Cn({observeElementRect:fn,observeElementOffset:xn,scrollToFn:gn,...n})}function ht(n){let a=d.useRef({value:"",selectionStart:null,selectionEnd:null});return Ht(n,"blur",e=>{let r=e.target;Ze(r)&&(a.current={value:r.value,selectionStart:r.selectionStart,selectionEnd:r.selectionEnd})}),E(()=>{if(!mt(n)&&Ze(n)&&n.isConnected){if(n.focus({preventScroll:!0}),n.value!==a.current.value)n.setSelectionRange(n.value.length,n.value.length);else{let{selectionStart:e,selectionEnd:r}=a.current;e!==null&&r!==null&&n.setSelectionRange(e,r)}a.current={value:"",selectionStart:null,selectionEnd:null}}})}var jn=Object.defineProperty,kn=(n,a,e)=>a in n?jn(n,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[a]=e,lt=(n,a,e)=>(kn(n,typeof a!="symbol"?a+"":a,e),e),x=(n=>(n[n.Open=0]="Open",n[n.Closed=1]="Closed",n))(x||{}),X=(n=>(n[n.Single=0]="Single",n[n.Multi=1]="Multi",n))(X||{}),ee=(n=>(n[n.Pointer=0]="Pointer",n[n.Focus=1]="Focus",n[n.Other=2]="Other",n))(ee||{}),bt=(n=>(n[n.OpenCombobox=0]="OpenCombobox",n[n.CloseCombobox=1]="CloseCombobox",n[n.GoToOption=2]="GoToOption",n[n.SetTyping=3]="SetTyping",n[n.RegisterOption=4]="RegisterOption",n[n.UnregisterOption=5]="UnregisterOption",n[n.DefaultToFirstOption=6]="DefaultToFirstOption",n[n.SetActivationTrigger=7]="SetActivationTrigger",n[n.UpdateVirtualConfiguration=8]="UpdateVirtualConfiguration",n[n.SetInputElement=9]="SetInputElement",n[n.SetButtonElement=10]="SetButtonElement",n[n.SetOptionsElement=11]="SetOptionsElement",n[n.MarkInputAsMoved=12]="MarkInputAsMoved",n))(bt||{});function Pe(n,a=e=>e){let e=n.activeOptionIndex!==null?n.options[n.activeOptionIndex]:null,r=a(n.options.slice()),o=r.length>0&&r[0].dataRef.current.order!==null?r.sort((i,l)=>i.dataRef.current.order-l.dataRef.current.order):ln(r,i=>i.dataRef.current.domRef.current),t=e?o.indexOf(e):null;return t===-1&&(t=null),{options:o,activeOptionIndex:t}}let On={1(n){var a;if((a=n.dataRef.current)!=null&&a.disabled||n.comboboxState===1)return n;let e=n.inputElement?xe.Tracked($t(n.inputElement)):n.inputPositionState;return{...n,activeOptionIndex:null,comboboxState:1,isTyping:!1,activationTrigger:2,inputPositionState:e,__demoMode:!1}},0(n){var a,e;if((a=n.dataRef.current)!=null&&a.disabled||n.comboboxState===0)return n;if((e=n.dataRef.current)!=null&&e.value){let r=n.dataRef.current.calculateIndex(n.dataRef.current.value);if(r!==-1)return{...n,activeOptionIndex:r,comboboxState:0,__demoMode:!1,inputPositionState:xe.Idle}}return{...n,comboboxState:0,inputPositionState:xe.Idle,__demoMode:!1}},3(n,a){return n.isTyping===a.isTyping?n:{...n,isTyping:a.isTyping}},2(n,a){var e,r,o,t;if((e=n.dataRef.current)!=null&&e.disabled||n.optionsElement&&!((r=n.dataRef.current)!=null&&r.optionsPropsRef.current.static)&&n.comboboxState===1)return n;if(n.virtual){let{options:c,disabled:u}=n.virtual,v=a.focus===M.Specific?a.idx:Ye(a,{resolveItems:()=>c,resolveActiveIndex:()=>{var h,p;return(p=(h=n.activeOptionIndex)!=null?h:c.findIndex(g=>!u(g)))!=null?p:null},resolveDisabled:u,resolveId(){throw new Error("Function not implemented.")}}),f=(o=a.trigger)!=null?o:2;return n.activeOptionIndex===v&&n.activationTrigger===f?n:{...n,activeOptionIndex:v,activationTrigger:f,isTyping:!1,__demoMode:!1}}let i=Pe(n);if(i.activeOptionIndex===null){let c=i.options.findIndex(u=>!u.dataRef.current.disabled);c!==-1&&(i.activeOptionIndex=c)}let l=a.focus===M.Specific?a.idx:Ye(a,{resolveItems:()=>i.options,resolveActiveIndex:()=>i.activeOptionIndex,resolveId:c=>c.id,resolveDisabled:c=>c.dataRef.current.disabled}),m=(t=a.trigger)!=null?t:2;return n.activeOptionIndex===l&&n.activationTrigger===m?n:{...n,...i,isTyping:!1,activeOptionIndex:l,activationTrigger:m,__demoMode:!1}},4:(n,a)=>{var e,r,o,t;if((e=n.dataRef.current)!=null&&e.virtual)return{...n,options:[...n.options,a.payload]};let i=a.payload,l=Pe(n,c=>(c.push(i),c));n.activeOptionIndex===null&&(o=(r=n.dataRef.current).isSelected)!=null&&o.call(r,a.payload.dataRef.current.value)&&(l.activeOptionIndex=l.options.indexOf(i));let m={...n,...l,activationTrigger:2};return(t=n.dataRef.current)!=null&&t.__demoMode&&n.dataRef.current.value===void 0&&(m.activeOptionIndex=0),m},5:(n,a)=>{var e;if((e=n.dataRef.current)!=null&&e.virtual)return{...n,options:n.options.filter(o=>o.id!==a.id)};let r=Pe(n,o=>{let t=o.findIndex(i=>i.id===a.id);return t!==-1&&o.splice(t,1),o});return{...n,...r,activationTrigger:2}},6:(n,a)=>n.defaultToFirstOption===a.value?n:{...n,defaultToFirstOption:a.value},7:(n,a)=>n.activationTrigger===a.trigger?n:{...n,activationTrigger:a.trigger},8:(n,a)=>{var e,r;if(n.virtual===null)return{...n,virtual:{options:a.options,disabled:(e=a.disabled)!=null?e:()=>!1}};if(n.virtual.options===a.options&&n.virtual.disabled===a.disabled)return n;let o=n.activeOptionIndex;if(n.activeOptionIndex!==null){let t=a.options.indexOf(n.virtual.options[n.activeOptionIndex]);t!==-1?o=t:o=null}return{...n,activeOptionIndex:o,virtual:{options:a.options,disabled:(r=a.disabled)!=null?r:()=>!1}}},9:(n,a)=>n.inputElement===a.element?n:{...n,inputElement:a.element},10:(n,a)=>n.buttonElement===a.element?n:{...n,buttonElement:a.element},11:(n,a)=>n.optionsElement===a.element?n:{...n,optionsElement:a.element},12(n){return n.inputPositionState.kind!=="Tracked"?n:{...n,inputPositionState:xe.Moved}}};class qe extends Lt{constructor(a){super(a),lt(this,"actions",{onChange:e=>{let{onChange:r,compare:o,mode:t,value:i}=this.state.dataRef.current;return ce(t,{0:()=>r==null?void 0:r(e),1:()=>{let l=i.slice(),m=l.findIndex(c=>o(c,e));return m===-1?l.push(e):l.splice(m,1),r==null?void 0:r(l)}})},registerOption:(e,r)=>(this.send({type:4,payload:{id:e,dataRef:r}}),()=>{this.state.activeOptionIndex===this.state.dataRef.current.calculateIndex(r.current.value)&&this.send({type:6,value:!0}),this.send({type:5,id:e})}),goToOption:(e,r)=>(this.send({type:6,value:!1}),this.send({type:2,...e,trigger:r})),setIsTyping:e=>{this.send({type:3,isTyping:e})},closeCombobox:()=>{var e,r;this.send({type:1}),this.send({type:6,value:!1}),(r=(e=this.state.dataRef.current).onClose)==null||r.call(e)},openCombobox:()=>{this.send({type:0}),this.send({type:6,value:!0})},setActivationTrigger:e=>{this.send({type:7,trigger:e})},selectActiveOption:()=>{let e=this.selectors.activeOptionIndex(this.state);if(e!==null){if(this.actions.setIsTyping(!1),this.state.virtual)this.actions.onChange(this.state.virtual.options[e]);else{let{dataRef:r}=this.state.options[e];this.actions.onChange(r.current.value)}this.actions.goToOption({focus:M.Specific,idx:e})}},setInputElement:e=>{this.send({type:9,element:e})},setButtonElement:e=>{this.send({type:10,element:e})},setOptionsElement:e=>{this.send({type:11,element:e})}}),lt(this,"selectors",{activeDescendantId:e=>{var r,o;let t=this.selectors.activeOptionIndex(e);if(t!==null)return e.virtual?(o=e.options.find(i=>!i.dataRef.current.disabled&&e.dataRef.current.compare(i.dataRef.current.value,e.virtual.options[t])))==null?void 0:o.id:(r=e.options[t])==null?void 0:r.id},activeOptionIndex:e=>{if(e.defaultToFirstOption&&e.activeOptionIndex===null&&(e.virtual?e.virtual.options.length>0:e.options.length>0)){if(e.virtual){let{options:o,disabled:t}=e.virtual,i=o.findIndex(l=>{var m;return!((m=t==null?void 0:t(l))!=null&&m)});if(i!==-1)return i}let r=e.options.findIndex(o=>!o.dataRef.current.disabled);if(r!==-1)return r}return e.activeOptionIndex},activeOption:e=>{var r,o;let t=this.selectors.activeOptionIndex(e);return t===null?null:e.virtual?e.virtual.options[t??0]:(o=(r=e.options[t])==null?void 0:r.dataRef.current.value)!=null?o:null},isActive:(e,r,o)=>{var t;let i=this.selectors.activeOptionIndex(e);return i===null?!1:e.virtual?i===e.dataRef.current.calculateIndex(r):((t=e.options[i])==null?void 0:t.id)===o},shouldScrollIntoView:(e,r,o)=>!(e.virtual||e.__demoMode||e.comboboxState!==0||e.activationTrigger===0||!this.selectors.isActive(e,r,o)),didInputMove(e){return e.inputPositionState.kind==="Moved"}});{let e=this.state.id,r=ut.get(null);this.disposables.add(r.on(Kt.Push,o=>{!r.selectors.isTop(o,e)&&this.state.comboboxState===0&&this.actions.closeCombobox()})),this.on(0,()=>r.actions.push(e)),this.on(1,()=>r.actions.pop(e))}this.disposables.group(e=>{this.on(1,r=>{r.inputElement&&(e.dispose(),e.add(Rt(r.inputElement,r.inputPositionState,()=>{this.send({type:12})})))})})}static new({id:a,virtual:e=null,__demoMode:r=!1}){var o;return new qe({id:a,dataRef:{current:{}},comboboxState:r?0:1,isTyping:!1,options:[],virtual:e?{options:e.options,disabled:(o=e.disabled)!=null?o:()=>!1}:null,activeOptionIndex:null,activationTrigger:2,inputElement:null,buttonElement:null,optionsElement:null,__demoMode:r,inputPositionState:xe.Idle})}reduce(a,e){return ce(e.type,On,a,e)}}const ft=d.createContext(null);function Ce(n){let a=d.useContext(ft);if(a===null){let e=new Error(`<${n} /> is missing a parent <Combobox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(e,xt),e}return a}function xt({id:n,virtual:a=null,__demoMode:e=!1}){let r=d.useMemo(()=>qe.new({id:n,virtual:a,__demoMode:e}),[]);return Vt(()=>r.dispose()),r}let ve=d.createContext(null);ve.displayName="ComboboxDataContext";function pe(n){let a=d.useContext(ve);if(a===null){let e=new Error(`<${n} /> is missing a parent <Combobox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(e,pe),e}return a}let vt=d.createContext(null);function Pn(n){let a=Ce("VirtualProvider"),e=pe("VirtualProvider"),{options:r}=e.virtual,o=D(a,h=>h.optionsElement),[t,i]=d.useMemo(()=>{let h=o;if(!h)return[0,0];let p=window.getComputedStyle(h);return[parseFloat(p.paddingBlockStart||p.paddingTop),parseFloat(p.paddingBlockEnd||p.paddingBottom)]},[o]),l=Sn({enabled:r.length!==0,scrollPaddingStart:t,scrollPaddingEnd:i,count:r.length,estimateSize(){return 40},getScrollElement(){return a.state.optionsElement},overscan:12}),[m,c]=d.useState(0);ae(()=>{c(h=>h+1)},[r]);let u=l.getVirtualItems(),v=D(a,h=>h.activationTrigger===ee.Pointer),f=D(a,a.selectors.activeOptionIndex);return u.length===0?null:B.createElement(vt.Provider,{value:l},B.createElement("div",{style:{position:"relative",width:"100%",height:`${l.getTotalSize()}px`},ref:h=>{h&&(v||f!==null&&r.length>f&&l.scrollToIndex(f))}},u.map(h=>{var p;return B.createElement(d.Fragment,{key:h.key},B.cloneElement((p=n.children)==null?void 0:p.call(n,{...n.slot,option:r[h.index]}),{key:`${m}-${h.key}`,"data-index":h.index,"aria-setsize":r.length,"aria-posinset":h.index+1,style:{position:"absolute",top:0,left:0,transform:`translateY(${h.start}px)`,overflowAnchor:"none"}}))})))}let Nn=d.Fragment;function En(n,a){let e=d.useId(),r=tn(),{value:o,defaultValue:t,onChange:i,form:l,name:m,by:c,invalid:u=!1,disabled:v=r||!1,onClose:f,__demoMode:h=!1,multiple:p=!1,immediate:g=!1,virtual:w=null,nullable:P,...R}=n,T=Ct(t),[I=p?[]:void 0,H]=St(o,i,T),C=xt({id:e,virtual:w,__demoMode:h}),_=d.useRef({static:!1,hold:!1}),N=wt(c),V=E(j=>w?c===null?w.options.indexOf(j):w.options.findIndex(re=>N(re,j)):C.state.options.findIndex(re=>N(re.dataRef.current.value,j))),J=d.useCallback(j=>ce(q.mode,{[X.Multi]:()=>I.some(re=>N(re,j)),[X.Single]:()=>N(I,j)}),[I]),Z=D(C,j=>j.virtual),y=E(()=>f==null?void 0:f()),q=d.useMemo(()=>({__demoMode:h,immediate:g,optionsPropsRef:_,value:I,defaultValue:T,disabled:v,invalid:u,mode:p?X.Multi:X.Single,virtual:w?Z:null,onChange:H,isSelected:J,calculateIndex:V,compare:N,onClose:y}),[h,g,_,I,T,v,u,p,w,Z,H,J,V,N,y]);ae(()=>{var j;w&&C.send({type:bt.UpdateVirtualConfiguration,options:w.options,disabled:(j=w.disabled)!=null?j:null})},[w,w==null?void 0:w.options,w==null?void 0:w.disabled]),ae(()=>{C.state.dataRef.current=q},[q]);let[Q,S,Y,he]=D(C,j=>[j.comboboxState,j.buttonElement,j.inputElement,j.optionsElement]),ne=ut.get(null),ie=D(ne,d.useCallback(j=>ne.selectors.isTop(j,e),[ne,e]));qt(ie,[S,Y,he],()=>C.actions.closeCombobox());let oe=D(C,C.selectors.activeOptionIndex),be=D(C,C.selectors.activeOption),b=ye({open:Q===x.Open,disabled:v,invalid:u,activeIndex:oe,activeOption:be,value:I}),[G,O]=sn(),L=a===null?{}:{ref:a},k=d.useCallback(()=>{if(T!==void 0)return H==null?void 0:H(T)},[H,T]),W=we();return B.createElement(O,{value:G,props:{htmlFor:Y==null?void 0:Y.id},slot:{open:Q===x.Open,disabled:v}},B.createElement(It,null,B.createElement(ve.Provider,{value:q},B.createElement(ft.Provider,{value:C},B.createElement(Zt,{value:ce(Q,{[x.Open]:je.Open,[x.Closed]:je.Closed})},m!=null&&B.createElement(nn,{disabled:v,data:I!=null?{[m]:I}:{},form:l,onReset:k}),W({ourProps:L,theirProps:R,slot:b,defaultTag:Nn,name:"Combobox"}))))))}let Tn="input";function In(n,a){var e,r;let o=Ce("Combobox.Input"),t=pe("Combobox.Input"),i=d.useId(),l=rn(),{id:m=l||`headlessui-combobox-input-${i}`,onChange:c,displayValue:u,disabled:v=t.disabled||!1,autoFocus:f=!1,type:h="text",...p}=n,g=d.useRef(null),w=ke(g,a,Pt(),o.actions.setInputElement),[P,R]=D(o,b=>[b.comboboxState,b.isTyping]),T=jt(),I=E(()=>{o.actions.onChange(null),o.state.optionsElement&&(o.state.optionsElement.scrollTop=0),o.actions.goToOption({focus:M.Nothing})}),H=d.useMemo(()=>{var b;return typeof u=="function"&&t.value!==void 0?(b=u(t.value))!=null?b:"":typeof t.value=="string"?t.value:""},[t.value,u]);et(([b,G],[O,L])=>{if(o.state.isTyping)return;let k=g.current;k&&((L===x.Open&&G===x.Closed||b!==O)&&(k.value=b),requestAnimationFrame(()=>{if(o.state.isTyping||!k||mt(k))return;let{selectionStart:W,selectionEnd:j}=k;Math.abs((j??0)-(W??0))===0&&W===0&&k.setSelectionRange(k.value.length,k.value.length)}))},[H,P,R]),et(([b],[G])=>{if(b===x.Open&&G===x.Closed){if(o.state.isTyping)return;let O=g.current;if(!O)return;let L=O.value,{selectionStart:k,selectionEnd:W,selectionDirection:j}=O;O.value="",O.value=L,j!==null?O.setSelectionRange(k,W,j):O.setSelectionRange(k,W)}},[P]);let C=d.useRef(!1),_=E(()=>{C.current=!0}),N=E(()=>{T.nextFrame(()=>{C.current=!1})}),V=E(b=>{switch(o.actions.setIsTyping(!0),b.key){case U.Enter:if(o.state.comboboxState!==x.Open||C.current)return;if(b.preventDefault(),b.stopPropagation(),o.selectors.activeOptionIndex(o.state)===null){o.actions.closeCombobox();return}o.actions.selectActiveOption(),t.mode===X.Single&&o.actions.closeCombobox();break;case U.ArrowDown:return b.preventDefault(),b.stopPropagation(),ce(o.state.comboboxState,{[x.Open]:()=>o.actions.goToOption({focus:M.Next}),[x.Closed]:()=>o.actions.openCombobox()});case U.ArrowUp:return b.preventDefault(),b.stopPropagation(),ce(o.state.comboboxState,{[x.Open]:()=>o.actions.goToOption({focus:M.Previous}),[x.Closed]:()=>{se.flushSync(()=>o.actions.openCombobox()),t.value||o.actions.goToOption({focus:M.Last})}});case U.Home:if(o.state.comboboxState===x.Closed||b.shiftKey)break;return b.preventDefault(),b.stopPropagation(),o.actions.goToOption({focus:M.First});case U.PageUp:return b.preventDefault(),b.stopPropagation(),o.actions.goToOption({focus:M.First});case U.End:if(o.state.comboboxState===x.Closed||b.shiftKey)break;return b.preventDefault(),b.stopPropagation(),o.actions.goToOption({focus:M.Last});case U.PageDown:return b.preventDefault(),b.stopPropagation(),o.actions.goToOption({focus:M.Last});case U.Escape:return o.state.comboboxState!==x.Open?void 0:(b.preventDefault(),o.state.optionsElement&&!t.optionsPropsRef.current.static&&b.stopPropagation(),t.mode===X.Single&&t.value===null&&I(),o.actions.closeCombobox());case U.Tab:if(o.actions.setIsTyping(!1),o.state.comboboxState!==x.Open)return;t.mode===X.Single&&o.state.activationTrigger!==ee.Focus&&o.actions.selectActiveOption(),o.actions.closeCombobox();break}}),J=E(b=>{c==null||c(b),t.mode===X.Single&&b.target.value===""&&I(),o.actions.openCombobox()}),Z=E(b=>{var G,O,L;let k=(G=b.relatedTarget)!=null?G:tt.find(W=>W!==b.currentTarget);if(!((O=o.state.optionsElement)!=null&&O.contains(k))&&!((L=o.state.buttonElement)!=null&&L.contains(k))&&o.state.comboboxState===x.Open)return b.preventDefault(),t.mode===X.Single&&t.value===null&&I(),o.actions.closeCombobox()}),y=E(b=>{var G,O,L;let k=(G=b.relatedTarget)!=null?G:tt.find(W=>W!==b.currentTarget);(O=o.state.buttonElement)!=null&&O.contains(k)||(L=o.state.optionsElement)!=null&&L.contains(k)||t.disabled||t.immediate&&o.state.comboboxState!==x.Open&&T.microTask(()=>{se.flushSync(()=>o.actions.openCombobox()),o.actions.setActivationTrigger(ee.Focus)})}),q=_e(),Q=an(),{isFocused:S,focusProps:Y}=dt({autoFocus:f}),{isHovered:he,hoverProps:ne}=ct({isDisabled:v}),ie=D(o,b=>b.optionsElement),oe=ye({open:P===x.Open,disabled:v,invalid:t.invalid,hover:he,focus:S,autofocus:f}),be=Be({ref:w,id:m,role:"combobox",type:h,"aria-controls":ie==null?void 0:ie.id,"aria-expanded":P===x.Open,"aria-activedescendant":D(o,o.selectors.activeDescendantId),"aria-labelledby":q,"aria-describedby":Q,"aria-autocomplete":"list",defaultValue:(r=(e=n.defaultValue)!=null?e:t.defaultValue!==void 0?u==null?void 0:u(t.defaultValue):null)!=null?r:t.defaultValue,disabled:v||void 0,autoFocus:f,onCompositionStart:_,onCompositionEnd:N,onKeyDown:V,onChange:J,onFocus:y,onBlur:Z},Y,ne);return we()({ourProps:be,theirProps:p,slot:oe,defaultTag:Tn,name:"Combobox.Input"})}let Rn="button";function $n(n,a){let e=Ce("Combobox.Button"),r=pe("Combobox.Button"),[o,t]=d.useState(null),i=ke(a,t,e.actions.setButtonElement),l=d.useId(),{id:m=`headlessui-combobox-button-${l}`,disabled:c=r.disabled||!1,autoFocus:u=!1,...v}=n,[f,h,p]=D(e,y=>[y.comboboxState,y.inputElement,y.optionsElement]),g=ht(h),w=f===x.Open;Dt(w,{trigger:o,action:d.useCallback(y=>{if(o!=null&&o.contains(y.target))return fe.Ignore;if(h!=null&&h.contains(y.target))return fe.Ignore;let q=y.target.closest('[role="option"]:not([data-disabled])');return Ut(q)?fe.Select(q):p!=null&&p.contains(y.target)?fe.Ignore:fe.Close},[o,h,p]),close:e.actions.closeCombobox,select:e.actions.selectActiveOption});let P=E(y=>{switch(y.key){case U.Space:case U.Enter:y.preventDefault(),y.stopPropagation(),e.state.comboboxState===x.Closed&&se.flushSync(()=>e.actions.openCombobox()),g();return;case U.ArrowDown:y.preventDefault(),y.stopPropagation(),e.state.comboboxState===x.Closed&&(se.flushSync(()=>e.actions.openCombobox()),e.state.dataRef.current.value||e.actions.goToOption({focus:M.First})),g();return;case U.ArrowUp:y.preventDefault(),y.stopPropagation(),e.state.comboboxState===x.Closed&&(se.flushSync(()=>e.actions.openCombobox()),e.state.dataRef.current.value||e.actions.goToOption({focus:M.Last})),g();return;case U.Escape:if(e.state.comboboxState!==x.Open)return;y.preventDefault(),e.state.optionsElement&&!r.optionsPropsRef.current.static&&y.stopPropagation(),se.flushSync(()=>e.actions.closeCombobox()),g();return;default:return}}),R=Ft(()=>{e.state.comboboxState===x.Open?e.actions.closeCombobox():e.actions.openCombobox(),g()}),T=_e([m]),{isFocusVisible:I,focusProps:H}=dt({autoFocus:u}),{isHovered:C,hoverProps:_}=ct({isDisabled:c}),{pressed:N,pressProps:V}=yt({disabled:c}),J=ye({open:f===x.Open,active:N||f===x.Open,disabled:c,invalid:r.invalid,value:r.value,hover:C,focus:I}),Z=Be({ref:i,id:m,type:Gt(n,o),tabIndex:-1,"aria-haspopup":"listbox","aria-controls":p==null?void 0:p.id,"aria-expanded":f===x.Open,"aria-labelledby":T,disabled:c||void 0,autoFocus:u,onKeyDown:P},R,H,_,V);return we()({ourProps:Z,theirProps:v,slot:J,defaultTag:Rn,name:"Combobox.Button"})}let Mn="div",Dn=Ge.RenderStrategy|Ge.Static;function Fn(n,a){var e,r,o;let t=d.useId(),{id:i=`headlessui-combobox-options-${t}`,hold:l=!1,anchor:m,portal:c=!1,modal:u=!0,transition:v=!1,...f}=n,h=Ce("Combobox.Options"),p=pe("Combobox.Options"),g=Nt(m);g&&(c=!0);let[w,P]=Et(g),[R,T]=d.useState(null),I=Tt(),H=ke(a,g?w:null,h.actions.setOptionsElement,T),[C,_,N,V,J]=D(h,$=>[$.comboboxState,$.inputElement,$.buttonElement,$.optionsElement,$.activationTrigger]),Z=Je(_||N),y=Je(V),q=Xt(),[Q,S]=Yt(v,R,q!==null?(q&je.Open)===je.Open:C===x.Open);Wt(Q,_,h.actions.closeCombobox);let Y=p.__demoMode?!1:u&&C===x.Open;Bt(Y,y);let he=p.__demoMode?!1:u&&C===x.Open;At(he,{allowed:d.useCallback(()=>[_,N,V],[_,N,V])});let ne=D(h,h.selectors.didInputMove)?!1:Q;ae(()=>{var $;p.optionsPropsRef.current.static=($=n.static)!=null?$:!1},[p.optionsPropsRef,n.static]),ae(()=>{p.optionsPropsRef.current.hold=l},[p.optionsPropsRef,l]),en(C===x.Open,{container:V,accept($){return $.getAttribute("role")==="option"?NodeFilter.FILTER_REJECT:$.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk($){$.setAttribute("role","none")}});let ie=_e([N==null?void 0:N.id]),oe=ye({open:C===x.Open,option:void 0}),be=E(()=>{h.actions.setActivationTrigger(ee.Pointer)}),b=E($=>{$.preventDefault(),h.actions.setActivationTrigger(ee.Pointer)}),G=Be(g?I():{},{"aria-labelledby":ie,role:"listbox","aria-multiselectable":p.mode===X.Multi?!0:void 0,id:i,ref:H,style:{...f.style,...P,"--input-width":Xe(Q,_,!0).width,"--button-width":Xe(Q,N,!0).width},onWheel:J===ee.Pointer?void 0:be,onMouseDown:b,...Jt(S)}),O=Q&&C===x.Closed&&!n.static,L=nt(O,(e=p.virtual)==null?void 0:e.options),k=nt(O,p.value),W=d.useCallback($=>p.compare(k,$),[p.compare,k]),j=d.useMemo(()=>{if(!p.virtual)return p;if(L===void 0)throw new Error("Missing `options` in virtual mode");return L!==p.virtual.options?{...p,virtual:{...p.virtual,options:L}}:p},[p,L,(r=p.virtual)==null?void 0:r.options]);p.virtual&&Object.assign(f,{children:B.createElement(ve.Provider,{value:j},B.createElement(Pn,{slot:oe},f.children))});let re=we(),gt=d.useMemo(()=>p.mode===X.Multi?p:{...p,isSelected:W},[p,W]);return B.createElement(_t,{enabled:c?n.static||Q:!1,ownerDocument:Z},B.createElement(ve.Provider,{value:gt},re({ourProps:G,theirProps:{...f,children:B.createElement(on,{freeze:O},typeof f.children=="function"?(o=f.children)==null?void 0:o.call(f,oe):f.children)},slot:oe,defaultTag:Mn,features:Dn,visible:ne,name:"Combobox.Options"})))}let zn="div";function An(n,a){var e,r,o;let t=pe("Combobox.Option"),i=Ce("Combobox.Option"),l=d.useId(),{id:m=`headlessui-combobox-option-${l}`,value:c,disabled:u=(o=(r=(e=t.virtual)==null?void 0:e.disabled)==null?void 0:r.call(e,c))!=null?o:!1,order:v=null,...f}=n,[h]=D(i,S=>[S.inputElement]),p=ht(h),g=D(i,d.useCallback(S=>i.selectors.isActive(S,c,m),[c,m])),w=t.isSelected(c),P=d.useRef(null),R=kt({disabled:u,value:c,domRef:P,order:v}),T=d.useContext(vt),I=ke(a,P,T?T.measureElement:null),H=E(()=>{i.actions.setIsTyping(!1),i.actions.onChange(c)});ae(()=>i.actions.registerOption(m,R),[R,m]);let C=D(i,d.useCallback(S=>i.selectors.shouldScrollIntoView(S,c,m),[c,m]));ae(()=>{if(C)return Ot().requestAnimationFrame(()=>{var S,Y;(Y=(S=P.current)==null?void 0:S.scrollIntoView)==null||Y.call(S,{block:"nearest"})})},[C,P]);let _=E(S=>{S.preventDefault(),S.button===zt.Left&&(u||(H(),Qt()||requestAnimationFrame(()=>p()),t.mode===X.Single&&i.actions.closeCombobox()))}),N=E(()=>{if(u)return i.actions.goToOption({focus:M.Nothing});let S=t.calculateIndex(c);i.actions.goToOption({focus:M.Specific,idx:S})}),V=Mt(),J=E(S=>V.update(S)),Z=E(S=>{if(!V.wasMoved(S)||u||g&&i.state.activationTrigger===ee.Pointer)return;let Y=t.calculateIndex(c);i.actions.goToOption({focus:M.Specific,idx:Y},ee.Pointer)}),y=E(S=>{V.wasMoved(S)&&(u||g&&(t.optionsPropsRef.current.hold||i.state.activationTrigger===ee.Pointer&&i.actions.goToOption({focus:M.Nothing})))}),q=ye({active:g,focus:g,selected:w,disabled:u}),Q={id:m,ref:I,role:"option",tabIndex:u===!0?void 0:-1,"aria-disabled":u===!0?!0:void 0,"aria-selected":w,disabled:void 0,onMouseDown:_,onFocus:N,onPointerEnter:J,onMouseEnter:J,onPointerMove:Z,onMouseMove:Z,onPointerLeave:y,onMouseLeave:y};return we()({ourProps:Q,theirProps:f,slot:q,defaultTag:zn,name:"Combobox.Option"})}let Ln=ge(En),Qe=ge($n),F=ge(In),Kn=Oe,z=ge(Fn),A=ge(An),K=Object.assign(Ln,{Input:F,Button:Qe,Label:Kn,Options:z,Option:A});const Vn=`import { useState } from 'react'\r
import {\r
  Combobox,\r
  ComboboxButton,\r
  ComboboxInput,\r
  ComboboxOption,\r
  ComboboxOptions,\r
} from '@headlessui/react'\r
import { Icon } from '@iconify/react'\r
import clsx from 'clsx'\r
\r
// Define the type for the person object\r
interface Person {\r
  id: number\r
  name: string\r
}\r
\r
const people: Person[] = [\r
  { id: 1, name: 'Tom Cook' },\r
  { id: 2, name: 'Wade Cooper' },\r
  { id: 3, name: 'Tanya Fox' },\r
  { id: 4, name: 'Arlene Mccoy' },\r
  { id: 5, name: 'Devon Webb' },\r
]\r
\r
const BasicComboCode = () => {\r
  const [query, setQuery] = useState<string>('')\r
  const [selected, setSelected] = useState<Person>(people[1])\r
\r
  const filteredPeople =\r
    query === ''\r
      ? people\r
      : people.filter((person) => {\r
          return person.name.toLowerCase().includes(query.toLowerCase())\r
        })\r
\r
  return (\r
    <div>\r
      <div className='max-w-sm'>\r
        <Combobox\r
          value={selected}\r
          onChange={(value : any) => setSelected(value)}\r
          onClose={() => setQuery('')}>\r
          <div className='relative'>\r
            <ComboboxInput\r
              className={clsx(\r
                'w-full ui-form-control rounded-md p-2',\r
                'focus:outline-none focus:dark:ring-2 focus:dark:ring-white/25'\r
              )}\r
              displayValue={(person: Person) => person?.name}\r
              onChange={(event) => setQuery(event.target.value)}\r
            />\r
            <ComboboxButton className='group absolute inset-y-0 right-0 px-2.5'>\r
              <Icon icon='solar:alt-arrow-down-outline' height={20} />\r
            </ComboboxButton>\r
          </div>\r
\r
          <ComboboxOptions\r
            anchor='bottom'\r
            transition\r
            className={clsx(\r
              'absolute z-10 mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-border ring-opacity-5 focus:outline-none sm:text-sm',\r
              'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'\r
            )}>\r
            {filteredPeople.map((person) => (\r
              <ComboboxOption\r
                key={person.id}\r
                value={person}\r
                className='group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover hover:text-primary text-primary dark:text-primary data-[focus]:bg-hover data-[focus]:text-primary'>\r
                <Icon\r
                  icon='solar:check-read-linear'\r
                  className='invisible  group-data-[selected]:visible'\r
                  height={20}\r
                />\r
                <div className='text-sm text-ld hover:text-primary data-[focus]:text-primary'>\r
                  {person.name}\r
                </div>\r
              </ComboboxOption>\r
            ))}\r
          </ComboboxOptions>\r
        </Combobox>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default BasicComboCode\r
`,Wn=`import { useState } from 'react'\r
import {\r
  Field,\r
  Combobox,\r
  ComboboxInput,\r
  ComboboxOptions,\r
  ComboboxOption,\r
} from '@headlessui/react'\r
\r
// Define the type for the person object\r
interface Person {\r
  id: number\r
  name: string\r
}\r
\r
const people: Person[] = [\r
  { id: 1, name: 'Durward Reynolds' },\r
  { id: 2, name: 'Kenton Towne' },\r
  { id: 3, name: 'Therese Wunsch' },\r
  { id: 4, name: 'Benedict Kessler' },\r
  { id: 5, name: 'Katelyn Rohan' },\r
]\r
\r
const ComboPositionCode = () => {\r
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(people[0])\r
  const [query, setQuery] = useState('')\r
\r
  const filteredPeople =\r
    query === ''\r
      ? people\r
      : people.filter((person) => {\r
          return person.name.toLowerCase().includes(query.toLowerCase())\r
        })\r
\r
  return (\r
    <div>\r
      <div className='max-w-sm'>\r
        <Field>\r
          <Combobox\r
            value={selectedPerson}\r
            onChange={setSelectedPerson}\r
            onClose={() => setQuery('')}>\r
            <ComboboxInput\r
              displayValue={(person: Person | null) =>\r
                person ? person.name : ''\r
              }\r
              onChange={(event) => setQuery(event.target.value)}\r
              className='w-full ui-form-control rounded-md p-2'\r
            />\r
            <ComboboxOptions\r
              anchor='top start'\r
              className='absolute z-10 mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm empty:invisible'>\r
              {filteredPeople.map((person) => (\r
                <ComboboxOption\r
                  key={person.id}\r
                  value={person}\r
                  className='group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary'>\r
                  {person.name}\r
                </ComboboxOption>\r
              ))}\r
            </ComboboxOptions>\r
          </Combobox>\r
        </Field>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default ComboPositionCode\r
`,Bn=`import { useState } from 'react'\r
import {\r
  Field,\r
  Combobox,\r
  ComboboxInput,\r
  ComboboxOptions,\r
  ComboboxOption,\r
  Label,\r
} from '@headlessui/react'\r
\r
// Define the type for the person object\r
interface Person {\r
  id: number\r
  name: string\r
}\r
\r
const people: Person[] = [\r
  { id: 1, name: 'Durward Reynolds' },\r
  { id: 2, name: 'Kenton Towne' },\r
  { id: 3, name: 'Therese Wunsch' },\r
  { id: 4, name: 'Benedict Kessler' },\r
  { id: 5, name: 'Katelyn Rohan' },\r
]\r
\r
const ComboWithLableCode = () => {\r
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(people[0])\r
  const [query, setQuery] = useState('')\r
\r
  const filteredPeople =\r
    query === ''\r
      ? people\r
      : people.filter((person) => {\r
          return person.name.toLowerCase().includes(query.toLowerCase())\r
        })\r
\r
  return (\r
    <div>\r
      <div className='max-w-sm'>\r
        <Field className='flex gap-3  items-center'>\r
          <Label className='text-ld'>Assignee:</Label>\r
          <Combobox\r
            value={selectedPerson}\r
            onChange={setSelectedPerson}\r
            onClose={() => setQuery('')}>\r
            <ComboboxInput\r
              displayValue={(person: Person | null) =>\r
                person ? person.name : ''\r
              }\r
              onChange={(event) => setQuery(event.target.value)}\r
              className='w-full ui-form-control rounded-md p-2'\r
            />\r
            <ComboboxOptions\r
              anchor='bottom'\r
              className='absolute z-10 mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm empty:invisible'>\r
              {filteredPeople.map((person) => (\r
                <ComboboxOption\r
                  key={person.id}\r
                  value={person}\r
                  className='group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary'>\r
                  {person.name}\r
                </ComboboxOption>\r
              ))}\r
            </ComboboxOptions>\r
          </Combobox>\r
        </Field>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default ComboWithLableCode\r
`,_n=`import { useState } from 'react'\r
import {\r
  Field,\r
  Combobox,\r
  ComboboxInput,\r
  ComboboxOptions,\r
  ComboboxOption,\r
  Label,\r
} from '@headlessui/react'\r
\r
// Define the type for the person object\r
interface Person {\r
  id: number\r
  name: string\r
  available: boolean\r
}\r
\r
const people: Person[] = [\r
  { id: 1, name: 'Durward Reynolds', available: true },\r
  { id: 2, name: 'Kenton Towne', available: true },\r
  { id: 3, name: 'Therese Wunsch', available: true },\r
  { id: 4, name: 'Benedict Kessler', available: false },\r
  { id: 5, name: 'Katelyn Rohan', available: true },\r
]\r
\r
const DisableComboOptCode = () => {\r
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(people[0])\r
  const [query, setQuery] = useState('')\r
\r
  const filteredPeople =\r
    query === ''\r
      ? people\r
      : people.filter((person) => {\r
          return person.name.toLowerCase().includes(query.toLowerCase())\r
        })\r
\r
  return (\r
    <div>\r
      <div className='max-w-sm'>\r
        <Field className='flex gap-3 items-center'>\r
          <Label className='text-ld'>Assignee:</Label>\r
          <Combobox\r
            value={selectedPerson}\r
            onChange={setSelectedPerson}\r
            onClose={() => setQuery('')}>\r
            <ComboboxInput\r
              displayValue={(person: Person | null) =>\r
                person ? person.name : ''\r
              }\r
              onChange={(event) => setQuery(event.target.value)}\r
              className='w-full ui-form-control rounded-md p-2'\r
            />\r
            <ComboboxOptions\r
              anchor='bottom'\r
              className='absolute z-10 mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm empty:invisible'>\r
              {filteredPeople.map((person) => (\r
                <ComboboxOption\r
                  key={person.id}\r
                  value={person}\r
                  disabled={!person.available}\r
                  className='group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary  data-[disabled]:opacity-50 data-[disabled]:hover:text-darklink'>\r
                  {person.name}\r
                </ComboboxOption>\r
              ))}\r
            </ComboboxOptions>\r
          </Combobox>\r
        </Field>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default DisableComboOptCode\r
`,qn=`import { useState } from 'react'\r
import {\r
  Field,\r
  Combobox,\r
  ComboboxInput,\r
  ComboboxOptions,\r
  ComboboxOption,\r
  Label,\r
} from '@headlessui/react'\r
\r
// Define the type for the person object\r
interface Person {\r
  id: number\r
  name: string\r
}\r
\r
const people: Person[] = [\r
  { id: 1, name: 'Durward Reynolds' },\r
  { id: 2, name: 'Kenton Towne' },\r
  { id: 3, name: 'Therese Wunsch' },\r
  { id: 4, name: 'Benedict Kessler' },\r
  { id: 5, name: 'Katelyn Rohan' },\r
]\r
\r
const DisabledCode = () => {\r
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(people[0])\r
  const [query, setQuery] = useState('')\r
\r
  const filteredPeople =\r
    query === ''\r
      ? people\r
      : people.filter((person) => {\r
          return person.name.toLowerCase().includes(query.toLowerCase())\r
        })\r
\r
  return (\r
    <div>\r
      <div className='max-w-sm'>\r
        <Field className='flex gap-3  items-center' disabled>\r
          <Label className='text-ld'>Select:</Label>\r
          <Combobox\r
            value={selectedPerson}\r
            onChange={setSelectedPerson}\r
            onClose={() => setQuery('')}>\r
            <ComboboxInput\r
              displayValue={(person: Person | null) =>\r
                person ? person.name : ''\r
              }\r
              onChange={(event) => setQuery(event.target.value)}\r
              className='w-full ui-form-control rounded-md p-2'\r
            />\r
            <ComboboxOptions\r
              anchor='bottom'\r
              className='absolute z-10 mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm empty:invisible'>\r
              {filteredPeople.map((person) => (\r
                <ComboboxOption\r
                  key={person.id}\r
                  value={person}\r
                  className='group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary'>\r
                  {person.name}\r
                </ComboboxOption>\r
              ))}\r
            </ComboboxOptions>\r
          </Combobox>\r
        </Field>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default DisabledCode\r
`,Qn=`import { useState } from 'react'\r
import {\r
  Combobox,\r
  ComboboxInput,\r
  ComboboxOption,\r
  ComboboxOptions,\r
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
const HtmlFormsCodes = () => {\r
  const [selectedPerson, setSelectedPerson] = useState<string>(people[0].name)\r
  const [query, setQuery] = useState('')\r
\r
  const filteredPeople =\r
    query === ''\r
      ? people\r
      : people.filter((person) =>\r
          person.name.toLowerCase().includes(query.toLowerCase())\r
        )\r
\r
  return (\r
    <div>\r
      <div className='max-w-sm'>\r
        <form\r
          action='/projects/1/assignee'\r
          method='post'\r
          className='flex gap-3'>\r
          <Combobox\r
            name='assignee'\r
            value={selectedPerson}\r
            onChange={(value) => setSelectedPerson(value as string)}\r
            onClose={() => setQuery('')}>\r
            <ComboboxInput\r
              aria-label='Assignee'\r
              displayValue={() => selectedPerson}\r
              onChange={(event) => setQuery(event.target.value)}\r
              className='w-full ui-form-control rounded-md p-2'\r
            />\r
            <ComboboxOptions\r
              anchor='bottom'\r
              className='absolute z-10 mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm empty:invisible'>\r
              {filteredPeople.map((person) => (\r
                <ComboboxOption\r
                  key={person.id}\r
                  value={person.name}\r
                  className='group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary'>\r
                  {person.name}\r
                </ComboboxOption>\r
              ))}\r
            </ComboboxOptions>\r
          </Combobox>\r
          <button type='submit' className='ui-button bg-primary'>\r
            Submit\r
          </button>\r
        </form>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default HtmlFormsCodes\r
`,Ne=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],Un=()=>{const[n,a]=d.useState(Ne[0]),[e,r]=d.useState(""),o=e===""?Ne:Ne.filter(t=>t.name.toLowerCase().includes(e.toLowerCase()));return s.jsx(s.Fragment,{children:s.jsxs(te,{children:[s.jsx("h4",{className:"text-lg font-semibold mb-2",children:"Rendering Active Option Details"}),s.jsx(K,{value:n,onChange:()=>a,onClose:()=>r(""),children:({activeOption:t})=>s.jsxs("div",{children:[s.jsx(F,{"aria-label":"Assignee",displayValue:i=>i==null?void 0:i.name,onChange:i=>r(i.target.value),className:"w-full ui-form-control rounded-md p-2"}),s.jsx(z,{anchor:"top",className:"origin-top border transition duration-200 ease-out empty:invisible data-[closed]:scale-95 data-[closed]:opacity-0 absolute z-10 mt-1 max-h-60 w-[var(--input-width)]  overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",children:o.map(i=>s.jsx(A,{value:i,className:"group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary",children:i.name},i.id))}),t&&s.jsxs("p",{className:"text-ld",children:["The currently focused user is: ",s.jsx("b",{children:t.name})]})]})})]})})},Ee=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],Hn=()=>{const[n,a]=d.useState(Ee[0].name),[e,r]=d.useState(""),o=e===""?Ee:Ee.filter(t=>t.name.toLowerCase().includes(e.toLowerCase()));return s.jsx("div",{children:s.jsx("div",{className:"max-w-sm",children:s.jsxs("form",{action:"/projects/1/assignee",method:"post",className:"flex gap-3",children:[s.jsxs(K,{name:"assignee",value:n,onChange:t=>a(t),onClose:()=>r(""),children:[s.jsx(F,{"aria-label":"Assignee",displayValue:()=>n,onChange:t=>r(t.target.value),className:"w-full ui-form-control rounded-md p-2"}),s.jsx(z,{anchor:"bottom",className:"absolute z-10 mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm empty:invisible",children:o.map(t=>s.jsx(A,{value:t.name,className:"group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary",children:t.name},t.id))})]}),s.jsx("button",{type:"submit",className:"ui-button bg-primary",children:"Submit"})]})})})},Gn=()=>s.jsx(me,{className:"p-0",children:s.jsx("div",{children:s.jsxs("div",{className:"p-6",children:[s.jsx("h4",{className:"text-lg font-semibold mb-4",children:"HTML Forms"}),s.jsx(Hn,{})]})})}),Te=[{id:1,name:"Tom Cook"},{id:2,name:"Wade Cooper"},{id:3,name:"Tanya Fox"},{id:4,name:"Arlene Mccoy"},{id:5,name:"Devon Webb"}],Xn=()=>{const[n,a]=d.useState(""),[e,r]=d.useState(Te[1]),o=n===""?Te:Te.filter(t=>t.name.toLowerCase().includes(n.toLowerCase()));return s.jsx("div",{children:s.jsx("div",{className:"max-w-sm",children:s.jsxs(K,{value:e,onChange:t=>r(t),onClose:()=>a(""),children:[s.jsxs("div",{className:"relative",children:[s.jsx(F,{className:Ue("w-full ui-form-control rounded-md p-2","focus:outline-none focus:dark:ring-2 focus:dark:ring-white/25"),displayValue:t=>t==null?void 0:t.name,onChange:t=>a(t.target.value)}),s.jsx(Qe,{className:"group absolute inset-y-0 right-0 px-2.5",children:s.jsx(He,{icon:"solar:alt-arrow-down-outline",height:20})})]}),s.jsx(z,{anchor:"bottom",transition:!0,className:Ue("absolute z-10 mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-border ring-opacity-5 focus:outline-none sm:text-sm","transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"),children:o.map(t=>s.jsxs(A,{value:t,className:"group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover hover:text-primary text-primary dark:text-primary data-[focus]:bg-hover data-[focus]:text-primary",children:[s.jsx(He,{icon:"solar:check-read-linear",className:"invisible  group-data-[selected]:visible",height:20}),s.jsx("div",{className:"text-sm text-ld hover:text-primary data-[focus]:text-primary",children:t.name})]},t.id))})]})})})},Yn=()=>s.jsx(me,{className:"p-0",children:s.jsx("div",{children:s.jsxs("div",{className:"p-6",children:[s.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Basic"}),s.jsx(Xn,{})]})})}),Ie=["Durward Reynolds","Kenton Towne","Therese Wunsch","Benedict Kessler","Katelyn Rohan"],Jn=()=>{const[n,a]=d.useState(Ie[0]),[e,r]=d.useState(""),o=e===""?Ie:Ie.filter(i=>i.toLowerCase().includes(e.toLowerCase())),t=i=>{a(i),r("")};return s.jsx("div",{children:s.jsxs(te,{children:[s.jsx("div",{className:"flex items-center justify-between mb-2",children:s.jsx("h4",{className:"text-lg font-semibold",children:"Binding Values"})}),s.jsxs(K,{value:n,onChange:t,children:[s.jsx(F,{"aria-label":"Assignee",onChange:i=>r(i.target.value),value:e,className:"w-full ui-form-control rounded-md p-2"}),s.jsx(z,{anchor:"bottom",className:"origin-top border transition duration-200 ease-out empty:invisible data-[closed]:scale-95 data-[closed]:opacity-0 absolute z-10 mt-1 max-h-60 w-[var(--input-width)]  overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",children:o.map(i=>s.jsx(A,{value:i,className:"group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary",children:i},i))})]})]})})},Re=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],Zn=()=>{const[n,a]=d.useState(Re[0]),[e,r]=d.useState(""),o=e===""?Re:Re.filter(t=>t.name.toLowerCase().includes(e.toLowerCase()));return s.jsx(s.Fragment,{children:s.jsxs(te,{children:[s.jsx("h4",{className:"text-lg font-semibold mb-2",children:"Binding Objects as Values"}),s.jsxs(K,{value:n,onChange:()=>a,onClose:()=>r(""),children:[s.jsx(F,{"aria-label":"Assignee",displayValue:t=>t==null?void 0:t.name,onChange:t=>r(t.target.value),className:"w-full ui-form-control rounded-md p-2"}),s.jsx(z,{anchor:"bottom",className:"origin-top border transition duration-200 ease-out empty:invisible data-[closed]:scale-95 data-[closed]:opacity-0 absolute z-10 mt-1 max-h-60 w-[var(--input-width)]  overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",children:o.map(t=>s.jsx(A,{value:t,className:"group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary",children:t.name},t.id))})]})]})})},$e=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],eo=()=>{const[n,a]=d.useState($e[0]),[e,r]=d.useState(""),o=e===""?$e:$e.filter(t=>t.name.toLowerCase().includes(e.toLowerCase()));return s.jsx("div",{children:s.jsxs(te,{children:[s.jsx("div",{className:"flex items-center justify-between mb-2",children:s.jsx("h4",{className:"text-lg font-semibold",children:"Open On Focus"})}),s.jsxs(K,{immediate:!0,value:n,onChange:()=>a,onClose:()=>r(""),children:[s.jsx(F,{"aria-label":"Assignee",displayValue:t=>t==null?void 0:t.name,onChange:t=>r(t.target.value),className:"w-full ui-form-control rounded-md p-2"}),s.jsx(z,{anchor:"bottom",className:"origin-top transition duration-200 ease-out empty:invisible data-[closed]:scale-95 data-[closed]:opacity-0 absolute z-10 mt-1 max-h-60 w-[var(--input-width)]  overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-border ring-opacity-5 focus:outline-none sm:text-sm border-0",children:o.map(t=>s.jsx(A,{value:t,className:"group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary",children:t.name},t.id))})]})]})})},Me=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],to=()=>{const[n,a]=d.useState(Me[0]),[e,r]=d.useState(""),o=e===""?Me:Me.filter(t=>t.name.toLowerCase().includes(e.toLowerCase()));return s.jsx("div",{children:s.jsx("div",{className:"max-w-sm",children:s.jsx(ue,{children:s.jsxs(K,{value:n,onChange:a,onClose:()=>r(""),children:[s.jsx(F,{displayValue:t=>t?t.name:"",onChange:t=>r(t.target.value),className:"w-full ui-form-control rounded-md p-2"}),s.jsx(z,{anchor:"top start",className:"absolute z-10 mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm empty:invisible",children:o.map(t=>s.jsx(A,{value:t,className:"group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary",children:t.name},t.id))})]})})})})},no=()=>s.jsx(me,{className:"p-0",children:s.jsx("div",{children:s.jsxs("div",{className:"p-6",children:[s.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Dropdown Position"}),s.jsx(to,{})]})})}),De=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],oo=()=>{const[n,a]=d.useState(De[0]),[e,r]=d.useState(""),o=e===""?De:De.filter(t=>t.name.toLowerCase().includes(e.toLowerCase()));return s.jsx("div",{children:s.jsxs(te,{children:[s.jsx("div",{className:"flex items-center justify-between mb-2",children:s.jsx("h4",{className:"text-lg font-semibold",children:"Dropdown Width"})}),s.jsx(ue,{children:s.jsxs(K,{value:n,onChange:a,onClose:()=>r(""),children:[s.jsx(F,{displayValue:t=>t?t.name:"",onChange:t=>r(t.target.value),className:"w-full ui-form-control rounded-md p-2"}),s.jsx(z,{anchor:"bottom",className:"absolute z-10 mt-1 max-h-60 w-56 overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm empty:invisible",children:o.map(t=>s.jsx(A,{value:t,className:"group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary",children:t.name},t.id))})]})})]})})},Fe=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],ro=()=>{const[n,a]=d.useState(Fe[0]),[e,r]=d.useState(""),o=e===""?Fe:Fe.filter(t=>t.name.toLowerCase().includes(e.toLowerCase()));return s.jsx("div",{children:s.jsx("div",{className:"max-w-sm",children:s.jsxs(ue,{className:"flex gap-3  items-center",disabled:!0,children:[s.jsx(Oe,{className:"text-ld",children:"Select:"}),s.jsxs(K,{value:n,onChange:a,onClose:()=>r(""),children:[s.jsx(F,{displayValue:t=>t?t.name:"",onChange:t=>r(t.target.value),className:"w-full ui-form-control rounded-md p-2"}),s.jsx(z,{anchor:"bottom",className:"absolute z-10 mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm empty:invisible",children:o.map(t=>s.jsx(A,{value:t,className:"group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary",children:t.name},t.id))})]})]})})})},so=()=>s.jsx(me,{className:"p-0",children:s.jsx("div",{children:s.jsxs("div",{className:"p-6",children:[s.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Disabled"}),s.jsx(ro,{})]})})}),ze=[{id:1,name:"Durward Reynolds",available:!0},{id:2,name:"Kenton Towne",available:!0},{id:3,name:"Therese Wunsch",available:!0},{id:4,name:"Benedict Kessler",available:!1},{id:5,name:"Katelyn Rohan",available:!0}],ao=()=>{const[n,a]=d.useState(ze[0]),[e,r]=d.useState(""),o=e===""?ze:ze.filter(t=>t.name.toLowerCase().includes(e.toLowerCase()));return s.jsx("div",{children:s.jsx("div",{className:"max-w-sm",children:s.jsxs(ue,{className:"flex gap-3 items-center",children:[s.jsx(Oe,{className:"text-ld",children:"Assignee:"}),s.jsxs(K,{value:n,onChange:a,onClose:()=>r(""),children:[s.jsx(F,{displayValue:t=>t?t.name:"",onChange:t=>r(t.target.value),className:"w-full ui-form-control rounded-md p-2"}),s.jsx(z,{anchor:"bottom",className:"absolute z-10 mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm empty:invisible",children:o.map(t=>s.jsx(A,{value:t,disabled:!t.available,className:"group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary  data-[disabled]:opacity-50 data-[disabled]:hover:text-darklink",children:t.name},t.id))})]})]})})})},io=()=>s.jsx(me,{className:"p-0",children:s.jsx("div",{children:s.jsxs("div",{className:"p-6",children:[s.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Disabled Combo Option"}),s.jsx(ao,{})]})})}),Se=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],lo=()=>{const[n,a]=d.useState([Se[0],Se[1]]),[e,r]=d.useState(""),o=e===""?Se:Se.filter(t=>t.name.toLowerCase().includes(e.toLowerCase()));return s.jsx("div",{children:s.jsxs(te,{children:[s.jsx("div",{className:"flex items-center justify-between mb-2",children:s.jsx("h4",{className:"text-lg font-semibold",children:"Selecting Multiple Values"})}),s.jsxs(K,{multiple:!0,value:n,onChange:a,onClose:()=>r(""),children:[n.length>0&&s.jsx("ul",{children:n.map(t=>s.jsx("li",{children:t.name},t.id))}),s.jsx(F,{"aria-label":"Assignees",onChange:t=>r(t.target.value),className:"w-full ui-form-control rounded-md p-2"}),s.jsx(z,{anchor:"bottom",className:"origin-top border transition duration-200 ease-out empty:invisible data-[closed]:scale-95 data-[closed]:opacity-0 absolute z-10 mt-1 max-h-60 w-[var(--input-width)]  overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",children:o.map(t=>s.jsx(A,{value:t,className:"group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary",children:t.name},t.id))})]})]})})},Ae=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],co=d.forwardRef((n,a)=>s.jsx("button",{ref:a,...n})),uo=()=>{const[n,a]=d.useState(Ae[0]),[e,r]=d.useState(""),o=e===""?Ae:Ae.filter(t=>t.name.toLowerCase().includes(e.toLowerCase()));return s.jsxs(te,{children:[s.jsx("h4",{className:"text-lg font-semibold mb-2",children:"Rendering As Different Elements"}),s.jsxs(K,{value:n,onChange:()=>a,onClose:()=>r(""),children:[s.jsxs("span",{className:"flex gap-3",children:[s.jsx(F,{"aria-label":"Assignee",displayValue:t=>t==null?void 0:t.name,onChange:t=>r(t.target.value),className:"w-full ui-form-control rounded-md p-2"}),s.jsx(Qe,{as:co,className:"ui-button bg-primary text-white",children:"Open"})]}),s.jsx(z,{as:"ul",className:"origin-top border transition duration-200 ease-out empty:invisible data-[closed]:scale-95 data-[closed]:opacity-0 absolute z-10 mt-1 max-h-60 w-[var(--input-width)]  overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",children:o.map(t=>s.jsx(A,{as:"li",value:t,className:"group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary",children:t.name},t.id))})]})]})},Le=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],mo=()=>{const[n,a]=d.useState(Le[0]),[e,r]=d.useState(""),o=e===""?Le:Le.filter(t=>t.name.toLowerCase().includes(e.toLowerCase()));return s.jsx(s.Fragment,{children:s.jsxs(te,{children:[s.jsx("h4",{className:"text-lg font-semibold mb-2",children:"Virtual Scrolling"}),s.jsxs(K,{value:n,virtual:{options:o},onChange:()=>a,onClose:()=>r(""),children:[s.jsx(F,{"aria-label":"Assignee",displayValue:t=>t==null?void 0:t.name,onChange:t=>r(t.target.value),className:"w-full ui-form-control rounded-md p-2"}),s.jsx(z,{anchor:"bottom",className:"origin-top border transition duration-200 ease-out empty:invisible data-[closed]:scale-95 data-[closed]:opacity-0 absolute z-10 mt-1 max-h-60 w-[var(--input-width)]  overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",children:({option:t})=>s.jsx(A,{value:t,className:"group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary",children:t.name})})]})]})})},Ke=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],po=()=>{const[n,a]=d.useState(Ke[0]),[e,r]=d.useState(""),o=e===""?Ke:Ke.filter(t=>t.name.toLowerCase().includes(e.toLowerCase()));return s.jsx("div",{children:s.jsxs(te,{children:[s.jsx("div",{className:"flex items-center justify-between mb-2",children:s.jsx("h4",{className:"text-lg font-semibold",children:"With FramerMotion"})}),s.jsx(K,{value:n,onChange:a,onClose:()=>r(""),children:({open:t})=>s.jsxs("div",{children:[s.jsx(F,{displayValue:i=>i?i.name:"",onChange:i=>r(i.target.value),className:"w-full ui-form-control rounded-md p-2"}),s.jsx(dn,{children:t&&s.jsx(z,{static:!0,as:cn.div,initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},anchor:"bottom",className:"origin-top empty:invisible data-[closed]:scale-95 data-[closed]:opacity-0 absolute z-10 mt-1 max-h-60 w-[var(--input-width)]  overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",onAnimationComplete:()=>r(""),children:o.map(i=>s.jsx(A,{value:i,className:"group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary",children:i.name},i.id))})})]})})]})})},Ve=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],ho=()=>{const[n,a]=d.useState(Ve[0]),[e,r]=d.useState(""),o=e===""?Ve:Ve.filter(t=>t.name.toLowerCase().includes(e.toLowerCase()));return s.jsx("div",{children:s.jsx("div",{className:"max-w-sm",children:s.jsxs(ue,{className:"flex gap-3  items-center",children:[s.jsx(Oe,{className:"text-ld",children:"Assignee:"}),s.jsxs(K,{value:n,onChange:a,onClose:()=>r(""),children:[s.jsx(F,{displayValue:t=>t?t.name:"",onChange:t=>r(t.target.value),className:"w-full ui-form-control rounded-md p-2"}),s.jsx(z,{anchor:"bottom",className:"absolute z-10 mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm empty:invisible",children:o.map(t=>s.jsx(A,{value:t,className:"group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary",children:t.name},t.id))})]})]})})})},bo=()=>s.jsx(me,{className:"p-0",children:s.jsx("div",{children:s.jsxs("div",{className:"p-6",children:[s.jsx("h4",{className:"text-lg font-semibold mb-4",children:"With Label"}),s.jsx(ho,{})]})})}),We=[{id:1,name:"Durward Reynolds"},{id:2,name:"Kenton Towne"},{id:3,name:"Therese Wunsch"},{id:4,name:"Benedict Kessler"},{id:5,name:"Katelyn Rohan"}],fo=()=>{const[n,a]=d.useState(We[0]),[e,r]=d.useState(""),o=e===""?We:We.filter(t=>t.name.toLowerCase().includes(e.toLowerCase()));return s.jsx("div",{children:s.jsxs(te,{children:[s.jsx("div",{className:"flex items-center justify-between mb-2",children:s.jsx("h4",{className:"text-lg font-semibold",children:"With Transitions"})}),s.jsx(ue,{children:s.jsxs(K,{value:n,onChange:a,onClose:()=>r(""),children:[s.jsx(F,{displayValue:t=>t?t.name:"",onChange:t=>r(t.target.value),className:"w-full ui-form-control rounded-md  p-2"}),s.jsx(z,{transition:!0,anchor:"bottom",className:"origin-top border transition duration-200 ease-out empty:invisible data-[closed]:scale-95 data-[closed]:opacity-0 absolute z-10 mt-1 max-h-60 w-[var(--input-width)]  overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",children:o.map(t=>s.jsx(A,{value:t,className:"group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover text-ld hover:text-primary dark:hover:text-primary  data-[focus]:bg-hover data-[focus]:text-primary",children:t.name},t.id))})]})})]})})},ar=()=>{const n=[{to:"/",title:"Home"},{title:"Combobox"}];return s.jsxs(s.Fragment,{children:[s.jsx(un,{title:"Combobox",items:n}),s.jsxs("div",{className:"grid grid-cols-12 gap-7",children:[s.jsxs("div",{className:"col-span-12",children:[s.jsx(Yn,{}),s.jsx(le,{children:Vn})]}),s.jsxs("div",{className:"col-span-12",children:[s.jsx(bo,{}),s.jsx(le,{children:Bn})]}),s.jsxs("div",{className:"col-span-12",children:[s.jsx(so,{}),s.jsx(le,{children:qn})]}),s.jsxs("div",{className:"col-span-12",children:[s.jsx(io,{}),s.jsx(le,{children:_n})]}),s.jsxs("div",{className:"col-span-12",children:[s.jsx(Gn,{}),s.jsx(le,{children:Qn})]}),s.jsxs("div",{className:"col-span-12",children:[s.jsx(no,{}),s.jsx(le,{children:Wn})]}),s.jsx("div",{className:"col-span-12",children:s.jsx(oo,{})}),s.jsx("div",{className:"col-span-12",children:s.jsx(fo,{})}),s.jsx("div",{className:"col-span-12",children:s.jsx(po,{})}),s.jsx("div",{className:"col-span-12",children:s.jsx(Jn,{})}),s.jsx("div",{className:"col-span-12",children:s.jsx(eo,{})}),s.jsx("div",{className:"col-span-12",children:s.jsx(uo,{})}),s.jsx("div",{className:"col-span-12",children:s.jsx(Zn,{})}),s.jsx("div",{className:"col-span-12",children:s.jsx(Un,{})}),s.jsx("div",{className:"col-span-12",children:s.jsx(mo,{})}),s.jsx("div",{className:"col-span-12",children:s.jsx(lo,{})})]})]})};export{ar as default};
