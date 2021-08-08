import Link from 'next/link';

interface CategoryProps {
  url: string;
  name: string;
}

const HomeCategory = ({ url, name }: CategoryProps) => {
  return (
    <div
      className="rounded-2xl px-4 py-1 mx-2 md:my-1"
      style={{ background: '#f2f2f2' }}
    >
      <Link href={url}>
        <a>{name}</a>
      </Link>
    </div>
  );
};

export default HomeCategory;
