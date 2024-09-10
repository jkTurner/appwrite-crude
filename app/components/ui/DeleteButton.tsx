import Link from "next/link";

interface deleteButtonProps {
    handleDelete: () => void;
}

const DeleteButton = ({ handleDelete }: deleteButtonProps) => {
    return (
        <button onClick={handleDelete} className="px-4 py-1 bg-red-700 rounded-lg">
            <h3 className="text-sm">Delete</h3>
        </button>
    )
}

export default DeleteButton;

