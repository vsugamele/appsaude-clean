import { useState } from 'react'
import { Bars3Icon as MenuIcon, UserIcon, CameraIcon, BeakerIcon, UserGroupIcon, AcademicCapIcon, ShoppingCartIcon, ScaleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

export default function App() {
  const navigate = useNavigate()
  const [calories] = useState('1,850')
  const [water] = useState('1,200')
  const [steps] = useState('6,542')
  
  const handleMealRegistration = () => {
    navigate('/register-meal')
  }

  const handleShoppingList = () => {
    navigate('/shopping-list')
  }

  const handleBodyMeasurements = () => {
    navigate('/body-measurements')
  }

  const recommendations = [
    'Beba mais 500ml de água para atingir sua meta diária',
    'Sua última refeição foi há 4 horas, considere fazer um lanche saudável',
    'Você está 2,458 passos abaixo da sua meta diária'
  ]

  const goals = [
    { description: 'Beber 2L de água', progress: 60, complete: false },
    { description: 'Caminhar 10.000 passos', progress: 65, complete: false },
    { description: 'Registrar todas as refeições', progress: 100, complete: true }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <button className="p-2">
            <MenuIcon className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">Saúde & Bem-estar</h1>
          <button className="p-2" onClick={() => navigate('/profile')}>
            <UserIcon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Daily Summary */}
        <div className="bg-white rounded-lg shadow p-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-gray-600 text-sm">Calorias</p>
            <p className="text-xl font-bold">{calories}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Água (ml)</p>
            <p className="text-xl font-bold">{water}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Passos</p>
            <p className="text-xl font-bold">{steps}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleMealRegistration}
            className="flex items-center justify-center gap-2 bg-white rounded-lg shadow p-4 hover:bg-gray-50"
          >
            <CameraIcon className="h-6 w-6 text-green-600" />
            <span className="text-gray-700">Registrar Refeição</span>
          </button>
          <button
            onClick={handleBodyMeasurements}
            className="flex items-center justify-center gap-2 bg-white rounded-lg shadow p-4 hover:bg-gray-50"
          >
            <ScaleIcon className="h-6 w-6 text-green-600" />
            <span className="text-gray-700">Medidas Corporais</span>
          </button>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recomendações</h2>
          <ul className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <BeakerIcon className="h-6 w-6 text-green-600 flex-shrink-0" />
                <p className="text-gray-700">{recommendation}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Goals */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Metas Diárias</h2>
          <div className="space-y-4">
            {goals.map((goal, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">{goal.description}</span>
                  <span className="text-gray-500">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      goal.complete ? 'bg-green-600' : 'bg-blue-600'
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/nutritionist-consult')}
            className="flex flex-col items-center gap-2 bg-white rounded-lg shadow p-4 hover:bg-gray-50"
          >
            <UserGroupIcon className="h-6 w-6 text-green-600" />
            <span className="text-gray-700 text-center">Consultar Nutricionista</span>
          </button>
          <button
            onClick={() => navigate('/nutrition-education')}
            className="flex flex-col items-center gap-2 bg-white rounded-lg shadow p-4 hover:bg-gray-50"
          >
            <AcademicCapIcon className="h-6 w-6 text-green-600" />
            <span className="text-gray-700 text-center">Educação Nutricional</span>
          </button>
          <button
            onClick={handleShoppingList}
            className="flex flex-col items-center gap-2 bg-white rounded-lg shadow p-4 hover:bg-gray-50"
          >
            <ShoppingCartIcon className="h-6 w-6 text-green-600" />
            <span className="text-gray-700 text-center">Lista de Compras</span>
          </button>
        </div>
      </main>
    </div>
  )
}