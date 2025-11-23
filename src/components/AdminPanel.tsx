import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, VacationStatus } from '../lib/supabase';
import { LogOut, Save, Calendar, MessageSquare, Settings } from 'lucide-react';

export function AdminPanel() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [vacationStatus, setVacationStatus] = useState<VacationStatus | null>(null);
  const [formData, setFormData] = useState({
    is_on_vacation: false,
    return_date: '',
    message: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
    fetchVacationStatus();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/admin/login');
    } else {
      setUser(user);
    }
    setLoading(false);
  };

  const fetchVacationStatus = async () => {
    const { data, error } = await supabase
      .from('vacation_status')
      .select('*')
      .single();

    if (data) {
      setVacationStatus(data);
      setFormData({
        is_on_vacation: data.is_on_vacation,
        return_date: data.return_date || '',
        message: data.message || ''
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('vacation_status')
        .update({
          is_on_vacation: formData.is_on_vacation,
          return_date: formData.return_date || null,
          message: formData.message || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', vacationStatus?.id);

      if (!error) {
        await fetchVacationStatus();
        alert('Stav dovolené byl úspěšně uložen!');
      }
    } catch (err) {
      alert('Došlo k chybě při ukládání');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-blue-900">Načítání...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-blue-900 text-white py-4 px-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Settings className="h-6 w-6" />
            <h1 className="text-xl font-serif font-bold">Administrace ordinace</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-200"
          >
            <LogOut className="h-4 w-4" />
            <span>Odhlásit se</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-6">
        <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-200 hover:shadow-md">
          <h2 className="text-2xl font-serif font-bold text-blue-900 mb-6">
            Správa stavu dovolené
          </h2>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="is_on_vacation"
                checked={formData.is_on_vacation}
                onChange={(e) => setFormData({ ...formData, is_on_vacation: e.target.checked })}
                className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="is_on_vacation" className="text-lg font-medium text-gray-700">
                Ordinace je uzavřena (dovolená/nepřítomnost)
              </label>
            </div>

            {formData.is_on_vacation && (
              <div className="space-y-4 pl-7 border-l-2 border-blue-100">
                <div>
                  <label htmlFor="return_date" className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Datum návratu
                  </label>
                  <input
                    type="date"
                    id="return_date"
                    value={formData.return_date}
                    onChange={(e) => setFormData({ ...formData, return_date: e.target.value })}
                    className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="h-4 w-4 inline mr-2" />
                    Zpráva pro pacienty (volitelné)
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Např.: Ordinace je uzavřena z důvodu dovolené. Děkujeme za pochopení."
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center space-x-2 bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                <span>{saving ? 'Ukládání...' : 'Uložit změny'}</span>
              </button>
            </div>
          </form>

          {vacationStatus && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Aktuální stav</h3>
              <div className="bg-stone-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">
                  <strong>Stav:</strong> {vacationStatus.is_on_vacation ? 'Uzavřeno' : 'Otevřeno'}
                </p>
                {vacationStatus.return_date && (
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Návrat:</strong> {new Date(vacationStatus.return_date).toLocaleDateString('cs-CZ')}
                  </p>
                )}
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Poslední aktualizace:</strong> {new Date(vacationStatus.updated_at).toLocaleString('cs-CZ')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}