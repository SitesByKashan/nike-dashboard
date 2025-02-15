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
      subscribe,
      gender
    }
  `);

  return (
    <div className="min-h-screen lg:w-[75vw] w-[88vw] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 rounded-3xl">
    <div className="lg:min-h-screen h-[90vh] w-[90vw] bg-gray-50 rounded-3xl overflow-x-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Users</h1>
      <Table className="lg:w-full w-[150vw] bg-white shadow-md rounded-lg overflow-hidden">
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
    </div>
  );
}
