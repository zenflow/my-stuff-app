import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <nav>
      <Link href="/">Home</Link> <Link href="/about">About</Link>
    </nav>
  );
};
