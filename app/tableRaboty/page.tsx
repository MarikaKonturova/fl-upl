"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { AuroraBackground } from "../components/AuroraBackground";
import DialogRabota from "../components/DialogRabota";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Rabota, itemsState, operationType, useAppStore } from "../lib/store";

export default function TableRaboty() {
  const operation = useAppStore((state) => state.operation);
  let raboty = useAppStore((state) => state.raboty);
  const removeItem = useAppStore((state) => state.removeItem);
  let projects = raboty.map((r) => r.name);
  const [filter, setFilter] = useState("");

  const onRemoveItemClick = (s: Rabota) => {
    removeItem({ stateType: itemsState.raboty, item: s });
  };

  if (operation === operationType.getDataByProjectName && filter) {
    raboty = raboty.filter((r) => r.name === filter);
  }
  if (operation === operationType.getDatabyNearMonth) {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);

    raboty = raboty.filter((r) => {
      const dataDate = new Date(r.endDate);
      return dataDate < currentDate;
    });
  }
  return (
    <AuroraBackground>
      <Link
        href={"/main"}
        className="absolute left-[10%] top-[15%] text-slate-200 hover:text-slate-300 transition-colors ease-in-out"
      >
        Назад в меню
      </Link>
      {operation === operationType.getDataByProjectName && (
        <div className="flex justify-center gap-8 mb-5">
          {projects.map((pr) => (
            <Button
              variant={"secondary"}
              className="z-10"
              key={pr}
              onClick={() => {
                setFilter(pr);
              }}
            >
              {pr}
            </Button>
          ))}
          <Button
            className="z-10"
            variant={"secondary"}
            key={"all"}
            onClick={() => {
              setFilter("");
            }}
          >
            all
          </Button>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="w-10/12"
      >
        <Table className="w-10/12 m-auto ">
          <TableCaption>Таблица работы</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Название проекта</TableHead>
              <TableHead>Задание в рамках данного проекта</TableHead>
              <TableHead>Код закрепленного сотрудника</TableHead>
              <TableHead>Код руководителя</TableHead>
              <TableHead>Дата выдачи задания</TableHead>
              <TableHead>Срок исполнения</TableHead>
              {operation === operationType.updateData ||
                (operation === operationType.deleteData && (
                  <TableHead>Действия</TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {raboty.map((r) => {
              const endDate = new Date(r.endDate);
              const creationDate = new Date(r.creationDate);
              return (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell>{r.description}</TableCell>
                  <TableCell>{r.sotrudnikCode}</TableCell>
                  <TableCell>{r.bossCode}</TableCell>
                  <TableCell>{creationDate.toLocaleDateString()}</TableCell>
                  <TableCell>{endDate.toLocaleDateString()}</TableCell>
                  <TableCell className="flex gap-3">
                    {operation === operationType.updateData && (
                      <DialogRabota rabota={r} type="edit" />
                    )}
                    {operation === operationType.deleteData && (
                      <Button onClick={() => onRemoveItemClick(r)}>
                        Удалить
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </motion.div>
    </AuroraBackground>
  );
}
