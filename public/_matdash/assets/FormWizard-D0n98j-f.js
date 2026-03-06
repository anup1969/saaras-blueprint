import{r as U,j as r,R as J,m as P,B as h,I as y}from"./index-hJ2SD4IE.js";import{C as b,a as k,b as q,c as R}from"./card-lwgsVE9g.js";import{o as g,n as E,s as c,_ as B,a as Q,u as H,c as X,F as _,d as l,e as o,f as s,g as a,h as x,t as W,i as Z,l as D,j as T}from"./form-UHaa0Nb6.js";import{I as m}from"./input-Du6STFwn.js";import{R as Y,a as F}from"./radio-group-CvRI6cnB.js";import{S as K}from"./separator-Bdq0fdbd.js";import{P as rr,a as er,b as nr}from"./popover-D4j7Euer.js";import{C as tr}from"./calendar-D5nBYc85.js";import{f as or}from"./format-DmHpw79j.js";import{C as G}from"./CodeDialog-BfgoSlBj.js";import{B as sr}from"./BreadcrumbComp-O0ZCyfoZ.js";import"./label-7UXKcfN1.js";import"./index-C0o-GyAb.js";import"./index-D8mD82cF.js";import"./index-BHIPmkVH.js";import"./circle-S3Lbo_2L.js";import"./createLucideIcon-sKS6wsf3.js";import"./chevron-right-Dqa42BwH.js";import"./chevron-down-DufQVlM1.js";import"./en-US-D4gC_zRa.js";import"./constructFrom-rJN6zrQ_.js";import"./index-u1GrS9Dt.js";import"./vsc-dark-plus-BS5XCmWA.js";import"./highlight-C_eLAOnJ.js";import"./toConsumableArray-Cia6afFk.js";import"./unsupportedIterableToArray-SCsxY82q.js";import"./defineProperty-M-z99tId.js";import"./extends-CF3RwP-h.js";import"./CardBox-B317o365.js";const ar=`\r
import React from "react";\r
import { useState } from "react";\r
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
import { RadioGroup, RadioGroupItem } from "src/components/ui/radio-group";\r
import { Card, CardContent, CardHeader, CardTitle } from "src/components/ui/card";\r
import { Separator } from "src/components/ui/separator";\r
import { Icon } from "@iconify/react";\r
\r
function EcommFormWizardCode() {\r
  const [currentStep, setCurrentStep] = useState(0);\r
  const cartItemSchema = z.object({\r
    productName: z\r
      .string({ error: "Product name is required." })\r
      .min(1, "Product name cannot be empty."),\r
    quantity: z\r
      .number({ error: "Quantity is required." })\r
      .int("Quantity must be an integer.")\r
      .min(1, "Quantity must be greater than 0."),\r
    unitPrice: z\r
      .number({ error: "Unit price is required." })\r
      .min(0.01, "Unit price must be greater than 0."),\r
  });\r
  const formSchema = z.object({\r
    customerInfo: z.object({\r
      fullName: z\r
        .string({ error: "Full Name is required." })\r
        .min(1, "Full Name cannot be empty."),\r
      email: z\r
        .string({ error: "Email is required." })\r
        .email("Invalid email format."),\r
      phone: z\r
        .string({ error: "Phone number is required." })\r
        .regex(/^\\+?\\d{10,15}$/, "Invalid phone number format."),\r
      address: z.object({\r
        street: z\r
          .string({ error: "Street Address is required." })\r
          .min(1, "Street Address cannot be empty."),\r
        city: z\r
          .string({ error: "City is required." })\r
          .min(1, "City cannot be empty."),\r
        zipCode: z\r
          .string({ error: "ZIP Code is required." })\r
          .regex(/^\\d{5}$/, "ZIP Code must be 5 digits."),\r
      }),\r
    }),\r
    cartItems: z\r
      .array(cartItemSchema)\r
      .min(1, "Please add at least one item to your cart."),\r
    shippingMethod: z.enum(["standard", "express"], {\r
      error: "Please select a shipping method.",\r
    }),\r
    paymentMethod: z.enum(["credit_card", "paypal", "cod"], {\r
      error: "Please select a payment method.",\r
    }),\r
    creditCard: z\r
      .object({\r
        cardNumber: z\r
          .string({ error: "Card number is required." })\r
          .regex(/^\\d{16}$/, "Card number must be 16 digits.")\r
          .optional(),\r
        expirationDate: z\r
          .string({ error: "Expiration date is required." })\r
          .regex(\r
            /^(0[1-9]|1[0-2])\\/?([0-9]{2})$/,\r
            "Invalid expiration date (MM/YY)."\r
          )\r
          .optional(),\r
        cvv: z\r
          .string({ error: "CVV is required." })\r
          .regex(/^\\d{3,4}$/, "CVV must be 3 or 4 digits.")\r
          .optional(),\r
      })\r
      .optional(),\r
  });\r
  const defaultValues = {\r
    customerInfo: {\r
      fullName: "",\r
      email: "",\r
      phone: "",\r
      address: {\r
        street: "",\r
        city: "",\r
        zipCode: "",\r
      },\r
    },\r
    cartItems: [{ productName: "", quantity: 0, unitPrice: 0 }],\r
    shippingMethod: "standard",\r
    paymentMethod: "credit_card",\r
    creditCard: {\r
      cardNumber: "",\r
      expirationDate: "",\r
      cvv: "",\r
    },\r
  };\r
  const form = useForm<any>({\r
    resolver: zodResolver(formSchema),\r
    defaultValues,\r
    mode: "onTouched",\r
  });\r
  const { fields, append, remove } = useFieldArray({\r
    control: form.control,\r
    name: "cartItems",\r
  });\r
  const watchPaymentMethod = form.watch("paymentMethod");\r
  const getSubtotal = (item: any) => {\r
    return (item.quantity || 0) * (item.unitPrice || 0);\r
  };\r
  const getTotal = () => {\r
    const items = form.getValues("cartItems");\r
    return items.reduce((acc: number, item: any) => acc + getSubtotal(item), 0);\r
  };\r
  const steps = [\r
    "Customer Info",\r
    "Cart Items",\r
    "Shipping & Payment",\r
    "Review & Confirm",\r
  ];\r
  const handleNext = async (currentStep: any) => {\r
    let isValid = false;\r
    switch (currentStep) {\r
      case 0: // Customer Info\r
        isValid = await form.trigger([\r
          "customerInfo.fullName",\r
          "customerInfo.email",\r
          "customerInfo.phone",\r
          "customerInfo.address.street",\r
          "customerInfo.address.city",\r
          "customerInfo.address.zipCode",\r
        ]);\r
        break;\r
      case 1: // Cart Items\r
        isValid = await form.trigger("cartItems");\r
        break;\r
      case 2: // Shipping & Payment\r
        const paymentFields = ["shippingMethod", "paymentMethod"];\r
        if (watchPaymentMethod === "credit_card") {\r
          paymentFields.push(\r
            "creditCard.cardNumber",\r
            "creditCard.expirationDate",\r
            "creditCard.cvv"\r
          );\r
        }\r
        isValid = await form.trigger(paymentFields);\r
        break;\r
      default:\r
        isValid = true;\r
    }\r
    if (isValid) {\r
      setCurrentStep((prev) => prev + 1);\r
    }\r
  };\r
  const handleBack = () => {\r
    setCurrentStep((prev) => prev - 1);\r
  };\r
  const onSubmit = (data: any) => {\r
    alert(JSON.stringify(data, null, 2));\r
  };\r
  return (\r
    <div className="max-w-full w-full mx-auto p-0 border-0">\r
      <Form {...form}>\r
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">\r
          {/* Stepper Header */}\r
          <div className="flex justify-between items-center mb-6">\r
            {steps.map((step, index) => (\r
              <React.Fragment key={step}>\r
                <div className="flex flex-col items-center">\r
                  <div\r
                    className={cn(\r
                      "w-8 h-8 rounded-full flex items-center justify-center font-bold",\r
                      index === currentStep\r
                        ? "bg-primary text-primary-foreground"\r
                        : "bg-muted text-muted-foreground"\r
                    )}\r
                  >\r
                    {index + 1}\r
                  </div>\r
                  <span className="text-xs md:text-sm text-bodytext mt-1 text-center">{step}</span>\r
                </div>\r
                {index < steps.length - 1 && (\r
                  <div className="flex-1 h-0.5 bg-gray-300 mx-2" />\r
                )}\r
              </React.Fragment>\r
            ))}\r
          </div>\r
          {/* Step 1: Customer Info */}\r
          {currentStep === 0 && (\r
            <div className="space-y-4">\r
              <h2 className="text-2xl font-bold">Customer Information</h2>\r
              <FormField\r
                control={form.control}\r
                name="customerInfo.fullName"\r
                render={({ field }) => (\r
                  <FormItem>\r
                    <FormLabel>Full Name</FormLabel>\r
                    <FormControl>\r
                      <Input {...field} placeholder="John Doe" />\r
                    </FormControl>\r
                    <FormMessage />\r
                  </FormItem>\r
                )}\r
              />\r
              <FormField\r
                control={form.control}\r
                name="customerInfo.email"\r
                render={({ field }) => (\r
                  <FormItem>\r
                    <FormLabel>Email</FormLabel>\r
                    <FormControl>\r
                      <Input {...field} placeholder="john.doe@example.com" />\r
                    </FormControl>\r
                    <FormMessage />\r
                  </FormItem>\r
                )}\r
              />\r
              <FormField\r
                control={form.control}\r
                name="customerInfo.phone"\r
                render={({ field }) => (\r
                  <FormItem>\r
                    <FormLabel>Phone Number</FormLabel>\r
                    <FormControl>\r
                      <Input {...field} placeholder="+15551234567" />\r
                    </FormControl>\r
                    <FormMessage />\r
                  </FormItem>\r
                )}\r
              />\r
              <FormField\r
                control={form.control}\r
                name="customerInfo.address.street"\r
                render={({ field }) => (\r
                  <FormItem>\r
                    <FormLabel>Street Address</FormLabel>\r
                    <FormControl>\r
                      <Input {...field} placeholder="123 Main St" />\r
                    </FormControl>\r
                    <FormMessage />\r
                  </FormItem>\r
                )}\r
              />\r
              <div className="grid grid-cols-2 gap-4">\r
                <FormField\r
                  control={form.control}\r
                  name="customerInfo.address.city"\r
                  render={({ field }) => (\r
                    <FormItem>\r
                      <FormLabel>City</FormLabel>\r
                      <FormControl>\r
                        <Input {...field} placeholder="Anytown" />\r
                      </FormControl>\r
                      <FormMessage />\r
                    </FormItem>\r
                  )}\r
                />\r
                <FormField\r
                  control={form.control}\r
                  name="customerInfo.address.zipCode"\r
                  render={({ field }) => (\r
                    <FormItem>\r
                      <FormLabel>ZIP Code</FormLabel>\r
                      <FormControl>\r
                        <Input {...field} placeholder="12345" />\r
                      </FormControl>\r
                      <FormMessage />\r
                    </FormItem>\r
                  )}\r
                />\r
              </div>\r
            </div>\r
          )}\r
          {/* Step 2: Cart Items */}\r
          {currentStep === 1 && (\r
            <div className="space-y-4">\r
              <h2 className="text-2xl font-bold">Cart Items</h2>\r
              {fields.map((item, index) => (\r
                <Card key={item.id} className="p-4">\r
                  <div className="flex justify-between items-center mb-2">\r
                    <h3 className="text-lg font-semibold">Item {index + 1}</h3>\r
                    <Button\r
                      type="button"\r
                      variant="ghost"\r
                      size="sm"\r
                      onClick={() => remove(index)}\r
                      disabled={fields.length === 1}\r
                    >\r
                      <Icon icon="lucide:trash" className="h-4 w-4 mr-2" />{" "}\r
                      Remove\r
                    </Button>\r
                  </div>\r
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">\r
                    <FormField\r
                      control={form.control}\r
                      name={\`cartItems.\${index}.productName\`}\r
                      render={({ field }) => (\r
                        <FormItem>\r
                          <FormLabel>Product Name</FormLabel>\r
                          <FormControl>\r
                            <Input {...field} placeholder="Product A" />\r
                          </FormControl>\r
                          <FormMessage />\r
                        </FormItem>\r
                      )}\r
                    />\r
                    <FormField\r
                      control={form.control}\r
                      name={\`cartItems.\${index}.quantity\`}\r
                      render={({ field }) => (\r
                        <FormItem>\r
                          <FormLabel>Quantity</FormLabel>\r
                          <FormControl>\r
                            <Input\r
                              type="number"\r
                              placeholder="1"\r
                              {...field}\r
                              value={\r
                                field.value === undefined ||\r
                                  field.value === null\r
                                  ? ""\r
                                  : String(field.value)\r
                              }\r
                              onChange={(event) =>\r
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
                    <FormField\r
                      control={form.control}\r
                      name={\`cartItems.\${index}.unitPrice\`}\r
                      render={({ field }) => (\r
                        <FormItem>\r
                          <FormLabel>Unit Price</FormLabel>\r
                          <FormControl>\r
                            <Input\r
                              type="number"\r
                              placeholder="10.00"\r
                              step="0.01"\r
                              {...field}\r
                              value={\r
                                field.value === undefined ||\r
                                  field.value === null\r
                                  ? ""\r
                                  : String(field.value)\r
                              }\r
                              onChange={(event) =>\r
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
                  <p className="text-sm text-muted-foreground mt-2">\r
                    Subtotal: $\r
                    {getSubtotal(form.getValues(\`cartItems.\${index}\`)).toFixed(\r
                      2\r
                    )}\r
                  </p>\r
                </Card>\r
              ))}\r
              {form.formState.errors.cartItems && (\r
                <p className="text-sm font-medium text-destructive mt-2">\r
                  {(form.formState.errors.cartItems as any)?.message}\r
                </p>\r
              )}\r
              <Button\r
                type="button"\r
                onClick={() =>\r
                  append({ productName: "", quantity: 0, unitPrice: 0 })\r
                }\r
              >\r
                <Icon icon="lucide:plus-circle" className="h-4 w-4 mr-2" /> Add\r
                Item\r
              </Button>\r
              <div className="mt-4 text-lg font-bold">\r
                Total: \${getTotal().toFixed(2)}\r
              </div>\r
            </div>\r
          )}\r
          {/* Step 3: Shipping & Payment */}\r
          {currentStep === 2 && (\r
            <div className="space-y-6">\r
              <h2 className="text-2xl font-bold">Shipping & Payment</h2>\r
              {/* Shipping Method */}\r
              <FormField\r
                control={form.control}\r
                name="shippingMethod"\r
                render={({ field }) => (\r
                  <FormItem className="space-y-3">\r
                    <FormLabel>Shipping Method</FormLabel>\r
                    <FormControl>\r
                      <RadioGroup\r
                        onValueChange={field.onChange}\r
                        defaultValue={field.value}\r
                        className="flex flex-col space-y-1"\r
                      >\r
                        <FormItem className="flex items-center space-x-3 space-y-0">\r
                          <FormControl>\r
                            <RadioGroupItem value="standard" />\r
                          </FormControl>\r
                          <FormLabel className="font-normal">\r
                            Standard (5-7 business days)\r
                          </FormLabel>\r
                        </FormItem>\r
                        <FormItem className="flex items-center space-x-3 space-y-0">\r
                          <FormControl>\r
                            <RadioGroupItem value="express" />\r
                          </FormControl>\r
                          <FormLabel className="font-normal">\r
                            Express (1-2 business days)\r
                          </FormLabel>\r
                        </FormItem>\r
                      </RadioGroup>\r
                    </FormControl>\r
                    <FormMessage />\r
                  </FormItem>\r
                )}\r
              />\r
              <Separator />\r
              {/* Payment Method */}\r
              <FormField\r
                control={form.control}\r
                name="paymentMethod"\r
                render={({ field }) => (\r
                  <FormItem className="space-y-3">\r
                    <FormLabel>Payment Method</FormLabel>\r
                    <FormControl>\r
                      <RadioGroup\r
                        onValueChange={field.onChange}\r
                        defaultValue={field.value}\r
                        className="flex flex-col space-y-1"\r
                      >\r
                        <FormItem className="flex items-center space-x-3 space-y-0">\r
                          <FormControl>\r
                            <RadioGroupItem value="credit_card" />\r
                          </FormControl>\r
                          <FormLabel className="font-normal">\r
                            Credit Card\r
                          </FormLabel>\r
                        </FormItem>\r
                        <FormItem className="flex items-center space-x-3 space-y-0">\r
                          <FormControl>\r
                            <RadioGroupItem value="paypal" />\r
                          </FormControl>\r
                          <FormLabel className="font-normal">PayPal</FormLabel>\r
                        </FormItem>\r
                        <FormItem className="flex items-center space-x-3 space-y-0">\r
                          <FormControl>\r
                            <RadioGroupItem value="cod" />\r
                          </FormControl>\r
                          <FormLabel className="font-normal">\r
                            Cash on Delivery (COD)\r
                          </FormLabel>\r
                        </FormItem>\r
                      </RadioGroup>\r
                    </FormControl>\r
                    <FormMessage />\r
                  </FormItem>\r
                )}\r
              />\r
              {/* Conditional Credit Card Fields */}\r
              {watchPaymentMethod === "credit_card" && (\r
                <Card className="p-4 space-y-4">\r
                  <h3 className="text-lg font-semibold">Credit Card Details</h3>\r
                  <FormField\r
                    control={form.control}\r
                    name="creditCard.cardNumber"\r
                    render={({ field }) => (\r
                      <FormItem>\r
                        <FormLabel>Card Number</FormLabel>\r
                        <FormControl>\r
                          <Input {...field} placeholder="xxxx xxxx xxxx xxxx" />\r
                        </FormControl>\r
                        <FormMessage />\r
                      </FormItem>\r
                    )}\r
                  />\r
                  <div className="grid grid-cols-2 gap-4">\r
                    <FormField\r
                      control={form.control}\r
                      name="creditCard.expirationDate"\r
                      render={({ field }) => (\r
                        <FormItem>\r
                          <FormLabel>Expiration Date (MM/YY)</FormLabel>\r
                          <FormControl>\r
                            <Input {...field} placeholder="MM/YY" />\r
                          </FormControl>\r
                          <FormMessage />\r
                        </FormItem>\r
                      )}\r
                    />\r
                    <FormField\r
                      control={form.control}\r
                      name="creditCard.cvv"\r
                      render={({ field }) => (\r
                        <FormItem>\r
                          <FormLabel>CVV</FormLabel>\r
                          <FormControl>\r
                            <Input {...field} placeholder="XXX" />\r
                          </FormControl>\r
                          <FormMessage />\r
                        </FormItem>\r
                      )}\r
                    />\r
                  </div>\r
                </Card>\r
              )}\r
            </div>\r
          )}\r
          {/* Step 4: Review & Confirm */}\r
          {currentStep === 3 && (\r
            <div className="space-y-6">\r
              <h2 className="text-2xl font-bold">\r
                Review & Confirm Your Order\r
              </h2>\r
              <Card>\r
                <CardHeader>\r
                  <CardTitle>Customer Information</CardTitle>\r
                </CardHeader>\r
                <CardContent className="space-y-2">\r
                  <p>\r
                    <strong>Full Name:</strong>{" "}\r
                    {form.getValues("customerInfo.fullName")}\r
                  </p>\r
                  <p>\r
                    <strong>Email:</strong>{" "}\r
                    {form.getValues("customerInfo.email")}\r
                  </p>\r
                  <p>\r
                    <strong>Phone:</strong>{" "}\r
                    {form.getValues("customerInfo.phone")}\r
                  </p>\r
                  <p>\r
                    <strong>Address:</strong>{" "}\r
                    {form.getValues("customerInfo.address.street")},{" "}\r
                    {form.getValues("customerInfo.address.city")},{" "}\r
                    {form.getValues("customerInfo.address.zipCode")}\r
                  </p>\r
                </CardContent>\r
              </Card>\r
              <Card>\r
                <CardHeader>\r
                  <CardTitle>Cart Items</CardTitle>\r
                </CardHeader>\r
                <CardContent className="space-y-2">\r
                  {form.getValues("cartItems").map((item: any, index: any) => (\r
                    <div\r
                      key={index}\r
                      className="flex justify-between border-b pb-1 last:border-b-0"\r
                    >\r
                      <span>\r
                        {item.productName} (x{item.quantity})\r
                      </span>\r
                      <span>\${getSubtotal(item).toFixed(2)}</span>\r
                    </div>\r
                  ))}\r
                  <div className="flex justify-between font-bold pt-2">\r
                    <span>Total:</span>\r
                    <span>\${getTotal().toFixed(2)}</span>\r
                  </div>\r
                </CardContent>\r
              </Card>\r
              <Card>\r
                <CardHeader>\r
                  <CardTitle>Shipping & Payment</CardTitle>\r
                </CardHeader>\r
                <CardContent className="space-y-2">\r
                  <p>\r
                    <strong>Shipping Method:</strong>{" "}\r
                    {form.getValues("shippingMethod") === "standard"\r
                      ? "Standard"\r
                      : "Express"}\r
                  </p>\r
                  <p>\r
                    <strong>Payment Method:</strong>{" "}\r
                    {form.getValues("paymentMethod") === "credit_card"\r
                      ? "Credit Card"\r
                      : form.getValues("paymentMethod") === "paypal"\r
                        ? "PayPal"\r
                        : "Cash on Delivery"}\r
                  </p>\r
                  {form.getValues("paymentMethod") === "credit_card" && (\r
                    <div className="pl-4">\r
                      <p>\r
                        <strong>Card Number:</strong> **** **** ****{" "}\r
                        {form.getValues("creditCard.cardNumber")?.slice(-4)}\r
                      </p>\r
                      <p>\r
                        <strong>Expiration Date:</strong>{" "}\r
                        {form.getValues("creditCard.expirationDate")}\r
                      </p>\r
                    </div>\r
                  )}\r
                </CardContent>\r
              </Card>\r
            </div>\r
          )}\r
          {/* Navigation Buttons */}\r
          <div className="flex justify-between mt-8">\r
            {currentStep > 0 && (\r
              <Button type="button" onClick={handleBack} variant="outline">\r
                Back\r
              </Button>\r
            )}\r
            {currentStep < steps.length - 1 && (\r
              <Button\r
                type="button"\r
                onClick={() => handleNext(currentStep)}\r
                className="ml-auto"\r
              >\r
                Next\r
              </Button>\r
            )}\r
            {currentStep === steps.length - 1 && (\r
              <Button type="submit" className="ml-auto">\r
                Confirm Order\r
              </Button>\r
            )}\r
          </div>\r
        </form>\r
      </Form>\r
    </div>\r
  );\r
}\r
\r
export default EcommFormWizardCode;\r
`,lr=`\r
import { useState } from "react";\r
import { useForm } from "react-hook-form";\r
import * as z from "zod";\r
import { cn } from "src/lib/utils";\r
import { zodResolver } from "@hookform/resolvers/zod";\r
import {\r
  Form,\r
  FormField,\r
  FormItem,\r
  FormLabel,\r
  FormControl,\r
} from "src/components/ui/form";\r
import { Input } from "src/components/ui/input";\r
import { Button } from "src/components/ui/button";\r
import {\r
  Popover,\r
  PopoverTrigger,\r
  PopoverContent,\r
} from "src/components/ui/popover";\r
import { Calendar } from "src/components/ui/calendar";\r
import { format } from "date-fns";\r
import { Icon } from "@iconify/react";\r
import { RadioGroup, RadioGroupItem } from "src/components/ui/radio-group";\r
\r
function HealthCareFormWizardCode() {\r
  const accountSchema = z\r
    .object({\r
      username: z.string().min(1, "Username is required."),\r
      email: z\r
        .string()\r
        .min(1, "Email is required.")\r
        .email("Invalid email address."),\r
      password: z.string().min(6, "Password must be at least 6 characters."),\r
      confirmPassword: z.string().min(1, "Confirm password is required."),\r
    })\r
    .refine((data) => data.password === data.confirmPassword, {\r
      message: "Passwords do not match.",\r
      path: ["confirmPassword"],\r
    });\r
  const personalSchema = z.object({\r
    fullName: z.string().min(1, "Full Name is required."),\r
    dob: z\r
      .date({\r
        error: "Date of Birth is required.",\r
      })\r
      .refine((date) => {\r
        const eighteenYearsAgo = new Date();\r
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);\r
        return date <= eighteenYearsAgo;\r
      }, "You must be at least 18 years old."),\r
    phoneNumber: z\r
      .string()\r
      .min(1, "Phone Number is required.")\r
      .regex(\r
        /^\\+?[1-9]\\d{1,14}$/,\r
        "Invalid phone number format (e.g., +1234567890)."\r
      ),\r
    address: z.string().min(1, "Address is required."),\r
    gender: z.enum(["male", "female", "other"], {\r
      error: "Please select a gender.",\r
    }),\r
  });\r
  const socialSchema = z.object({\r
    linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),\r
    twitter: z.string().url("Invalid URL").optional().or(z.literal("")),\r
    github: z.string().url("Invalid URL").optional().or(z.literal("")),\r
  });\r
  const formSchema = z.intersection(\r
    accountSchema,\r
    z.intersection(personalSchema, socialSchema)\r
  );\r
  const defaultValues = {\r
    username: "",\r
    email: "",\r
    password: "",\r
    confirmPassword: "",\r
    fullName: "",\r
    dob: new Date(2000, 0, 1),\r
    phoneNumber: "",\r
    address: "",\r
    gender: "male",\r
    linkedin: "",\r
    twitter: "",\r
    github: "",\r
  };\r
  const form = useForm<any>({\r
    resolver: zodResolver(formSchema),\r
    defaultValues,\r
  });\r
  const [currentStep, setCurrentStep] = useState(0);\r
  const steps = [\r
    {\r
      id: "Account Details",\r
      fields: ["username", "email", "password", "confirmPassword"],\r
    },\r
    {\r
      id: "Personal Info",\r
      fields: ["fullName", "dob", "phoneNumber", "address", "gender"],\r
    },\r
    {\r
      id: "Social Links",\r
      fields: ["linkedin", "twitter", "github"],\r
    },\r
  ];\r
  const handleNext = async () => {\r
    const fieldsToValidate = steps[currentStep].fields as any;\r
    const isValid = await form.trigger(fieldsToValidate, { shouldFocus: true });\r
    if (isValid) {\r
      if (currentStep < steps.length - 1) {\r
        setCurrentStep((prev) => prev + 1);\r
      }\r
    }\r
  };\r
  const handlePrevious = () => {\r
    if (currentStep > 0) {\r
      setCurrentStep((prev) => prev - 1);\r
    }\r
  };\r
  const onSubmit = (data: any) => {\r
    alert(JSON.stringify(data, null, 2));\r
  };\r
  return (\r
    <div className="flex flex-col md:flex-row w-full max-w-full min-h-fit">\r
      <aside className="w-full md:w-1/4 bg-gray-50 dark:bg-dark p-6 border-r flex flex-col justify-start items-start">\r
        <h2 className="text-xl font-bold mb-6">Steps</h2>\r
        <nav className="flex flex-col gap-4 w-full">\r
          {steps.map((step, index) => (\r
            <div\r
              key={step.id}\r
              className={cn(\r
                "flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors whitespace-nowrap",\r
                currentStep === index\r
                  ? "bg-blue-100 text-blue-700 font-semibold"\r
                  : "text-gray-600 hover:bg-gray-100"\r
              )}\r
              onClick={() => setCurrentStep(index)}\r
            >\r
              <div\r
                className={cn(\r
                  "flex items-center justify-center w-8 h-8 rounded-full",\r
                  currentStep === index\r
                    ? "bg-blue-700 text-white"\r
                    : "bg-gray-200 text-gray-500"\r
                )}\r
              >\r
                {index + 1}\r
              </div>\r
              <span>{step.id}</span>\r
            </div>\r
          ))}\r
        </nav>\r
      </aside>\r
      <main className="w-full md:w-3/4 p-8 flex flex-col justify-start">\r
        <Form {...form}>\r
          <form\r
            onSubmit={form.handleSubmit(onSubmit)}\r
            className="space-y-6 w-full max-w-full"\r
          >\r
            {currentStep === 0 && (\r
              <div className="space-y-6">\r
                <h3 className="text-2xl font-bold mb-4 whitespace-nowrap">\r
                  Account Details\r
                </h3>\r
                <FormField\r
                  control={form.control}\r
                  name="username"\r
                  render={({ field }) => (\r
                    <FormItem>\r
                      <FormLabel>Username</FormLabel>\r
                      <FormControl>\r
                        <Input placeholder="johndoe" {...field} />\r
                      </FormControl>\r
                      {form.formState.errors.username && (\r
                        <p className="text-sm font-medium text-destructive mt-2">\r
                          {form.formState.errors.username.message as any}\r
                        </p>\r
                      )}\r
                    </FormItem>\r
                  )}\r
                />\r
                <FormField\r
                  control={form.control}\r
                  name="email"\r
                  render={({ field }) => (\r
                    <FormItem>\r
                      <FormLabel>Email</FormLabel>\r
                      <FormControl>\r
                        <Input placeholder="john@example.com" {...field} />\r
                      </FormControl>\r
                      {form.formState.errors.email && (\r
                        <p className="text-sm font-medium text-destructive mt-2">\r
                          {form.formState.errors.email.message as any}\r
                        </p>\r
                      )}\r
                    </FormItem>\r
                  )}\r
                />\r
                <FormField\r
                  control={form.control}\r
                  name="password"\r
                  render={({ field }) => (\r
                    <FormItem>\r
                      <FormLabel>Password</FormLabel>\r
                      <FormControl>\r
                        <Input type="password" {...field} />\r
                      </FormControl>\r
                      {form.formState.errors.password && (\r
                        <p className="text-sm font-medium text-destructive mt-2">\r
                          {form.formState.errors.password.message as any}\r
                        </p>\r
                      )}\r
                    </FormItem>\r
                  )}\r
                />\r
                <FormField\r
                  control={form.control}\r
                  name="confirmPassword"\r
                  render={({ field }) => (\r
                    <FormItem>\r
                      <FormLabel>Confirm Password</FormLabel>\r
                      <FormControl>\r
                        <Input type="password" {...field} />\r
                      </FormControl>\r
                      {form.formState.errors.confirmPassword && (\r
                        <p className="text-sm font-medium text-destructive mt-2">\r
                          {form.formState.errors.confirmPassword.message as any}\r
                        </p>\r
                      )}\r
                    </FormItem>\r
                  )}\r
                />\r
              </div>\r
            )}\r
            {currentStep === 1 && (\r
              <div className="space-y-6">\r
                <h3 className="text-2xl font-bold mb-4">\r
                  Personal Information\r
                </h3>\r
                <FormField\r
                  control={form.control}\r
                  name="fullName"\r
                  render={({ field }) => (\r
                    <FormItem>\r
                      <FormLabel>Full Name</FormLabel>\r
                      <FormControl>\r
                        <Input placeholder="John Doe" {...field} />\r
                      </FormControl>\r
                      {form.formState.errors.fullName && (\r
                        <p className="text-sm font-medium text-destructive mt-2">\r
                          {form.formState.errors.fullName.message as any}\r
                        </p>\r
                      )}\r
                    </FormItem>\r
                  )}\r
                />\r
                <FormField\r
                  control={form.control}\r
                  name="dob"\r
                  render={({ field }) => (\r
                    <FormItem className="flex flex-col">\r
                      <FormLabel>Date of Birth</FormLabel>\r
                      <Popover>\r
                        <PopoverTrigger asChild>\r
                          <FormControl>\r
                            <Button\r
                              variant={"outline"}\r
                              className={cn(\r
                                "w-[240px] pl-3 text-left font-normal",\r
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
                      {form.formState.errors.dob && (\r
                        <p className="text-sm font-medium text-destructive mt-2">\r
                          {form.formState.errors.dob.message as any}\r
                        </p>\r
                      )}\r
                    </FormItem>\r
                  )}\r
                />\r
                <FormField\r
                  control={form.control}\r
                  name="phoneNumber"\r
                  render={({ field }) => (\r
                    <FormItem>\r
                      <FormLabel>Phone Number</FormLabel>\r
                      <FormControl>\r
                        <Input placeholder="+1234567890" {...field} />\r
                      </FormControl>\r
                      {form.formState.errors.phoneNumber && (\r
                        <p className="text-sm font-medium text-destructive mt-2">\r
                          {form.formState.errors.phoneNumber.message as any}\r
                        </p>\r
                      )}\r
                    </FormItem>\r
                  )}\r
                />\r
                <FormField\r
                  control={form.control}\r
                  name="address"\r
                  render={({ field }) => (\r
                    <FormItem>\r
                      <FormLabel>Address</FormLabel>\r
                      <FormControl>\r
                        <Input placeholder="123 Main St" {...field} />\r
                      </FormControl>\r
                      {form.formState.errors.address && (\r
                        <p className="text-sm font-medium text-destructive mt-2">\r
                          {form.formState.errors.address.message as any}\r
                        </p>\r
                      )}\r
                    </FormItem>\r
                  )}\r
                />\r
                <FormField\r
                  control={form.control}\r
                  name="gender"\r
                  render={({ field }) => (\r
                    <FormItem className="space-y-3">\r
                      <FormLabel>Gender</FormLabel>\r
                      <FormControl>\r
                        <RadioGroup\r
                          onValueChange={field.onChange}\r
                          defaultValue={field.value}\r
                          className="flex flex-col space-y-1"\r
                        >\r
                          <FormItem className="flex items-center space-x-3 space-y-0">\r
                            <FormControl>\r
                              <RadioGroupItem value="male" />\r
                            </FormControl>\r
                            <FormLabel className="font-normal">Male</FormLabel>\r
                          </FormItem>\r
                          <FormItem className="flex items-center space-x-3 space-y-0">\r
                            <FormControl>\r
                              <RadioGroupItem value="female" />\r
                            </FormControl>\r
                            <FormLabel className="font-normal">\r
                              Female\r
                            </FormLabel>\r
                          </FormItem>\r
                          <FormItem className="flex items-center space-x-3 space-y-0">\r
                            <FormControl>\r
                              <RadioGroupItem value="other" />\r
                            </FormControl>\r
                            <FormLabel className="font-normal">Other</FormLabel>\r
                          </FormItem>\r
                        </RadioGroup>\r
                      </FormControl>\r
                      {form.formState.errors.gender && (\r
                        <p className="text-sm font-medium text-destructive mt-2">\r
                          {form.formState.errors.gender.message as any}\r
                        </p>\r
                      )}\r
                    </FormItem>\r
                  )}\r
                />\r
              </div>\r
            )}\r
            {currentStep === 2 && (\r
              <div className="space-y-6">\r
                <h3 className="text-2xl font-bold mb-4">\r
                  Social Links (Optional)\r
                </h3>\r
                <FormField\r
                  control={form.control}\r
                  name="linkedin"\r
                  render={({ field }) => (\r
                    <FormItem>\r
                      <FormLabel>LinkedIn Profile URL</FormLabel>\r
                      <FormControl>\r
                        <Input\r
                          placeholder="https://linkedin.com/in/..."\r
                          {...field}\r
                        />\r
                      </FormControl>\r
                      {form.formState.errors.linkedin && (\r
                        <p className="text-sm font-medium text-destructive mt-2">\r
                          {form.formState.errors.linkedin.message as any}\r
                        </p>\r
                      )}\r
                    </FormItem>\r
                  )}\r
                />\r
                <FormField\r
                  control={form.control}\r
                  name="twitter"\r
                  render={({ field }) => (\r
                    <FormItem>\r
                      <FormLabel>Twitter Profile URL</FormLabel>\r
                      <FormControl>\r
                        <Input\r
                          placeholder="https://twitter.com/..."\r
                          {...field}\r
                        />\r
                      </FormControl>\r
                      {form.formState.errors.twitter && (\r
                        <p className="text-sm font-medium text-destructive mt-2">\r
                          {form.formState.errors.twitter.message as any}\r
                        </p>\r
                      )}\r
                    </FormItem>\r
                  )}\r
                />\r
                <FormField\r
                  control={form.control}\r
                  name="github"\r
                  render={({ field }) => (\r
                    <FormItem>\r
                      <FormLabel>GitHub Profile URL</FormLabel>\r
                      <FormControl>\r
                        <Input\r
                          placeholder="https://github.com/..."\r
                          {...field}\r
                        />\r
                      </FormControl>\r
                      {form.formState.errors.github && (\r
                        <p className="text-sm font-medium text-destructive mt-2">\r
                          {form.formState.errors.github.message as any}\r
                        </p>\r
                      )}\r
                    </FormItem>\r
                  )}\r
                />\r
              </div>\r
            )}\r
            <div className="flex justify-between mt-8">\r
              {currentStep > 0 && (\r
                <Button\r
                  type="button"\r
                  onClick={handlePrevious}\r
                  variant="outline"\r
                >\r
                  <Icon icon="lucide:chevron-left" className="mr-2 h-4 w-4" />{" "}\r
                  Previous\r
                </Button>\r
              )}\r
              <div className="flex-grow" />\r
              {currentStep < steps.length - 1 && (\r
                <Button type="button" onClick={handleNext}>\r
                  Next{" "}\r
                  <Icon icon="lucide:chevron-right" className="ml-2 h-4 w-4" />\r
                </Button>\r
              )}\r
              {currentStep === steps.length - 1 && (\r
                <Button type="submit">Submit</Button>\r
              )}\r
            </div>\r
          </form>\r
        </Form>\r
      </main>\r
    </div>\r
  );\r
}\r
\r
export default HealthCareFormWizardCode;\r
`;function mr(){var A,$;const[f,I]=U.useState(0),L=g({productName:c({error:"Product name is required."}).min(1,"Product name cannot be empty."),quantity:E({error:"Quantity is required."}).int("Quantity must be an integer.").min(1,"Quantity must be greater than 0."),unitPrice:E({error:"Unit price is required."}).min(.01,"Unit price must be greater than 0.")}),z=g({customerInfo:g({fullName:c({error:"Full Name is required."}).min(1,"Full Name cannot be empty."),email:c({error:"Email is required."}).email("Invalid email format."),phone:c({error:"Phone number is required."}).regex(/^\+?\d{10,15}$/,"Invalid phone number format."),address:g({street:c({error:"Street Address is required."}).min(1,"Street Address cannot be empty."),city:c({error:"City is required."}).min(1,"City cannot be empty."),zipCode:c({error:"ZIP Code is required."}).regex(/^\d{5}$/,"ZIP Code must be 5 digits.")})}),cartItems:Q(L).min(1,"Please add at least one item to your cart."),shippingMethod:B(["standard","express"],{error:"Please select a shipping method."}),paymentMethod:B(["credit_card","paypal","cod"],{error:"Please select a payment method."}),creditCard:g({cardNumber:c({error:"Card number is required."}).regex(/^\d{16}$/,"Card number must be 16 digits.").optional(),expirationDate:c({error:"Expiration date is required."}).regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/,"Invalid expiration date (MM/YY).").optional(),cvv:c({error:"CVV is required."}).regex(/^\d{3,4}$/,"CVV must be 3 or 4 digits.").optional()}).optional()}),M={customerInfo:{fullName:"",email:"",phone:"",address:{street:"",city:"",zipCode:""}},cartItems:[{productName:"",quantity:0,unitPrice:0}],shippingMethod:"standard",paymentMethod:"credit_card",creditCard:{cardNumber:"",expirationDate:"",cvv:""}},e=H({resolver:W(z),defaultValues:M,mode:"onTouched"}),{fields:u,append:C,remove:j}=X({control:e.control,name:"cartItems"}),S=e.watch("paymentMethod"),N=t=>(t.quantity||0)*(t.unitPrice||0),w=()=>e.getValues("cartItems").reduce((i,d)=>i+N(d),0),n=["Customer Info","Cart Items","Shipping & Payment","Review & Confirm"],p=async t=>{let i=!1;switch(t){case 0:i=await e.trigger(["customerInfo.fullName","customerInfo.email","customerInfo.phone","customerInfo.address.street","customerInfo.address.city","customerInfo.address.zipCode"]);break;case 1:i=await e.trigger("cartItems");break;case 2:const d=["shippingMethod","paymentMethod"];S==="credit_card"&&d.push("creditCard.cardNumber","creditCard.expirationDate","creditCard.cvv"),i=await e.trigger(d);break;default:i=!0}i&&I(d=>d+1)},V=()=>{I(t=>t-1)},O=t=>{alert(JSON.stringify(t,null,2))};return r.jsx("div",{className:"max-w-full w-full mx-auto p-0 border-0",children:r.jsx(_,{...e,children:r.jsxs("form",{onSubmit:e.handleSubmit(O),className:"space-y-8",children:[r.jsx("div",{className:"flex justify-between items-center mb-6",children:n.map((t,i)=>r.jsxs(J.Fragment,{children:[r.jsxs("div",{className:"flex flex-col items-center",children:[r.jsx("div",{className:P("w-8 h-8 rounded-full flex items-center justify-center font-bold",i===f?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground"),children:i+1}),r.jsx("span",{className:"text-xs md:text-sm text-bodytext mt-1 text-center",children:t})]}),i<n.length-1&&r.jsx("div",{className:"flex-1 h-0.5 bg-gray-300 mx-2"})]},t))}),f===0&&r.jsxs("div",{className:"space-y-4",children:[r.jsx("h2",{className:"text-2xl font-bold",children:"Customer Information"}),r.jsx(l,{control:e.control,name:"customerInfo.fullName",render:({field:t})=>r.jsxs(o,{children:[r.jsx(s,{children:"Full Name"}),r.jsx(a,{children:r.jsx(m,{...t,placeholder:"John Doe"})}),r.jsx(x,{})]})}),r.jsx(l,{control:e.control,name:"customerInfo.email",render:({field:t})=>r.jsxs(o,{children:[r.jsx(s,{children:"Email"}),r.jsx(a,{children:r.jsx(m,{...t,placeholder:"john.doe@example.com"})}),r.jsx(x,{})]})}),r.jsx(l,{control:e.control,name:"customerInfo.phone",render:({field:t})=>r.jsxs(o,{children:[r.jsx(s,{children:"Phone Number"}),r.jsx(a,{children:r.jsx(m,{...t,placeholder:"+15551234567"})}),r.jsx(x,{})]})}),r.jsx(l,{control:e.control,name:"customerInfo.address.street",render:({field:t})=>r.jsxs(o,{children:[r.jsx(s,{children:"Street Address"}),r.jsx(a,{children:r.jsx(m,{...t,placeholder:"123 Main St"})}),r.jsx(x,{})]})}),r.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[r.jsx(l,{control:e.control,name:"customerInfo.address.city",render:({field:t})=>r.jsxs(o,{children:[r.jsx(s,{children:"City"}),r.jsx(a,{children:r.jsx(m,{...t,placeholder:"Anytown"})}),r.jsx(x,{})]})}),r.jsx(l,{control:e.control,name:"customerInfo.address.zipCode",render:({field:t})=>r.jsxs(o,{children:[r.jsx(s,{children:"ZIP Code"}),r.jsx(a,{children:r.jsx(m,{...t,placeholder:"12345"})}),r.jsx(x,{})]})})]})]}),f===1&&r.jsxs("div",{className:"space-y-4",children:[r.jsx("h2",{className:"text-2xl font-bold",children:"Cart Items"}),u.map((t,i)=>r.jsxs(b,{className:"p-4",children:[r.jsxs("div",{className:"flex justify-between items-center mb-2",children:[r.jsxs("h3",{className:"text-lg font-semibold",children:["Item ",i+1]}),r.jsxs(h,{type:"button",variant:"ghost",size:"sm",onClick:()=>j(i),disabled:u.length===1,children:[r.jsx(y,{icon:"lucide:trash",className:"h-4 w-4 mr-2"})," ","Remove"]})]}),r.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[r.jsx(l,{control:e.control,name:`cartItems.${i}.productName`,render:({field:d})=>r.jsxs(o,{children:[r.jsx(s,{children:"Product Name"}),r.jsx(a,{children:r.jsx(m,{...d,placeholder:"Product A"})}),r.jsx(x,{})]})}),r.jsx(l,{control:e.control,name:`cartItems.${i}.quantity`,render:({field:d})=>r.jsxs(o,{children:[r.jsx(s,{children:"Quantity"}),r.jsx(a,{children:r.jsx(m,{type:"number",placeholder:"1",...d,value:d.value===void 0||d.value===null?"":String(d.value),onChange:v=>d.onChange(v.target.value===""?void 0:+v.target.value)})}),r.jsx(x,{})]})}),r.jsx(l,{control:e.control,name:`cartItems.${i}.unitPrice`,render:({field:d})=>r.jsxs(o,{children:[r.jsx(s,{children:"Unit Price"}),r.jsx(a,{children:r.jsx(m,{type:"number",placeholder:"10.00",step:"0.01",...d,value:d.value===void 0||d.value===null?"":String(d.value),onChange:v=>d.onChange(v.target.value===""?void 0:+v.target.value)})}),r.jsx(x,{})]})})]}),r.jsxs("p",{className:"text-sm text-muted-foreground mt-2",children:["Subtotal: $",N(e.getValues(`cartItems.${i}`)).toFixed(2)]})]},t.id)),e.formState.errors.cartItems&&r.jsx("p",{className:"text-sm font-medium text-destructive mt-2",children:(A=e.formState.errors.cartItems)==null?void 0:A.message}),r.jsxs(h,{type:"button",onClick:()=>C({productName:"",quantity:0,unitPrice:0}),children:[r.jsx(y,{icon:"lucide:plus-circle",className:"h-4 w-4 mr-2"})," Add Item"]}),r.jsxs("div",{className:"mt-4 text-lg font-bold",children:["Total: $",w().toFixed(2)]})]}),f===2&&r.jsxs("div",{className:"space-y-6",children:[r.jsx("h2",{className:"text-2xl font-bold",children:"Shipping & Payment"}),r.jsx(l,{control:e.control,name:"shippingMethod",render:({field:t})=>r.jsxs(o,{className:"space-y-3",children:[r.jsx(s,{children:"Shipping Method"}),r.jsx(a,{children:r.jsxs(Y,{onValueChange:t.onChange,defaultValue:t.value,className:"flex flex-col space-y-1",children:[r.jsxs(o,{className:"flex items-center space-x-3 space-y-0",children:[r.jsx(a,{children:r.jsx(F,{value:"standard"})}),r.jsx(s,{className:"font-normal",children:"Standard (5-7 business days)"})]}),r.jsxs(o,{className:"flex items-center space-x-3 space-y-0",children:[r.jsx(a,{children:r.jsx(F,{value:"express"})}),r.jsx(s,{className:"font-normal",children:"Express (1-2 business days)"})]})]})}),r.jsx(x,{})]})}),r.jsx(K,{}),r.jsx(l,{control:e.control,name:"paymentMethod",render:({field:t})=>r.jsxs(o,{className:"space-y-3",children:[r.jsx(s,{children:"Payment Method"}),r.jsx(a,{children:r.jsxs(Y,{onValueChange:t.onChange,defaultValue:t.value,className:"flex flex-col space-y-1",children:[r.jsxs(o,{className:"flex items-center space-x-3 space-y-0",children:[r.jsx(a,{children:r.jsx(F,{value:"credit_card"})}),r.jsx(s,{className:"font-normal",children:"Credit Card"})]}),r.jsxs(o,{className:"flex items-center space-x-3 space-y-0",children:[r.jsx(a,{children:r.jsx(F,{value:"paypal"})}),r.jsx(s,{className:"font-normal",children:"PayPal"})]}),r.jsxs(o,{className:"flex items-center space-x-3 space-y-0",children:[r.jsx(a,{children:r.jsx(F,{value:"cod"})}),r.jsx(s,{className:"font-normal",children:"Cash on Delivery (COD)"})]})]})}),r.jsx(x,{})]})}),S==="credit_card"&&r.jsxs(b,{className:"p-4 space-y-4",children:[r.jsx("h3",{className:"text-lg font-semibold",children:"Credit Card Details"}),r.jsx(l,{control:e.control,name:"creditCard.cardNumber",render:({field:t})=>r.jsxs(o,{children:[r.jsx(s,{children:"Card Number"}),r.jsx(a,{children:r.jsx(m,{...t,placeholder:"xxxx xxxx xxxx xxxx"})}),r.jsx(x,{})]})}),r.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[r.jsx(l,{control:e.control,name:"creditCard.expirationDate",render:({field:t})=>r.jsxs(o,{children:[r.jsx(s,{children:"Expiration Date (MM/YY)"}),r.jsx(a,{children:r.jsx(m,{...t,placeholder:"MM/YY"})}),r.jsx(x,{})]})}),r.jsx(l,{control:e.control,name:"creditCard.cvv",render:({field:t})=>r.jsxs(o,{children:[r.jsx(s,{children:"CVV"}),r.jsx(a,{children:r.jsx(m,{...t,placeholder:"XXX"})}),r.jsx(x,{})]})})]})]})]}),f===3&&r.jsxs("div",{className:"space-y-6",children:[r.jsx("h2",{className:"text-2xl font-bold",children:"Review & Confirm Your Order"}),r.jsxs(b,{children:[r.jsx(k,{children:r.jsx(q,{children:"Customer Information"})}),r.jsxs(R,{className:"space-y-2",children:[r.jsxs("p",{children:[r.jsx("strong",{children:"Full Name:"})," ",e.getValues("customerInfo.fullName")]}),r.jsxs("p",{children:[r.jsx("strong",{children:"Email:"})," ",e.getValues("customerInfo.email")]}),r.jsxs("p",{children:[r.jsx("strong",{children:"Phone:"})," ",e.getValues("customerInfo.phone")]}),r.jsxs("p",{children:[r.jsx("strong",{children:"Address:"})," ",e.getValues("customerInfo.address.street"),","," ",e.getValues("customerInfo.address.city"),","," ",e.getValues("customerInfo.address.zipCode")]})]})]}),r.jsxs(b,{children:[r.jsx(k,{children:r.jsx(q,{children:"Cart Items"})}),r.jsxs(R,{className:"space-y-2",children:[e.getValues("cartItems").map((t,i)=>r.jsxs("div",{className:"flex justify-between border-b pb-1 last:border-b-0",children:[r.jsxs("span",{children:[t.productName," (x",t.quantity,")"]}),r.jsxs("span",{children:["$",N(t).toFixed(2)]})]},i)),r.jsxs("div",{className:"flex justify-between font-bold pt-2",children:[r.jsx("span",{children:"Total:"}),r.jsxs("span",{children:["$",w().toFixed(2)]})]})]})]}),r.jsxs(b,{children:[r.jsx(k,{children:r.jsx(q,{children:"Shipping & Payment"})}),r.jsxs(R,{className:"space-y-2",children:[r.jsxs("p",{children:[r.jsx("strong",{children:"Shipping Method:"})," ",e.getValues("shippingMethod")==="standard"?"Standard":"Express"]}),r.jsxs("p",{children:[r.jsx("strong",{children:"Payment Method:"})," ",e.getValues("paymentMethod")==="credit_card"?"Credit Card":e.getValues("paymentMethod")==="paypal"?"PayPal":"Cash on Delivery"]}),e.getValues("paymentMethod")==="credit_card"&&r.jsxs("div",{className:"pl-4",children:[r.jsxs("p",{children:[r.jsx("strong",{children:"Card Number:"})," **** **** ****"," ",($=e.getValues("creditCard.cardNumber"))==null?void 0:$.slice(-4)]}),r.jsxs("p",{children:[r.jsx("strong",{children:"Expiration Date:"})," ",e.getValues("creditCard.expirationDate")]})]})]})]})]}),r.jsxs("div",{className:"flex justify-between mt-8",children:[f>0&&r.jsx(h,{type:"button",onClick:V,variant:"outline",children:"Back"}),f<n.length-1&&r.jsx(h,{type:"button",onClick:()=>p(f),className:"ml-auto",children:"Next"}),f===n.length-1&&r.jsx(h,{type:"submit",className:"ml-auto",children:"Confirm Order"})]})]})})})}function ir(){return r.jsx(b,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Ecomm Form Wizard"}),r.jsx(mr,{})]})})})}function dr(){const f=g({username:c().min(1,"Username is required."),email:c().min(1,"Email is required.").email("Invalid email address."),password:c().min(6,"Password must be at least 6 characters."),confirmPassword:c().min(1,"Confirm password is required.")}).refine(n=>n.password===n.confirmPassword,{message:"Passwords do not match.",path:["confirmPassword"]}),I=g({fullName:c().min(1,"Full Name is required."),dob:Z({error:"Date of Birth is required."}).refine(n=>{const p=new Date;return p.setFullYear(p.getFullYear()-18),n<=p},"You must be at least 18 years old."),phoneNumber:c().min(1,"Phone Number is required.").regex(/^\+?[1-9]\d{1,14}$/,"Invalid phone number format (e.g., +1234567890)."),address:c().min(1,"Address is required."),gender:B(["male","female","other"],{error:"Please select a gender."})}),L=g({linkedin:c().url("Invalid URL").optional().or(D("")),twitter:c().url("Invalid URL").optional().or(D("")),github:c().url("Invalid URL").optional().or(D(""))}),z=T(f,T(I,L)),M={username:"",email:"",password:"",confirmPassword:"",fullName:"",dob:new Date(2e3,0,1),phoneNumber:"",address:"",gender:"male",linkedin:"",twitter:"",github:""},e=H({resolver:W(z),defaultValues:M}),[u,C]=U.useState(0),j=[{id:"Account Details",fields:["username","email","password","confirmPassword"]},{id:"Personal Info",fields:["fullName","dob","phoneNumber","address","gender"]},{id:"Social Links",fields:["linkedin","twitter","github"]}],S=async()=>{const n=j[u].fields;await e.trigger(n,{shouldFocus:!0})&&u<j.length-1&&C(V=>V+1)},N=()=>{u>0&&C(n=>n-1)},w=n=>{alert(JSON.stringify(n,null,2))};return r.jsxs("div",{className:"flex flex-col md:flex-row w-full max-w-full min-h-fit",children:[r.jsxs("aside",{className:"w-full md:w-1/4 bg-gray-50 dark:bg-dark p-6 border-r flex flex-col justify-start items-start",children:[r.jsx("h2",{className:"text-xl font-bold mb-6",children:"Steps"}),r.jsx("nav",{className:"flex flex-col gap-4 w-full",children:j.map((n,p)=>r.jsxs("div",{className:P("flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors whitespace-nowrap",u===p?"bg-blue-100 text-blue-700 font-semibold":"text-gray-600 hover:bg-gray-100"),onClick:()=>C(p),children:[r.jsx("div",{className:P("flex items-center justify-center w-8 h-8 rounded-full",u===p?"bg-blue-700 text-white":"bg-gray-200 text-gray-500"),children:p+1}),r.jsx("span",{children:n.id})]},n.id))})]}),r.jsx("main",{className:"w-full md:w-3/4 p-8 flex flex-col justify-start",children:r.jsx(_,{...e,children:r.jsxs("form",{onSubmit:e.handleSubmit(w),className:"space-y-6 w-full max-w-full",children:[u===0&&r.jsxs("div",{className:"space-y-6",children:[r.jsx("h3",{className:"text-2xl font-bold mb-4 whitespace-nowrap",children:"Account Details"}),r.jsx(l,{control:e.control,name:"username",render:({field:n})=>r.jsxs(o,{children:[r.jsx(s,{children:"Username"}),r.jsx(a,{children:r.jsx(m,{placeholder:"johndoe",...n})}),e.formState.errors.username&&r.jsx("p",{className:"text-sm font-medium text-destructive mt-2",children:e.formState.errors.username.message})]})}),r.jsx(l,{control:e.control,name:"email",render:({field:n})=>r.jsxs(o,{children:[r.jsx(s,{children:"Email"}),r.jsx(a,{children:r.jsx(m,{placeholder:"john@example.com",...n})}),e.formState.errors.email&&r.jsx("p",{className:"text-sm font-medium text-destructive mt-2",children:e.formState.errors.email.message})]})}),r.jsx(l,{control:e.control,name:"password",render:({field:n})=>r.jsxs(o,{children:[r.jsx(s,{children:"Password"}),r.jsx(a,{children:r.jsx(m,{type:"password",...n})}),e.formState.errors.password&&r.jsx("p",{className:"text-sm font-medium text-destructive mt-2",children:e.formState.errors.password.message})]})}),r.jsx(l,{control:e.control,name:"confirmPassword",render:({field:n})=>r.jsxs(o,{children:[r.jsx(s,{children:"Confirm Password"}),r.jsx(a,{children:r.jsx(m,{type:"password",...n})}),e.formState.errors.confirmPassword&&r.jsx("p",{className:"text-sm font-medium text-destructive mt-2",children:e.formState.errors.confirmPassword.message})]})})]}),u===1&&r.jsxs("div",{className:"space-y-6",children:[r.jsx("h3",{className:"text-2xl font-bold mb-4",children:"Personal Information"}),r.jsx(l,{control:e.control,name:"fullName",render:({field:n})=>r.jsxs(o,{children:[r.jsx(s,{children:"Full Name"}),r.jsx(a,{children:r.jsx(m,{placeholder:"John Doe",...n})}),e.formState.errors.fullName&&r.jsx("p",{className:"text-sm font-medium text-destructive mt-2",children:e.formState.errors.fullName.message})]})}),r.jsx(l,{control:e.control,name:"dob",render:({field:n})=>r.jsxs(o,{className:"flex flex-col",children:[r.jsx(s,{children:"Date of Birth"}),r.jsxs(rr,{children:[r.jsx(er,{asChild:!0,children:r.jsx(a,{children:r.jsxs(h,{variant:"outline",className:P("w-[240px] pl-3 text-left font-normal",!n.value&&"text-muted-foreground"),children:[n.value?or(n.value,"PPP"):r.jsx("span",{children:"Pick a date"}),r.jsx(y,{icon:"lucide:calendar",className:"ml-auto h-4 w-4 opacity-50"})]})})}),r.jsx(nr,{className:"w-auto p-0",align:"start",children:r.jsx(tr,{mode:"single",selected:n.value,onSelect:n.onChange,disabled:p=>p>new Date||p<new Date("1900-01-01"),captionLayout:"dropdown",fromYear:1900,toYear:new Date().getFullYear(),initialFocus:!0})})]}),e.formState.errors.dob&&r.jsx("p",{className:"text-sm font-medium text-destructive mt-2",children:e.formState.errors.dob.message})]})}),r.jsx(l,{control:e.control,name:"phoneNumber",render:({field:n})=>r.jsxs(o,{children:[r.jsx(s,{children:"Phone Number"}),r.jsx(a,{children:r.jsx(m,{placeholder:"+1234567890",...n})}),e.formState.errors.phoneNumber&&r.jsx("p",{className:"text-sm font-medium text-destructive mt-2",children:e.formState.errors.phoneNumber.message})]})}),r.jsx(l,{control:e.control,name:"address",render:({field:n})=>r.jsxs(o,{children:[r.jsx(s,{children:"Address"}),r.jsx(a,{children:r.jsx(m,{placeholder:"123 Main St",...n})}),e.formState.errors.address&&r.jsx("p",{className:"text-sm font-medium text-destructive mt-2",children:e.formState.errors.address.message})]})}),r.jsx(l,{control:e.control,name:"gender",render:({field:n})=>r.jsxs(o,{className:"space-y-3",children:[r.jsx(s,{children:"Gender"}),r.jsx(a,{children:r.jsxs(Y,{onValueChange:n.onChange,defaultValue:n.value,className:"flex flex-col space-y-1",children:[r.jsxs(o,{className:"flex items-center space-x-3 space-y-0",children:[r.jsx(a,{children:r.jsx(F,{value:"male"})}),r.jsx(s,{className:"font-normal",children:"Male"})]}),r.jsxs(o,{className:"flex items-center space-x-3 space-y-0",children:[r.jsx(a,{children:r.jsx(F,{value:"female"})}),r.jsx(s,{className:"font-normal",children:"Female"})]}),r.jsxs(o,{className:"flex items-center space-x-3 space-y-0",children:[r.jsx(a,{children:r.jsx(F,{value:"other"})}),r.jsx(s,{className:"font-normal",children:"Other"})]})]})}),e.formState.errors.gender&&r.jsx("p",{className:"text-sm font-medium text-destructive mt-2",children:e.formState.errors.gender.message})]})})]}),u===2&&r.jsxs("div",{className:"space-y-6",children:[r.jsx("h3",{className:"text-2xl font-bold mb-4",children:"Social Links (Optional)"}),r.jsx(l,{control:e.control,name:"linkedin",render:({field:n})=>r.jsxs(o,{children:[r.jsx(s,{children:"LinkedIn Profile URL"}),r.jsx(a,{children:r.jsx(m,{placeholder:"https://linkedin.com/in/...",...n})}),e.formState.errors.linkedin&&r.jsx("p",{className:"text-sm font-medium text-destructive mt-2",children:e.formState.errors.linkedin.message})]})}),r.jsx(l,{control:e.control,name:"twitter",render:({field:n})=>r.jsxs(o,{children:[r.jsx(s,{children:"Twitter Profile URL"}),r.jsx(a,{children:r.jsx(m,{placeholder:"https://twitter.com/...",...n})}),e.formState.errors.twitter&&r.jsx("p",{className:"text-sm font-medium text-destructive mt-2",children:e.formState.errors.twitter.message})]})}),r.jsx(l,{control:e.control,name:"github",render:({field:n})=>r.jsxs(o,{children:[r.jsx(s,{children:"GitHub Profile URL"}),r.jsx(a,{children:r.jsx(m,{placeholder:"https://github.com/...",...n})}),e.formState.errors.github&&r.jsx("p",{className:"text-sm font-medium text-destructive mt-2",children:e.formState.errors.github.message})]})})]}),r.jsxs("div",{className:"flex justify-between mt-8",children:[u>0&&r.jsxs(h,{type:"button",onClick:N,variant:"outline",children:[r.jsx(y,{icon:"lucide:chevron-left",className:"mr-2 h-4 w-4"})," ","Previous"]}),r.jsx("div",{className:"flex-grow"}),u<j.length-1&&r.jsxs(h,{type:"button",onClick:S,children:["Next"," ",r.jsx(y,{icon:"lucide:chevron-right",className:"ml-2 h-4 w-4"})]}),u===j.length-1&&r.jsx(h,{type:"submit",children:"Submit"})]})]})})})]})}function cr(){return r.jsx(b,{className:"p-0",children:r.jsx("div",{children:r.jsxs("div",{className:"p-6",children:[r.jsx("h4",{className:"text-lg font-semibold mb-4",children:"Healthcare Wizard Form"}),r.jsx(dr,{})]})})})}const ur=[{to:"/",title:"Home"},{title:"Wizard"}],Tr=()=>r.jsxs(r.Fragment,{children:[r.jsx(sr,{title:"Wizard",items:ur}),r.jsxs("div",{className:"flex flex-col gap-6",children:[r.jsxs("div",{children:[r.jsx(ir,{}),r.jsx(G,{children:ar})]}),r.jsxs("div",{children:[r.jsx(cr,{}),r.jsx(G,{children:lr})]})]})]});export{Tr as default};
