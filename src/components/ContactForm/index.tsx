import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

import { useContactForm } from '@/hooks/useContactForm'

import { api } from '@/utils/api'

const formSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  email: z.string().email().nonempty({ message: 'Email is required' }),
  phone: z.string().min(8).nonempty({ message: 'Phone is required' })
})

const ContactForm = () => {
  const { toast } = useToast()
  const { closeFormModal, contactId, isEditing } = useContactForm()

  const apiContext = api.useContext()

  const contactMutation = api.contact.createOrUpdateContact.useMutation({
    onSuccess: () => {
      void apiContext.contact.invalidate()
    }
  })

  const contactQuery = api.contact.getContact.useQuery(
    {
      id: contactId as string
    },
    {
      enabled: isEditing
    }
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  })

  useEffect(() => {
    if (contactQuery.data) {
      form.reset(contactQuery.data)
    }
  }, [contactQuery.data, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await contactMutation.mutateAsync({
        id: contactId,
        contact: values
      })
      toast({
        title: `Contact ${isEditing ? 'updated' : 'created'}`,
        description: `Contact has been successfully ${
          isEditing ? 'updated' : 'created'
        }`
      })
      form.reset()
      closeFormModal()
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: `Contact ${isEditing ? 'updated' : 'create'} falied`,
          description: err.message
        })
        form.setError('email', {
          message: err.message
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input id="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input id="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input id="phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-8">
          <Button type="submit" loading={form.formState.isSubmitting}>
            {`${isEditing ? 'Update' : 'Create'} Contact`}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ContactForm
