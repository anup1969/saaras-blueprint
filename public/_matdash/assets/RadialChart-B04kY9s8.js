import{R as y,a1 as or,r as Ar,j as t}from"./index-DnCCvGy7.js";import{C as N}from"./card-sr3AlwUz.js";import{U as wr,f as nr,w as sr,A as Sr,a as J,L as $,d as xr,t as Z,G as Or,a2 as Pr,a3 as kr,P as Br,O as Nr,a4 as Dr,g as Lr,a5 as lr,a6 as Tr,S as Er,j as _r,X as Kr,l as D,n as F,o as G,x as tr}from"./chart-wRt-l7TC.js";import{P as $r,a as M}from"./PolarAngleAxis-CPpHYwP-.js";import{K as Ir,N as cr}from"./isPlainObject-DyoSkCXQ.js";import{P as er}from"./PolarGrid-B0vE_Byt.js";import{B as Vr}from"./BreadcrumbComp-CkvqLna6.js";import{C as k}from"./CodeDialog-CpkCWLkI.js";import"./tiny-invariant-BaFNuDhB.js";import"./string-B_3o-8jJ.js";import"./toString-FKUU45JO.js";import"./CardBox-BlybE14U.js";import"./chevron-right-KgmLBFR_.js";import"./createLucideIcon-Cw6eFU3v.js";import"./index-CfcantPz.js";import"./vsc-dark-plus-DCm8Deni.js";import"./highlight-UM_loo16.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";function _(r){"@babel/helpers - typeof";return _=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_(r)}function rr(){return rr=Object.assign?Object.assign.bind():function(r){for(var a=1;a<arguments.length;a++){var i=arguments[a];for(var e in i)Object.prototype.hasOwnProperty.call(i,e)&&(r[e]=i[e])}return r},rr.apply(this,arguments)}function dr(r,a){var i=Object.keys(r);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(r);a&&(e=e.filter(function(o){return Object.getOwnPropertyDescriptor(r,o).enumerable})),i.push.apply(i,e)}return i}function Q(r){for(var a=1;a<arguments.length;a++){var i=arguments[a]!=null?arguments[a]:{};a%2?dr(Object(i),!0).forEach(function(e){Fr(r,e,i[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(i)):dr(Object(i)).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(i,e))})}return r}function Fr(r,a,i){return a=Gr(a),a in r?Object.defineProperty(r,a,{value:i,enumerable:!0,configurable:!0,writable:!0}):r[a]=i,r}function Gr(r){var a=Mr(r,"string");return _(a)=="symbol"?a:a+""}function Mr(r,a){if(_(r)!="object"||!r)return r;var i=r[Symbol.toPrimitive];if(i!==void 0){var e=i.call(r,a);if(_(e)!="object")return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return(a==="string"?String:Number)(r)}function fr(r){return typeof r=="string"?parseInt(r,10):r}function zr(r,a){var i="".concat(a.cx||r.cx),e=Number(i),o="".concat(a.cy||r.cy),n=Number(o);return Q(Q(Q({},a),r),{},{cx:e,cy:n})}function hr(r){return y.createElement(wr,rr({shapeType:"sector",propTransformer:zr},r))}var Wr=["shape","activeShape","activeIndex","cornerRadius"],qr=["value","background"];function B(r){"@babel/helpers - typeof";return B=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},B(r)}function I(){return I=Object.assign?Object.assign.bind():function(r){for(var a=1;a<arguments.length;a++){var i=arguments[a];for(var e in i)Object.prototype.hasOwnProperty.call(i,e)&&(r[e]=i[e])}return r},I.apply(this,arguments)}function ur(r,a){var i=Object.keys(r);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(r);a&&(e=e.filter(function(o){return Object.getOwnPropertyDescriptor(r,o).enumerable})),i.push.apply(i,e)}return i}function l(r){for(var a=1;a<arguments.length;a++){var i=arguments[a]!=null?arguments[a]:{};a%2?ur(Object(i),!0).forEach(function(e){A(r,e,i[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(i)):ur(Object(i)).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(i,e))})}return r}function pr(r,a){if(r==null)return{};var i=Hr(r,a),e,o;if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);for(o=0;o<n.length;o++)e=n[o],!(a.indexOf(e)>=0)&&Object.prototype.propertyIsEnumerable.call(r,e)&&(i[e]=r[e])}return i}function Hr(r,a){if(r==null)return{};var i={};for(var e in r)if(Object.prototype.hasOwnProperty.call(r,e)){if(a.indexOf(e)>=0)continue;i[e]=r[e]}return i}function Ur(r,a){if(!(r instanceof a))throw new TypeError("Cannot call a class as a function")}function mr(r,a){for(var i=0;i<a.length;i++){var e=a[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(r,yr(e.key),e)}}function Xr(r,a,i){return a&&mr(r.prototype,a),i&&mr(r,i),Object.defineProperty(r,"prototype",{writable:!1}),r}function Jr(r,a,i){return a=V(a),Qr(r,gr()?Reflect.construct(a,i||[],V(r).constructor):a.apply(r,i))}function Qr(r,a){if(a&&(B(a)==="object"||typeof a=="function"))return a;if(a!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return Yr(r)}function Yr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function gr(){try{var r=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(gr=function(){return!!r})()}function V(r){return V=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(i){return i.__proto__||Object.getPrototypeOf(i)},V(r)}function Zr(r,a){if(typeof a!="function"&&a!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(a&&a.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),Object.defineProperty(r,"prototype",{writable:!1}),a&&ar(r,a)}function ar(r,a){return ar=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,o){return e.__proto__=o,e},ar(r,a)}function A(r,a,i){return a=yr(a),a in r?Object.defineProperty(r,a,{value:i,enumerable:!0,configurable:!0,writable:!0}):r[a]=i,r}function yr(r){var a=ra(r,"string");return B(a)=="symbol"?a:a+""}function ra(r,a){if(B(r)!="object"||!r)return r;var i=r[Symbol.toPrimitive];if(i!==void 0){var e=i.call(r,a);if(B(e)!="object")return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(r)}var v=function(r){function a(){var i;Ur(this,a);for(var e=arguments.length,o=new Array(e),n=0;n<e;n++)o[n]=arguments[n];return i=Jr(this,a,[].concat(o)),A(i,"state",{isAnimationFinished:!1}),A(i,"handleAnimationEnd",function(){var s=i.props.onAnimationEnd;i.setState({isAnimationFinished:!0}),cr(s)&&s()}),A(i,"handleAnimationStart",function(){var s=i.props.onAnimationStart;i.setState({isAnimationFinished:!1}),cr(s)&&s()}),i}return Zr(a,r),Xr(a,[{key:"getDeltaAngle",value:function(){var e=this.props,o=e.startAngle,n=e.endAngle,s=Z(n-o),c=Math.min(Math.abs(n-o),360);return s*c}},{key:"renderSectorsStatically",value:function(e){var o=this,n=this.props,s=n.shape,c=n.activeShape,u=n.activeIndex,d=n.cornerRadius,p=pr(n,Wr),x=nr(p,!1);return e.map(function(C,f){var g=f===u,h=l(l(l(l({},x),{},{cornerRadius:fr(d)},C),sr(o.props,C,f)),{},{className:"recharts-radial-bar-sector ".concat(C.className),forceCornerRadius:p.forceCornerRadius,cornerIsExternal:p.cornerIsExternal,isActive:g,option:g?c:s});return y.createElement(hr,I({},h,{key:"sector-".concat(f)}))})}},{key:"renderSectorsWithAnimation",value:function(){var e=this,o=this.props,n=o.data,s=o.isAnimationActive,c=o.animationBegin,u=o.animationDuration,d=o.animationEasing,p=o.animationId,x=this.state.prevData;return y.createElement(Sr,{begin:c,duration:u,isActive:s,easing:d,from:{t:0},to:{t:1},key:"radialBar-".concat(p),onAnimationStart:this.handleAnimationStart,onAnimationEnd:this.handleAnimationEnd},function(C){var f=C.t,g=n.map(function(h,T){var w=x&&x[T];if(w){var z=J(w.startAngle,h.startAngle),b=J(w.endAngle,h.endAngle);return l(l({},h),{},{startAngle:z(f),endAngle:b(f)})}var K=h.endAngle,W=h.startAngle,q=J(W,K);return l(l({},h),{},{endAngle:q(f)})});return y.createElement($,null,e.renderSectorsStatically(g))})}},{key:"renderSectors",value:function(){var e=this.props,o=e.data,n=e.isAnimationActive,s=this.state.prevData;return n&&o&&o.length&&(!s||!Ir(s,o))?this.renderSectorsWithAnimation():this.renderSectorsStatically(o)}},{key:"renderBackground",value:function(e){var o=this,n=this.props.cornerRadius,s=nr(this.props.background,!1);return e.map(function(c,u){c.value;var d=c.background,p=pr(c,qr);if(!d)return null;var x=l(l(l(l(l({cornerRadius:fr(n)},p),{},{fill:"#eee"},d),s),sr(o.props,c,u)),{},{index:u,className:or("recharts-radial-bar-background-sector",s==null?void 0:s.className),option:d,isActive:!1});return y.createElement(hr,I({},x,{key:"sector-".concat(u)}))})}},{key:"render",value:function(){var e=this.props,o=e.hide,n=e.data,s=e.className,c=e.background,u=e.isAnimationActive;if(o||!n||!n.length)return null;var d=this.state.isAnimationFinished,p=or("recharts-area",s);return y.createElement($,{className:p},c&&y.createElement($,{className:"recharts-radial-bar-background"},this.renderBackground(n)),y.createElement($,{className:"recharts-radial-bar-sectors"},this.renderSectors()),(!u||d)&&xr.renderCallByParent(l({},this.props),n))}}],[{key:"getDerivedStateFromProps",value:function(e,o){return e.animationId!==o.prevAnimationId?{prevAnimationId:e.animationId,curData:e.data,prevData:o.curData}:e.data!==o.curData?{curData:e.data}:null}}])}(Ar.PureComponent);A(v,"displayName","RadialBar");A(v,"defaultProps",{angleAxisId:0,radiusAxisId:0,minPointSize:0,hide:!1,legendType:"rect",data:[],isAnimationActive:!Or.isSsr,animationBegin:0,animationDuration:1500,animationEasing:"ease",forceCornerRadius:!1,cornerIsExternal:!1});A(v,"getComposedData",function(r){var a=r.item,i=r.props,e=r.radiusAxis,o=r.radiusAxisTicks,n=r.angleAxis,s=r.angleAxisTicks,c=r.displayedData,u=r.dataKey,d=r.stackedData,p=r.barPosition,x=r.bandSize,C=r.dataStartIndex,f=Pr(p,a);if(!f)return null;var g=n.cx,h=n.cy,T=i.layout,w=a.props,z=w.children,b=w.minPointSize,K=T==="radial"?n:e,W=d?K.scale.domain():null,q=kr({numericAxis:K}),H=Br(z,Nr),Cr=c.map(function(S,E){var m,j,R,O,P,ir;if(d?m=Dr(d[C+E],W):(m=Lr(S,u),Array.isArray(m)||(m=[q,m])),T==="radial"){j=lr({axis:e,ticks:o,bandSize:x,offset:f.offset,entry:S,index:E}),P=n.scale(m[1]),O=n.scale(m[0]),R=j+f.size;var U=P-O;if(Math.abs(b)>0&&Math.abs(U)<Math.abs(b)){var jr=Z(U||b)*(Math.abs(b)-Math.abs(U));P+=jr}ir={background:{cx:g,cy:h,innerRadius:j,outerRadius:R,startAngle:i.startAngle,endAngle:i.endAngle}}}else{j=e.scale(m[0]),R=e.scale(m[1]),O=lr({axis:n,ticks:s,bandSize:x,offset:f.offset,entry:S,index:E}),P=O+f.size;var X=R-j;if(Math.abs(b)>0&&Math.abs(X)<Math.abs(b)){var Rr=Z(X||b)*(Math.abs(b)-Math.abs(X));R+=Rr}}return l(l(l(l({},S),ir),{},{payload:S,value:d?m:m[1],cx:g,cy:h,innerRadius:j,outerRadius:R,startAngle:O,endAngle:P},H&&H[E]&&H[E].props),{},{tooltipPayload:[Tr(a,S)],tooltipPosition:Er(g,h,(j+R)/2,(O+P)/2)})});return{data:Cr,layout:T}});var L=_r({chartName:"RadialBarChart",GraphicalChild:v,legendContent:"children",defaultTooltipEventType:"axis",validateTooltipEventTypes:["axis","item"],axisComponents:[{axisType:"angleAxis",AxisComp:$r},{axisType:"radiusAxis",AxisComp:M}],formatAxisMap:Kr,defaultProps:{layout:"radial",startAngle:0,endAngle:360,cx:"50%",cy:"50%",innerRadius:0,outerRadius:"80%"}});const aa=[{browser:"chrome",visitors:275,fill:"var(--color-primary)"},{browser:"safari",visitors:200,fill:"var(--color-secondary)"},{browser:"firefox",visitors:187,fill:"var(--color-warning)"},{browser:"edge",visitors:173,fill:"var(--color-error)"},{browser:"other",visitors:90,fill:"var(--color-info)"}],ta={visitors:{label:"Visitors"},chrome:{label:"Chrome",color:"var(--chart-1)"},safari:{label:"Safari",color:"var(--chart-2)"},firefox:{label:"Firefox",color:"var(--chart-3)"},edge:{label:"Edge",color:"var(--chart-4)"},other:{label:"Other",color:"var(--chart-5)"}};function ea(){return t.jsx(t.Fragment,{children:t.jsx(D,{config:ta,children:t.jsxs(L,{data:aa,innerRadius:30,outerRadius:110,children:[t.jsx(F,{cursor:!1,content:t.jsx(G,{hideLabel:!0,nameKey:"browser"})}),t.jsx(v,{dataKey:"visitors",background:!0})]})})})}const ia=()=>t.jsx(N,{className:"p-0",children:t.jsx("div",{children:t.jsxs("div",{className:"p-6",children:[t.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Default"}),t.jsx(ea,{})]})})}),oa=[{browser:"chrome",visitors:275,fill:"var(--color-primary)"},{browser:"safari",visitors:200,fill:"var(--color-secondary)"},{browser:"firefox",visitors:187,fill:"var(--color-warning)"},{browser:"edge",visitors:173,fill:"var(--color-error)"},{browser:"other",visitors:90,fill:"var(--color-info)"}],na={visitors:{label:"Visitors"},chrome:{label:"Chrome",color:"var(--chart-1)"},safari:{label:"Safari",color:"var(--chart-2)"},firefox:{label:"Firefox",color:"var(--chart-3)"},edge:{label:"Edge",color:"var(--chart-4)"},other:{label:"Other",color:"var(--chart-5)"}};function sa(){return t.jsx(t.Fragment,{children:t.jsx(D,{config:na,children:t.jsxs(L,{data:oa,innerRadius:30,outerRadius:100,children:[t.jsx(F,{cursor:!1,content:t.jsx(G,{hideLabel:!0,nameKey:"browser"})}),t.jsx(er,{gridType:"circle"}),t.jsx(v,{dataKey:"visitors"})]})})})}const la=()=>t.jsx(N,{className:"p-0",children:t.jsx("div",{children:t.jsxs("div",{className:"p-6",children:[t.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Grid"}),t.jsx(sa,{})]})})}),ca=[{browser:"chrome",visitors:275,fill:"var(--color-primary)"},{browser:"safari",visitors:200,fill:"var(--color-secondary)"},{browser:"firefox",visitors:187,fill:"var(--color-warning)"},{browser:"edge",visitors:173,fill:"var(--color-error)"},{browser:"other",visitors:90,fill:"var(--color-info)"}],da={visitors:{label:"Visitors"},chrome:{label:"Chrome",color:"var(--chart-1)"},safari:{label:"Safari",color:"var(--chart-2)"},firefox:{label:"Firefox",color:"var(--chart-3)"},edge:{label:"Edge",color:"var(--chart-4)"},other:{label:"Other",color:"var(--chart-5)"}};function fa(){return t.jsx(t.Fragment,{children:t.jsx(D,{config:da,children:t.jsxs(L,{data:ca,startAngle:-90,endAngle:380,innerRadius:30,outerRadius:110,children:[t.jsx(F,{cursor:!1,content:t.jsx(G,{hideLabel:!0,nameKey:"browser"})}),t.jsx(v,{dataKey:"visitors",background:!0,children:t.jsx(xr,{position:"insideStart",dataKey:"browser",className:"fill-white capitalize mix-blend-luminosity",fontSize:11})})]})})})}const ha=()=>t.jsx(N,{className:"p-0",children:t.jsx("div",{children:t.jsxs("div",{className:"p-6",children:[t.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Label"}),t.jsx(fa,{})]})})}),vr=[{browser:"safari",visitors:1260,fill:"var(--color-secondary)"}],ua={visitors:{label:"Visitors"},safari:{label:"Safari",color:"var(--chart-2)"}};function pa(){return t.jsx(t.Fragment,{children:t.jsx(D,{config:ua,children:t.jsxs(L,{data:vr,endAngle:100,innerRadius:80,outerRadius:140,children:[t.jsx(er,{gridType:"circle",radialLines:!1,stroke:"none",className:"first:fill-muted last:fill-lightsecondary dark:last:fill-lightsecondary",polarRadius:[86,74]}),t.jsx(v,{dataKey:"visitors",background:!0}),t.jsx(M,{tick:!1,tickLine:!1,axisLine:!1,children:t.jsx(tr,{content:({viewBox:r})=>{if(r&&"cx"in r&&"cy"in r)return t.jsxs("text",{x:r.cx,y:r.cy,textAnchor:"middle",dominantBaseline:"middle",children:[t.jsx("tspan",{x:r.cx,y:r.cy,className:"fill-foreground text-4xl font-bold",children:vr[0].visitors.toLocaleString()}),t.jsx("tspan",{x:r.cx,y:(r.cy||0)+24,className:"fill-muted-foreground",children:"Visitors"})]})}})})]})})})}const ma=()=>t.jsx(N,{className:"p-0",children:t.jsx("div",{children:t.jsxs("div",{className:"p-6",children:[t.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Shape"}),t.jsx(pa,{})]})})}),Y=[{month:"january",desktop:1260,mobile:570}],va={desktop:{label:"Desktop",color:"var(--chart-1)"},mobile:{label:"Mobile",color:"var(--chart-2)"}};function ba(){const r=Y[0].desktop+Y[0].mobile;return t.jsx(t.Fragment,{children:t.jsx(D,{config:va,children:t.jsxs(L,{data:Y,endAngle:180,innerRadius:80,outerRadius:130,children:[t.jsx(F,{cursor:!1,content:t.jsx(G,{hideLabel:!0})}),t.jsx(M,{tick:!1,tickLine:!1,axisLine:!1,children:t.jsx(tr,{content:({viewBox:a})=>{if(a&&"cx"in a&&"cy"in a)return t.jsxs("text",{x:a.cx,y:a.cy,textAnchor:"middle",children:[t.jsx("tspan",{x:a.cx,y:(a.cy||0)-16,className:"fill-foreground text-2xl font-bold",children:r.toLocaleString()}),t.jsx("tspan",{x:a.cx,y:(a.cy||0)+4,className:"fill-muted-foreground",children:"Visitors"})]})}})}),t.jsx(v,{dataKey:"desktop",stackId:"a",cornerRadius:5,fill:"var(--color-primary)",className:"stroke-transparent stroke-2"}),t.jsx(v,{dataKey:"mobile",fill:"var(--color-secondary)",stackId:"a",cornerRadius:5,className:"stroke-transparent stroke-2"})]})})})}const xa=()=>t.jsx(N,{className:"p-0",children:t.jsx("div",{children:t.jsxs("div",{className:"p-6",children:[t.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Stacked"}),t.jsx(ba,{})]})})}),br=[{browser:"safari",visitors:200,fill:"var(--color-primary)"}],ga={visitors:{label:"Visitors"},safari:{label:"Safari",color:"var(--chart-2)"}};function ya(){return t.jsx(t.Fragment,{children:t.jsx(D,{config:ga,children:t.jsxs(L,{data:br,startAngle:0,endAngle:250,innerRadius:80,outerRadius:110,children:[t.jsx(er,{gridType:"circle",radialLines:!1,stroke:"none",className:"first:fill-muted last:fill-lightprimary dark:last:fill-lightprimary",polarRadius:[86,74]}),t.jsx(v,{dataKey:"visitors",background:!0,cornerRadius:10}),t.jsx(M,{tick:!1,tickLine:!1,axisLine:!1,children:t.jsx(tr,{content:({viewBox:r})=>{if(r&&"cx"in r&&"cy"in r)return t.jsxs("text",{x:r.cx,y:r.cy,textAnchor:"middle",dominantBaseline:"middle",children:[t.jsx("tspan",{x:r.cx,y:r.cy,className:"fill-foreground text-4xl font-bold",children:br[0].visitors.toLocaleString()}),t.jsx("tspan",{x:r.cx,y:(r.cy||0)+24,className:"fill-muted-foreground",children:"Visitors"})]})}})})]})})})}const Ca=()=>t.jsx(N,{className:"p-0",children:t.jsx("div",{children:t.jsxs("div",{className:"p-6",children:[t.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Text"}),t.jsx(ya,{})]})})}),ja=`import { RadialBar, RadialBarChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A radial chart';\r
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
export default function ChartRadialSimpleCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>\r
          <ChartTooltip\r
            cursor={false}\r
            content={<ChartTooltipContent hideLabel nameKey="browser" />}\r
          />\r
          <RadialBar dataKey="visitors" background />\r
        </RadialBarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Ra=`import { PolarGrid, RadialBar, RadialBarChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A radial chart with a grid';\r
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
export default function ChartRadialGridCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <RadialBarChart data={chartData} innerRadius={30} outerRadius={100}>\r
          <ChartTooltip\r
            cursor={false}\r
            content={<ChartTooltipContent hideLabel nameKey="browser" />}\r
          />\r
          <PolarGrid gridType="circle" />\r
          <RadialBar dataKey="visitors" />\r
        </RadialBarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Aa=`import { LabelList, RadialBar, RadialBarChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A radial chart with a label';\r
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
export default function ChartRadialLabelCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <RadialBarChart\r
          data={chartData}\r
          startAngle={-90}\r
          endAngle={380}\r
          innerRadius={30}\r
          outerRadius={110}\r
        >\r
          <ChartTooltip\r
            cursor={false}\r
            content={<ChartTooltipContent hideLabel nameKey="browser" />}\r
          />\r
          <RadialBar dataKey="visitors" background>\r
            <LabelList\r
              position="insideStart"\r
              dataKey="browser"\r
              className="fill-white capitalize mix-blend-luminosity"\r
              fontSize={11}\r
            />\r
          </RadialBar>\r
        </RadialBarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,wa=`import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';\r
import { ChartConfig, ChartContainer } from 'src/components/ui/chart';\r
\r
export const description = 'A radial chart with a custom shape';\r
\r
const chartData = [{ browser: 'safari', visitors: 1260, fill: 'var(--color-secondary)' }];\r
\r
const chartConfig = {\r
  visitors: {\r
    label: 'Visitors',\r
  },\r
  safari: {\r
    label: 'Safari',\r
    color: 'var(--chart-2)',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartRadialShapeCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <RadialBarChart data={chartData} endAngle={100} innerRadius={80} outerRadius={140}>\r
          <PolarGrid\r
            gridType="circle"\r
            radialLines={false}\r
            stroke="none"\r
            className="first:fill-muted last:fill-lightsecondary dark:last:fill-lightsecondary"\r
            polarRadius={[86, 74]}\r
          />\r
          <RadialBar dataKey="visitors" background />\r
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>\r
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
                        className="fill-foreground text-4xl font-bold"\r
                      >\r
                        {chartData[0].visitors.toLocaleString()}\r
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
          </PolarRadiusAxis>\r
        </RadialBarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Sa=`import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A radial chart with stacked sections';\r
\r
const chartData = [{ month: 'january', desktop: 1260, mobile: 570 }];\r
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
export default function ChartRadialStackedCode() {\r
  const totalVisitors = chartData[0].desktop + chartData[0].mobile;\r
\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <RadialBarChart data={chartData} endAngle={180} innerRadius={80} outerRadius={130}>\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>\r
            <Label\r
              content={({ viewBox }) => {\r
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {\r
                  return (\r
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">\r
                      <tspan\r
                        x={viewBox.cx}\r
                        y={(viewBox.cy || 0) - 16}\r
                        className="fill-foreground text-2xl font-bold"\r
                      >\r
                        {totalVisitors.toLocaleString()}\r
                      </tspan>\r
                      <tspan\r
                        x={viewBox.cx}\r
                        y={(viewBox.cy || 0) + 4}\r
                        className="fill-muted-foreground"\r
                      >\r
                        Visitors\r
                      </tspan>\r
                    </text>\r
                  );\r
                }\r
              }}\r
            />\r
          </PolarRadiusAxis>\r
          <RadialBar\r
            dataKey="desktop"\r
            stackId="a"\r
            cornerRadius={5}\r
            fill="var(--color-primary)"\r
            className="stroke-transparent stroke-2"\r
          />\r
          <RadialBar\r
            dataKey="mobile"\r
            fill="var(--color-secondary)"\r
            stackId="a"\r
            cornerRadius={5}\r
            className="stroke-transparent stroke-2"\r
          />\r
        </RadialBarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Oa=`import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';\r
import { ChartConfig, ChartContainer } from 'src/components/ui/chart';\r
\r
export const description = 'A radial chart with text';\r
\r
const chartData = [{ browser: 'safari', visitors: 200, fill: 'var(--color-primary)' }];\r
\r
const chartConfig = {\r
  visitors: {\r
    label: 'Visitors',\r
  },\r
  safari: {\r
    label: 'Safari',\r
    color: 'var(--chart-2)',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartRadialText() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <RadialBarChart\r
          data={chartData}\r
          startAngle={0}\r
          endAngle={250}\r
          innerRadius={80}\r
          outerRadius={110}\r
        >\r
          <PolarGrid\r
            gridType="circle"\r
            radialLines={false}\r
            stroke="none"\r
            className="first:fill-muted last:fill-lightprimary dark:last:fill-lightprimary"\r
            polarRadius={[86, 74]}\r
          />\r
          <RadialBar dataKey="visitors" background cornerRadius={10} />\r
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>\r
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
                        className="fill-foreground text-4xl font-bold"\r
                      >\r
                        {chartData[0].visitors.toLocaleString()}\r
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
          </PolarRadiusAxis>\r
        </RadialBarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Pa=[{to:"/",title:"Home"},{href:"",title:"Shadcn Radial Chart"}],Ja=()=>t.jsxs(t.Fragment,{children:[t.jsx(Vr,{title:"Shadcn Radial Chart",items:Pa}),t.jsxs("div",{className:"grid grid-cols-12 gap-5 sm:gap-7",children:[t.jsxs("div",{className:"col-span-12",children:[t.jsx(ia,{}),t.jsx(k,{children:ja})]}),t.jsxs("div",{className:"col-span-12",children:[t.jsx(ha,{}),t.jsx(k,{children:Aa})]}),t.jsxs("div",{className:"col-span-12",children:[t.jsx(la,{}),t.jsx(k,{children:Ra})]}),t.jsxs("div",{className:"col-span-12",children:[t.jsx(Ca,{}),t.jsx(k,{children:Oa})]}),t.jsxs("div",{className:"col-span-12",children:[t.jsx(ma,{}),t.jsx(k,{children:wa})]}),t.jsxs("div",{className:"col-span-12",children:[t.jsx(xa,{}),t.jsx(k,{children:Sa})]})]})]});export{Ja as default};
