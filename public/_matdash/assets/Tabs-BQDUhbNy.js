import{r as d,R as G,j as e}from"./index-B0HXAnM_.js";import{C as E}from"./CodeDialog-C1N4vVlG.js";import{$ as de,a as Ne}from"./useFocusRing-Cf8l_oKM.js";import{w as we}from"./use-active-press-Dxcia4TV.js";import{Y as H,c as X,a as _,o as S,n as Z,K,V as ce,u as W,A as ne,t as Ce}from"./render-wzWQcPy5.js";import{e as Pe}from"./use-resolve-button-type-BwpGNRZf.js";import{y as Y}from"./use-sync-refs-DQhvWRpV.js";import{f as Ie}from"./use-is-mounted-Ctz2e1x4.js";import{f as me,s as ke}from"./hidden-CXVWdIK3.js";import{v as M,T as j,A as Q,G as J}from"./focus-management-BEJfZyKu.js";import{e as Le}from"./owner-DrGvqvJ-.js";import{o as N}from"./keyboard-C1Wiwm26.js";import{C as F}from"./card-Cg1w-DhQ.js";import{C as ue}from"./CardBox-DnrW3_OL.js";import{B as Ae}from"./BreadcrumbComp-9UXnI3U7.js";import"./index-BfJfxS1b.js";import"./vsc-dark-plus-C_odMC5h.js";import"./highlight-hCPzqiPq.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./dom-BlW_0b_t.js";import"./chevron-right-CYEh_jNb.js";import"./createLucideIcon-9FnylcZ7.js";function $e({onFocus:t}){let[a,r]=d.useState(!0),s=Ie();return a?G.createElement(me,{as:"button",type:"button",features:ke.Focusable,onFocus:o=>{o.preventDefault();let i,n=50;function u(){if(n--<=0){i&&cancelAnimationFrame(i);return}if(t()){if(cancelAnimationFrame(i),!s.current)return;r(!1);return}i=requestAnimationFrame(u)}i=requestAnimationFrame(u)}}):null}const he=d.createContext(null);function Se(){return{groups:new Map,get(t,a){var r;let s=this.groups.get(t);s||(s=new Map,this.groups.set(t,s));let o=(r=s.get(a))!=null?r:0;s.set(a,o+1);let i=Array.from(s.keys()).indexOf(a);function n(){let u=s.get(a);u>1?s.set(a,u-1):s.delete(a)}return[i,n]}}}function ze({children:t}){let a=d.useRef(Se());return d.createElement(he.Provider,{value:a},t)}function pe(t){let a=d.useContext(he);if(!a)throw new Error("You must wrap your component in a <StableCollection>");let r=d.useId(),[s,o]=a.current.get(t,r);return d.useEffect(()=>o,[]),s}var De=(t=>(t[t.Forwards=0]="Forwards",t[t.Backwards=1]="Backwards",t))(De||{}),Ee=(t=>(t[t.Less=-1]="Less",t[t.Equal=0]="Equal",t[t.Greater=1]="Greater",t))(Ee||{}),Me=(t=>(t[t.SetSelectedIndex=0]="SetSelectedIndex",t[t.RegisterTab=1]="RegisterTab",t[t.UnregisterTab=2]="UnregisterTab",t[t.RegisterPanel=3]="RegisterPanel",t[t.UnregisterPanel=4]="UnregisterPanel",t))(Me||{});let Ge={0(t,a){var r;let s=J(t.tabs,h=>h.current),o=J(t.panels,h=>h.current),i=s.filter(h=>{var y;return!((y=h.current)!=null&&y.hasAttribute("disabled"))}),n={...t,tabs:s,panels:o};if(a.index<0||a.index>s.length-1){let h=W(Math.sign(a.index-t.selectedIndex),{[-1]:()=>1,0:()=>W(Math.sign(a.index),{[-1]:()=>0,0:()=>0,1:()=>1}),1:()=>0});if(i.length===0)return n;let y=W(h,{0:()=>s.indexOf(i[0]),1:()=>s.indexOf(i[i.length-1])});return{...n,selectedIndex:y===-1?t.selectedIndex:y}}let u=s.slice(0,a.index),w=[...s.slice(a.index),...u].find(h=>i.includes(h));if(!w)return n;let g=(r=s.indexOf(w))!=null?r:t.selectedIndex;return g===-1&&(g=t.selectedIndex),{...n,selectedIndex:g}},1(t,a){if(t.tabs.includes(a.tab))return t;let r=t.tabs[t.selectedIndex],s=J([...t.tabs,a.tab],i=>i.current),o=t.selectedIndex;return t.info.current.isControlled||(o=s.indexOf(r),o===-1&&(o=t.selectedIndex)),{...t,tabs:s,selectedIndex:o}},2(t,a){return{...t,tabs:t.tabs.filter(r=>r!==a.tab)}},3(t,a){return t.panels.includes(a.panel)?t:{...t,panels:J([...t.panels,a.panel],r=>r.current)}},4(t,a){return{...t,panels:t.panels.filter(r=>r!==a.panel)}}},ae=d.createContext(null);ae.displayName="TabsDataContext";function R(t){let a=d.useContext(ae);if(a===null){let r=new Error(`<${t} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,R),r}return a}let re=d.createContext(null);re.displayName="TabsActionsContext";function se(t){let a=d.useContext(re);if(a===null){let r=new Error(`<${t} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,se),r}return a}function Re(t,a){return W(a.type,Ge,t,a)}let Fe="div";function Oe(t,a){let{defaultIndex:r=0,vertical:s=!1,manual:o=!1,onChange:i,selectedIndex:n=null,...u}=t;const w=s?"vertical":"horizontal",g=o?"manual":"auto";let h=n!==null,y=X({isControlled:h}),z=Y(a),[f,p]=d.useReducer(Re,{info:y,selectedIndex:n??r,tabs:[],panels:[]}),O=_({selectedIndex:f.selectedIndex}),B=X(i||(()=>{})),L=X(f.tabs),b=d.useMemo(()=>({orientation:w,activation:g,...f}),[w,g,f]),V=S(x=>(p({type:1,tab:x}),()=>p({type:2,tab:x}))),q=S(x=>(p({type:3,panel:x}),()=>p({type:4,panel:x}))),v=S(x=>{T.current!==x&&B.current(x),h||p({type:0,index:x})}),T=X(h?t.selectedIndex:f.selectedIndex),$=d.useMemo(()=>({registerTab:V,registerPanel:q,change:v}),[]);Z(()=>{p({type:0,index:n??r})},[n]),Z(()=>{if(T.current===void 0||f.tabs.length<=0)return;let x=J(f.tabs,A=>A.current);x.some((A,D)=>f.tabs[D]!==A)&&v(x.indexOf(f.tabs[T.current]))});let ee={ref:z},U=K();return G.createElement(ze,null,G.createElement(re.Provider,{value:$},G.createElement(ae.Provider,{value:b},b.tabs.length<=0&&G.createElement($e,{onFocus:()=>{var x,A;for(let D of L.current)if(((x=D.current)==null?void 0:x.tabIndex)===0)return(A=D.current)==null||A.focus(),!0;return!1}}),U({ourProps:ee,theirProps:u,slot:O,defaultTag:Fe,name:"Tabs"}))))}let Be="div";function Ve(t,a){let{orientation:r,selectedIndex:s}=R("Tab.List"),o=Y(a),i=_({selectedIndex:s}),n=t,u={ref:o,role:"tablist","aria-orientation":r};return K()({ourProps:u,theirProps:n,slot:i,defaultTag:Be,name:"Tabs.List"})}let qe="button";function Ue(t,a){var r,s;let o=d.useId(),{id:i=`headlessui-tabs-tab-${o}`,disabled:n=!1,autoFocus:u=!1,...w}=t,{orientation:g,activation:h,selectedIndex:y,tabs:z,panels:f}=R("Tab"),p=se("Tab"),O=R("Tab"),[B,L]=d.useState(null),b=d.useRef(null),V=Y(b,a,L);Z(()=>p.registerTab(b),[p,b]);let q=pe("tabs"),v=z.indexOf(b);v===-1&&(v=q);let T=v===y,$=S(l=>{let C=l();if(C===Q.Success&&h==="auto"){let te=Le(b.current),ie=O.tabs.findIndex(je=>je.current===te);ie!==-1&&p.change(ie)}return C}),ee=S(l=>{let C=z.map(te=>te.current).filter(Boolean);if(l.key===N.Space||l.key===N.Enter){l.preventDefault(),l.stopPropagation(),p.change(v);return}switch(l.key){case N.Home:case N.PageUp:return l.preventDefault(),l.stopPropagation(),$(()=>M(C,j.First));case N.End:case N.PageDown:return l.preventDefault(),l.stopPropagation(),$(()=>M(C,j.Last))}if($(()=>W(g,{vertical(){return l.key===N.ArrowUp?M(C,j.Previous|j.WrapAround):l.key===N.ArrowDown?M(C,j.Next|j.WrapAround):Q.Error},horizontal(){return l.key===N.ArrowLeft?M(C,j.Previous|j.WrapAround):l.key===N.ArrowRight?M(C,j.Next|j.WrapAround):Q.Error}}))===Q.Success)return l.preventDefault()}),U=d.useRef(!1),x=S(()=>{var l;U.current||(U.current=!0,(l=b.current)==null||l.focus({preventScroll:!0}),p.change(v),Ce(()=>{U.current=!1}))}),A=S(l=>{l.preventDefault()}),{isFocusVisible:D,focusProps:xe}=de({autoFocus:u}),{isHovered:fe,hoverProps:be}=Ne({isDisabled:n}),{pressed:ge,pressProps:ye}=we({disabled:n}),ve=_({selected:T,hover:fe,active:ge,focus:D,autofocus:u,disabled:n}),Te=ce({ref:V,onKeyDown:ee,onMouseDown:A,onClick:x,id:i,role:"tab",type:Pe(t,B),"aria-controls":(s=(r=f[v])==null?void 0:r.current)==null?void 0:s.id,"aria-selected":T,tabIndex:T?0:-1,disabled:n||void 0,autoFocus:u},xe,be,ye);return K()({ourProps:Te,theirProps:w,slot:ve,defaultTag:qe,name:"Tabs.Tab"})}let Je="div";function We(t,a){let{selectedIndex:r}=R("Tab.Panels"),s=Y(a),o=_({selectedIndex:r}),i=t,n={ref:s};return K()({ourProps:n,theirProps:i,slot:o,defaultTag:Je,name:"Tabs.Panels"})}let He="div",_e=ne.RenderStrategy|ne.Static;function Ke(t,a){var r,s,o,i;let n=d.useId(),{id:u=`headlessui-tabs-panel-${n}`,tabIndex:w=0,...g}=t,{selectedIndex:h,tabs:y,panels:z}=R("Tab.Panel"),f=se("Tab.Panel"),p=d.useRef(null),O=Y(p,a);Z(()=>f.registerPanel(p),[f,p]);let B=pe("panels"),L=z.indexOf(p);L===-1&&(L=B);let b=L===h,{isFocusVisible:V,focusProps:q}=de(),v=_({selected:b,focus:V}),T=ce({ref:O,id:u,role:"tabpanel","aria-labelledby":(s=(r=y[L])==null?void 0:r.current)==null?void 0:s.id,tabIndex:b?w:-1},q),$=K();return!b&&((o=g.unmount)==null||o)&&!((i=g.static)!=null&&i)?G.createElement(me,{"aria-hidden":"true",...T}):$({ourProps:T,theirProps:g,slot:v,defaultTag:He,features:_e,visible:b,name:"Tabs.Panel"})}let Ye=H(Ue),P=H(Oe),I=H(Ve),k=H(We),c=H(Ke),m=Object.assign(Ye,{Group:P,List:I,Panels:k,Panel:c});const Xe=`import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";\r
\r
const categories = [\r
  {\r
    name: "Recent",\r
    posts: [\r
      {\r
        id: 1,\r
        title: "Does drinking coffee make you smarter?",\r
        date: "5h ago",\r
        commentCount: 5,\r
        shareCount: 2,\r
      },\r
      {\r
        id: 2,\r
        title: "So you've bought coffee... now what?",\r
        date: "2h ago",\r
        commentCount: 3,\r
        shareCount: 2,\r
      },\r
    ],\r
  },\r
  {\r
    name: "Popular",\r
    posts: [\r
      {\r
        id: 1,\r
        title: "Is tech making coffee better or worse?",\r
        date: "Jan 7",\r
        commentCount: 29,\r
        shareCount: 16,\r
      },\r
      {\r
        id: 2,\r
        title: "The most innovative things happening in coffee",\r
        date: "Mar 19",\r
        commentCount: 24,\r
        shareCount: 12,\r
      },\r
    ],\r
  },\r
  {\r
    name: "Trending",\r
    posts: [\r
      {\r
        id: 1,\r
        title: "Ask Me Anything: 10 answers to your questions about coffee",\r
        date: "2d ago",\r
        commentCount: 9,\r
        shareCount: 5,\r
      },\r
      {\r
        id: 2,\r
        title: "The worst advice we've ever heard about coffee",\r
        date: "4d ago",\r
        commentCount: 1,\r
        shareCount: 2,\r
      },\r
    ],\r
  },\r
];\r
\r
const BasicTabsCode = () => {\r
  return (\r
    <div>\r
      <div className='w-full'>\r
        <TabGroup>\r
          <TabList className='flex gap-3'>\r
            {categories.map(({ name }) => (\r
              <Tab\r
                key={name}\r
                className='rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary'>\r
                {name}\r
              </Tab>\r
            ))}\r
          </TabList>\r
          <TabPanels className='mt-3'>\r
            {categories.map(({ name, posts }) => (\r
              <TabPanel\r
                key={name}\r
                className='rounded-xl bg-lightgray dark:bg-dark p-3'>\r
                <ul>\r
                  {posts.map((post) => (\r
                    <li\r
                      key={post.id}\r
                      className='relative rounded-md p-3 text-sm transition hover:bg-white/5'>\r
                      <a href='#' className='font-semibold text-ld '>\r
                        <span className='absolute inset-0' />\r
                        {post.title}\r
                      </a>\r
                      <ul\r
                        className='flex gap-2 text-ld'\r
                        aria-hidden='true'>\r
                        <li>{post.date}</li>\r
                        <li aria-hidden='true'>&middot;</li>\r
                        <li>{post.commentCount} comments</li>\r
                        <li aria-hidden='true'>&middot;</li>\r
                        <li>{post.shareCount} shares</li>\r
                      </ul>\r
                    </li>\r
                  ))}\r
                </ul>\r
              </TabPanel>\r
            ))}\r
          </TabPanels>\r
        </TabGroup>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default BasicTabsCode\r
`,Qe=`import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";\r
\r
const DisableTabCode = () => {\r
  return (\r
    <div>\r
      <TabGroup>\r
        <TabList className='flex gap-3'>\r
          <Tab className='rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary'>\r
            Tab 1\r
          </Tab>\r
          <Tab\r
            disabled\r
            className='rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary disabled:opacity-50'>\r
            Tab 2\r
          </Tab>\r
          <Tab className='rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary'>\r
            Tab 3\r
          </Tab>\r
        </TabList>\r
        <TabPanels className='rounded-xl bg-lightgray dark:bg-dark p-3 mt-3'>\r
          <TabPanel className='text-ld'>\r
            One Lorem ipsum dolor sit amet, consectetur adipisici elit…’\r
            (complete text) is dummy text that is not meant to mean anything. It\r
            is used as a placeholder in magazine layouts, for example, in order\r
            to give an impression of the finished document.\r
          </TabPanel>\r
          <TabPanel className='text-ld'>\r
            Two Lorem ipsum dolor sit amet, consectetur adipisici elit…’\r
            (complete text) is dummy text that is not meant to mean anything. It\r
            is used as a placeholder in magazine layouts, for example, in order\r
            to give an impression of the finished document.\r
          </TabPanel>\r
          <TabPanel className='text-ld'>\r
            Three Lorem ipsum dolor sit amet, consectetur adipisici elit…’\r
            (complete text) is dummy text that is not meant to mean anything. It\r
            is used as a placeholder in magazine layouts, for example, in order\r
            to give an impression of the finished document.\r
          </TabPanel>\r
        </TabPanels>\r
      </TabGroup>\r
    </div>\r
  )\r
}\r
\r
export default DisableTabCode\r
`,Ze=`import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react'\r
\r
const ListingTabChangeCode = () => {\r
  return (\r
    <div>\r
      <TabGroup\r
        onChange={(index) => {\r
          console.log('Changed selected tab to:', index)\r
        }}>\r
        <TabList className='flex gap-3'>\r
          <Tab className='rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary'>\r
            Tab 1\r
          </Tab>\r
          <Tab className='rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary '>\r
            Tab 2\r
          </Tab>\r
          <Tab className='rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary'>\r
            Tab 3\r
          </Tab>\r
        </TabList>\r
        <TabPanels className='rounded-xl bg-lightgray dark:bg-dark p-3 mt-3'>\r
          <TabPanel className='text-ld'>\r
            One Lorem ipsum dolor sit amet, consectetur adipisici elit…’\r
            (complete text) is dummy text that is not meant to mean anything. It\r
            is used as a placeholder in magazine layouts, for example, in order\r
            to give an impression of the finished document.\r
          </TabPanel>\r
          <TabPanel className='text-ld'>\r
            Two Lorem ipsum dolor sit amet, consectetur adipisici elit…’\r
            (complete text) is dummy text that is not meant to mean anything. It\r
            is used as a placeholder in magazine layouts, for example, in order\r
            to give an impression of the finished document.\r
          </TabPanel>\r
          <TabPanel className='text-ld'>\r
            Three Lorem ipsum dolor sit amet, consectetur adipisici elit…’\r
            (complete text) is dummy text that is not meant to mean anything. It\r
            is used as a placeholder in magazine layouts, for example, in order\r
            to give an impression of the finished document.\r
          </TabPanel>\r
        </TabPanels>\r
      </TabGroup>\r
    </div>\r
  )\r
}\r
\r
export default ListingTabChangeCode\r
`,et=`import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";\r
\r
const ManuallActiveTabCodes = () => {\r
  return (\r
    <div>\r
      <TabGroup manual>\r
        <TabList className='flex gap-3'>\r
          <Tab className='rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-hover:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary'>\r
            Tab 1\r
          </Tab>\r
          <Tab className='rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary '>\r
            Tab 2\r
          </Tab>\r
          <Tab className='rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary'>\r
            Tab 3\r
          </Tab>\r
        </TabList>\r
        <TabPanels className='rounded-xl bg-lightgray dark:bg-dark p-3 mt-3'>\r
          <TabPanel className='text-ld'>\r
            One Lorem ipsum dolor sit amet, consectetur adipisici elit…’\r
            (complete text) is dummy text that is not meant to mean anything. It\r
            is used as a placeholder in magazine layouts, for example, in order\r
            to give an impression of the finished document.\r
          </TabPanel>\r
          <TabPanel className='text-ld'>\r
            Two Lorem ipsum dolor sit amet, consectetur adipisici elit…’\r
            (complete text) is dummy text that is not meant to mean anything. It\r
            is used as a placeholder in magazine layouts, for example, in order\r
            to give an impression of the finished document.\r
          </TabPanel>\r
          <TabPanel className='text-ld'>\r
            Three Lorem ipsum dolor sit amet, consectetur adipisici elit…’\r
            (complete text) is dummy text that is not meant to mean anything. It\r
            is used as a placeholder in magazine layouts, for example, in order\r
            to give an impression of the finished document.\r
          </TabPanel>\r
        </TabPanels>\r
      </TabGroup>\r
    </div>\r
  )\r
}\r
\r
export default ManuallActiveTabCodes\r
`,tt=`import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";\r
\r
const SpecifiedDefaultCode = () => {\r
  return (\r
    <div>\r
      <TabGroup defaultIndex={1}>\r
        <TabList className='flex gap-3'>\r
          <Tab className='rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary'>\r
            Tab 1\r
          </Tab>\r
          <Tab className='rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary '>\r
            Tab 2\r
          </Tab>\r
          <Tab className='rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary'>\r
            Tab 3\r
          </Tab>\r
        </TabList>\r
        <TabPanels className='rounded-xl bg-lightgray dark:bg-dark p-3 mt-3'>\r
          <TabPanel className='text-ld'>\r
            One Lorem ipsum dolor sit amet, consectetur adipisici elit…’\r
            (complete text) is dummy text that is not meant to mean anything. It\r
            is used as a placeholder in magazine layouts, for example, in order\r
            to give an impression of the finished document.\r
          </TabPanel>\r
          <TabPanel className='text-ld'>\r
            Two Lorem ipsum dolor sit amet, consectetur adipisici elit…’\r
            (complete text) is dummy text that is not meant to mean anything. It\r
            is used as a placeholder in magazine layouts, for example, in order\r
            to give an impression of the finished document.\r
          </TabPanel>\r
          <TabPanel className='text-ld'>\r
            Three Lorem ipsum dolor sit amet, consectetur adipisici elit…’\r
            (complete text) is dummy text that is not meant to mean anything. It\r
            is used as a placeholder in magazine layouts, for example, in order\r
            to give an impression of the finished document.\r
          </TabPanel>\r
        </TabPanels>\r
      </TabGroup>\r
    </div>\r
  )\r
}\r
\r
export default SpecifiedDefaultCode\r
`,at=`import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'\r
\r
const categories = [\r
  {\r
    name: 'Recent',\r
    posts: [\r
      {\r
        id: 1,\r
        title: 'Does drinking coffee make you smarter?',\r
        date: '5h ago',\r
        commentCount: 5,\r
        shareCount: 2,\r
      },\r
      {\r
        id: 2,\r
        title: "So you've bought coffee... now what?",\r
        date: '2h ago',\r
        commentCount: 3,\r
        shareCount: 2,\r
      },\r
    ],\r
  },\r
  {\r
    name: 'Popular',\r
    posts: [\r
      {\r
        id: 1,\r
        title: 'Is tech making coffee better or worse?',\r
        date: 'Jan 7',\r
        commentCount: 29,\r
        shareCount: 16,\r
      },\r
      {\r
        id: 2,\r
        title: 'The most innovative things happening in coffee',\r
        date: 'Mar 19',\r
        commentCount: 24,\r
        shareCount: 12,\r
      },\r
    ],\r
  },\r
  {\r
    name: 'Trending',\r
    posts: [\r
      {\r
        id: 1,\r
        title: 'Ask Me Anything: 10 answers to your questions about coffee',\r
        date: '2d ago',\r
        commentCount: 9,\r
        shareCount: 5,\r
      },\r
      {\r
        id: 2,\r
        title: "The worst advice we've ever heard about coffee",\r
        date: '4d ago',\r
        commentCount: 1,\r
        shareCount: 2,\r
      },\r
    ],\r
  },\r
  {\r
    name: 'Extreme',\r
    posts: [\r
      {\r
        id: 1,\r
        title: 'Ask Me Anything: 10 answers to your questions about coffee',\r
        date: '2d ago',\r
        commentCount: 9,\r
        shareCount: 5,\r
      },\r
      {\r
        id: 2,\r
        title: "The worst advice we've ever heard about coffee",\r
        date: '4d ago',\r
        commentCount: 1,\r
        shareCount: 2,\r
      },\r
    ],\r
  },\r
]\r
\r
const VerticalTabsCode = () => {\r
  return (\r
    <div>\r
      <div className='w-full pb-5'>\r
        <TabGroup vertical className='flex gap-3 '>\r
          <TabList className='flex flex-col gap-3'>\r
            {categories.map(({ name }) => (\r
              <Tab\r
                key={name}\r
                className='rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary'>\r
                {name}\r
              </Tab>\r
            ))}\r
          </TabList>\r
          <TabPanels className='w-full'>\r
            {categories.map(({ name, posts }) => (\r
              <TabPanel\r
                key={name}\r
                className='rounded-xl bg-lightgray dark:bg-dark p-3'>\r
                <ul>\r
                  {posts.map((post) => (\r
                    <li\r
                      key={post.id}\r
                      className='relative rounded-md p-3 text-sm transition hover:bg-white/5'>\r
                      <a href='#' className='font-semibold text-ld '>\r
                        <span className='absolute inset-0' />\r
                        {post.title}\r
                      </a>\r
                      <ul\r
                        className='flex gap-2 text-ld'\r
                        aria-hidden='true'>\r
                        <li>{post.date}</li>\r
                        <li aria-hidden='true'>&middot;</li>\r
                        <li>{post.commentCount} comments</li>\r
                        <li aria-hidden='true'>&middot;</li>\r
                        <li>{post.shareCount} shares</li>\r
                      </ul>\r
                    </li>\r
                  ))}\r
                </ul>\r
              </TabPanel>\r
            ))}\r
          </TabPanels>\r
        </TabGroup>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default VerticalTabsCode\r
`,oe=[{name:"Recent",posts:[{id:1,title:"Does drinking coffee make you smarter?",date:"5h ago",commentCount:5,shareCount:2},{id:2,title:"So you've bought coffee... now what?",date:"2h ago",commentCount:3,shareCount:2}]},{name:"Popular",posts:[{id:1,title:"Is tech making coffee better or worse?",date:"Jan 7",commentCount:29,shareCount:16},{id:2,title:"The most innovative things happening in coffee",date:"Mar 19",commentCount:24,shareCount:12}]},{name:"Trending",posts:[{id:1,title:"Ask Me Anything: 10 answers to your questions about coffee",date:"2d ago",commentCount:9,shareCount:5},{id:2,title:"The worst advice we've ever heard about coffee",date:"4d ago",commentCount:1,shareCount:2}]}],rt=()=>e.jsx("div",{children:e.jsx("div",{className:"w-full",children:e.jsxs(P,{children:[e.jsx(I,{className:"flex gap-3",children:oe.map(({name:t})=>e.jsx(m,{className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary",children:t},t))}),e.jsx(k,{className:"mt-3",children:oe.map(({name:t,posts:a})=>e.jsx(c,{className:"rounded-xl bg-lightgray dark:bg-dark p-3",children:e.jsx("ul",{children:a.map(r=>e.jsxs("li",{className:"relative rounded-md p-3 text-sm transition hover:bg-white/5",children:[e.jsxs("a",{href:"#",className:"font-semibold text-ld ",children:[e.jsx("span",{className:"absolute inset-0"}),r.title]}),e.jsxs("ul",{className:"flex gap-2 text-ld","aria-hidden":"true",children:[e.jsx("li",{children:r.date}),e.jsx("li",{"aria-hidden":"true",children:"·"}),e.jsxs("li",{children:[r.commentCount," comments"]}),e.jsx("li",{"aria-hidden":"true",children:"·"}),e.jsxs("li",{children:[r.shareCount," shares"]})]})]},r.id))})},t))})]})})}),st=()=>e.jsx("div",{children:e.jsx(F,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Basic Tabs"}),e.jsx(rt,{})]})})})}),it=()=>{const[t,a]=d.useState(0);return e.jsx("div",{children:e.jsxs(ue,{children:[e.jsx("div",{className:"flex items-center justify-between mb-2",children:e.jsx("h4",{className:"text-lg font-semibold",children:"Controlling Selected Tab"})}),e.jsxs(P,{selectedIndex:t,onChange:a,children:[e.jsxs(I,{className:"flex gap-3",children:[e.jsx(m,{className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary",children:"Tab 1"}),e.jsx(m,{className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary ",children:"Tab 2"}),e.jsx(m,{className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary",children:"Tab 3"})]}),e.jsxs(k,{className:"rounded-xl bg-lightgray dark:bg-dark p-3 mt-3",children:[e.jsx(c,{className:"text-ld",children:"One Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document."}),e.jsx(c,{className:"text-ld",children:"Two Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document."}),e.jsx(c,{className:"text-ld",children:"Three Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document."})]})]})]})})},nt=()=>e.jsx("div",{children:e.jsxs(P,{children:[e.jsxs(I,{className:"flex gap-3",children:[e.jsx(m,{className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary",children:"Tab 1"}),e.jsx(m,{disabled:!0,className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary disabled:opacity-50",children:"Tab 2"}),e.jsx(m,{className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary",children:"Tab 3"})]}),e.jsxs(k,{className:"rounded-xl bg-lightgray dark:bg-dark p-3 mt-3",children:[e.jsx(c,{className:"text-ld",children:"One Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document."}),e.jsx(c,{className:"text-ld",children:"Two Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document."}),e.jsx(c,{className:"text-ld",children:"Three Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document."})]})]})}),ot=()=>e.jsx("div",{children:e.jsx(F,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Disable Tab"}),e.jsx(nt,{})]})})})}),lt=()=>e.jsx("div",{children:e.jsxs(P,{onChange:t=>{console.log("Changed selected tab to:",t)},children:[e.jsxs(I,{className:"flex gap-3",children:[e.jsx(m,{className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary",children:"Tab 1"}),e.jsx(m,{className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary ",children:"Tab 2"}),e.jsx(m,{className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary",children:"Tab 3"})]}),e.jsxs(k,{className:"rounded-xl bg-lightgray dark:bg-dark p-3 mt-3",children:[e.jsx(c,{className:"text-ld",children:"One Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document."}),e.jsx(c,{className:"text-ld",children:"Two Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document."}),e.jsx(c,{className:"text-ld",children:"Three Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document."})]})]})}),dt=()=>e.jsx("div",{children:e.jsx(F,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Listening For Changes Tab"}),e.jsx(lt,{})]})})})}),ct=()=>e.jsx("div",{children:e.jsxs(P,{manual:!0,children:[e.jsxs(I,{className:"flex gap-3",children:[e.jsx(m,{className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-hover:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary",children:"Tab 1"}),e.jsx(m,{className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary ",children:"Tab 2"}),e.jsx(m,{className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary",children:"Tab 3"})]}),e.jsxs(k,{className:"rounded-xl bg-lightgray dark:bg-dark p-3 mt-3",children:[e.jsx(c,{className:"text-ld",children:"One Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document."}),e.jsx(c,{className:"text-ld",children:"Two Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document."}),e.jsx(c,{className:"text-ld",children:"Three Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document."})]})]})}),mt=()=>e.jsx("div",{children:e.jsx(F,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Manually Active Tab"}),e.jsx(ct,{})]})})})}),ut=()=>e.jsx("div",{children:e.jsxs(ue,{children:[e.jsx("div",{className:"flex items-center justify-between mb-2",children:e.jsx("h4",{className:"text-lg font-semibold",children:"Rendering As Different Elements"})}),e.jsxs(P,{manual:!0,children:[e.jsxs(I,{className:"flex gap-3",as:"aside",children:[e.jsx(m,{className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary",children:"Tab 1"}),e.jsx(m,{className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary ",children:"Tab 2"}),e.jsx(m,{className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary",children:"Tab 3"})]}),e.jsxs(k,{className:"rounded-xl bg-lightgray dark:bg-dark p-3 mt-3",as:"section",children:[e.jsx(c,{className:"text-ld",children:"One Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document."}),e.jsx(c,{className:"text-ld",children:"Two Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document."}),e.jsx(c,{className:"text-ld",children:"Three Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document."})]})]})]})}),ht=()=>e.jsx("div",{children:e.jsxs(P,{defaultIndex:1,children:[e.jsxs(I,{className:"flex gap-3",children:[e.jsx(m,{className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary",children:"Tab 1"}),e.jsx(m,{className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary ",children:"Tab 2"}),e.jsx(m,{className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary",children:"Tab 3"})]}),e.jsxs(k,{className:"rounded-xl bg-lightgray dark:bg-dark p-3 mt-3",children:[e.jsx(c,{className:"text-ld",children:"One Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document."}),e.jsx(c,{className:"text-ld",children:"Two Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document."}),e.jsx(c,{className:"text-ld",children:"Three Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete text) is dummy text that is not meant to mean anything. It is used as a placeholder in magazine layouts, for example, in order to give an impression of the finished document."})]})]})}),pt=()=>e.jsx("div",{children:e.jsx(F,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Specifying The Default Tab"}),e.jsx(ht,{})]})})})}),le=[{name:"Recent",posts:[{id:1,title:"Does drinking coffee make you smarter?",date:"5h ago",commentCount:5,shareCount:2},{id:2,title:"So you've bought coffee... now what?",date:"2h ago",commentCount:3,shareCount:2}]},{name:"Popular",posts:[{id:1,title:"Is tech making coffee better or worse?",date:"Jan 7",commentCount:29,shareCount:16},{id:2,title:"The most innovative things happening in coffee",date:"Mar 19",commentCount:24,shareCount:12}]},{name:"Trending",posts:[{id:1,title:"Ask Me Anything: 10 answers to your questions about coffee",date:"2d ago",commentCount:9,shareCount:5},{id:2,title:"The worst advice we've ever heard about coffee",date:"4d ago",commentCount:1,shareCount:2}]},{name:"Extreme",posts:[{id:1,title:"Ask Me Anything: 10 answers to your questions about coffee",date:"2d ago",commentCount:9,shareCount:5},{id:2,title:"The worst advice we've ever heard about coffee",date:"4d ago",commentCount:1,shareCount:2}]}],xt=()=>e.jsx("div",{children:e.jsx("div",{className:"w-full pb-5",children:e.jsxs(P,{vertical:!0,className:"flex gap-3 ",children:[e.jsx(I,{className:"flex flex-col gap-3",children:le.map(({name:t})=>e.jsx(m,{className:"rounded-full py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary",children:t},t))}),e.jsx(k,{className:"w-full",children:le.map(({name:t,posts:a})=>e.jsx(c,{className:"rounded-xl bg-lightgray dark:bg-dark p-3",children:e.jsx("ul",{children:a.map(r=>e.jsxs("li",{className:"relative rounded-md p-3 text-sm transition hover:bg-white/5",children:[e.jsxs("a",{href:"#",className:"font-semibold text-ld ",children:[e.jsx("span",{className:"absolute inset-0"}),r.title]}),e.jsxs("ul",{className:"flex gap-2 text-ld","aria-hidden":"true",children:[e.jsx("li",{children:r.date}),e.jsx("li",{"aria-hidden":"true",children:"·"}),e.jsxs("li",{children:[r.commentCount," comments"]}),e.jsx("li",{"aria-hidden":"true",children:"·"}),e.jsxs("li",{children:[r.shareCount," shares"]})]})]},r.id))})},t))})]})})}),ft=()=>e.jsx("div",{children:e.jsx(F,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Vertical Tabs"}),e.jsx(xt,{})]})})})}),bt=[{to:"/",title:"Home"},{title:"Tabs"}],qt=()=>e.jsxs(e.Fragment,{children:[e.jsx(Ae,{title:"Tabs",items:bt}),e.jsxs("div",{className:"grid grid-cols-12 gap-7",children:[e.jsxs("div",{className:"col-span-12",children:[e.jsx(st,{}),e.jsx(E,{children:Xe})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(ft,{}),e.jsx(E,{children:at})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(ot,{}),e.jsx(E,{children:Qe})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(mt,{}),e.jsx(E,{children:et})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(pt,{}),e.jsx(E,{children:tt})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(dt,{}),e.jsx(E,{children:Ze})]}),e.jsx("div",{className:"col-span-12",children:e.jsx(it,{})}),e.jsx("div",{className:"col-span-12",children:e.jsx(ut,{})})]})]});export{qt as default};
