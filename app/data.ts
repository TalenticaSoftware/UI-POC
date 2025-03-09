import axios from "axios";
import invariant from "tiny-invariant";
import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";

export type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeContacts = {
  records: {} as Record<string, ContactRecord>,

  async create(values: ContactMutation): Promise<ContactRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },
};

export async function getContacts(query?: string | null) {
  const response = await axios.get("http://localhost:3000/user");
  if (query) {
    const contacts = matchSorter(response.data, query, {
      keys: ["first", "last"],
    });
    return contacts.sort(sortBy("last", "createdAt"));
  }
  return response.data.sort(sortBy("-createdAt", "last"));
}

export async function createEmptyContact() {
  const contact = await fakeContacts.create({});
  const response = await axios.post("http://localhost:3000/user", contact);
  return response.data;
}

export async function getContact(id: string) {
  const response = await axios.get("http://localhost:3000/user/" + id);
  return response.data;
}

export async function updateContact(id: string, updates: ContactMutation) {
  const response = await axios.put("http://localhost:3000/user/" + id, updates);
  return response.data;
}

export async function deleteContact(id: string) {
  const response = await axios.delete("http://localhost:3000/user/" + id);
  return response.data;
}
