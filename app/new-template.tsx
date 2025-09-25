import { StyleSheet } from 'react-native';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { RIR } from '@/models/enums';
import {
  addSet,
  createWorkoutTemplate,
  duplicateSet,
  removeExercise,
  removeSet,
  setEditedExercise,
  updateRIRValue,
  updateRepRangeValue,
  updateTemplateField,
} from '@/store/workoutTemplateSlice';

import TemplateBaseScreen from './components/new-workout/base-screen';

export default function NewWorkout() {
  const dispatch = useAppDispatch();
  const templateState = useAppSelector(state => state.workoutTemplateSlice.template);
  return (
    <TemplateBaseScreen
      title="New Template"
      template={templateState}
      onNameChange={text => dispatch(updateTemplateField({ field: 'name', value: text }))}
      onDescriptionChange={text =>
        dispatch(updateTemplateField({ field: 'description', value: text }))
      }
      onAddSet={(exerciseId: number) => dispatch(addSet({ exerciseId }))}
      onRemoveSet={(exerciseId: number, setNumber: number) =>
        dispatch(removeSet({ exerciseId, setNumber }))
      }
      onSave={() => dispatch(createWorkoutTemplate(templateState))}
      onDuplicateSet={(exerciseId: number, setIndex: number) =>
        dispatch(duplicateSet({ exerciseId, setIndex }))
      }
      onLowerRepRangeChange={(exerciseId: number, setIndex: number, value: number) =>
        dispatch(updateRepRangeValue({ exerciseId, setIndex, which: 'lower', value }))
      }
      onUpperRepRangeChange={(exerciseId: number, setIndex: number, value: number) =>
        dispatch(updateRepRangeValue({ exerciseId, setIndex, which: 'upper', value }))
      }
      onSelectRIR={(exerciseId: number, setNumber: number) => {
        dispatch(setEditedExercise({ setId: setNumber, exerciseId: exerciseId }));
      }}
      onDelete={(exerciseId: number) => dispatch(removeExercise({ exerciseId }))}
      onUpdateRIR={(RIR: RIR) => dispatch(updateRIRValue({ value: RIR }))}
    />
  );
}
