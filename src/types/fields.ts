interface FormItem {
  label: string
  placeholder?: string
}

interface FormInput extends FormItem {
  type: 'input'
}

interface FormSelect extends FormItem {
  type: 'select'
  query: string
  format: (object: Record<string, string>) => string
}

interface FormRichText extends FormItem {
  type: 'richText'
}

type Path = string
type FormFieldTypes = (FormInput | FormSelect | FormRichText)

export interface FormFields {
  [path: Path]: FormFieldTypes
}
