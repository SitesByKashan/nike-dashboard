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
    
    </div>
 
  )
}

export default page