import { X } from "lucide-react";
import { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg animate-in fade-in zoom-in duration-300">
        <div className="dashboard-card overflow-hidden bg-surface-high border-white/10 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/5 p-4 sm:p-6">
            <h3 className="text-xl font-semibold text-text">{title}</h3>
            <button 
              onClick={onClose}
              className="icon-button"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
