import Link from "next/link";


const Header = () => {
    return (
        <div className="max-w-[100%]">
            <div className="max-w-[1280px] mx-auto px-5 py-6 h-[85px] flex items-center justify-between">
                <Link href="/">
                    <h2 className="font-bold">PRECISION <span className="font-light">FLOW</span></h2>
                </Link>
                <Link href="/create"
                    className="bg-[var(--bgSub)] px-3 py-2 rounded-lg text-sm"
                >
                    <h2>Add New</h2>
                </Link>
            </div>
        </div>
    )
}

export default Header;