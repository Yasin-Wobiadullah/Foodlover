import { supabase } from './supabase';
import { Database } from '../types/supabase';

type Recipe = Database['public']['Tables']['recipes']['Row'];
type RecipeTranslation = Database['public']['Tables']['recipe_translations']['Row'];

export interface SearchRecipe {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  rating_average: number | null;
  servings: number | null;
  calories_per_serving: number | null;
  protein_per_serving: number | null;
  carbs_per_serving: number | null;
  fat_per_serving: number | null;
  total_time_minutes: number | null;
  cuisine_name: string | null;
  diet_name: string | null;
  diet_icon: string | null;
  diet_color: string | null;
}

export interface SearchFilters {
  categories?: string[];
  cuisines?: string[];
  diets?: string[];
  maxCalories?: number;
  maxTime?: number;
}

/**
 * Search recipes by title with debouncing support
 */
export async function searchRecipes(
  query: string,
  language: string = 'en',
  filters?: SearchFilters,
  limit: number = 20,
  offset: number = 0
): Promise<{ data: SearchRecipe[]; error: Error | null }> {
  try {
    if (!query || query.trim().length < 2) {
      return { data: [], error: null };
    }

    // Build the query with all necessary joins
    let queryBuilder = supabase
      .from('recipe_translations')
      .select(`
        recipe_id,
        title,
        description,
        recipes!inner (
          id,
          image_url,
          rating_average,
          servings,
          calories_per_serving,
          protein_per_serving,
          carbs_per_serving,
          fat_per_serving,
          status
        )
      `)
      .eq('language_code', language)
      .eq('recipes.status', 'published')
      .ilike('title', `%${query.trim()}%`)
      .order('title', { ascending: true })
      .range(offset, offset + limit - 1);

    const { data, error } = await queryBuilder;

    if (error) {
      console.error('Search error:', error);
      return { data: [], error: new Error(error.message) };
    }

    // For each recipe, fetch additional data
    const recipesWithDetails = await Promise.all(
      (data || []).map(async (item: any) => {
        const recipeId = item.recipes.id;

        // Fetch total time (sum of all time types)
        const { data: timeData } = await supabase
          .from('recipe_times')
          .select('minutes')
          .eq('recipe_id', recipeId);
        
        const totalTime = timeData?.reduce((sum, t) => sum + (t.minutes || 0), 0) || null;

        // Fetch first cuisine
        const { data: cuisineData } = await supabase
          .from('recipe_cuisines')
          .select(`
            cuisines!inner (
              id,
              cuisine_translations!inner (
                name
              )
            )
          `)
          .eq('recipe_id', recipeId)
          .eq('cuisines.cuisine_translations.language_code', language)
          .limit(1)
          .single();

        // Fetch prioritized diet (Vegan > Vegetarian > Pescetarian > Paleo > Keto > others)
        const dietPriority = [
          'b8f74620-5519-4375-9477-1b4c8db60ffd', // Vegan
          'f8aeb66f-6528-489d-94b2-ebd9f5f8fbbf', // Vegetarian
          '89e25e2c-1bc3-40e9-8198-335384761863', // Pescetarian
          '5f3bca99-1a5a-4eaf-a516-0af93d6ac58c', // Paleo
          '8503cbcd-a599-40c1-9f02-373e019d39f7', // Keto
        ];

        const { data: allDiets } = await supabase
          .from('recipe_diets')
          .select(`
            diets!inner (
              id,
              icon_identifier,
              color_hex,
              diet_translations!inner (
                name
              )
            )
          `)
          .eq('recipe_id', recipeId)
          .eq('diets.diet_translations.language_code', language);

        // Find the highest priority diet
        let selectedDiet = null;
        for (const priorityId of dietPriority) {
          const found = allDiets?.find((d: any) => d.diets.id === priorityId);
          if (found) {
            selectedDiet = found;
            break;
          }
        }
        // If no priority diet found, use first available
        if (!selectedDiet && allDiets && allDiets.length > 0) {
          selectedDiet = allDiets[0];
        }

        return {
          id: item.recipes.id,
          title: item.title,
          description: item.description,
          image_url: item.recipes.image_url,
          rating_average: item.recipes.rating_average,
          servings: item.recipes.servings,
          calories_per_serving: item.recipes.calories_per_serving,
          protein_per_serving: item.recipes.protein_per_serving,
          carbs_per_serving: item.recipes.carbs_per_serving,
          fat_per_serving: item.recipes.fat_per_serving,
          total_time_minutes: totalTime,
          cuisine_name: (cuisineData as any)?.cuisines?.cuisine_translations?.[0]?.name || null,
          diet_name: (selectedDiet as any)?.diets?.diet_translations?.[0]?.name || null,
          diet_icon: (selectedDiet as any)?.diets?.icon_identifier || null,
          diet_color: (selectedDiet as any)?.diets?.color_hex || null,
        };
      })
    );

    return { data: recipesWithDetails, error: null };
  } catch (err) {
    console.error('Search service error:', err);
    return { data: [], error: err as Error };
  }
}

/**
 * Get all categories with translations
 */
