"use client";
import { processOrder } from "@action/order.action";
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
import SearchUsers from "@ui/search/SearchUsers";
import UsersSelect from "@ui/usersSelect/UsersSelect";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormState } from "react-dom";

export function useSellModal() {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const { refresh } = useRouter();

  const [isBranchSelected, setIsBranchSelected] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<any>({});
  const [isModal5xl, setIsModal5xl] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cashGiven, setCashGiven] = useState<number | null>(null);
  const [isCashConfirmed, setIsCashConfirmed] = useState(false);
  const [isLessMoney, setIsLessMoney] = useState(false);
  const [clientType, setClientType] = useState("");
  const [isClientSelected, setIsClientSelected] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>({});
  const [clientName, setClientName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCashChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCashGiven(Number(event.target.value));
  };

  const [state, formAction] = useFormState(processOrder, undefined);

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

  return {
    onOpen,
    isOpen,
    onOpenChange,
    isBranchSelected,
    setIsBranchSelected,
    isModal5xl,
    setIsModal5xl,
    selectedBranch,
    setSelectedBranch,
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
    state,
    formAction,
    clientType,
    setClientType,
    isClientSelected,
    setIsClientSelected,
    selectedClient,
    setSelectedClient,
    clientName,
    setClientName,
    refresh,
    loading,
    setLoading,
  };
}

