export type Tag = {
  id: string
  tagname: string
}
export type Group = {
  id: string
  enable_vote: boolean
  groupname: string
  title: string | null
  description: string | null
  twitter_url: string | null
  instagram_url: string | null
  stream_url: string | null
  public_thumbnail_image_url: string | null
  public_page_content_url: string | null
  private_page_content_url: string | null

  tags: Tag[]
}
export type GroupLink = {
  id: string
  name: string
  group_id: string
  linktext: string
}
export type GroupEdit = {
  title?: string | null
  description?: string | null
  twitter_url?: string | null
  instagram_url?: string | null
  stream_url?: string | null
  public_thumbnail_image_url?: string | null
  public_page_content_url?: string | null
  private_page_content_url?: string | null
}
export type Event = {
  id: string
  group_id: string
  eventname: string
  starts_at: string
  ends_at: string
  sell_starts: string
  sell_ends: string
  target: string
  ticket_stock: number
  lottery: boolean
}
export type Ticket = {
  group_id: string
  event_id: string
  owner_id: string
  is_family_ticket: boolean
  person: number
  id: string
  created_at: string
  status: string
}

export type OwnerOf = {
  group_id: string
  user_id: string
  note: string
}
