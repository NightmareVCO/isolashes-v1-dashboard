"use client";
import { TRANSITION_EASINGS } from "@nextui-org/framer-utils";
import type { ModalProps } from "@nextui-org/react";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { cn } from "@utils/cn";
import React from "react";

const SidebarDrawer = React.forwardRef<
  HTMLDivElement,
  ModalProps & {
    sidebarWidth?: number;
    sidebarPlacement?: "left" | "right";
  }
>(
  (
    {
      children,
      className,
      onOpenChange,
      isOpen,
      sidebarWidth = 288,
      classNames = {},
      sidebarPlacement = "left",
      motionProps: drawerMotionProperties,
      ...properties
    },
    reference,
  ) => {
    const motionProperties = React.useMemo(() => {
      if (
        !!drawerMotionProperties &&
        typeof drawerMotionProperties === "object"
      ) {
        return drawerMotionProperties;
      }

      return {
        variants: {
          enter: {
            x: 0,
            transition: {
              x: {
                duration: 0.3,
                ease: TRANSITION_EASINGS.easeOut,
              },
            },
          },
          exit: {
            x: sidebarPlacement == "left" ? -sidebarWidth : sidebarWidth,
            transition: {
              x: {
                duration: 0.2,
                ease: TRANSITION_EASINGS.easeOut,
              },
            },
          },
        },
      };
    }, [sidebarWidth, sidebarPlacement, drawerMotionProperties]);

    return (
      <>
        <Modal
          ref={reference}
          {...properties}
          classNames={{
            ...classNames,
            wrapper: cn("!w-[var(--sidebar-width)]", classNames?.wrapper, {
              "!items-start !justify-start ": sidebarPlacement === "left",
              "!items-end !justify-end": sidebarPlacement === "right",
            }),
            base: cn(
              "w-[var(--sidebar-width)] !m-0 p-0 h-full max-h-full",
              classNames?.base,
              className,
              {
                "inset-y-0 left-0 max-h-[none] rounded-l-none !justify-start":
                  sidebarPlacement === "left",
                "inset-y-0 right-0 max-h-[none] rounded-r-none !justify-end":
                  sidebarPlacement === "right",
              },
            ),
            body: cn("p-0", classNames?.body),
            closeButton: cn("z-50", classNames?.closeButton),
          }}
          isOpen={isOpen}
          motionProps={motionProperties}
          radius="none"
          scrollBehavior="inside"
          style={{
            // @ts-expect-error nextui
            "--sidebar-width": `${sidebarWidth}px`,
          }}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            <ModalBody>{children}</ModalBody>
          </ModalContent>
        </Modal>
        <div
          className={cn(
            "hidden h-full  max-w-[var(--sidebar-width)] overflow-x-hidden overflow-y-scroll sm:flex",
            className,
          )}
        >
          {children}
        </div>
      </>
    );
  },
);

SidebarDrawer.displayName = "SidebarDrawer";

export default SidebarDrawer;
