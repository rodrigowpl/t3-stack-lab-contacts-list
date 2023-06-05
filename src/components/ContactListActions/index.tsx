import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import Loader from '@/components/Loader'

import { useContactForm } from '@/hooks/useContactForm'

import { api } from '@/utils/api'

type Props = {
  contactId: string
}

const ContactListActions = ({ contactId }: Props) => {
  const [loading, setLoading] = useState(false)

  const { openFormModal, setContactId } = useContactForm()

  const apiContext = api.useContext()

  const contact = api.contact.deleteContact.useMutation({
    onSuccess: async () => {
      await apiContext.contact.invalidate()

      toast({
        title: 'Contact deleted',
        description: 'Contact has been successfully deleted'
      })
    }
  })

  const handleEdit = () => {
    setContactId(contactId)
    openFormModal()
  }

  const handleDelete = async () => {
    try {
      setLoading(true)
      await contact.mutateAsync({
        id: contactId
      })
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: 'Contact delete falied',
          description: err.message
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" disabled={loading}>
          {loading ? (
            <Loader />
          ) : (
            <span className="text-1xl font-bold">...</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ContactListActions
