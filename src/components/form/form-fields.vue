<script lang="tsx">
import { NFormItem, NInput } from 'naive-ui'
import type { FormFields } from '@/types/fields'
import formState from '@/utils/formState'
import FormRichText from '@/components/form/form-rich-text.vue'
import FormSelect from '@/components/form/form-select.vue'
import FormUpload from '@/components/form/form-upload.vue'

export default defineComponent({
  props: {
    fields: {
      type: Object as PropType<FormFields>,
      required: true,
    },
  },
  setup(props) {
    return () => Object.entries(props.fields).map(([key, field]) => {
      return <NFormItem label={field.label} path={key}>
        {() => {
          switch (field.type) {
            case 'input':
              return <NInput v-model:value={formState.value[key]} placeholder={field.placeholder || ''} />
            case 'richText':
              return <FormRichText v-model:value={formState.value[key]} />
            case 'select':
              return <FormSelect v-model:value={formState.value[key]} placeholder={field.placeholder || ''} query={field.query} format={field.format} />
            case 'upload':
              return <FormUpload v-model:value={formState.value[key]} accept={field.accept} />
          }
        }}
      </NFormItem>
    })
  },
})
</script>
