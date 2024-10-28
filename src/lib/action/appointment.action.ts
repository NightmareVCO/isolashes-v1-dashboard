"use server";

import {
  fetchDeleteRequest,
  fetchPatchRequest,
  fetchPostRequest,
} from "@utils/fetchRequest";
import { auth, uploadFile } from "@utils/googleDrive";
import { revalidatePath } from "next/cache";

const ENDPOINT = "appointments";

export const deleteAppointment = async (previousState: any, formData: any) => {
  const { id, appointmentId } = Object.fromEntries(formData);
  const url = `${process.env.SERVER}/${ENDPOINT}/${appointmentId}`;
  const headers = { "user-id": id };

  try {
    const response = await fetchDeleteRequest({ url, headers });
    console.log(response);
    revalidatePath("/dashboard/citas");
  } catch (error) {
    throw new Error(`Error eliminando una cita: ${error}`);
  }
};

export const uploadAppointmentImage = async (
  previousState: any,
  formData: any,
) => {
  const { id, appointmentId, appointmentImage } = Object.fromEntries(formData);

  const client = await auth();
  const imageUrl = await uploadFile(client, appointmentImage);
  console.log(imageUrl);

  const data = {
    image: imageUrl,
  };

  const url = `${process.env.SERVER}/${ENDPOINT}/${appointmentId}`;
  const headers = { "user-id": id };

  try {
    await fetchPatchRequest({ url, headers, data });
    revalidatePath("/dashboard/citas");
  } catch (error) {
    throw new Error(`Error subiendo una imagen de una cita: ${error}`);
  }
};

export const processAppointment = async (previousState: any, formData: any) => {
  const {
    id,
    appointmentId,
    userId,
    contactLensesValue,
    sensitiveEyesValue,
    dryEyesValue,
    hormonalImbalanceValue,
    seasonalAllergiesValue,
    vitaminDeficienciesValue,
    tricholomaniaValue,
    other,
    eyeShapeValue,
    eyeSizeValue,
    lashCurveValue,
    lashLengthValue,
    lashThicknessValue,
    brows,
    extensionDesign,
    extensionLength,
    extensionCurl,
    extensionThickness,
    extensionGlue,
    liftingPad,
    liftingStep1,
    liftingStep2,
    liftingBotox,
    liftingTint,
    liftingNote,
    browTechnique,
    browStep1,
    browStep2,
    browHennaColor,
    browTime,
    browNote,
  } = Object.fromEntries(formData);

  const medicalInfo = [
    contactLensesValue === "true" ? "contactLenses" : undefined,
    sensitiveEyesValue === "true" ? "sensitiveEyes" : undefined,
    dryEyesValue === "true" ? "dryEyes" : undefined,
    hormonalImbalanceValue === "true" ? "hormonalImbalance" : undefined,
    seasonalAllergiesValue === "true" ? "seasonalAllergies" : undefined,
    vitaminDeficienciesValue === "true" ? "vitaminDeficiencies" : undefined,
    tricholomaniaValue === "true" ? "tricholomania" : undefined,
    other ? "other" : undefined,
  ].filter(Boolean);

  const eyesConditions: {
    name: string;
    description: string;
    customer?: string;
  }[] = [
    { name: "Forma de ojo", description: eyeShapeValue, customer: userId },
    { name: "Tamaño de ojo", description: eyeSizeValue, customer: userId },
    {
      name: "Curvatura de pestaña",
      description: lashCurveValue,
      customer: userId,
    },
    {
      name: "Longitud de pestaña",
      description: lashLengthValue,
      customer: userId,
    },
    {
      name: "Grosor de pestaña",
      description: lashThicknessValue,
      customer: userId,
    },
    { name: "Cejas", description: brows, customer: userId },
  ];
  const extensions = [
    extensionDesign ? `Diseño: ${extensionDesign}` : undefined,
    extensionLength ? `Longitud: ${extensionLength}` : undefined,
    extensionCurl ? `Curvatura: ${extensionCurl}` : undefined,
    extensionThickness ? `Grosor: ${extensionThickness}` : undefined,
    extensionGlue ? `Pegamento: ${extensionGlue}` : undefined,
  ].filter(Boolean);

  const lifting = [
    liftingPad ? `Almohadilla: ${liftingPad}` : undefined,
    liftingStep1 ? `Paso 1: ${liftingStep1}` : undefined,
    liftingStep2 ? `Paso 2: ${liftingStep2}` : undefined,
    liftingBotox ? `Botox: ${liftingBotox}` : undefined,
    liftingTint ? `Tinte: ${liftingTint}` : undefined,
    liftingNote ? `Nota: ${liftingNote}` : undefined,
  ].filter(Boolean);

  const eyebrows = [
    browTechnique ? `Técnica: ${browTechnique}` : undefined,
    browStep1 ? `Paso 1: ${browStep1}` : undefined,
    browStep2 ? `Paso 2: ${browStep2}` : undefined,
    browHennaColor ? `Color de Henna: ${browHennaColor}` : undefined,
    browTime ? `Tiempo: ${browTime}` : undefined,
    browNote ? `Nota: ${browNote}` : undefined,
  ].filter(Boolean);

  const appointmentData = {
    extensions,
    lifting,
    eyebrows,
    completed: true,
  };

  const userData = {
    medicalInfo,
  };

  const appointmentUrl = `${process.env.SERVER}/${ENDPOINT}/${appointmentId}`;
  const userUrl = `${process.env.SERVER}/auth/user/${userId}`;
  const eyeConditionsUrl = `${process.env.SERVER}/eye-condition`;

  const headers = { "user-id": id };

  try {
    const appointmentUpdateResponse = await fetchPatchRequest({
      url: appointmentUrl,
      headers,
      data: appointmentData,
    });
    console.log(appointmentUpdateResponse);

    const userUpdateResponse = await fetchPatchRequest({
      url: userUrl,
      headers,
      data: userData,
    });
    console.log(userUpdateResponse);

    const eyeConditionResponse = await fetchPostRequest({
      url: eyeConditionsUrl,
      headers,
      data: eyesConditions,
    });
    console.log(eyeConditionResponse);

    revalidatePath("/dashboard/citas");
  } catch (error) {
    throw new Error(`Error procesando una cita: ${error}`);
  }
};
