import { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

const Table = ({ children }: TableProps) => {
  return (
    <div className="overflow-x-auto bg-secondary-0">
      <table>{children}</table>
    </div>
  );
};

interface TableSubProps {
  children: ReactNode;
}

const TableHeader = ({ children }: TableSubProps) => {
  return (
    <thead>
      <tr className="title-row">{children}</tr>
    </thead>
  );
};

const TableBody = ({ children }: TableSubProps) => {
  return <tbody>{children}</tbody>;
};

const TableRow = ({ children }: TableSubProps) => {
  return <tr>{children}</tr>;
};

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;

export default Table;
