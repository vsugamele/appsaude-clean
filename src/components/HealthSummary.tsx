import React, { useState } from 'react';
import { FormData } from '../types/FormData';
import { PencilIcon, HeartIcon, MoonIcon, FireIcon } from '@heroicons/react/24/outline';
import HealthQuestionsModal from './HealthQuestionsModal';

interface HealthSummaryProps {
  formData: FormData;
  onChange: (data: Partial<FormData>) => void;
}

const HealthSummary: React.FC<HealthSummaryProps> = ({ formData, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getActivityLevelLabel = (level: string) => {
    const labels: { [key: string]: string } = {
      sedentary: 'Sedentário',
      light: 'Leve',
      moderate: 'Moderado',
      active: 'Ativo',
      very_active: 'Muito Ativo'
    };
    return labels[level] || level;
  };

  const getSleepQualityLabel = (quality: string) => {
    const labels: { [key: string]: string } = {
      poor: 'Ruim',
      fair: 'Regular',
      good: 'Boa',
      excellent: 'Excelente'
    };
    return labels[quality] || 'Não informado';
  };

  const getHealthStatus = () => {
    const conditions = formData.healthConditions.length;
    if (conditions === 0) return { color: 'green', status: 'Ótimo' };
    if (conditions <= 2) return { color: 'yellow', status: 'Regular' };
    return { color: 'red', status: 'Requer Atenção' };
  };

  const getSleepStatus = () => {
    const hours = Number(formData.mentalHealth.sleepHours);
    if (hours >= 7 && hours <= 9) return { color: 'green', status: 'Ideal' };
    if (hours >= 6) return { color: 'yellow', status: 'Regular' };
    return { color: 'red', status: 'Insuficiente' };
  };

  const getActivityStatus = () => {
    const level = formData.activityLevel;
    if (['active', 'very_active'].includes(level)) return { color: 'green', status: 'Ativo' };
    if (level === 'moderate') return { color: 'yellow', status: 'Moderado' };
    return { color: 'red', status: 'Baixo' };
  };

  const healthStatus = getHealthStatus();
  const sleepStatus = getSleepStatus();
  const activityStatus = getActivityStatus();

  return (
    <>
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Resumo de Saúde</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <PencilIcon className="h-4 w-4 mr-1" />
            Editar
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Saúde Geral */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <HeartIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Saúde Geral</span>
            </div>
            <div className={`text-sm font-semibold text-${healthStatus.color}-600`}>
              {healthStatus.status}
            </div>
            {formData.healthConditions.length > 0 && (
              <div className="mt-1 text-xs text-gray-500">
                {formData.healthConditions.length} condição(ões) reportada(s)
              </div>
            )}
          </div>

          {/* Sono */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MoonIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Sono</span>
            </div>
            <div className={`text-sm font-semibold text-${sleepStatus.color}-600`}>
              {sleepStatus.status}
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {formData.mentalHealth.sleepHours}h - {getSleepQualityLabel(formData.mentalHealth.sleepQuality)}
            </div>
          </div>

          {/* Atividade Física */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FireIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Atividade</span>
            </div>
            <div className={`text-sm font-semibold text-${activityStatus.color}-600`}>
              {activityStatus.status}
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {getActivityLevelLabel(formData.activityLevel)}
            </div>
          </div>
        </div>

        {/* Objetivos */}
        {formData.goals.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Objetivos</h4>
            <div className="flex flex-wrap gap-2">
              {formData.goals.map((goal) => (
                <span
                  key={goal}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  {goal}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <HealthQuestionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        onChange={onChange}
      />
    </>
  );
};

export default HealthSummary;
