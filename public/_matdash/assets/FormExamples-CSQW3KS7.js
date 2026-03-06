import{j as r,B as u,I as f,m as E}from"./index-B0HXAnM_.js";import{o as h,b as I,a as y,s as i,_ as R,n as Y,u as P,c as k,F as L,d as t,e as a,f as l,g as s,h as m,t as w,i as V}from"./form-BhnZVSYF.js";import{I as d}from"./input-Jj4u6pix.js";import{S as G,a as z,b as D,c as T,d as x}from"./select-CQvCC2Bm.js";import{C as q}from"./checkbox-BLOfyuN1.js";import{S as O}from"./switch-C7CV8TiD.js";import{C as A}from"./card-Cg1w-DhQ.js";import{P as J,a as $,b as Z}from"./popover-Bflb17py.js";import{C as K}from"./calendar-B_u0S7Bi.js";import{f as Q}from"./format-DmHpw79j.js";import{C as S}from"./CodeDialog-C1N4vVlG.js";import{B as W}from"./BreadcrumbComp-9UXnI3U7.js";import"./label-BhB-Yi9j.js";import"./index-BdQq_4o_.js";import"./index-ALK4Ilso.js";import"./index-D0BwLNHV.js";import"./chevron-down-BIjzNVJl.js";import"./createLucideIcon-9FnylcZ7.js";import"./check-C6XU-W2K.js";import"./chevron-right-CYEh_jNb.js";import"./en-US-D4gC_zRa.js";import"./constructFrom-rJN6zrQ_.js";import"./index-BfJfxS1b.js";import"./vsc-dark-plus-C_odMC5h.js";import"./highlight-hCPzqiPq.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./CardBox-DnrW3_OL.js";const _=`\r
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
import {\r
  Select,\r
  SelectContent,\r
  SelectItem,\r
  SelectTrigger,\r
  SelectValue,\r
} from "src/components/ui/select";\r
import { Checkbox } from "src/components/ui/checkbox";\r
import { Switch } from "src/components/ui/switch";\r
import { Icon } from '@iconify/react';\r
\r
function RegistrationFormCode() {\r
  const formSchema = z.object({\r
    fullName: z\r
      .string({ error: "Full Name is required." })\r
      .min(1, "Full Name is required."),\r
    email: z\r
      .string({ error: "Email is required." })\r
      .email("Invalid email address."),\r
    age: z\r
      .number({ error: "Age is required." })\r
      .int("Age must be an integer.")\r
      .min(18, "You must be at least 18 years old."),\r
    address: z.object({\r
      street: z\r
        .string({ error: "Street address is required." })\r
        .min(1, "Street address is required."),\r
      city: z\r
        .string({ error: "City is required." })\r
        .min(1, "City is required."),\r
      zipCode: z\r
        .string({ error: "ZIP Code is required." })\r
        .regex(/^\\d{5}$/, "ZIP Code must be 5 digits."),\r
    }),\r
    phoneNumbers: z\r
      .array(\r
        z\r
          .string({ error: "Phone number is required." })\r
          .min(1, "Phone number cannot be empty.")\r
      )\r
      .min(1, "At least one phone number is required."),\r
    employmentType: z.enum(["Full-time", "Part-time", "Contract"], {\r
      error: "Please select an employment type.",\r
    }),\r
    skills: z.array(z.string()).min(1, "Please select at least one skill."),\r
    openToRemote: z.boolean().default(false),\r
  });\r
  const defaultValues = {\r
    fullName: "",\r
    email: "",\r
    age: 0,\r
    address: {\r
      street: "",\r
      city: "",\r
      zipCode: "",\r
    },\r
    phoneNumbers: [""],\r
    employmentType: "Full-time",\r
    skills: [],\r
    openToRemote: false,\r
  };\r
  const form = useForm<any>({\r
    resolver: zodResolver(formSchema),\r
    defaultValues: defaultValues,\r
  });\r
  const { fields, append, remove } = useFieldArray({\r
    control: form.control,\r
    name: "phoneNumbers",\r
  });\r
  const onSubmit = (data: any) => {\r
    alert(JSON.stringify(data, null, 2));\r
  };\r
  const skillsOptions = [\r
    "React",\r
    "Node.js",\r
    "TypeScript",\r
    "AWS",\r
    "Docker",\r
    "Kubernetes",\r
    "SQL",\r
    "NoSQL",\r
  ];\r
  return (\r
    <Form {...form}>\r
      <form\r
        onSubmit={form.handleSubmit(onSubmit as any)}\r
        className="max-w-full space-y-8 mt-3"\r
      >\r
        <div className="grid grid-cols-12 gap-4 ">\r
          <div className="lg:col-span-6 col-span-12">\r
            <FormField\r
              control={form.control}\r
              name="fullName"\r
              render={({ field }: any) => (\r
                <FormItem>\r
                  <FormLabel>Full Name</FormLabel>\r
                  <FormControl>\r
                    <Input placeholder="John Doe" {...field} />\r
                  </FormControl>\r
                  <FormMessage />\r
                </FormItem>\r
              )}\r
            />\r
          </div>\r
          <div className="lg:col-span-6 cols-span-12">\r
            <FormField\r
              control={form.control}\r
              name="email"\r
              render={({ field }: any) => (\r
                <FormItem>\r
                  <FormLabel>Email</FormLabel>\r
                  <FormControl>\r
                    <Input placeholder="john.doe@example.com" {...field} />\r
                  </FormControl>\r
                  <FormMessage />\r
                </FormItem>\r
              )}\r
            />\r
          </div>\r
          <div className="lg:col-span-6 col-span-12">\r
            <FormField\r
              control={form.control}\r
              name="age"\r
              render={({ field }: any) => (\r
                <FormItem>\r
                  <FormLabel>Age</FormLabel>\r
                  <FormControl>\r
                    <Input\r
                      type="number"\r
                      placeholder="30"\r
                      {...field}\r
                      value={\r
                        field.value === undefined || field.value === null\r
                          ? ""\r
                          : String(field.value)\r
                      }\r
                      onChange={(event: any) =>\r
                        field.onChange(\r
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
          </div>\r
          <div className="col-span-12">\r
            <div>\r
              <FormLabel>Phone Numbers</FormLabel>\r
              {fields.map((field, index) => (\r
                <div key={field.id} className="flex items-end gap-2 mt-2">\r
                  <FormField\r
                    control={form.control}\r
                    name={\`phoneNumbers.\${index}\`}\r
                    render={({ field }) => (\r
                      <FormItem className="flex-grow">\r
                        <FormControl>\r
                          <Input placeholder="555-123-4567" {...field} />\r
                        </FormControl>\r
                        <FormMessage />\r
                      </FormItem>\r
                    )}\r
                  />\r
                  <Button\r
                    type="button"\r
                    variant="destructive"\r
                    onClick={() => remove(index)}\r
                    disabled={fields.length === 1}\r
                  >\r
                    <Icon icon="solar:trash-bin-trash-linear" height={18} />\r
                  </Button>\r
                </div>\r
              ))}\r
              <Button\r
                type="button"\r
                variant="outline"\r
                size="sm"\r
                className="mt-2"\r
                onClick={() => append("")}\r
              >\r
                Add Phone Number\r
              </Button>\r
            </div>\r
          </div>\r
        </div>\r
        <div>\r
          <h3 className="mb-4 text-lg font-medium">Address</h3>\r
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">\r
            <div className="md:col-span-2 col-span-1">\r
              <FormField\r
                control={form.control}\r
                name="address.street"\r
                render={({ field }: any) => (\r
                  <FormItem>\r
                    <FormLabel>Street Address</FormLabel>\r
                    <FormControl>\r
                      <Input placeholder="123 Main St" {...field} />\r
                    </FormControl>\r
                    <FormMessage />\r
                  </FormItem>\r
                )}\r
              />\r
            </div>\r
            <FormField\r
              control={form.control}\r
              name="address.city"\r
              render={({ field }: any) => (\r
                <FormItem>\r
                  <FormLabel>City</FormLabel>\r
                  <FormControl>\r
                    <Input placeholder="Anytown" {...field} />\r
                  </FormControl>\r
                  <FormMessage />\r
                </FormItem>\r
              )}\r
            />\r
            <FormField\r
              control={form.control}\r
              name="address.zipCode"\r
              render={({ field }: any) => (\r
                <FormItem>\r
                  <FormLabel>ZIP Code</FormLabel>\r
                  <FormControl>\r
                    <Input placeholder="12345" {...field} />\r
                  </FormControl>\r
                  <FormMessage />\r
                </FormItem>\r
              )}\r
            />\r
          </div>\r
        </div>\r
        <div>\r
          <h3 className="mb-4 text-lg font-medium">Job Preferences</h3>\r
          <FormField\r
            control={form.control}\r
            name="employmentType"\r
            render={({ field }: any) => (\r
              <FormItem>\r
                <FormLabel>Employment Type</FormLabel>\r
                <Select\r
                  onValueChange={field.onChange}\r
                  defaultValue={field.value}\r
                >\r
                  <FormControl>\r
                    <SelectTrigger>\r
                      <SelectValue placeholder="Select an employment type" />\r
                    </SelectTrigger>\r
                  </FormControl>\r
                  <SelectContent>\r
                    <SelectItem value="Full-time">Full-time</SelectItem>\r
                    <SelectItem value="Part-time">Part-time</SelectItem>\r
                    <SelectItem value="Contract">Contract</SelectItem>\r
                  </SelectContent>\r
                </Select>\r
                <FormMessage />\r
              </FormItem>\r
            )}\r
          />\r
          <FormField\r
            control={form.control}\r
            name="skills"\r
            render={() => (\r
              <FormItem className="mt-4">\r
                <FormLabel>Skills</FormLabel>\r
                <div className="grid grid-cols-2 gap-2">\r
                  {skillsOptions.map((skill: string) => (\r
                    <FormField\r
                      key={skill}\r
                      control={form.control}\r
                      name="skills"\r
                      render={({ field }: any) => (\r
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">\r
                          <FormControl>\r
                            <Checkbox\r
                              checked={field.value?.includes(skill)}\r
                              onCheckedChange={(checked: boolean) => {\r
                                return checked\r
                                  ? field.onChange([...field.value, skill])\r
                                  : field.onChange(\r
                                    field.value?.filter(\r
                                      (value: any) => value !== skill\r
                                    )\r
                                  );\r
                              }}\r
                            />\r
                          </FormControl>\r
                          <FormLabel className="font-normal">{skill}</FormLabel>\r
                        </FormItem>\r
                      )}\r
                    />\r
                  ))}\r
                </div>\r
                <FormMessage />\r
                {form.formState.errors.skills && (\r
                  <p className="text-sm font-medium text-destructive mt-2">\r
                    {form.formState.errors.skills.message as any}\r
                  </p>\r
                )}\r
              </FormItem>\r
            )}\r
          />\r
          <FormField\r
            control={form.control}\r
            name="openToRemote"\r
            render={({ field }: any) => (\r
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-ld p-4 mt-6">\r
                <FormLabel className="text-base">Open to Remote Work</FormLabel>\r
                <FormControl>\r
                  <Switch\r
                    checked={field.value}\r
                    onCheckedChange={field.onChange}\r
                    className="m-0"\r
                  />\r
                </FormControl>\r
                <FormMessage />\r
              </FormItem>\r
            )}\r
          />\r
        </div>\r
        <Button type="submit">Submit Application</Button>\r
      </form>\r
    </Form>\r
  );\r
}\r
\r
export default RegistrationFormCode;\r
`,H=`\r
import { useForm, useFieldArray } from "react-hook-form";\r
import * as z from "zod";\r
import { cn } from "src/lib/utils";\r
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
import {\r
  Select,\r
  SelectContent,\r
  SelectItem,\r
  SelectTrigger,\r
  SelectValue,\r
} from "src/components/ui/select";\r
import { Checkbox } from "src/components/ui/checkbox";\r
import {\r
  Popover,\r
  PopoverContent,\r
  PopoverTrigger,\r
} from "src/components/ui/popover";\r
import { Calendar } from "src/components/ui/calendar";\r
import { format } from "date-fns";\r
import { Icon } from "@iconify/react";\r
\r
function StudentEnrollmentFormCode() {\r
  const formSchema = z.object({\r
    name: z\r
      .string({ error: "Name is required." })\r
      .min(2, "Name must be at least 2 characters."),\r
    email: z\r
      .string({ error: "Email is required." })\r
      .email("Invalid email address."),\r
    dateOfBirth: z\r
      .date({ error: "Date of birth is required." })\r
      .max(new Date(), "Date of birth cannot be in the future.")\r
      .refine((date) => {\r
        const today = new Date();\r
        const eighteenYearsAgo = new Date(\r
          today.getFullYear() - 18,\r
          today.getMonth(),\r
          today.getDate()\r
        );\r
        return date <= eighteenYearsAgo;\r
      }, "Student must be at least 18 years old."),\r
    parentGuardian: z.object({\r
      parentName: z\r
        .string({ error: "Parent/Guardian name is required." })\r
        .min(2, "Name must be at least 2 characters."),\r
      parentPhone: z\r
        .string({ error: "Parent/Guardian phone is required." })\r
        .regex(\r
          /^\\+?[0-9]{7,15}$/,\r
          "Invalid phone number format. E.g., +1234567890"\r
        ),\r
    }),\r
    subjects: z\r
      .array(\r
        z.object({\r
          name: z\r
            .string({ error: "Subject name is required." })\r
            .min(1, "Subject name cannot be empty."),\r
        })\r
      )\r
      .min(1, { message: "At least one subject is required." }),\r
\r
    agreeToTerms: z\r
      .boolean({ error: "You must agree to the terms." })\r
      .refine((val) => val === true, "You must agree to the terms."),\r
  });\r
  const defaultValues = {\r
    name: "",\r
    email: "",\r
    dateOfBirth: new Date(\r
      new Date().setFullYear(new Date().getFullYear() - 18)\r
    ), // Default to 18 years ago\r
    parentGuardian: {\r
      parentName: "",\r
      parentPhone: "",\r
    },\r
    subjects: [{ name: "" }],\r
    gradeLevel: "1st Grade" as "1st Grade", // Initialize with a valid enum member\r
    agreeToTerms: false,\r
  };\r
  const form = useForm<any>({\r
    resolver: zodResolver(formSchema),\r
    defaultValues,\r
  });\r
  const { fields, append, remove } = useFieldArray({\r
    control: form.control,\r
    name: "subjects",\r
  });\r
  const onSubmit = (data: any) => {\r
    alert(JSON.stringify(data, null, 2));\r
  };\r
  const gradeLevels = [\r
    "Kindergarten",\r
    "1st Grade",\r
    "2nd Grade",\r
    "3rd Grade",\r
    "4th Grade",\r
    "5th Grade",\r
    "6th Grade",\r
    "7th Grade",\r
    "8th Grade",\r
    "9th Grade",\r
    "10th Grade",\r
    "11th Grade",\r
    "12th Grade",\r
  ];\r
  return (\r
    <div className="w-full">\r
      <Form {...form}>\r
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-3 text-bodytext">\r
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">\r
            {/* Student Name */}\r
            <FormField\r
              control={form.control}\r
              name="name"\r
              render={({ field }: any) => (\r
                <FormItem>\r
                  <FormLabel>Student Name</FormLabel>\r
                  <FormControl>\r
                    <Input placeholder="John Doe" {...field} />\r
                  </FormControl>\r
                  <FormMessage />\r
                </FormItem>\r
              )}\r
            />\r
            {/* Student Email */}\r
            <FormField\r
              control={form.control}\r
              name="email"\r
              render={({ field }: any) => (\r
                <FormItem>\r
                  <FormLabel>Email</FormLabel>\r
                  <FormControl>\r
                    <Input\r
                      type="email"\r
                      placeholder="john.doe@example.com"\r
                      {...field}\r
                    />\r
                  </FormControl>\r
                  <FormMessage />\r
                </FormItem>\r
              )}\r
            />\r
          </div>\r
          {/* Date of Birth */}\r
          <FormField\r
            control={form.control}\r
            name="dateOfBirth"\r
            render={({ field }: any) => (\r
              <FormItem className="flex flex-col">\r
                <FormLabel>Date of Birth</FormLabel>\r
                <Popover>\r
                  <PopoverTrigger asChild>\r
                    <FormControl>\r
                      <Button\r
                        variant={"outline"}\r
                        className={cn(\r
                          "w-full pl-3 text-left font-normal",\r
                          !field.value && "text-muted-foreground"\r
                        )}\r
                      >\r
                        {field.value ? (\r
                          format(field.value, "PPP")\r
                        ) : (\r
                          <span>Pick a date</span>\r
                        )}\r
                        <Icon\r
                          icon="lucide:calendar"\r
                          className="ml-auto h-4 w-4 opacity-50"\r
                        />\r
                      </Button>\r
                    </FormControl>\r
                  </PopoverTrigger>\r
                  <PopoverContent className="w-auto p-0" align="start">\r
                    <Calendar\r
                      mode="single"\r
                      selected={field.value}\r
                      onSelect={field.onChange}\r
                      disabled={(date) =>\r
                        date > new Date() || date < new Date("1900-01-01")\r
                      }\r
                      captionLayout="dropdown"\r
                      fromYear={1900}\r
                      toYear={new Date().getFullYear()}\r
                      initialFocus\r
                    />\r
                  </PopoverContent>\r
                </Popover>\r
                <FormMessage />\r
              </FormItem>\r
            )}\r
          />\r
          {/* Parent/Guardian Details */}\r
          <fieldset className="space-y-4 border border-ld p-4 rounded-md">\r
            <legend className="text-lg font-semibold px-2">\r
              Parent/Guardian Details\r
            </legend>\r
            <FormField\r
              control={form.control}\r
              name="parentGuardian.parentName"\r
              render={({ field }: any) => (\r
                <FormItem>\r
                  <FormLabel>Parent/Guardian Name</FormLabel>\r
                  <FormControl>\r
                    <Input placeholder="Jane Doe" {...field} />\r
                  </FormControl>\r
                  <FormMessage />\r
                </FormItem>\r
              )}\r
            />\r
            <FormField\r
              control={form.control}\r
              name="parentGuardian.parentPhone"\r
              render={({ field }: any) => (\r
                <FormItem>\r
                  <FormLabel>Parent/Guardian Phone</FormLabel>\r
                  <FormControl>\r
                    <Input type="tel" placeholder="+1234567890" {...field} />\r
                  </FormControl>\r
                  <FormMessage />\r
                </FormItem>\r
              )}\r
            />\r
          </fieldset>\r
          {/* Dynamic Subjects */}\r
          <fieldset className="space-y-4 border border-ld  p-4 rounded-md">\r
            <legend className="text-lg font-semibold px-2">Subjects</legend>\r
            {fields.map((item: any, index: number) => (\r
              <FormField\r
                control={form.control}\r
                key={item.id}\r
                name={\`subjects.\${index}.name\`}\r
                render={({ field }: any) => (\r
                  <FormItem>\r
                    <FormLabel>Subject {index + 1}</FormLabel>\r
                    <div className="flex items-center space-x-2">\r
                      <FormControl>\r
                        <Input placeholder="Mathematics" {...field} />\r
                      </FormControl>\r
                      <Button\r
                        type="button"\r
                        variant="outline"\r
                        size="sm"\r
                        onClick={() => append({ name: "" })}\r
                      >\r
                        <Icon icon="lucide:plus" className="h-4 w-4" />\r
                      </Button>\r
                      <Button\r
                        type="button"\r
                        variant="outline"\r
                        size="sm"\r
                        onClick={() => remove(index)}\r
                        disabled={fields.length === 1}\r
                      >\r
                        <Icon icon="lucide:trash-2" className="h-4 w-4" />\r
                      </Button>\r
                    </div>\r
                    <FormMessage />\r
                  </FormItem>\r
                )}\r
              />\r
            ))}\r
            {form.formState.errors.subjects &&\r
              typeof (form.formState.errors.subjects as any).message ===\r
              "string" && (\r
                <p className="text-sm font-medium text-destructive mt-2">\r
                  {(form.formState.errors.subjects as any).message}\r
                </p>\r
              )}\r
          </fieldset>\r
          {/* Grade Level Select */}\r
          <FormField\r
            control={form.control}\r
            name="gradeLevel"\r
            render={({ field }: any) => (\r
              <FormItem>\r
                <FormLabel>Grade Level</FormLabel>\r
                <Select\r
                  onValueChange={field.onChange}\r
                  defaultValue={field.value}\r
                >\r
                  <FormControl>\r
                    <SelectTrigger>\r
                      <SelectValue placeholder="Select a grade level" />\r
                    </SelectTrigger>\r
                  </FormControl>\r
                  <SelectContent>\r
                    {gradeLevels.map((grade) => (\r
                      <SelectItem key={grade} value={grade}>\r
                        {grade}\r
                      </SelectItem>\r
                    ))}\r
                  </SelectContent>\r
                </Select>\r
                <FormMessage />\r
              </FormItem>\r
            )}\r
          />\r
          {/* Agree to Terms Checkbox */}\r
          <FormField\r
            control={form.control}\r
            name="agreeToTerms"\r
            render={({ field }: any) => (\r
              <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-md border border-ld p-3">\r
                <FormControl>\r
                  <Checkbox\r
                    checked={field.value}\r
                    onCheckedChange={field.onChange}\r
                  />\r
                </FormControl>\r
                <FormLabel className="mb-0">\r
                  I agree to the terms and conditions\r
                </FormLabel>\r
                <FormMessage />\r
              </FormItem>\r
            )}\r
          />\r
          <Button type="submit" className="w-full">\r
            Submit Enrollment\r
          </Button>\r
        </form>\r
      </Form>\r
    </div>\r
  );\r
}\r
\r
export default StudentEnrollmentFormCode;\r
`;function U(){const g=h({fullName:i({error:"Full Name is required."}).min(1,"Full Name is required."),email:i({error:"Email is required."}).email("Invalid email address."),age:Y({error:"Age is required."}).int("Age must be an integer.").min(18,"You must be at least 18 years old."),address:h({street:i({error:"Street address is required."}).min(1,"Street address is required."),city:i({error:"City is required."}).min(1,"City is required."),zipCode:i({error:"ZIP Code is required."}).regex(/^\d{5}$/,"ZIP Code must be 5 digits.")}),phoneNumbers:y(i({error:"Phone number is required."}).min(1,"Phone number cannot be empty.")).min(1,"At least one phone number is required."),employmentType:R(["Full-time","Part-time","Contract"],{error:"Please select an employment type."}),skills:y(i()).min(1,"Please select at least one skill."),openToRemote:I().default(!1)}),F={fullName:"",email:"",age:0,address:{street:"",city:"",zipCode:""},phoneNumbers:[""],employmentType:"Full-time",skills:[],openToRemote:!1},n=P({resolver:w(g),defaultValues:F}),{fields:p,append:j,remove:b}=k({control:n.control,name:"phoneNumbers"}),v=e=>{alert(JSON.stringify(e,null,2))},C=["React","Node.js","TypeScript","AWS","Docker","Kubernetes","SQL","NoSQL"];return r.jsx(L,{...n,children:r.jsxs("form",{onSubmit:n.handleSubmit(v),className:"max-w-full space-y-8 mt-3",children:[r.jsxs("div",{className:"grid grid-cols-12 gap-4 ",children:[r.jsx("div",{className:"lg:col-span-6 col-span-12",children:r.jsx(t,{control:n.control,name:"fullName",render:({field:e})=>r.jsxs(a,{children:[r.jsx(l,{children:"Full Name"}),r.jsx(s,{children:r.jsx(d,{placeholder:"John Doe",...e})}),r.jsx(m,{})]})})}),r.jsx("div",{className:"lg:col-span-6 cols-span-12",children:r.jsx(t,{control:n.control,name:"email",render:({field:e})=>r.jsxs(a,{children:[r.jsx(l,{children:"Email"}),r.jsx(s,{children:r.jsx(d,{placeholder:"john.doe@example.com",...e})}),r.jsx(m,{})]})})}),r.jsx("div",{className:"lg:col-span-6 col-span-12",children:r.jsx(t,{control:n.control,name:"age",render:({field:e})=>r.jsxs(a,{children:[r.jsx(l,{children:"Age"}),r.jsx(s,{children:r.jsx(d,{type:"number",placeholder:"30",...e,value:e.value===void 0||e.value===null?"":String(e.value),onChange:o=>e.onChange(o.target.value===""?void 0:+o.target.value)})}),r.jsx(m,{})]})})}),r.jsx("div",{className:"col-span-12",children:r.jsxs("div",{children:[r.jsx(l,{children:"Phone Numbers"}),p.map((e,o)=>r.jsxs("div",{className:"flex items-end gap-2 mt-2",children:[r.jsx(t,{control:n.control,name:`phoneNumbers.${o}`,render:({field:c})=>r.jsxs(a,{className:"flex-grow",children:[r.jsx(s,{children:r.jsx(d,{placeholder:"555-123-4567",...c})}),r.jsx(m,{})]})}),r.jsx(u,{type:"button",variant:"destructive",onClick:()=>b(o),disabled:p.length===1,children:r.jsx(f,{icon:"solar:trash-bin-trash-linear",height:18})})]},e.id)),r.jsx(u,{type:"button",variant:"outline",size:"sm",className:"mt-2",onClick:()=>j(""),children:"Add Phone Number"})]})})]}),r.jsxs("div",{children:[r.jsx("h3",{className:"mb-4 text-lg font-medium",children:"Address"}),r.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[r.jsx("div",{className:"md:col-span-2 col-span-1",children:r.jsx(t,{control:n.control,name:"address.street",render:({field:e})=>r.jsxs(a,{children:[r.jsx(l,{children:"Street Address"}),r.jsx(s,{children:r.jsx(d,{placeholder:"123 Main St",...e})}),r.jsx(m,{})]})})}),r.jsx(t,{control:n.control,name:"address.city",render:({field:e})=>r.jsxs(a,{children:[r.jsx(l,{children:"City"}),r.jsx(s,{children:r.jsx(d,{placeholder:"Anytown",...e})}),r.jsx(m,{})]})}),r.jsx(t,{control:n.control,name:"address.zipCode",render:({field:e})=>r.jsxs(a,{children:[r.jsx(l,{children:"ZIP Code"}),r.jsx(s,{children:r.jsx(d,{placeholder:"12345",...e})}),r.jsx(m,{})]})})]})]}),r.jsxs("div",{children:[r.jsx("h3",{className:"mb-4 text-lg font-medium",children:"Job Preferences"}),r.jsx(t,{control:n.control,name:"employmentType",render:({field:e})=>r.jsxs(a,{children:[r.jsx(l,{children:"Employment Type"}),r.jsxs(G,{onValueChange:e.onChange,defaultValue:e.value,children:[r.jsx(s,{children:r.jsx(z,{children:r.jsx(D,{placeholder:"Select an employment type"})})}),r.jsxs(T,{children:[r.jsx(x,{value:"Full-time",children:"Full-time"}),r.jsx(x,{value:"Part-time",children:"Part-time"}),r.jsx(x,{value:"Contract",children:"Contract"})]})]}),r.jsx(m,{})]})}),r.jsx(t,{control:n.control,name:"skills",render:()=>r.jsxs(a,{className:"mt-4",children:[r.jsx(l,{children:"Skills"}),r.jsx("div",{className:"grid grid-cols-2 gap-2",children:C.map(e=>r.jsx(t,{control:n.control,name:"skills",render:({field:o})=>{var c;return r.jsxs(a,{className:"flex flex-row items-start space-x-3 space-y-0",children:[r.jsx(s,{children:r.jsx(q,{checked:(c=o.value)==null?void 0:c.includes(e),onCheckedChange:B=>{var N;return B?o.onChange([...o.value,e]):o.onChange((N=o.value)==null?void 0:N.filter(M=>M!==e))}})}),r.jsx(l,{className:"font-normal",children:e})]})}},e))}),r.jsx(m,{}),n.formState.errors.skills&&r.jsx("p",{className:"text-sm font-medium text-destructive mt-2",children:n.formState.errors.skills.message})]})}),r.jsx(t,{control:n.control,name:"openToRemote",render:({field:e})=>r.jsxs(a,{className:"flex flex-row items-center justify-between rounded-lg border border-ld p-4 mt-6",children:[r.jsx(l,{className:"text-base",children:"Open to Remote Work"}),r.jsx(s,{children:r.jsx(O,{checked:e.value,onCheckedChange:e.onChange,className:"m-0"})}),r.jsx(m,{})]})})]}),r.jsx(u,{type:"submit",children:"Submit Application"})]})})}function X(){return r.jsx(A,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Registration Form"}),r.jsx(U,{})]})})})}function rr(){const g=h({name:i({error:"Name is required."}).min(2,"Name must be at least 2 characters."),email:i({error:"Email is required."}).email("Invalid email address."),dateOfBirth:V({error:"Date of birth is required."}).max(new Date,"Date of birth cannot be in the future.").refine(e=>{const o=new Date,c=new Date(o.getFullYear()-18,o.getMonth(),o.getDate());return e<=c},"Student must be at least 18 years old."),parentGuardian:h({parentName:i({error:"Parent/Guardian name is required."}).min(2,"Name must be at least 2 characters."),parentPhone:i({error:"Parent/Guardian phone is required."}).regex(/^\+?[0-9]{7,15}$/,"Invalid phone number format. E.g., +1234567890")}),subjects:y(h({name:i({error:"Subject name is required."}).min(1,"Subject name cannot be empty.")})).min(1,{message:"At least one subject is required."}),agreeToTerms:I({error:"You must agree to the terms."}).refine(e=>e===!0,"You must agree to the terms.")}),F={name:"",email:"",dateOfBirth:new Date(new Date().setFullYear(new Date().getFullYear()-18)),parentGuardian:{parentName:"",parentPhone:""},subjects:[{name:""}],gradeLevel:"1st Grade",agreeToTerms:!1},n=P({resolver:w(g),defaultValues:F}),{fields:p,append:j,remove:b}=k({control:n.control,name:"subjects"}),v=e=>{alert(JSON.stringify(e,null,2))},C=["Kindergarten","1st Grade","2nd Grade","3rd Grade","4th Grade","5th Grade","6th Grade","7th Grade","8th Grade","9th Grade","10th Grade","11th Grade","12th Grade"];return r.jsx("div",{className:"w-full",children:r.jsx(L,{...n,children:r.jsxs("form",{onSubmit:n.handleSubmit(v),className:"space-y-6 mt-3 text-bodytext",children:[r.jsxs("div",{className:"grid md:grid-cols-2 grid-cols-1 gap-4",children:[r.jsx(t,{control:n.control,name:"name",render:({field:e})=>r.jsxs(a,{children:[r.jsx(l,{children:"Student Name"}),r.jsx(s,{children:r.jsx(d,{placeholder:"John Doe",...e})}),r.jsx(m,{})]})}),r.jsx(t,{control:n.control,name:"email",render:({field:e})=>r.jsxs(a,{children:[r.jsx(l,{children:"Email"}),r.jsx(s,{children:r.jsx(d,{type:"email",placeholder:"john.doe@example.com",...e})}),r.jsx(m,{})]})})]}),r.jsx(t,{control:n.control,name:"dateOfBirth",render:({field:e})=>r.jsxs(a,{className:"flex flex-col",children:[r.jsx(l,{children:"Date of Birth"}),r.jsxs(J,{children:[r.jsx($,{asChild:!0,children:r.jsx(s,{children:r.jsxs(u,{variant:"outline",className:E("w-full pl-3 text-left font-normal",!e.value&&"text-muted-foreground"),children:[e.value?Q(e.value,"PPP"):r.jsx("span",{children:"Pick a date"}),r.jsx(f,{icon:"lucide:calendar",className:"ml-auto h-4 w-4 opacity-50"})]})})}),r.jsx(Z,{className:"w-auto p-0",align:"start",children:r.jsx(K,{mode:"single",selected:e.value,onSelect:e.onChange,disabled:o=>o>new Date||o<new Date("1900-01-01"),captionLayout:"dropdown",fromYear:1900,toYear:new Date().getFullYear(),initialFocus:!0})})]}),r.jsx(m,{})]})}),r.jsxs("fieldset",{className:"space-y-4 border border-ld p-4 rounded-md",children:[r.jsx("legend",{className:"text-lg font-semibold px-2",children:"Parent/Guardian Details"}),r.jsx(t,{control:n.control,name:"parentGuardian.parentName",render:({field:e})=>r.jsxs(a,{children:[r.jsx(l,{children:"Parent/Guardian Name"}),r.jsx(s,{children:r.jsx(d,{placeholder:"Jane Doe",...e})}),r.jsx(m,{})]})}),r.jsx(t,{control:n.control,name:"parentGuardian.parentPhone",render:({field:e})=>r.jsxs(a,{children:[r.jsx(l,{children:"Parent/Guardian Phone"}),r.jsx(s,{children:r.jsx(d,{type:"tel",placeholder:"+1234567890",...e})}),r.jsx(m,{})]})})]}),r.jsxs("fieldset",{className:"space-y-4 border border-ld  p-4 rounded-md",children:[r.jsx("legend",{className:"text-lg font-semibold px-2",children:"Subjects"}),p.map((e,o)=>r.jsx(t,{control:n.control,name:`subjects.${o}.name`,render:({field:c})=>r.jsxs(a,{children:[r.jsxs(l,{children:["Subject ",o+1]}),r.jsxs("div",{className:"flex items-center space-x-2",children:[r.jsx(s,{children:r.jsx(d,{placeholder:"Mathematics",...c})}),r.jsx(u,{type:"button",variant:"outline",size:"sm",onClick:()=>j({name:""}),children:r.jsx(f,{icon:"lucide:plus",className:"h-4 w-4"})}),r.jsx(u,{type:"button",variant:"outline",size:"sm",onClick:()=>b(o),disabled:p.length===1,children:r.jsx(f,{icon:"lucide:trash-2",className:"h-4 w-4"})})]}),r.jsx(m,{})]})},e.id)),n.formState.errors.subjects&&typeof n.formState.errors.subjects.message=="string"&&r.jsx("p",{className:"text-sm font-medium text-destructive mt-2",children:n.formState.errors.subjects.message})]}),r.jsx(t,{control:n.control,name:"gradeLevel",render:({field:e})=>r.jsxs(a,{children:[r.jsx(l,{children:"Grade Level"}),r.jsxs(G,{onValueChange:e.onChange,defaultValue:e.value,children:[r.jsx(s,{children:r.jsx(z,{children:r.jsx(D,{placeholder:"Select a grade level"})})}),r.jsx(T,{children:C.map(o=>r.jsx(x,{value:o,children:o},o))})]}),r.jsx(m,{})]})}),r.jsx(t,{control:n.control,name:"agreeToTerms",render:({field:e})=>r.jsxs(a,{className:"flex flex-row items-start gap-3 space-y-0 rounded-md border border-ld p-3",children:[r.jsx(s,{children:r.jsx(q,{checked:e.value,onCheckedChange:e.onChange})}),r.jsx(l,{className:"mb-0",children:"I agree to the terms and conditions"}),r.jsx(m,{})]})}),r.jsx(u,{type:"submit",className:"w-full",children:"Submit Enrollment"})]})})})}function er(){return r.jsx(A,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Registration Form"}),r.jsx(rr,{})]})})})}const nr=[{to:"/",title:"Home"},{title:"Form Examples"}],Dr=()=>r.jsxs(r.Fragment,{children:[r.jsx(W,{title:"Form Examples",items:nr}),r.jsxs("div",{className:"flex flex-col gap-6",children:[r.jsxs("div",{children:[r.jsx(X,{}),r.jsx(S,{children:_})]}),r.jsxs("div",{children:[r.jsx(er,{}),r.jsx(S,{children:H})]})]})]});export{Dr as default};
