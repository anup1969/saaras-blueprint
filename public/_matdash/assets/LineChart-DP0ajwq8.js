import{R as y,a1 as ir,r as rr,j as r}from"./index-Ct0UOXmm.js";import{C as D}from"./card-Ca2rFNYr.js";import{D as hr,P as vr,Q as Cr,L as Q,f as Y,C as xr,A as gr,a as R,b as tr,h as Lr,d as ar,g as mr,u as jr,G as Ar,e as nr,j as Dr,k as wr,l as w,n as N,o as S}from"./chart-Bauhw1v5.js";import{N as Nr,K as Sr}from"./isPlainObject-DPup3mT9.js";import{X as F,Y as Mr,C as M}from"./YAxis-CUTFHeOj.js";import{c as Tr}from"./createLucideIcon-BhlIJAXk.js";import{B as Pr}from"./BreadcrumbComp-CrB7aHeN.js";import{C as A}from"./CodeDialog-CxWZFxDL.js";import"./tiny-invariant-BaFNuDhB.js";import"./string-B_3o-8jJ.js";import"./toString-DXWrBrvw.js";import"./CardBox-DRaXwASi.js";import"./chevron-right-H7UwKVHv.js";import"./index-CDOj5QJd.js";import"./vsc-dark-plus-BFNuSAyr.js";import"./highlight-CR4RLcvi.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fr=[["path",{d:"M12 3v6",key:"1holv5"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["path",{d:"M12 15v6",key:"a9ows0"}]],Or=Tr("git-commit-vertical",Fr);var Kr=["type","layout","connectNulls","ref"],_r=["key"];function E(t){"@babel/helpers - typeof";return E=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(o){return typeof o}:function(o){return o&&typeof Symbol=="function"&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},E(t)}function sr(t,o){if(t==null)return{};var a=$r(t,o),e,i;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(i=0;i<s.length;i++)e=s[i],!(o.indexOf(e)>=0)&&Object.prototype.propertyIsEnumerable.call(t,e)&&(a[e]=t[e])}return a}function $r(t,o){if(t==null)return{};var a={};for(var e in t)if(Object.prototype.hasOwnProperty.call(t,e)){if(o.indexOf(e)>=0)continue;a[e]=t[e]}return a}function V(){return V=Object.assign?Object.assign.bind():function(t){for(var o=1;o<arguments.length;o++){var a=arguments[o];for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&(t[e]=a[e])}return t},V.apply(this,arguments)}function lr(t,o){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);o&&(e=e.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),a.push.apply(a,e)}return a}function C(t){for(var o=1;o<arguments.length;o++){var a=arguments[o]!=null?arguments[o]:{};o%2?lr(Object(a),!0).forEach(function(e){g(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):lr(Object(a)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}function $(t){return Jr(t)||Gr(t)||Wr(t)||Er()}function Er(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Wr(t,o){if(t){if(typeof t=="string")return er(t,o);var a=Object.prototype.toString.call(t).slice(8,-1);if(a==="Object"&&t.constructor&&(a=t.constructor.name),a==="Map"||a==="Set")return Array.from(t);if(a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return er(t,o)}}function Gr(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Jr(t){if(Array.isArray(t))return er(t)}function er(t,o){(o==null||o>t.length)&&(o=t.length);for(var a=0,e=new Array(o);a<o;a++)e[a]=t[a];return e}function Ir(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}function cr(t,o){for(var a=0;a<o.length;a++){var e=o[a];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,ur(e.key),e)}}function Xr(t,o,a){return o&&cr(t.prototype,o),a&&cr(t,a),Object.defineProperty(t,"prototype",{writable:!1}),t}function Br(t,o,a){return o=q(o),Rr(t,fr()?Reflect.construct(o,a||[],q(t).constructor):o.apply(t,a))}function Rr(t,o){if(o&&(E(o)==="object"||typeof o=="function"))return o;if(o!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return Vr(t)}function Vr(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function fr(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(fr=function(){return!!t})()}function q(t){return q=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(a){return a.__proto__||Object.getPrototypeOf(a)},q(t)}function zr(t,o){if(typeof o!="function"&&o!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(o&&o.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),o&&or(t,o)}function or(t,o){return or=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,i){return e.__proto__=i,e},or(t,o)}function g(t,o,a){return o=ur(o),o in t?Object.defineProperty(t,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[o]=a,t}function ur(t){var o=Ur(t,"string");return E(o)=="symbol"?o:o+""}function Ur(t,o){if(E(t)!="object"||!t)return t;var a=t[Symbol.toPrimitive];if(a!==void 0){var e=a.call(t,o);if(E(e)!="object")return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}var k=function(t){function o(){var a;Ir(this,o);for(var e=arguments.length,i=new Array(e),s=0;s<e;s++)i[s]=arguments[s];return a=Br(this,o,[].concat(i)),g(a,"state",{isAnimationFinished:!0,totalLength:0}),g(a,"generateSimpleStrokeDasharray",function(n,l){return"".concat(l,"px ").concat(n-l,"px")}),g(a,"getStrokeDasharray",function(n,l,c){var p=c.reduce(function(L,P){return L+P});if(!p)return a.generateSimpleStrokeDasharray(l,n);for(var m=Math.floor(n/p),f=n%p,h=l-n,u=[],d=0,b=0;d<c.length;b+=c[d],++d)if(b+c[d]>f){u=[].concat($(c.slice(0,d)),[f-b]);break}var x=u.length%2===0?[0,h]:[h];return[].concat($(o.repeat(c,m)),$(u),x).map(function(L){return"".concat(L,"px")}).join(", ")}),g(a,"id",jr("recharts-line-")),g(a,"pathRef",function(n){a.mainCurve=n}),g(a,"handleAnimationEnd",function(){a.setState({isAnimationFinished:!0}),a.props.onAnimationEnd&&a.props.onAnimationEnd()}),g(a,"handleAnimationStart",function(){a.setState({isAnimationFinished:!1}),a.props.onAnimationStart&&a.props.onAnimationStart()}),a}return zr(o,t),Xr(o,[{key:"componentDidMount",value:function(){if(this.props.isAnimationActive){var e=this.getTotalLength();this.setState({totalLength:e})}}},{key:"componentDidUpdate",value:function(){if(this.props.isAnimationActive){var e=this.getTotalLength();e!==this.state.totalLength&&this.setState({totalLength:e})}}},{key:"getTotalLength",value:function(){var e=this.mainCurve;try{return e&&e.getTotalLength&&e.getTotalLength()||0}catch{return 0}}},{key:"renderErrorBar",value:function(e,i){if(this.props.isAnimationActive&&!this.state.isAnimationFinished)return null;var s=this.props,n=s.points,l=s.xAxis,c=s.yAxis,p=s.layout,m=s.children,f=vr(m,Cr);if(!f)return null;var h=function(b,x){return{x:b.x,y:b.y,value:b.value,errorVal:mr(b.payload,x)}},u={clipPath:e?"url(#clipPath-".concat(i,")"):null};return y.createElement(Q,u,f.map(function(d){return y.cloneElement(d,{key:"bar-".concat(d.props.dataKey),data:n,xAxis:l,yAxis:c,layout:p,dataPointFormatter:h})}))}},{key:"renderDots",value:function(e,i,s){var n=this.props.isAnimationActive;if(n&&!this.state.isAnimationFinished)return null;var l=this.props,c=l.dot,p=l.points,m=l.dataKey,f=Y(this.props,!1),h=Y(c,!0),u=p.map(function(b,x){var L=C(C(C({key:"dot-".concat(x),r:3},f),h),{},{index:x,cx:b.x,cy:b.y,value:b.value,dataKey:m,payload:b.payload,points:p});return o.renderDotItem(c,L)}),d={clipPath:e?"url(#clipPath-".concat(i?"":"dots-").concat(s,")"):null};return y.createElement(Q,V({className:"recharts-line-dots",key:"dots"},d),u)}},{key:"renderCurveStatically",value:function(e,i,s,n){var l=this.props,c=l.type,p=l.layout,m=l.connectNulls;l.ref;var f=sr(l,Kr),h=C(C(C({},Y(f,!0)),{},{fill:"none",className:"recharts-line-curve",clipPath:i?"url(#clipPath-".concat(s,")"):null,points:e},n),{},{type:c,layout:p,connectNulls:m});return y.createElement(xr,V({},h,{pathRef:this.pathRef}))}},{key:"renderCurveWithAnimation",value:function(e,i){var s=this,n=this.props,l=n.points,c=n.strokeDasharray,p=n.isAnimationActive,m=n.animationBegin,f=n.animationDuration,h=n.animationEasing,u=n.animationId,d=n.animateNewValues,b=n.width,x=n.height,L=this.state,P=L.prevPoints,W=L.totalLength;return y.createElement(gr,{begin:m,duration:f,isActive:p,easing:h,from:{t:0},to:{t:1},key:"line-".concat(u),onAnimationEnd:this.handleAnimationEnd,onAnimationStart:this.handleAnimationStart},function(K){var j=K.t;if(P){var G=P.length/l.length,O=l.map(function(v,H){var X=Math.floor(H*G);if(P[X]){var B=P[X],_=R(B.x,v.x),br=R(B.y,v.y);return C(C({},v),{},{x:_(j),y:br(j)})}if(d){var kr=R(b*2,v.x),yr=R(x/2,v.y);return C(C({},v),{},{x:kr(j),y:yr(j)})}return C(C({},v),{},{x:v.x,y:v.y})});return s.renderCurveStatically(O,e,i)}var z=R(0,W),J=z(j),I;if(c){var U="".concat(c).split(/[,\s]+/gim).map(function(v){return parseFloat(v)});I=s.getStrokeDasharray(J,W,U)}else I=s.generateSimpleStrokeDasharray(W,J);return s.renderCurveStatically(l,e,i,{strokeDasharray:I})})}},{key:"renderCurve",value:function(e,i){var s=this.props,n=s.points,l=s.isAnimationActive,c=this.state,p=c.prevPoints,m=c.totalLength;return l&&n&&n.length&&(!p&&m>0||!Sr(p,n))?this.renderCurveWithAnimation(e,i):this.renderCurveStatically(n,e,i)}},{key:"render",value:function(){var e,i=this.props,s=i.hide,n=i.dot,l=i.points,c=i.className,p=i.xAxis,m=i.yAxis,f=i.top,h=i.left,u=i.width,d=i.height,b=i.isAnimationActive,x=i.id;if(s||!l||!l.length)return null;var L=this.state.isAnimationFinished,P=l.length===1,W=ir("recharts-line",c),K=p&&p.allowDataOverflow,j=m&&m.allowDataOverflow,G=K||j,O=tr(x)?this.id:x,z=(e=Y(n,!1))!==null&&e!==void 0?e:{r:3,strokeWidth:2},J=z.r,I=J===void 0?3:J,U=z.strokeWidth,v=U===void 0?2:U,H=Lr(n)?n:{},X=H.clipDot,B=X===void 0?!0:X,_=I*2+v;return y.createElement(Q,{className:W},K||j?y.createElement("defs",null,y.createElement("clipPath",{id:"clipPath-".concat(O)},y.createElement("rect",{x:K?h:h-u/2,y:j?f:f-d/2,width:K?u:u*2,height:j?d:d*2})),!B&&y.createElement("clipPath",{id:"clipPath-dots-".concat(O)},y.createElement("rect",{x:h-_/2,y:f-_/2,width:u+_,height:d+_}))):null,!P&&this.renderCurve(G,O),this.renderErrorBar(G,O),(P||n)&&this.renderDots(G,B,O),(!b||L)&&ar.renderCallByParent(this.props,l))}}],[{key:"getDerivedStateFromProps",value:function(e,i){return e.animationId!==i.prevAnimationId?{prevAnimationId:e.animationId,curPoints:e.points,prevPoints:i.curPoints}:e.points!==i.curPoints?{curPoints:e.points}:null}},{key:"repeat",value:function(e,i){for(var s=e.length%2!==0?[].concat($(e),[0]):e,n=[],l=0;l<i;++l)n=[].concat($(n),$(s));return n}},{key:"renderDotItem",value:function(e,i){var s;if(y.isValidElement(e))s=y.cloneElement(e,i);else if(Nr(e))s=e(i);else{var n=i.key,l=sr(i,_r),c=ir("recharts-line-dot",typeof e!="boolean"?e.className:"");s=y.createElement(hr,V({key:n},l,{className:c}))}return s}}])}(rr.PureComponent);g(k,"displayName","Line");g(k,"defaultProps",{xAxisId:0,yAxisId:0,connectNulls:!1,activeDot:!0,dot:!0,legendType:"line",stroke:"#3182bd",strokeWidth:1,fill:"#fff",points:[],isAnimationActive:!Ar.isSsr,animateNewValues:!0,animationBegin:0,animationDuration:1500,animationEasing:"ease",hide:!1,label:!1});g(k,"getComposedData",function(t){var o=t.props,a=t.xAxis,e=t.yAxis,i=t.xAxisTicks,s=t.yAxisTicks,n=t.dataKey,l=t.bandSize,c=t.displayedData,p=t.offset,m=o.layout,f=c.map(function(h,u){var d=mr(h,n);return m==="horizontal"?{x:nr({axis:a,ticks:i,bandSize:l,entry:h,index:u}),y:tr(d)?null:e.scale(d),value:d,payload:h}:{x:tr(d)?null:a.scale(d),y:nr({axis:e,ticks:s,bandSize:l,entry:h,index:u}),value:d,payload:h}});return C({points:f,layout:m},p)});var T=Dr({chartName:"LineChart",GraphicalChild:k,axisComponents:[{axisType:"xAxis",AxisComp:F},{axisType:"yAxis",AxisComp:Mr}],formatAxisMap:wr});const Yr=[{month:"January",desktop:186,mobile:80},{month:"February",desktop:305,mobile:200},{month:"March",desktop:237,mobile:120},{month:"April",desktop:73,mobile:190},{month:"May",desktop:209,mobile:130},{month:"June",desktop:214,mobile:140}],qr={desktop:{label:"Desktop"},mobile:{label:"Mobile"}};function Hr(){return r.jsx(r.Fragment,{children:r.jsx(w,{config:qr,children:r.jsxs(T,{accessibilityLayer:!0,data:Yr,margin:{left:12,right:12},children:[r.jsx(M,{vertical:!1}),r.jsx(F,{dataKey:"month",tickLine:!1,axisLine:!1,tickMargin:8,tickFormatter:t=>t.slice(0,3)}),r.jsx(N,{cursor:!1,content:r.jsx(S,{hideLabel:!0})}),r.jsx(k,{dataKey:"desktop",type:"natural",stroke:"var(--color-primary)",strokeWidth:2,dot:({cx:t,cy:o,payload:a})=>r.jsx(Or,{x:t-24/2,y:o-24/2,width:24,height:24,fill:"var(--color-primary)",stroke:"var(--color-secondary)"},a.month)})]})})})}const Qr=()=>r.jsx(D,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Custom Dots"}),r.jsx(Hr,{})]})})}),Zr=[{browser:"chrome",visitors:275,fill:"var(--color-primary)"},{browser:"safari",visitors:200,fill:"var(--color-secondary)"},{browser:"firefox",visitors:187,fill:"var(--color-warning)"},{browser:"edge",visitors:173,fill:"var(--color-error)"},{browser:"other",visitors:90,fill:"var(--color-info)"}],dr={visitors:{label:"Visitors",color:"var(--chart-2)"},chrome:{label:"Chrome",color:"var(--chart-1)"},safari:{label:"Safari",color:"var(--chart-2)"},firefox:{label:"Firefox",color:"var(--chart-3)"},edge:{label:"Edge",color:"var(--chart-4)"},other:{label:"Other",color:"var(--chart-5)"}};function rt(){return r.jsx(r.Fragment,{children:r.jsx(w,{config:dr,children:r.jsxs(T,{accessibilityLayer:!0,data:Zr,margin:{top:24,left:24,right:24},children:[r.jsx(M,{vertical:!1}),r.jsx(N,{cursor:!1,content:r.jsx(S,{indicator:"line",nameKey:"visitors",hideLabel:!0})}),r.jsx(k,{dataKey:"visitors",type:"natural",stroke:"var(--color-secondary)",strokeWidth:2,dot:{fill:"var(--color-secondary)"},activeDot:{r:6},children:r.jsx(ar,{position:"top",offset:12,className:"fill-foreground",fontSize:12,dataKey:"browser",formatter:t=>{var o;return(o=dr[t])==null?void 0:o.label}})})]})})})}const tt=()=>r.jsx(D,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Custom Label"}),r.jsx(rt,{})]})})}),et=[{month:"January",desktop:186},{month:"February",desktop:305},{month:"March",desktop:237},{month:"April",desktop:73},{month:"May",desktop:209},{month:"June",desktop:214}],ot={desktop:{label:"Desktop"}};function at(){return r.jsx(r.Fragment,{children:r.jsx(w,{config:ot,children:r.jsxs(T,{accessibilityLayer:!0,data:et,margin:{left:12,right:12},children:[r.jsx(M,{vertical:!1}),r.jsx(F,{dataKey:"month",tickLine:!1,axisLine:!1,tickMargin:8,tickFormatter:t=>t.slice(0,3)}),r.jsx(N,{cursor:!1,content:r.jsx(S,{hideLabel:!0})}),r.jsx(k,{dataKey:"desktop",type:"natural",stroke:"var(--color-primary)",strokeWidth:2,dot:!1})]})})})}const it=()=>r.jsx(D,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Default"}),r.jsx(at,{})]})})}),nt=[{month:"January",desktop:186,mobile:80},{month:"February",desktop:305,mobile:200},{month:"March",desktop:237,mobile:120},{month:"April",desktop:73,mobile:190},{month:"May",desktop:209,mobile:130},{month:"June",desktop:214,mobile:140}],st={desktop:{label:"Desktop"},mobile:{label:"Mobile"}};function lt(){return r.jsx(r.Fragment,{children:r.jsx(w,{config:st,children:r.jsxs(T,{accessibilityLayer:!0,data:nt,margin:{left:12,right:12},children:[r.jsx(M,{vertical:!1}),r.jsx(F,{dataKey:"month",tickLine:!1,axisLine:!1,tickMargin:8,tickFormatter:t=>t.slice(0,3)}),r.jsx(N,{cursor:!1,content:r.jsx(S,{hideLabel:!0})}),r.jsx(k,{dataKey:"desktop",type:"natural",stroke:"var(--color-primary)",strokeWidth:2,dot:{fill:"var(--color-primary)"},activeDot:{r:6}})]})})})}const ct=()=>r.jsx(D,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Dots"}),r.jsx(lt,{})]})})}),dt=[{browser:"chrome",visitors:275,fill:"var(--color-primary)"},{browser:"safari",visitors:200,fill:"var(--color-secondary)"},{browser:"firefox",visitors:187,fill:"var(--color-warning)"},{browser:"edge",visitors:173,fill:"var(--color-error)"},{browser:"other",visitors:90,fill:"var(--color-info)"}],pt={visitors:{label:"Visitors",color:"var(--chart-2)"},chrome:{label:"Chrome",color:"var(--chart-1)"},safari:{label:"Safari",color:"var(--chart-2)"},firefox:{label:"Firefox",color:"var(--chart-3)"},edge:{label:"Edge",color:"var(--chart-4)"},other:{label:"Other",color:"var(--chart-5)"}};function ht(){return r.jsx(r.Fragment,{children:r.jsx(w,{config:pt,children:r.jsxs(T,{accessibilityLayer:!0,data:dt,margin:{top:24,left:24,right:24},children:[r.jsx(M,{vertical:!1}),r.jsx(N,{cursor:!1,content:r.jsx(S,{indicator:"line",nameKey:"visitors",hideLabel:!0})}),r.jsx(k,{dataKey:"visitors",type:"natural",stroke:"var(--color-primary)",strokeWidth:2,dot:({payload:t,...o})=>r.jsx(hr,{r:5,cx:o.cx,cy:o.cy,fill:t.fill,stroke:t.fill},t.browser)})]})})})}const mt=()=>r.jsx(D,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Dots Colors"}),r.jsx(ht,{})]})})}),Z=[{date:"2024-04-01",desktop:222,mobile:150},{date:"2024-04-02",desktop:97,mobile:180},{date:"2024-04-03",desktop:167,mobile:120},{date:"2024-04-04",desktop:242,mobile:260},{date:"2024-04-05",desktop:373,mobile:290},{date:"2024-04-06",desktop:301,mobile:340},{date:"2024-04-07",desktop:245,mobile:180},{date:"2024-04-08",desktop:409,mobile:320},{date:"2024-04-09",desktop:59,mobile:110},{date:"2024-04-10",desktop:261,mobile:190},{date:"2024-04-11",desktop:327,mobile:350},{date:"2024-04-12",desktop:292,mobile:210},{date:"2024-04-13",desktop:342,mobile:380},{date:"2024-04-14",desktop:137,mobile:220},{date:"2024-04-15",desktop:120,mobile:170},{date:"2024-04-16",desktop:138,mobile:190},{date:"2024-04-17",desktop:446,mobile:360},{date:"2024-04-18",desktop:364,mobile:410},{date:"2024-04-19",desktop:243,mobile:180},{date:"2024-04-20",desktop:89,mobile:150},{date:"2024-04-21",desktop:137,mobile:200},{date:"2024-04-22",desktop:224,mobile:170},{date:"2024-04-23",desktop:138,mobile:230},{date:"2024-04-24",desktop:387,mobile:290},{date:"2024-04-25",desktop:215,mobile:250},{date:"2024-04-26",desktop:75,mobile:130},{date:"2024-04-27",desktop:383,mobile:420},{date:"2024-04-28",desktop:122,mobile:180},{date:"2024-04-29",desktop:315,mobile:240},{date:"2024-04-30",desktop:454,mobile:380},{date:"2024-05-01",desktop:165,mobile:220},{date:"2024-05-02",desktop:293,mobile:310},{date:"2024-05-03",desktop:247,mobile:190},{date:"2024-05-04",desktop:385,mobile:420},{date:"2024-05-05",desktop:481,mobile:390},{date:"2024-05-06",desktop:498,mobile:520},{date:"2024-05-07",desktop:388,mobile:300},{date:"2024-05-08",desktop:149,mobile:210},{date:"2024-05-09",desktop:227,mobile:180},{date:"2024-05-10",desktop:293,mobile:330},{date:"2024-05-11",desktop:335,mobile:270},{date:"2024-05-12",desktop:197,mobile:240},{date:"2024-05-13",desktop:197,mobile:160},{date:"2024-05-14",desktop:448,mobile:490},{date:"2024-05-15",desktop:473,mobile:380},{date:"2024-05-16",desktop:338,mobile:400},{date:"2024-05-17",desktop:499,mobile:420},{date:"2024-05-18",desktop:315,mobile:350},{date:"2024-05-19",desktop:235,mobile:180},{date:"2024-05-20",desktop:177,mobile:230},{date:"2024-05-21",desktop:82,mobile:140},{date:"2024-05-22",desktop:81,mobile:120},{date:"2024-05-23",desktop:252,mobile:290},{date:"2024-05-24",desktop:294,mobile:220},{date:"2024-05-25",desktop:201,mobile:250},{date:"2024-05-26",desktop:213,mobile:170},{date:"2024-05-27",desktop:420,mobile:460},{date:"2024-05-28",desktop:233,mobile:190},{date:"2024-05-29",desktop:78,mobile:130},{date:"2024-05-30",desktop:340,mobile:280},{date:"2024-05-31",desktop:178,mobile:230},{date:"2024-06-01",desktop:178,mobile:200},{date:"2024-06-02",desktop:470,mobile:410},{date:"2024-06-03",desktop:103,mobile:160},{date:"2024-06-04",desktop:439,mobile:380},{date:"2024-06-05",desktop:88,mobile:140},{date:"2024-06-06",desktop:294,mobile:250},{date:"2024-06-07",desktop:323,mobile:370},{date:"2024-06-08",desktop:385,mobile:320},{date:"2024-06-09",desktop:438,mobile:480},{date:"2024-06-10",desktop:155,mobile:200},{date:"2024-06-11",desktop:92,mobile:150},{date:"2024-06-12",desktop:492,mobile:420},{date:"2024-06-13",desktop:81,mobile:130},{date:"2024-06-14",desktop:426,mobile:380},{date:"2024-06-15",desktop:307,mobile:350},{date:"2024-06-16",desktop:371,mobile:310},{date:"2024-06-17",desktop:475,mobile:520},{date:"2024-06-18",desktop:107,mobile:170},{date:"2024-06-19",desktop:341,mobile:290},{date:"2024-06-20",desktop:408,mobile:450},{date:"2024-06-21",desktop:169,mobile:210},{date:"2024-06-22",desktop:317,mobile:270},{date:"2024-06-23",desktop:480,mobile:530},{date:"2024-06-24",desktop:132,mobile:180},{date:"2024-06-25",desktop:141,mobile:190},{date:"2024-06-26",desktop:434,mobile:380},{date:"2024-06-27",desktop:448,mobile:490},{date:"2024-06-28",desktop:149,mobile:200},{date:"2024-06-29",desktop:103,mobile:160},{date:"2024-06-30",desktop:446,mobile:400}],pr={views:{label:"Page Views"},desktop:{label:"Desktop",color:"var(--color-primary)"},mobile:{label:"Mobile",color:"var(--color-secondary)"}};function ft(){const[t,o]=rr.useState("desktop"),a=rr.useMemo(()=>({desktop:Z.reduce((e,i)=>e+i.desktop,0),mobile:Z.reduce((e,i)=>e+i.mobile,0)}),[]);return r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"flex border border-ld rounded-md",children:["desktop","mobile"].map(e=>{const i=e;return r.jsxs("button",{"data-active":t===i,className:"data-[active=true]:bg-lightprimary dark:data-[active=true]:bg-darkprimary relative z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left sm:px-8 sm:py-6",onClick:()=>o(i),children:[r.jsx("span",{className:"text-muted-foreground text-xs",children:pr[i].label}),r.jsx("span",{className:"text-lg text-ld leading-none font-bold sm:text-3xl",children:a[e].toLocaleString()})]},i)})}),r.jsx(w,{config:pr,children:r.jsxs(T,{accessibilityLayer:!0,data:Z,margin:{left:12,right:12},children:[r.jsx(M,{vertical:!1}),r.jsx(F,{dataKey:"date",tickLine:!1,axisLine:!1,tickMargin:8,minTickGap:32,tickFormatter:e=>new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"})}),r.jsx(N,{content:r.jsx(S,{className:"w-[150px]",nameKey:"views",labelFormatter:e=>new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})})}),r.jsx(k,{dataKey:t,type:"monotone",stroke:`var(--color-${t})`,strokeWidth:2,dot:!1})]})})]})}const ut=()=>r.jsx(D,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Interactive"}),r.jsx(ft,{})]})})}),bt=[{month:"January",desktop:186,mobile:80},{month:"February",desktop:305,mobile:200},{month:"March",desktop:237,mobile:120},{month:"April",desktop:73,mobile:190},{month:"May",desktop:209,mobile:130},{month:"June",desktop:214,mobile:140}],kt={desktop:{label:"Desktop",color:"var(--chart-1)"},mobile:{label:"Mobile",color:"var(--chart-2)"}};function yt(){return r.jsx(r.Fragment,{children:r.jsx(w,{config:kt,children:r.jsxs(T,{accessibilityLayer:!0,data:bt,margin:{top:20,left:12,right:12},children:[r.jsx(M,{vertical:!1}),r.jsx(F,{dataKey:"month",tickLine:!1,axisLine:!1,tickMargin:8,tickFormatter:t=>t.slice(0,3)}),r.jsx(N,{cursor:!1,content:r.jsx(S,{indicator:"line"})}),r.jsx(k,{dataKey:"desktop",type:"natural",stroke:"var(--color-primary)",strokeWidth:2,dot:{fill:"var(--color-primary)"},activeDot:{r:6},children:r.jsx(ar,{position:"top",offset:12,className:"fill-foreground",fontSize:12})})]})})})}const vt=()=>r.jsx(D,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Label"}),r.jsx(yt,{})]})})}),Ct=[{month:"January",desktop:186},{month:"February",desktop:305},{month:"March",desktop:237},{month:"April",desktop:73},{month:"May",desktop:209},{month:"June",desktop:214}],xt={desktop:{label:"Desktop"}};function gt(){return r.jsx(r.Fragment,{children:r.jsx(w,{config:xt,children:r.jsxs(T,{accessibilityLayer:!0,data:Ct,margin:{left:12,right:12},children:[r.jsx(M,{vertical:!1}),r.jsx(F,{dataKey:"month",tickLine:!1,axisLine:!1,tickMargin:8,tickFormatter:t=>t.slice(0,3)}),r.jsx(N,{cursor:!1,content:r.jsx(S,{hideLabel:!0})}),r.jsx(k,{dataKey:"desktop",type:"linear",stroke:"var(--color-secondary)",strokeWidth:2,dot:!1})]})})})}const Lt=()=>r.jsx(D,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Linear"}),r.jsx(gt,{})]})})}),jt=[{month:"January",desktop:186,mobile:80},{month:"February",desktop:305,mobile:200},{month:"March",desktop:237,mobile:120},{month:"April",desktop:73,mobile:190},{month:"May",desktop:209,mobile:130},{month:"June",desktop:214,mobile:140}],At={desktop:{label:"Desktop"},mobile:{label:"Mobile"}};function Dt(){return r.jsx(r.Fragment,{children:r.jsx(w,{config:At,children:r.jsxs(T,{accessibilityLayer:!0,data:jt,margin:{left:12,right:12},children:[r.jsx(M,{vertical:!1}),r.jsx(F,{dataKey:"month",tickLine:!1,axisLine:!1,tickMargin:8,tickFormatter:t=>t.slice(0,3)}),r.jsx(N,{cursor:!1,content:r.jsx(S,{})}),r.jsx(k,{dataKey:"desktop",type:"monotone",stroke:"var(--color-primary)",strokeWidth:2,dot:!1}),r.jsx(k,{dataKey:"mobile",type:"monotone",stroke:"var(--color-secondary)",strokeWidth:2,dot:!1})]})})})}const wt=()=>r.jsx(D,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Multiple"}),r.jsx(Dt,{})]})})}),Nt=[{month:"January",desktop:186},{month:"February",desktop:305},{month:"March",desktop:237},{month:"April",desktop:73},{month:"May",desktop:209},{month:"June",desktop:214}],St={desktop:{label:"Desktop"}};function Mt(){return r.jsx(r.Fragment,{children:r.jsx(w,{config:St,children:r.jsxs(T,{accessibilityLayer:!0,data:Nt,margin:{left:12,right:12},children:[r.jsx(M,{vertical:!1}),r.jsx(F,{dataKey:"month",tickLine:!1,axisLine:!1,tickMargin:8,tickFormatter:t=>t.slice(0,3)}),r.jsx(N,{cursor:!1,content:r.jsx(S,{hideLabel:!0})}),r.jsx(k,{dataKey:"desktop",type:"step",stroke:"var(--color-primary)",strokeWidth:2,dot:!1})]})})})}const Tt=()=>r.jsx(D,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Step"}),r.jsx(Mt,{})]})})}),Pt=`import { GitCommitVertical } from 'lucide-react';\r
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A line chart with custom dots';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186, mobile: 80 },\r
  { month: 'February', desktop: 305, mobile: 200 },\r
  { month: 'March', desktop: 237, mobile: 120 },\r
  { month: 'April', desktop: 73, mobile: 190 },\r
  { month: 'May', desktop: 209, mobile: 130 },\r
  { month: 'June', desktop: 214, mobile: 140 },\r
];\r
\r
const chartConfig = {\r
  desktop: {\r
    label: 'Desktop',\r
  },\r
  mobile: {\r
    label: 'Mobile',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartLineDotsCustomCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <LineChart\r
          accessibilityLayer\r
          data={chartData}\r
          margin={{\r
            left: 12,\r
            right: 12,\r
          }}\r
        >\r
          <CartesianGrid vertical={false} />\r
          <XAxis\r
            dataKey="month"\r
            tickLine={false}\r
            axisLine={false}\r
            tickMargin={8}\r
            tickFormatter={(value) => value.slice(0, 3)}\r
          />\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <Line\r
            dataKey="desktop"\r
            type="natural"\r
            stroke="var(--color-primary)"\r
            strokeWidth={2}\r
            dot={({ cx, cy, payload }) => {\r
              const r = 24;\r
              return (\r
                <GitCommitVertical\r
                  key={payload.month}\r
                  x={cx - r / 2}\r
                  y={cy - r / 2}\r
                  width={r}\r
                  height={r}\r
                  fill="var(--color-primary)"\r
                  stroke="var(--color-secondary)"\r
                />\r
              );\r
            }}\r
          />\r
        </LineChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Ft=`import { CartesianGrid, LabelList, Line, LineChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A line chart with a custom label';\r
\r
const chartData = [\r
  { browser: 'chrome', visitors: 275, fill: 'var(--color-primary)' },\r
  { browser: 'safari', visitors: 200, fill: 'var(--color-secondary)' },\r
  { browser: 'firefox', visitors: 187, fill: 'var(--color-warning)' },\r
  { browser: 'edge', visitors: 173, fill: 'var(--color-error)' },\r
  { browser: 'other', visitors: 90, fill: 'var(--color-info)' },\r
];\r
\r
const chartConfig = {\r
  visitors: {\r
    label: 'Visitors',\r
    color: 'var(--chart-2)',\r
  },\r
  chrome: {\r
    label: 'Chrome',\r
    color: 'var(--chart-1)',\r
  },\r
  safari: {\r
    label: 'Safari',\r
    color: 'var(--chart-2)',\r
  },\r
  firefox: {\r
    label: 'Firefox',\r
    color: 'var(--chart-3)',\r
  },\r
  edge: {\r
    label: 'Edge',\r
    color: 'var(--chart-4)',\r
  },\r
  other: {\r
    label: 'Other',\r
    color: 'var(--chart-5)',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartLineLabelCustomCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <LineChart\r
          accessibilityLayer\r
          data={chartData}\r
          margin={{\r
            top: 24,\r
            left: 24,\r
            right: 24,\r
          }}\r
        >\r
          <CartesianGrid vertical={false} />\r
          <ChartTooltip\r
            cursor={false}\r
            content={<ChartTooltipContent indicator="line" nameKey="visitors" hideLabel />}\r
          />\r
          <Line\r
            dataKey="visitors"\r
            type="natural"\r
            stroke="var(--color-secondary)"\r
            strokeWidth={2}\r
            dot={{\r
              fill: 'var(--color-secondary)',\r
            }}\r
            activeDot={{\r
              r: 6,\r
            }}\r
          >\r
            <LabelList\r
              position="top"\r
              offset={12}\r
              className="fill-foreground"\r
              fontSize={12}\r
              dataKey="browser"\r
              formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}\r
            />\r
          </Line>\r
        </LineChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Ot=`import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A line chart';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186 },\r
  { month: 'February', desktop: 305 },\r
  { month: 'March', desktop: 237 },\r
  { month: 'April', desktop: 73 },\r
  { month: 'May', desktop: 209 },\r
  { month: 'June', desktop: 214 },\r
];\r
\r
const chartConfig = {\r
  desktop: {\r
    label: 'Desktop',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartLineDefaultCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <LineChart\r
          accessibilityLayer\r
          data={chartData}\r
          margin={{\r
            left: 12,\r
            right: 12,\r
          }}\r
        >\r
          <CartesianGrid vertical={false} />\r
          <XAxis\r
            dataKey="month"\r
            tickLine={false}\r
            axisLine={false}\r
            tickMargin={8}\r
            tickFormatter={(value) => value.slice(0, 3)}\r
          />\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <Line\r
            dataKey="desktop"\r
            type="natural"\r
            stroke="var(--color-primary)"\r
            strokeWidth={2}\r
            dot={false}\r
          />\r
        </LineChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Kt=`import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A line chart with dots';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186, mobile: 80 },\r
  { month: 'February', desktop: 305, mobile: 200 },\r
  { month: 'March', desktop: 237, mobile: 120 },\r
  { month: 'April', desktop: 73, mobile: 190 },\r
  { month: 'May', desktop: 209, mobile: 130 },\r
  { month: 'June', desktop: 214, mobile: 140 },\r
];\r
\r
const chartConfig = {\r
  desktop: {\r
    label: 'Desktop',\r
  },\r
  mobile: {\r
    label: 'Mobile',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartLineDotsCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <LineChart\r
          accessibilityLayer\r
          data={chartData}\r
          margin={{\r
            left: 12,\r
            right: 12,\r
          }}\r
        >\r
          <CartesianGrid vertical={false} />\r
          <XAxis\r
            dataKey="month"\r
            tickLine={false}\r
            axisLine={false}\r
            tickMargin={8}\r
            tickFormatter={(value) => value.slice(0, 3)}\r
          />\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <Line\r
            dataKey="desktop"\r
            type="natural"\r
            stroke="var(--color-primary)"\r
            strokeWidth={2}\r
            dot={{\r
              fill: 'var(--color-primary)',\r
            }}\r
            activeDot={{\r
              r: 6,\r
            }}\r
          />\r
        </LineChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,_t=`import { CartesianGrid, Dot, Line, LineChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A line chart with dots and colors';\r
\r
const chartData = [\r
  { browser: 'chrome', visitors: 275, fill: 'var(--color-primary)' },\r
  { browser: 'safari', visitors: 200, fill: 'var(--color-secondary)' },\r
  { browser: 'firefox', visitors: 187, fill: 'var(--color-warning)' },\r
  { browser: 'edge', visitors: 173, fill: 'var(--color-error)' },\r
  { browser: 'other', visitors: 90, fill: 'var(--color-info)' },\r
];\r
\r
const chartConfig = {\r
  visitors: {\r
    label: 'Visitors',\r
    color: 'var(--chart-2)',\r
  },\r
  chrome: {\r
    label: 'Chrome',\r
    color: 'var(--chart-1)',\r
  },\r
  safari: {\r
    label: 'Safari',\r
    color: 'var(--chart-2)',\r
  },\r
  firefox: {\r
    label: 'Firefox',\r
    color: 'var(--chart-3)',\r
  },\r
  edge: {\r
    label: 'Edge',\r
    color: 'var(--chart-4)',\r
  },\r
  other: {\r
    label: 'Other',\r
    color: 'var(--chart-5)',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartLineDotsColorsCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <LineChart\r
          accessibilityLayer\r
          data={chartData}\r
          margin={{\r
            top: 24,\r
            left: 24,\r
            right: 24,\r
          }}\r
        >\r
          <CartesianGrid vertical={false} />\r
          <ChartTooltip\r
            cursor={false}\r
            content={<ChartTooltipContent indicator="line" nameKey="visitors" hideLabel />}\r
          />\r
          <Line\r
            dataKey="visitors"\r
            type="natural"\r
            stroke="var(--color-primary)"\r
            strokeWidth={2}\r
            dot={({ payload, ...props }) => {\r
              return (\r
                <Dot\r
                  key={payload.browser}\r
                  r={5}\r
                  cx={props.cx}\r
                  cy={props.cy}\r
                  fill={payload.fill}\r
                  stroke={payload.fill}\r
                />\r
              );\r
            }}\r
          />\r
        </LineChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,$t=`import * as React from 'react';\r
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';\r
\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'An interactive line chart';\r
\r
const chartData = [\r
  { date: '2024-04-01', desktop: 222, mobile: 150 },\r
  { date: '2024-04-02', desktop: 97, mobile: 180 },\r
  { date: '2024-04-03', desktop: 167, mobile: 120 },\r
  { date: '2024-04-04', desktop: 242, mobile: 260 },\r
  { date: '2024-04-05', desktop: 373, mobile: 290 },\r
  { date: '2024-04-06', desktop: 301, mobile: 340 },\r
  { date: '2024-04-07', desktop: 245, mobile: 180 },\r
  { date: '2024-04-08', desktop: 409, mobile: 320 },\r
  { date: '2024-04-09', desktop: 59, mobile: 110 },\r
  { date: '2024-04-10', desktop: 261, mobile: 190 },\r
  { date: '2024-04-11', desktop: 327, mobile: 350 },\r
  { date: '2024-04-12', desktop: 292, mobile: 210 },\r
  { date: '2024-04-13', desktop: 342, mobile: 380 },\r
  { date: '2024-04-14', desktop: 137, mobile: 220 },\r
  { date: '2024-04-15', desktop: 120, mobile: 170 },\r
  { date: '2024-04-16', desktop: 138, mobile: 190 },\r
  { date: '2024-04-17', desktop: 446, mobile: 360 },\r
  { date: '2024-04-18', desktop: 364, mobile: 410 },\r
  { date: '2024-04-19', desktop: 243, mobile: 180 },\r
  { date: '2024-04-20', desktop: 89, mobile: 150 },\r
  { date: '2024-04-21', desktop: 137, mobile: 200 },\r
  { date: '2024-04-22', desktop: 224, mobile: 170 },\r
  { date: '2024-04-23', desktop: 138, mobile: 230 },\r
  { date: '2024-04-24', desktop: 387, mobile: 290 },\r
  { date: '2024-04-25', desktop: 215, mobile: 250 },\r
  { date: '2024-04-26', desktop: 75, mobile: 130 },\r
  { date: '2024-04-27', desktop: 383, mobile: 420 },\r
  { date: '2024-04-28', desktop: 122, mobile: 180 },\r
  { date: '2024-04-29', desktop: 315, mobile: 240 },\r
  { date: '2024-04-30', desktop: 454, mobile: 380 },\r
  { date: '2024-05-01', desktop: 165, mobile: 220 },\r
  { date: '2024-05-02', desktop: 293, mobile: 310 },\r
  { date: '2024-05-03', desktop: 247, mobile: 190 },\r
  { date: '2024-05-04', desktop: 385, mobile: 420 },\r
  { date: '2024-05-05', desktop: 481, mobile: 390 },\r
  { date: '2024-05-06', desktop: 498, mobile: 520 },\r
  { date: '2024-05-07', desktop: 388, mobile: 300 },\r
  { date: '2024-05-08', desktop: 149, mobile: 210 },\r
  { date: '2024-05-09', desktop: 227, mobile: 180 },\r
  { date: '2024-05-10', desktop: 293, mobile: 330 },\r
  { date: '2024-05-11', desktop: 335, mobile: 270 },\r
  { date: '2024-05-12', desktop: 197, mobile: 240 },\r
  { date: '2024-05-13', desktop: 197, mobile: 160 },\r
  { date: '2024-05-14', desktop: 448, mobile: 490 },\r
  { date: '2024-05-15', desktop: 473, mobile: 380 },\r
  { date: '2024-05-16', desktop: 338, mobile: 400 },\r
  { date: '2024-05-17', desktop: 499, mobile: 420 },\r
  { date: '2024-05-18', desktop: 315, mobile: 350 },\r
  { date: '2024-05-19', desktop: 235, mobile: 180 },\r
  { date: '2024-05-20', desktop: 177, mobile: 230 },\r
  { date: '2024-05-21', desktop: 82, mobile: 140 },\r
  { date: '2024-05-22', desktop: 81, mobile: 120 },\r
  { date: '2024-05-23', desktop: 252, mobile: 290 },\r
  { date: '2024-05-24', desktop: 294, mobile: 220 },\r
  { date: '2024-05-25', desktop: 201, mobile: 250 },\r
  { date: '2024-05-26', desktop: 213, mobile: 170 },\r
  { date: '2024-05-27', desktop: 420, mobile: 460 },\r
  { date: '2024-05-28', desktop: 233, mobile: 190 },\r
  { date: '2024-05-29', desktop: 78, mobile: 130 },\r
  { date: '2024-05-30', desktop: 340, mobile: 280 },\r
  { date: '2024-05-31', desktop: 178, mobile: 230 },\r
  { date: '2024-06-01', desktop: 178, mobile: 200 },\r
  { date: '2024-06-02', desktop: 470, mobile: 410 },\r
  { date: '2024-06-03', desktop: 103, mobile: 160 },\r
  { date: '2024-06-04', desktop: 439, mobile: 380 },\r
  { date: '2024-06-05', desktop: 88, mobile: 140 },\r
  { date: '2024-06-06', desktop: 294, mobile: 250 },\r
  { date: '2024-06-07', desktop: 323, mobile: 370 },\r
  { date: '2024-06-08', desktop: 385, mobile: 320 },\r
  { date: '2024-06-09', desktop: 438, mobile: 480 },\r
  { date: '2024-06-10', desktop: 155, mobile: 200 },\r
  { date: '2024-06-11', desktop: 92, mobile: 150 },\r
  { date: '2024-06-12', desktop: 492, mobile: 420 },\r
  { date: '2024-06-13', desktop: 81, mobile: 130 },\r
  { date: '2024-06-14', desktop: 426, mobile: 380 },\r
  { date: '2024-06-15', desktop: 307, mobile: 350 },\r
  { date: '2024-06-16', desktop: 371, mobile: 310 },\r
  { date: '2024-06-17', desktop: 475, mobile: 520 },\r
  { date: '2024-06-18', desktop: 107, mobile: 170 },\r
  { date: '2024-06-19', desktop: 341, mobile: 290 },\r
  { date: '2024-06-20', desktop: 408, mobile: 450 },\r
  { date: '2024-06-21', desktop: 169, mobile: 210 },\r
  { date: '2024-06-22', desktop: 317, mobile: 270 },\r
  { date: '2024-06-23', desktop: 480, mobile: 530 },\r
  { date: '2024-06-24', desktop: 132, mobile: 180 },\r
  { date: '2024-06-25', desktop: 141, mobile: 190 },\r
  { date: '2024-06-26', desktop: 434, mobile: 380 },\r
  { date: '2024-06-27', desktop: 448, mobile: 490 },\r
  { date: '2024-06-28', desktop: 149, mobile: 200 },\r
  { date: '2024-06-29', desktop: 103, mobile: 160 },\r
  { date: '2024-06-30', desktop: 446, mobile: 400 },\r
];\r
\r
const chartConfig = {\r
  views: {\r
    label: 'Page Views',\r
  },\r
  desktop: {\r
    label: 'Desktop',\r
    color: 'var(--color-primary)',\r
  },\r
  mobile: {\r
    label: 'Mobile',\r
    color: 'var(--color-secondary)',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartLineInteractiveCode() {\r
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>('desktop');\r
\r
  const total = React.useMemo(\r
    () => ({\r
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),\r
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),\r
    }),\r
    [],\r
  );\r
\r
  return (\r
    <>\r
      {/*  */}\r
      <div className="flex border border-ld rounded-md">\r
        {['desktop', 'mobile'].map((key) => {\r
          const chart = key as keyof typeof chartConfig;\r
          return (\r
            <button\r
              key={chart}\r
              data-active={activeChart === chart}\r
              className="data-[active=true]:bg-lightprimary dark:data-[active=true]:bg-darkprimary relative z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left sm:px-8 sm:py-6"\r
              onClick={() => setActiveChart(chart)}\r
            >\r
              <span className="text-muted-foreground text-xs">{chartConfig[chart].label}</span>\r
              <span className="text-lg text-ld leading-none font-bold sm:text-3xl">\r
                {total[key as keyof typeof total].toLocaleString()}\r
              </span>\r
            </button>\r
          );\r
        })}\r
      </div>\r
      {/*  */}\r
      <ChartContainer config={chartConfig}>\r
        <LineChart\r
          accessibilityLayer\r
          data={chartData}\r
          margin={{\r
            left: 12,\r
            right: 12,\r
          }}\r
        >\r
          <CartesianGrid vertical={false} />\r
          <XAxis\r
            dataKey="date"\r
            tickLine={false}\r
            axisLine={false}\r
            tickMargin={8}\r
            minTickGap={32}\r
            tickFormatter={(value) => {\r
              const date = new Date(value);\r
              return date.toLocaleDateString('en-US', {\r
                month: 'short',\r
                day: 'numeric',\r
              });\r
            }}\r
          />\r
          <ChartTooltip\r
            content={\r
              <ChartTooltipContent\r
                className="w-[150px]"\r
                nameKey="views"\r
                labelFormatter={(value) => {\r
                  return new Date(value).toLocaleDateString('en-US', {\r
                    month: 'short',\r
                    day: 'numeric',\r
                    year: 'numeric',\r
                  });\r
                }}\r
              />\r
            }\r
          />\r
          <Line\r
            dataKey={activeChart}\r
            type="monotone"\r
            stroke={\`var(--color-\${activeChart})\`}\r
            strokeWidth={2}\r
            dot={false}\r
          />\r
        </LineChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Et=`import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A line chart with a label';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186, mobile: 80 },\r
  { month: 'February', desktop: 305, mobile: 200 },\r
  { month: 'March', desktop: 237, mobile: 120 },\r
  { month: 'April', desktop: 73, mobile: 190 },\r
  { month: 'May', desktop: 209, mobile: 130 },\r
  { month: 'June', desktop: 214, mobile: 140 },\r
];\r
\r
const chartConfig = {\r
  desktop: {\r
    label: 'Desktop',\r
    color: 'var(--chart-1)',\r
  },\r
  mobile: {\r
    label: 'Mobile',\r
    color: 'var(--chart-2)',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartLineLabelCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <LineChart\r
          accessibilityLayer\r
          data={chartData}\r
          margin={{\r
            top: 20,\r
            left: 12,\r
            right: 12,\r
          }}\r
        >\r
          <CartesianGrid vertical={false} />\r
          <XAxis\r
            dataKey="month"\r
            tickLine={false}\r
            axisLine={false}\r
            tickMargin={8}\r
            tickFormatter={(value) => value.slice(0, 3)}\r
          />\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />\r
          <Line\r
            dataKey="desktop"\r
            type="natural"\r
            stroke="var(--color-primary)"\r
            strokeWidth={2}\r
            dot={{\r
              fill: 'var(--color-primary)',\r
            }}\r
            activeDot={{\r
              r: 6,\r
            }}\r
          >\r
            <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />\r
          </Line>\r
        </LineChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Wt=`import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A linear line chart';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186 },\r
  { month: 'February', desktop: 305 },\r
  { month: 'March', desktop: 237 },\r
  { month: 'April', desktop: 73 },\r
  { month: 'May', desktop: 209 },\r
  { month: 'June', desktop: 214 },\r
];\r
\r
const chartConfig = {\r
  desktop: {\r
    label: 'Desktop',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartLineLinearCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <LineChart\r
          accessibilityLayer\r
          data={chartData}\r
          margin={{\r
            left: 12,\r
            right: 12,\r
          }}\r
        >\r
          <CartesianGrid vertical={false} />\r
          <XAxis\r
            dataKey="month"\r
            tickLine={false}\r
            axisLine={false}\r
            tickMargin={8}\r
            tickFormatter={(value) => value.slice(0, 3)}\r
          />\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <Line\r
            dataKey="desktop"\r
            type="linear"\r
            stroke="var(--color-secondary)"\r
            strokeWidth={2}\r
            dot={false}\r
          />\r
        </LineChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Gt=`import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A multiple line chart';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186, mobile: 80 },\r
  { month: 'February', desktop: 305, mobile: 200 },\r
  { month: 'March', desktop: 237, mobile: 120 },\r
  { month: 'April', desktop: 73, mobile: 190 },\r
  { month: 'May', desktop: 209, mobile: 130 },\r
  { month: 'June', desktop: 214, mobile: 140 },\r
];\r
\r
const chartConfig = {\r
  desktop: {\r
    label: 'Desktop',\r
  },\r
  mobile: {\r
    label: 'Mobile',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartLineMultipleCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <LineChart\r
          accessibilityLayer\r
          data={chartData}\r
          margin={{\r
            left: 12,\r
            right: 12,\r
          }}\r
        >\r
          <CartesianGrid vertical={false} />\r
          <XAxis\r
            dataKey="month"\r
            tickLine={false}\r
            axisLine={false}\r
            tickMargin={8}\r
            tickFormatter={(value) => value.slice(0, 3)}\r
          />\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />\r
          <Line\r
            dataKey="desktop"\r
            type="monotone"\r
            stroke="var(--color-primary)"\r
            strokeWidth={2}\r
            dot={false}\r
          />\r
          <Line\r
            dataKey="mobile"\r
            type="monotone"\r
            stroke="var(--color-secondary)"\r
            strokeWidth={2}\r
            dot={false}\r
          />\r
        </LineChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Jt=`import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A line chart with step';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186 },\r
  { month: 'February', desktop: 305 },\r
  { month: 'March', desktop: 237 },\r
  { month: 'April', desktop: 73 },\r
  { month: 'May', desktop: 209 },\r
  { month: 'June', desktop: 214 },\r
];\r
\r
const chartConfig = {\r
  desktop: {\r
    label: 'Desktop',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartLineStepCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <LineChart\r
          accessibilityLayer\r
          data={chartData}\r
          margin={{\r
            left: 12,\r
            right: 12,\r
          }}\r
        >\r
          <CartesianGrid vertical={false} />\r
          <XAxis\r
            dataKey="month"\r
            tickLine={false}\r
            axisLine={false}\r
            tickMargin={8}\r
            tickFormatter={(value) => value.slice(0, 3)}\r
          />\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <Line\r
            dataKey="desktop"\r
            type="step"\r
            stroke="var(--color-primary)"\r
            strokeWidth={2}\r
            dot={false}\r
          />\r
        </LineChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,It=[{to:"/",title:"Home"},{href:"",title:"Shadcn Line Chart"}],ce=()=>r.jsxs(r.Fragment,{children:[r.jsx(Pr,{title:"Shadcn Line Chart",items:It}),r.jsxs("div",{className:"grid grid-cols-12 gap-5 sm:gap-7",children:[r.jsxs("div",{className:"col-span-12",children:[r.jsx(it,{}),r.jsx(A,{children:Ot})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(Lt,{}),r.jsx(A,{children:Wt})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(Tt,{}),r.jsx(A,{children:Jt})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(wt,{}),r.jsx(A,{children:Gt})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(ct,{}),r.jsx(A,{children:Kt})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(Qr,{}),r.jsx(A,{children:Pt})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(mt,{}),r.jsx(A,{children:_t})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(vt,{}),r.jsx(A,{children:Et})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(tt,{}),r.jsx(A,{children:Ft})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(ut,{}),r.jsx(A,{children:$t})]})]})]});export{ce as default};
