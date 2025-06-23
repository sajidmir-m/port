interface DesktopIconProps {
  icon: string;
  label: string;
  color: string;
  onClick: () => void;
}

export default function DesktopIcon({ icon, label, color, onClick }: DesktopIconProps) {
  return (
    <div 
      className="desktop-icon cursor-pointer p-3 flex flex-col items-center transition-all hover:scale-105"
      onClick={onClick}
    >
      <i className={`${icon} text-5xl ${color} mb-2 drop-shadow-lg`}></i>
      <div className="text-white dark:text-white light:text-gray-100 text-sm text-center max-w-20 leading-tight font-medium drop-shadow-lg">{label}</div>
    </div>
  );
}
