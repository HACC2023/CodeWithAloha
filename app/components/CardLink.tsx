import Link from "next/link";

interface CardLinkProps {
  link: string;
  title: string;
}

export default function CardLink({ link, title }: CardLinkProps) {
  return (
    <>
      <Link
        className="max-w-sm rounded overflow-hidden shadow-lg border-2 border-sky-500 w-1/3 box-border h-40 bg-white m-2 flex justify-center"
        href={`/${link}`}
      >
        <div className="font-bold text-xl mb-2 text-black">{title}</div>
      </Link>
    </>
  );
}
