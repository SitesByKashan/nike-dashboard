// import { client } from '@/lib/client';
// import React from 'react'
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
// import Image from 'next/image';
// import { urlFor } from '@/lib/image';

// export default async function Product() {
//     const result = await client.fetch(`  
//     *[_type == "product"]{
//               _id,
//               productName,
//               category,
//               price,
//               inventory,
//               status,
//               colors,
//               "imageUrl": image.asset->url,
//               description
//             }`
//     );
//     return (
//         <div className="min-h-screen lg:w-[75vw] w-[88vw] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 rounded-3xl">
//     <div className="lg:min-h-screen h-[90vh] w-[90vw] bg-gray-50 rounded-3xl overflow-x-auto p-6">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-6">Product List</h1>
//                 <div className="overflow-x-auto">
//                 <Table className="lg:w-full w-[200vw] bg-white shadow-md rounded-lg overflow-hidden ">
//                     <TableHeader>
//                         <TableRow className="bg-gray-100">
//                             <TableHead className="w-[100px]">Image</TableHead>
//                             <TableHead>Name</TableHead>
//                             <TableHead>Category</TableHead>
//                             <TableHead>Price</TableHead>
//                             <TableHead>Colors</TableHead>
//                             <TableHead>Status</TableHead>
//                         </TableRow>
//                     </TableHeader>

//                     <TableBody>
//                         {result.map((item: any) => (
//                             <TableRow key={item._id} className="hover:bg-gray-50 transition">
//                                 <TableCell>
//                                     <Image
//                                         src={urlFor(item.imageUrl).url()}
//                                         alt={item.name}
//                                         width={60}
//                                         height={60}
//                                         className="rounded-lg object-cover"
//                                     />
//                                 </TableCell>
//                                 <TableCell className="font-medium">{item.productName}</TableCell>
//                                 <TableCell>{item.category}</TableCell>
//                                 <TableCell className="font-bold text-green-600">Rs {item.price}</TableCell>
//                                 <TableCell className="text-gray-500">{item.colors}</TableCell>
//                                 <TableCell>
//                                     <span className={`px-2 py-1 rounded-md text-xs font-semibold ${item.status ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
//                                         {item.status ? "In Stock" : "Out of Stock"}
//                                     </span>

//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//                 </div>
//             </div>
//         </div>
//     )
// }

"use client";
import { client } from '@/lib/client';
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from 'next/image';
import { urlFor } from '@/lib/image';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface Product {
    imageUrl(imageUrl: any): unknown;
    name: string;
    _id: string;
    productName: string;
    category: string;
    price: number;
    inventory: number;
    status: string;
    colors: string[];
    image: { asset: { url: string } };
    description: string;
}


export default function Product() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [open, setOpen] = useState(false);
    const [, setLoading] = useState(false);
    const [imageFile] = useState<File | null>(null);


    useEffect(() => {
        const fetchData = async () => {
                const result = await client.fetch(`  
    *[_type == "product"]{
              _id,
              productName,
              category,
              price,
              inventory,
              status,
              colors,
              "imageUrl": image.asset->url,
              description
            }`
    );
            setProducts(result);
        };
        fetchData();
    }, []);

    const handleEditClick = (item: Product) => {
        setSelectedProduct({ ...item });
        setOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (selectedProduct) {
            setSelectedProduct({
                ...selectedProduct,
                [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
            });
        }
    };

    const handleStatusToggle = () => {
        if (selectedProduct) {
            setSelectedProduct({
                ...selectedProduct,
                status: selectedProduct.status === "In Stock" ? "Out of Stock" : "In Stock",
            });
        }
    };

    const handleImageUpload = async () => {
        if (!imageFile) return null;
        const imageData = new FormData();
        imageData.append("file", imageFile);
        const res = await fetch("/api/upload", { method: "POST", body: imageData });
        const data = await res.json();
        return data.secure_url;
    };

    const handleUpdate = async () => {
        if (!selectedProduct) return;
        setLoading(true);
        let uploadedImageUrl = selectedProduct.imageUrl;
        if (imageFile) {
            uploadedImageUrl = await handleImageUpload();
        }
        const updatedProductData = { ...selectedProduct, imageUrl: uploadedImageUrl };
        try {
            const response = await fetch("/api/editProduct", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProductData),
            });
            const data = await response.json();
            if (response.ok) {
                setProducts((prev) => prev.map((p) => (p._id === selectedProduct._id ? updatedProductData : p)));
                setOpen(false);
            } else {
                console.error("Update Failed:", data.message);
            }
        } catch (error) {
            console.error("Network Error:", error);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen lg:w-[75vw] w-[88vw] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 rounded-3xl">
            <div className="lg:min-h-screen h-[90vh] w-[90vw] bg-gray-50 rounded-3xl overflow-x-auto p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Product List</h1>
                <div className="overflow-x-auto">
                    <Table className="lg:w-full w-[200vw] bg-white shadow-md rounded-lg overflow-hidden">
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="w-[100px]">Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Colors</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((item) => (
                                <TableRow key={item._id} className="hover:bg-gray-50 transition">
                                    <TableCell>
                                    <Image
                                        src={urlFor(item.imageUrl).url()}
                                        alt={item.name}
                                        width={60}
                                        height={60}
                                        className="rounded-lg object-cover"
                                    />
                                    </TableCell>
                                    <TableCell className="font-medium">{item.productName}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell className="font-bold text-green-600">Rs {item.price}</TableCell>
                                    <TableCell className="text-gray-500">{item.colors.join(", ")}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${item.status === "In Stock" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>{item.status}</span>
                                    </TableCell>
                                    <TableCell>
                                        <button onClick={() => handleEditClick(item)} className="flex items-center space-x-1 border-2 border-black py-2 px-4 rounded-xl">
                                            <Pencil size={16} />
                                            <span>Edit</span>
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <Dialog 
             open={open} onOpenChange={setOpen}>
                <DialogContent className='rounded-xl'>
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                    </DialogHeader>
                    {selectedProduct && (
                        <div className="flex flex-col space-y-4">
                            <Input name="productName" value={selectedProduct.productName} onChange={handleInputChange} placeholder="Product Name" />
                            <Input name="category" value={selectedProduct.category} onChange={handleInputChange} placeholder="Category" />
                            <Input name="price" type="number" value={selectedProduct.price} onChange={handleInputChange} placeholder="Price" />
                            <Input name="colors" value={selectedProduct.colors} onChange={handleInputChange} placeholder="Colors" />
                            <Textarea name="description" value={selectedProduct.description} onChange={handleInputChange} placeholder="Description" />           
                            <div className="flex items-center space-x-2">
                                <span>Status:</span>
                                <Switch checked={selectedProduct.status === "In Stock"} onCheckedChange={handleStatusToggle} />
                            </div>
                            <Button className='bg-black text-white ' onClick={(handleUpdate)}>Save</Button>
                        </div>
                    )}
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
       </div>
    );
}