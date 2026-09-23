type Tab = 'Estadisticas' | 'Productos' | 'Stocks';

interface NavbarProps {
  active: Tab;
  onChangeTab?: (tab: Tab) => void;
}

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'Estadisticas', label: 'Estadísticas', icon: '📊' },
  { key: 'Productos', label: 'Productos', icon: '📦' },
  { key: 'Stocks', label: 'Stocks', icon: '📋' },
];

export default function Navbar({ active, onChangeTab }: NavbarProps) {
  return (
    <nav className="flex border-t border-gray-100 bg-white py-2 pb-3.5">
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            onClick={() => onChangeTab?.(tab.key)}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <span
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                isActive ? 'bg-purple-100' : ''
              }`}
            >
              {tab.icon}
            </span>
            <span
              className={`text-[11px] mt-0.5 ${
                isActive ? 'text-purple-600 font-semibold' : 'text-gray-400'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}