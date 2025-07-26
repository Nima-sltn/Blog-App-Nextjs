import Image from "next/image";
import { FC } from "react";

interface AvatarProps {
  src: string;
  width?: number | undefined;
  height?: number | undefined;
}

const Avatar: FC<AvatarProps> = ({ src, width = 24, height = 24 }) => {
  return (
    <Image
      src={src || "/images/avatar.png"}
      width={width}
      height={height}
      className="ml-2 rounded-full ring-1 ring-secondary-300"
      alt={src}
    />
  );
};

export default Avatar;
