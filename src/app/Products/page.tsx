import { client } from '@/lib/client';
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image';
import { urlFor } from '@/lib/image';

const page = async () => {
  const result = await client.fetch(`
    *[_type == "food"]{
      _id,
      name,
      category,
      price,
      originalPrice,
      image,
      description,
      available,
      tags
    }
  `);
  return (
    <div>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900">Product List</h1>

      <Table className="bg-white shadow-md rounded-lg overflow-hidden">
        <TableCaption>List of all available products</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Original Price</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {result.map((item: any) => (
            <TableRow key={item._id} className="hover:bg-gray-50 transition">
              <TableCell>
                <Image
                  src={urlFor(item.image).url()}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell className="font-bold text-green-600">₹{item.price}</TableCell>
              <TableCell className="text-gray-500 line-through">₹{item.originalPrice}</TableCell>
              <TableCell>
                <span className={px-2 py-1 rounded-md text-xs font-semibold ${item.available ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}}>
                  {item.available ? "In Stock" : "Out of Stock"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
       {/* <Table>
       <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>

      {result.map((item:any)=>{
        return(
         
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">{item.name}</TableCell>
      <TableCell>{item.price}</TableCell>
      <TableCell>{item.originalPrice}</TableCell>
      <TableCell className="text-right">{item.category}</TableCell>
    </TableRow>
  </TableBody>

        )
      })}
</Table> */}
      {/* <Header/> */}

    </div>
  )
}

export default page