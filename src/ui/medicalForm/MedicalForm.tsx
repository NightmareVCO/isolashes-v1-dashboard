"use client";

import { processAppointment } from "@action/appointment.action";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Input,
  Spacer,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormState } from "react-dom";

export function useMedicalForm({ appointment }: { appointment: any }) {
  const [formData, setFormData] = useState({
    contactLenses: appointment.customer.medicalInfo?.includes("contactLenses")
      ? "true"
      : "false",
    sensitiveEyes: appointment.customer.medicalInfo?.includes("sensitiveEyes")
      ? "true"
      : "false",
    dryEyes: appointment.customer.medicalInfo?.includes("dryEyes")
      ? "true"
      : "false",
    hormonalImbalance: appointment.customer.medicalInfo?.includes(
      "hormonalImbalance",
    )
      ? "true"
      : "false",
    seasonalAllergies: appointment.customer.medicalInfo?.includes(
      "seasonalAllergies",
    )
      ? "true"
      : "false",
    vitaminDeficiencies: appointment.customer.medicalInfo?.includes(
      "vitaminDeficiencies",
    )
      ? "true"
      : "false",
    tricholomania: appointment.customer.medicalInfo?.includes("tricholomania")
      ? "true"
      : "false",
    other: appointment.customer.medicalInfo?.at(-1) || "",
  });

  type EyeConditions = {
    name: string;
    description: string;
  };
  const [selectedValues, setSelectedValues] = useState({
    eyeShape:
      appointment.customer.eyesConditions?.find(
        (predicate: EyeConditions) => predicate.name === "Forma de ojo",
      )?.description ?? "",
    eyeSize:
      appointment.customer.eyesConditions?.find(
        (predicate: EyeConditions) => predicate.name === "Tamaño de ojo",
      )?.description ?? "",
    lashCurve:
      appointment.customer.eyesConditions?.find(
        (predicate: EyeConditions) => predicate.name === "Curvatura de pestaña",
      )?.description ?? "",
    lashLength:
      appointment.customer.eyesConditions?.find(
        (predicate: EyeConditions) => predicate.name === "Longitud de pestaña",
      )?.description ?? "",
    lashThickness:
      appointment.customer.eyesConditions?.find(
        (predicate: EyeConditions) => predicate.name === "Grosor de pestaña",
      )?.description ?? "",
    brows:
      appointment.customer.eyesConditions?.find(
        (predicate: EyeConditions) => predicate.name === "Cejas",
      )?.description ?? "",
  });

  console.log(selectedValues);

  const [extensionsForm, setExtensionsForm] = useState({
    extensionDesign:
      appointment.extensions
        ?.find((value: string) => value.includes("Diseño"))
        ?.split(": ")[1] || "",
    extensionLength:
      appointment.extensions
        ?.find((value: string) => value.includes("Longitud"))
        ?.split(": ")[1] || "",
    extensionCurl:
      appointment.extensions
        ?.find((value: string) => value.includes("Curvatura"))
        ?.split(": ")[1] || "",
    extensionThickness:
      appointment.extensions
        ?.find((value: string) => value.includes("Grosor"))
        ?.split(": ")[1] || "",
    extensionGlue:
      appointment.extensions
        ?.find((value: string) => value.includes("Pegamento"))
        ?.split(": ")[1] || "",
  });

  const [liftingForm, setLiftingForm] = useState({
    liftingPad:
      appointment.lifting
        ?.find((value: string) => value.includes("Almohadilla"))
        ?.split(": ")[1] || "",
    liftingStep1:
      appointment.lifting
        ?.find((value: string) => value.includes("Paso 1"))
        ?.split(": ")[1] || "",
    liftingStep2:
      appointment.lifting
        ?.find((value: string) => value.includes("Paso 2"))
        ?.split(": ")[1] || "",
    liftingBotox:
      appointment.lifting
        ?.find((value: string) => value.includes("Botox"))
        ?.split(": ")[1] || "",
    liftingTint:
      appointment.lifting
        ?.find((value: string) => value.includes("Tinte"))
        ?.split(": ")[1] || "",
    liftingNote:
      appointment.lifting
        ?.find((value: string) => value.includes("Nota"))
        ?.split(": ")[1] || "",
  });

  const [browForm, setBrowForm] = useState({
    browTechnique:
      appointment.eyebrows
        ?.find((value: string) => value.includes("Técnica"))
        ?.split(": ")[1] || "",
    browStep1:
      appointment.eyebrows
        ?.find((value: string) => value.includes("Paso 1"))
        ?.split(": ")[1] || "",
    browStep2:
      appointment.eyebrows
        ?.find((value: string) => value.includes("Paso 2"))
        ?.split(": ")[1] || "",
    browHennaColor:
      appointment.eyebrows
        ?.find((value: string) => value.includes("Color de Henna"))
        ?.split(": ")[1] || "",
    browTime:
      appointment.eyebrows
        ?.find((value: string) => value.includes("Tiempo"))
        ?.split(": ")[1] || "",
    browNote:
      appointment.eyebrows
        ?.find((value: string) => value.includes("Nota"))
        ?.split(": ")[1] || "",
  });

  const [state, formAction] = useFormState(processAppointment, undefined);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const handleChange = (event: any) => {
    const { name, type, checked } = event.target;
    console.log(name, type, checked);
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? String(checked) : event.target.value,
    });
  };

  const handleCheckboxChange = (group: string, value: string[]) => {
    setSelectedValues({
      ...selectedValues,
      [group]: value[1] || "",
    });
  };

  return {
    formData,
    handleChange,
    selectedValues,
    handleCheckboxChange,
    state,
    formAction,
    extensionsForm,
    setExtensionsForm,
    liftingForm,
    setLiftingForm,
    browForm,
    setBrowForm,
    loading,
    setLoading,
    push,
  };
}

