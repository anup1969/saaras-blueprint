import{j as r,B as i,I as h}from"./index-hJ2SD4IE.js";import{C as S}from"./card-lwgsVE9g.js";import{o as v,a as w,n as q,s as N,u as I,c as M,F as R,d as l,e as c,f as d,g as u,h as f,t as z}from"./form-UHaa0Nb6.js";import{I as p}from"./input-Du6STFwn.js";import{C}from"./CodeDialog-BfgoSlBj.js";import{B}from"./BreadcrumbComp-O0ZCyfoZ.js";import"./label-7UXKcfN1.js";import"./index-u1GrS9Dt.js";import"./vsc-dark-plus-BS5XCmWA.js";import"./highlight-C_eLAOnJ.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./CardBox-B317o365.js";import"./chevron-right-Dqa42BwH.js";import"./createLucideIcon-sKS6wsf3.js";const A=`\r
import { useForm, useFieldArray } from "react-hook-form";\r
import * as z from "zod";\r
import { zodResolver } from "@hookform/resolvers/zod";\r
import {\r
  Form,\r
  FormField,\r
  FormItem,\r
  FormLabel,\r
  FormControl,\r
  FormMessage,\r
} from "src/components/ui/form";\r
import { Input } from "src/components/ui/input";\r
import { Button } from "src/components/ui/button";\r
import { Icon } from "@iconify/react";\r
\r
function CourseRepeaterFormCode() {\r
  const formSchema = z.object({\r
    courses: z\r
      .array(\r
        z.object({\r
          courseName: z\r
            .string({ error: "Course Name is required." })\r
            .min(1, "Course Name is required."),\r
          credits: z\r
            .number({ error: "Credits is required." })\r
            .int("Credits must be an integer.")\r
            .min(1, "Minimum credits is 1.")\r
            .max(6, "Maximum credits is 6."),\r
        })\r
      )\r
      .min(1, "At least one course is required."),\r
  });\r
  type FormValues = z.infer<typeof formSchema>;\r
  const defaultValues: FormValues = {\r
    courses: [{ courseName: "", credits: 0 }],\r
  };\r
  const form = useForm<any>({\r
    resolver: zodResolver(formSchema),\r
    defaultValues,\r
  });\r
  const { fields, append, remove } = useFieldArray({\r
    control: form.control,\r
    name: "courses",\r
  });\r
  const onSubmit = async (data: any) => {\r
    alert(JSON.stringify(data, null, 2));\r
  };\r
  return (\r
    <div className="max-w-full mt-2">\r
      <Form {...form}>\r
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">\r
          <div>\r
            {fields.map((field, index) => (\r
              <div\r
                key={field.id}\r
                className="flex flex-col sm:flex-row gap-4 mb-4 p-4 border  border-ld rounded-md"\r
              >\r
                <FormField\r
                  control={form.control}\r
                  name={\`courses.\${index}.courseName\`}\r
                  render={({ field: courseNameField }) => (\r
                    <FormItem className="flex-grow">\r
                      <FormLabel>Course Name</FormLabel>\r
                      <FormControl>\r
                        <Input\r
                          placeholder="Introduction to React"\r
                          {...courseNameField}\r
                        />\r
                      </FormControl>\r
                      <FormMessage />\r
                    </FormItem>\r
                  )}\r
                />\r
                <FormField\r
                  control={form.control}\r
                  name={\`courses.\${index}.credits\`}\r
                  render={({ field: creditsField }) => (\r
                    <FormItem className="w-full sm:w-auto">\r
                      <FormLabel>Credits</FormLabel>\r
                      <FormControl>\r
                        <Input\r
                          type="number"\r
                          placeholder="3"\r
                          {...creditsField}\r
                          value={\r
                            creditsField.value === undefined ||\r
                              creditsField.value === null\r
                              ? ""\r
                              : String(creditsField.value)\r
                          }\r
                          onChange={(event) =>\r
                            creditsField.onChange(\r
                              event.target.value === ""\r
                                ? undefined\r
                                : +event.target.value\r
                            )\r
                          }\r
                        />\r
                      </FormControl>\r
                      <FormMessage />\r
                    </FormItem>\r
                  )}\r
                />\r
                <Button\r
                  type="button"\r
                  variant="outline"\r
                  onClick={() => append({ courseName: "", credits: 0 })}\r
                  className="mt-auto self-start sm:self-end"\r
                >\r
                  <Icon icon="lucide:plus" className="h-4 w-4" />\r
                </Button>\r
                {fields.length > 1 && (\r
                  <Button\r
                    type="button"\r
                    variant="destructive"\r
                    onClick={() => remove(index)}\r
                    className="mt-auto self-start sm:self-end text-white"\r
                  >\r
                    <Icon icon="lucide:trash" className="h-4 w-4" />\r
                  </Button>\r
                )}\r
              </div>\r
            ))}\r
\r
            {form.formState.errors.courses && (\r
              <p className="text-sm font-medium text-destructive mt-2">\r
                {form.formState.errors.courses?.message as any}\r
              </p>\r
            )}\r
          </div>\r
          <Button type="submit" className="mt-2">\r
            Submit\r
          </Button>\r
        </form>\r
      </Form>\r
    </div>\r
  );\r
}\r
\r
export default CourseRepeaterFormCode;\r
`,k=`\r
import { useForm, useFieldArray } from "react-hook-form";\r
import * as z from "zod";\r
import { zodResolver } from "@hookform/resolvers/zod";\r
import { Icon } from "@iconify/react";\r
import {\r
  Form,\r
  FormField,\r
  FormItem,\r
  FormLabel,\r
  FormControl,\r
  FormMessage,\r
} from "src/components/ui/form";\r
import { Input } from "src/components/ui/input";\r
import { Button } from "src/components/ui/button";\r
\r
function DailyActivityRepeaterFormCode() {\r
  const activitySchema = z.object({\r
    time: z\r
      .string({ error: "Time is required." })\r
      .regex(\r
        /^([01]\\d|2[0-3]):([0-5]\\d)$/,\r
        "Time must be in HH:mm format (e.g., 09:30)."\r
      ),\r
    activityTitle: z\r
      .string({ error: "Activity Title is required." })\r
      .min(1, "Activity Title cannot be empty."),\r
  });\r
  const formSchema = z.object({\r
    activities: z\r
      .array(activitySchema)\r
      .min(1, "Please add at least one activity."),\r
  });\r
  const defaultValues = {\r
    activities: [{ time: "09:00", activityTitle: "Morning Meeting" }],\r
  };\r
  const form = useForm<any>({\r
    resolver: zodResolver(formSchema),\r
    defaultValues,\r
  });\r
  const { fields, append, remove } = useFieldArray({\r
    control: form.control,\r
    name: "activities",\r
  });\r
  const onSubmit = async (data: any) => {\r
    alert(JSON.stringify(data, null, 2));\r
  };\r
  return (\r
    <Form {...form}>\r
      <form\r
        onSubmit={form.handleSubmit(onSubmit)}\r
        className="space-y-4 max-w-full mt-2"\r
      >\r
        {fields.map((item, index) => (\r
          <div\r
            key={item.id}\r
            className="flex flex-col sm:flex-row gap-4 border border-ld p-4 rounded-md"\r
          >\r
            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">\r
              <FormField\r
                control={form.control}\r
                name={\`activities.\${index}.time\`}\r
                render={({ field }) => (\r
                  <FormItem>\r
                    <FormLabel>Time (HH:mm)</FormLabel>\r
                    <FormControl>\r
                      <Input type="time" placeholder="HH:mm" {...field} />\r
                    </FormControl>\r
                    <FormMessage />\r
                  </FormItem>\r
                )}\r
              />\r
              <FormField\r
                control={form.control}\r
                name={\`activities.\${index}.activityTitle\`}\r
                render={({ field }) => (\r
                  <FormItem>\r
                    <FormLabel>Activity Title</FormLabel>\r
                    <FormControl>\r
                      <Input\r
                        type="text"\r
                        placeholder="e.g., Standup Meeting"\r
                        {...field}\r
                      />\r
                    </FormControl>\r
                    <FormMessage />\r
                  </FormItem>\r
                )}\r
              />\r
            </div>\r
            <div className="flex items-end justify-end gap-2 sm:justify-start">\r
              <Button\r
                type="button"\r
                onClick={() => append({ time: "", activityTitle: "" })}\r
                className="w-10 h-10"\r
              >\r
                <Icon icon="mdi:plus" className="h-4 w-4 " />\r
              </Button>\r
              {fields.length > 1 && (\r
                <Button\r
                  type="button"\r
                  variant="destructive"\r
                  size="icon"\r
                  onClick={() => remove(index)}\r
                  className="w-10 h-10 text-white"\r
                >\r
                  <Icon icon="mdi:trash-can-outline" className="h-4 w-4" />\r
                  <span className="sr-only">Remove activity</span>\r
                </Button>\r
              )}\r
            </div>\r
          </div>\r
        ))}\r
        {form.formState.errors.activities && (\r
          <p className="text-sm font-medium text-destructive mt-2">\r
            {form.formState.errors.activities.message as any}\r
          </p>\r
        )}\r
        <div className="flex items-center gap-4">\r
          <Button type="submit" className="w-fit mt-0">\r
            Submit\r
          </Button>\r
        </div>\r
      </form>\r
    </Form>\r
  );\r
}\r
\r
export default DailyActivityRepeaterFormCode;\r
`,L=`import { useForm, useFieldArray } from "react-hook-form";\r
import * as z from "zod";\r
import { zodResolver } from "@hookform/resolvers/zod";\r
import {\r
  Form,\r
  FormField,\r
  FormItem,\r
  FormLabel,\r
  FormControl,\r
  FormMessage,\r
} from "src/components/ui/form";\r
import { Input } from "src/components/ui/input";\r
import { Button } from "src/components/ui/button";\r
import { Icon } from "@iconify/react";\r
\r
function EcommRepeaterFormCode() {\r
  const itemSchema = z.object({\r
    itemName: z\r
      .string({ error: "Item Name is required." })\r
      .min(1, "Item Name cannot be empty."),\r
    quantity: z\r
      .number({ error: "Quantity is required." })\r
      .int("Quantity must be an integer.")\r
      .min(1, "Quantity must be at least 1."),\r
    unitPrice: z\r
      .number({ error: "Unit Price is required." })\r
      .min(0.01, "Unit Price must be positive."),\r
  });\r
  const formSchema = z.object({\r
    items: z.array(itemSchema).min(1, "At least one item is required."),\r
  });\r
  const defaultValues = {\r
    items: [{ itemName: "", quantity: 1, unitPrice: 0.01 }],\r
  };\r
  const form = useForm<any>({\r
    resolver: zodResolver(formSchema),\r
    defaultValues,\r
  });\r
  const { fields, append, remove } = useFieldArray({\r
    control: form.control,\r
    name: "items",\r
  });\r
  const onSubmit = (data: any) => {\r
    alert(JSON.stringify(data, null, 2));\r
  };\r
  return (\r
    <Form {...form}>\r
      <form\r
        onSubmit={form.handleSubmit(onSubmit)}\r
        className="space-y-6 max-w-full mt-2"\r
      >\r
        <div>\r
          {fields.map((field, index) => (\r
            <div\r
              key={field.id}\r
              className="flex flex-col sm:flex-row gap-4 mb-4 p-4 border border-ld rounded-md"\r
            >\r
              <FormField\r
                control={form.control}\r
                name={\`items.\${index}.itemName\`}\r
                render={({ field: itemField }: any) => (\r
                  <FormItem className="w-full">\r
                    <FormLabel>Item Name</FormLabel>\r
                    <FormControl>\r
                      <Input placeholder="e.g., Laptop" {...itemField} />\r
                    </FormControl>\r
                    <FormMessage />\r
                  </FormItem>\r
                )}\r
              />\r
              <FormField\r
                control={form.control}\r
                name={\`items.\${index}.quantity\`}\r
                render={({ field: itemField }: any) => (\r
                  <FormItem className="w-full">\r
                    <FormLabel>Quantity</FormLabel>\r
                    <FormControl>\r
                      <Input\r
                        type="number"\r
                        placeholder="1"\r
                        {...itemField}\r
                        value={\r
                          itemField.value === undefined ||\r
                            itemField.value === null\r
                            ? ""\r
                            : String(itemField.value)\r
                        }\r
                        onChange={(event) =>\r
                          itemField.onChange(\r
                            event.target.value === ""\r
                              ? undefined\r
                              : +event.target.value\r
                          )\r
                        }\r
                      />\r
                    </FormControl>\r
                    <FormMessage />\r
                  </FormItem>\r
                )}\r
              />\r
              <FormField\r
                control={form.control}\r
                name={\`items.\${index}.unitPrice\`}\r
                render={({ field: itemField }: any) => (\r
                  <FormItem className="w-full">\r
                    <FormLabel>Unit Price</FormLabel>\r
                    <FormControl>\r
                      <Input\r
                        type="number"\r
                        placeholder="100.00"\r
                        {...itemField}\r
                        value={\r
                          itemField.value === undefined ||\r
                            itemField.value === null\r
                            ? ""\r
                            : String(itemField.value)\r
                        }\r
                        onChange={(event) =>\r
                          itemField.onChange(\r
                            event.target.value === ""\r
                              ? undefined\r
                              : +event.target.value\r
                          )\r
                        }\r
                      />\r
                    </FormControl>\r
                    <FormMessage />\r
                  </FormItem>\r
                )}\r
              />\r
              <div className="flex gap-2 items-end">\r
                <Button\r
                  type="button"\r
                  onClick={() =>\r
                    append({ itemName: "", quantity: 1, unitPrice: 0.01 })\r
                  }\r
                  variant="outline"\r
                  className="w-fit"\r
                >\r
                  <Icon icon="lucide:plus" className="h-4 w-4" />\r
                </Button>\r
                {fields.length > 1 && (\r
                  <Button\r
                    type="button"\r
                    variant="destructive"\r
                    onClick={() => remove(index)}\r
                    className="w-fit text-white"\r
                  >\r
                    <Icon icon="lucide:trash-2" className="h-4 w-4" />\r
                  </Button>\r
                )}\r
              </div>\r
            </div>\r
          ))}\r
        </div>\r
        <p className="text-sm font-medium text-destructive mt-2">\r
          {form.formState.errors.items?.message as any}\r
        </p>\r
        <div className="flex items-center gap-4">\r
          <Button type="submit" className="w-fit">\r
            Submit\r
          </Button>\r
        </div>\r
      </form>\r
    </Form>\r
  );\r
}\r
\r
export default EcommRepeaterFormCode;\r
`,T=`\r
import { useForm, useFieldArray } from "react-hook-form";\r
import * as z from "zod";\r
import { zodResolver } from "@hookform/resolvers/zod";\r
import {\r
  Form,\r
  FormField,\r
  FormItem,\r
  FormLabel,\r
  FormControl,\r
  FormMessage,\r
} from "src/components/ui/form";\r
import { Input } from "src/components/ui/input";\r
import { Button } from "src/components/ui/button";\r
import { Icon } from "@iconify/react";\r
\r
function EmployeeRepeaterFormCode() {\r
  const teamMemberSchema = z.object({\r
    name: z.string().min(1, { error: "Team member name is required." }),\r
    role: z.string().min(1, { error: "Role is required." }),\r
    email: z.string().email({ error: "Please enter a valid email address." }),\r
  });\r
  const formSchema = z.object({\r
    teamMembers: z\r
      .array(teamMemberSchema)\r
      .min(2, { error: "At least 2 team members are required." }),\r
  });\r
  const defaultValues = {\r
    teamMembers: [\r
      { name: "", role: "", email: "" },\r
      { name: "", role: "", email: "" },\r
    ],\r
  };\r
  const form = useForm<any>({\r
    resolver: zodResolver(formSchema),\r
    defaultValues,\r
    mode: "onChange",\r
  });\r
  const { fields, append, remove } = useFieldArray({\r
    control: form.control,\r
    name: "teamMembers",\r
  });\r
  function onSubmit(data: any) {\r
    alert(JSON.stringify(data, null, 2));\r
  }\r
  return (\r
    <Form {...form}>\r
      <form\r
        onSubmit={form.handleSubmit(onSubmit)}\r
        className="space-y-8 max-w-full mt-2"\r
      >\r
        <div className="space-y-4">\r
          {fields.map((field: any, index: number) => (\r
            <div\r
              key={field.id}\r
              className="flex flex-col sm:flex-row gap-4 items-end border border-ld p-4 rounded-md"\r
            >\r
              <FormField\r
                control={form.control}\r
                name={\`teamMembers.\${index}.name\`}\r
                render={({ field: memberNameField }: any) => (\r
                  <FormItem className="w-full">\r
                    <FormLabel>Team Member Name</FormLabel>\r
                    <FormControl>\r
                      <Input placeholder="John Doe" {...memberNameField} />\r
                    </FormControl>\r
                    <FormMessage />\r
                  </FormItem>\r
                )}\r
              />\r
              <FormField\r
                control={form.control}\r
                name={\`teamMembers.\${index}.role\`}\r
                render={({ field: memberRoleField }: any) => (\r
                  <FormItem className="w-full">\r
                    <FormLabel>Role</FormLabel>\r
                    <FormControl>\r
                      <Input placeholder="Developer" {...memberRoleField} />\r
                    </FormControl>\r
                    <FormMessage />\r
                  </FormItem>\r
                )}\r
              />\r
              <FormField\r
                control={form.control}\r
                name={\`teamMembers.\${index}.email\`}\r
                render={({ field: memberEmailField }: any) => (\r
                  <FormItem className="w-full">\r
                    <FormLabel>Email</FormLabel>\r
                    <FormControl>\r
                      <Input\r
                        placeholder="john.doe@example.com"\r
                        {...memberEmailField}\r
                      />\r
                    </FormControl>\r
                    <FormMessage />\r
                  </FormItem>\r
                )}\r
              />\r
              {fields.length > 1 && (\r
                <Button\r
                  type="button"\r
                  variant="destructive"\r
                  onClick={() => remove(index)}\r
                  className="mt-2 md:mt-0 text-white"\r
                >\r
                  <Icon icon="mdi:trash-can-outline" className="h-4 w-4" />\r
                </Button>\r
              )}\r
            </div>\r
          ))}\r
        </div>\r
        {form.formState.errors.teamMembers && (\r
          <p className="text-sm font-medium text-destructive mt-2">\r
            {form.formState.errors.teamMembers.message as any}\r
          </p>\r
        )}\r
        <div className="flex justify-between gap-2">\r
          <Button type="submit">Submit</Button>\r
          <Button\r
            type="button"\r
            variant="outline"\r
            className=""\r
            onClick={() => append({ name: "", role: "", email: "" })}\r
          >\r
            <Icon icon="mdi:plus" className="mr-2 h-4 w-4" />\r
            Add Team Member\r
          </Button>\r
        </div>\r
      </form>\r
    </Form>\r
  );\r
}\r
\r
export default EmployeeRepeaterFormCode;\r
`;function $(){var x;const F=v({courses:w(v({courseName:N({error:"Course Name is required."}).min(1,"Course Name is required."),credits:q({error:"Credits is required."}).int("Credits must be an integer.").min(1,"Minimum credits is 1.").max(6,"Maximum credits is 6.")})).min(1,"At least one course is required.")}),b={courses:[{courseName:"",credits:0}]},s=I({resolver:z(F),defaultValues:b}),{fields:e,append:a,remove:y}=M({control:s.control,name:"courses"}),j=async m=>{alert(JSON.stringify(m,null,2))};return r.jsx("div",{className:"max-w-full mt-2",children:r.jsx(R,{...s,children:r.jsxs("form",{onSubmit:s.handleSubmit(j),className:"space-y-4",children:[r.jsxs("div",{children:[e.map((m,t)=>r.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 mb-4 p-4 border  border-ld rounded-md",children:[r.jsx(l,{control:s.control,name:`courses.${t}.courseName`,render:({field:n})=>r.jsxs(c,{className:"flex-grow",children:[r.jsx(d,{children:"Course Name"}),r.jsx(u,{children:r.jsx(p,{placeholder:"Introduction to React",...n})}),r.jsx(f,{})]})}),r.jsx(l,{control:s.control,name:`courses.${t}.credits`,render:({field:n})=>r.jsxs(c,{className:"w-full sm:w-auto",children:[r.jsx(d,{children:"Credits"}),r.jsx(u,{children:r.jsx(p,{type:"number",placeholder:"3",...n,value:n.value===void 0||n.value===null?"":String(n.value),onChange:o=>n.onChange(o.target.value===""?void 0:+o.target.value)})}),r.jsx(f,{})]})}),r.jsx(i,{type:"button",variant:"outline",onClick:()=>a({courseName:"",credits:0}),className:"mt-auto self-start sm:self-end",children:r.jsx(h,{icon:"lucide:plus",className:"h-4 w-4"})}),e.length>1&&r.jsx(i,{type:"button",variant:"destructive",onClick:()=>y(t),className:"mt-auto self-start sm:self-end text-white",children:r.jsx(h,{icon:"lucide:trash",className:"h-4 w-4"})})]},m.id)),s.formState.errors.courses&&r.jsx("p",{className:"text-sm font-medium text-destructive mt-2",children:(x=s.formState.errors.courses)==null?void 0:x.message})]}),r.jsx(i,{type:"submit",className:"mt-2",children:"Submit"})]})})})}function P(){return r.jsx(S,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"CourseRepeater Form "}),r.jsx($,{})]})})})}function E(){const F=v({time:N({error:"Time is required."}).regex(/^([01]\d|2[0-3]):([0-5]\d)$/,"Time must be in HH:mm format (e.g., 09:30)."),activityTitle:N({error:"Activity Title is required."}).min(1,"Activity Title cannot be empty.")}),b=v({activities:w(F).min(1,"Please add at least one activity.")}),s={activities:[{time:"09:00",activityTitle:"Morning Meeting"}]},e=I({resolver:z(b),defaultValues:s}),{fields:a,append:y,remove:j}=M({control:e.control,name:"activities"}),x=async m=>{alert(JSON.stringify(m,null,2))};return r.jsx(R,{...e,children:r.jsxs("form",{onSubmit:e.handleSubmit(x),className:"space-y-4 max-w-full mt-2",children:[a.map((m,t)=>r.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 border border-ld p-4 rounded-md",children:[r.jsxs("div",{className:"flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4",children:[r.jsx(l,{control:e.control,name:`activities.${t}.time`,render:({field:n})=>r.jsxs(c,{children:[r.jsx(d,{children:"Time (HH:mm)"}),r.jsx(u,{children:r.jsx(p,{type:"time",placeholder:"HH:mm",...n})}),r.jsx(f,{})]})}),r.jsx(l,{control:e.control,name:`activities.${t}.activityTitle`,render:({field:n})=>r.jsxs(c,{children:[r.jsx(d,{children:"Activity Title"}),r.jsx(u,{children:r.jsx(p,{type:"text",placeholder:"e.g., Standup Meeting",...n})}),r.jsx(f,{})]})})]}),r.jsxs("div",{className:"flex items-end justify-end gap-2 sm:justify-start",children:[r.jsx(i,{type:"button",onClick:()=>y({time:"",activityTitle:""}),className:"w-10 h-10",children:r.jsx(h,{icon:"mdi:plus",className:"h-4 w-4 "})}),a.length>1&&r.jsxs(i,{type:"button",variant:"destructive",size:"icon",onClick:()=>j(t),className:"w-10 h-10 text-white",children:[r.jsx(h,{icon:"mdi:trash-can-outline",className:"h-4 w-4"}),r.jsx("span",{className:"sr-only",children:"Remove activity"})]})]})]},m.id)),e.formState.errors.activities&&r.jsx("p",{className:"text-sm font-medium text-destructive mt-2",children:e.formState.errors.activities.message}),r.jsx("div",{className:"flex items-center gap-4",children:r.jsx(i,{type:"submit",className:"w-fit mt-0",children:"Submit"})})]})})}function V(){return r.jsx(S,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"DailyActivityRepeater Form"}),r.jsx(E,{})]})})})}function H(){var m;const F=v({itemName:N({error:"Item Name is required."}).min(1,"Item Name cannot be empty."),quantity:q({error:"Quantity is required."}).int("Quantity must be an integer.").min(1,"Quantity must be at least 1."),unitPrice:q({error:"Unit Price is required."}).min(.01,"Unit Price must be positive.")}),b=v({items:w(F).min(1,"At least one item is required.")}),s={items:[{itemName:"",quantity:1,unitPrice:.01}]},e=I({resolver:z(b),defaultValues:s}),{fields:a,append:y,remove:j}=M({control:e.control,name:"items"}),x=t=>{alert(JSON.stringify(t,null,2))};return r.jsx(R,{...e,children:r.jsxs("form",{onSubmit:e.handleSubmit(x),className:"space-y-6 max-w-full mt-2",children:[r.jsx("div",{children:a.map((t,n)=>r.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 mb-4 p-4 border border-ld rounded-md",children:[r.jsx(l,{control:e.control,name:`items.${n}.itemName`,render:({field:o})=>r.jsxs(c,{className:"w-full",children:[r.jsx(d,{children:"Item Name"}),r.jsx(u,{children:r.jsx(p,{placeholder:"e.g., Laptop",...o})}),r.jsx(f,{})]})}),r.jsx(l,{control:e.control,name:`items.${n}.quantity`,render:({field:o})=>r.jsxs(c,{className:"w-full",children:[r.jsx(d,{children:"Quantity"}),r.jsx(u,{children:r.jsx(p,{type:"number",placeholder:"1",...o,value:o.value===void 0||o.value===null?"":String(o.value),onChange:g=>o.onChange(g.target.value===""?void 0:+g.target.value)})}),r.jsx(f,{})]})}),r.jsx(l,{control:e.control,name:`items.${n}.unitPrice`,render:({field:o})=>r.jsxs(c,{className:"w-full",children:[r.jsx(d,{children:"Unit Price"}),r.jsx(u,{children:r.jsx(p,{type:"number",placeholder:"100.00",...o,value:o.value===void 0||o.value===null?"":String(o.value),onChange:g=>o.onChange(g.target.value===""?void 0:+g.target.value)})}),r.jsx(f,{})]})}),r.jsxs("div",{className:"flex gap-2 items-end",children:[r.jsx(i,{type:"button",onClick:()=>y({itemName:"",quantity:1,unitPrice:.01}),variant:"outline",className:"w-fit",children:r.jsx(h,{icon:"lucide:plus",className:"h-4 w-4"})}),a.length>1&&r.jsx(i,{type:"button",variant:"destructive",onClick:()=>j(n),className:"w-fit text-white",children:r.jsx(h,{icon:"lucide:trash-2",className:"h-4 w-4"})})]})]},t.id))}),r.jsx("p",{className:"text-sm font-medium text-destructive mt-2",children:(m=e.formState.errors.items)==null?void 0:m.message}),r.jsx("div",{className:"flex items-center gap-4",children:r.jsx(i,{type:"submit",className:"w-fit",children:"Submit"})})]})})}function D(){return r.jsx(S,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"EcommRepeater Form"}),r.jsx(H,{})]})})})}function J(){const F=v({name:N().min(1,{error:"Team member name is required."}),role:N().min(1,{error:"Role is required."}),email:N().email({error:"Please enter a valid email address."})}),b=v({teamMembers:w(F).min(2,{error:"At least 2 team members are required."})}),s={teamMembers:[{name:"",role:"",email:""},{name:"",role:"",email:""}]},e=I({resolver:z(b),defaultValues:s,mode:"onChange"}),{fields:a,append:y,remove:j}=M({control:e.control,name:"teamMembers"});function x(m){alert(JSON.stringify(m,null,2))}return r.jsx(R,{...e,children:r.jsxs("form",{onSubmit:e.handleSubmit(x),className:"space-y-8 max-w-full mt-2",children:[r.jsx("div",{className:"space-y-4",children:a.map((m,t)=>r.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 items-end border border-ld p-4 rounded-md",children:[r.jsx(l,{control:e.control,name:`teamMembers.${t}.name`,render:({field:n})=>r.jsxs(c,{className:"w-full",children:[r.jsx(d,{children:"Team Member Name"}),r.jsx(u,{children:r.jsx(p,{placeholder:"John Doe",...n})}),r.jsx(f,{})]})}),r.jsx(l,{control:e.control,name:`teamMembers.${t}.role`,render:({field:n})=>r.jsxs(c,{className:"w-full",children:[r.jsx(d,{children:"Role"}),r.jsx(u,{children:r.jsx(p,{placeholder:"Developer",...n})}),r.jsx(f,{})]})}),r.jsx(l,{control:e.control,name:`teamMembers.${t}.email`,render:({field:n})=>r.jsxs(c,{className:"w-full",children:[r.jsx(d,{children:"Email"}),r.jsx(u,{children:r.jsx(p,{placeholder:"john.doe@example.com",...n})}),r.jsx(f,{})]})}),a.length>1&&r.jsx(i,{type:"button",variant:"destructive",onClick:()=>j(t),className:"mt-2 md:mt-0 text-white",children:r.jsx(h,{icon:"mdi:trash-can-outline",className:"h-4 w-4"})})]},m.id))}),e.formState.errors.teamMembers&&r.jsx("p",{className:"text-sm font-medium text-destructive mt-2",children:e.formState.errors.teamMembers.message}),r.jsxs("div",{className:"flex justify-between gap-2",children:[r.jsx(i,{type:"submit",children:"Submit"}),r.jsxs(i,{type:"button",variant:"outline",className:"",onClick:()=>y({name:"",role:"",email:""}),children:[r.jsx(h,{icon:"mdi:plus",className:"mr-2 h-4 w-4"}),"Add Team Member"]})]})]})})}function O(){return r.jsx(S,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Registration Form"}),r.jsx(J,{})]})})})}const Q=[{to:"/",title:"Home"},{title:"Repeater"}],lr=()=>r.jsxs(r.Fragment,{children:[r.jsx(B,{title:"Repeater",items:Q}),r.jsxs("div",{className:"flex flex-col gap-6",children:[r.jsxs("div",{children:[r.jsx(D,{}),r.jsx(C,{children:L})]}),r.jsxs("div",{children:[r.jsx(P,{}),r.jsx(C,{children:A})]}),r.jsxs("div",{children:[r.jsx(O,{}),r.jsx(C,{children:T})]}),r.jsxs("div",{children:[r.jsx(V,{}),r.jsx(C,{children:k})]})]})]});export{lr as default};
