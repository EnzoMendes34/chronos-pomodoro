import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleTyple } from "../../utils/getNextCycleType";
import styles from "./styles.module.css";

export function Cycles() {
  const { state } = useTaskContext();

  const cycleSteps = Array.from({ length: state.currentCycle });

  const cycleDescriptionMap = {
    workTime: "foco",
    shortBreakTime: "descanso curto",
    longBreakTime: "descanso longo",
  };

  return (
    <>
      <div className={styles.cycles}>
        <span>Ciclos: </span>

        <div className={styles.cycleDots}>
          {cycleSteps.map((_, index) => {
            const nextCycle = getNextCycle(index);
            const nextCycleType = getNextCycleTyple(nextCycle);
            return (
              <span
                key={nextCycle}
                className={`${styles.cycleDot} ${styles[nextCycleType]}`}
                aria-label={`Indicador de ${cycleDescriptionMap[nextCycleType]}`}
                title={`Indicador de ${cycleDescriptionMap[nextCycleType]} ${nextCycle}}`}
              ></span>
            );
          })}
        </div>
      </div>
    </>
  );
}
