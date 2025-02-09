import React, { useState } from 'react';
import BodySelector from '../components/BodySelector';
import BodyMeasurements from '../components/BodyMeasurements';
import { FormData } from '../types/FormData';

const BodyMeasurementsPage: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<FormData['measurements']>({
    chest: '',
    thigh: '',
    calf: '',
    waist: '',
    abdomen: '',
    hip: '',
    bodyFat: '',
  });

  const handlePartClick = (partId: string) => {
    setSelectedPart(partId);
  };

  const handleMeasurementsChange = (newMeasurements: FormData['measurements']) => {
    setMeasurements(newMeasurements);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Medidas Corporais</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <BodySelector
              selectedPart={selectedPart}
              onPartClick={handlePartClick}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <BodyMeasurements
              measurements={measurements}
              onChange={handleMeasurementsChange}
              gender="male"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyMeasurementsPage;
