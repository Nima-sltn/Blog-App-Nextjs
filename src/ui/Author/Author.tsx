import { FC } from "react";
import Avatar from "../Avatar/Avatar";

interface AuthorProps {
  avatarUrl: string;
  name: string;
}

const Author: FC<AuthorProps> = ({ avatarUrl, name }) => {
  return (
    <div className="flex items-center gap-1">
      <Avatar src={avatarUrl} />
      <span className="text-sm text-secondary-500">{name}</span>
    </div>
  );
};

export default Author;
