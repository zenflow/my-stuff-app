import Link from "next/link";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import { useMySession } from "../common/auth";
import { MAIN_TITLE } from "../common/constants";

export const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="p-4">
      <Navbar />
      {children}
    </div>
  );
};

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 mb-4 shadow-xl rounded-box">
      <NavbarSectionBrand />
      <NavbarSectionMenu />
      <NavbarSectionAuth />
    </div>
  );
};

const NavbarSectionBrand: React.FC = () => {
  return (
    <div className="flex-1">
      <Link href="/" className="btn btn-ghost normal-case text-xl">
        <Image
          alt="Logo"
          src="/images/favicon-32x32.png"
          width={32}
          height={32}
          style={{ filter: "invert(100%)" }}
        />
        &nbsp; {MAIN_TITLE}
      </Link>
    </div>
  );
};

const NavbarSectionMenu: React.FC = () => {
  const session = useMySession();
  return (
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1 gap-1">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/memes">Memes</Link>
        </li>
        {session?.user.role === "ADMIN" && (
          <li>
            <a href="/admin">Admin</a>
          </li>
        )}
        {!session && (
          <li>
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
      </ul>
    </div>
  );
};

const NavbarSectionAuth: React.FC = () => {
  const session = useMySession();
  if (!session) {
    return null;
  }
  return (
    <div className="flex-none ml-2">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="User" src={session.user.image} />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box whitespace-nowrap"
        >
          <li>
            <button onClick={() => signOut()}>Sign out</button>
          </li>
        </ul>
      </div>
    </div>
  );
};
