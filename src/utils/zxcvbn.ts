import { zxcvbnOptions } from '@zxcvbn-ts/core'
import zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import zxcvbnEnPackage from '@zxcvbn-ts/language-en'

const zxcvbn = {
  install() {
    const options = {
      // recommended
      dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnEnPackage.dictionary,
      },
      // recommended
      graphs: zxcvbnCommonPackage.adjacencyGraphs,
      // recommended
      useLevenshteinDistance: true,
      // optional
      translations: zxcvbnEnPackage.translations,
    }
    zxcvbnOptions.setOptions(options)
  },
}

export default zxcvbn
