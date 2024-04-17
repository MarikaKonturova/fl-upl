"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Sotrudnik, itemsState, useAppStore } from "../lib/store";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { headersSotrudniky } from "../lists/lib/constants";

const DialogSotrudnik = ({
  sotrudnik,
  type,
}: {
  sotrudnik?: Sotrudnik;
  type: "edit" | "add";
}) => {
  const router = useRouter();
  const [data, setData] = useState<Sotrudnik>(sotrudnik || ({} as Sotrudnik));
  const updateItem = useAppStore((state) => state.updateItem);
  const addItem = useAppStore((state) => state.addItem);
  const { toast: toastLib } = useToast();

  const onClick = () => {
    if (
      Object.keys(data).length < headersSotrudniky.length ||
      Object.values(data).some((d) => (d + "").trim() === "")
    ) {
      toastLib({
        title: "Ошибка",
        variant: "destructive",
        description: "Не все поля заполненны, перепроверьте данные",
      });
      return;
    } else if (Number(data.dayhours) > 24 || Number(data.dayhours) < 0) {
      toastLib({
        title: "Ошибка",
        variant: "destructive",
        description:
          'Введите корректные значение в поле " Число рабочих часов в сутки" ',
      });
      return;
    } else {
      if (type === "edit") {
        updateItem({ stateType: itemsState.sotrudniky, item: data });
      } else {
        /* if все поля есть => добавить, иначе => тост */
        addItem({ stateType: itemsState.sotrudniky, item: data });
        router.push("/tableSotrudniky");
      }
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {type === "edit" ? (
          <button className="text-blackA11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
            Изменить данные о сотруднике
          </button>
        ) : (
          <span>Сотрудники</span>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            {type === "edit"
              ? "Изменить данные о сотруднике"
              : "Добавить сотрудника"}
          </Dialog.Title>

          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-blackA11 w-[90px] text-right text-[15px]"
              htmlFor="name"
            >
              ФИО сотрудника
            </label>
            <input
              className="text-blackA11 shadow-blackA7 focus:shadow-blackA8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="name"
              value={data.fio}
              onChange={(e) => setData({ ...data, fio: e.currentTarget.value })}
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-blackA11 w-[90px] text-right text-[15px]"
              htmlFor="username"
            >
              Должность
            </label>
            <input
              className="text-blackA11 shadow-blackA7 focus:shadow-blackA8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="username"
              value={data.position}
              onChange={(e) =>
                setData({ ...data, position: e.currentTarget.value })
              }
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-blackA11 w-[90px] text-right text-[15px]"
              htmlFor="username"
            >
              Число рабочих часов в сутки
            </label>
            <input
              className="text-blackA11 shadow-blackA7 focus:shadow-blackA8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="username"
              value={data.dayhours}
              onChange={(e) =>
                setData({ ...data, dayhours: e.currentTarget.value })
              }
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-blackA11 w-[90px] text-right text-[15px]"
              htmlFor="username"
            >
              Код руководителя
            </label>
            <input
              className="text-blackA11 shadow-blackA7 focus:shadow-blackA8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="username"
              value={data.bossCode}
              onChange={(e) =>
                setData({ ...data, bossCode: e.currentTarget.value })
              }
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-blackA11 w-[90px] text-right text-[15px]"
              htmlFor="username"
            >
              Код сотрудника
            </label>
            <input
              className="text-blackA11 shadow-blackA7 focus:shadow-blackA8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="username"
              value={data.sotrudnikCode}
              onChange={(e) =>
                setData({ ...data, sotrudnikCode: e.currentTarget.value })
              }
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                onClick={onClick}
              >
                {type === "edit" ? (
                  <span>Сохранить изменения</span>
                ) : (
                  <span>Добавить сотрудника</span>
                )}
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-blackA11 hover:bg-blackA4 focus:shadow-blackA7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogSotrudnik;
