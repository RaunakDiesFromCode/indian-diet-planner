import { useState, useEffect } from 'react';
import MealCard from './MealCard';
import { foodDatabase } from '../data/foodDatabase';
import { Droplet, Flame, ArrowLeft, Sun, CalendarDays, ShoppingBag, Utensils, HeartPulse } from 'lucide-react';

export default function Dashboard({ userPrefs, onBack }) {
  const [dailyPlan, setDailyPlan] = useState({});
  const [waterGlasses, setWaterGlasses] = useState(0);

  // Generate initial meal plan based on preferences
  useEffect(() => {
    generatePlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPrefs]);

  const generatePlan = () => {
    const regionFood = foodDatabase[userPrefs.region] || [];
    
    // Filter by diet
    let allowedFood = regionFood;
    if (userPrefs.diet === 'Vegetarian') {
      allowedFood = regionFood.filter(f => f.type === 'Vegetarian' || f.type === 'Vegan');
    } else if (userPrefs.diet === 'Vegan') {
      allowedFood = regionFood.filter(f => f.type === 'Vegan');
    } else if (userPrefs.diet === 'Eggetarian') {
      allowedFood = regionFood.filter(f => f.type === 'Eggetarian' || f.type === 'Vegetarian' || f.type === 'Vegan');
    } // Non-vegetarian gets all
    
    // Fallback if filtering removes everything (for mock data sake)
    if (allowedFood.length === 0) allowedFood = regionFood;

    const getMeal = (type) => {
      const options = allowedFood.filter(f => f.mealType === type);
      if (options.length > 0) {
        return options[Math.floor(Math.random() * options.length)];
      }
      return null;
    };

    setDailyPlan({
      Breakfast: getMeal('Breakfast'),
      Lunch: getMeal('Lunch'),
      Snack: getMeal('Snack'),
      Dinner: getMeal('Dinner'),
    });
  };

  const handleSwap = (mealType) => {
    const regionFood = foodDatabase[userPrefs.region] || [];
    let allowedFood = regionFood;
    if (userPrefs.diet === 'Vegetarian') allowedFood = regionFood.filter(f => f.type === 'Vegetarian' || f.type === 'Vegan');
    else if (userPrefs.diet === 'Vegan') allowedFood = regionFood.filter(f => f.type === 'Vegan');
    if (allowedFood.length === 0) allowedFood = regionFood;

    const options = allowedFood.filter(f => f.mealType === mealType && f.id !== dailyPlan[mealType]?.id);
    if (options.length > 0) {
      const newMeal = options[Math.floor(Math.random() * options.length)];
      setDailyPlan(prev => ({ ...prev, [mealType]: newMeal }));
    }
  };

  const totalCalories = Object.values(dailyPlan).reduce((acc, meal) => acc + (meal?.calories || 0), 0);
  const targetCalories = 2000; // Mock target
  const caloriePercent = Math.min((totalCalories / targetCalories) * 100, 100);

  return (
    <div className="min-h-screen bg-neutral-light pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-600">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-neutral-dark capitalize">
              {userPrefs.region} Diet Plan
            </h1>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-full transition-colors hidden sm:block">
              <CalendarDays size={20} />
            </button>
            <button className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
              <ShoppingBag size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        
        {/* Top Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          
          {/* Calorie Tracker */}
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-neutral-100 flex items-center gap-6">
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                <circle 
                  cx="40" cy="40" r="36" fill="none" stroke="#F59E0B" strokeWidth="8"
                  strokeDasharray="226.2"
                  strokeDashoffset={226.2 - (226.2 * caloriePercent) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-primary">
                <Flame size={20} className="mb-0.5" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-1">Daily Energy</h3>
              <div className="text-2xl font-bold text-neutral-dark">
                {totalCalories} <span className="text-sm font-medium text-neutral-400">/ {targetCalories} kcal</span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">Based on {userPrefs.goal}</p>
            </div>
          </div>

          {/* Water Tracker */}
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-neutral-100 flex flex-col justify-center">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Hydration</h3>
              <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-md">
                {waterGlasses} / 8 Glasses
              </span>
            </div>
            <div className="flex justify-between items-center px-2">
              {[...Array(8)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setWaterGlasses(i === waterGlasses - 1 ? i : i + 1)}
                  className={`transition-all duration-300 transform hover:scale-110 ${
                    i < waterGlasses ? 'text-blue-500' : 'text-neutral-200 hover:text-blue-200'
                  }`}
                >
                  <Droplet size={24} fill={i < waterGlasses ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Smart Suggestion */}
        <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-4 mb-8 flex items-start gap-3">
          <Sun size={24} className="text-secondary shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-secondary-dark text-secondary">Seasonal Tip</h4>
            <p className="text-sm text-neutral-700 mt-1">
              Mangoes are in season! Add half a sliced Alphonso to your mid-morning snack for natural energy.
            </p>
          </div>
        </div>

        {/* Meal Cards */}
        <h2 className="text-2xl font-bold text-neutral-dark mb-6">Today's Menu</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(dailyPlan).map(([mealType, meal]) => (
             meal && <MealCard key={mealType} meal={meal} onSwap={handleSwap} />
          ))}
        </div>

      </main>
      
      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 flex justify-around p-3 z-50 pb-safe">
        <button className="flex flex-col items-center gap-1 text-primary">
          <Utensils size={20} />
          <span className="text-[10px] font-medium">Meals</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-neutral-400 hover:text-primary transition-colors">
          <ShoppingBag size={20} />
          <span className="text-[10px] font-medium">Groceries</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-neutral-400 hover:text-primary transition-colors">
          <HeartPulse size={20} />
          <span className="text-[10px] font-medium">Progress</span>
        </button>
      </div>
    </div>
  );
}
