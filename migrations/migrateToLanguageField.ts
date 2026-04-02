import {migrateToLanguageField} from 'sanity-plugin-internationalized-array/migrations'

// Document types that contain internationalized arrays
const DOCUMENT_TYPES: string[] = [
  'homePage',
  'contactPage',
  'aboutPage',
  'productsListingPage',
  'distributorsPage',
  'preFooter',
  'footer',
  'product',
  'productCategory',
]

export default migrateToLanguageField(DOCUMENT_TYPES)
