import React, { useState } from 'react';
import { Phone, User, Calendar, Pill, AlertCircle, X, FileText } from 'lucide-react';
import type { Resident } from '../types';

interface ResidentCardProps {
  resident: Resident;
  onUpdateResident: (updatedResident: Resident) => void;
  onEmergencyAlert: (resident: Resident) => void;
}

export function ResidentCard({ resident, onUpdateResident, onEmergencyAlert }: ResidentCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableResident, setEditableResident] = useState<Resident>(resident);

  const handleInputChange = (field: keyof Resident, value: any) => {
    setEditableResident({
      ...editableResident,
      [field]: value,
    });
  };

  const handleSaveChanges = () => {
    onUpdateResident(editableResident); // Call the parent function to update the resident
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">
        <img
          src={resident.photo || 'https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?w=200&h=200&fit=crop'}
          alt={resident.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">{resident.name}</h3>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(resident.dateOfBirth).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Pill className="w-4 h-4" />
            <span>{resident.medications.length} Medicación</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Ver detalles
          </button>
          <button
            onClick={() => onEmergencyAlert(resident)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            Generar Alerta
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Detalles del residente</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-700">Información personal</h3>
                <p><strong>Nombre:</strong> {editableResident.name}</p>
                <p><strong>Fecha de nacimiento:</strong> {new Date(editableResident.dateOfBirth).toLocaleDateString()}</p>
                <p><strong>Foto:</strong> <img src={editableResident.photo} alt={editableResident.name} className="w-16 h-16 rounded-full" /></p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700">Alergias</h3>
                <ul className="list-disc list-inside">
                  {editableResident.allergies.length > 0 ? (
                    editableResident.allergies.map((allergy, index) => (
                      <li key={index}>{allergy}</li>
                    ))
                  ) : (
                    <p>No registra alergias</p>
                  )}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700">Medicamentos</h3>
                <ul className="list-disc list-inside">
                  {editableResident.medications.map((medication, index) => (
                    <li key={index}>
                      <p><strong>Nombre:</strong> {medication.name}</p>                     
                      <p><strong>Dosis:</strong> {medication.dosage}</p>
                      <p><strong>Frecuencia:</strong> {medication.frequency}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700">Contacto de emergencia</h3>
                <p><strong>Nombre:</strong> {editableResident.emergencyContact.name}</p>
                <p><strong>Telefono:</strong> {editableResident.emergencyContact.phone}</p>
                <p><strong>Relación:</strong> {editableResident.emergencyContact.relationship}</p>
              </div>

              <div>
  <h3 className="text-lg font-medium text-gray-700">Ultimo examen</h3>
  {editableResident.lastExam ? (
    <>
      <p>{editableResident.lastExam.name}</p>
      <a
        href={URL.createObjectURL(editableResident.lastExam)}
        download={editableResident.lastExam.name}
        className="text-blue-500 hover:text-blue-700"
      >
        Descargar 
      </a>
    </>
  ) : (
    <p>No registra examenes</p>
  )}
</div>

            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-blue-300 text-blue-700 rounded-md hover:bg-blue-400"
              >
               Cerrar
              </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
