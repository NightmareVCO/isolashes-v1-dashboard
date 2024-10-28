"use server";

import { fetchPatchRequest, fetchPostRequest } from "@utils/fetchRequest";
import { revalidatePath } from "next/cache";

export const processOrder = async (previousState: any, formData: any) => {
  const {
    id,
    employeeName,
    user,
    userName,
    userPhone,
    userEmail,
    products,
    total,
    branchId,
    paymentMethod,
  } = Object.fromEntries(formData);
  const userObject = JSON.parse(user);

  const orderData = {
    user: userObject.id,
    userName: userName ?? userObject.name + " " + userObject.lastName,
    userPhone: userPhone ?? userObject.phone,
    userEmail: userEmail ?? userObject.email,
    products,
    total: +total,
    delivered: true,
    completed: true,
    dateOrdered: new Date().toISOString(),
    dateDelivered: new Date().toISOString(),
    dateCompleted: new Date().toISOString(),
    inPlace: true,
  };

  const receiptData = {
    userId: userObject.id,
    userName: userName ?? userObject.name + " " + userObject.lastName,
    userPhone: userPhone ?? userObject.phone,
    userEmail: userEmail ?? userObject.email,
    employeeName,
    total: +total,
    paymentMethod,
    branchId,
    inPlace: true,
    date: new Date().toISOString(),
  };

  const orderUrl = `${process.env.SERVER}/orders`;
  const receiptUrl = `${process.env.SERVER}/receipt`;
  const joinOrderReceiptUrl = `${process.env.SERVER}/orders/receipt`;
  const headers = { "user-id": id };

  try {
    const order = await fetchPostRequest({
      url: orderUrl,
      data: orderData,
      headers,
    });

    const receipt = await fetchPostRequest({
      url: receiptUrl,
      data: receiptData,
      headers,
    });

    await fetchPatchRequest({
      url: joinOrderReceiptUrl,
      data: {
        orderId: order.data.id,
        receiptId: receipt.data.id,
      },
      headers,
    });

    revalidatePath("/dashboard/vender");
    revalidatePath("/dashboard/productos");
    revalidatePath("/dashboard/ordenes");
    revalidatePath("/dashboard/recibos");
  } catch (error) {
    throw new Error(`Error creando una orden: ${error}`);
  }
};

export const processAppointment = async (previousState: any, formData: any) => {
  const {
    id,
    employeeName,
    user,
    userName,
    userPhone,
    userEmail,
    services,
    total,
    branchId,
    paymentMethod,
    appointmentId,
  } = Object.fromEntries(formData);
  const userObject = JSON.parse(user);

  const receiptData = {
    user: userObject.id,
    userName: userName ?? userObject.name + " " + userObject.lastName,
    userPhone: userPhone ?? userObject.phone,
    userEmail: userEmail ?? userObject.email,
    services,
    employeeName,
    total: +total,
    paymentMethod,
    branch: branchId,
    inPlace: true,
    appointment: appointmentId,
    date: new Date().toISOString(),
  };

  const receiptUrl = `${process.env.SERVER}/receipt`;
  const appointmentUrl = `${process.env.SERVER}/appointments/${appointmentId}`;
  const headers = { "user-id": id };

  try {
    await fetchPostRequest({
      url: receiptUrl,
      data: receiptData,
      headers,
    });
    await fetchPatchRequest({
      url: appointmentUrl,
      data: {
        paid: true,
      },
      headers,
    });

    revalidatePath("/dashboard/citas");
    revalidatePath("/dashboard/atender");
  } catch (error) {
    throw new Error(`Error creando una orden: ${error}`);
  }
};

export const sendOrder = async (previousState: any, formData: any) => {
  const { id, orderId } = Object.fromEntries(formData);

  const data = {
    delivered: true,
  };
  const url = `${process.env.SERVER}/orders/${orderId}`;

  const headers = { "user-id": id };

  try {
    const order = await fetchPatchRequest({
      url,
      data,
      headers,
    });
    console.log({ order });

    revalidatePath("/dashboard/ordenes");
    revalidatePath("/dashboard/enviar");
    revalidatePath("/dashboard/recibos");
  } catch (error) {
    throw new Error(`Error creando una orden: ${error}`);
  }
};

export const completeOrder = async (previousState: any, formData: any) => {
  const { id, orderId } = Object.fromEntries(formData);

  const data = {
    completed: true,
  };
  const url = `${process.env.SERVER}/orders/${orderId}`;

  const headers = { "user-id": id };

  try {
    const order = await fetchPatchRequest({
      url,
      data,
      headers,
    });
    console.log({ order });

    revalidatePath("/dashboard/ordenes");
    revalidatePath("/dashboard/enviar");
    revalidatePath("/dashboard/recibos");
  } catch (error) {
    throw new Error(`Error creando una orden: ${error}`);
  }
};
