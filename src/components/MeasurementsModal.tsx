import React from 'react';
import { XMarkIcon, CameraIcon } from '@heroicons/react/24/outline';
import { FormData } from '../types/FormData';

interface MeasurementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  measurements: FormData['measurements'];
  onChange: (measurements: FormData['measurements']) => void;
  gender: 'male' | 'female';
  beforeImage: string | null;
  afterImage: string | null;
  onImageUpload: (type: 'before' | 'after', file: File) => void;
}

const MeasurementsModal: React.FC<MeasurementsModalProps> = ({
  isOpen,
  onClose,
  measurements,
  onChange,
  gender,
  beforeImage,
  afterImage,
  onImageUpload,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (field: keyof FormData['measurements'], value: string) => {
    onChange({
      ...measurements,
      [field]: value
    });
  };

  const getHealthStatus = (measurement: string, type: keyof FormData['measurements']) => {
    const value = parseFloat(measurement);
    if (!value) return null;

    switch (type) {
      case 'abdomen':
        if (gender === 'male') {
          if (value < 94) return { status: 'good', message: 'Ótimo! Mantenha assim.' };
          if (value <= 102) return { status: 'warning', message: 'Atenção: Considere reduzir a circunferência abdominal.' };
          return { status: 'bad', message: 'Alerta: Circunferência abdominal acima do recomendado.' };
        } else {
          if (value < 80) return { status: 'good', message: 'Ótimo! Mantenha assim.' };
          if (value <= 88) return { status: 'warning', message: 'Atenção: Considere reduzir a circunferência abdominal.' };
          return { status: 'bad', message: 'Alerta: Circunferência abdominal acima do recomendado.' };
        }
      case 'bodyFat':
        if (gender === 'male') {
          if (value >= 6 && value <= 13) return { status: 'good', message: 'Percentual de gordura atlético!' };
          if (value > 13 && value <= 17) return { status: 'good', message: 'Percentual de gordura fitness!' };
          if (value > 17 && value <= 25) return { status: 'warning', message: 'Percentual de gordura aceitável.' };
          return { status: 'bad', message: 'Considere reduzir o percentual de gordura.' };
        } else {
          if (value >= 14 && value <= 20) return { status: 'good', message: 'Percentual de gordura atlético!' };
          if (value > 20 && value <= 24) return { status: 'good', message: 'Percentual de gordura fitness!' };
          if (value > 24 && value <= 31) return { status: 'warning', message: 'Percentual de gordura aceitável.' };
          return { status: 'bad', message: 'Considere reduzir o percentual de gordura.' };
        }
      default:
        return null;
    }
  };

  const measurementFields = [
    { id: 'chest', label: 'Circunferência Torácica (cm)' },
    { id: 'waist', label: 'Circunferência da Cintura (cm)' },
    { id: 'abdomen', label: 'Circunferência Abdominal (cm)' },
    { id: 'hip', label: 'Circunferência do Quadril (cm)' },
    { id: 'thigh', label: 'Circunferência da Coxa (cm)' },
    { id: 'calf', label: 'Circunferência da Panturrilha (cm)' },
    { id: 'bodyFat', label: 'Percentual de Gordura (%)' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Medidas Corporais</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-8">
            {/* Fotos Antes/Depois */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Foto Antes</h3>
                <div className="relative aspect-square w-full max-w-[200px] mx-auto bg-gray-100 rounded-lg overflow-hidden">
                  {beforeImage ? (
                    <img src={beforeImage} alt="Antes" className="w-full h-full object-cover" />
                  ) : (
                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                      <CameraIcon className="h-8 w-8 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">Adicionar foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) onImageUpload('before', file);
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Foto Depois</h3>
                <div className="relative aspect-square w-full max-w-[200px] mx-auto bg-gray-100 rounded-lg overflow-hidden">
                  {afterImage ? (
                    <img src={afterImage} alt="Depois" className="w-full h-full object-cover" />
                  ) : (
                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                      <CameraIcon className="h-8 w-8 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">Adicionar foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) onImageUpload('after', file);
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Lista de Medidas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {measurementFields.map((field) => {
                const status = getHealthStatus(measurements[field.id as keyof FormData['measurements']], field.id as keyof FormData['measurements']);
                return (
                  <div key={field.id} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      value={measurements[field.id as keyof FormData['measurements']]}
                      onChange={(e) => handleInputChange(field.id as keyof FormData['measurements'], e.target.value)}
                      className={`
                        mt-1 block w-full rounded-md shadow-sm
                        ${status?.status === 'bad' ? 'border-red-300 focus:border-red-500 focus:ring-red-500' :
                          status?.status === 'warning' ? 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500' :
                          status?.status === 'good' ? 'border-green-300 focus:border-green-500 focus:ring-green-500' :
                          'border-gray-300 focus:border-green-500 focus:ring-green-500'}
                      `}
                    />
                    {status && (
                      <p className={`
                        text-sm mt-1
                        ${status.status === 'bad' ? 'text-red-600' :
                          status.status === 'warning' ? 'text-yellow-600' :
                          'text-green-600'}
                      `}>
                        {status.message}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Salvar e Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementsModal;
