"use client";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface DrawerProps {
  onClose: () => void;
  open: boolean;
  children: ReactNode;
}

const Drawer = ({ open, onClose, children }: DrawerProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* overlay */}
      <div
        className={`fixed inset-0 h-screen w-full bg-secondary-800 bg-opacity-30 backdrop-blur-sm duration-200 ease-in-out ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      ></div>

      {/* drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-[250px] transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <div className="max-h-full overflow-y-auto bg-secondary-0">
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
};

export default Drawer;
