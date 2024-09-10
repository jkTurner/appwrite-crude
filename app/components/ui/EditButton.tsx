import Link from "next/link";

interface EditButtonProps {
    id: string;
}

const EditButton = ({ id }: EditButtonProps) => {
    return (
        <Link href={`/edit/${id}`} className="px-4 py-1 bg-[var(--bgMid)] rounded-lg">
            <h3 className="text-sm">Edit</h3>
        </Link>
    )
}

export default EditButton;