export type MedicalFormProperties = {
  appointment: any;
  user: any;
};

export default function MedicalForm({
  appointment,
  user,
}: MedicalFormProperties) {
  const {
    formData,
    handleChange,
    selectedValues,
    handleCheckboxChange,
    formAction,
    extensionsForm,
    liftingForm,
    browForm,
    loading,
    setLoading,
    push,
  } = useMedicalForm({ appointment });

  return (
    <form
      action={(formData) => {
        setLoading(true);
        setTimeout(() => {
          formAction(formData);
        }, 1000);
        setTimeout(() => {
          push("/dashboard/atender");
        }, 3000);
      }}
      className="grid grid-cols-1 gap-4"
    >
      <input
        name="appointmentId"
        value={appointment.id}
        className="sr-only"
        readOnly
      />
      <input name="id" value={user?.id} className="sr-only" readOnly />
      <input
        name="userId"
        value={appointment?.customer.id}
        className="sr-only"
        readOnly
      />

      <div>
        <h2 className="w-full text-lg text-start text-primary">
          Datos Medicos
        </h2>
        <Divider />
      </div>

      <Checkbox
        name="contactLenses"
        size="lg"
        defaultSelected={formData.contactLenses === "true"}
        onChange={handleChange}
        className="text-white"
      >
        Uso de Lentes de Contacto
      </Checkbox>
      <input
        name="contactLensesValue"
        value={formData.contactLenses}
        className="sr-only"
        readOnly
      />

      <Checkbox
        name="sensitiveEyes"
        size="lg"
        defaultSelected={formData.sensitiveEyes === "true"}
        onChange={handleChange}
        className="text-white"
      >
        Ojos Sensibles
      </Checkbox>
      <input
        name="sensitiveEyesValue"
        value={formData.sensitiveEyes}
        className="sr-only"
        readOnly
      />

      <Checkbox
        name="dryEyes"
        size="lg"
        defaultSelected={formData.dryEyes === "true"}
        onChange={handleChange}
        className="text-white"
      >
        Ojos Secos
      </Checkbox>
      <input
        name="dryEyesValue"
        value={formData.dryEyes}
        className="sr-only"
        readOnly
      />

      <Checkbox
        name="hormonalImbalance"
        size="lg"
        defaultSelected={formData.hormonalImbalance === "true"}
        onChange={handleChange}
        className="text-white"
      >
        {`Desbalance Hormonal (Hiper o Hipotiroidismo)`}
      </Checkbox>
      <input
        name="hormonalImbalanceValue"
        value={formData.hormonalImbalance}
        className="sr-only"
        readOnly
      />

      <Checkbox
        name="seasonalAllergies"
        size="lg"
        defaultSelected={formData.seasonalAllergies === "true"}
        onChange={handleChange}
        className="text-white"
      >
        Alergias Estacionales
      </Checkbox>
      <input
        name="seasonalAllergiesValue"
        value={formData.seasonalAllergies}
        className="sr-only"
        readOnly
      />

      <Checkbox
        name="vitaminDeficiencies"
        size="lg"
        defaultSelected={formData.vitaminDeficiencies === "true"}
        onChange={handleChange}
        className="text-white"
      >
        {` Deficiencias vitamínicas o minerales que puedan contribuir a la pérdida
        de cabello o pestañas: A, F, B, Selenio, Zinc, Hierro.`}
      </Checkbox>
      <input
        name="vitaminDeficienciesValue"
        value={formData.vitaminDeficiencies}
        className="sr-only"
        readOnly
      />

      <Checkbox
        name="tricholomania"
        size="lg"
        defaultSelected={formData.tricholomania === "true"}
        onChange={handleChange}
        className="text-white"
      >
        {`Tricholomania (desorden de caída del cabello)`}
      </Checkbox>
      <input
        name="tricholomaniaValue"
        value={formData.tricholomania}
        className="sr-only"
        readOnly
      />

      <Input
        variant="bordered"
        name="other"
        label="Otro:"
        placeholder="Especifica cualquier otra condición"
        size="lg"
        defaultValue={formData.other}
      />

      <div>
        <Spacer y={4} />
        <h2 className="w-full text-lg text-start text-primary">
          Salud Del Ojo
        </h2>
        <Divider />
      </div>

      <CheckboxGroup
        label="Forma del Ojo:"
        orientation="horizontal"
        value={[selectedValues.eyeShape]}
        onValueChange={(value) => handleCheckboxChange("eyeShape", value)}
        size="lg"
        isRequired
      >
        <Checkbox
          classNames={{
            base: "min-w-[200px]",
          }}
          value="almendrado"
          className="text-white"
        >
          Almendrado
        </Checkbox>
        <Checkbox
          classNames={{
            base: "min-w-[200px]",
          }}
          value="redondo"
          className="text-white"
        >
          Redondo
        </Checkbox>
        <Checkbox
          classNames={{
            base: "min-w-[200px]",
          }}
          value="asiatico"
          className="text-white"
        >
          Asiático
        </Checkbox>
        <Checkbox
          classNames={{
            base: "min-w-[200px]",
          }}
          value="caido"
          className="text-white"
        >
          Caído
        </Checkbox>
      </CheckboxGroup>
      <input
        name="eyeShapeValue"
        value={selectedValues.eyeShape}
        className="sr-only"
        readOnly
      />

      <CheckboxGroup
        label="Tamaño del Ojo:"
        orientation="horizontal"
        value={[selectedValues.eyeSize]}
        onValueChange={(value) => handleCheckboxChange("eyeSize", value)}
        size="lg"
        isRequired
      >
        <Checkbox
          classNames={{
            base: "min-w-[200px]",
          }}
          value="pequeño"
          className="text-white"
        >
          Pequeño
        </Checkbox>
        <Checkbox
          classNames={{
            base: "min-w-[200px]",
          }}
          value="normal"
          className="text-white"
        >
          Normal
        </Checkbox>
        <Checkbox
          classNames={{
            base: "min-w-[200px]",
          }}
          value="grande"
          className="text-white"
        >
          Grande
        </Checkbox>
      </CheckboxGroup>
      <input
        name="eyeSizeValue"
        value={selectedValues.eyeSize}
        className="sr-only"
        readOnly
      />

      <CheckboxGroup
        label="Curva de las Pestañas:"
        orientation="horizontal"
        value={[selectedValues.lashCurve]}
        onValueChange={(value) => handleCheckboxChange("lashCurve", value)}
        size="lg"
        isRequired
      >
        <Checkbox
          classNames={{
            base: "min-w-[200px]",
          }}
          value="curvas"
          className="text-white"
        >
          Curvas
        </Checkbox>
        <Checkbox
          classNames={{
            base: "min-w-[200px]",
          }}
          value="normal"
          className="text-white"
        >
          Normal
        </Checkbox>
        <Checkbox
          classNames={{
            base: "min-w-[200px]",
          }}
          value="hacia-abajo"
          className="text-white"
        >
          Hacia abajo
        </Checkbox>
      </CheckboxGroup>
      <input
        name="lashCurveValue"
        value={selectedValues.lashCurve}
        className="sr-only"
        readOnly
      />

      <CheckboxGroup
        label="Largo de las Pestañas:"
        orientation="horizontal"
        value={[selectedValues.lashLength]}
        onValueChange={(value) => handleCheckboxChange("lashLength", value)}
        size="lg"
        isRequired
      >
        <Checkbox
          classNames={{
            base: "min-w-[200px]",
          }}
          value="cortas"
          className="text-white"
        >
          Cortas
        </Checkbox>
        <Checkbox
          classNames={{
            base: "min-w-[200px]",
          }}
          value="medio"
          className="text-white"
        >
          Medio
        </Checkbox>
        <Checkbox
          classNames={{
            base: "min-w-[200px]",
          }}
          value="largas"
          className="text-white"
        >
          Largas
        </Checkbox>
      </CheckboxGroup>
      <input
        name="lashLengthValue"
        value={selectedValues.lashLength}
        className="sr-only"
        readOnly
      />

      <CheckboxGroup
        label="Grosor de las Pestañas:"
        orientation="horizontal"
        value={[selectedValues.lashThickness]}
        onValueChange={(value) => handleCheckboxChange("lashThickness", value)}
        size="lg"
        isRequired
      >
        <Checkbox
          classNames={{
            base: "min-w-[200px]",
          }}
          value="finas"
          className="text-white"
        >
          Finas
        </Checkbox>
        <Checkbox
          classNames={{
            base: "min-w-[200px]",
          }}
          value="medio"
          className="text-white"
        >
          Medio
        </Checkbox>
        <Checkbox
          classNames={{
            base: "min-w-[200px]",
          }}
          value="gruesas"
          className="text-white"
        >
          Gruesas
        </Checkbox>
      </CheckboxGroup>
      <input
        name="lashThicknessValue"
        value={selectedValues.lashThickness}
        className="sr-only"
        readOnly
      />

      <Input
        variant="bordered"
        label="Cejas:"
        placeholder="Escribe aquí..."
        name="brows"
        size="lg"
        fullWidth
        defaultValue={selectedValues.brows}
      />

      <div>
        <Spacer y={4} />
        <h2 className="w-full text-lg text-start text-primary">{"Diseño"}</h2>
        <Divider />
      </div>

      <div>
        <Spacer y={2} />
        <h2 className="w-full text-lg text-start text-secondary">
          {"Extensiones"}
        </h2>
        <Divider />
      </div>

      <Input
        variant="bordered"
        name="extensionDesign"
        label="Diseño:"
        size="lg"
        fullWidth
        defaultValue={extensionsForm.extensionDesign}
      />
      <Input
        variant="bordered"
        name="extensionLength"
        label="Largos:"
        size="lg"
        fullWidth
        defaultValue={extensionsForm.extensionLength}
      />
      <Input
        variant="bordered"
        name="extensionCurl"
        label="Curvatura:"
        size="lg"
        fullWidth
        defaultValue={extensionsForm.extensionCurl}
      />
      <Input
        variant="bordered"
        name="extensionThickness"
        label="Grosor:"
        size="lg"
        fullWidth
        defaultValue={extensionsForm.extensionThickness}
      />
      <Input
        variant="bordered"
        name="extensionGlue"
        label="Adhesivo:"
        size="lg"
        fullWidth
        defaultValue={extensionsForm.extensionGlue}
      />

      <div>
        <Spacer y={2} />
        <h2 className="w-full text-lg text-start text-secondary">Lifting</h2>
        <Divider />
      </div>
      <Input
        variant="bordered"
        name="liftingPad"
        label="Almohadilla:"
        size="lg"
        fullWidth
        defaultValue={liftingForm.liftingPad}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          variant="bordered"
          name="liftingStep1"
          label="Paso 1:"
          size="lg"
          fullWidth
          defaultValue={liftingForm.liftingStep1}
        />
        <Input
          variant="bordered"
          name="liftingStep2"
          label="Paso 2:"
          size="lg"
          fullWidth
          defaultValue={liftingForm.liftingStep2}
        />
      </div>
      <Input
        variant="bordered"
        name="liftingBotox"
        label="Botox:"
        size="lg"
        fullWidth
        defaultValue={liftingForm.liftingBotox}
      />
      <Input
        variant="bordered"
        name="liftingTint"
        label="Tinte:"
        size="lg"
        fullWidth
        defaultValue={liftingForm.liftingTint}
      />
      <Textarea
        variant="bordered"
        name="liftingNote"
        label="Nota:"
        size="lg"
        fullWidth
        rows={3}
        defaultValue={liftingForm.liftingNote}
      />

      {/* Cejas */}
      <div>
        <Spacer y={2} />
        <h2 className="w-full text-lg text-start text-secondary">Cejas</h2>
        <Divider />
      </div>
      <Input
        variant="bordered"
        name="browTechnique"
        label="Técnica de Depilación:"
        size="lg"
        fullWidth
        defaultValue={browForm.browTechnique}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          variant="bordered"
          name="browStep1"
          label="Paso 1:"
          size="lg"
          fullWidth
          defaultValue={browForm.browStep1}
        />
        <Input
          variant="bordered"
          name="browStep2"
          label="Paso 2:"
          size="lg"
          fullWidth
          defaultValue={browForm.browStep2}
        />
      </div>
      <Input
        variant="bordered"
        name="browHennaColor"
        label="Color Henna:"
        size="lg"
        fullWidth
        defaultValue={browForm.browHennaColor}
      />
      <Input
        variant="bordered"
        name="browTime"
        label="Tiempo:"
        size="lg"
        fullWidth
        defaultValue={browForm.browTime}
      />
      <Textarea
        variant="bordered"
        name="browNote"
        label="Nota:"
        size="lg"
        fullWidth
        rows={3}
        defaultValue={browForm.browNote}
      />

      <Button
        color="primary"
        className="text-white"
        isLoading={loading}
        type="submit"
      >
        Enviar
      </Button>
    </form>
  );
}
