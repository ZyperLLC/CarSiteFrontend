import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { WebhookEvent } from '@clerk/nextjs/server'

import { createUser, updateUser, deleteUser } from '@/lib/users'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    )
  }

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', { status: 400 })
  }

  const eventType = evt.type

  // Handle user.created
  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data

    if (!id || !email_addresses || !email_addresses.length) {
      return new Response('Error occurred -- missing data', { status: 400 })
    }

    const email = email_addresses[0].email_address

    try {
      const { error } = await createUser({
        clerkUserId: id,
        email,
        firstName: first_name ?? undefined,
        lastName: last_name ?? undefined,
        imageUrl: image_url ?? undefined,
      })

      if (error) throw error
      revalidatePath(`/`)
    } catch (error) {
      console.error('Error creating user:', error)
      return new Response('Error occurred', { status: 400 })
    }
  }

  // Handle user.updated
  if (eventType === 'user.updated') {
    const { id, first_name, last_name, image_url } = evt.data

    if (!id) {
      return new Response('Error occurred -- missing data', { status: 400 })
    }

    const data = {
      ...(first_name ? { firstName: first_name } : {}),
      ...(last_name ? { lastName: last_name } : {}),
      ...(image_url ? { imageUrl: image_url } : {}),
    }

    try {
      const { error } = await updateUser(id, data)
      if (error) throw error
      revalidatePath(`/`)
    } catch (error) {
      console.error('Error updating user:', error)
      return new Response('Error occurred', { status: 400 })
    }
  }

  // Handle user.deleted
  if (eventType === 'user.deleted') {
    const { id } = evt.data

    if (!id) {
      return new Response('Error occurred -- missing user id', { status: 400 })
    }

    try {
      const { error } = await deleteUser(id)
      if (error) throw error
      revalidatePath(`/`)
    } catch (error) {
      console.error('Error deleting user:', error)
      return new Response('Error occurred', { status: 400 })
    }
  }

  return new Response('', { status: 200 })
}
