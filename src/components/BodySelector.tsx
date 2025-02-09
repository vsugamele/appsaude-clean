import React from 'react';

interface BodySelectorProps {
  selectedPart: string | null;
  onPartClick: (partId: string) => void;
}

const BodySelector: React.FC<BodySelectorProps> = ({ selectedPart, onPartClick }) => {
  const bodyParts = [
    { id: 'chest', name: 'Peito', y: 120 },
    { id: 'arm', name: 'Braço', y: 180 },
    { id: 'abdomen', name: 'Abdômen', y: 240 },
    { id: 'leg', name: 'Perna', y: 300 },
    { id: 'all', name: 'Todo o corpo', y: 360 },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto h-[500px] bg-white p-4 rounded-lg">
      {/* Silhueta */}
      <div className="absolute left-1/2 -translate-x-1/2 w-48 mt-8">
        <svg viewBox="0 0 100 300" className="w-full">
          <path
            d="M50,40 
               C65,40 75,50 75,70
               C75,90 70,110 65,140
               C60,170 55,200 50,240
               C45,200 40,170 35,140
               C30,110 25,90 25,70
               C25,50 35,40 50,40"
            fill="#9CA3AF"
            stroke="#6B7280"
            strokeWidth="1"
            className="drop-shadow-lg"
          />
          <circle 
            cx="50" 
            cy="25" 
            r="15" 
            fill="#9CA3AF"
            stroke="#6B7280"
            strokeWidth="1"
            className="drop-shadow-lg" 
          />
        </svg>
      </div>

      {/* Pontos de medição e rótulos */}
      <div className="absolute left-0 right-0 mt-8">
        {bodyParts.map((part) => (
          <div
            key={part.id}
            className="absolute left-1/2 flex items-center"
            style={{ top: `${part.y}px` }}
          >
            {/* Ponto e linha */}
            <div className="flex items-center">
              <div className="w-2 h-[1px] bg-gray-400"></div>
              <div
                onClick={() => onPartClick(part.id)}
                className={`
                  w-4 h-4 rounded-full cursor-pointer border-2
                  ${selectedPart === part.id ? 'bg-green-500 border-green-600' : 'bg-white border-gray-400'}
                  hover:bg-green-400 hover:border-green-500 transition-colors
                `}
              />
              <div className="w-12 h-[1px] bg-gray-400"></div>
            </div>
            
            {/* Rótulo */}
            <div
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                ${selectedPart === part.id 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 border border-gray-200'
                }
                cursor-pointer hover:bg-green-400 hover:text-white
                transition-colors shadow-sm
              `}
              onClick={() => onPartClick(part.id)}
            >
              {part.name}
            </div>
          </div>
        ))}
      </div>

      {/* Botão Próximo */}
      <button
        className="absolute bottom-4 left-4 right-4 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm"
        onClick={() => onPartClick('next')}
      >
        Próximo
      </button>
    </div>
  );
};

export default BodySelector;
