<script lang="tsx">
import { NDatePicker, NFormItem, NInput, NTimePicker } from 'naive-ui'
import type { FormFields } from '@/types'
import formState from '@/utils/formState'
import FormDropdown from '@/components/form/form-dropdown.vue'
import FormFile from '@/components/form/form-file.vue'
import FormNumber from '@/components/form/form-number.vue'
import FormQuill from '@/components/form/form-quill.vue'
import FormRadio from '@/components/form/form-radio.vue'
import FormSelect from '@/components/form/form-select.vue'
import { isAdmin } from '@/utils/userState'

export default defineComponent({
  props: {
    fields: {
      type: Object as PropType<FormFields>,
      required: true,
    },
  },
  setup(props) {
    return () => Object.entries(props.fields).map(([key, field]) => {
      return <div style={`grid-column: span ${field.span || 24} / span ${field.span || 24}`}>
        <NFormItem label={field.label} path={key}>{() => {
          switch (field.type) {
            case 'date':
              return <NDatePicker v-model:formatted-value={formState.value[key]} type="date" value-format="yyyy-MM-dd" placeholder={field.placeholder || ''} />
            case 'dropdown':
              return <FormDropdown v-model:value={formState.value[key]} options={field.options} />
            case 'file':
              return <FormFile v-model:value={formState.value[key]} accept={field.accept} />
            case 'input':
              return <NInput v-model:value={formState.value[key]} placeholder={field.placeholder || ''} />
            case 'number':
              return <FormNumber v-model:value={formState.value[key]} placeholder={field.placeholder || ''} suffix={field.suffix}></FormNumber>
            case 'password':
              return <NInput v-model:value={formState.value[key]} type="password" placeholder={field.placeholder || ''} />
            case 'quill':
              return <FormQuill v-model:value={formState.value[key]} />
            case 'radio':
              return <FormRadio v-model:value={formState.value[key]} name={key} options={field.options}></FormRadio>
            case 'select': {
              const { queries } = field
              const query = queries.organization ? (isAdmin() ? queries.all : queries.organization) : queries.all
              return <FormSelect v-model:value={formState.value[key]} placeholder={field.placeholder || ''} query={query} format={field.format}/>
            }
            case 'textarea':
              return <NInput v-model:value={formState.value[key]} type="textarea" maxlength="250" show-count placeholder={field.placeholder || ''} />
            case 'time':
              return <NTimePicker v-model:formatted-value={formState.value[key]} format="h:mm a" value-format="HH:mm:00" placeholder={field.placeholder || ''} />
          }
        }}</NFormItem>
      </div>
    })
  },
})
</script>
