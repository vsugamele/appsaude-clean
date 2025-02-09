import React, { useState } from 'react';
import { FormData } from '../types/FormData';
import { PencilIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import MeasurementsModal from './MeasurementsModal';

interface BodyMeasurementsProps {
  measurements: FormData['measurements'];
  onChange: (measurements: FormData['measurements']) => void;
  gender: 'male' | 'female';
}

const BodyMeasurements: React.FC<BodyMeasurementsProps> = ({ measurements, onChange, gender }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);

  const handleImageUpload = (type: 'before' | 'after', file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'before') {
        setBeforeImage(reader.result as string);
      } else {
        setAfterImage(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const getProgressColor = (measurement: string, type: keyof FormData['measurements']) => {
    const value = parseFloat(measurement);
    if (!value) return 'bg-gray-200';

    switch (type) {
      case 'abdomen':
        if (gender === 'male') {
          if (value < 94) return 'bg-green-500';
          if (value <= 102) return 'bg-yellow-500';
          return 'bg-red-500';
        } else {
          if (value < 80) return 'bg-green-500';
          if (value <= 88) return 'bg-yellow-500';
          return 'bg-red-500';
        }
      case 'bodyFat':
        if (gender === 'male') {
          if (value >= 6 && value <= 17) return 'bg-green-500';
          if (value <= 25) return 'bg-yellow-500';
          return 'bg-red-500';
        } else {
          if (value >= 14 && value <= 24) return 'bg-green-500';
          if (value <= 31) return 'bg-yellow-500';
          return 'bg-red-500';
        }
      default:
        return value > 0 ? 'bg-blue-500' : 'bg-gray-200';
    }
  };

  const keyMeasurements = [
    { id: 'abdomen', label: 'Abdômen' },
    { id: 'bodyFat', label: '% Gordura' },
    { id: 'chest', label: 'Tórax' },
    { id: 'waist', label: 'Cintura' },
  ];

  return (
    <>
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Medidas Principais</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <PencilIcon className="h-4 w-4 mr-1" />
            Editar
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {keyMeasurements.map((measure) => (
            <div key={measure.id} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-600">{measure.label}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {measurements[measure.id as keyof FormData['measurements']] || '0'}
                  {measure.id === 'bodyFat' ? '%' : 'cm'}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(
                    measurements[measure.id as keyof FormData['measurements']],
                    measure.id as keyof FormData['measurements']
                  )}`}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Miniaturas das fotos */}
        {(beforeImage || afterImage) && (
          <div className="mt-4 flex gap-4">
            {beforeImage && (
              <div className="relative w-16 h-16">
                <img src={beforeImage} alt="Antes" className="w-full h-full object-cover rounded-md" />
                <span className="absolute -top-2 -right-2 bg-gray-100 text-xs px-1 rounded">Antes</span>
              </div>
            )}
            {afterImage && (
              <div className="relative w-16 h-16">
                <img src={afterImage} alt="Depois" className="w-full h-full object-cover rounded-md" />
                <span className="absolute -top-2 -right-2 bg-gray-100 text-xs px-1 rounded">Depois</span>
              </div>
            )}
          </div>
        )}
      </div>

      <MeasurementsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        measurements={measurements}
        onChange={onChange}
        gender={gender}
        beforeImage={beforeImage}
        afterImage={afterImage}
        onImageUpload={handleImageUpload}
      />
    </>
  );
};

export default BodyMeasurements;
