import { ExerciseResponse } from './exercise/type/exercise.response';
import { MuscleGroupResponse } from './muscleGroup/type/muscleGroup.response';
import { TrainingResponse } from './training/type/training.response';
import { WorkoutSheetResponse } from './workoutSheet/type/workoutSheet.response';

export type RequestResponse = {
  success: boolean;
  statusCode: number;
  statusText: string;
  data:
    | ExerciseResponse[]
    | MuscleGroupResponse[]
    | TrainingResponse[]
    | WorkoutSheetResponse[];
};
