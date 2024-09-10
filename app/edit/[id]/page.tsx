"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent } from "react";

const EditPage = ({ params}: { params: {id: string}}) => {

    const [formData, setFormData] = useState({ topic: "", details: ""});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/posts/${params.id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch the post.");
                }
                const data = await response.json();
                console.log(data);
                setFormData({topic: data.post.topic, details: data.post.details});
            } catch (error) {
                setError("Failed to load the post.");
            }
        };

        fetchData();
    }, [params.id]);

    const handleInputChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        ));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.topic || !formData.details) {
            setError("Please fill in all the fields.");
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(`/api/posts/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to update the post.");
            }

            router.push("/");
        } catch (error) {
            console.log(error);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-[1280px] mx-auto px-5">
            <h2 className="text-sm">
                Edit Post
            </h2>

            <form 
                onSubmit={handleSubmit}
                className="flex gap-3 flex-col mt-2 bg-[var(--bgSub)] py-4 px-4 rounded-md max-w-[500px] shadow-md"
                >
                <input
                    type="text"
                    name="topic"
                    placeholder="Topic"
                    className="py-2 px-3 rounded-md bg-[var(--bgField)] text-sm"
                    value={formData.topic}
                    onChange={handleInputChange}
                />

                <textarea
                    name="details"
                    rows={4}
                    placeholder="Details"
                    className="py-2 px-3 rounded-md bg-[var(--bgField)] text-sm"
                    value={formData.details}
                    onChange={handleInputChange}
                />

                <button 
                    className="bg-[var(--accentMain)] py-2 px-3 rounded-md text-sm"
                    type="submit"
                    disabled={isLoading}
                    >
                    {isLoading ? "Updating..." : "Update Post"}
                </button>
            </form>
        </div>
    )
}

export default EditPage;