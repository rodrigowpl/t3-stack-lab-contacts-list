import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import BlankState from '@/components/BlankState'
import ContactListActions from '@/components/ContactListActions'
import Loading from '@/components/Loading'

import { useContactForm } from '@/hooks/useContactForm'

import { api } from '@/utils/api'

const ContactList = () => {
  const { openFormModal } = useContactForm()

  const { data, isLoading } = api.contact.getAllContacts.useQuery()

  if (isLoading) {
    return <Loading />
  }

  if (!data?.length) {
    return (
      <BlankState
        text="No contacts found. You can create one by clicking the button below."
        actionText="Create Contact"
        onActionClick={openFormModal}
      />
    )
  }

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h2 className="ml-2 text-2xl font-bold">Contacts</h2>
        <Button onClick={openFormModal}>Create Contact</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>
                <ContactListActions contactId={contact.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ContactList
