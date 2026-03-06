import{j as r,B as p}from"./index-DnCCvGy7.js";import{L as o}from"./label-qtzOMeQE.js";import{R as i,a as e}from"./radio-group-7vx7nM_J.js";import{C as c}from"./card-sr3AlwUz.js";import{u,t as x,F as f,d as h,e as s,f as m,g as l,h as F,o as j,_ as N}from"./form-BBbpnAR1.js";import{t as v}from"./use-toast-BB7JwS33.js";import{B as b}from"./BreadcrumbComp-CkvqLna6.js";import{C as t}from"./CodeDialog-CpkCWLkI.js";import"./index-8mU0Ji7Z.js";import"./index-D9EN0Jbq.js";import"./index-Cxsgpj8w.js";import"./circle-Cu-PkCuV.js";import"./createLucideIcon-Cw6eFU3v.js";import"./CardBox-BlybE14U.js";import"./chevron-right-KgmLBFR_.js";import"./index-CfcantPz.js";import"./vsc-dark-plus-DCm8Deni.js";import"./highlight-UM_loo16.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";const g=()=>r.jsx(r.Fragment,{children:r.jsx("div",{className:"mt-4",children:r.jsxs(i,{defaultValue:"comfortable",children:[r.jsxs("div",{className:"flex items-top space-x-2",children:[r.jsx(e,{value:"default",id:"r1"}),r.jsx(o,{htmlFor:"r1",className:"font-normal",children:"Default"})]}),r.jsxs("div",{className:"flex items-top space-x-2",children:[r.jsx(e,{value:"comfortable",id:"r2"}),r.jsx(o,{htmlFor:"r2",className:"font-normal",children:" Comfortable"})]}),r.jsxs("div",{className:"flex items-top space-x-2",children:[r.jsx(e,{value:"compact",id:"r3"}),r.jsx(o,{htmlFor:"r3",className:"font-normal",children:"Compact"})]}),r.jsxs("div",{className:"flex items-top space-x-2",children:[r.jsx(e,{value:"digital",id:"r4"}),r.jsx(o,{htmlFor:"r4",className:"font-normal",children:"Digital"})]}),r.jsxs("div",{className:"flex items-top space-x-2",children:[r.jsx(e,{value:"Enlarge",id:"r5"}),r.jsx(o,{htmlFor:"r5",className:"font-normal",children:"Enlarge"})]}),r.jsxs("div",{className:"flex items-top space-x-2",children:[r.jsx(e,{value:"Maximize",id:"r6"}),r.jsx(o,{htmlFor:"r6",className:"font-normal",children:"Maximize"})]})]})})}),R=()=>r.jsx(c,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Default Radio Group"}),r.jsx(g,{})]})})}),C=j({type:N(["all","mentions","none"]).refine(a=>a,{message:"You need to select a notification type."})}),y=()=>{const a=u({resolver:x(C)});function d(n){v({title:"You submitted the following values:",description:r.jsx("pre",{className:"mt-2 w-[340px] rounded-md bg-slate-950 p-4",children:r.jsx("code",{className:"text-white",children:JSON.stringify(n,null,2)})})})}return r.jsx(r.Fragment,{children:r.jsx("div",{className:"mt-4",children:r.jsx(f,{...a,children:r.jsxs("form",{onSubmit:a.handleSubmit(d),className:"space-y-6",children:[r.jsx(h,{control:a.control,name:"type",render:({field:n})=>r.jsxs(s,{className:"space-y-3",children:[r.jsx(m,{children:"Notify me about..."}),r.jsx(l,{children:r.jsxs(i,{onValueChange:n.onChange,defaultValue:n.value,className:"flex flex-col space-y-1",children:[r.jsxs(s,{className:"flex items-center space-x-3 space-y-0",children:[r.jsx(l,{children:r.jsx(e,{value:"all"})}),r.jsx(m,{className:"font-normal",children:"All new messages"})]}),r.jsxs(s,{className:"flex items-center space-x-3 space-y-0",children:[r.jsx(l,{children:r.jsx(e,{value:"mentions"})}),r.jsx(m,{className:"font-normal",children:"Direct messages and mentions"})]}),r.jsxs(s,{className:"flex items-center space-x-3 space-y-0",children:[r.jsx(l,{children:r.jsx(e,{value:"none"})}),r.jsx(m,{className:"font-normal",children:"Nothing"})]})]})}),r.jsx(F,{})]})}),r.jsx(p,{type:"submit",children:"Submit"})]})})})})},L=()=>r.jsx(c,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Form Radio Group"}),r.jsx(y,{})]})})}),I=`import { Label } from "src/components/ui/label";\r
import {\r
  RadioGroup,\r
  RadioGroupItem,\r
} from "src/components/ui/radio-group";\r
\r
\r
const DefaultRadioCode = () => {\r
  return (\r
    <>\r
      <div className="mt-4">\r
        <RadioGroup defaultValue="comfortable">\r
          <div className="flex items-top space-x-2">\r
            <RadioGroupItem value="default" id="r1" />\r
            <Label htmlFor="r1" className="font-normal">Default</Label>\r
          </div>\r
          <div className="flex items-top space-x-2">\r
            <RadioGroupItem value="comfortable" id="r2" />\r
            <Label htmlFor="r2" className="font-normal"> Comfortable</Label>\r
          </div>\r
          <div className="flex items-top space-x-2">\r
            <RadioGroupItem value="compact" id="r3" />\r
            <Label htmlFor="r3" className="font-normal">Compact</Label>\r
          </div>\r
          <div className="flex items-top space-x-2">\r
            <RadioGroupItem value="digital" id="r4" />\r
            <Label htmlFor="r4" className="font-normal">Digital</Label>\r
          </div>\r
          <div className="flex items-top space-x-2">\r
            <RadioGroupItem value="Enlarge" id="r5" />\r
            <Label htmlFor="r5" className="font-normal">Enlarge</Label>\r
          </div>\r
          <div className="flex items-top space-x-2">\r
            <RadioGroupItem value="Maximize" id="r6" />\r
            <Label htmlFor="r6" className="font-normal">Maximize</Label>\r
          </div>\r
        </RadioGroup>\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default DefaultRadioCode`,G=`import { zodResolver } from "@hookform/resolvers/zod";\r
import { useForm } from "react-hook-form";\r
import { z } from "zod";\r
\r
import { toast } from "src/hooks/use-toast";\r
import { Button } from "src/components/ui/button";\r
import {\r
  Form,\r
  FormControl,\r
  FormField,\r
  FormItem,\r
  FormLabel,\r
  FormMessage,\r
} from "src/components/ui/form";\r
import {\r
  RadioGroup,\r
  RadioGroupItem,\r
} from "src/components/ui/radio-group";\r
\r
\r
const FormSchema = z.object({\r
  type: z\r
    .enum(["all", "mentions", "none"])\r
    .refine((v) => v, { message: "You need to select a notification type." }),\r
});\r
\r
const FormRadioCode = () => {\r
  const form = useForm<z.infer<typeof FormSchema>>({\r
    resolver: zodResolver(FormSchema),\r
  });\r
\r
  function onSubmit(data: z.infer<typeof FormSchema>) {\r
    toast({\r
      title: "You submitted the following values:",\r
      description: (\r
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">\r
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>\r
        </pre>\r
      ),\r
    });\r
  }\r
  return (\r
    <>\r
      <div className="mt-4">\r
        <Form {...form}>\r
          <form\r
            onSubmit={form.handleSubmit(onSubmit)}\r
            className="space-y-6"\r
          >\r
            <FormField\r
              control={form.control}\r
              name="type"\r
              render={({ field }) => (\r
                <FormItem className="space-y-3">\r
                  <FormLabel>Notify me about...</FormLabel>\r
                  <FormControl>\r
                    <RadioGroup\r
                      onValueChange={field.onChange}\r
                      defaultValue={field.value}\r
                      className="flex flex-col space-y-1"\r
                    >\r
                      <FormItem className="flex items-center space-x-3 space-y-0">\r
                        <FormControl>\r
                          <RadioGroupItem value="all" />\r
                        </FormControl>\r
                        <FormLabel className="font-normal">\r
                          All new messages\r
                        </FormLabel>\r
                      </FormItem>\r
                      <FormItem className="flex items-center space-x-3 space-y-0">\r
                        <FormControl>\r
                          <RadioGroupItem value="mentions" />\r
                        </FormControl>\r
                        <FormLabel className="font-normal">\r
                          Direct messages and mentions\r
                        </FormLabel>\r
                      </FormItem>\r
                      <FormItem className="flex items-center space-x-3 space-y-0">\r
                        <FormControl>\r
                          <RadioGroupItem value="none" />\r
                        </FormControl>\r
                        <FormLabel className="font-normal">Nothing</FormLabel>\r
                      </FormItem>\r
                    </RadioGroup>\r
                  </FormControl>\r
                  <FormMessage />\r
                </FormItem>\r
              )}\r
            />\r
            <Button type="submit">Submit</Button>\r
          </form>\r
        </Form>\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default FormRadioCode`,S=[{to:"/",title:"Home"},{href:"",title:"Radio"}],X=()=>r.jsxs(r.Fragment,{children:[r.jsx(b,{title:"Radio",items:S}),r.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[r.jsxs("div",{className:"col-span-12",children:[r.jsx(R,{}),r.jsx(t,{children:I})]}),r.jsxs("div",{className:"col-span-12",children:[r.jsx(L,{}),r.jsx(t,{children:G})]})]})]});export{X as default};
