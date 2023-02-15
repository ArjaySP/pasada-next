interface FormItem {
  label: string
  placeholder?: string
}

interface FormInput extends FormItem {
  type: 'input'
}

interface FormRichText extends FormItem {
  type: 'richText'
}

interface FormSelect extends FormItem {
  type: 'select'
  query: string
  format: (object: Record<string, string>) => string
}

interface FormUpload extends FormItem {
  type: 'upload'
  accept: string
}

type Path = string
type FormFieldTypes = (FormInput | FormSelect | FormRichText | FormUpload)

export interface FormFields {
  [path: Path]: FormFieldTypes
}
