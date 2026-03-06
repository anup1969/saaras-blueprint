import{j as r}from"./index-B0HXAnM_.js";import{C as e}from"./react-apexcharts.min-CD0TzzRm.js";import{T as a}from"./TitleBorderCard-b7O1ZjMg.js";import{B as i}from"./BreadcrumbComp-9UXnI3U7.js";import{C as s}from"./CodeDialog-C1N4vVlG.js";import"./card-Cg1w-DhQ.js";import"./CardBox-DnrW3_OL.js";import"./chevron-right-CYEh_jNb.js";import"./createLucideIcon-9FnylcZ7.js";import"./index-BfJfxS1b.js";import"./vsc-dark-plus-C_odMC5h.js";import"./highlight-hCPzqiPq.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";const l=()=>{const o={series:[44,55,41,17,15],chart:{type:"donut",height:300,fontFamily:"inherit",foreColor:"#adb0bb"},dataLabels:{enabled:!1},plotOptions:{pie:{donut:{size:"70px"}}},stroke:{width:2,colors:"var(--color-surface-ld)"},legend:{show:!0,position:"bottom",width:"50px"},colors:["var(--color-info)","var(--color-primary)","var(--color-error)","var(--color-success)","var(--color-warning )"],responsive:[{breakpoint:480,options:{chart:{width:200},legend:{position:"bottom"}}}]},t={series:[44,55,13,43,22],chart:{type:"pie",height:300,fontFamily:"inherit",foreColor:"#adb0bb",toolbar:{show:!1}},dataLabels:{enabled:!1},plotOptions:{pie:{donut:{size:"70px"}}},legend:{show:!0,position:"bottom",width:"50px"},colors:["var(--color-info)","var(--color-primary)","var(--color-error)","var(--color-success)","var(--color-warning )"],tooltip:{fillSeriesColor:!1},stroke:{width:2,colors:"var(--color-surface-ld)"},labels:["Team A","Team B","Team C","Team D","Team E"],responsive:[{breakpoint:480,options:{chart:{width:200},legend:{position:"bottom"}}}]};return r.jsx(r.Fragment,{children:r.jsxs("div",{className:"grid grid-cols-12 gap-[30px]",children:[r.jsx("div",{className:"md:col-span-6 col-span-12",children:r.jsx(a,{title:"Donut Chart",children:r.jsx(e,{options:o,series:o.series,type:"donut",height:"300px",width:"100%"})})}),r.jsx("div",{className:"md:col-span-6 col-span-12",children:r.jsx(a,{title:"Pie Chart",children:r.jsx(e,{options:t,series:t.series,type:"pie",height:"300px",width:"100%"})})})]})})},n=`import Chart from 'react-apexcharts';\r
import TitleCard from '../../shared/TitleBorderCard';\r
\r
const ApexDoughnutChart = () => {\r
  const ChartData1: any = {\r
    series: [44, 55, 41, 17, 15],\r
    chart: {\r
      type: 'donut',\r
      height: 300,\r
      fontFamily: \`inherit\`,\r
      foreColor: '#adb0bb',\r
    },\r
    dataLabels: {\r
      enabled: false,\r
    },\r
    plotOptions: {\r
      pie: {\r
        donut: {\r
          size: '70px',\r
        },\r
      },\r
    },\r
    stroke: {\r
      width: 2,\r
      colors: 'var(--color-surface-ld)',\r
    },\r
    legend: {\r
      show: true,\r
      position: 'bottom',\r
      width: '50px',\r
    },\r
    colors: [\r
      'var(--color-info)',\r
      'var(--color-primary)',\r
      'var(--color-error)',\r
      'var(--color-success)',\r
      'var(--color-warning )',\r
    ],\r
    responsive: [\r
      {\r
        breakpoint: 480,\r
        options: {\r
          chart: {\r
            width: 200,\r
          },\r
          legend: {\r
            position: 'bottom',\r
          },\r
        },\r
      },\r
    ],\r
  };\r
\r
  const ChartData2: any = {\r
    series: [44, 55, 13, 43, 22],\r
    chart: {\r
      type: 'pie',\r
      height: 300,\r
      fontFamily: \`inherit\`,\r
      foreColor: '#adb0bb',\r
      toolbar: {\r
        show: false,\r
      },\r
    },\r
    dataLabels: {\r
      enabled: false,\r
    },\r
    plotOptions: {\r
      pie: {\r
        donut: {\r
          size: '70px',\r
        },\r
      },\r
    },\r
    legend: {\r
      show: true,\r
      position: 'bottom',\r
      width: '50px',\r
    },\r
    colors: [\r
      'var(--color-info)',\r
      'var(--color-primary)',\r
      'var(--color-error)',\r
      'var(--color-success)',\r
      'var(--color-warning )',\r
    ],\r
    tooltip: {\r
      fillSeriesColor: false,\r
    },\r
    stroke: {\r
      width: 2,\r
      colors: 'var(--color-surface-ld)',\r
    },\r
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],\r
    responsive: [\r
      {\r
        breakpoint: 480,\r
        options: {\r
          chart: {\r
            width: 200,\r
          },\r
          legend: {\r
            position: 'bottom',\r
          },\r
        },\r
      },\r
    ],\r
  };\r
  return (\r
    <>\r
      <div className="grid grid-cols-12 gap-[30px]">\r
        <div className="md:col-span-6 col-span-12">\r
          <TitleCard title="Donut Chart">\r
            <Chart\r
              options={ChartData1}\r
              series={ChartData1.series}\r
              type="donut"\r
              height="300px"\r
              width="100%"\r
            />\r
          </TitleCard>\r
        </div>\r
        <div className="md:col-span-6 col-span-12">\r
          <TitleCard title="Pie Chart">\r
            <Chart\r
              options={ChartData2}\r
              series={ChartData2.series}\r
              type="pie"\r
              height="300px"\r
              width="100%"\r
            />\r
          </TitleCard>\r
        </div>\r
      </div>\r
    </>\r
  );\r
};\r
\r
export default ApexDoughnutChart;\r
`,p=[{to:"/",title:"Home"},{href:"",title:"Chart Apex Doughtnut"}],k=()=>r.jsxs(r.Fragment,{children:[r.jsx(i,{title:"Chart Apex Doughtnut",items:p}),r.jsx(l,{}),r.jsx(s,{children:n})]});export{k as default};
