import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Resident } from '../types';

interface ResidentFormProps {
  onSubmit: (resident: Omit<Resident, 'id'>) => void;
  onClose: () => void;
}

export function ResidentForm({ onSubmit, onClose }: ResidentFormProps) {
  const [formData, setFormData] = useState<{
    name: string;
    dateOfBirth: string;
    photo: string;
    medicalConditions: string[];
    allergies: string[];
    emergencyContact: {
      name: string;
      phone: string;
      relationship: string;
    };
    medications: {
      id: string; // Agrega la propiedad `id`
      name: string;
      dosage: string;
      frequency: string;
      schedule: {
        morning: boolean;
        afternoon: boolean;
        evening: boolean;
      };
      taken: boolean;
    }[];
    lastExam: File | null;
  }>({
    name: '',
    dateOfBirth: '',
    photo: '',
    medicalConditions: [''],
    allergies: [''],
    emergencyContact: {
      name: '',
      phone: '',
      relationship: '',
    },
    medications: [
      {
        id: crypto.randomUUID(), // Genera un ID único para cada medicamento
        name: '',
        dosage: '',
        frequency: '',
        schedule: {
          morning: false,
          afternoon: false,
          evening: false,
        },
        taken: false,
      },
    ],
    lastExam: null,
     
  });
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Agregar nuevo residente</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha nacimiento</label>
              <input
                type="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Foto URL</label>
            <input
              type="url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.photo}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
            />
          </div>
          <div>
  <label className="block text-sm font-medium text-gray-700">Alergias</label>
  {formData.allergies.map((allergy, index) => (
    <div key={index} className="flex items-center gap-2 mb-2">
      <input
        type="text"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        value={allergy}
        onChange={(e) => {
          const updatedAllergies = [...formData.allergies];
          updatedAllergies[index] = e.target.value;
          setFormData({ ...formData, allergies: updatedAllergies });
        }}
      />
      <button
        type="button"
        className="text-red-500 hover:text-red-700"
        onClick={() => {
          const updatedAllergies = formData.allergies.filter((_, i) => i !== index);
          setFormData({ ...formData, allergies: updatedAllergies });
        }}
      >
        Quitar
      </button>
    </div>
  ))}
  <button
    type="button"
    className="text-blue-500 hover:text-blue-700"
    onClick={() => setFormData({ ...formData, allergies: [...formData.allergies, ''] })}
  >
    Añadir Alergia
  </button>
</div>
<div>
  <h3 className="text-lg font-medium text-gray-700">Medicamentos</h3>
  {formData.medications.map((medication, index) => (
    <div key={index} className="space-y-2 border p-4 rounded-md mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={medication.name}
          onChange={(e) => {
            const updatedMedications = [...formData.medications];
            updatedMedications[index].name = e.target.value;
            setFormData({ ...formData, medications: updatedMedications });
          }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Dosis</label>
        <input
          type="text"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={medication.dosage}
          onChange={(e) => {
            const updatedMedications = [...formData.medications];
            updatedMedications[index].dosage = e.target.value;
            setFormData({ ...formData, medications: updatedMedications });
          }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Frecuencia</label>
        <input
          type="text"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={medication.frequency}
          onChange={(e) => {
            const updatedMedications = [...formData.medications];
            updatedMedications[index].frequency = e.target.value;
            setFormData({ ...formData, medications: updatedMedications });
          }}
        />
      </div>
      <button
        type="button"
        className="text-red-500 hover:text-red-700 mt-2"
        onClick={() => {
          const updatedMedications = formData.medications.filter((_, i) => i !== index);
          setFormData({ ...formData, medications: updatedMedications });
        }}
      >
        Quitar Medicamento
      </button>
    </div>
  ))}
  <button
  type="button"
  className="text-blue-500 hover:text-blue-700"
  onClick={() =>
    setFormData({
      ...formData,
      medications: [
        ...formData.medications,
        {
          id: crypto.randomUUID(), // Genera un nuevo ID
          name: '',
          dosage: '',
          frequency: '',
          schedule: { morning: false, afternoon: false, evening: false },
          taken: false,
        },
      ],
    })
  }
>
  Añadir Medicamento
</button>
</div>


          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Contacto de emergencia</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.emergencyContact.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    emergencyContact: { ...formData.emergencyContact, name: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Telefono</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.emergencyContact.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    emergencyContact: { ...formData.emergencyContact, phone: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Relación</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.emergencyContact.relationship}
                  onChange={(e) => setFormData({
                    ...formData,
                    emergencyContact: { ...formData.emergencyContact, relationship: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>
          <div>
  <label className="block text-sm font-medium text-gray-700">Último Examen (PDF)</label>
  <input
  type="file"
  accept="application/pdf"
  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
  onChange={(e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, lastExam: file });
    }
  }}
/>
</div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Agregar Residente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}