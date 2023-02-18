interface FormItem {
  label: string
  placeholder?: string
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

type Path = string
type FormFieldTypes = (FormDropdown | FormFile | FormInput | FormNumber | FormSelect | FormRadio | FormQuill | FormTextarea)

export interface FormFields {
  [path: Path]: FormFieldTypes
}
