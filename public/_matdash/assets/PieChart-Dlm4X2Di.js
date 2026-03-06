import{R as g,a1 as er,r as z,j as r}from"./index-B0HXAnM_.js";import{C as P}from"./card-Cg1w-DhQ.js";import{C as jr,T as wr,f as X,S as ar,b as M,L as H,g as _,w as Ar,U as Pr,A as Sr,a as hr,i as V,x as sr,d as br,u as kr,G as Nr,t as Y,P as Dr,O as Rr,V as Lr,W as Z,H as dr,j as Tr,X as Kr,l as S,n as T,o as K,Y as or,Z as Or,p as Ir,q as Er}from"./chart-BosjicjZ.js";import{P as Fr,a as _r}from"./PolarAngleAxis-DRNvyDzV.js";import{N as q,O as Vr,K as $r}from"./isPlainObject-DRRWCWXs.js";import{S as Mr,a as Br,b as Wr,c as Hr,d as qr}from"./select-CQvCC2Bm.js";import{B as Jr}from"./BreadcrumbComp-9UXnI3U7.js";import{C as A}from"./CodeDialog-C1N4vVlG.js";import"./tiny-invariant-BaFNuDhB.js";import"./string-B_3o-8jJ.js";import"./toString-BwYjm5KW.js";import"./index-BdQq_4o_.js";import"./index-ALK4Ilso.js";import"./index-D0BwLNHV.js";import"./chevron-down-BIjzNVJl.js";import"./createLucideIcon-9FnylcZ7.js";import"./check-C6XU-W2K.js";import"./CardBox-DnrW3_OL.js";import"./chevron-right-CYEh_jNb.js";import"./index-BfJfxS1b.js";import"./vsc-dark-plus-C_odMC5h.js";import"./highlight-hCPzqiPq.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";var Q;function B(o){"@babel/helpers - typeof";return B=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},B(o)}function $(){return $=Object.assign?Object.assign.bind():function(o){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var t in i)Object.prototype.hasOwnProperty.call(i,t)&&(o[t]=i[t])}return o},$.apply(this,arguments)}function fr(o,e){var i=Object.keys(o);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(o);e&&(t=t.filter(function(a){return Object.getOwnPropertyDescriptor(o,a).enumerable})),i.push.apply(i,t)}return i}function h(o){for(var e=1;e<arguments.length;e++){var i=arguments[e]!=null?arguments[e]:{};e%2?fr(Object(i),!0).forEach(function(t){j(o,t,i[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(i)):fr(Object(i)).forEach(function(t){Object.defineProperty(o,t,Object.getOwnPropertyDescriptor(i,t))})}return o}function zr(o,e){if(!(o instanceof e))throw new TypeError("Cannot call a class as a function")}function vr(o,e){for(var i=0;i<e.length;i++){var t=e[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(o,Cr(t.key),t)}}function Gr(o,e,i){return e&&vr(o.prototype,e),i&&vr(o,i),Object.defineProperty(o,"prototype",{writable:!1}),o}function Ur(o,e,i){return e=rr(e),Zr(o,xr()?Reflect.construct(e,i||[],rr(o).constructor):e.apply(o,i))}function Zr(o,e){if(e&&(B(e)==="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return Xr(o)}function Xr(o){if(o===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return o}function xr(){try{var o=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(xr=function(){return!!o})()}function rr(o){return rr=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(i){return i.__proto__||Object.getPrototypeOf(i)},rr(o)}function Yr(o,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");o.prototype=Object.create(e&&e.prototype,{constructor:{value:o,writable:!0,configurable:!0}}),Object.defineProperty(o,"prototype",{writable:!1}),e&&ir(o,e)}function ir(o,e){return ir=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,a){return t.__proto__=a,t},ir(o,e)}function j(o,e,i){return e=Cr(e),e in o?Object.defineProperty(o,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):o[e]=i,o}function Cr(o){var e=Qr(o,"string");return B(e)=="symbol"?e:e+""}function Qr(o,e){if(B(o)!="object"||!o)return o;var i=o[Symbol.toPrimitive];if(i!==void 0){var t=i.call(o,e);if(B(t)!="object")return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}var d=function(o){function e(i){var t;return zr(this,e),t=Ur(this,e,[i]),j(t,"pieRef",null),j(t,"sectorRefs",[]),j(t,"id",kr("recharts-pie-")),j(t,"handleAnimationEnd",function(){var a=t.props.onAnimationEnd;t.setState({isAnimationFinished:!0}),q(a)&&a()}),j(t,"handleAnimationStart",function(){var a=t.props.onAnimationStart;t.setState({isAnimationFinished:!1}),q(a)&&a()}),t.state={isAnimationFinished:!i.isAnimationActive,prevIsAnimationActive:i.isAnimationActive,prevAnimationId:i.animationId,sectorToFocus:0},t}return Yr(e,o),Gr(e,[{key:"isActiveIndex",value:function(t){var a=this.props.activeIndex;return Array.isArray(a)?a.indexOf(t)!==-1:t===a}},{key:"hasActiveIndex",value:function(){var t=this.props.activeIndex;return Array.isArray(t)?t.length!==0:t||t===0}},{key:"renderLabels",value:function(t){var a=this.props.isAnimationActive;if(a&&!this.state.isAnimationFinished)return null;var s=this.props,l=s.label,f=s.labelLine,v=s.dataKey,n=s.valueKey,u=X(this.props,!1),p=X(l,!1),N=X(f,!1),D=l&&l.offsetRadius||20,b=t.map(function(c,m){var x=(c.startAngle+c.endAngle)/2,C=ar(c.cx,c.cy,c.outerRadius+D,x),w=h(h(h(h({},u),c),{},{stroke:"none"},p),{},{index:m,textAnchor:e.getTextAnchor(C.x,c.cx)},C),E=h(h(h(h({},u),c),{},{fill:"none",stroke:c.fill},N),{},{index:m,points:[ar(c.cx,c.cy,c.outerRadius,x),C]}),R=v;return M(v)&&M(n)?R="value":M(v)&&(R=n),g.createElement(H,{key:"label-".concat(c.startAngle,"-").concat(c.endAngle,"-").concat(c.midAngle,"-").concat(m)},f&&e.renderLabelLineItem(f,E,"line"),e.renderLabelItem(l,w,_(c,R)))});return g.createElement(H,{className:"recharts-pie-labels"},b)}},{key:"renderSectorsStatically",value:function(t){var a=this,s=this.props,l=s.activeShape,f=s.blendStroke,v=s.inactiveShape;return t.map(function(n,u){if((n==null?void 0:n.startAngle)===0&&(n==null?void 0:n.endAngle)===0&&t.length!==1)return null;var p=a.isActiveIndex(u),N=v&&a.hasActiveIndex()?v:null,D=p?l:N,b=h(h({},n),{},{stroke:f?n.fill:n.stroke,tabIndex:-1});return g.createElement(H,$({ref:function(m){m&&!a.sectorRefs.includes(m)&&a.sectorRefs.push(m)},tabIndex:-1,className:"recharts-pie-sector"},Ar(a.props,n,u),{key:"sector-".concat(n==null?void 0:n.startAngle,"-").concat(n==null?void 0:n.endAngle,"-").concat(n.midAngle,"-").concat(u)}),g.createElement(Pr,$({option:D,isActive:p,shapeType:"sector"},b)))})}},{key:"renderSectorsWithAnimation",value:function(){var t=this,a=this.props,s=a.sectors,l=a.isAnimationActive,f=a.animationBegin,v=a.animationDuration,n=a.animationEasing,u=a.animationId,p=this.state,N=p.prevSectors,D=p.prevIsAnimationActive;return g.createElement(Sr,{begin:f,duration:v,isActive:l,easing:n,from:{t:0},to:{t:1},key:"pie-".concat(u,"-").concat(D),onAnimationStart:this.handleAnimationStart,onAnimationEnd:this.handleAnimationEnd},function(b){var c=b.t,m=[],x=s&&s[0],C=x.startAngle;return s.forEach(function(w,E){var R=N&&N[E],I=E>0?Vr(w,"paddingAngle",0):0;if(R){var W=hr(R.endAngle-R.startAngle,w.endAngle-w.startAngle),y=h(h({},w),{},{startAngle:C+I,endAngle:C+W(c)+I});m.push(y),C=y.endAngle}else{var F=w.endAngle,L=w.startAngle,G=hr(0,F-L),U=G(c),O=h(h({},w),{},{startAngle:C+I,endAngle:C+U+I});m.push(O),C=O.endAngle}}),g.createElement(H,null,t.renderSectorsStatically(m))})}},{key:"attachKeyboardHandlers",value:function(t){var a=this;t.onkeydown=function(s){if(!s.altKey)switch(s.key){case"ArrowLeft":{var l=++a.state.sectorToFocus%a.sectorRefs.length;a.sectorRefs[l].focus(),a.setState({sectorToFocus:l});break}case"ArrowRight":{var f=--a.state.sectorToFocus<0?a.sectorRefs.length-1:a.state.sectorToFocus%a.sectorRefs.length;a.sectorRefs[f].focus(),a.setState({sectorToFocus:f});break}case"Escape":{a.sectorRefs[a.state.sectorToFocus].blur(),a.setState({sectorToFocus:0});break}}}}},{key:"renderSectors",value:function(){var t=this.props,a=t.sectors,s=t.isAnimationActive,l=this.state.prevSectors;return s&&a&&a.length&&(!l||!$r(l,a))?this.renderSectorsWithAnimation():this.renderSectorsStatically(a)}},{key:"componentDidMount",value:function(){this.pieRef&&this.attachKeyboardHandlers(this.pieRef)}},{key:"render",value:function(){var t=this,a=this.props,s=a.hide,l=a.sectors,f=a.className,v=a.label,n=a.cx,u=a.cy,p=a.innerRadius,N=a.outerRadius,D=a.isAnimationActive,b=this.state.isAnimationFinished;if(s||!l||!l.length||!V(n)||!V(u)||!V(p)||!V(N))return null;var c=er("recharts-pie",f);return g.createElement(H,{tabIndex:this.props.rootTabIndex,className:c,ref:function(x){t.pieRef=x}},this.renderSectors(),v&&this.renderLabels(l),sr.renderCallByParent(this.props,null,!1),(!D||b)&&br.renderCallByParent(this.props,l,!1))}}],[{key:"getDerivedStateFromProps",value:function(t,a){return a.prevIsAnimationActive!==t.isAnimationActive?{prevIsAnimationActive:t.isAnimationActive,prevAnimationId:t.animationId,curSectors:t.sectors,prevSectors:[],isAnimationFinished:!0}:t.isAnimationActive&&t.animationId!==a.prevAnimationId?{prevAnimationId:t.animationId,curSectors:t.sectors,prevSectors:a.curSectors,isAnimationFinished:!0}:t.sectors!==a.curSectors?{curSectors:t.sectors,isAnimationFinished:!0}:null}},{key:"getTextAnchor",value:function(t,a){return t>a?"start":t<a?"end":"middle"}},{key:"renderLabelLineItem",value:function(t,a,s){if(g.isValidElement(t))return g.cloneElement(t,a);if(q(t))return t(a);var l=er("recharts-pie-label-line",typeof t!="boolean"?t.className:"");return g.createElement(jr,$({},a,{key:s,type:"linear",className:l}))}},{key:"renderLabelItem",value:function(t,a,s){if(g.isValidElement(t))return g.cloneElement(t,a);var l=s;if(q(t)&&(l=t(a),g.isValidElement(l)))return l;var f=er("recharts-pie-label-text",typeof t!="boolean"&&!q(t)?t.className:"");return g.createElement(wr,$({},a,{alignmentBaseline:"middle",className:f}),l)}}])}(z.PureComponent);Q=d;j(d,"displayName","Pie");j(d,"defaultProps",{stroke:"#fff",fill:"#808080",legendType:"rect",cx:"50%",cy:"50%",startAngle:0,endAngle:360,innerRadius:0,outerRadius:"80%",paddingAngle:0,labelLine:!0,hide:!1,minAngle:0,isAnimationActive:!Nr.isSsr,animationBegin:400,animationDuration:1500,animationEasing:"ease",nameKey:"name",blendStroke:!1,rootTabIndex:0});j(d,"parseDeltaAngle",function(o,e){var i=Y(e-o),t=Math.min(Math.abs(e-o),360);return i*t});j(d,"getRealPieData",function(o){var e=o.data,i=o.children,t=X(o,!1),a=Dr(i,Rr);return e&&e.length?e.map(function(s,l){return h(h(h({payload:s},t),s),a&&a[l]&&a[l].props)}):a&&a.length?a.map(function(s){return h(h({},t),s.props)}):[]});j(d,"parseCoordinateOfPie",function(o,e){var i=e.top,t=e.left,a=e.width,s=e.height,l=Lr(a,s),f=t+Z(o.cx,a,a/2),v=i+Z(o.cy,s,s/2),n=Z(o.innerRadius,l,0),u=Z(o.outerRadius,l,l*.8),p=o.maxRadius||Math.sqrt(a*a+s*s)/2;return{cx:f,cy:v,innerRadius:n,outerRadius:u,maxRadius:p}});j(d,"getComposedData",function(o){var e=o.item,i=o.offset,t=e.type.defaultProps!==void 0?h(h({},e.type.defaultProps),e.props):e.props,a=Q.getRealPieData(t);if(!a||!a.length)return null;var s=t.cornerRadius,l=t.startAngle,f=t.endAngle,v=t.paddingAngle,n=t.dataKey,u=t.nameKey,p=t.valueKey,N=t.tooltipType,D=Math.abs(t.minAngle),b=Q.parseCoordinateOfPie(t,i),c=Q.parseDeltaAngle(l,f),m=Math.abs(c),x=n;M(n)&&M(p)?(dr(!1,`Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`),x="value"):M(n)&&(dr(!1,`Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`),x=p);var C=a.filter(function(y){return _(y,x,0)!==0}).length,w=(m>=360?C:C-1)*v,E=m-C*D-w,R=a.reduce(function(y,F){var L=_(F,x,0);return y+(V(L)?L:0)},0),I;if(R>0){var W;I=a.map(function(y,F){var L=_(y,x,0),G=_(y,u,F),U=(V(L)?L:0)/R,O;F?O=W.endAngle+Y(c)*v*(L!==0?1:0):O=l;var lr=O+Y(c)*((L!==0?D:0)+U*E),nr=(O+lr)/2,cr=(b.innerRadius+b.outerRadius)/2,gr=[{name:G,value:L,payload:y,dataKey:x,type:N}],yr=ar(b.cx,b.cy,cr,nr);return W=h(h(h({percent:U,cornerRadius:s,name:G,tooltipPayload:gr,midAngle:nr,middleRadius:cr,tooltipPosition:yr},y),b),{},{value:_(y,x),startAngle:O,endAngle:lr,payload:y,paddingAngle:Y(c)*v}),W})}return h(h({},b),{},{sectors:I,data:a})});var k=Tr({chartName:"PieChart",GraphicalChild:d,validateTooltipEventTypes:["item"],defaultTooltipEventType:"item",legendContent:"children",axisComponents:[{axisType:"angleAxis",AxisComp:Fr},{axisType:"radiusAxis",AxisComp:_r}],formatAxisMap:Kr,defaultProps:{layout:"centric",startAngle:0,endAngle:360,cx:"50%",cy:"50%",innerRadius:0,outerRadius:"80%"}});const re=[{browser:"chrome",visitors:275,fill:"var(--color-primary)"},{browser:"safari",visitors:200,fill:"var(--color-secondary)"},{browser:"firefox",visitors:187,fill:"var(--color-warning)"},{browser:"edge",visitors:173,fill:"var(--color-error)"},{browser:"other",visitors:90,fill:"var(--color-info)"}],ee={visitors:{label:"Visitors"},chrome:{label:"Chrome",color:"var(--chart-1)"},safari:{label:"Safari",color:"var(--chart-2)"},firefox:{label:"Firefox",color:"var(--chart-3)"},edge:{label:"Edge",color:"var(--chart-4)"},other:{label:"Other",color:"var(--chart-5)"}};function te(){return r.jsx(r.Fragment,{children:r.jsx(S,{config:ee,children:r.jsxs(k,{children:[r.jsx(T,{content:r.jsx(K,{nameKey:"visitors",hideLabel:!0})}),r.jsx(d,{data:re,dataKey:"visitors",labelLine:!1,label:({payload:o,...e})=>r.jsx("text",{cx:e.cx,cy:e.cy,x:e.x,y:e.y,textAnchor:e.textAnchor,dominantBaseline:e.dominantBaseline,fill:"var(--color-primary)",children:o.visitors}),nameKey:"browser"})]})})})}const ae=()=>r.jsx(P,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Custom Label"}),r.jsx(te,{})]})})}),oe=[{browser:"chrome",visitors:275,fill:"var(--color-primary)"},{browser:"safari",visitors:200,fill:"var(--color-secondary)"},{browser:"firefox",visitors:187,fill:"var(--color-warning)"},{browser:"edge",visitors:173,fill:"var(--color-error)"},{browser:"other",visitors:90,fill:"var(--color-info)"}],ie={visitors:{label:"Visitors"},chrome:{label:"Chrome",color:"var(--chart-1)"},safari:{label:"Safari",color:"var(--chart-2)"},firefox:{label:"Firefox",color:"var(--chart-3)"},edge:{label:"Edge",color:"var(--chart-4)"},other:{label:"Other",color:"var(--chart-5)"}};function se(){return r.jsx(r.Fragment,{children:r.jsx(S,{config:ie,children:r.jsxs(k,{children:[r.jsx(T,{cursor:!1,content:r.jsx(K,{hideLabel:!0})}),r.jsx(d,{data:oe,dataKey:"visitors",nameKey:"browser"})]})})})}const le=()=>r.jsx(P,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Default"}),r.jsx(se,{})]})})}),ne=[{browser:"chrome",visitors:275,fill:"var(--color-primary)"},{browser:"safari",visitors:200,fill:"var(--color-secondary)"},{browser:"firefox",visitors:187,fill:"var(--color-warning)"},{browser:"edge",visitors:173,fill:"var(--color-error)"},{browser:"other",visitors:90,fill:"var(--color-info)"}],ce={visitors:{label:"Visitors"},chrome:{label:"Chrome",color:"var(--chart-1)"},safari:{label:"Safari",color:"var(--chart-2)"},firefox:{label:"Firefox",color:"var(--chart-3)"},edge:{label:"Edge",color:"var(--chart-4)"},other:{label:"Other",color:"var(--chart-5)"}};function he(){return r.jsx(r.Fragment,{children:r.jsx(S,{config:ce,children:r.jsxs(k,{children:[r.jsx(T,{cursor:!1,content:r.jsx(K,{hideLabel:!0})}),r.jsx(d,{data:ne,dataKey:"visitors",nameKey:"browser",innerRadius:60})]})})})}const de=()=>r.jsx(P,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Donut"}),r.jsx(he,{})]})})}),fe=[{browser:"chrome",visitors:275,fill:"var(--color-primary)"},{browser:"safari",visitors:200,fill:"var(--color-secondary)"},{browser:"firefox",visitors:187,fill:"var(--color-warning)"},{browser:"edge",visitors:173,fill:"var(--color-error)"},{browser:"other",visitors:90,fill:"var(--color-info)"}],ve={visitors:{label:"Visitors"},chrome:{label:"Chrome",color:"var(--chart-1)"},safari:{label:"Safari",color:"var(--chart-2)"},firefox:{label:"Firefox",color:"var(--chart-3)"},edge:{label:"Edge",color:"var(--chart-4)"},other:{label:"Other",color:"var(--chart-5)"}};function me(){return r.jsx(r.Fragment,{children:r.jsx(S,{config:ve,children:r.jsxs(k,{children:[r.jsx(T,{cursor:!1,content:r.jsx(K,{hideLabel:!0})}),r.jsx(d,{data:fe,dataKey:"visitors",nameKey:"browser",innerRadius:60,strokeWidth:5,activeIndex:0,activeShape:({outerRadius:o=0,...e})=>r.jsx(or,{...e,outerRadius:o+10})})]})})})}const ue=()=>r.jsx(P,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Donut active"}),r.jsx(me,{})]})})}),mr=[{browser:"chrome",visitors:275,fill:"var(--color-primary)"},{browser:"safari",visitors:200,fill:"var(--color-secondary)"},{browser:"firefox",visitors:287,fill:"var(--color-warning)"},{browser:"edge",visitors:173,fill:"var(--color-error)"},{browser:"other",visitors:190,fill:"var(--color-info)"}],pe={visitors:{label:"Visitors"},chrome:{label:"Chrome",color:"var(--chart-1)"},safari:{label:"Safari",color:"var(--chart-2)"},firefox:{label:"Firefox",color:"var(--chart-3)"},edge:{label:"Edge",color:"var(--chart-4)"},other:{label:"Other",color:"var(--chart-5)"}};function be(){const o=z.useMemo(()=>mr.reduce((e,i)=>e+i.visitors,0),[]);return r.jsx(r.Fragment,{children:r.jsx(S,{config:pe,children:r.jsxs(k,{children:[r.jsx(T,{cursor:!1,content:r.jsx(K,{hideLabel:!0})}),r.jsx(d,{data:mr,dataKey:"visitors",nameKey:"browser",innerRadius:60,strokeWidth:5,children:r.jsx(sr,{content:({viewBox:e})=>{if(e&&"cx"in e&&"cy"in e)return r.jsxs("text",{x:e.cx,y:e.cy,textAnchor:"middle",dominantBaseline:"middle",children:[r.jsx("tspan",{x:e.cx,y:e.cy,className:"fill-foreground text-3xl font-bold",children:o.toLocaleString()}),r.jsx("tspan",{x:e.cx,y:(e.cy||0)+24,className:"fill-muted-foreground",children:"Visitors"})]})}})})]})})})}const xe=()=>r.jsx(P,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Donut With Text"}),r.jsx(be,{})]})})}),J=[{month:"january",desktop:186,fill:"var(--color-primary)"},{month:"february",desktop:305,fill:"var(--color-secondary)"},{month:"march",desktop:237,fill:"var(--color-warning)"},{month:"april",desktop:173,fill:"var(--color-error)"},{month:"may",desktop:209,fill:"var(--color-info)"}],tr={visitors:{label:"Visitors"},desktop:{label:"Desktop"},mobile:{label:"Mobile"},january:{label:"January",color:"var(--chart-1)"},february:{label:"February",color:"var(--chart-2)"},march:{label:"March",color:"var(--chart-3)"},april:{label:"April",color:"var(--chart-4)"},may:{label:"May",color:"var(--chart-5)"}};function Ce(){const o="pie-interactive",[e,i]=z.useState(J[0].month),t=z.useMemo(()=>J.findIndex(s=>s.month===e),[e]),a=z.useMemo(()=>J.map(s=>s.month),[]);return r.jsxs(r.Fragment,{children:[r.jsx(Or,{id:o,config:tr}),r.jsxs("div",{children:[r.jsxs(Mr,{value:e,onValueChange:i,children:[r.jsx(Br,{className:"sm:ml-auto rounded-lg pl-2.5 w-fit","aria-label":"Select a value",children:r.jsx(Wr,{placeholder:"Select month"})}),r.jsx(Hr,{align:"end",className:"rounded-xl",children:a.map(s=>{const l=tr[s];return l?r.jsx(qr,{value:s,className:"rounded-lg [&_span]:flex",children:r.jsxs("div",{className:"flex items-center gap-2 text-xs",children:[r.jsx("span",{className:"flex h-3 w-3 shrink-0 rounded-xs",style:{backgroundColor:`var(--color-${s})`}}),l==null?void 0:l.label]})},s):null})})]}),r.jsx(S,{id:o,config:tr,children:r.jsxs(k,{children:[r.jsx(T,{cursor:!1,content:r.jsx(K,{hideLabel:!0})}),r.jsx(d,{data:J,dataKey:"desktop",nameKey:"month",innerRadius:60,strokeWidth:5,activeIndex:t,activeShape:({outerRadius:s=0,...l})=>r.jsxs("g",{children:[r.jsx(or,{...l,outerRadius:s+10}),r.jsx(or,{...l,outerRadius:s+25,innerRadius:s+12})]}),children:r.jsx(sr,{content:({viewBox:s})=>{if(s&&"cx"in s&&"cy"in s)return r.jsxs("text",{x:s.cx,y:s.cy,textAnchor:"middle",dominantBaseline:"middle",children:[r.jsx("tspan",{x:s.cx,y:s.cy,className:"fill-foreground text-3xl font-bold",children:J[t].desktop.toLocaleString()}),r.jsx("tspan",{x:s.cx,y:(s.cy||0)+24,className:"fill-muted-foreground",children:"Visitors"})]})}})})]})})]})]})}const ge=()=>r.jsx(P,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Interactive"}),r.jsx(Ce,{})]})})}),ye=[{browser:"chrome",visitors:275,fill:"var(--color-primary)"},{browser:"safari",visitors:200,fill:"var(--color-secondary)"},{browser:"firefox",visitors:187,fill:"var(--color-warning)"},{browser:"edge",visitors:173,fill:"var(--color-error)"},{browser:"other",visitors:90,fill:"var(--color-info)"}],je={visitors:{label:"Visitors"},chrome:{label:"Chrome",color:"var(--chart-1)"},safari:{label:"Safari",color:"var(--chart-2)"},firefox:{label:"Firefox",color:"var(--chart-3)"},edge:{label:"Edge",color:"var(--chart-4)"},other:{label:"Other",color:"var(--chart-5)"}};function we(){return r.jsx(r.Fragment,{children:r.jsx(S,{config:je,className:"[&_.recharts-pie-label-text]:fill-foreground",children:r.jsxs(k,{children:[r.jsx(T,{content:r.jsx(K,{hideLabel:!0})}),r.jsx(d,{data:ye,dataKey:"visitors",label:!0,nameKey:"browser"})]})})})}const Ae=()=>r.jsx(P,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Label"}),r.jsx(we,{})]})})}),Pe=[{browser:"chrome",visitors:275,fill:"var(--color-primary)"},{browser:"safari",visitors:200,fill:"var(--color-secondary)"},{browser:"firefox",visitors:187,fill:"var(--color-warning)"},{browser:"edge",visitors:173,fill:"var(--color-error)"},{browser:"other",visitors:90,fill:"var(--color-info)"}],ur={visitors:{label:"Visitors"},chrome:{label:"Chrome",color:"var(--chart-1)"},safari:{label:"Safari",color:"var(--chart-2)"},firefox:{label:"Firefox",color:"var(--chart-3)"},edge:{label:"Edge",color:"var(--chart-4)"},other:{label:"Other",color:"var(--chart-5)"}};function Se(){return r.jsx(r.Fragment,{children:r.jsx(S,{config:ur,className:"[&_.recharts-text]:fill-background",children:r.jsxs(k,{children:[r.jsx(T,{content:r.jsx(K,{nameKey:"visitors",hideLabel:!0})}),r.jsx(d,{data:Pe,dataKey:"visitors",children:r.jsx(br,{dataKey:"browser",className:"fill-link",stroke:"none",fontSize:12,formatter:o=>{var e;return(e=ur[o])==null?void 0:e.label}})})]})})})}const ke=()=>r.jsx(P,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Label List"}),r.jsx(Se,{})]})})}),Ne=[{browser:"chrome",visitors:275,fill:"var(--color-primary)"},{browser:"safari",visitors:200,fill:"var(--color-secondary)"},{browser:"firefox",visitors:187,fill:"var(--color-warning)"},{browser:"edge",visitors:173,fill:"var(--color-error)"},{browser:"other",visitors:90,fill:"var(--color-info)"}],De={visitors:{label:"Visitors"},chrome:{label:"Chrome",color:"var(--chart-1)"},safari:{label:"Safari",color:"var(--chart-2)"},firefox:{label:"Firefox",color:"var(--chart-3)"},edge:{label:"Edge",color:"var(--chart-4)"},other:{label:"Other",color:"var(--chart-5)"}};function Re(){return r.jsx(r.Fragment,{children:r.jsx(S,{config:De,children:r.jsxs(k,{children:[r.jsx(d,{data:Ne,dataKey:"visitors"}),r.jsx(Ir,{content:r.jsx(Er,{nameKey:"browser"}),className:"-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"})]})})})}const Le=()=>r.jsx(P,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Legend"}),r.jsx(Re,{})]})})}),Te=[{browser:"chrome",visitors:275,fill:"var(--color-primary)"},{browser:"safari",visitors:200,fill:"var(--color-secondary)"},{browser:"firefox",visitors:187,fill:"var(--color-warning)"},{browser:"edge",visitors:173,fill:"var(--color-error)"},{browser:"other",visitors:90,fill:"var(--color-info)"}],Ke={visitors:{label:"Visitors"},chrome:{label:"Chrome",color:"var(--chart-1)"},safari:{label:"Safari",color:"var(--chart-2)"},firefox:{label:"Firefox",color:"var(--chart-3)"},edge:{label:"Edge",color:"var(--chart-4)"},other:{label:"Other",color:"var(--chart-5)"}};function Oe(){return r.jsx(r.Fragment,{children:r.jsx(S,{config:Ke,children:r.jsxs(k,{children:[r.jsx(T,{cursor:!1,content:r.jsx(K,{hideLabel:!0})}),r.jsx(d,{data:Te,dataKey:"visitors",nameKey:"browser",stroke:"0"})]})})})}const Ie=()=>r.jsx(P,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Separator None"}),r.jsx(Oe,{})]})})}),Ee=[{month:"january",desktop:186,fill:"var(--color-primary)"},{month:"february",desktop:305,fill:"var(--color-secondary)"},{month:"march",desktop:237,fill:"var(--color-warning)"},{month:"april",desktop:173,fill:"var(--color-error)"},{month:"may",desktop:209,fill:"var(--color-info)"}],Fe=[{month:"january",mobile:80,fill:"var(--color-primary)"},{month:"february",mobile:200,fill:"var(--color-secondary)"},{month:"march",mobile:120,fill:"var(--color-warning)"},{month:"april",mobile:190,fill:"var(--color-error)"},{month:"may",mobile:130,fill:"var(--color-info)"}],pr={visitors:{label:"Visitors"},desktop:{label:"Desktop"},mobile:{label:"Mobile"},january:{label:"January",color:"var(--chart-1)"},february:{label:"February",color:"var(--chart-2)"},march:{label:"March",color:"var(--chart-3)"},april:{label:"April",color:"var(--chart-4)"},may:{label:"May",color:"var(--chart-5)"}};function _e(){return r.jsx(r.Fragment,{children:r.jsx(S,{config:pr,children:r.jsxs(k,{children:[r.jsx(T,{content:r.jsx(K,{labelKey:"visitors",nameKey:"month",indicator:"line",labelFormatter:(o,e)=>pr[e==null?void 0:e[0].dataKey].label})}),r.jsx(d,{data:Ee,dataKey:"desktop",outerRadius:60}),r.jsx(d,{data:Fe,dataKey:"mobile",innerRadius:70,outerRadius:90})]})})})}const Ve=()=>r.jsx(P,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Stacked"}),r.jsx(_e,{})]})})}),$e=`import { Pie, PieChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A pie chart with a custom label';\r
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
export default function ChartPieLabelCustomCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <PieChart>\r
          <ChartTooltip content={<ChartTooltipContent nameKey="visitors" hideLabel />} />\r
          <Pie\r
            data={chartData}\r
            dataKey="visitors"\r
            labelLine={false}\r
            label={({ payload, ...props }) => {\r
              return (\r
                <text\r
                  cx={props.cx}\r
                  cy={props.cy}\r
                  x={props.x}\r
                  y={props.y}\r
                  textAnchor={props.textAnchor}\r
                  dominantBaseline={props.dominantBaseline}\r
                  fill="var(--color-primary)"\r
                >\r
                  {payload.visitors}\r
                </text>\r
              );\r
            }}\r
            nameKey="browser"\r
          />\r
        </PieChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Me=`import { Pie, PieChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A simple pie chart';\r
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
export default function ChartPieSimpleCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <PieChart>\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <Pie data={chartData} dataKey="visitors" nameKey="browser" />\r
        </PieChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Be=`import { Pie, PieChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A donut chart';\r
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
export default function ChartPieDonutCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <PieChart>\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} />\r
        </PieChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,We=`import { Pie, PieChart, Sector } from 'recharts';\r
import { PieSectorDataItem } from 'recharts/types/polar/Pie';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A donut chart with an active sector';\r
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
export default function ChartPieDonutActiveCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <PieChart>\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <Pie\r
            data={chartData}\r
            dataKey="visitors"\r
            nameKey="browser"\r
            innerRadius={60}\r
            strokeWidth={5}\r
            activeIndex={0}\r
            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (\r
              <Sector {...props} outerRadius={outerRadius + 10} />\r
            )}\r
          />\r
        </PieChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,He=`import * as React from 'react';\r
import { Label, Pie, PieChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A donut chart with text';\r
\r
const chartData = [\r
  { browser: 'chrome', visitors: 275, fill: 'var(--color-primary)' },\r
  { browser: 'safari', visitors: 200, fill: 'var(--color-secondary)' },\r
  { browser: 'firefox', visitors: 287, fill: 'var(--color-warning)' },\r
  { browser: 'edge', visitors: 173, fill: 'var(--color-error)' },\r
  { browser: 'other', visitors: 190, fill: 'var(--color-info)' },\r
];\r
\r
const chartConfig = {\r
  visitors: {\r
    label: 'Visitors',\r
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
export default function ChartPieDonutTextCode() {\r
  const totalVisitors = React.useMemo(() => {\r
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);\r
  }, []);\r
\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <PieChart>\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <Pie\r
            data={chartData}\r
            dataKey="visitors"\r
            nameKey="browser"\r
            innerRadius={60}\r
            strokeWidth={5}\r
          >\r
            <Label\r
              content={({ viewBox }) => {\r
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {\r
                  return (\r
                    <text\r
                      x={viewBox.cx}\r
                      y={viewBox.cy}\r
                      textAnchor="middle"\r
                      dominantBaseline="middle"\r
                    >\r
                      <tspan\r
                        x={viewBox.cx}\r
                        y={viewBox.cy}\r
                        className="fill-foreground text-3xl font-bold"\r
                      >\r
                        {totalVisitors.toLocaleString()}\r
                      </tspan>\r
                      <tspan\r
                        x={viewBox.cx}\r
                        y={(viewBox.cy || 0) + 24}\r
                        className="fill-muted-foreground"\r
                      >\r
                        Visitors\r
                      </tspan>\r
                    </text>\r
                  );\r
                }\r
              }}\r
            />\r
          </Pie>\r
        </PieChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,qe=`import * as React from 'react';\r
import { Label, Pie, PieChart, Sector } from 'recharts';\r
import { PieSectorDataItem } from 'recharts/types/polar/Pie';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartStyle,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
import {\r
  Select,\r
  SelectContent,\r
  SelectItem,\r
  SelectTrigger,\r
  SelectValue,\r
} from 'src/components/ui/select';\r
\r
export const description = 'An interactive pie chart';\r
\r
const desktopData = [\r
  { month: 'january', desktop: 186, fill: 'var(--color-primary)' },\r
  { month: 'february', desktop: 305, fill: 'var(--color-secondary)' },\r
  { month: 'march', desktop: 237, fill: 'var(--color-warning)' },\r
  { month: 'april', desktop: 173, fill: 'var(--color-error)' },\r
  { month: 'may', desktop: 209, fill: 'var(--color-info)' },\r
];\r
\r
const chartConfig = {\r
  visitors: {\r
    label: 'Visitors',\r
  },\r
  desktop: {\r
    label: 'Desktop',\r
  },\r
  mobile: {\r
    label: 'Mobile',\r
  },\r
  january: {\r
    label: 'January',\r
    color: 'var(--chart-1)',\r
  },\r
  february: {\r
    label: 'February',\r
    color: 'var(--chart-2)',\r
  },\r
  march: {\r
    label: 'March',\r
    color: 'var(--chart-3)',\r
  },\r
  april: {\r
    label: 'April',\r
    color: 'var(--chart-4)',\r
  },\r
  may: {\r
    label: 'May',\r
    color: 'var(--chart-5)',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartPieInteractiveCode() {\r
  const id = 'pie-interactive';\r
  const [activeMonth, setActiveMonth] = React.useState(desktopData[0].month);\r
\r
  const activeIndex = React.useMemo(\r
    () => desktopData.findIndex((item) => item.month === activeMonth),\r
    [activeMonth],\r
  );\r
  const months = React.useMemo(() => desktopData.map((item) => item.month), []);\r
\r
  return (\r
    <>\r
      <ChartStyle id={id} config={chartConfig} />\r
      <div>\r
        <Select value={activeMonth} onValueChange={setActiveMonth}>\r
          <SelectTrigger className="sm:ml-auto rounded-lg pl-2.5 w-fit" aria-label="Select a value">\r
            <SelectValue placeholder="Select month" />\r
          </SelectTrigger>\r
          <SelectContent align="end" className="rounded-xl">\r
            {months.map((key) => {\r
              const config = chartConfig[key as keyof typeof chartConfig];\r
\r
              if (!config) {\r
                return null;\r
              }\r
\r
              return (\r
                <SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">\r
                  <div className="flex items-center gap-2 text-xs">\r
                    <span\r
                      className="flex h-3 w-3 shrink-0 rounded-xs"\r
                      style={{\r
                        backgroundColor: \`var(--color-\${key})\`,\r
                      }}\r
                    />\r
                    {config?.label}\r
                  </div>\r
                </SelectItem>\r
              );\r
            })}\r
          </SelectContent>\r
        </Select>\r
        <ChartContainer id={id} config={chartConfig}>\r
          <PieChart>\r
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
            <Pie\r
              data={desktopData}\r
              dataKey="desktop"\r
              nameKey="month"\r
              innerRadius={60}\r
              strokeWidth={5}\r
              activeIndex={activeIndex}\r
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (\r
                <g>\r
                  <Sector {...props} outerRadius={outerRadius + 10} />\r
                  <Sector\r
                    {...props}\r
                    outerRadius={outerRadius + 25}\r
                    innerRadius={outerRadius + 12}\r
                  />\r
                </g>\r
              )}\r
            >\r
              <Label\r
                content={({ viewBox }) => {\r
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {\r
                    return (\r
                      <text\r
                        x={viewBox.cx}\r
                        y={viewBox.cy}\r
                        textAnchor="middle"\r
                        dominantBaseline="middle"\r
                      >\r
                        <tspan\r
                          x={viewBox.cx}\r
                          y={viewBox.cy}\r
                          className="fill-foreground text-3xl font-bold"\r
                        >\r
                          {desktopData[activeIndex].desktop.toLocaleString()}\r
                        </tspan>\r
                        <tspan\r
                          x={viewBox.cx}\r
                          y={(viewBox.cy || 0) + 24}\r
                          className="fill-muted-foreground"\r
                        >\r
                          Visitors\r
                        </tspan>\r
                      </text>\r
                    );\r
                  }\r
                }}\r
              />\r
            </Pie>\r
          </PieChart>\r
        </ChartContainer>\r
      </div>\r
    </>\r
  );\r
}\r
`,Je=`import { Pie, PieChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A pie chart with a label';\r
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
export default function ChartPieLabelCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig} className="[&_.recharts-pie-label-text]:fill-foreground">\r
        <PieChart>\r
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />\r
          <Pie data={chartData} dataKey="visitors" label nameKey="browser" />\r
        </PieChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,ze=`import { LabelList, Pie, PieChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A pie chart with a label list';\r
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
export default function ChartPieLabelListCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig} className="[&_.recharts-text]:fill-background">\r
        <PieChart>\r
          <ChartTooltip content={<ChartTooltipContent nameKey="visitors" hideLabel />} />\r
          <Pie data={chartData} dataKey="visitors">\r
            <LabelList\r
              dataKey="browser"\r
              className="fill-link"\r
              stroke="none"\r
              fontSize={12}\r
              formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}\r
            />\r
          </Pie>\r
        </PieChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Ge=`import { Pie, PieChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartLegend,\r
  ChartLegendContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A pie chart with a legend';\r
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
export default function ChartPieLegendCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <PieChart>\r
          <Pie data={chartData} dataKey="visitors" />\r
          <ChartLegend\r
            content={<ChartLegendContent nameKey="browser" />}\r
            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"\r
          />\r
        </PieChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Ue=`import { Pie, PieChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A pie chart with no separator';\r
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
export default function ChartPieSeparatorNoneCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <PieChart>\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <Pie data={chartData} dataKey="visitors" nameKey="browser" stroke="0" />\r
        </PieChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Ze=`import { Pie, PieChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A pie chart with stacked sections';\r
\r
const desktopData = [\r
  { month: 'january', desktop: 186, fill: 'var(--color-primary)' },\r
  { month: 'february', desktop: 305, fill: 'var(--color-secondary)' },\r
  { month: 'march', desktop: 237, fill: 'var(--color-warning)' },\r
  { month: 'april', desktop: 173, fill: 'var(--color-error)' },\r
  { month: 'may', desktop: 209, fill: 'var(--color-info)' },\r
];\r
\r
const mobileData = [\r
  { month: 'january', mobile: 80, fill: 'var(--color-primary)' },\r
  { month: 'february', mobile: 200, fill: 'var(--color-secondary)' },\r
  { month: 'march', mobile: 120, fill: 'var(--color-warning)' },\r
  { month: 'april', mobile: 190, fill: 'var(--color-error)' },\r
  { month: 'may', mobile: 130, fill: 'var(--color-info)' },\r
];\r
\r
const chartConfig = {\r
  visitors: {\r
    label: 'Visitors',\r
  },\r
  desktop: {\r
    label: 'Desktop',\r
  },\r
  mobile: {\r
    label: 'Mobile',\r
  },\r
  january: {\r
    label: 'January',\r
    color: 'var(--chart-1)',\r
  },\r
  february: {\r
    label: 'February',\r
    color: 'var(--chart-2)',\r
  },\r
  march: {\r
    label: 'March',\r
    color: 'var(--chart-3)',\r
  },\r
  april: {\r
    label: 'April',\r
    color: 'var(--chart-4)',\r
  },\r
  may: {\r
    label: 'May',\r
    color: 'var(--chart-5)',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartPieStackedCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <PieChart>\r
          <ChartTooltip\r
            content={\r
              <ChartTooltipContent\r
                labelKey="visitors"\r
                nameKey="month"\r
                indicator="line"\r
                labelFormatter={(_, payload) => {\r
                  return chartConfig[payload?.[0].dataKey as keyof typeof chartConfig].label;\r
                }}\r
              />\r
            }\r
          />\r
          <Pie data={desktopData} dataKey="desktop" outerRadius={60} />\r
          <Pie data={mobileData} dataKey="mobile" innerRadius={70} outerRadius={90} />\r
        </PieChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Xe=[{to:"/",title:"Home"},{href:"",title:"Shadcn Pie Chart"}],At=()=>r.jsxs(r.Fragment,{children:[r.jsx(Jr,{title:"Shadcn Pie Chart",items:Xe}),r.jsxs("div",{className:"grid grid-cols-12 gap-5 sm:gap-7",children:[r.jsxs("div",{className:"col-span-12",children:[r.jsx(le,{}),r.jsx(A,{children:Me})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(Ie,{}),r.jsx(A,{children:Ue})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(Ae,{}),r.jsx(A,{children:Je})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(ae,{}),r.jsx(A,{children:$e})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(ke,{}),r.jsx(A,{children:ze})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(Le,{}),r.jsx(A,{children:Ge})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(de,{}),r.jsx(A,{children:Be})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(ue,{}),r.jsx(A,{children:We})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(xe,{}),r.jsx(A,{children:He})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(Ve,{}),r.jsx(A,{children:Ze})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(ge,{}),r.jsx(A,{children:qe})]})]})]});export{At as default};
