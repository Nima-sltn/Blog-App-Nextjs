import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
interface CoverImageProps {
  coverImageUrl: string;
  title: string;
  slug: string;
}

const CoverImage: FC<CoverImageProps> = ({ coverImageUrl, title, slug }) => {
  return (
    <div className="aspect-video relative mb-6 overflow-hidden rounded-md">
      <Link href={slug}>
        <Image
          src={coverImageUrl}
          alt={title}
          fill
          quality={80}
          className="object-cover object-center transition-all duration-300 ease-out hover:scale-110"
        />
      </Link>
    </div>
  );
};

export default CoverImage;
