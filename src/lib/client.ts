import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
    useCdn: false, 
    apiVersion: "2024-01-01",
    token: process.env.SANITY_API_TOKEN, // ✅ Token ensure karein
});
