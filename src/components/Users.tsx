import { client } from '@/lib/client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Users() {
  const users = await client.fetch(` 
    *[_type == "user"] {
      _id,
      email,
      firstName,
      lastName,
      dateOfBirth,
      country,
      gender,
      subscribe
    }
  `);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900">Users</h1>
      <Table className="bg-white shadow-md rounded-lg overflow-hidden">
        <TableCaption>List of all registered users</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Subscribed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user._id} className="hover:bg-gray-50 transition">
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>{user.firstName} {user.lastName}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.country}</TableCell>
              <TableCell>{user.subscribe ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
