import{j as r}from"./index-CW78-08q.js";import{C as e}from"./react-apexcharts.min-DXK-UJZE.js";import{T as o}from"./TitleBorderCard-10aFKYwE.js";import{B as a}from"./BreadcrumbComp-mrdJNCbj.js";import{C as i}from"./CodeDialog-DRC5ECma.js";import"./card-BmJIY3HQ.js";import"./CardBox-CJgwgOI2.js";import"./chevron-right-B2L8yKO6.js";import"./createLucideIcon-BxwgNh2l.js";import"./index-DaNAaBSr.js";import"./vsc-dark-plus-CoILpeng.js";import"./highlight-DCblhEs5.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";const s=()=>{const t={series:[{name:"Likes",data:[4,3,10,9,35,19,22,9,12,7,19,5,13,9,17,2,7,5]}],chart:{type:"line",height:350,fontFamily:"inherit",foreColor:"#adb0bb",toolbar:{show:!1},dropShadow:{enabled:!0,color:"rgba(0,0,0,0.2)",top:12,left:4,blur:3,opacity:.4}},stroke:{width:7,curve:"smooth"},xaxis:{type:"datetime",categories:["1/11/2000","2/11/2000","3/11/2000","4/11/2000","5/11/2000","6/11/2000","7/11/2000","8/11/2000","9/11/2000","10/11/2000","11/11/2000","12/11/2000","1/11/2001","2/11/2001","3/11/2001","4/11/2001","5/11/2001","6/11/2001"],axisBorder:{color:"rgba(173,181,189,0.3)"}},fill:{type:"gradient",gradient:{shade:"dark",gradientToColors:["#0b70fb"],shadeIntensity:1,type:"horizontal",opacityFrom:1,opacityTo:.9,stops:[0,100,100,100]}},markers:{size:4,opacity:.9,colors:["#4e79ff"],strokeColor:"#fff",strokeWidth:2,hover:{size:7}},yaxis:{min:0,max:40},grid:{show:!1},tooltip:{theme:"light"}};return r.jsx(r.Fragment,{children:r.jsx(o,{title:"Gradient Chart",children:r.jsx(e,{options:t,series:t.series,type:"line",height:"350px",width:"100%"})})})},h=`import Chart from 'react-apexcharts';\r
import TitleCard from '../../shared/TitleBorderCard';\r
const ApexGradientChart = () => {\r
  const ChartData: any = {\r
    series: [\r
      {\r
        name: 'Likes',\r
        data: [4, 3, 10, 9, 35, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],\r
      },\r
    ],\r
    chart: {\r
      type: 'line',\r
      height: 350,\r
      fontFamily: \`inherit\`,\r
      foreColor: '#adb0bb',\r
      toolbar: {\r
        show: false,\r
      },\r
      dropShadow: {\r
        enabled: true,\r
        color: 'rgba(0,0,0,0.2)',\r
        top: 12,\r
        left: 4,\r
        blur: 3,\r
        opacity: 0.4,\r
      },\r
    },\r
    stroke: {\r
      width: 7,\r
      curve: 'smooth',\r
    },\r
\r
    xaxis: {\r
      type: 'datetime',\r
      categories: [\r
        '1/11/2000',\r
        '2/11/2000',\r
        '3/11/2000',\r
        '4/11/2000',\r
        '5/11/2000',\r
        '6/11/2000',\r
        '7/11/2000',\r
        '8/11/2000',\r
        '9/11/2000',\r
        '10/11/2000',\r
        '11/11/2000',\r
        '12/11/2000',\r
        '1/11/2001',\r
        '2/11/2001',\r
        '3/11/2001',\r
        '4/11/2001',\r
        '5/11/2001',\r
        '6/11/2001',\r
      ],\r
      axisBorder: {\r
        color: 'rgba(173,181,189,0.3)',\r
      },\r
    },\r
    fill: {\r
      type: 'gradient',\r
      gradient: {\r
        shade: 'dark',\r
        gradientToColors: ['#0b70fb'],\r
        shadeIntensity: 1,\r
        type: 'horizontal',\r
        opacityFrom: 1,\r
        opacityTo: 0.9,\r
        stops: [0, 100, 100, 100],\r
      },\r
    },\r
    markers: {\r
      size: 4,\r
      opacity: 0.9,\r
      colors: ['#4e79ff'],\r
      strokeColor: '#fff',\r
      strokeWidth: 2,\r
\r
      hover: {\r
        size: 7,\r
      },\r
    },\r
    yaxis: {\r
      min: 0,\r
      max: 40,\r
    },\r
    grid: {\r
      show: false,\r
    },\r
    tooltip: {\r
      theme: 'light',\r
    },\r
  };\r
  return (\r
    <>\r
      <TitleCard title="Gradient Chart">\r
        <Chart\r
          options={ChartData}\r
          series={ChartData.series}\r
          type="line"\r
          height="350px"\r
          width="100%"\r
        />\r
      </TitleCard>\r
    </>\r
  );\r
};\r
\r
export default ApexGradientChart;\r
`,d=[{to:"/",title:"Home"},{href:"",title:"Chart Apex Gradient"}],G=()=>r.jsxs(r.Fragment,{children:[r.jsx(a,{title:"Chart Apex Gradient",items:d}),r.jsx(s,{}),r.jsx(i,{children:h})]});export{G as default};
