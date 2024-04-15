import { createJSONStorage, persist } from "zustand/middleware";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";
import { create } from "zustand";
/* сотрудник
1.	 ФИО сотрудника
2.	 Должность сотрудника
3.	 Число рабочих часов в сутки
4.	 Код руководителя
5.	 Код сотрудника 

работа
1.	Название проекта
2.	Задание в рамках данного проекта
3.	Код закрепленного сотрудника
4.	Код руководителя
5.	Дата выдачи задания
6.	Срок исполнения

*/

export const operationType = {
  loadData: "считать данные",
  getData: "списки для просмотра",
  getDataByProjectName: "задачи по конкретному проекту",
  getDatabyNearMonth: "задачи на ближайший месяц",
  addData: "добавить запись",
  updateData: "редактировать данные",
  deleteData: "удалить запись",
  exitWithoutSave: "выйти без сохранения",
  exitWithSave: "выйти с сохранением",
};
export const itemsState = {
  sotrudniky: "sotrudniky",
  raboty: "raboty",
} as const;

type Keys = keyof typeof itemsState;
type Values = (typeof itemsState)[Keys];
export type Sotrudnik = {
  fio: string;
  position: string;
  dayhours: string;
  bossCode: string;
  id: string;
  sotrudnikCode: string;
};
export type Rabota = {
  id: string;
  name: string;
  description: string;
  sotrudnikCode: string;
  bossCode: string;
  creationDate: Date;
  endDate: Date;
};

type PayloadType = { item: Sotrudnik | Rabota; stateType: Values };
type PayloadArrType = { items: Sotrudnik[] | Rabota[]; stateType: Values };
export interface StoreType {
  originalSotrudniky: Sotrudnik[];
  sotrudniky: Sotrudnik[];
  originalRaboty: Rabota[];
  raboty: Rabota[];
  operation: string;
  setOperation: (operation: string) => void;
  addItems: (payload: PayloadArrType) => void;
  addItem: (payload: PayloadType) => void;
  updateItem: (payload: PayloadType) => void;
  removeItem: (payload: PayloadType) => void;
}
export const useAppStore = create<StoreType, [["zustand/persist", StoreType]]>(
  persist(
    (set) => ({
      originalSotrudniky: [],
      originalRaboty: [],
      sotrudniky: [],
      raboty: [],
      operation: "",
      setOperation: (operation) => set({ operation }),
      addItems: ({ items, stateType }: PayloadArrType) =>
        set((state) => ({
          ...state,
          [stateType]: [...items],
          [`original${capitalizeFirstLetter(stateType)}`]: [...items],
        })),
      addItem: ({ item, stateType }) =>
        set((state) => ({
          ...state,
          [stateType]: [...state[stateType], item],
        })),
      updateItem: ({ item, stateType }) =>
        set((state) => {
          if (stateType === itemsState.sotrudniky) {
            const newState = {
              ...state,
              sotrudniky: state.sotrudniky.map((it) =>
                it.id === item.id ? item : it
              ),
              raboty: state.raboty.map((r: Rabota) =>
                r.sotrudnikCode !== item.sotrudnikCode
                  ? { ...r, sotrudnikCode: item.sotrudnikCode }
                  : r
              ),
            };
            return newState as StoreType;
          } else {
            const newState = {
              ...state,
              raboty: state.raboty.map((it) => (it.id === item.id ? item : it)),
              sotrudniky: state.sotrudniky.map((r: Sotrudnik) =>
                r.sotrudnikCode !== item.sotrudnikCode
                  ? { ...r, code: item.sotrudnikCode }
                  : r
              ),
            };
            return newState as StoreType;
          }
        }),
      removeItem: ({ item, stateType }) =>
        set((state) => ({
          ...state,
          [stateType]: state[stateType].filter((it) => it.id !== item.id),
        })),
    }),
    {
      name: "storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
