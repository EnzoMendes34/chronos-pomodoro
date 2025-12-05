import { DefaultInput } from "../DefaultInput";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleTyple } from "../../utils/getNextCycleType";
import { TaskActionsTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../Tips";
import { toastifyAdapter } from "../../adapters/toastifyAdapter";

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || "";

  //cycles
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleTyple(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toastifyAdapter.dismiss();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      toastifyAdapter.warn("Digite o nome da tarefa");

      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      durationInMinutes: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: TaskActionsTypes.START_TASK, payload: newTask });

    toastifyAdapter.success("Tarefa iniciada");
  }

  function handleInterruptTask(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault(); //fixes the strange bug
    toastifyAdapter.dismiss();
    toastifyAdapter.error("Tarefa interrompida!");
    dispatch({ type: TaskActionsTypes.INTERRUPT_TASK });
  }

  return (
    <>
      <form onSubmit={handleCreateNewTask} className='form' action=''>
        <div className='formRow'>
          <DefaultInput
            labelText='Task:'
            id='input'
            type='text'
            placeholder='Digite algo'
            ref={taskNameInput}
            disabled={!!state.activeTask}
            defaultValue={lastTaskName}
          ></DefaultInput>
        </div>

        <div className='formRow'>
          <Tips />
        </div>

        {state.currentCycle > 0 && (
          <div className='formRow'>
            <Cycles />
          </div>
        )}
        <div className='formRow'>
          {!state.activeTask ? (
            <DefaultButton
              aria-label='Iniciar nova Tarefa'
              title='Iniciar nova Tarefa'
              type='submit'
              icon={<PlayCircleIcon />}
            />
          ) : (
            <DefaultButton
              aria-label='Interromper tarefa atual'
              color='red'
              title='Interromper tarefa atual'
              type='button'
              onClick={handleInterruptTask}
              icon={<StopCircleIcon />}
            />
          )}
        </div>
      </form>
    </>
  );
}