export function SellModal({
  products,
  setProducts,
  branches,
  totalPrice,
  user,
  users,
}: {
  products: any;
  branches: any;
  totalPrice: number;
  user: any;
  users: any;
  setProducts: any;
}) {
  const {
    onOpen,
    isOpen,
    onOpenChange,
    isBranchSelected,
    setIsBranchSelected,
    isModal5xl,
    setIsModal5xl,
    selectedBranch,
    setSelectedBranch,
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
    clientType,
    setClientType,
    isClientSelected,
    setIsClientSelected,
    selectedClient,
    setSelectedClient,
    clientName,
    setClientName,
    refresh,
    loading,
    setLoading,
  } = useSellModal();

  const changeDue = cashGiven === null ? 0 : cashGiven - totalPrice;

  return (
    <>
      <Button color="primary" onPress={onOpen} className="text-white">
        Realizar Venta
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        className="transition-all duration-300 ease-in-out max-h-[780px] overflow-hidden"
        size={`${isModal5xl ? "2xl" : "2xl"}`}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                <h2 className="w-full text-lg text-start text-primary">
                  Cobrar Productos
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
                    setProducts([]);
                  }, 5000);
                }}
              >
                <ModalBody className="flex flex-col items-center justify-center w-full h-full">
                  {!isBranchSelected && (
                    <RadioGroup
                      label="Sucursal"
                      description="Seleccione la sucursal desde la que se le cobrará"
                      className="w-full"
                      onValueChange={(value) => {
                        setIsBranchSelected(true);
                        setSelectedBranch(value);
                      }}
                    >
                      {branches?.map((branch: any) => (
                        <Radio key={branch.id} value={branch}>
                          {branch.name}
                        </Radio>
                      ))}
                    </RadioGroup>
                  )}
                  {isBranchSelected && !paymentMethod && (
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
                  {isBranchSelected &&
                    paymentMethod &&
                    (paymentMethod !== "efectivo" || isCashConfirmed) &&
                    !clientType && (
                      <RadioGroup
                        label="Tipo de Cliente"
                        description="Seleccione el tipo de cliente"
                        className="w-full"
                        onValueChange={(value) => setClientType(value)}
                      >
                        <Radio value="conCuenta">Cliente con cuenta</Radio>
                        <Radio value="sinCuenta">
                          Cliente sin cuenta, desea dar sus datos
                        </Radio>
                        <Radio value="sinDatos">Sin datos adicionales</Radio>
                      </RadioGroup>
                    )}

                  {isBranchSelected &&
                    paymentMethod &&
                    (paymentMethod !== "efectivo" || isCashConfirmed) &&
                    clientType === "conCuenta" &&
                    !isClientSelected && (
                      <>
                        <SearchUsers placeholder="Buscar Cliente" />
                        <UsersSelect
                          users={users}
                          setSelectedUser={setSelectedClient}
                        />
                        <Button
                          color="primary"
                          className="text-white"
                          isDisabled={!selectedClient?.currentKey}
                          onPress={() => {
                            if (!selectedClient.currentKey) return;

                            const userId = [...selectedClient];
                            const client = users.find(
                              (user: any) => user.id === userId[0],
                            );
                            if (client) setSelectedClient(client);

                            setIsModal5xl(true);
                            setIsClientSelected(true);
                          }}
                        >
                          <p className="text-white">Guardar</p>
                        </Button>
                      </>
                    )}

                  {isBranchSelected &&
                    paymentMethod &&
                    (paymentMethod !== "efectivo" || isCashConfirmed) &&
                    clientType === "sinCuenta" &&
                    !isClientSelected && (
                      <>
                        <div className="flex flex-col items-center w-full gap-y-4">
                          <Input
                            name="userName"
                            variant="bordered"
                            placeholder="Nombre"
                            onChange={(event) =>
                              setClientName(event.target.value)
                            }
                            type="text"
                            size="lg"
                          />
                          <Input
                            name="userPhone"
                            variant="bordered"
                            placeholder="Teléfono"
                            type="text"
                            size="lg"
                          />
                          <Input
                            name="userEmail"
                            variant="bordered"
                            placeholder="Correo"
                            type="email"
                            size="lg"
                          />
                          <Button
                            color="primary"
                            className="text-white"
                            onPress={() => {
                              setIsModal5xl(true);
                              setIsClientSelected(true);
                            }}
                          >
                            <p className="text-white">Guardar</p>
                          </Button>
                        </div>
                      </>
                    )}

                  {isBranchSelected &&
                    paymentMethod &&
                    (paymentMethod !== "efectivo" || isCashConfirmed) &&
                    (clientType === "sinDatos" || isClientSelected) && (
                      <>
                        {/* <LashesLogo className="size-20 fill-primary" /> */}
                        <IsolashesLogo className="h-auto mb-4 w-44" />
                        <p className="text-default-700">
                          {`Teléfono: ${selectedBranch.phone}`}
                        </p>
                        <p className="text-default-700">
                          {`Dirección: ${selectedBranch.address}`}
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
                        {(selectedClient || clientName) && (
                          <div className="flex items-center justify-between w-full">
                            <p className="font-bold text-default-700">
                              Cliente:
                            </p>
                            <p className="font-medium text-default-700">
                              {selectedClient
                                ? selectedClient?.name +
                                  " " +
                                  selectedClient.lastName
                                : clientName}
                            </p>
                          </div>
                        )}
                        <Divider />

                        <div className="flex flex-col w-full gap-2 max-h-[190px] overflow-y-auto">
                          <div className="flex items-center justify-between w-full">
                            <p className="font-bold text-default-700 flex-2">
                              Productos
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

                          {products.map((product: any) => (
                            <div
                              key={product.id}
                              className="flex items-center justify-between w-full"
                            >
                              <p className="text-default-700 flex-2">
                                {product.name}
                              </p>
                              <p className="flex-1 text-center text-default-700">
                                {product.quantity}
                              </p>
                              <p className="flex-1 text-right text-default-700">
                                {`RD$${
                                  product.isPromotion
                                    ? product.promotionPrice
                                    : product.price
                                }`}
                              </p>
                              <p className="flex-1 text-right text-default-700">
                                {`RD$${
                                  product.isPromotion
                                    ? product.promotionPrice * product.quantity
                                    : product.price * product.quantity
                                }`}
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
                        <input
                          type="hidden"
                          name="employeeName"
                          value={user.name + " " + user.lastName}
                        />
                        {/* userName, userPhone & userEmail already in the form */}
                        <input
                          type="hidden"
                          name="user"
                          value={JSON.stringify(selectedClient)}
                        />
                        <input
                          type="hidden"
                          name="products"
                          value={JSON.stringify(products)}
                        />
                        <input type="hidden" name="total" value={totalPrice} />

                        <input
                          type="hidden"
                          name="branchId"
                          value={selectedBranch?.id}
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
                          value={selectedClient?.id}
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
                        if (isClientSelected) {
                          setIsClientSelected(false);
                          setSelectedClient(null);
                        } else if (clientType) {
                          setClientType("");
                          setIsModal5xl(false);
                          setSelectedClient(null);
                        } else if (isCashConfirmed) {
                          setIsCashConfirmed(false);
                          setIsModal5xl(false);
                        } else if (paymentMethod) {
                          setPaymentMethod("");
                          setCashGiven(null);
                          setIsModal5xl(false);
                        } else if (isBranchSelected) {
                          setIsBranchSelected(false);
                          setSelectedBranch("");
                          setIsModal5xl(false);
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
                        setIsBranchSelected(false);
                        setSelectedBranch("");
                        setIsModal5xl(false);
                        setPaymentMethod("");
                        setCashGiven(null);
                        setIsCashConfirmed(false);
                        setIsClientSelected(false);
                        setClientType("");
                        setSelectedClient("");
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
                        !isBranchSelected ||
                        !paymentMethod ||
                        (paymentMethod === "efectivo" && !isCashConfirmed) ||
                        !clientType ||
                        (clientType === "conCuenta" && !isClientSelected) ||
                        (clientType === "sinCuenta" && !isClientSelected) ||
                        (clientType === "sinDatos" && isClientSelected)
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
