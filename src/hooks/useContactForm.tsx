import { createContext, useContext, useEffect, useState } from 'react'

type ContextProps = {
  isFormOpen: boolean
  contactId?: string
  isEditing: boolean
  openFormModal: () => void
  closeFormModal: () => void
  toggleFormModal: (value: boolean) => void
  setContactId: (id: string) => void
}

const ContactFormContext = createContext<ContextProps>({
  isFormOpen: false,
  isEditing: false,
  openFormModal: () => null,
  closeFormModal: () => null,
  toggleFormModal: () => null,
  setContactId: () => null
})

type ProviderProps = {
  children: React.ReactNode
}

export const ContactFormProvider = ({ children }: ProviderProps) => {
  const [open, setOpen] = useState(false)
  const [contactId, setContactId] = useState<string>()

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)
  const toggleModal = (value: boolean) => setOpen(value)

  useEffect(() => {
    if (!open) {
      setContactId(undefined)
    }
  }, [open])

  const isEditing = !!contactId

  return (
    <ContactFormContext.Provider
      value={{
        isFormOpen: open,
        contactId,
        isEditing,
        openFormModal: openModal,
        closeFormModal: closeModal,
        toggleFormModal: toggleModal,
        setContactId
      }}
    >
      {children}
    </ContactFormContext.Provider>
  )
}

export const useContactForm = () => useContext(ContactFormContext)
