import { AppDataSource } from './local-db';
import { seedAllData, seedExercises, seedWorkoutTemplates, seedWorkouts } from './seed';

/**
 * Example usage of the seed data functions
 *
 * This file demonstrates how to use the comprehensive seed data
 * that has been created for all models in the SQLite database.
 */

// Example 1: Seed all data at once (recommended for initial setup)
export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('📊 Database initialized');

    await seedAllData();
    console.log('🎉 Database fully seeded with all entities');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  }
};

// Example 2: Seed individual entities (useful for testing or partial updates)
export const seedIndividualEntities = async () => {
  try {
    await AppDataSource.initialize();

    // Seed exercises only
    await seedExercises();

    // Seed workout templates only
    await seedWorkoutTemplates();

    // Seed workouts only (requires templates to exist first)
    await seedWorkouts();

    console.log('✅ Individual entities seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding individual entities:', error);
  }
};

// Example 3: Reset and reseed database
export const resetAndSeedDatabase = async () => {
  try {
    await AppDataSource.initialize();

    // Drop and recreate schema (this will delete all data)
    await AppDataSource.synchronize();
    console.log('🔄 Database schema reset');

    // Seed all data
    await seedAllData();
    console.log('🎉 Database reset and reseeded');
  } catch (error) {
    console.error('❌ Error resetting and seeding database:', error);
  }
};

/**
 * What the seed data includes:
 *
 * 1. **Exercises (32 exercises)**: Various exercise types including:
 *    - Bodyweight exercises (Push-ups, Pull-ups, Squats)
 *    - Barbell exercises (Bench Press, Deadlift, Squat, Row)
 *    - Dumbbell exercises (Chest Press, Bicep Curl, Lateral Raise)
 *    - Cable exercises (Crossover, Lat Pulldown, Face Pull)
 *    - Machine exercises (Leg Press, Chest Press Machine)
 *    - Specialty exercises (Trap Bar Deadlift, EZ Bar Curl)
 *
 * 2. **Workout Templates (6 templates)**:
 *    - Push Day: Chest, shoulders, triceps focus
 *    - Pull Day: Back and biceps focus
 *    - Leg Day: Lower body focus
 *    - Full Body: Complete body workout
 *    - Upper Body: Combined push/pull
 *    - Core Focus: Core strength emphasis
 *
 * 3. **Template Exercises**: Links exercises to templates with proper relationships
 *
 * 4. **Template Sets**: Predefined sets with expected RIR, rest periods, and rep ranges
 *
 * 5. **Workouts (5 workout instances)**: Actual workout sessions based on templates
 *
 * 6. **Workout Exercises**: Links exercises to actual workout sessions
 *
 * 7. **Workout Sets**: Actual performed sets with real data (reps, load, RIR, notes)
 *
 * All relationships are properly maintained following the SQLite constraints
 * and TypeORM entity relationships defined in the models.
 */
