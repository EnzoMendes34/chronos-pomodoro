import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import styles from "./styles.module.css";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, type SortTasksOptions } from "../../utils/sortTasks";
import { useEffect, useState } from "react";
import { toastifyAdapter } from "../../adapters/toastifyAdapter";
import { TaskActionsTypes } from "../../contexts/TaskContext/taskActions";

export function History() {
  const { state, dispatch } = useTaskContext();
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const hasTasks = state.tasks.length > 0;

  const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: "startDate",
        direction: "desc",
      };
    },
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSortTasksOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  useEffect(() => {
    if (!confirmClearHistory) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConfirmClearHistory(false);

    dispatch({ type: TaskActionsTypes.RESET_STATE });
  }, [confirmClearHistory, dispatch]);

  useEffect(() => {
    return () => {
      toastifyAdapter.dismiss();
    };
  }, []);

  function handleSortTasks({ field }: Pick<SortTasksOptions, "field">) {
    const newDirection = sortTasksOptions.direction === "desc" ? "asc" : "desc";

    setSortTasksOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  function handleResetHistory(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    toastifyAdapter.dismiss();
    toastifyAdapter.confirm(
      "Tem certeza que deseja apagar todo o histórico?",
      confirmation => {
        setConfirmClearHistory(confirmation);
      },
    );
  }

  return (
    <>
      <MainTemplate>
        <Container>
          <Heading>
            <span>History</span>
            {hasTasks && (
              <span className={styles.buttonContainer}>
                <DefaultButton
                  icon={<TrashIcon />}
                  color='red'
                  aria-label='Apagar todo o histórico'
                  title='Apagar histórico'
                  onClick={handleResetHistory}
                />
              </span>
            )}
          </Heading>
        </Container>

        <Container>
          {hasTasks && (
            <div className={styles.responsiveTable}>
              <table>
                <thead>
                  <tr>
                    <th
                      onClick={() => handleSortTasks({ field: "name" })}
                      className={styles.thSort}
                    >
                      Tarefa ↕
                    </th>
                    <th
                      onClick={() =>
                        handleSortTasks({ field: "durationInMinutes" })
                      }
                      className={styles.thSort}
                    >
                      Duração ↕
                    </th>
                    <th
                      onClick={() => handleSortTasks({ field: "startDate" })}
                      className={styles.thSort}
                    >
                      Data ↕
                    </th>
                    <th>Status</th>
                    <th>Tipo</th>
                  </tr>
                </thead>

                <tbody>
                  {sortTasksOptions.tasks.map(task => {
                    const taskTypeDictionary = {
                      workTime: "Foco",
                      shortBreakTime: "Descanso Curto",
                      longBreakTime: "Descanso Longo",
                    };

                    return (
                      <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.durationInMinutes} min</td>
                        <td>{formatDate(task.startDate)}</td>
                        <td>{getTaskStatus(task, state.activeTask)}</td>
                        <td>{taskTypeDictionary[task.type]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {!hasTasks && (
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              Ainda não existem tarefas criadas.
            </p>
          )}
        </Container>
      </MainTemplate>
    </>
  );
}
