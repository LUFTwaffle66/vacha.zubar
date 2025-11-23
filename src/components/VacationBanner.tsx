import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { VacationStatus } from '../lib/supabase';

interface VacationBannerProps {
  vacationStatus: VacationStatus | null;
}

export function VacationBanner({ vacationStatus }: VacationBannerProps) {
  if (!vacationStatus?.is_on_vacation) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h3 className="text-lg font-semibold text-amber-800 mb-2">
            Ordinace je dočasně uzavřena
          </h3>
          {vacationStatus.message && (
            <p className="text-amber-700 mb-2">
              {vacationStatus.message}
            </p>
          )}
          {vacationStatus.return_date && (
            <div className="flex items-center text-amber-700">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                Návrat do ordinace: {formatDate(vacationStatus.return_date)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}