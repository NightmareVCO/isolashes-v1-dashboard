"use client";
import { processAppointment } from "@action/order.action";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  RadioGroup,
  useDisclosure,
} from "@nextui-org/react";
import IsolashesLogo from "@ui/icons/IsolashesLogo";
import { Radio } from "@ui/radio/Radio";
import SearchServices from "@ui/search/SearchServices";
import ServiceSelect from "@ui/serviceSelect/ServiceSelect";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export function useSellModal({ appointment }: { appointment: any }) {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const { refresh } = useRouter();

  const [isModal5xl, setIsModal5xl] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cashGiven, setCashGiven] = useState<number | null>(null);
  const [isCashConfirmed, setIsCashConfirmed] = useState(false);
  const [isLessMoney, setIsLessMoney] = useState(false);
  const [areMoreServices, setAreMoreServices] = useState<boolean | null>(null);
  const [areServicesReady, setAreServicesReady] = useState(false);
  const [allServices, setAllServices] = useState<any[]>([appointment.service]);
  const [resetKey, setResetKey] = useState(0);
  const [previousSelection, setPreviousSelection] = useState<any[]>([
    appointment.service.id,
  ]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const addService = (service: any) => {
    setAllServices((previousServices) => [...previousServices, service]);
  };

  const removeService = (service: any) => {
    setAllServices(allServices.filter((s) => s.id !== service.id));
  };

  const handleCashChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCashGiven(Number(event.target.value));
  };

  const [state, formAction] = useFormState(processAppointment, undefined);

  const formattedDate = new Date().toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = new Date().toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDateTime = `${formattedDate} - ${formattedTime}`;

  useEffect(() => {
    // Verifica el contenido de allServices cada vez que se actualiza
    const totalPrice = allServices.reduce(
      (accumulator, service) => accumulator + service.price,
      0,
    );
    setTotalPrice(totalPrice);
  }, [allServices]);

  return {
    onOpen,
    isOpen,
    onOpenChange,
    isModal5xl,
    setIsModal5xl,
    paymentMethod,
    setPaymentMethod,
    cashGiven,
    setCashGiven,
    isCashConfirmed,
    setIsCashConfirmed,
    isLessMoney,
    setIsLessMoney,
    formattedDateTime,
    handleCashChange,
    formAction,
    state,
    allServices,
    setAllServices,
    addService,
    removeService,
    areServicesReady,
    setAreServicesReady,
    areMoreServices,
    setAreMoreServices,
    previousSelection,
    setPreviousSelection,
    resetKey,
    setResetKey,
    totalPrice,
    setTotalPrice,
    loading,
    refresh,
    setLoading,
  };
}

