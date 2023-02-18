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

interface FormRichText extends FormItem {
  type: 'richText'
}

interface FormRadio extends FormItem {
  type: 'radio'
  options: { label: string; value: string }[]
}

interface FormSelect extends FormItem {
  type: 'select'
  queries: {
    all: string
    organization?: string
  }
  format: (object: Record<string, string>) => string
}

type Path = string
type FormFieldTypes = (FormDropdown | FormInput | FormNumber | FormSelect | FormRadio | FormRichText | FormFile)

export interface FormFields {
  [path: Path]: FormFieldTypes
}
