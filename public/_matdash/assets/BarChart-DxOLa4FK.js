import{j as r,r as C}from"./index-DnCCvGy7.js";import{C as i}from"./card-sr3AlwUz.js";import{j,N as t,k as L,l as s,n as l,o as d,R as B,d as b,O as A,p as M,q as D}from"./chart-wRt-l7TC.js";import{X as n,Y as k,C as h}from"./YAxis-DkuqefYw.js";import{B as N}from"./BreadcrumbComp-CkvqLna6.js";import{C as o}from"./CodeDialog-CpkCWLkI.js";import"./isPlainObject-DyoSkCXQ.js";import"./toString-FKUU45JO.js";import"./tiny-invariant-BaFNuDhB.js";import"./string-B_3o-8jJ.js";import"./CardBox-BlybE14U.js";import"./chevron-right-KgmLBFR_.js";import"./createLucideIcon-Cw6eFU3v.js";import"./index-CfcantPz.js";import"./vsc-dark-plus-DCm8Deni.js";import"./highlight-UM_loo16.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";var c=j({chartName:"BarChart",GraphicalChild:t,defaultTooltipEventType:"axis",validateTooltipEventTypes:["axis","item"],axisComponents:[{axisType:"xAxis",AxisComp:n},{axisType:"yAxis",AxisComp:k}],formatAxisMap:L});const K=[{browser:"chrome",visitors:187,fill:"var(--color-primary)"},{browser:"safari",visitors:200,fill:"var(--color-secondary)"},{browser:"firefox",visitors:275,fill:"var(--color-warning)"},{browser:"edge",visitors:173,fill:"var(--color-error)"},{browser:"other",visitors:90,fill:"var(--color-info)"}],x={visitors:{label:"Visitors"},chrome:{label:"Chrome"},safari:{label:"Safari"},firefox:{label:"Firefox"},edge:{label:"Edge"},other:{label:"Other"}};function S(){return r.jsx(r.Fragment,{children:r.jsx(s,{config:x,children:r.jsxs(c,{accessibilityLayer:!0,data:K,barSize:30,children:[r.jsx(h,{vertical:!1}),r.jsx(n,{dataKey:"browser",tickLine:!1,tickMargin:10,axisLine:!1,tickFormatter:e=>{var p;return(p=x[e])==null?void 0:p.label}}),r.jsx(l,{cursor:!1,content:r.jsx(d,{hideLabel:!0})}),r.jsx(t,{dataKey:"visitors",strokeWidth:2,radius:8,activeIndex:2,activeBar:({...e})=>r.jsx(B,{...e,fillOpacity:.8,stroke:e.payload.fill,strokeDasharray:4,strokeDashoffset:4})})]})})})}const T=()=>r.jsx(i,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Active"}),r.jsx(S,{})]})})}),F=[{month:"January",desktop:186,mobile:80},{month:"February",desktop:305,mobile:200},{month:"March",desktop:237,mobile:120},{month:"April",desktop:73,mobile:190},{month:"May",desktop:209,mobile:130},{month:"June",desktop:214,mobile:140}],w={desktop:{label:"Desktop"},mobile:{label:"Mobile"},label:{color:"var(--background)"}};function J(){return r.jsx(r.Fragment,{children:r.jsx(s,{config:w,children:r.jsxs(c,{accessibilityLayer:!0,data:F,barSize:30,layout:"vertical",margin:{right:16},children:[r.jsx(h,{horizontal:!1}),r.jsx(k,{dataKey:"month",type:"category",tickLine:!1,tickMargin:10,axisLine:!1,tickFormatter:e=>e.slice(0,3),hide:!0}),r.jsx(n,{dataKey:"desktop",type:"number",hide:!0}),r.jsx(l,{cursor:!1,content:r.jsx(d,{indicator:"line"})}),r.jsxs(t,{dataKey:"desktop",layout:"vertical",fill:"var(--color-primary)",radius:4,children:[r.jsx(b,{dataKey:"month",position:"insideLeft",offset:8,className:"fill-(--color-white)",fontSize:12}),r.jsx(b,{dataKey:"desktop",position:"right",offset:8,className:"fill-foreground",fontSize:12})]})]})})})}const z=()=>r.jsx(i,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Custom Label"}),r.jsx(J,{})]})})}),$=[{month:"January",desktop:186},{month:"February",desktop:305},{month:"March",desktop:237},{month:"April",desktop:73},{month:"May",desktop:209},{month:"June",desktop:214},{month:"July",desktop:186},{month:"August",desktop:305},{month:"september",desktop:237}],G={desktop:{label:"Desktop"}};function X(){return r.jsx(r.Fragment,{children:r.jsx(s,{config:G,children:r.jsxs(c,{accessibilityLayer:!0,data:$,barSize:30,children:[r.jsx(h,{vertical:!1}),r.jsx(n,{dataKey:"month",tickLine:!1,tickMargin:10,axisLine:!1,tickFormatter:e=>e.slice(0,3)}),r.jsx(l,{cursor:!1,content:r.jsx(d,{hideLabel:!0})}),r.jsx(t,{dataKey:"desktop",fill:"var(--color-primary)",radius:8})]})})})}const I=()=>r.jsx(i,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Default"}),r.jsx(X,{})]})})}),O=[{month:"January",desktop:186},{month:"February",desktop:305},{month:"March",desktop:237},{month:"April",desktop:73},{month:"May",desktop:209},{month:"June",desktop:214}],E={desktop:{label:"Desktop"}};function R(){return r.jsx(r.Fragment,{children:r.jsx(s,{config:E,children:r.jsxs(c,{accessibilityLayer:!0,data:O,barSize:30,layout:"vertical",margin:{left:-20},children:[r.jsx(n,{type:"number",dataKey:"desktop",hide:!0}),r.jsx(k,{dataKey:"month",type:"category",tickLine:!1,tickMargin:10,axisLine:!1,tickFormatter:e=>e.slice(0,3)}),r.jsx(l,{cursor:!1,content:r.jsx(d,{hideLabel:!0})}),r.jsx(t,{dataKey:"desktop",fill:"var(--color-secondary)",radius:5})]})})})}const V=()=>r.jsx(i,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Horizontal"}),r.jsx(R,{})]})})}),f=[{date:"2024-04-01",desktop:222,mobile:150},{date:"2024-04-02",desktop:97,mobile:180},{date:"2024-04-03",desktop:167,mobile:120},{date:"2024-04-04",desktop:242,mobile:260},{date:"2024-04-05",desktop:373,mobile:290},{date:"2024-04-06",desktop:301,mobile:340},{date:"2024-04-07",desktop:245,mobile:180},{date:"2024-04-08",desktop:409,mobile:320},{date:"2024-04-09",desktop:59,mobile:110},{date:"2024-04-10",desktop:261,mobile:190},{date:"2024-04-11",desktop:327,mobile:350},{date:"2024-04-12",desktop:292,mobile:210},{date:"2024-04-13",desktop:342,mobile:380},{date:"2024-04-14",desktop:137,mobile:220},{date:"2024-04-15",desktop:120,mobile:170},{date:"2024-04-16",desktop:138,mobile:190},{date:"2024-04-17",desktop:446,mobile:360},{date:"2024-04-18",desktop:364,mobile:410},{date:"2024-04-19",desktop:243,mobile:180},{date:"2024-04-20",desktop:89,mobile:150},{date:"2024-04-21",desktop:137,mobile:200},{date:"2024-04-22",desktop:224,mobile:170},{date:"2024-04-23",desktop:138,mobile:230},{date:"2024-04-24",desktop:387,mobile:290},{date:"2024-04-25",desktop:215,mobile:250},{date:"2024-04-26",desktop:75,mobile:130},{date:"2024-04-27",desktop:383,mobile:420},{date:"2024-04-28",desktop:122,mobile:180},{date:"2024-04-29",desktop:315,mobile:240},{date:"2024-04-30",desktop:454,mobile:380},{date:"2024-05-01",desktop:165,mobile:220},{date:"2024-05-02",desktop:293,mobile:310},{date:"2024-05-03",desktop:247,mobile:190},{date:"2024-05-04",desktop:385,mobile:420},{date:"2024-05-05",desktop:481,mobile:390},{date:"2024-05-06",desktop:498,mobile:520},{date:"2024-05-07",desktop:388,mobile:300},{date:"2024-05-08",desktop:149,mobile:210},{date:"2024-05-09",desktop:227,mobile:180},{date:"2024-05-10",desktop:293,mobile:330},{date:"2024-05-11",desktop:335,mobile:270},{date:"2024-05-12",desktop:197,mobile:240},{date:"2024-05-13",desktop:197,mobile:160},{date:"2024-05-14",desktop:448,mobile:490},{date:"2024-05-15",desktop:473,mobile:380},{date:"2024-05-16",desktop:338,mobile:400},{date:"2024-05-17",desktop:499,mobile:420},{date:"2024-05-18",desktop:315,mobile:350},{date:"2024-05-19",desktop:235,mobile:180},{date:"2024-05-20",desktop:177,mobile:230},{date:"2024-05-21",desktop:82,mobile:140},{date:"2024-05-22",desktop:81,mobile:120},{date:"2024-05-23",desktop:252,mobile:290},{date:"2024-05-24",desktop:294,mobile:220},{date:"2024-05-25",desktop:201,mobile:250},{date:"2024-05-26",desktop:213,mobile:170},{date:"2024-05-27",desktop:420,mobile:460},{date:"2024-05-28",desktop:233,mobile:190},{date:"2024-05-29",desktop:78,mobile:130},{date:"2024-05-30",desktop:340,mobile:280},{date:"2024-05-31",desktop:178,mobile:230},{date:"2024-06-01",desktop:178,mobile:200},{date:"2024-06-02",desktop:470,mobile:410},{date:"2024-06-03",desktop:103,mobile:160},{date:"2024-06-04",desktop:439,mobile:380},{date:"2024-06-05",desktop:88,mobile:140},{date:"2024-06-06",desktop:294,mobile:250},{date:"2024-06-07",desktop:323,mobile:370},{date:"2024-06-08",desktop:385,mobile:320},{date:"2024-06-09",desktop:438,mobile:480},{date:"2024-06-10",desktop:155,mobile:200},{date:"2024-06-11",desktop:92,mobile:150},{date:"2024-06-12",desktop:492,mobile:420},{date:"2024-06-13",desktop:81,mobile:130},{date:"2024-06-14",desktop:426,mobile:380},{date:"2024-06-15",desktop:307,mobile:350},{date:"2024-06-16",desktop:371,mobile:310},{date:"2024-06-17",desktop:475,mobile:520},{date:"2024-06-18",desktop:107,mobile:170},{date:"2024-06-19",desktop:341,mobile:290},{date:"2024-06-20",desktop:408,mobile:450},{date:"2024-06-21",desktop:169,mobile:210},{date:"2024-06-22",desktop:317,mobile:270},{date:"2024-06-23",desktop:480,mobile:530},{date:"2024-06-24",desktop:132,mobile:180},{date:"2024-06-25",desktop:141,mobile:190},{date:"2024-06-26",desktop:434,mobile:380},{date:"2024-06-27",desktop:448,mobile:490},{date:"2024-06-28",desktop:149,mobile:200},{date:"2024-06-29",desktop:103,mobile:160},{date:"2024-06-30",desktop:446,mobile:400}],u={views:{label:"Page Views"},desktop:{label:"Desktop",color:"var(--color-primary)"},mobile:{label:"Mobile",color:"var(--color-secondary)"}};function Y(){const[e,p]=C.useState("desktop"),g=C.useMemo(()=>({desktop:f.reduce((a,m)=>a+m.desktop,0),mobile:f.reduce((a,m)=>a+m.mobile,0)}),[]);return r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"flex border border-ld rounded-md",children:["desktop","mobile"].map(a=>{const m=a;return r.jsxs("button",{"data-active":e===m,className:"data-[active=true]:bg-lightprimary dark:data-[active=true]:bg-darkprimary relative z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left text-ld sm:px-8 sm:py-6",onClick:()=>p(m),children:[r.jsx("span",{className:"text-muted-foreground text-xs",children:u[m].label}),r.jsx("span",{className:"text-lg text-ld leading-none font-bold sm:text-3xl",children:g[a].toLocaleString()})]},m)})}),r.jsx(s,{config:u,children:r.jsxs(c,{accessibilityLayer:!0,data:f,margin:{left:12,right:12},children:[r.jsx(h,{vertical:!1}),r.jsx(n,{dataKey:"date",tickLine:!1,axisLine:!1,tickMargin:8,minTickGap:32,tickFormatter:a=>new Date(a).toLocaleDateString("en-US",{month:"short",day:"numeric"})}),r.jsx(l,{content:r.jsx(d,{className:"w-[150px]",nameKey:"views",labelFormatter:a=>new Date(a).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})})}),r.jsx(t,{dataKey:e,fill:`var(--color-${e})`})]})})]})}const H=()=>r.jsx(i,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Interactive"}),r.jsx(Y,{})]})})}),U=[{month:"January",desktop:186},{month:"February",desktop:305},{month:"March",desktop:237},{month:"April",desktop:73},{month:"May",desktop:209},{month:"June",desktop:214},{month:"July",desktop:190},{month:"August",desktop:260},{month:"September",desktop:178}],P={desktop:{label:"Desktop"}};function W(){return r.jsx(r.Fragment,{children:r.jsx(s,{config:P,children:r.jsxs(c,{accessibilityLayer:!0,data:U,barSize:30,margin:{top:20},children:[r.jsx(h,{vertical:!1}),r.jsx(n,{dataKey:"month",tickLine:!1,tickMargin:10,axisLine:!1,tickFormatter:e=>e.slice(0,3)}),r.jsx(l,{cursor:!1,content:r.jsx(d,{hideLabel:!0})}),r.jsx(t,{dataKey:"desktop",fill:"var(--color-secondary)",radius:8,children:r.jsx(b,{position:"top",offset:12,className:"fill-foreground",fontSize:12})})]})})})}const q=()=>r.jsx(i,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Label"}),r.jsx(W,{})]})})}),Q=[{browser:"chrome",visitors:275,fill:"var(--color-primary)"},{browser:"safari",visitors:200,fill:"var(--color-secondary)"},{browser:"firefox",visitors:187,fill:"var(--color-warning)"},{browser:"edge",visitors:173,fill:"var(--color-error)"},{browser:"other",visitors:90,fill:"var(--color-info)"}],y={visitors:{label:"Visitors"},chrome:{label:"Chrome"},safari:{label:"Safari"},firefox:{label:"Firefox"},edge:{label:"Edge"},other:{label:"Other"}};function Z(){return r.jsx(r.Fragment,{children:r.jsx(s,{config:y,children:r.jsxs(c,{accessibilityLayer:!0,data:Q,barSize:30,layout:"vertical",margin:{left:0},children:[r.jsx(k,{dataKey:"browser",type:"category",tickLine:!1,tickMargin:10,axisLine:!1,tickFormatter:e=>{var p;return(p=y[e])==null?void 0:p.label}}),r.jsx(n,{dataKey:"visitors",type:"number",hide:!0}),r.jsx(l,{cursor:!1,content:r.jsx(d,{hideLabel:!0})}),r.jsx(t,{dataKey:"visitors",layout:"vertical",radius:5})]})})})}const _=()=>r.jsx(i,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Mixed"}),r.jsx(Z,{})]})})}),rr=[{month:"January",desktop:186,mobile:80},{month:"February",desktop:305,mobile:200},{month:"March",desktop:237,mobile:120},{month:"April",desktop:73,mobile:190},{month:"May",desktop:209,mobile:130},{month:"June",desktop:214,mobile:140},{month:"July",desktop:198,mobile:150},{month:"August",desktop:225,mobile:160},{month:"September",desktop:245,mobile:170}],er={desktop:{label:"Desktop"},mobile:{label:"Mobile"}};function tr(){return r.jsx(r.Fragment,{children:r.jsx(s,{config:er,children:r.jsxs(c,{accessibilityLayer:!0,data:rr,barSize:30,children:[r.jsx(h,{vertical:!1}),r.jsx(n,{dataKey:"month",tickLine:!1,tickMargin:10,axisLine:!1,tickFormatter:e=>e.slice(0,3)}),r.jsx(l,{cursor:!1,content:r.jsx(d,{indicator:"dashed"})}),r.jsx(t,{dataKey:"desktop",fill:"var(--color-primary)",radius:4}),r.jsx(t,{dataKey:"mobile",fill:"var(--color-secondary)",radius:4})]})})})}const ar=()=>r.jsx(i,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Multiple"}),r.jsx(tr,{})]})})}),v=[{month:"January",visitors:186},{month:"February",visitors:205},{month:"March",visitors:-207},{month:"April",visitors:173},{month:"May",visitors:-209},{month:"June",visitors:214},{month:"July",visitors:-180},{month:"August",visitors:230},{month:"September",visitors:-160}],or={visitors:{label:"Visitors"}};function ir(){return r.jsx(r.Fragment,{children:r.jsx(s,{config:or,children:r.jsxs(c,{accessibilityLayer:!0,data:v,barSize:30,children:[r.jsx(h,{vertical:!1}),r.jsx(l,{cursor:!1,content:r.jsx(d,{hideLabel:!0,hideIndicator:!0})}),r.jsxs(t,{dataKey:"visitors",children:[r.jsx(b,{position:"top",dataKey:"month",fillOpacity:1}),v.map(e=>r.jsx(A,{fill:e.visitors>0?"var(--color-primary)":"var(--color-secondary)"},e.month))]})]})})})}const sr=()=>r.jsx(i,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Negative"}),r.jsx(ir,{})]})})}),lr=[{month:"January",desktop:186,mobile:80},{month:"February",desktop:305,mobile:200},{month:"March",desktop:237,mobile:120},{month:"April",desktop:73,mobile:190},{month:"May",desktop:209,mobile:130},{month:"June",desktop:214,mobile:140},{month:"July",desktop:190,mobile:175},{month:"August",desktop:250,mobile:145},{month:"September",desktop:198,mobile:160}],dr={desktop:{label:"Desktop"},mobile:{label:"Mobile"}};function nr(){return r.jsx(r.Fragment,{children:r.jsx(s,{config:dr,children:r.jsxs(c,{accessibilityLayer:!0,data:lr,barSize:30,children:[r.jsx(h,{vertical:!1}),r.jsx(n,{dataKey:"month",tickLine:!1,tickMargin:10,axisLine:!1,tickFormatter:e=>e.slice(0,3)}),r.jsx(l,{content:r.jsx(d,{hideLabel:!0})}),r.jsx(M,{content:r.jsx(D,{})}),r.jsx(t,{dataKey:"desktop",stackId:"a",fill:"var(--color-primary)",radius:[0,0,4,4]}),r.jsx(t,{dataKey:"mobile",stackId:"a",fill:"var(--color-secondary)",radius:[4,4,0,0]})]})})})}const cr=()=>r.jsx(i,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Stacked + Legend"}),r.jsx(nr,{})]})})}),mr=`import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A bar chart with an active bar';\r
\r
const chartData = [\r
  { browser: 'chrome', visitors: 187, fill: 'var(--color-primary)' },\r
  { browser: 'safari', visitors: 200, fill: 'var(--color-secondary)' },\r
  { browser: 'firefox', visitors: 275, fill: 'var(--color-warning)' },\r
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
  },\r
  safari: {\r
    label: 'Safari',\r
  },\r
  firefox: {\r
    label: 'Firefox',\r
  },\r
  edge: {\r
    label: 'Edge',\r
  },\r
  other: {\r
    label: 'Other',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartBarActiveCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <BarChart accessibilityLayer data={chartData} barSize={30}>\r
          <CartesianGrid vertical={false} />\r
          <XAxis\r
            dataKey="browser"\r
            tickLine={false}\r
            tickMargin={10}\r
            axisLine={false}\r
            tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}\r
          />\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <Bar\r
            dataKey="visitors"\r
            strokeWidth={2}\r
            radius={8}\r
            activeIndex={2}\r
            activeBar={({ ...props }) => {\r
              return (\r
                <Rectangle\r
                  {...props}\r
                  fillOpacity={0.8}\r
                  stroke={props.payload.fill}\r
                  strokeDasharray={4}\r
                  strokeDashoffset={4}\r
                />\r
              );\r
            }}\r
          />\r
        </BarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,hr=`import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A bar chart with a custom label';\r
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
  label: {\r
    color: 'var(--background)',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartBarLabelCustomCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <BarChart\r
          accessibilityLayer\r
          data={chartData}\r
          barSize={30}\r
          layout="vertical"\r
          margin={{\r
            right: 16,\r
          }}\r
        >\r
          <CartesianGrid horizontal={false} />\r
          <YAxis\r
            dataKey="month"\r
            type="category"\r
            tickLine={false}\r
            tickMargin={10}\r
            axisLine={false}\r
            tickFormatter={(value) => value.slice(0, 3)}\r
            hide\r
          />\r
          <XAxis dataKey="desktop" type="number" hide />\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />\r
          <Bar dataKey="desktop" layout="vertical" fill="var(--color-primary)" radius={4}>\r
            <LabelList\r
              dataKey="month"\r
              position="insideLeft"\r
              offset={8}\r
              className="fill-(--color-white)"\r
              fontSize={12}\r
            />\r
            <LabelList\r
              dataKey="desktop"\r
              position="right"\r
              offset={8}\r
              className="fill-foreground"\r
              fontSize={12}\r
            />\r
          </Bar>\r
        </BarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,pr=`import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A bar chart';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186 },\r
  { month: 'February', desktop: 305 },\r
  { month: 'March', desktop: 237 },\r
  { month: 'April', desktop: 73 },\r
  { month: 'May', desktop: 209 },\r
  { month: 'June', desktop: 214 },\r
  { month: 'July', desktop: 186 },\r
  { month: 'August', desktop: 305 },\r
  { month: 'september', desktop: 237 },\r
];\r
\r
const chartConfig = {\r
  desktop: {\r
    label: 'Desktop',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartBarDefaultCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <BarChart accessibilityLayer data={chartData} barSize={30}>\r
          <CartesianGrid vertical={false} />\r
          <XAxis\r
            dataKey="month"\r
            tickLine={false}\r
            tickMargin={10}\r
            axisLine={false}\r
            tickFormatter={(value) => value.slice(0, 3)}\r
          />\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <Bar dataKey="desktop" fill="var(--color-primary)" radius={8} />\r
        </BarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,br=`import { Bar, BarChart, XAxis, YAxis } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A horizontal bar chart';\r
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
export default function ChartBarHorizontalCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <BarChart\r
          accessibilityLayer\r
          data={chartData}\r
          barSize={30}\r
          layout="vertical"\r
          margin={{\r
            left: -20,\r
          }}\r
        >\r
          <XAxis type="number" dataKey="desktop" hide />\r
          <YAxis\r
            dataKey="month"\r
            type="category"\r
            tickLine={false}\r
            tickMargin={10}\r
            axisLine={false}\r
            tickFormatter={(value) => value.slice(0, 3)}\r
          />\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <Bar dataKey="desktop" fill="var(--color-secondary)" radius={5} />\r
        </BarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,kr=`import * as React from 'react';\r
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'An interactive bar chart';\r
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
export default function ChartBarInteractiveCode() {\r
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
              className="data-[active=true]:bg-lightprimary dark:data-[active=true]:bg-darkprimary relative z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left text-ld sm:px-8 sm:py-6"\r
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
        <BarChart\r
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
          <Bar dataKey={activeChart} fill={\`var(--color-\${activeChart})\`} />\r
        </BarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,fr=`import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A bar chart with a label';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186 },\r
  { month: 'February', desktop: 305 },\r
  { month: 'March', desktop: 237 },\r
  { month: 'April', desktop: 73 },\r
  { month: 'May', desktop: 209 },\r
  { month: 'June', desktop: 214 },\r
  { month: 'July', desktop: 190 },\r
  { month: 'August', desktop: 260 },\r
  { month: 'September', desktop: 178 },\r
];\r
\r
const chartConfig = {\r
  desktop: {\r
    label: 'Desktop',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartBarLabelCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <BarChart\r
          accessibilityLayer\r
          data={chartData}\r
          barSize={30}\r
          margin={{\r
            top: 20,\r
          }}\r
        >\r
          <CartesianGrid vertical={false} />\r
          <XAxis\r
            dataKey="month"\r
            tickLine={false}\r
            tickMargin={10}\r
            axisLine={false}\r
            tickFormatter={(value) => value.slice(0, 3)}\r
          />\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <Bar dataKey="desktop" fill="var(--color-secondary)" radius={8}>\r
            <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />\r
          </Bar>\r
        </BarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,Cr=`import { Bar, BarChart, XAxis, YAxis } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A mixed bar chart';\r
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
  },\r
  safari: {\r
    label: 'Safari',\r
  },\r
  firefox: {\r
    label: 'Firefox',\r
  },\r
  edge: {\r
    label: 'Edge',\r
  },\r
  other: {\r
    label: 'Other',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartBarMixedCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <BarChart\r
          accessibilityLayer\r
          data={chartData}\r
          barSize={30}\r
          layout="vertical"\r
          margin={{\r
            left: 0,\r
          }}\r
        >\r
          <YAxis\r
            dataKey="browser"\r
            type="category"\r
            tickLine={false}\r
            tickMargin={10}\r
            axisLine={false}\r
            tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}\r
          />\r
          <XAxis dataKey="visitors" type="number" hide />\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />\r
          <Bar dataKey="visitors" layout="vertical" radius={5} />\r
        </BarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,xr=`import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A multiple bar chart';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186, mobile: 80 },\r
  { month: 'February', desktop: 305, mobile: 200 },\r
  { month: 'March', desktop: 237, mobile: 120 },\r
  { month: 'April', desktop: 73, mobile: 190 },\r
  { month: 'May', desktop: 209, mobile: 130 },\r
  { month: 'June', desktop: 214, mobile: 140 },\r
  { month: 'July', desktop: 198, mobile: 150 },\r
  { month: 'August', desktop: 225, mobile: 160 },\r
  { month: 'September', desktop: 245, mobile: 170 },\r
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
export default function ChartBarMultipleCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <BarChart accessibilityLayer data={chartData} barSize={30}>\r
          <CartesianGrid vertical={false} />\r
          <XAxis\r
            dataKey="month"\r
            tickLine={false}\r
            tickMargin={10}\r
            axisLine={false}\r
            tickFormatter={(value) => value.slice(0, 3)}\r
          />\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />\r
          <Bar dataKey="desktop" fill="var(--color-primary)" radius={4} />\r
          <Bar dataKey="mobile" fill="var(--color-secondary)" radius={4} />\r
        </BarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,ur=`import { Bar, BarChart, CartesianGrid, Cell, LabelList } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A bar chart with negative values';\r
\r
const chartData = [\r
  { month: 'January', visitors: 186 },\r
  { month: 'February', visitors: 205 },\r
  { month: 'March', visitors: -207 },\r
  { month: 'April', visitors: 173 },\r
  { month: 'May', visitors: -209 },\r
  { month: 'June', visitors: 214 },\r
  { month: 'July', visitors: -180 },\r
  { month: 'August', visitors: 230 },\r
  { month: 'September', visitors: -160 },\r
];\r
\r
const chartConfig = {\r
  visitors: {\r
    label: 'Visitors',\r
  },\r
} satisfies ChartConfig;\r
\r
export default function ChartBarNegativeCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <BarChart accessibilityLayer data={chartData} barSize={30}>\r
          <CartesianGrid vertical={false} />\r
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel hideIndicator />} />\r
          <Bar dataKey="visitors">\r
            <LabelList position="top" dataKey="month" fillOpacity={1} />\r
            {chartData.map((item) => (\r
              <Cell\r
                key={item.month}\r
                fill={item.visitors > 0 ? 'var(--color-primary)' : 'var(--color-secondary)'}\r
              />\r
            ))}\r
          </Bar>\r
        </BarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,yr=`import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';\r
import {\r
  ChartConfig,\r
  ChartContainer,\r
  ChartLegend,\r
  ChartLegendContent,\r
  ChartTooltip,\r
  ChartTooltipContent,\r
} from 'src/components/ui/chart';\r
\r
export const description = 'A stacked bar chart with a legend';\r
\r
const chartData = [\r
  { month: 'January', desktop: 186, mobile: 80 },\r
  { month: 'February', desktop: 305, mobile: 200 },\r
  { month: 'March', desktop: 237, mobile: 120 },\r
  { month: 'April', desktop: 73, mobile: 190 },\r
  { month: 'May', desktop: 209, mobile: 130 },\r
  { month: 'June', desktop: 214, mobile: 140 },\r
  { month: 'July', desktop: 190, mobile: 175 },\r
  { month: 'August', desktop: 250, mobile: 145 },\r
  { month: 'September', desktop: 198, mobile: 160 },\r
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
export default function ChartBarStackedCode() {\r
  return (\r
    <>\r
      <ChartContainer config={chartConfig}>\r
        <BarChart accessibilityLayer data={chartData} barSize={30}>\r
          <CartesianGrid vertical={false} />\r
          <XAxis\r
            dataKey="month"\r
            tickLine={false}\r
            tickMargin={10}\r
            axisLine={false}\r
            tickFormatter={(value) => value.slice(0, 3)}\r
          />\r
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />\r
          <ChartLegend content={<ChartLegendContent />} />\r
          <Bar dataKey="desktop" stackId="a" fill="var(--color-primary)" radius={[0, 0, 4, 4]} />\r
          <Bar dataKey="mobile" stackId="a" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />\r
        </BarChart>\r
      </ChartContainer>\r
    </>\r
  );\r
}\r
`,vr=[{to:"/",title:"Home"},{href:"",title:"Shadcn Bar Chart"}],Er=()=>r.jsxs(r.Fragment,{children:[r.jsx(N,{title:"Shadcn Bar Chart",items:vr}),r.jsxs("div",{className:"grid grid-cols-12 gap-5 sm:gap-7",children:[r.jsxs("div",{className:"col-span-12",children:[r.jsx(I,{}),r.jsx(o,{children:pr})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(V,{}),r.jsx(o,{children:br})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(ar,{}),r.jsx(o,{children:xr})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(cr,{}),r.jsx(o,{children:yr})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(q,{}),r.jsx(o,{children:fr})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(z,{}),r.jsx(o,{children:hr})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(_,{}),r.jsx(o,{children:Cr})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(T,{}),r.jsx(o,{children:mr})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(sr,{}),r.jsx(o,{children:ur})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(H,{}),r.jsx(o,{children:kr})]})]})]});export{Er as default};
