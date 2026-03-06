import{H as Z,R,a1 as S,r as rr,j as r}from"./index-CW78-08q.js";import{C as u}from"./card-BmJIY3HQ.js";import{D as tr,f as $,L as w,A as ar,a as F,d as or,G as er,g as _,b as I,S as W,j as nr,X as ir,l as C,n as y,o as x,p as sr,q as lr}from"./chart-yE5xt8jo.js";import{N as G,K as cr,Y as dr}from"./isPlainObject-CNyMZbV2.js";import{b as hr,P as p,a as pr}from"./PolarAngleAxis-C2qG8Wj6.js";import{P as A}from"./PolarGrid-C_YqBwzG.js";import{B as mr}from"./BreadcrumbComp-mrdJNCbj.js";import{C as f}from"./CodeDialog-DRC5ECma.js";import"./tiny-invariant-BaFNuDhB.js";import"./string-B_3o-8jJ.js";import"./toString-ti5piw7E.js";import"./CardBox-CJgwgOI2.js";import"./chevron-right-B2L8yKO6.js";import"./createLucideIcon-BxwgNh2l.js";import"./index-DaNAaBSr.js";import"./vsc-dark-plus-CoILpeng.js";import"./highlight-DCblhEs5.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";function fr(t){return t&&t.length?t[0]:void 0}var ur=fr,Cr=ur;const yr=Z(Cr);var xr=["key"];function K(t){"@babel/helpers - typeof";return K=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},K(t)}function gr(t,a){if(t==null)return{};var e=br(t,a),o,n;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)o=i[n],!(a.indexOf(o)>=0)&&Object.prototype.propertyIsEnumerable.call(t,o)&&(e[o]=t[o])}return e}function br(t,a){if(t==null)return{};var e={};for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){if(a.indexOf(o)>=0)continue;e[o]=t[o]}return e}function L(){return L=Object.assign?Object.assign.bind():function(t){for(var a=1;a<arguments.length;a++){var e=arguments[a];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},L.apply(this,arguments)}function B(t,a){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);a&&(o=o.filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})),e.push.apply(e,o)}return e}function d(t){for(var a=1;a<arguments.length;a++){var e=arguments[a]!=null?arguments[a]:{};a%2?B(Object(e),!0).forEach(function(o){D(t,o,e[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):B(Object(e)).forEach(function(o){Object.defineProperty(t,o,Object.getOwnPropertyDescriptor(e,o))})}return t}function jr(t,a){if(!(t instanceof a))throw new TypeError("Cannot call a class as a function")}function z(t,a){for(var e=0;e<a.length;e++){var o=a[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,H(o.key),o)}}function kr(t,a,e){return a&&z(t.prototype,a),e&&z(t,e),Object.defineProperty(t,"prototype",{writable:!1}),t}function vr(t,a,e){return a=J(a),Ar(t,q()?Reflect.construct(a,e||[],J(t).constructor):a.apply(t,e))}function Ar(t,a){if(a&&(K(a)==="object"||typeof a=="function"))return a;if(a!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return Rr(t)}function Rr(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function q(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(q=function(){return!!t})()}function J(t){return J=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},J(t)}function Pr(t,a){if(typeof a!="function"&&a!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(a&&a.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),a&&E(t,a)}function E(t,a){return E=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,n){return o.__proto__=n,o},E(t,a)}function D(t,a,e){return a=H(a),a in t?Object.defineProperty(t,a,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[a]=e,t}function H(t){var a=Dr(t,"string");return K(a)=="symbol"?a:a+""}function Dr(t,a){if(K(t)!="object"||!t)return t;var e=t[Symbol.toPrimitive];if(e!==void 0){var o=e.call(t,a);if(K(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}var c=function(t){function a(){var e;jr(this,a);for(var o=arguments.length,n=new Array(o),i=0;i<o;i++)n[i]=arguments[i];return e=vr(this,a,[].concat(n)),D(e,"state",{isAnimationFinished:!1}),D(e,"handleAnimationEnd",function(){var s=e.props.onAnimationEnd;e.setState({isAnimationFinished:!0}),G(s)&&s()}),D(e,"handleAnimationStart",function(){var s=e.props.onAnimationStart;e.setState({isAnimationFinished:!1}),G(s)&&s()}),D(e,"handleMouseEnter",function(s){var l=e.props.onMouseEnter;l&&l(e.props,s)}),D(e,"handleMouseLeave",function(s){var l=e.props.onMouseLeave;l&&l(e.props,s)}),e}return Pr(a,t),kr(a,[{key:"renderDots",value:function(o){var n=this.props,i=n.dot,s=n.dataKey,l=$(this.props,!1),b=$(i,!0),j=o.map(function(m,k){var h=d(d(d({key:"dot-".concat(k),r:3},l),b),{},{dataKey:s,cx:m.x,cy:m.y,index:k,payload:m});return a.renderDotItem(i,h)});return R.createElement(w,{className:"recharts-radar-dots"},j)}},{key:"renderPolygonStatically",value:function(o){var n=this.props,i=n.shape,s=n.dot,l=n.isRange,b=n.baseLinePoints,j=n.connectNulls,m;return R.isValidElement(i)?m=R.cloneElement(i,d(d({},this.props),{},{points:o})):G(i)?m=i(d(d({},this.props),{},{points:o})):m=R.createElement(hr,L({},$(this.props,!0),{onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave,points:o,baseLinePoints:l?b:null,connectNulls:j})),R.createElement(w,{className:"recharts-radar-polygon"},m,s?this.renderDots(o):null)}},{key:"renderPolygonWithAnimation",value:function(){var o=this,n=this.props,i=n.points,s=n.isAnimationActive,l=n.animationBegin,b=n.animationDuration,j=n.animationEasing,m=n.animationId,k=this.state.prevPoints;return R.createElement(ar,{begin:l,duration:b,isActive:s,easing:j,from:{t:0},to:{t:1},key:"radar-".concat(m),onAnimationEnd:this.handleAnimationEnd,onAnimationStart:this.handleAnimationStart},function(h){var P=h.t,N=k&&k.length/i.length,O=i.map(function(v,T){var M=k&&k[Math.floor(T*N)];if(M){var X=F(M.x,v.x),Y=F(M.y,v.y);return d(d({},v),{},{x:X(P),y:Y(P)})}var Q=F(v.cx,v.x),U=F(v.cy,v.y);return d(d({},v),{},{x:Q(P),y:U(P)})});return o.renderPolygonStatically(O)})}},{key:"renderPolygon",value:function(){var o=this.props,n=o.points,i=o.isAnimationActive,s=o.isRange,l=this.state.prevPoints;return i&&n&&n.length&&!s&&(!l||!cr(l,n))?this.renderPolygonWithAnimation():this.renderPolygonStatically(n)}},{key:"render",value:function(){var o=this.props,n=o.hide,i=o.className,s=o.points,l=o.isAnimationActive;if(n||!s||!s.length)return null;var b=this.state.isAnimationFinished,j=S("recharts-radar",i);return R.createElement(w,{className:j},this.renderPolygon(),(!l||b)&&or.renderCallByParent(this.props,s))}}],[{key:"getDerivedStateFromProps",value:function(o,n){return o.animationId!==n.prevAnimationId?{prevAnimationId:o.animationId,curPoints:o.points,prevPoints:n.curPoints}:o.points!==n.curPoints?{curPoints:o.points}:null}},{key:"renderDotItem",value:function(o,n){var i;if(R.isValidElement(o))i=R.cloneElement(o,n);else if(G(o))i=o(n);else{var s=n.key,l=gr(n,xr);i=R.createElement(tr,L({},l,{key:s,className:S("recharts-radar-dot",typeof o!="boolean"?o.className:"")}))}return i}}])}(rr.PureComponent);D(c,"displayName","Radar");D(c,"defaultProps",{angleAxisId:0,radiusAxisId:0,hide:!1,activeDot:!0,dot:!1,legendType:"rect",isAnimationActive:!er.isSsr,animationBegin:0,animationDuration:1500,animationEasing:"ease"});D(c,"getComposedData",function(t){var a=t.radiusAxis,e=t.angleAxis,o=t.displayedData,n=t.dataKey,i=t.bandSize,s=e.cx,l=e.cy,b=!1,j=[],m=e.type!=="number"?i??0:0;o.forEach(function(h,P){var N=_(h,e.dataKey,P),O=_(h,n),v=e.scale(N)+m,T=Array.isArray(O)?dr(O):O,M=I(T)?void 0:a.scale(T);Array.isArray(O)&&O.length>=2&&(b=!0),j.push(d(d({},W(s,l,M,v)),{},{name:N,value:O,cx:s,cy:l,radius:M,angle:v,payload:h}))});var k=[];return b&&j.forEach(function(h){if(Array.isArray(h.value)){var P=yr(h.value),N=I(P)?void 0:a.scale(P);k.push(d(d({},h),{},{radius:N},W(s,l,N,h.angle)))}else k.push(h)}),{points:j,isRange:b,baseLinePoints:k}});var g=nr({chartName:"RadarChart",GraphicalChild:c,axisComponents:[{axisType:"angleAxis",AxisComp:p},{axisType:"radiusAxis",AxisComp:pr}],formatAxisMap:ir,defaultProps:{layout:"centric",startAngle:90,endAngle:-270,cx:"50%",cy:"50%",innerRadius:0,outerRadius:"80%"}});const V=[{month:"January",desktop:186,mobile:80},{month:"February",desktop:305,mobile:200},{month:"March",desktop:237,mobile:120},{month:"April",desktop:73,mobile:190},{month:"May",desktop:209,mobile:130},{month:"June",desktop:214,mobile:140}],Or={desktop:{label:"Desktop",color:"var(--chart-1)"},mobile:{label:"Mobile",color:"var(--chart-2)"}};function Nr(){return r.jsx(r.Fragment,{children:r.jsx(C,{config:Or,children:r.jsxs(g,{data:V,margin:{top:10,right:10,bottom:10,left:10},children:[r.jsx(y,{cursor:!1,content:r.jsx(x,{indicator:"line"})}),r.jsx(p,{dataKey:"month",tick:({x:t,y:a,textAnchor:e,value:o,index:n,...i})=>{const s=V[n];return r.jsxs("text",{x:t,y:n===0?a-10:a,textAnchor:e,fontSize:13,fontWeight:500,...i,children:[r.jsx("tspan",{children:s.desktop}),r.jsx("tspan",{className:"fill-muted-foreground",children:"/"}),r.jsx("tspan",{children:s.mobile}),r.jsx("tspan",{x:t,dy:"1rem",fontSize:12,className:"fill-muted-foreground",children:s.month})]})}}),r.jsx(A,{}),r.jsx(c,{dataKey:"desktop",fill:"var(--color-primary)",fillOpacity:.6}),r.jsx(c,{dataKey:"mobile",fill:"var(--color-secondary)"})]})})})}const Mr=()=>r.jsx(u,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Custom Label"}),r.jsx(Nr,{})]})})}),Kr=[{month:"January",desktop:186},{month:"February",desktop:305},{month:"March",desktop:237},{month:"April",desktop:273},{month:"May",desktop:209},{month:"June",desktop:214}],Tr={desktop:{label:"Desktop",color:"var(--chart-1)"}};function Fr(){return r.jsx(r.Fragment,{children:r.jsx(C,{config:Tr,children:r.jsxs(g,{data:Kr,children:[r.jsx(y,{cursor:!1,content:r.jsx(x,{})}),r.jsx(p,{dataKey:"month"}),r.jsx(A,{}),r.jsx(c,{dataKey:"desktop",fill:"var(--color-primary)",fillOpacity:.6})]})})})}const Gr=()=>r.jsx(u,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Default"}),r.jsx(Fr,{})]})})}),Lr=[{month:"January",desktop:186},{month:"February",desktop:305},{month:"March",desktop:237},{month:"April",desktop:273},{month:"May",desktop:209},{month:"June",desktop:214}],Jr={desktop:{label:"Desktop",color:"var(--chart-1)"}};function $r(){return r.jsx(r.Fragment,{children:r.jsx(C,{config:Jr,children:r.jsxs(g,{data:Lr,children:[r.jsx(y,{cursor:!1,content:r.jsx(x,{})}),r.jsx(p,{dataKey:"month"}),r.jsx(A,{}),r.jsx(c,{dataKey:"desktop",fill:"var(--color-secondary)",fillOpacity:.6,dot:{r:4,fillOpacity:1}})]})})})}const wr=()=>r.jsx(u,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Dots"}),r.jsx($r,{})]})})}),Er=[{month:"January",desktop:186},{month:"February",desktop:305},{month:"March",desktop:237},{month:"April",desktop:273},{month:"May",desktop:209},{month:"June",desktop:214}],Sr={desktop:{label:"Desktop",color:"var(--chart-1)"}};function _r(){return r.jsx(r.Fragment,{children:r.jsx(C,{config:Sr,children:r.jsxs(g,{data:Er,children:[r.jsx(y,{cursor:!1,content:r.jsx(x,{hideLabel:!0})}),r.jsx(A,{gridType:"circle"}),r.jsx(p,{dataKey:"month"}),r.jsx(c,{dataKey:"desktop",fill:"var(--color-primary)",fillOpacity:.6,dot:{r:4,fillOpacity:1}})]})})})}const Ir=()=>r.jsx(u,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Grid Circle"}),r.jsx(_r,{})]})})}),Wr=[{month:"January",desktop:186},{month:"February",desktop:285},{month:"March",desktop:237},{month:"April",desktop:203},{month:"May",desktop:209},{month:"June",desktop:264}],Br={desktop:{label:"Desktop",color:"var(--chart-1)"}};function zr(){return r.jsx(r.Fragment,{children:r.jsx(C,{config:Br,children:r.jsxs(g,{data:Wr,children:[r.jsx(y,{cursor:!1,content:r.jsx(x,{})}),r.jsx(A,{className:"fill-(--color-secondary) opacity-20",gridType:"circle"}),r.jsx(p,{dataKey:"month"}),r.jsx(c,{dataKey:"desktop",fill:"var(--color-primary)",fillOpacity:.5})]})})})}const Vr=()=>r.jsx(u,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Grid Circle Filled"}),r.jsx(zr,{})]})})}),qr=[{month:"January",desktop:186},{month:"February",desktop:305},{month:"March",desktop:237},{month:"April",desktop:203},{month:"May",desktop:209},{month:"June",desktop:214}],Hr={desktop:{label:"Desktop",color:"var(--chart-1)"}};function Xr(){return r.jsx(r.Fragment,{children:r.jsx(C,{config:Hr,children:r.jsxs(g,{data:qr,children:[r.jsx(y,{cursor:!1,content:r.jsx(x,{hideLabel:!0})}),r.jsx(A,{gridType:"circle",radialLines:!1}),r.jsx(p,{dataKey:"month"}),r.jsx(c,{dataKey:"desktop",fill:"var(--color-secondary)",fillOpacity:.6,dot:{r:4,fillOpacity:1}})]})})})}const Yr=()=>r.jsx(u,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Grid Circle - No lines"}),r.jsx(Xr,{})]})})}),Qr=[{month:"January",desktop:186},{month:"February",desktop:305},{month:"March",desktop:237},{month:"April",desktop:273},{month:"May",desktop:209},{month:"June",desktop:214}],Ur={desktop:{label:"Desktop",color:"var(--chart-1)"}};function Zr(){return r.jsx(r.Fragment,{children:r.jsx(C,{config:Ur,children:r.jsxs(g,{data:Qr,children:[r.jsx(y,{cursor:!1,content:r.jsx(x,{hideLabel:!0})}),r.jsx(A,{radialLines:!1,polarRadius:[90],strokeWidth:1}),r.jsx(p,{dataKey:"month"}),r.jsx(c,{dataKey:"desktop",fill:"var(--color-primary)",fillOpacity:.6})]})})})}const rt=()=>r.jsx(u,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Grid Custom"}),r.jsx(Zr,{})]})})}),tt=[{month:"January",desktop:186},{month:"February",desktop:285},{month:"March",desktop:237},{month:"April",desktop:203},{month:"May",desktop:209},{month:"June",desktop:264}],at={desktop:{label:"Desktop",color:"var(--chart-1)"}};function ot(){return r.jsx(r.Fragment,{children:r.jsx(C,{config:at,children:r.jsxs(g,{data:tt,children:[r.jsx(y,{cursor:!1,content:r.jsx(x,{hideLabel:!0})}),r.jsx(A,{className:"fill-(--color-secondary) opacity-20"}),r.jsx(p,{dataKey:"month"}),r.jsx(c,{dataKey:"desktop",fill:"var(--color-primary)",fillOpacity:.5})]})})})}const et=()=>r.jsx(u,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Grid Filled"}),r.jsx(ot,{})]})})}),nt=[{month:"January",desktop:186},{month:"February",desktop:305},{month:"March",desktop:237},{month:"April",desktop:273},{month:"May",desktop:209},{month:"June",desktop:214}],it={desktop:{label:"Desktop",color:"var(--chart-1)"}};function st(){return r.jsx(r.Fragment,{children:r.jsx(C,{config:it,children:r.jsxs(g,{data:nt,children:[r.jsx(y,{cursor:!1,content:r.jsx(x,{hideLabel:!0})}),r.jsx(p,{dataKey:"month"}),r.jsx(c,{dataKey:"desktop",fill:"var(--color-secondary)",fillOpacity:.6,dot:{r:4,fillOpacity:1}})]})})})}const lt=()=>r.jsx(u,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Grid None"}),r.jsx(st,{})]})})}),ct=[{month:"January",desktop:186,mobile:80},{month:"February",desktop:305,mobile:200},{month:"March",desktop:237,mobile:120},{month:"April",desktop:73,mobile:190},{month:"May",desktop:209,mobile:130},{month:"June",desktop:214,mobile:140}],dt={desktop:{label:"Desktop",color:"var(--chart-1)"},mobile:{label:"Mobile",color:"var(--chart-2)"}};function ht(){return r.jsx(r.Fragment,{children:r.jsx(C,{config:dt,children:r.jsxs(g,{data:ct,margin:{top:-40,bottom:-10},children:[r.jsx(y,{cursor:!1,content:r.jsx(x,{indicator:"line"})}),r.jsx(p,{dataKey:"month"}),r.jsx(A,{}),r.jsx(c,{dataKey:"desktop",fill:"var(--color-primary)",fillOpacity:.6}),r.jsx(c,{dataKey:"mobile",fill:"var(--color-secondary)"}),r.jsx(sr,{className:"mt-8",content:r.jsx(lr,{})})]})})})}const pt=()=>r.jsx(u,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Legend"}),r.jsx(ht,{})]})})}),mt=[{month:"January",desktop:186,mobile:160},{month:"February",desktop:185,mobile:170},{month:"March",desktop:207,mobile:180},{month:"April",desktop:173,mobile:160},{month:"May",desktop:160,mobile:190},{month:"June",desktop:174,mobile:204}],ft={desktop:{label:"Desktop",color:"var(--chart-1)"},mobile:{label:"Mobile",color:"var(--chart-2)"}};function ut(){return r.jsx(r.Fragment,{children:r.jsx(C,{config:ft,children:r.jsxs(g,{data:mt,children:[r.jsx(y,{cursor:!1,content:r.jsx(x,{indicator:"line"})}),r.jsx(p,{dataKey:"month"}),r.jsx(A,{radialLines:!1}),r.jsx(c,{dataKey:"desktop",fill:"var(--color-primary)",fillOpacity:0,stroke:"var(--color-primary)",strokeWidth:2}),r.jsx(c,{dataKey:"mobile",fill:"var(--color-secondary)",fillOpacity:0,stroke:"var(--color-secondary)",strokeWidth:2})]})})})}const Ct=()=>r.jsx(u,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Lines Only"}),r.jsx(ut,{})]})})}),yt=[{month:"January",desktop:186,mobile:80},{month:"February",desktop:305,mobile:200},{month:"March",desktop:237,mobile:120},{month:"April",desktop:73,mobile:190},{month:"May",desktop:209,mobile:130},{month:"June",desktop:214,mobile:140}],xt={desktop:{label:"Desktop",color:"var(--chart-1)"},mobile:{label:"Mobile",color:"var(--chart-2)"}};function gt(){return r.jsx(r.Fragment,{children:r.jsx(C,{config:xt,children:r.jsxs(g,{data:yt,children:[r.jsx(y,{cursor:!1,content:r.jsx(x,{indicator:"line"})}),r.jsx(p,{dataKey:"month"}),r.jsx(A,{}),r.jsx(c,{dataKey:"desktop",fill:"var(--color-primary)",fillOpacity:.6}),r.jsx(c,{dataKey:"mobile",fill:"var(--color-secondary)"})]})})})}const bt=()=>r.jsx(u,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Multiple"}),r.jsx(gt,{})]})})}),jt=`import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A radar chart with a custom label';\r
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
export default function ChartRadarLabelCustomCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <RadarChart\r
          data={chartData}\r
          margin={{\r
            top: 10,\r
            right: 10,\r
            bottom: 10,\r
            left: 10,\r
          }}\r
        >\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />\r
          <PolarAngleAxis\r
            dataKey="month"\r
            tick={({ x, y, textAnchor, value, index, ...props }) => {\r
              const data = chartData[index];\r
\r
              return (\r
                <text\r
                  x={x}\r
                  y={index === 0 ? y - 10 : y}\r
                  textAnchor={textAnchor}\r
                  fontSize={13}\r
                  fontWeight={500}\r
                  {...props}\r
                >\r
                  <tspan>{data.desktop}</tspan>\r
                  <tspan className="fill-muted-foreground">/</tspan>\r
                  <tspan>{data.mobile}</tspan>\r
                  <tspan x={x} dy={'1rem'} fontSize={12} className="fill-muted-foreground">\r
                    {data.month}\r
                  </tspan>\r
                </text>\r
              );\r
            }}\r
          />\r
\r
          <PolarGrid />\r
          <Radar dataKey="desktop" fill="var(--color-primary)" fillOpacity={0.6} />\r
          <Radar dataKey="mobile" fill="var(--color-secondary)" />\r
        </RadarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,kt=`import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A radar chart';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186 },\r
  { month: 'February', desktop: 305 },\r
  { month: 'March', desktop: 237 },\r
  { month: 'April', desktop: 273 },\r
  { month: 'May', desktop: 209 },\r
  { month: 'June', desktop: 214 },\r
];\r
\r
const chartConfig = {\r
  desktop: {\r
    label: 'Desktop',\r
    color: 'var(--chart-1)',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartRadarDefaultCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <RadarChart data={chartData}>\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />\r
          <PolarAngleAxis dataKey="month" />\r
          <PolarGrid />\r
          <Radar dataKey="desktop" fill="var(--color-primary)" fillOpacity={0.6} />\r
        </RadarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,vt=`import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A radar chart with dots';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186 },\r
  { month: 'February', desktop: 305 },\r
  { month: 'March', desktop: 237 },\r
  { month: 'April', desktop: 273 },\r
  { month: 'May', desktop: 209 },\r
  { month: 'June', desktop: 214 },\r
];\r
\r
const chartConfig = {\r
  desktop: {\r
    label: 'Desktop',\r
    color: 'var(--chart-1)',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartRadarDotsCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <RadarChart data={chartData}>\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />\r
          <PolarAngleAxis dataKey="month" />\r
          <PolarGrid />\r
          <Radar\r
            dataKey="desktop"\r
            fill="var(--color-secondary)"\r
            fillOpacity={0.6}\r
            dot={{\r
              r: 4,\r
              fillOpacity: 1,\r
            }}\r
          />\r
        </RadarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,At=`import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A radar chart with a grid and circle';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186 },\r
  { month: 'February', desktop: 305 },\r
  { month: 'March', desktop: 237 },\r
  { month: 'April', desktop: 273 },\r
  { month: 'May', desktop: 209 },\r
  { month: 'June', desktop: 214 },\r
];\r
\r
const chartConfig = {\r
  desktop: {\r
    label: 'Desktop',\r
    color: 'var(--chart-1)',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartRadarGridCircleCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <RadarChart data={chartData}>\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <PolarGrid gridType="circle" />\r
          <PolarAngleAxis dataKey="month" />\r
          <Radar\r
            dataKey="desktop"\r
            fill="var(--color-primary)"\r
            fillOpacity={0.6}\r
            dot={{\r
              r: 4,\r
              fillOpacity: 1,\r
            }}\r
          />\r
        </RadarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Rt=`import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A radar chart with a grid and circle fill';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186 },\r
  { month: 'February', desktop: 285 },\r
  { month: 'March', desktop: 237 },\r
  { month: 'April', desktop: 203 },\r
  { month: 'May', desktop: 209 },\r
  { month: 'June', desktop: 264 },\r
];\r
\r
const chartConfig = {\r
  desktop: {\r
    label: 'Desktop',\r
    color: 'var(--chart-1)',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartRadarGridCircleFillCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <RadarChart data={chartData}>\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />\r
          <PolarGrid className="fill-(--color-secondary) opacity-20" gridType="circle" />\r
          <PolarAngleAxis dataKey="month" />\r
          <Radar dataKey="desktop" fill="var(--color-primary)" fillOpacity={0.5} />\r
        </RadarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Pt=`import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A radar chart with a grid and circle fill';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186 },\r
  { month: 'February', desktop: 305 },\r
  { month: 'March', desktop: 237 },\r
  { month: 'April', desktop: 203 },\r
  { month: 'May', desktop: 209 },\r
  { month: 'June', desktop: 214 },\r
];\r
\r
const chartConfig = {\r
  desktop: {\r
    label: 'Desktop',\r
    color: 'var(--chart-1)',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartRadarGridCircleNoLinesCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <RadarChart data={chartData}>\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <PolarGrid gridType="circle" radialLines={false} />\r
          <PolarAngleAxis dataKey="month" />\r
          <Radar\r
            dataKey="desktop"\r
            fill="var(--color-secondary)"\r
            fillOpacity={0.6}\r
            dot={{\r
              r: 4,\r
              fillOpacity: 1,\r
            }}\r
          />\r
        </RadarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Dt=`import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A radar chart with a custom grid';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186 },\r
  { month: 'February', desktop: 305 },\r
  { month: 'March', desktop: 237 },\r
  { month: 'April', desktop: 273 },\r
  { month: 'May', desktop: 209 },\r
  { month: 'June', desktop: 214 },\r
];\r
\r
const chartConfig = {\r
  desktop: {\r
    label: 'Desktop',\r
    color: 'var(--chart-1)',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartRadarGridCustomCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <RadarChart data={chartData}>\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <PolarGrid radialLines={false} polarRadius={[90]} strokeWidth={1} />\r
          <PolarAngleAxis dataKey="month" />\r
          <Radar dataKey="desktop" fill="var(--color-primary)" fillOpacity={0.6} />\r
        </RadarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Ot=`import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A radar chart with a grid filled';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186 },\r
  { month: 'February', desktop: 285 },\r
  { month: 'March', desktop: 237 },\r
  { month: 'April', desktop: 203 },\r
  { month: 'May', desktop: 209 },\r
  { month: 'June', desktop: 264 },\r
];\r
\r
const chartConfig = {\r
  desktop: {\r
    label: 'Desktop',\r
    color: 'var(--chart-1)',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartRadarGridFillCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <RadarChart data={chartData}>\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <PolarGrid className="fill-(--color-secondary) opacity-20" />\r
          <PolarAngleAxis dataKey="month" />\r
          <Radar dataKey="desktop" fill="var(--color-primary)" fillOpacity={0.5} />\r
        </RadarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Nt=`import { PolarAngleAxis, Radar, RadarChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A radar chart with no grid';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186 },\r
  { month: 'February', desktop: 305 },\r
  { month: 'March', desktop: 237 },\r
  { month: 'April', desktop: 273 },\r
  { month: 'May', desktop: 209 },\r
  { month: 'June', desktop: 214 },\r
];\r
\r
const chartConfig = {\r
  desktop: {\r
    label: 'Desktop',\r
    color: 'var(--chart-1)',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartRadarGridNoneCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <RadarChart data={chartData}>\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <PolarAngleAxis dataKey="month" />\r
          <Radar\r
            dataKey="desktop"\r
            fill="var(--color-secondary)"\r
            fillOpacity={0.6}\r
            dot={{\r
              r: 4,\r
              fillOpacity: 1,\r
            }}\r
          />\r
        </RadarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Mt=`import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartLegend,\r
  ChartLegendContent,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A radar chart with a legend';\r
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
export default function ChartRadarLegendCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <RadarChart\r
          data={chartData}\r
          margin={{\r
            top: -40,\r
            bottom: -10,\r
          }}\r
        >\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />\r
          <PolarAngleAxis dataKey="month" />\r
          <PolarGrid />\r
          <Radar dataKey="desktop" fill="var(--color-primary)" fillOpacity={0.6} />\r
          <Radar dataKey="mobile" fill="var(--color-secondary)" />\r
          <ChartLegend className="mt-8" content={<ChartLegendContent />} />\r
        </RadarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Kt=`import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A radar chart with lines only';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186, mobile: 160 },\r
  { month: 'February', desktop: 185, mobile: 170 },\r
  { month: 'March', desktop: 207, mobile: 180 },\r
  { month: 'April', desktop: 173, mobile: 160 },\r
  { month: 'May', desktop: 160, mobile: 190 },\r
  { month: 'June', desktop: 174, mobile: 204 },\r
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
export default function ChartRadarLinesOnlyCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <RadarChart data={chartData}>\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />\r
          <PolarAngleAxis dataKey="month" />\r
          <PolarGrid radialLines={false} />\r
          <Radar\r
            dataKey="desktop"\r
            fill="var(--color-primary)"\r
            fillOpacity={0}\r
            stroke="var(--color-primary)"\r
            strokeWidth={2}\r
          />\r
          <Radar\r
            dataKey="mobile"\r
            fill="var(--color-secondary)"\r
            fillOpacity={0}\r
            stroke="var(--color-secondary)"\r
            strokeWidth={2}\r
          />\r
        </RadarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Tt=`import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A radar chart with multiple data';\r
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
export default function ChartRadarMultipleCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <RadarChart data={chartData}>\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />\r
          <PolarAngleAxis dataKey="month" />\r
          <PolarGrid />\r
          <Radar dataKey="desktop" fill="var(--color-primary)" fillOpacity={0.6} />\r
          <Radar dataKey="mobile" fill="var(--color-secondary)" />\r
        </RadarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Ft=[{to:"/",title:"Home"},{href:"",title:"Shadcn Radar Chart"}],ta=()=>r.jsxs(r.Fragment,{children:[r.jsx(mr,{title:"Shadcn Radar Chart",items:Ft}),r.jsxs("div",{className:"grid grid-cols-12 gap-5 sm:gap-7",children:[r.jsxs("div",{className:"col-span-12",children:[r.jsx(Gr,{}),r.jsx(f,{children:kt})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(wr,{}),r.jsx(f,{children:vt})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(Ct,{}),r.jsx(f,{children:Kt})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(Mr,{}),r.jsx(f,{children:jt})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(rt,{}),r.jsx(f,{children:Dt})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(lt,{}),r.jsx(f,{children:Nt})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(Ir,{}),r.jsx(f,{children:At})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(Yr,{}),r.jsx(f,{children:Pt})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(Vr,{}),r.jsx(f,{children:Rt})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(et,{}),r.jsx(f,{children:Ot})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(bt,{}),r.jsx(f,{children:Tt})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(pt,{}),r.jsx(f,{children:Mt})]})]})]});export{ta as default};
