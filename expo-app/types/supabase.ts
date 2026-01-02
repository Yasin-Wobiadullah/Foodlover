export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          icon_name: string | null
          id: string
          slug: string
        }
        Insert: {
          icon_name?: string | null
          id?: string
          slug: string
        }
        Update: {
          icon_name?: string | null
          id?: string
          slug?: string
        }
        Relationships: []
      }
      category_translations: {
        Row: {
          category_id: string
          language_code: string
          name: string
        }
        Insert: {
          category_id: string
          language_code: string
          name: string
        }
        Update: {
          category_id?: string
          language_code?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_category"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_language"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
        ]
      }
      collection_recipes: {
        Row: {
          collection_id: string
          recipe_id: string
        }
        Insert: {
          collection_id: string
          recipe_id: string
        }
        Update: {
          collection_id?: string
          recipe_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_recipes_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_recipes_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cuisine_translations: {
        Row: {
          cuisine_id: string
          language_code: string
          name: string
        }
        Insert: {
          cuisine_id: string
          language_code: string
          name: string
        }
        Update: {
          cuisine_id?: string
          language_code?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_cuisine"
            columns: ["cuisine_id"]
            isOneToOne: false
            referencedRelation: "cuisines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_language"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
        ]
      }
      cuisines: {
        Row: {
          id: string
          slug: string
        }
        Insert: {
          id?: string
          slug: string
        }
        Update: {
          id?: string
          slug?: string
        }
        Relationships: []
      }
      diet_translations: {
        Row: {
          description: string
          diet_id: string
          language_code: string
          name: string
        }
        Insert: {
          description: string
          diet_id: string
          language_code: string
          name: string
        }
        Update: {
          description?: string
          diet_id?: string
          language_code?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "diet_translations_diet_id_fkey"
            columns: ["diet_id"]
            isOneToOne: false
            referencedRelation: "diets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diet_translations_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
        ]
      }
      diets: {
        Row: {
          color_hex: string | null
          icon_identifier: string | null
          id: string
        }
        Insert: {
          color_hex?: string | null
          icon_identifier?: string | null
          id?: string
        }
        Update: {
          color_hex?: string | null
          icon_identifier?: string | null
          id?: string
        }
        Relationships: []
      }
      difficulties: {
        Row: {
          id: string
        }
        Insert: {
          id?: string
        }
        Update: {
          id?: string
        }
        Relationships: []
      }
      difficulty_translations: {
        Row: {
          difficulty_id: string
          language_code: string
          name: string
        }
        Insert: {
          difficulty_id: string
          language_code: string
          name: string
        }
        Update: {
          difficulty_id?: string
          language_code?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "difficulty_translations_difficulty_id_fkey"
            columns: ["difficulty_id"]
            isOneToOne: false
            referencedRelation: "difficulties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "difficulty_translations_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
        ]
      }
      ingredient_translations: {
        Row: {
          ingredient_id: string
          language_code: string
          name: string
        }
        Insert: {
          ingredient_id: string
          language_code: string
          name: string
        }
        Update: {
          ingredient_id?: string
          language_code?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "ingredient_translations_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ingredient_translations_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
        ]
      }
      ingredient_unit_conversions: {
        Row: {
          grams_per_unit: number
          ingredient_id: string
          unit_id: string
        }
        Insert: {
          grams_per_unit: number
          ingredient_id: string
          unit_id: string
        }
        Update: {
          grams_per_unit?: number
          ingredient_id?: string
          unit_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ingredient_unit_conversions_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ingredient_unit_conversions_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredients: {
        Row: {
          availability_category: string | null
          calories_per_100: number | null
          carbs_per_100: number | null
          created_at: string | null
          fat_per_100: number | null
          id: string
          image_url: string | null
          preferred_display_unit_imperial_id: string | null
          preferred_display_unit_metric_id: string | null
          protein_per_100: number | null
          query_name: string | null
        }
        Insert: {
          availability_category?: string | null
          calories_per_100?: number | null
          carbs_per_100?: number | null
          created_at?: string | null
          fat_per_100?: number | null
          id?: string
          image_url?: string | null
          preferred_display_unit_imperial_id?: string | null
          preferred_display_unit_metric_id?: string | null
          protein_per_100?: number | null
          query_name?: string | null
        }
        Update: {
          availability_category?: string | null
          calories_per_100?: number | null
          carbs_per_100?: number | null
          created_at?: string | null
          fat_per_100?: number | null
          id?: string
          image_url?: string | null
          preferred_display_unit_imperial_id?: string | null
          preferred_display_unit_metric_id?: string | null
          protein_per_100?: number | null
          query_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_display_imperial"
            columns: ["preferred_display_unit_imperial_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_display_metric"
            columns: ["preferred_display_unit_metric_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      instruction_ingredients: {
        Row: {
          amount_g: number
          id: string
          ingredient_id: string | null
          instruction_id: string | null
        }
        Insert: {
          amount_g: number
          id?: string
          ingredient_id?: string | null
          instruction_id?: string | null
        }
        Update: {
          amount_g?: number
          id?: string
          ingredient_id?: string | null
          instruction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instruction_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instruction_ingredients_instruction_id_fkey"
            columns: ["instruction_id"]
            isOneToOne: false
            referencedRelation: "instructions"
            referencedColumns: ["id"]
          },
        ]
      }
      instruction_translations: {
        Row: {
          description: string
          duration_label: string | null
          instruction_id: string
          language_code: string
        }
        Insert: {
          description: string
          duration_label?: string | null
          instruction_id: string
          language_code: string
        }
        Update: {
          description?: string
          duration_label?: string | null
          instruction_id?: string
          language_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "instruction_translations_instruction_id_fkey"
            columns: ["instruction_id"]
            isOneToOne: false
            referencedRelation: "instructions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instruction_translations_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
        ]
      }
      instructions: {
        Row: {
          duration_minutes: number | null
          id: string
          image_url: string | null
          recipe_id: string | null
          step_number: number
          temperature_celsius: number | null
          temperature_fahrenheit: number | null
        }
        Insert: {
          duration_minutes?: number | null
          id?: string
          image_url?: string | null
          recipe_id?: string | null
          step_number: number
          temperature_celsius?: number | null
          temperature_fahrenheit?: number | null
        }
        Update: {
          duration_minutes?: number | null
          id?: string
          image_url?: string | null
          recipe_id?: string | null
          step_number?: number
          temperature_celsius?: number | null
          temperature_fahrenheit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "instructions_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      languages: {
        Row: {
          code: string
          name: string
          native_name: string
        }
        Insert: {
          code: string
          name: string
          native_name: string
        }
        Update: {
          code?: string
          name?: string
          native_name?: string
        }
        Relationships: []
      }
      likes: {
        Row: {
          recipe_id: string
          user_id: string
        }
        Insert: {
          recipe_id: string
          user_id: string
        }
        Update: {
          recipe_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      occasion_translations: {
        Row: {
          language_code: string
          name: string
          occasion_id: string
        }
        Insert: {
          language_code: string
          name: string
          occasion_id: string
        }
        Update: {
          language_code?: string
          name?: string
          occasion_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_language"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "fk_occasion"
            columns: ["occasion_id"]
            isOneToOne: false
            referencedRelation: "occasions"
            referencedColumns: ["id"]
          },
        ]
      }
      occasions: {
        Row: {
          id: string
          slug: string
        }
        Insert: {
          id?: string
          slug: string
        }
        Update: {
          id?: string
          slug?: string
        }
        Relationships: []
      }
      profile_disliked_ingredients: {
        Row: {
          ingredient_id: string
          profile_id: string
        }
        Insert: {
          ingredient_id: string
          profile_id: string
        }
        Update: {
          ingredient_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_disliked_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_disliked_ingredients_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_path: string | null
          created_at: string | null
          diet_id: string | null
          id: string
          name: string | null
          preferred_temperature:
            | Database["public"]["Enums"]["preferred_temperature_unit"]
            | null
          preferred_units:
            | Database["public"]["Enums"]["preferred_measurement_unit"]
            | null
          role: string | null
        }
        Insert: {
          avatar_path?: string | null
          created_at?: string | null
          diet_id?: string | null
          id?: string
          name?: string | null
          preferred_temperature?:
            | Database["public"]["Enums"]["preferred_temperature_unit"]
            | null
          preferred_units?:
            | Database["public"]["Enums"]["preferred_measurement_unit"]
            | null
          role?: string | null
        }
        Update: {
          avatar_path?: string | null
          created_at?: string | null
          diet_id?: string | null
          id?: string
          name?: string | null
          preferred_temperature?:
            | Database["public"]["Enums"]["preferred_temperature_unit"]
            | null
          preferred_units?:
            | Database["public"]["Enums"]["preferred_measurement_unit"]
            | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_diet_id_fkey"
            columns: ["diet_id"]
            isOneToOne: false
            referencedRelation: "diets"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_categories: {
        Row: {
          category_id: string
          recipe_id: string
        }
        Insert: {
          category_id: string
          recipe_id: string
        }
        Update: {
          category_id?: string
          recipe_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_category"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_recipe"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_cuisines: {
        Row: {
          cuisine_id: string
          recipe_id: string
        }
        Insert: {
          cuisine_id: string
          recipe_id: string
        }
        Update: {
          cuisine_id?: string
          recipe_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_cuisine"
            columns: ["cuisine_id"]
            isOneToOne: false
            referencedRelation: "cuisines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_recipe"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_diets: {
        Row: {
          diet_id: string
          recipe_id: string
        }
        Insert: {
          diet_id: string
          recipe_id: string
        }
        Update: {
          diet_id?: string
          recipe_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_diets_diet_id_fkey"
            columns: ["diet_id"]
            isOneToOne: false
            referencedRelation: "diets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_diets_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_ingredients: {
        Row: {
          base_amount_g: number | null
          ingredient_id: string
          recipe_id: string
        }
        Insert: {
          base_amount_g?: number | null
          ingredient_id: string
          recipe_id: string
        }
        Update: {
          base_amount_g?: number | null
          ingredient_id?: string
          recipe_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_occasions: {
        Row: {
          occasion_id: string
          recipe_id: string
        }
        Insert: {
          occasion_id: string
          recipe_id: string
        }
        Update: {
          occasion_id?: string
          recipe_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_occasion"
            columns: ["occasion_id"]
            isOneToOne: false
            referencedRelation: "occasions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_recipe"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_tags: {
        Row: {
          recipe_id: string
          tag_id: string
        }
        Insert: {
          recipe_id: string
          tag_id: string
        }
        Update: {
          recipe_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_tags_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_times: {
        Row: {
          minutes: number
          recipe_id: string
          time_type_id: string
        }
        Insert: {
          minutes: number
          recipe_id: string
          time_type_id: string
        }
        Update: {
          minutes?: number
          recipe_id?: string
          time_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_times_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_times_time_type_id_fkey"
            columns: ["time_type_id"]
            isOneToOne: false
            referencedRelation: "time_types"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_translations: {
        Row: {
          description: string | null
          language_code: string
          notes: string | null
          recipe_id: string
          title: string
        }
        Insert: {
          description?: string | null
          language_code: string
          notes?: string | null
          recipe_id: string
          title: string
        }
        Update: {
          description?: string | null
          language_code?: string
          notes?: string | null
          recipe_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_translations_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "recipe_translations_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_utensils: {
        Row: {
          recipe_id: string
          utensil_id: string
        }
        Insert: {
          recipe_id: string
          utensil_id: string
        }
        Update: {
          recipe_id?: string
          utensil_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_utensils_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_utensils_utensil_id_fkey"
            columns: ["utensil_id"]
            isOneToOne: false
            referencedRelation: "utensils"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          author_id: string | null
          calories_per_serving: number | null
          carbs_per_serving: number | null
          created_at: string | null
          difficulty_id: string | null
          fat_per_serving: number | null
          id: string
          image_url: string | null
          protein_per_serving: number | null
          rating_average: number | null
          scalable: boolean | null
          servings: number | null
          slug: string | null
          status: string | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          author_id?: string | null
          calories_per_serving?: number | null
          carbs_per_serving?: number | null
          created_at?: string | null
          difficulty_id?: string | null
          fat_per_serving?: number | null
          id?: string
          image_url?: string | null
          protein_per_serving?: number | null
          rating_average?: number | null
          scalable?: boolean | null
          servings?: number | null
          slug?: string | null
          status?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          author_id?: string | null
          calories_per_serving?: number | null
          carbs_per_serving?: number | null
          created_at?: string | null
          difficulty_id?: string | null
          fat_per_serving?: number | null
          id?: string
          image_url?: string | null
          protein_per_serving?: number | null
          rating_average?: number | null
          scalable?: boolean | null
          servings?: number | null
          slug?: string | null
          status?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipes_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipes_difficulty_id_fkey"
            columns: ["difficulty_id"]
            isOneToOne: false
            referencedRelation: "difficulties"
            referencedColumns: ["id"]
          },
        ]
      }
      revenuecat_customers: {
        Row: {
          data: Json | null
          id: string
        }
        Insert: {
          data?: Json | null
          id: string
        }
        Update: {
          data?: Json | null
          id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          rating: number | null
          recipe_id: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          recipe_id?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          recipe_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saves: {
        Row: {
          recipe_id: string
          user_id: string
        }
        Insert: {
          recipe_id: string
          user_id: string
        }
        Update: {
          recipe_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saves_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saves_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tag_translations: {
        Row: {
          language_code: string
          name: string
          tag_id: string
        }
        Insert: {
          language_code: string
          name: string
          tag_id: string
        }
        Update: {
          language_code?: string
          name?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tag_translations_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "tag_translations_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          id: string
        }
        Insert: {
          id?: string
        }
        Update: {
          id?: string
        }
        Relationships: []
      }
      time_type_translations: {
        Row: {
          language_code: string
          name: string
          time_type_id: string
        }
        Insert: {
          language_code: string
          name: string
          time_type_id: string
        }
        Update: {
          language_code?: string
          name?: string
          time_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "time_type_translations_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "time_type_translations_time_type_id_fkey"
            columns: ["time_type_id"]
            isOneToOne: false
            referencedRelation: "time_types"
            referencedColumns: ["id"]
          },
        ]
      }
      time_types: {
        Row: {
          id: string
        }
        Insert: {
          id?: string
        }
        Update: {
          id?: string
        }
        Relationships: []
      }
      unit_translations: {
        Row: {
          abbreviation: string | null
          language_code: string
          name_plural: string
          name_singular: string
          unit_id: string
        }
        Insert: {
          abbreviation?: string | null
          language_code: string
          name_plural: string
          name_singular: string
          unit_id: string
        }
        Update: {
          abbreviation?: string | null
          language_code?: string
          name_plural?: string
          name_singular?: string
          unit_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "unit_translations_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "unit_translations_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      units: {
        Row: {
          id: string
        }
        Insert: {
          id?: string
        }
        Update: {
          id?: string
        }
        Relationships: []
      }
      utensil_translations: {
        Row: {
          language_code: string
          name: string
          utensil_id: string
        }
        Insert: {
          language_code: string
          name: string
          utensil_id: string
        }
        Update: {
          language_code?: string
          name?: string
          utensil_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "utensil_translations_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "utensil_translations_utensil_id_fkey"
            columns: ["utensil_id"]
            isOneToOne: false
            referencedRelation: "utensils"
            referencedColumns: ["id"]
          },
        ]
      }
      utensils: {
        Row: {
          id: string
          image_url: string | null
        }
        Insert: {
          id?: string
          image_url?: string | null
        }
        Update: {
          id?: string
          image_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_auth_user_for_profile: {
        Args: {
          user_avatar: string
          user_email: string
          user_id: string
          user_name: string
        }
        Returns: undefined
      }
    }
    Enums: {
      preferred_measurement_unit: "metric" | "imperial"
      preferred_temperature_unit: "celsius" | "fahrenheit"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      preferred_measurement_unit: ["metric", "imperial"],
      preferred_temperature_unit: ["celsius", "fahrenheit"],
    },
  },
} as const
