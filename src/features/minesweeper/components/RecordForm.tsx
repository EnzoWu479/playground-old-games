import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect, useRef, useState } from "react";
import { recordScore } from "../actions/record-score";
import { useFormState, useFormStatus } from "react-dom";
import { GameConfig } from "../types/Game";

interface Props {
  time: number;
  config: GameConfig;
}

export const RecordForm = ({ config, time }: Props) => {
  const refForm = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState(false);
  const { pending } = useFormStatus();
  const [state, dispatch] = useFormState(recordScore, {
    success: false,
  });

  useEffect(() => {
    setSuccess(false);
  }, [config, time]);

  useEffect(() => {
    if (state.success) {
      setSuccess(true);
      refForm.current?.reset();
    }
  }, [state.success]);
  return (
    <div>
      <h2 className="text-xl">Registre-se no scoreboard</h2>
      {success ? (
        <span>Registrado com sucesso!</span>
      ) : (
        <form
          ref={refForm}
          action={async (formData) => {
            dispatch(formData);
          }}
        >
          <div className="flex items-end gap-2">
            <div className="w-full">
              <Label htmlFor="name">Nome de jogador</Label>
              <Input id="name" name="name" />

              <input type="hidden" name="time" value={time} />
              <input type="hidden" name="rows" value={config.rows} readOnly />
              <input
                type="hidden"
                name="columns"
                value={config.columns}
                readOnly
              />
              <input type="hidden" name="mines" value={config.mines} readOnly />
            </div>
            <Button type="submit" aria-disabled={pending}>
              Salvar
            </Button>
          </div>
          {state.error && (
            <span className="text-red-500 text-sm">{state.error}</span>
          )}
        </form>
      )}
    </div>
  );
};
