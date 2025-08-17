import { FC } from "react";

interface EmptyProps {
  resourceName: string;
}

const Empty: FC<EmptyProps> = ({ resourceName }) => {
  return (
    <p className="font-bold text-secondary-700"> {resourceName} یافت نشد.</p>
  );
};
export default Empty;
