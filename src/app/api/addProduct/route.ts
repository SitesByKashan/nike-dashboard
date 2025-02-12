import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: "2023-01-01",
  token: process.env.SANITY_API_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    console.log("📥 Received FormData:", formData);

    // Extract values safely
    const productName = (formData.get("productName") as string) ?? "";
    const category = (formData.get("category") as string) ?? "";
    const price = Number(formData.get("price") ?? 0);
    const inventory = Number(formData.get("inventory") ?? 0);
    const colors = (formData.get("colors") as string)?.split(",") ?? [];
    const status = (formData.get("status") as string) ?? "";
    const description = (formData.get("description") as string) ?? "";
    const image = formData.get("image") as File | null;

    // ✅ Validation
    if (!productName.trim()) throw new Error("Product name is required!");
    if (!category.trim()) throw new Error("Category is required!");
    if (price <= 0 || isNaN(price)) throw new Error("Price must be greater than zero!");
    if (inventory < 0 || isNaN(inventory)) throw new Error("Inventory must be a valid number!");
    if (!status.trim()) throw new Error("Status is required!");
    if (!description.trim()) throw new Error("Description is required!");

    let imageRef = null;
    if (image) {
      console.log("📷 Uploading Image...");
      const imageUpload = await client.assets.upload("image", image);
      imageRef = { _type: "image", asset: { _ref: imageUpload._id } };
      console.log("✅ Image Uploaded:", imageUpload._id);
    }

    // ✅ Create Product in Sanity
    const product = await client.create({
      _type: "product",
      productName,
      category,
      price,
      inventory,
      colors,
      status,
      description,
      image: imageRef,
    });

    console.log("✅ Product Created Successfully:", product);
    return NextResponse.json({ success: true, product }, { status: 201 });

  } catch (error: any) {
    console.error("❌ API Error:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
