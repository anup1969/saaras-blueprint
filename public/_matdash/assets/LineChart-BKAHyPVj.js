import{j as r}from"./index-BoNr0JGX.js";import{C as e}from"./react-apexcharts.min-Dp6Uf_zo.js";import{T as o}from"./TitleBorderCard-CsRAn73K.js";import{C as a}from"./CodeDialog-_oyCzuNE.js";import{B as i}from"./BreadcrumbComp-Chbekl54.js";import"./card-vkvqasdW.js";import"./index-ZNjr_w1p.js";import"./vsc-dark-plus-DFfyWk_Y.js";import"./highlight-BsgCmQTy.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./CardBox-CQoLG162.js";import"./chevron-right-DKLkMv9e.js";import"./createLucideIcon-C_6kNXZz.js";const s=()=>{const t={series:[{name:"High - 2024",data:[28,29,33,36,32,32,33]},{name:"Low - 2024",data:[12,11,14,18,17,13,13]}],chart:{height:350,type:"line",foreColor:"#adb0bb",fontFamily:"inherit",offsetX:-5,zoom:{type:"x",enabled:!0},toolbar:{show:!1},shadow:{enabled:!0,color:"#000",top:18,left:7,blur:10,opacity:1}},colors:["var(--color-primary)","var(--color-secondary)"],markers:{size:1},xaxis:{categories:["Jan","Feb","Mar","Apr","May","Jun","Jul"],title:{text:"Month"},axisBorder:{color:"rgba(173,181,189,0.3)"}},grid:{show:!1,padding:{left:20}},dataLabels:{enabled:!0},stroke:{curve:"straight",width:"2"},legend:{position:"top",horizontalAlign:"right",floating:!0,offsetY:-25,offsetX:-5},tooltip:{theme:"dark",x:{format:"dd/MM/yy HH:mm"}}};return r.jsx(r.Fragment,{children:r.jsx(o,{title:"Line Chart",children:r.jsx(e,{options:t,series:t.series,type:"line",height:"350px",width:"100%"})})})},l=`import Chart from 'react-apexcharts';\r
import TitleCard from '../../shared/TitleBorderCard';\r
\r
const ApexLineChart = () => {\r
  const ChartData: any = {\r
    series: [\r
      {\r
        name: 'High - 2024',\r
        data: [28, 29, 33, 36, 32, 32, 33],\r
      },\r
      {\r
        name: 'Low - 2024',\r
        data: [12, 11, 14, 18, 17, 13, 13],\r
      },\r
    ],\r
    chart: {\r
      height: 350,\r
      type: 'line',\r
      foreColor: '#adb0bb',\r
      fontFamily: \`inherit\`,\r
      offsetX: -5,\r
      zoom: {\r
        type: 'x',\r
        enabled: true,\r
      },\r
      toolbar: {\r
        show: false,\r
      },\r
      shadow: {\r
        enabled: true,\r
        color: '#000',\r
        top: 18,\r
        left: 7,\r
        blur: 10,\r
        opacity: 1,\r
      },\r
    },\r
    colors: ['var(--color-primary)', 'var(--color-secondary)'],\r
    markers: {\r
      size: 1,\r
    },\r
    xaxis: {\r
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],\r
      title: {\r
        text: 'Month',\r
      },\r
      axisBorder: {\r
        color: 'rgba(173,181,189,0.3)',\r
      },\r
    },\r
    grid: {\r
      show: false,\r
      padding: {\r
        left: 20,\r
      },\r
    },\r
    dataLabels: {\r
      enabled: true,\r
    },\r
    stroke: {\r
      curve: 'straight',\r
      width: '2',\r
    },\r
    legend: {\r
      position: 'top',\r
      horizontalAlign: 'right',\r
      floating: true,\r
      offsetY: -25,\r
      offsetX: -5,\r
    },\r
    tooltip: {\r
      theme: 'dark',\r
      x: {\r
        format: 'dd/MM/yy HH:mm',\r
      },\r
    },\r
  };\r
  return (\r
    <>\r
      <TitleCard title="Line Chart">\r
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
export default ApexLineChart;\r
`,n=[{to:"/",title:"Home"},{href:"",title:"Chart Apex Line"}],j=()=>r.jsxs(r.Fragment,{children:[r.jsx(i,{title:"Chart Apex Line",items:n}),r.jsx(s,{}),r.jsx(a,{children:l})]});export{j as default};
