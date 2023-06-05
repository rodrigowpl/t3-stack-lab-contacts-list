import ContactList from '@/components/ContactList'
import ContactFormModal from '@/components/ContactFormModal'

import { ContactFormProvider } from '@/hooks/useContactForm'

const Contacts = () => {
  return (
    <ContactFormProvider>
      <ContactList />
      <ContactFormModal />
    </ContactFormProvider>
  )
}

export default Contacts
