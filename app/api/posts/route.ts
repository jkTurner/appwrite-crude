import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

// Create 
async function createPost(data: {topic: string, details: string}) {
    try {
        const response = await database.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_POSTS_ID as string,
            ID.unique(),
            data
        )
        return response;

    } catch (error) {
        console.error('Error creating a post', error);
        throw new Error("Failed to create a post")
    }
}

// Read
async function fetchPosts() {
    try {
        const response = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_POSTS_ID as string,
            [Query.orderDesc("$createdAt")]
        );

        return response;
    } catch (error) {
        console.error("Error fetching posts", error);
        throw new Error("Failed to fetch posts");
    }
}

// POST
export async function POST(req: Request) {
    try {
        const {topic, details} = await req.json();
        const data = {topic, details};
        const response = await createPost(data);
        return NextResponse.json({message: "Post Created"});
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create a post"}, 
            { status: 500 });
    }
}

// GET
export async function GET() {
    try {
        const posts = await fetchPosts();
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch posts" },
            { status: 500 }
        );
    }
}

