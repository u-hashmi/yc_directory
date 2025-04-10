import Link from "next/link";
import { auth, signIn, signOut} from "auth";
import Image from "next/image";
import Logo from "@/public/logo.png"

const Navbar = async () => {
    const session = await auth();
    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/public">
                    <Image src={Logo}  alt="Logo" width={150} height={150} />
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>
                            <form action={async () => {
                                "use server";
                                await signOut();
                            }}>
                                <button type="submit">Sign out</button>
                            </form>

                            <Link href={`/user/${session?.user.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form action={async () => {
                            "use server";
                            await signIn("github");
                        }}>
                            <button type="submit">Sign In</button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;