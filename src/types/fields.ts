interface FormItem {
  label: string
  placeholder?: string
  span?: number
}

interface FormDate extends FormItem {
  type: 'date'
}

interface FormDropdown extends FormItem {
  type: 'dropdown'
  options: { label: string; value: string }[]
}

interface FormFile extends FormItem {
  type: 'file'
  accept: string
}

interface FormInput extends FormItem {
  type: 'input'
}

interface FormNumber extends FormItem {
  type: 'number'
  suffix?: string
}

interface FormPassword extends FormItem {
  type: 'password'
}

interface FormQuill extends FormItem {
  type: 'quill'
}

interface FormRadio extends FormItem {
  type: 'radio'
  options: { label: string; value: string | number }[]
}

interface FormSelect extends FormItem {
  type: 'select'
  queries: {
    all: string
    organization?: string
  }
  format: (object: Record<string, string>) => string
}

interface FormTextarea extends FormItem {
  type: 'textarea'
}

interface FormTime extends FormItem {
  type: 'time'
}

type Path = string
type FormFieldTypes = (FormDate | FormDropdown | FormFile | FormInput | FormNumber | FormPassword | FormSelect | FormRadio | FormQuill | FormTextarea | FormTime)

export interface FormFields {
  [path: Path]: FormFieldTypes
}
