import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import ContactForm from '@/components/ContactForm'

import { useContactForm } from '@/hooks/useContactForm'

const ContactFormModal = () => {
  const { isFormOpen, toggleFormModal, isEditing } = useContactForm()

  return (
    <Dialog open={isFormOpen} onOpenChange={toggleFormModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{`${
            isEditing ? 'Update' : 'Create'
          } Contact`}</DialogTitle>
        </DialogHeader>
        <ContactForm />
      </DialogContent>
    </Dialog>
  )
}

export default ContactFormModal
