import{j as r}from"./index-DnCCvGy7.js";import{C as a}from"./react-apexcharts.min-BbRjcjrS.js";import{T as e}from"./TitleBorderCard-Cfo3Wn1h.js";import{B as s}from"./BreadcrumbComp-CkvqLna6.js";import{C as i}from"./CodeDialog-CpkCWLkI.js";import"./card-sr3AlwUz.js";import"./CardBox-BlybE14U.js";import"./chevron-right-KgmLBFR_.js";import"./createLucideIcon-Cw6eFU3v.js";import"./index-CfcantPz.js";import"./vsc-dark-plus-DCm8Deni.js";import"./highlight-UM_loo16.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";const l=()=>{const t={series:[{name:"Desktop",data:[44,55,57,56,61,58,63,60,66]},{name:"Mobile",data:[76,85,101,98,87,105,91,114,94]},{name:"Other",data:[35,41,36,26,45,48,52,53,41]}],chart:{type:"bar",height:350,fontFamily:"inherit",foreColor:"#a1aab2",toolbar:{show:!1}},colors:["var(--color-error)","var(--color-primary)","var(--color-secondary)"],plotOptions:{bar:{horizontal:!1,endingShape:"rounded",columnWidth:"20%"}},dataLabels:{enabled:!1},stroke:{show:!0,width:2,colors:["transparent"]},xaxis:{categories:["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"],axisBorder:{color:"rgba(173,181,189,0.3)"}},yaxis:{title:{text:"$ (thousands)"}},fill:{opacity:1},tooltip:{theme:"dark",y:{formatter(o){return`$ ${o} thousands`}}},grid:{show:!1},legend:{show:!0,position:"bottom",width:"50px"},responsive:[{breakpoint:600,options:{yaxis:{show:!1}}}]};return r.jsx(r.Fragment,{children:r.jsx(e,{title:"Column Chart",children:r.jsx(a,{options:t,series:t.series,type:"bar",height:"300px",width:"100%"})})})},n=`import Chart from 'react-apexcharts';\r
import TitleCard from '../../shared/TitleBorderCard';\r
const ApexColumnChart = () => {\r
  const ChartData: any = {\r
    series: [\r
      {\r
        name: 'Desktop',\r
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],\r
      },\r
      {\r
        name: 'Mobile',\r
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],\r
      },\r
      {\r
        name: 'Other',\r
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],\r
      },\r
    ],\r
    chart: {\r
      type: 'bar',\r
      height: 350,\r
      fontFamily: \`inherit\`,\r
      foreColor: '#a1aab2',\r
      toolbar: {\r
        show: false,\r
      },\r
    },\r
    colors: ['var(--color-error)', 'var(--color-primary)', 'var(--color-secondary)'],\r
    plotOptions: {\r
      bar: {\r
        horizontal: false,\r
        endingShape: 'rounded',\r
        columnWidth: '20%',\r
      },\r
    },\r
    dataLabels: {\r
      enabled: false,\r
    },\r
    stroke: {\r
      show: true,\r
      width: 2,\r
      colors: ['transparent'],\r
    },\r
\r
    xaxis: {\r
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],\r
      axisBorder: {\r
        color: 'rgba(173,181,189,0.3)',\r
      },\r
    },\r
    yaxis: {\r
      title: {\r
        text: '$ (thousands)',\r
      },\r
    },\r
    fill: {\r
      opacity: 1,\r
    },\r
\r
    tooltip: {\r
      theme: 'dark',\r
      y: {\r
        formatter(val: any) {\r
          return \`$ \${val} thousands\`;\r
        },\r
      },\r
    },\r
    grid: {\r
      show: false,\r
    },\r
    legend: {\r
      show: true,\r
      position: 'bottom',\r
      width: '50px',\r
    },\r
    responsive: [\r
      {\r
        breakpoint: 600,\r
        options: {\r
          yaxis: {\r
            show: false,\r
          },\r
        },\r
      },\r
    ],\r
  };\r
  return (\r
    <>\r
      <TitleCard title="Column Chart">\r
        <Chart\r
          options={ChartData}\r
          series={ChartData.series}\r
          type="bar"\r
          height="300px"\r
          width="100%"\r
        />\r
      </TitleCard>\r
    </>\r
  );\r
};\r
\r
export default ApexColumnChart;\r
`,p=[{to:"/",title:"Home"},{href:"",title:"Chart Apex Column"}],D=()=>r.jsxs(r.Fragment,{children:[r.jsx(s,{title:"Chart Apex Column",items:p}),r.jsx(l,{}),r.jsx(i,{children:n})]});export{D as default};
