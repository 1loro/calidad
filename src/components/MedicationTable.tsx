
import { Check, X } from 'lucide-react';
import type { Resident} from '../types';

interface MedicationTableProps {
  resident: Resident;
  onMedicationToggle: (residentId: string, medicationId: string, taken: boolean, lastTakenTime?: string) => void;
}

export function MedicationTable({ resident, onMedicationToggle }: MedicationTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{resident.name}'s Medicación</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicación</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosis</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frecuencia</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {resident.medications.map((medication) => (
              <tr key={medication.id}>
                <td className="px-6 py-4 whitespace-nowrap">{medication.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{medication.dosage}</td>
                <td className="px-6 py-4 whitespace-nowrap">{medication.frequency}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {medication.taken ? (
                    <div className="flex items-center">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Tomada
                      </span>
                      <span className="ml-2 text-xs text-gray-500">{medication.lastTakenTime}</span>
                    </div>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Pendiente
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <button
  onClick={() => {
    const currentTime = new Date().toLocaleTimeString();
    onMedicationToggle(resident.id, medication.id, !medication.taken, currentTime);
  }}
  className={`p-2 rounded-full ${
    medication.taken ? 'bg-red-100 hover:bg-red-200' : 'bg-green-100 hover:bg-green-200'
  }`}
>
  {medication.taken ? (
    <X className="w-5 h-5 text-red-600" />
  ) : (
    <Check className="w-5 h-5 text-green-600" />
  )}
</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
