import{j as r}from"./index-B0HXAnM_.js";import{C as t}from"./react-apexcharts.min-CD0TzzRm.js";import{T as a}from"./TitleBorderCard-b7O1ZjMg.js";import{C as o}from"./CodeDialog-C1N4vVlG.js";import{B as s}from"./BreadcrumbComp-9UXnI3U7.js";import"./card-Cg1w-DhQ.js";import"./index-BfJfxS1b.js";import"./vsc-dark-plus-C_odMC5h.js";import"./highlight-hCPzqiPq.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./CardBox-DnrW3_OL.js";import"./chevron-right-CYEh_jNb.js";import"./createLucideIcon-9FnylcZ7.js";const i=()=>{const e={series:[{name:"Sales Summery 1",data:[31,40,28,51,42,109,100]},{name:"Sales Summery 2",data:[11,32,45,32,34,52,41]}],chart:{id:"area-chart",fontFamily:"inherit",foreColor:"#adb0bb",zoom:{enabled:!0},toolbar:{show:!1}},dataLabels:{enabled:!1},fill:{type:"gradient",gradient:{shadeIntensity:0,inverseColors:!1,opacityFrom:.2,opacity:.1,stops:[100]}},stroke:{width:"3",curve:"smooth"},colors:["var(--color-primary)","var(--color-secondary)"],xaxis:{type:"datetime",categories:["2018-09-19T00:00:00","2018-09-19T01:30:00","2018-09-19T02:30:00","2018-09-19T03:30:00","2018-09-19T04:30:00","2018-09-19T05:30:00","2018-09-19T06:30:00"],axisBorder:{color:"rgba(173,181,189,0.3)"}},yaxis:{opposite:!1,labels:{show:!0}},legend:{show:!0,position:"bottom",width:"50px"},grid:{show:!1},tooltip:{theme:"dark",fillSeriesColor:!1}};return r.jsx(r.Fragment,{children:r.jsx(a,{title:"Area Chart",children:r.jsx(t,{options:e,series:e.series,type:"area",height:"300px",width:"100%"})})})},l=`import Chart from 'react-apexcharts';\r
import TitleCard from '../../shared/TitleBorderCard';\r
\r
const ApexAreaChart = () => {\r
  const ChartData: any = {\r
    series: [\r
      {\r
        name: 'Sales Summery 1',\r
        data: [31, 40, 28, 51, 42, 109, 100],\r
      },\r
      {\r
        name: 'Sales Summery 2',\r
        data: [11, 32, 45, 32, 34, 52, 41],\r
      },\r
    ],\r
    chart: {\r
      id: 'area-chart',\r
      fontFamily: \`inherit\`,\r
      foreColor: '#adb0bb',\r
      zoom: {\r
        enabled: true,\r
      },\r
      toolbar: {\r
        show: false,\r
      },\r
    },\r
    dataLabels: {\r
      enabled: false,\r
    },\r
    fill: {\r
      type: 'gradient',\r
      gradient: {\r
        shadeIntensity: 0,\r
        inverseColors: false,\r
        opacityFrom: 0.2,\r
        opacity: 0.1,\r
        stops: [100],\r
      },\r
    },\r
    stroke: {\r
      width: '3',\r
      curve: 'smooth',\r
    },\r
    colors: ['var(--color-primary)', 'var(--color-secondary)'],\r
    xaxis: {\r
      type: 'datetime',\r
      categories: [\r
        '2018-09-19T00:00:00',\r
        '2018-09-19T01:30:00',\r
        '2018-09-19T02:30:00',\r
        '2018-09-19T03:30:00',\r
        '2018-09-19T04:30:00',\r
        '2018-09-19T05:30:00',\r
        '2018-09-19T06:30:00',\r
      ],\r
      axisBorder: {\r
        color: 'rgba(173,181,189,0.3)',\r
      },\r
    },\r
    yaxis: {\r
      opposite: false,\r
      labels: {\r
        show: true,\r
      },\r
    },\r
    legend: {\r
      show: true,\r
      position: 'bottom',\r
      width: '50px',\r
    },\r
    grid: {\r
      show: false,\r
    },\r
    tooltip: {\r
      theme: 'dark',\r
      fillSeriesColor: false,\r
    },\r
  };\r
  return (\r
    <>\r
      <TitleCard title="Area Chart">\r
        <Chart\r
          options={ChartData}\r
          series={ChartData.series}\r
          type="area"\r
          height="300px"\r
          width="100%"\r
        />\r
      </TitleCard>\r
    </>\r
  );\r
};\r
\r
export default ApexAreaChart;\r
`,m=[{to:"/",title:"Home"},{href:"",title:"Chart Apex Area"}],j=()=>r.jsxs(r.Fragment,{children:[r.jsx(s,{title:"Chart Apex Area",items:m}),r.jsx(i,{}),r.jsx(o,{children:l})]});export{j as default};
