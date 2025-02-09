import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FormData } from '../types/FormData';

interface HealthQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  onChange: (data: Partial<FormData>) => void;
}

const HealthQuestionsModal: React.FC<HealthQuestionsModalProps> = ({
  isOpen,
  onClose,
  formData,
  onChange,
}) => {
  if (!isOpen) return null;

  const handleArrayChange = (field: keyof FormData, value: string, checked: boolean) => {
    const currentArray = Array.isArray(formData[field]) ? formData[field] as string[] : [];
    const newArray = checked
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    
    onChange({ [field]: newArray });
  };

  const handleNestedChange = (
    parentField: keyof FormData,
    field: string,
    value: string | string[]
  ) => {
    onChange({
      [parentField]: {
        ...(formData[parentField] as any),
        [field]: value,
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Questionário de Saúde</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Nível de Atividade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nível de Atividade Física
              </label>
              <select
                value={formData.activityLevel}
                onChange={(e) => onChange({ activityLevel: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="sedentary">Sedentário</option>
                <option value="light">Leve</option>
                <option value="moderate">Moderado</option>
                <option value="active">Ativo</option>
                <option value="very_active">Muito Ativo</option>
              </select>
            </div>

            {/* Restrições Alimentares */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Restrições Alimentares
              </label>
              <div className="space-y-2">
                {['Glúten', 'Lactose', 'Vegetariano', 'Vegano', 'Outros'].map((restriction) => (
                  <label key={restriction} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.dietaryRestrictions.includes(restriction)}
                      onChange={(e) => handleArrayChange('dietaryRestrictions', restriction, e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{restriction}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Condições de Saúde */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condições de Saúde
              </label>
              <div className="space-y-2">
                {[
                  'Hipertensão',
                  'Diabetes',
                  'Colesterol Alto',
                  'Problemas Cardíacos',
                  'Outros'
                ].map((condition) => (
                  <label key={condition} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.healthConditions.includes(condition)}
                      onChange={(e) => handleArrayChange('healthConditions', condition, e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{condition}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Objetivos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Objetivos
              </label>
              <div className="space-y-2">
                {[
                  'Perder Peso',
                  'Ganhar Massa Muscular',
                  'Melhorar Condicionamento',
                  'Melhorar Alimentação',
                  'Outros'
                ].map((goal) => (
                  <label key={goal} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.goals.includes(goal)}
                      onChange={(e) => handleArrayChange('goals', goal, e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{goal}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Saúde Mental */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Saúde Mental</h3>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nível de Estresse (1-10)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.mentalHealth.stressLevel}
                  onChange={(e) => handleNestedChange('mentalHealth', 'stressLevel', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Horas de Sono por Noite</label>
                <input
                  type="number"
                  min="0"
                  max="24"
                  value={formData.mentalHealth.sleepHours}
                  onChange={(e) => handleNestedChange('mentalHealth', 'sleepHours', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Qualidade do Sono</label>
                <select
                  value={formData.mentalHealth.sleepQuality}
                  onChange={(e) => handleNestedChange('mentalHealth', 'sleepQuality', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Selecione...</option>
                  <option value="poor">Ruim</option>
                  <option value="fair">Regular</option>
                  <option value="good">Boa</option>
                  <option value="excellent">Excelente</option>
                </select>
              </div>
            </div>

            {/* Dieta */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Dieta</h3>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Refeições por Dia</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.diet.mealsPerDay}
                  onChange={(e) => handleNestedChange('diet', 'mealsPerDay', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Consumo de Fast Food</label>
                <select
                  value={formData.diet.fastFoodFrequency}
                  onChange={(e) => handleNestedChange('diet', 'fastFoodFrequency', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Selecione...</option>
                  <option value="never">Nunca</option>
                  <option value="rarely">Raramente</option>
                  <option value="sometimes">Às vezes</option>
                  <option value="often">Frequentemente</option>
                  <option value="very_often">Muito Frequentemente</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Consumo de Água (L/dia)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.diet.waterIntake}
                  onChange={(e) => handleNestedChange('diet', 'waterIntake', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
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

export default HealthQuestionsModal;
