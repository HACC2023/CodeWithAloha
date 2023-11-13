// ModalOverlay.tsx
import React from "react";

interface ModalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

function ModalOverlay({ isOpen, onClose }: ModalOverlayProps) {
  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
            onClick={onClose}
          ></div>
          <div
            className="fixed top-0 left-0 w-full h-full z-30"
            style={{ pointerEvents: "none" }}
          ></div>
        </>
      )}
    </>
  );
}


export default ModalOverlay;
