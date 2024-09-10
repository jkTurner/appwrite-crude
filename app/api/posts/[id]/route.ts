import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

// fetch a specific post
async function fetchPost(id: string) {
    try {
        const post = await database.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_POSTS_ID as string,
            id,
        );
        return post;
    } catch (error) {
        console.error("Error fetching the post: ", error);
        throw new Error("Failed to fetch the post");
    }
}

// delete a specific post
async function deletePost(id: string) {
    try {
        const response = await database.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_POSTS_ID as string,
            id
        );
    } catch (error) {
        console.error("Error deleting the post: ", error);
        throw new Error("Failed to delete the post");
    }
}

// update a specific post
async function updatePost(id: string, data: {topic: string, details: string}) {
    try {
        const response = await database.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_POSTS_ID as string,
            id,
            data
        );
    } catch (error) {
        console.error("Error updating the post");
        throw new Error("Failed to update the post");
    }
}

export async function GET( req: Request, { params }: { params: { id: string }}) {
    try {
        const id = params.id;
        const post = await fetchPost(id);
        return NextResponse.json({post});
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch the post" },
            { status: 500 }
        );
    }
}

export async function DELETE( req: Request, { params }: { params: { id: string }}) {
    try {
        const id = params.id;
        await deletePost(id);
        return NextResponse.json({ message: "Post deleted" });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete the post" },
            { status: 500 },
        );
    }
}

export async function PUT( req: Request, { params }: { params: { id: string }}) {
    try {
        const id = params.id;
        const post = await req.json();
        await updatePost(id, post);
        return NextResponse.json({ message: "Post updated" });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update the post" },
            { status: 500 },
        );
    }
}


