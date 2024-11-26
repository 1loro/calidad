import React, { useState } from 'react';
import { Plus, Home, Pill, Bell } from 'lucide-react';
import { ResidentCard } from './components/ResidentCard';
import { MedicationTable } from './components/MedicationTable';
import { ResidentForm } from './components/ResidentForm';
import type { Resident } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showAddForm, setShowAddForm] = useState(false);
  const [residents, setResidents] = useState<Resident[]>([
    {
      id: '1',
      name: 'John Doe',
      dateOfBirth: '1945-05-15',
      photo: 'https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?w=200&h=200&fit=crop',
      medicalConditions: ['Hypertension', 'Diabetes'],
      allergies: ['Penicillin'],
      emergencyContact: {
        name: 'Jane Doe',
        phone: '555-0123',
        relationship: 'Daughter',
      },
      medications: [
        {
          id: '1',
          name: 'Metformin',
          dosage: '500mg',
          frequency: 'Twice daily',
          schedule: {
            morning: true,
            evening: true,
          },
          taken: false,
          timeLastTaken: undefined, // Asegúrate de agregar este campo en las medicaciones si se va a usar
        },
      ],
    },
  ]);

  const handleAddResident = (newResident: Omit<Resident, 'id'>) => {
    const resident = {
      ...newResident,
      id: Math.random().toString(36).substr(2, 9), // Generación de ID aleatorio
    };
    setResidents([...residents, resident]);
    setShowAddForm(false);
  };

  const handleMedicationToggle = (
    residentId: string,
    medicationId: string,
    taken: boolean,
    timeLastTaken?: string // Se agrega un parámetro opcional para la hora de la última toma
  ) => {
    setResidents(
      residents.map((resident) => {
        if (resident.id === residentId) {
          return {
            ...resident,
            medications: resident.medications.map((med) => {
              if (med.id === medicationId) {
                return {
                  ...med,
                  taken,
                  timeLastTaken: taken ? timeLastTaken || new Date().toISOString() : undefined,
                };
              }
              return med;
            }),
          };
        }
        return resident;
      })
    );
  };

  const handleEmergencyAlert = (resident: Resident) => {
    alert(`Contactando con ${resident.emergencyContact.name}  ${resident.emergencyContact.phone}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-gray-800">Diox бббжΞ</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'home'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Inicio
                </button>
                <button
                  onClick={() => setActiveTab('medications')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'medications'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Pill className="w-4 h-4 mr-2" />
                  Medicación
                </button>
                <button
                  onClick={() => setActiveTab('alerts')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'alerts'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Alertas
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Residente
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {residents.map((resident) => (
              <ResidentCard
                key={resident.id}
                resident={resident}
                onViewDetails={(id) => console.log('View details', id)}
                onEmergencyAlert={handleEmergencyAlert}
              />
            ))}
          </div>
        )}

        {activeTab === 'medications' && (
          <div className="space-y-6">
            {residents.map((resident) => (
              <MedicationTable
                key={resident.id}
                resident={resident}
                onMedicationToggle={handleMedicationToggle}
              />
            ))}
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {residents.map((resident) => (
              <div key={resident.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={resident.photo}
                        alt={resident.name}
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{resident.name}</h3>
                      <p className="text-sm text-gray-500">
                        Emergencia: {resident.emergencyContact.name} ({resident.emergencyContact.relationship})
                      </p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <button
                      onClick={() => handleEmergencyAlert(resident)}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Alertar emergencia
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showAddForm && (
        <ResidentForm onSubmit={handleAddResident} onClose={() => setShowAddForm(false)} />
      )}
    </div>
  );
}

export default App;
