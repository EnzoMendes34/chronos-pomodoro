import { DefaultInput } from "../DefaultInput";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { PlayCircleIcon } from "lucide-react";

export function MainForm() {
  return (
    <>
      <form className='form'>
        <div className='formRow'>
          <DefaultInput
            labelText='Task:'
            id='input'
            type='text'
            placeholder='Digite algo'
          ></DefaultInput>
        </div>

        <div className='formRow'>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>

        <div className='formRow'>
          <Cycles />
        </div>

        <div className='formRow'>
          <DefaultButton icon={<PlayCircleIcon />} />
        </div>
      </form>
    </>
  );
}
