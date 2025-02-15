"use client"
import { useEffect, useState } from 'react';
import { client } from '@/lib/client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function Orders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [statuses, setStatuses] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchOrders = async () => {
            const result = await client.fetch(`
                *[_type == "order"]{
                    _id,
                    orderId,
                    customer {
                        firstName,
                        lastName,
                        email,
                        address
                    },
                    items[] {
                        name,
                        quantity,
                        price
                    },
                    totalAmount
                }`
            );
    
            console.log("✅ Orders fetched:", result);
            setOrders(result);
    
            // ✅ Pehle se stored statuses ko retrieve karein
            const storedStatuses = JSON.parse(localStorage.getItem("orderStatuses") || "{}");
    
            // ✅ Default 'In Progress' status assign karein agar localStorage mein na ho
            const initialStatuses: { [key: string]: string } = {};
            result.forEach((order: any) => {
                initialStatuses[order._id] = storedStatuses[order._id] || "In Progress";
            });
    
            setStatuses(initialStatuses);
        };
    
        fetchOrders();
    }, []);
    
    

    const handleStatusChange = (newStatus: string, orderId: string) => {
        // ✅ Pahle UI update karein
        setStatuses((prev) => {
            const updatedStatuses = { ...prev, [orderId]: newStatus };
            
            // ✅ LocalStorage mein status save karein
            localStorage.setItem("orderStatuses", JSON.stringify(updatedStatuses));
            
            return updatedStatuses;
        });
    };

    return (
        <div className="min-h-screen lg:w-[75vw] w-[88vw] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 rounded-3xl">
    <div className="lg:min-h-screen h-[90vh] w-[90vw] bg-gray-50 rounded-3xl overflow-x-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Orders List</h1>
        <div className="overflow-x-auto">
            <Table className="lg:w-full w-[200vw] bg-white shadow-md rounded-lg overflow-hidden">
                {/* ✅ Table Header */}
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead>Order ID</TableHead>
                        <TableHead>Client Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total Amount</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>

                {/* ✅ Table Body */}
                <TableBody>
                    {orders.map((order: any) => (
                        <TableRow key={order._id} className="hover:bg-gray-50 transition">
                            <TableCell className="font-medium">{order.orderId}</TableCell>
                            <TableCell className="font-medium">
                                {order.customer.firstName} {order.customer.lastName}
                            </TableCell>
                            <TableCell>{order.customer.email}</TableCell>
                            <TableCell className="font-medium">{order.customer.address}</TableCell>

                            {/* ✅ Display Items */}
                            <TableCell>
                                {order.items && order.items.length > 0 ? (
                                    <div className="space-y-1">
                                        {order.items.map((item: any, index: number) => (
                                            <div
                                                key={index}
                                                className="flex flex-col justify-between gap-4 text-sm bg-gray-100 p-2 rounded-md"
                                            >
                                                <span>{item.name}</span>
                                                <span>Quantity:{item.quantity}</span>
                                                <span>Rs {item.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <span>No items</span>
                                )}
                            </TableCell>

                            <TableCell className="text-gray-500">Rs {order.totalAmount}</TableCell>

                            {/* ✅ Status Dropdown with Dynamic Background */}
                            <TableCell>
                                <select
                                    className={`px-2 py-1 rounded-md border text-white transition 
                                    ${
                                        statuses[order._id] === "Delivered"
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                    }`}
                                    value={statuses[order._id]}
                                    onChange={(e) => handleStatusChange(e.target.value, order._id)}
                                >
                                    <option value="In Progress" className="bg-white text-black">
                                        In Progress
                                    </option>
                                    <option value="Delivered" className="bg-white text-black">
                                        Delivered
                                    </option>
                                </select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>
</div>

    );
}
