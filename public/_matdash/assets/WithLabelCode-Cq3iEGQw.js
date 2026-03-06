const e=`import { useState } from 'react'\r
import { Checkbox, Field, Label } from '@headlessui/react'\r
\r
const WithLabelCode = () => {\r
  const [enabled, setEnabled] = useState(false)\r
  const [enabled1, setEnabled1] = useState(false)\r
\r
  return (\r
    <div>\r
      <div className='flex flex-col gap-3'>\r
        <div>\r
          <Field className='flex items-center gap-3'>\r
            <Checkbox\r
              checked={enabled}\r
              onChange={setEnabled}\r
              className='group block ui-checkbox'>\r
              <svg\r
                className='stroke-white opacity-0 group-data-[checked]:opacity-100 rounded'\r
                viewBox='0 0 14 14'\r
                fill='none'\r
                height={15}>\r
                <path\r
                  d='M3 8L6 11L11 3.5'\r
                  strokeWidth={2}\r
                  strokeLinecap='round'\r
                  strokeLinejoin='round'\r
                />\r
              </svg>\r
            </Checkbox>\r
            <Label className='cursor-pointer'>Checkbox With Label</Label>\r
          </Field>\r
        </div>\r
        <div>\r
          <Field className='flex items-center gap-3'>\r
            <Checkbox\r
              checked={enabled1}\r
              onChange={setEnabled1}\r
              className='group block ui-checkbox'>\r
              <svg\r
                className='stroke-white opacity-0 group-data-[checked]:opacity-100 rounded'\r
                viewBox='0 0 14 14'\r
                fill='none'\r
                height={15}>\r
                <path\r
                  d='M3 8L6 11L11 3.5'\r
                  strokeWidth={2}\r
                  strokeLinecap='round'\r
                  strokeLinejoin='round'\r
                />\r
              </svg>\r
            </Checkbox>\r
            <Label className='cursor-pointer'>Checkbox With Label</Label>\r
          </Field>\r
        </div>\r
      </div>\r
    </div>\r
  )\r
}\r
\r
export default WithLabelCode\r
`;export{e as W};
