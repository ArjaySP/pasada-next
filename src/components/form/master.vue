<script lang="tsx">
import { NDatePicker, NFormItem, NInput, NTimePicker } from 'naive-ui'
import type { FormFields } from '@/types'
import form from '@/utils/form'
import FieldAutocomplete from '@/components/form/field-autocomplete.vue'
import FieldDropdown from '@/components/form/field-dropdown.vue'
import FieldFile from '@/components/form/field-file.vue'
import FieldNumber from '@/components/form/field-number.vue'
import FieldQuill from '@/components/form/field-quill.vue'
import FieldRadio from '@/components/form/field-radio.vue'
import FieldSelect from '@/components/form/field-select.vue'
import FieldSelectUser from '@/components/form/field-select-user.vue'
import { useAuth } from '@/utils/auth'

const auth = useAuth()

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
            case 'autocomplete':
              return <FieldAutocomplete v-model:value={form.value[key]} options={field.options} placeholder={field.placeholder || ''} />
            case 'date':
              return <NDatePicker v-model:formatted-value={form.value[key]} type="date" value-format="yyyy-MM-dd" placeholder={field.placeholder || ''} />
            case 'dropdown':
              return <FieldDropdown v-model:value={form.value[key]} options={field.options} placeholder={field.placeholder || ''} />
            case 'file':
              return <FieldFile v-model:value={form.value[key]} accept={field.accept} />
            case 'input':
              return <NInput v-model:value={form.value[key]} placeholder={field.placeholder || ''} />
            case 'number':
              return <FieldNumber v-model:value={form.value[key]} placeholder={field.placeholder || ''} suffix={field.suffix}></FieldNumber>
            case 'password':
              return <NInput v-model:value={form.value[key]} type="password" placeholder={field.placeholder || ''} />
            case 'quill':
              return <FieldQuill v-model:value={form.value[key]} />
            case 'radio':
              return <FieldRadio v-model:value={form.value[key]} name={key} options={field.options}></FieldRadio>
            case 'select': {
              const { queries } = field
              const query = queries.organization ? (auth.isAdmin ? queries.all : queries.organization) : queries.all
              return <FieldSelect v-model:value={form.value[key]} placeholder={field.placeholder || ''} query={query} format={field.format}/>
            }
            case 'select-user': {
              const { queries } = field
              const query = queries.organization ? (auth.isAdmin ? queries.all : queries.organization) : queries.all
              return <FieldSelectUser v-model:value={form.value[key]} placeholder={field.placeholder || ''} query={query}/>
            }
            case 'textarea':
              return <NInput v-model:value={form.value[key]} type="textarea" maxlength="250" show-count placeholder={field.placeholder || ''} />
            case 'time':
              return <NTimePicker v-model:formatted-value={form.value[key]} format="h:mm a" value-format="HH:mm:00" placeholder={field.placeholder || ''} />
          }
        }}</NFormItem>
      </div>
    })
  },
})
</script>