export async function getCategories(language: string = 'en') {
  try {
    const { data, error } = await supabase
      .from('category_translations')
      .select(`
        name,
        categories!inner (
          id,
          slug,
          icon_name
        )
      `)
      .eq('language_code', language)
      .order('name', { ascending: true });

    if (error) {
      console.error('Categories fetch error:', error);
      return { data: [], error: new Error(error.message) };
    }

    return { data: data || [], error: null };
  } catch (err) {
    console.error('Categories service error:', err);
    return { data: [], error: err as Error };
  }
}

/**
 * Get all cuisines with translations
 */
export async function getCuisines(language: string = 'en') {
  try {
    const { data, error } = await supabase
      .from('cuisine_translations')
      .select(`
        name,
        cuisines!inner (
          id,
          slug
        )
      `)
      .eq('language_code', language)
      .order('name', { ascending: true });

    if (error) {
      console.error('Cuisines fetch error:', error);
      return { data: [], error: new Error(error.message) };
    }

    return { data: data || [], error: null };
  } catch (err) {
    console.error('Cuisines service error:', err);
    return { data: [], error: err as Error };
  }
}

/**
 * Get all diets with translations
 */
export async function getDiets(language: string = 'en') {
  try {
    const { data, error } = await supabase
      .from('diet_translations')
      .select(`
        name,
        description,
        diets!inner (
          id,
          icon_identifier,
          color_hex
        )
      `)
      .eq('language_code', language)
      .order('name', { ascending: true });

    if (error) {
      console.error('Diets fetch error:', error);
      return { data: [], error: new Error(error.message) };
    }

    return { data: data || [], error: null };
  } catch (err) {
    console.error('Diets service error:', err);
    return { data: [], error: err as Error };
  }
}

/**
 * Get recipe details by ID
 */
export async function getRecipeDetails(recipeId: string, language: string = 'en') {
  try {
    // Fetch recipe basic info
    const { data: recipeData, error: recipeError } = await supabase
      .from('recipes')
      .select(`
        id,
        image_url,
        servings,
        calories_per_serving,
        protein_per_serving,
        carbs_per_serving,
        fat_per_serving,
        difficulty_id,
        author_id
      `)
      .eq('id', recipeId)
      .single();

    if (recipeError) {
      console.error('Recipe fetch error:', recipeError);
      return { data: null, error: new Error(recipeError.message) };
    }

    // Fetch recipe translation
    const { data: translationData } = await supabase
      .from('recipe_translations')
      .select('title, description')
      .eq('recipe_id', recipeId)
      .eq('language_code', language)
      .single();

    // Fetch difficulty
    const { data: difficultyData } = await supabase
      .from('difficulty_translations')
      .select('name')
      .eq('difficulty_id', recipeData.difficulty_id)
      .eq('language_code', language)
      .single();

    // Fetch author
    const { data: authorData } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', recipeData.author_id)
      .single();

    // Fetch total time (sum of all time types)
    const { data: timeData } = await supabase
      .from('recipe_times')
      .select('minutes')
      .eq('recipe_id', recipeId);

    const totalTime = timeData?.reduce((sum, t) => sum + (t.minutes || 0), 0) || null;

    // Fetch ingredients
    const { data: ingredientsData } = await supabase
      .from('recipe_ingredients')
      .select(`
        base_amount_g,
        ingredients!inner (
          id,
          image_url,
          ingredient_translations!inner (
            name
          )
        )
      `)
      .eq('recipe_id', recipeId)
      .eq('ingredients.ingredient_translations.language_code', language);

    const ingredients = ingredientsData?.map((item: any) => ({
      id: item.ingredients.id,
      name: item.ingredients.ingredient_translations[0]?.name || 'Unknown',
      amount: `${Math.round(item.base_amount_g)}g`,
      image_url: item.ingredients.image_url,
    })) || [];

    // Fetch instructions
    const { data: instructionsData } = await supabase
      .from('instructions')
      .select(`
        step_number,
        instruction_translations!inner (
          description
        )
      `)
      .eq('recipe_id', recipeId)
      .eq('instruction_translations.language_code', language)
      .order('step_number', { ascending: true });

    const instructions = instructionsData?.map((item: any) => ({
      step_number: item.step_number,
      description: item.instruction_translations[0]?.description || '',
    })) || [];

    return {
      data: {
        id: recipeData.id,
        title: translationData?.title || 'Untitled Recipe',
        description: translationData?.description,
        image_url: recipeData.image_url,
        author_name: authorData?.name || 'Unknown Chef',
        difficulty: difficultyData?.name || null,
        total_time_minutes: totalTime,
        calories_per_serving: recipeData.calories_per_serving,
        servings: recipeData.servings,
        protein_per_serving: recipeData.protein_per_serving,
        carbs_per_serving: recipeData.carbs_per_serving,
        fat_per_serving: recipeData.fat_per_serving,
        ingredients,
        instructions,
      },
      error: null,
    };
  } catch (err) {
    console.error('Recipe details service error:', err);
    return { data: null, error: err as Error };
  }
}
