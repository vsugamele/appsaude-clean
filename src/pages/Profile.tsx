import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormData } from '../types/FormData';
import { XMarkIcon } from '@heroicons/react/24/outline';
import BodyMeasurements from '../components/BodyMeasurements';
import HealthSummary from '../components/HealthSummary';

export default function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    activityLevel: 'sedentary',
    dietaryRestrictions: [],
    healthConditions: [],
    goals: [],
    medicalHistory: {
      diseases: [],
      allergies: [],
      medications: [],
      familyHistory: []
    },
    measurements: {
      chest: '',
      thigh: '',
      calf: '',
      abdomen: '',
      waist: '',
      hip: '',
      bodyFat: ''
    },
    mentalHealth: {
      stressLevel: '',
      sleepHours: '',
      sleepQuality: '',
      mood: ''
    },
    digestiveHealth: '',
    cardiovascularHealth: '',
    diet: {
      mealsPerDay: '',
      mealTimes: [],
      fastFoodFrequency: '',
      waterIntake: '',
      alcoholConsumption: ''
    },
    exercise: {
      currentActivities: [],
      frequency: '',
      duration: '',
      intensity: ''
    }
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormDataChange = (data: Partial<FormData>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };

  const handleMeasurementsChange = (newMeasurements: FormData['measurements']) => {
    setFormData(prev => ({
      ...prev,
      measurements: newMeasurements
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Perfil de Saúde</h1>
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Informações Básicas */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Informações Básicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Idade</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gênero</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="male">Masculino</option>
                  <option value="female">Feminino</option>
                  <option value="other">Outro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Peso (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Altura (cm)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Medidas Corporais */}
          <BodyMeasurements
            measurements={formData.measurements}
            onChange={handleMeasurementsChange}
            gender={formData.gender as 'male' | 'female'}
          />

          {/* Resumo de Saúde */}
          <HealthSummary
            formData={formData}
            onChange={handleFormDataChange}
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}