export function SellModalAppointment({
  appointment,
  user,
  services,
}: {
  appointment: any;
  user: any;
  services: any;
}) {
  const {
    onOpen,
    isOpen,
    onOpenChange,
    isModal5xl,
    setIsModal5xl,
    paymentMethod,
    setPaymentMethod,
    cashGiven,
    setCashGiven,
    isCashConfirmed,
    setIsCashConfirmed,
    isLessMoney,
    setIsLessMoney,
    formattedDateTime,
    handleCashChange,
    formAction,
    allServices,
    setAllServices,
    addService,
    areServicesReady,
    setAreServicesReady,
    areMoreServices,
    setAreMoreServices,
    previousSelection,
    setPreviousSelection,
    resetKey,
    totalPrice,
    loading,
    refresh,
    setLoading,
  } = useSellModal({ appointment });

  const changeDue = cashGiven === null ? 0 : cashGiven - totalPrice;

  return (
    <>
      <Button color="primary" onPress={onOpen} className="text-white">
        Cobrar Cita
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        className="transition-all duration-300 ease-in-out max-h-[740px] overflow-hidden"
        size={`${isModal5xl ? "2xl" : "3xl"}`}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                <h2 className="w-full text-lg text-start text-primary">
                  Cobrar Cita
                </h2>
                <Divider />
              </ModalHeader>
              <form
                action={(formData) => {
                  setLoading(true);
                  setTimeout(() => {
                    formAction(formData);
                    refresh();
                  }, 1000);
                  setTimeout(() => {
                    refresh();
                    onClose();
                  }, 6000);
                }}
              >
                <ModalBody className="flex flex-col items-center justify-center w-full h-full">
                  {areMoreServices === null && (
                    <>
                      <RadioGroup
                        label="Servicio Adicional"
                        description="¿Desea agregar servicios adicionales?"
                        className="w-full"
                        onValueChange={(value) => {
                          setAreMoreServices(value === "true");
                          setAllServices([appointment.service]);
                          if (value === "false") {
                            setAreServicesReady(true);
                            setAllServices([appointment.service]);
                          }
                        }}
                      >
                        <Radio value="true">Sí</Radio>
                        <Radio value="false">No</Radio>
                      </RadioGroup>
                    </>
                  )}
                  {areMoreServices !== null &&
                    areMoreServices &&
                    !areServicesReady && (
                      <>
                        <SearchServices placeholder="Buscar servicios adicionales" />
                        <ServiceSelect
                          services={services}
                          previousSelection={previousSelection}
                          setPreviousSelection={setPreviousSelection}
                          resetKey={resetKey}
                          firstService={appointment.service}
                        />

                        <div className=" w-full flex items-center justify-between">
                          <Button
                            color="danger"
                            variant="light"
                            onPress={() => {
                              setAllServices([appointment.service]);
                              setPreviousSelection([appointment.service.id]);
                            }}
                          >
                            Borrar Selección
                          </Button>

                          <Button
                            color="primary"
                            className="text-white"
                            onPress={() => {
                              setAreServicesReady(true);
                              const selectionArray = [...previousSelection];
                              setAllServices([]);
                              for (const id of selectionArray) {
                                const service = services.find(
                                  (service: any) => service.id === id,
                                );
                                if (service) addService(service);
                              }
                            }}
                          >
                            Confirmar Servicios
                          </Button>
                        </div>
                      </>
                    )}
                  {areServicesReady && !paymentMethod && (
                    <RadioGroup
                      label="Método de Pago"
                      description="Seleccione el método de pago"
                      className="w-full"
                      onValueChange={(value) => {
                        setPaymentMethod(value);
                        if (value === "tarjeta") setIsModal5xl(true);
                      }}
                    >
                      <Radio value="efectivo">Efectivo</Radio>
                      <Radio value="tarjeta">Tarjeta</Radio>
                    </RadioGroup>
                  )}
                  {paymentMethod === "efectivo" && !isCashConfirmed && (
                    <div className="flex flex-col items-center w-full gap-y-4">
                      <Input
                        placeholder="Monto recibido por el cliente"
                        variant="bordered"
                        type="number"
                        min="0"
                        size="lg"
                        value={cashGiven === null ? "" : cashGiven.toString()}
                        onChange={handleCashChange}
                        className="mb-4"
                      />
                      <div className="flex flex-row gap-x-5">
                        <p className="text-lg font-medium text-default-700">
                          Total: ${totalPrice}
                        </p>
                        <p className="text-lg font-medium text-default-700">
                          Cambio: ${changeDue.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        color="primary"
                        className="text-white"
                        onPress={() => {
                          if (cashGiven === null || cashGiven < totalPrice) {
                            setIsLessMoney(true);
                            return;
                          }
                          setIsLessMoney(false);
                          setIsCashConfirmed(true);
                          setIsModal5xl(true);
                        }}
                      >
                        Confirmar Monto
                      </Button>
                      {isLessMoney && (
                        <p className="text-red-500">
                          El monto dado es menor al total
                        </p>
                      )}
                    </div>
                  )}

                  {paymentMethod &&
                    (paymentMethod !== "efectivo" || isCashConfirmed) && (
                      <>
                        {/* <LashesLogo className="size-20 fill-primary" /> */}
                        <IsolashesLogo className="h-auto mb-4 w-44" />
                        <p className="text-default-700">
                          {`Teléfono: ${appointment.branch.phone}`}
                        </p>
                        <p className="text-default-700">
                          {`Dirección: ${appointment.branch.address}`}
                        </p>
                        <Divider />
                        <div className="flex items-center justify-between w-full">
                          <p className="font-bold text-default-700">
                            Fecha de Transacción:
                          </p>
                          <p className="font-medium text-default-700">
                            {formattedDateTime}
                          </p>
                        </div>
                        <div className="flex items-center justify-between w-full">
                          <p className="font-bold text-default-700">
                            Empleado que atendió:
                          </p>
                          <p className="font-medium text-default-700">
                            {user.name + " " + user.lastName}
                          </p>
                        </div>
                        <div className="flex items-center justify-between w-full">
                          <p className="font-bold text-default-700">
                            Estado de Venta:
                          </p>
                          <p className="font-medium text-default-700">Pagado</p>
                        </div>
                        <div className="flex items-center justify-between w-full">
                          <p className="font-bold text-default-700">
                            Método de Pago:
                          </p>
                          <p className="font-medium capitalize text-default-700">
                            {paymentMethod === "tarjeta"
                              ? "Tarjeta de Crédito"
                              : "Efectivo"}
                          </p>
                        </div>
                        <div className="flex items-center justify-between w-full">
                          <p className="font-bold text-default-700">
                            Número de Transacción:
                          </p>
                          <p className="font-medium text-default-700">
                            {10_000}
                          </p>
                        </div>

                        <div className="flex items-center justify-between w-full">
                          <p className="font-bold text-default-700">Cliente:</p>
                          <p className="font-medium text-default-700">
                            {appointment.customer &&
                              appointment.customer.name +
                                " " +
                                appointment.customer.lastName}
                            {!appointment.customer && appointment.fullName}
                          </p>
                        </div>
                        <Divider />

                        <div className="flex flex-col w-full gap-2 max-h-[190px] overflow-y-auto">
                          <div className="flex items-center justify-between w-full">
                            <p className="font-bold text-default-700 flex-2">
                              Cita
                            </p>
                            <p className="flex-1 font-bold text-default-700">
                              Cantidad
                            </p>
                            <p className="flex-1 font-bold text-right text-default-700">
                              Precio Unitario
                            </p>
                            <p className="flex-1 font-bold text-right text-default-700">
                              Valor
                            </p>
                          </div>

                          {allServices.map((service) => (
                            <div
                              key={service.id}
                              className="flex items-center justify-between w-full"
                            >
                              <p className="text-default-700 flex-2">
                                {service.name}
                              </p>
                              <p className="flex-1 text-center text-default-700">
                                1
                              </p>
                              <p className="flex-1 text-right text-default-700">
                                {`RD$${service.price}`}
                              </p>
                              <p className="flex-1 text-right text-default-700">
                                {`RD$${service.price}`}
                              </p>
                            </div>
                          ))}
                        </div>

                        <Divider />
                        <div className="flex items-center justify-between w-full">
                          <p className="text-xl font-semibold text-default-700">
                            Monto Total:
                          </p>
                          <p className="text-xl font-semibold text-default-700">{`RD$${totalPrice}`}</p>
                        </div>

                        <input type="hidden" name="id" value={user.id} />
                        {/* userName, userPhone & userEmail already in the form */}
                        <input
                          type="hidden"
                          name="employeeName"
                          value={user.name + " " + user.lastName}
                        />
                        <input
                          type="hidden"
                          name="user"
                          value={JSON.stringify(appointment?.customer)}
                        />
                        <input
                          type="hidden"
                          name="services"
                          value={JSON.stringify(allServices)}
                        />
                        <input
                          type="hidden"
                          name="branchId"
                          value={appointment.branch.id}
                        />
                        <input type="hidden" name="total" value={totalPrice} />
                        <input
                          type="hidden"
                          name="paymentMethod"
                          value={paymentMethod}
                        />
                        <input
                          type="hidden"
                          name="client"
                          value={appointment.customer?.id}
                        />
                        <input type="hidden" name="total" value={totalPrice} />
                        <input
                          type="hidden"
                          name="appointmentId"
                          value={appointment.id}
                        />
                      </>
                    )}
                </ModalBody>
                <ModalFooter className="flex items-center justify-between">
                  <div>
                    <Button
                      color="warning"
                      variant="light"
                      onPress={() => {
                        if (isCashConfirmed) {
                          setAllServices([appointment.service]);
                          setPreviousSelection([appointment.service.id]);
                          setIsCashConfirmed(false);
                          setIsModal5xl(false);
                        } else if (paymentMethod) {
                          setPaymentMethod("");
                          setCashGiven(null);
                          setIsModal5xl(false);
                        } else if (areServicesReady) {
                          setAreMoreServices(null);
                          setAreServicesReady(false);
                          setAllServices([appointment.service]);
                          setPreviousSelection([appointment.service.id]);
                        } else if (areMoreServices !== null) {
                          setAreMoreServices(null);
                        }
                      }}
                    >
                      Atrás
                    </Button>
                  </div>
                  <div>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={() => {
                        onClose();
                        setIsModal5xl(false);
                        setPaymentMethod("");
                        setCashGiven(null);
                        setIsCashConfirmed(false);
                        setIsLessMoney(false);
                        setAreMoreServices(null);
                        setAreServicesReady(false);
                        setAllServices([appointment.service]);
                        setPreviousSelection([appointment.service.id]);
                      }}
                    >
                      Cerrar
                    </Button>
                    <Button
                      color="primary"
                      className="text-white"
                      type="submit"
                      isLoading={loading}
                      isDisabled={
                        !areServicesReady ||
                        !paymentMethod ||
                        (paymentMethod === "efectivo" && !isCashConfirmed)
                      }
                    >
                      Cobrar
                    </Button>
                  </div>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
