import { Card, CardBody, Chip } from "@nextui-org/react";
import Image from "next/image";

export default function ProductItemCard({ orderItem }: { orderItem: any }) {
  return (
    <Card key={orderItem.id} shadow="none" radius="none" fullWidth>
      <CardBody className="flex flex-row items-center justify-center p-0 lg:items-start lg:justify-start sm:flex-nowrap">
        <Image
          alt="Imagen del producto"
          className="rounded-lg"
          src={orderItem.product.productImage[0]?.url ?? "/default-image.jpg"}
          width={150}
          height={150}
        />
        <div className="px-4 py-5">
          <h3 className="text-xl font-medium">
            {orderItem.product.name} - {orderItem.product.productCategory.name}
          </h3>
          <div className="flex flex-col gap-3 pt-2 text-large text-default-400">
            <div className="flex items-center justify-start gap-x-4">
              <p>
                Descripción:{" "}
                <span className="text-default-500">
                  {orderItem.product.description}
                </span>
              </p>
            </div>

            <div className="flex items-center justify-start gap-x-4">
              <p>
                Precio unitario:{" "}
                <span className="text-default-500">
                  ${orderItem.product.price.toFixed(2)}
                </span>
              </p>
              <p>
                Cantidad comprada:{" "}
                <span className="text-default-500">{orderItem.quantity}</span>
              </p>
            </div>

            <div className="flex items-center justify-start gap-x-4">
              <p>
                Precio total:{" "}
                <span className="text-default-500">
                  ${(orderItem.quantity * orderItem.product.price).toFixed(2)}
                </span>
              </p>

              {orderItem.product.isPromotion && (
                <div className="flex items-center justify-start gap-x-4">
                  <Chip color="success" variant="flat" size="md">
                    Actualmente en promoción
                  </Chip>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
