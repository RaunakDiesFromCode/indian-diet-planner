import { RefreshCw, Utensils, Briefcase, Info } from 'lucide-react';

export default function MealCard({ meal, onSwap }) {
  if (!meal) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="h-40 bg-neutral-100 relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
        <Utensils size={48} className="text-neutral-300" />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-neutral-600 shadow-sm">
          {meal.calories} kcal
        </div>
        {meal.dabbaFriendly && (
          <div className="absolute top-2 left-2 bg-secondary/10 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-secondary flex items-center gap-1 shadow-sm">
            <Briefcase size={12} /> Dabba Pro
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <div className="text-xs font-medium text-primary mb-1 uppercase tracking-wider">{meal.mealType}</div>
          <h3 className="text-lg font-bold text-neutral-dark line-clamp-1">{meal.name}</h3>
          <p className="text-sm font-medium text-neutral-500 mt-0.5">{meal.localName}</p>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          <span className="inline-block px-2 py-1 bg-neutral-50 text-neutral-600 text-xs rounded-md border border-neutral-100">
            {meal.macros.split(' / ')[0]}
          </span>
          <span className="inline-block px-2 py-1 bg-neutral-50 text-neutral-600 text-xs rounded-md border border-neutral-100">
            {meal.macros.split(' / ')[1]}
          </span>
          <span className="inline-block px-2 py-1 bg-neutral-50 text-neutral-600 text-xs rounded-md border border-neutral-100">
            {meal.macros.split(' / ')[2]}
          </span>
        </div>

        <div className="text-xs text-neutral-500 mb-4 flex items-center gap-1">
          <Info size={14} className="text-neutral-400" />
          <span className="truncate">{meal.ingredients.join(', ')}</span>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => onSwap(meal.mealType)}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 rounded-xl text-sm font-medium transition-colors border border-neutral-200"
          >
            <RefreshCw size={14} /> Swap
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-sm font-medium transition-colors border border-primary/20">
            <Utensils size={14} /> Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
