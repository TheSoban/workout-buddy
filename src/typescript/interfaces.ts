import { TProvider, TRole } from "../store/auth";

export interface ITimeStamps {
  createdAt: string;
  updatedAt: string;
}

export interface IExerciseSearch extends ITimeStamps {
  exercise_id: number;
  name: string;
  description: string;
  version: number;
}

export interface IComment extends ITimeStamps {
  author_id: number;
  author: string;
  comment_id: number;
  content: string;
  exercise_id: number;
}

export interface ICategory extends ITimeStamps {
  author_id: number;
  category_id: number;
  name: string;
}

export interface IEquipment extends ITimeStamps {
  author_id: number;
  equipment_id: number;
  name: string;
}

export interface IMuscle extends ITimeStamps {
  author_id: number;
  muscle_id: number;
  name: string;
}

export interface IImage extends ITimeStamps {
  image_id: number;
  url: string;
  is_main: boolean;
}

export interface IExercise extends IExerciseSearch {
  comments: IComment[];
  categories: ICategory[];
  equipment: IEquipment[];
  muscles: IMuscle[];
  images: IImage[];
}

export interface IUser extends ITimeStamps {
  user_id: number;
  username: string;
  role: TRole;
  disabled: boolean;
  completed: boolean;
  provider: TProvider;
  avatar_url: string | null;
}

export interface IBodyMeasurement extends ITimeStamps {
  measurement_id: number;
  weight: number;
  water_percentage: number;
  body_fat: number;
  visceral_fat: number;
  muscle: number;
  bone_mass: number;
}

export interface IOrderedExercise extends ITimeStamps {
  blueprint_id: number;
  exercise_id: number;
  order: number;
  ordered_exercise_id: number;
  exercise: IExercise;
}

export interface IBlueprint extends ITimeStamps {
  blueprint_id: number;
  name: string;
  description: string;
  color: string;
  ordered_exercises: IOrderedExercise[];
}

export interface ISetLog {
  set_id: number;
  exercise: IExercise;
  exercise_id: number;
  order: number;
  repetitions: number;
  value: number;
  unit: "kg" | "lbs";
}

export interface IWorkoutLog extends ITimeStamps {
  log_id: number;
  name: string;
  date: string;
  set_logs: ISetLog[];
}