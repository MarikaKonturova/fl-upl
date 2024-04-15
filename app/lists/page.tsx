"use client";

import { AuroraBackground } from "@/app/components/AuroraBackground";
import { motion } from "framer-motion";
import React, { ChangeEvent } from "react";
import { BentoGrid, BentoGridItem } from "../components/ui/grid";
import Papa from "papaparse";
import {
  Rabota,
  Sotrudnik,
  itemsState,
  operationType,
  useAppStore,
} from "../lib/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DialogSotrudnik from "../components/DialogSotrudnik";
import DialogRabota from "../components/DialogRabota";

export default function Lists() {
  const router = useRouter();
  const addItems = useAppStore((state) => state.addItems);
  const operation = useAppStore((state) => state.operation);
  const onFileUploadSotrudnikyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const onComplete = (results: Papa.ParseResult<string[]>) => {
      const data: Sotrudnik[] = results.data.map((arrData: string[], index) => {
        const valuesOfArrData = Object.values(arrData);
        return {
          bossCode: valuesOfArrData[3],
          dayhours: valuesOfArrData[2],
          fio: valuesOfArrData[0],
          sotrudnikCode: valuesOfArrData[4],
          id: index + "",
          position: valuesOfArrData[1],
        };
      });
      addItems({ items: data, stateType: itemsState.sotrudniky });
    };
    const file = e.currentTarget.files?.[0];
    if (file) {
      Papa.parse(file, {
        download: true,
        skipEmptyLines: true,
        header: true,
        complete: onComplete,
      });
    }
    router.push("/tableSotrudniky");
  };
  const onFileUploadRabotaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const onComplete = (results: Papa.ParseResult<string[]>) => {
      const data: Rabota[] = results.data.map((arrData: string[], index) => {
        const valuesOfArrData = Object.values(arrData);
        return {
          name: valuesOfArrData[0],
          description: valuesOfArrData[1],
          sotrudnikCode: valuesOfArrData[2],
          bossCode: valuesOfArrData[3],
          creationDate: valuesOfArrData[4] as unknown as Date,
          endDate: valuesOfArrData[5] as unknown as Date,
          id: index + "",
        };
      });
      addItems({ items: data, stateType: itemsState.raboty });
    };
    const file = e.currentTarget.files?.[0];
    if (file) {
      Papa.parse(file, {
        download: true,
        skipEmptyLines: true,
        header: true,
        complete: onComplete,
      });
    }
    router.push("/tableRaboty");
  };

  return (
    <AuroraBackground>
      <Link
        href={"/main"}
        className="absolute left-[10%] top-[15%] text-slate-200 hover:text-slate-300 transition-colors ease-in-out"
      >
        Назад в меню
      </Link>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <h1 className="text-3xl text-white">Выбрать список для работы</h1>
        <BentoGrid className="grid-cols-1 md:grid-cols-2">
          {operation === operationType.loadData ? (
            <label htmlFor="files">
              <BentoGridItem>
                <>
                  <span>Сотрудники</span>
                  <input
                    id="files"
                    style={{ visibility: "hidden" }}
                    type="file"
                    accept=".csv"
                    onChange={onFileUploadSotrudnikyChange}
                  />
                </>
              </BentoGridItem>
            </label>
          ) : operation === operationType.addData ? (
            <BentoGridItem>
              <DialogSotrudnik type="add" />
            </BentoGridItem>
          ) : (
            <BentoGridItem>
              <Link href="/tableSotrudniky">Сотрудники</Link>
            </BentoGridItem>
          )}

          {operation === operationType.loadData ? (
            <label htmlFor="files">
              <BentoGridItem>
                <>
                  <span>Работа</span>
                  <input
                    id="files"
                    style={{ visibility: "hidden" }}
                    type="file"
                    accept=".csv"
                    onChange={onFileUploadRabotaChange}
                  />
                </>
              </BentoGridItem>
            </label>
          ) : operation === operationType.addData ? (
            <BentoGridItem>
              <DialogRabota type="add" />
            </BentoGridItem>
          ) : (
            <BentoGridItem>
              <Link href="/tableRaboty">Работа</Link>
            </BentoGridItem>
          )}
        </BentoGrid>
      </motion.div>
    </AuroraBackground>
  );
}
