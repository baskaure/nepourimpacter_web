import React from 'react';
import { TrendingUp, Users, Calendar, DollarSign, AlertCircle } from 'lucide-react';

interface DashboardProps {
  totalSeats: number;
  remainingSeats: number;
  totalRevenue: number;
  ticketsSold: number;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  totalSeats, 
  remainingSeats, 
  totalRevenue, 
  ticketsSold 
}) => {
  const soldPercentage = ((totalSeats - remainingSeats) / totalSeats) * 100;
  const remainingPercentage = (remainingSeats / totalSeats) * 100;

  const stats = [
    {
      name: 'Places vendues',
      value: ticketsSold,
      total: totalSeats,
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      name: 'Places restantes',
      value: remainingSeats,
      total: totalSeats,
      icon: Calendar,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      name: 'Revenus générés',
      value: `€${totalRevenue.toLocaleString()}`,
      total: '',
      icon: DollarSign,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      name: 'Taux de remplissage',
      value: `${soldPercentage.toFixed(1)}%`,
      total: '',
      icon: TrendingUp,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Tableau de bord - Temps réel
        </h2>
        <div className="flex items-center space-x-2 text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Mise à jour en temps réel</span>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                    {stat.total && (
                      <span className="text-sm text-gray-500 ml-1">/ {stat.total}</span>
                    )}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Visualization */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Répartition des ventes</h3>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progression des ventes</span>
            <span className="text-sm font-medium text-gray-900">
              {ticketsSold} / {totalSeats} places
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${soldPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">
              Places vendues: {soldPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <span className="text-sm text-gray-600">
              Places disponibles: {remainingPercentage.toFixed(1)}%
            </span>
          </div>
        </div>

        {remainingSeats < 50 && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <p className="text-sm text-yellow-800 font-medium">
                Attention: Il ne reste que {remainingSeats} places disponibles !
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;