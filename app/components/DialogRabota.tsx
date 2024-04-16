"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Rabota, itemsState, useAppStore } from "../lib/store";
import { Calendar } from "./ui/calendar";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

const DialogRabota = ({
  rabota,
  type,
}: {
  rabota?: Rabota;
  type: "edit" | "add";
}) => {
  const { toast: toastLib } = useToast();
  const router = useRouter();

  const [data, setData] = useState<Rabota>(
    rabota || {
      id: "",
      name: "",
      description: "",
      sotrudnikCode: "",
      bossCode: "",
      creationDate: new Date(),
      endDate: new Date(),
    }
  );

  const updateItem = useAppStore((state) => state.updateItem);
  const addItem = useAppStore((state) => state.addItem);
  const onClick = () => {
    if (
      Object.keys(data).length === 0 ||
      Object.keys(data).some((d) => d.trim() === "")
    ) {
      toastLib({
        title: "Ошибка",
        variant: "destructive",
        description: "Не все поля заполненны, перепроверьте данные",
      });
      return;
    } else {
      if (type === "edit") {
        updateItem({ stateType: itemsState.raboty, item: data });
      } else {
        addItem({ stateType: itemsState.raboty, item: data });
        router.push("/tableRaboty");
      }
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {type === "edit" ? (
          <button className="text-blackA11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
            Изменить данные о работе
          </button>
        ) : (
          <span>Работы</span>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Изменить данные о работе
          </Dialog.Title>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-blackA11  w-[90px] text-left text-[15px]"
              htmlFor="name"
            >
              Название проекта
            </label>
            <input
              className="text-blackA11 shadow-blackA7 focus:shadow-blackA8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="name"
              value={data.name}
              onChange={(e) =>
                setData({ ...data, name: e.currentTarget.value })
              }
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-blackA11 w-[90px] text-left text-[15px] "
              htmlFor="username"
            >
              Задание в рамках данного проекта
            </label>
            <input
              className="text-blackA11 shadow-blackA7 focus:shadow-blackA8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px]  leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="username"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.currentTarget.value })
              }
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-blackA11 w-[90px] text-left text-[15px] mr-1"
              htmlFor="username"
            >
              Код закрепленного сотрудника
            </label>
            <input
              className="text-blackA11 shadow-blackA7 focus:shadow-blackA8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="username"
              value={data.sotrudnikCode}
              onChange={(e) =>
                setData({ ...data, sotrudnikCode: e.currentTarget.value })
              }
            />
          </fieldset>{" "}
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-blackA11 w-[90px] text-left text-[15px]"
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
          <div className="flex gap-5 justify-center items-center mb-[15px] ">
            <fieldset className="flex flex-col items-center gap-5">
              <span className="text-blackA11 w-full text-center text-[15px]">
                Дата выдачи задания
              </span>

              <Calendar
                mode="single"
                selected={data.creationDate || new Date()}
                onSelect={(creationDate) =>
                  creationDate && setData({ ...data, creationDate })
                }
                className="rounded-md border shadow bg-black "
              />
            </fieldset>
            <fieldset className="flex flex-col items-center gap-5">
              <span className="text-blackA11 w-full text-center text-[15px]">
                Срок исполнения
              </span>
              <Calendar
                mode="single"
                selected={data.endDate || new Date()}
                onSelect={(endDate) => endDate && setData({ ...data, endDate })}
                className="rounded-md border shadow bg-black "
              />
            </fieldset>
          </div>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                onClick={onClick}
              >
                {type === "edit" ? (
                  <span>Сохранить изменения</span>
                ) : (
                  <span>Добавить работу</span>
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

export default DialogRabota;
