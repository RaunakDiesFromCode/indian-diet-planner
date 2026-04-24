import { useState } from 'react';
import { regions, budgets, dietaryPrefs, healthGoals } from '../data/foodDatabase';
import { ChefHat, ArrowRight, HeartPulse, ShieldAlert } from 'lucide-react';

export default function Onboarding({ onComplete }) {
  const [formData, setFormData] = useState({
    region: 'bengali',
    diet: 'Non-vegetarian',
    goal: 'General fitness',
    budget: 'moderate',
    allergies: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-neutral-light flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-neutral-200">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-4">
            <ChefHat size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-neutral-dark tracking-tight">
            Plan Your Authentic Indian Diet
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            Rooted in tradition, personalized for you. Forget kale, let's eat what you love.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            
            {/* Region Selection */}
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-neutral-700">
                Which regional cuisine do you prefer?
              </label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="mt-2 block w-full pl-3 pr-10 py-3 text-base border-neutral-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-xl bg-neutral-50"
              >
                {regions.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>

            {/* Diet & Goal */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="diet" className="block text-sm font-medium text-neutral-700">
                  Dietary Preference
                </label>
                <select
                  id="diet"
                  name="diet"
                  value={formData.diet}
                  onChange={handleChange}
                  className="mt-2 block w-full pl-3 pr-10 py-3 text-base border-neutral-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-xl bg-neutral-50"
                >
                  {dietaryPrefs.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <HeartPulse size={16} className="text-accent" /> Health Goal
                </label>
                <select
                  id="goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="mt-2 block w-full pl-3 pr-10 py-3 text-base border-neutral-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-xl bg-neutral-50"
                >
                  {healthGoals.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                Daily Budget
              </label>
              <div className="grid grid-cols-3 gap-3">
                {budgets.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setFormData({ ...formData, budget: b.id })}
                    className={`cursor-pointer border rounded-xl p-4 text-center transition-all ${
                      formData.budget === b.id
                        ? 'border-primary bg-primary/10 shadow-sm'
                        : 'border-neutral-200 hover:border-primary/50'
                    }`}
                  >
                    <div className={`font-semibold ${formData.budget === b.id ? 'text-primary' : 'text-neutral-700'}`}>
                      {b.name}
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">{b.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Allergies */}
            <div>
              <label htmlFor="allergies" className="block text-sm font-medium text-neutral-700 flex items-center gap-2">
                <ShieldAlert size={16} className="text-yellow-500" /> Allergies or Dislikes
              </label>
              <input
                type="text"
                name="allergies"
                id="allergies"
                value={formData.allergies}
                onChange={handleChange}
                placeholder="e.g., Dairy, Peanuts, Bitter gourd"
                className="mt-2 block w-full pl-4 py-3 border-neutral-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-xl bg-neutral-50"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-2xl text-white bg-primary hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors shadow-lg hover:shadow-xl"
            >
              Generate My Plan
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
