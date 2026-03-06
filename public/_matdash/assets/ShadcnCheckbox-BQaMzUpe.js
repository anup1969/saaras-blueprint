import{j as e,B as p}from"./index-CW78-08q.js";import{C as l}from"./card-BmJIY3HQ.js";import{C as r}from"./checkbox-fP4TyMw3.js";import{u,F as b,d as m,e as d,k as v,g as f,f as j,h as N,t as C,o as F,a as y,s as k}from"./form-By3pYHcl.js";import{t as g}from"./use-toast-B_mcJR-s.js";import{C as S}from"./CardBox-CJgwgOI2.js";import{B as D}from"./BreadcrumbComp-mrdJNCbj.js";import{C as c}from"./CodeDialog-DRC5ECma.js";import"./index-kPZJo_FU.js";import"./check-RMPgo43s.js";import"./createLucideIcon-BxwgNh2l.js";import"./label-BBw_0ceY.js";import"./chevron-right-B2L8yKO6.js";import"./index-DaNAaBSr.js";import"./vsc-dark-plus-CoILpeng.js";import"./highlight-DCblhEs5.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";const A=()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(r,{id:"terms"}),e.jsx("label",{htmlFor:"terms",className:"text-ld",children:"Accept terms and conditions"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(r,{id:"privacy"}),e.jsx("label",{htmlFor:"privacy",className:"text-ld",children:"Accept privacy policy"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(r,{id:"continue"}),e.jsx("label",{htmlFor:"continue",className:"text-ld",children:"Continue to process?"})]})]})}),w=()=>e.jsx(l,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"With Label"}),e.jsx(A,{})]})})}),L=()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(r,{id:"terms11",checked:!0}),e.jsx("label",{htmlFor:"terms11",className:"text-ld",children:"Accept terms and conditions"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(r,{id:"privacy22",checked:!0}),e.jsx("label",{htmlFor:"privacy22",className:"text-ld",children:"Accept privacy policy"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(r,{id:"continue33",checked:!0}),e.jsx("label",{htmlFor:"continue33",className:"text-ld",children:"Continue to process?"})]})]})}),P=()=>e.jsx(l,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Default Checked"}),e.jsx(L,{})]})})}),T=()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(r,{id:"terms1",disabled:!0}),e.jsx("label",{htmlFor:"terms1",className:"text-ld",children:"Accept terms and conditions"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(r,{id:"privacy2",disabled:!0}),e.jsx("label",{htmlFor:"privacy2",className:"text-ld",children:"Accept privacy policy"})]}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(r,{id:"continue3",disabled:!0}),e.jsx("label",{htmlFor:"continue3",className:"text-ld",children:"Continue to process?"})]})]})}),z=()=>e.jsx(l,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Disables"}),e.jsx(T,{})]})})}),I=[{id:"recents",label:"Recents"},{id:"home",label:"Home"},{id:"applications",label:"Applications"},{id:"desktop",label:"Desktop"},{id:"downloads",label:"Downloads"},{id:"documents",label:"Documents"}],Y=F({items:y(k()).refine(t=>t.some(o=>o),{message:"You have to select at least one item."})}),B=()=>{const t=u({resolver:C(Y),defaultValues:{items:["recents","home"]}});function o(s){g({title:"You submitted the following values:",description:e.jsx("pre",{className:"mt-2 w-[340px] rounded-md bg-slate-950 p-4",children:e.jsx("code",{className:"text-white",children:JSON.stringify(s,null,2)})})})}return e.jsxs(S,{children:[e.jsx("div",{className:"flex items-center justify-between mb-2",children:e.jsx("h4",{className:"text-lg font-semibold",children:"With Form"})}),e.jsx(b,{...t,children:e.jsxs("form",{onSubmit:t.handleSubmit(o),className:"space-y-8",children:[e.jsx(m,{control:t.control,name:"items",render:()=>e.jsxs(d,{children:[e.jsx("div",{className:"mb-4",children:e.jsx(v,{children:"Select the items you want to display in the sidebar."})}),I.map(s=>e.jsx(m,{control:t.control,name:"items",render:({field:n})=>{var a;return e.jsxs(d,{className:"flex flex-row items-start space-x-3 space-y-0",children:[e.jsx(f,{children:e.jsx(r,{checked:(a=n.value)==null?void 0:a.includes(s.id),onCheckedChange:x=>{var i;return x?n.onChange([...n.value||[],s.id]):n.onChange((i=n.value)==null?void 0:i.filter(h=>h!==s.id))}})}),e.jsx(j,{className:"font-normal",children:s.label})]},s.id)}},s.id)),e.jsx(N,{})]})}),e.jsx(p,{type:"submit",children:"Submit"})]})})]})},W=()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{className:"items-top flex space-x-2",children:[e.jsx(r,{id:"term"}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"term",className:"text-ld",children:"Accept terms and conditions"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"You agree to our Terms of Service and Privacy Policy."})]})]}),e.jsxs("div",{className:"items-top flex space-x-2",children:[e.jsx(r,{id:"privacy2"}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"privacy2",className:"text-ld",children:"Accept privacy policy"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"You agree to our Terms of Service and Privacy Policy."})]})]}),e.jsxs("div",{className:"items-top flex space-x-2",children:[e.jsx(r,{id:"continue3"}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"continue3",className:"text-ld",children:"Continue to process?"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"You agree to our Terms of Service and Privacy Policy."})]})]}),e.jsxs("div",{className:"items-top flex space-x-2",children:[e.jsx(r,{id:"act3"}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"act3",className:"text-ld",children:"Accept terms"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"})]})]})]})}),R=()=>e.jsx(l,{className:"p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h4",{className:"text-lg font-semibold mb-4",children:"With Text"}),e.jsx(W,{})]})})}),$=`import { Checkbox } from "src/components/ui/checkbox";\r
\r
const CheckboxLabelCode = () => {\r
  return (\r
    <>\r
      <div className="flex flex-col gap-3">\r
        <div className="flex items-center space-x-2">\r
          <Checkbox id="terms" />\r
          <label htmlFor="terms" className="text-ld">\r
            Accept terms and conditions\r
          </label>\r
        </div>\r
\r
        <div className="flex items-center space-x-2">\r
          <Checkbox id="privacy" />\r
          <label htmlFor="privacy" className="text-ld">\r
            Accept privacy policy\r
          </label>\r
        </div>\r
        <div className="flex items-center space-x-2">\r
          <Checkbox id="continue" />\r
          <label htmlFor="continue" className="text-ld">\r
            Continue to process?\r
          </label>\r
        </div>\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default CheckboxLabelCode`,H=`import { Checkbox } from "src/components/ui/checkbox";\r
\r
const DefaultCheckCode = () => {\r
  return (\r
    <>\r
      <div className="flex flex-col gap-3">\r
        <div className="flex items-center space-x-2">\r
          <Checkbox id="terms11" checked />\r
          <label htmlFor="terms11" className="text-ld">\r
            Accept terms and conditions\r
          </label>\r
        </div>\r
\r
        <div className="flex items-center space-x-2">\r
          <Checkbox id="privacy22" checked />\r
          <label htmlFor="privacy22" className="text-ld">\r
            Accept privacy policy\r
          </label>\r
        </div>\r
        <div className="flex items-center space-x-2">\r
          <Checkbox id="continue33" checked />\r
          <label htmlFor="continue33" className="text-ld">\r
            Continue to process?\r
          </label>\r
        </div>\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default DefaultCheckCode`,M=`import { Checkbox } from "src/components/ui/checkbox";\r
\r
const DisabledCheckCode = () => {\r
  return (\r
    <>\r
      <div className="flex flex-col gap-3">\r
        <div className="flex items-center space-x-2">\r
          <Checkbox id="terms1" disabled />\r
          <label htmlFor="terms1" className="text-ld">\r
            Accept terms and conditions\r
          </label>\r
        </div>\r
\r
        <div className="flex items-center space-x-2">\r
          <Checkbox id="privacy2" disabled />\r
          <label htmlFor="privacy2" className="text-ld">\r
            Accept privacy policy\r
          </label>\r
        </div>\r
        <div className="flex items-center space-x-2">\r
          <Checkbox id="continue3" disabled />\r
          <label htmlFor="continue3" className="text-ld">\r
            Continue to process?\r
          </label>\r
        </div>\r
      </div>\r
    </>\r
  )\r
}\r
\r
export default DisabledCheckCode`,J=`import { zodResolver } from "@hookform/resolvers/zod";\r
import { useForm } from "react-hook-form";\r
import { z } from "zod";\r
\r
import { toast } from "src/hooks/use-toast";\r
import { Button } from "src/components/ui/button";\r
import { Checkbox } from "src/components/ui/checkbox";\r
import {\r
    Form,\r
    FormControl,\r
    FormDescription,\r
    FormField,\r
    FormItem,\r
    FormLabel,\r
    FormMessage,\r
} from "src/components/ui/form";\r
\r
const items = [\r
    {\r
        id: "recents",\r
        label: "Recents",\r
    },\r
    {\r
        id: "home",\r
        label: "Home",\r
    },\r
    {\r
        id: "applications",\r
        label: "Applications",\r
    },\r
    {\r
        id: "desktop",\r
        label: "Desktop",\r
    },\r
    {\r
        id: "downloads",\r
        label: "Downloads",\r
    },\r
    {\r
        id: "documents",\r
        label: "Documents",\r
    },\r
] as const;\r
\r
const FormSchema = z.object({\r
    items: z.array(z.string()).refine((value) => value.some((item) => item), {\r
        message: "You have to select at least one item.",\r
    }),\r
});\r
\r
const FormCheckboxCode = () => {\r
    const form = useForm<z.infer<typeof FormSchema>>({\r
        resolver: zodResolver(FormSchema),\r
        defaultValues: {\r
            items: ["recents", "home"],\r
        },\r
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
        <Form {...form}>\r
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">\r
                <FormField\r
                    control={form.control}\r
                    name="items"\r
                    render={() => (\r
                        <FormItem>\r
                            <div className="mb-4">\r
\r
                                <FormDescription>\r
                                    Select the items you want to display in the sidebar.\r
                                </FormDescription>\r
                            </div>\r
                            {items.map((item) => (\r
                                <FormField\r
                                    key={item.id}\r
                                    control={form.control}\r
                                    name="items"\r
                                    render={({ field }) => {\r
                                        return (\r
                                            <FormItem\r
                                                key={item.id}\r
                                                className="flex flex-row items-start space-x-3 space-y-0"\r
                                            >\r
                                                <FormControl>\r
                                                    <Checkbox\r
                                                        checked={field.value?.includes(item.id)}\r
                                                        onCheckedChange={(checked) => {\r
                                                            return checked\r
                                                                ? field.onChange([...(field.value || []), item.id])\r
                                                                : field.onChange(\r
                                                                    field.value?.filter(\r
                                                                        (value) => value !== item.id\r
                                                                    )\r
                                                                );\r
                                                        }}\r
                                                    />\r
                                                </FormControl>\r
                                                <FormLabel className="font-normal">\r
                                                    {item.label}\r
                                                </FormLabel>\r
                                            </FormItem>\r
                                        );\r
                                    }}\r
                                />\r
                            ))}\r
                            <FormMessage />\r
                        </FormItem>\r
                    )}\r
                />\r
                <Button type="submit">Submit</Button>\r
            </form>\r
        </Form>\r
    );\r
};\r
\r
export default FormCheckboxCode;\r
`,O=`import { Checkbox } from "src/components/ui/checkbox";\r
\r
const CheckboxWithTextCode = () => {\r
    return (\r
        <>\r
            <div className="flex flex-col gap-4">\r
                <div className="items-top flex space-x-2">\r
                    <Checkbox id="term" />\r
                    <div>\r
                        <label htmlFor="term" className="text-ld">\r
                            Accept terms and conditions\r
                        </label>\r
                        <p className="text-sm text-muted-foreground">\r
                            You agree to our Terms of Service and Privacy Policy.\r
                        </p>\r
                    </div>\r
                </div>\r
\r
                <div className="items-top flex space-x-2">\r
                    <Checkbox id="privacy2" />\r
                    <div>\r
                        <label htmlFor="privacy2" className="text-ld">\r
                            Accept privacy policy\r
                        </label>\r
                        <p className="text-sm text-muted-foreground">\r
                            You agree to our Terms of Service and Privacy Policy.\r
                        </p>\r
                    </div>\r
                </div>\r
                <div className="items-top flex space-x-2">\r
                    <Checkbox id="continue3" />\r
                    <div>\r
                        <label htmlFor="continue3" className="text-ld">\r
                            Continue to process?\r
                        </label>\r
                        <p className="text-sm text-muted-foreground">\r
                            You agree to our Terms of Service and Privacy Policy.\r
                        </p>\r
                    </div>\r
                </div>\r
                <div className="items-top flex space-x-2">\r
                    <Checkbox id="act3" />\r
                    <div>\r
                        <label htmlFor="act3" className="text-ld">\r
                            Accept terms\r
                        </label>\r
                        <p className="text-sm text-muted-foreground">\r
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,\r
                        </p>\r
                    </div>\r
                </div>\r
            </div>\r
        </>\r
    );\r
};\r
\r
export default CheckboxWithTextCode;\r
`,V=[{to:"/",title:"Home"},{href:"",title:"Checkbox"}],de=()=>e.jsxs(e.Fragment,{children:[e.jsx(D,{title:"Checkbox",items:V}),e.jsxs("div",{className:"grid grid-cols-12 gap-6",children:[e.jsxs("div",{className:"col-span-12",children:[e.jsx(w,{}),e.jsx(c,{children:$})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(P,{}),e.jsx(c,{children:H})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(z,{}),e.jsx(c,{children:M})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(B,{}),e.jsx(c,{children:J})]}),e.jsxs("div",{className:"col-span-12",children:[e.jsx(R,{}),e.jsx(c,{children:O})]})]})]});export{de as default};
