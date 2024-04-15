"use client";
import Link from "next/link";
import DialogSotrudnik from "../components/DialogSotrudnik";
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
import {
  Sotrudnik,
  itemsState,
  operationType,
  useAppStore,
} from "../lib/store";
import { AuroraBackground } from "../components/AuroraBackground";
import { motion } from "framer-motion";

export default function TableSotrudniky() {
  const operation = useAppStore((state) => state.operation);
  const sotrudniky = useAppStore((state) => state.sotrudniky);
  const removeItem = useAppStore((state) => state.removeItem);
  const onRemoveItemClick = (s: Sotrudnik) => {
    removeItem({ stateType: itemsState.sotrudniky, item: s });
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
        className="w-10/12"
      >
        <Table className="w-10/12 m-auto ">
          <TableCaption>Таблица сотрудников</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ФИО сотрудника</TableHead>
              <TableHead>Должность сотрудника</TableHead>
              <TableHead>Число рабочих часов в сутки</TableHead>
              <TableHead>Код руководителя</TableHead>
              <TableHead>Код сотрудника</TableHead>
              {operation === operationType.updateData ||
                (operation === operationType.deleteData && (
                  <TableHead>Действия</TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sotrudniky.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.fio}</TableCell>
                <TableCell>{s.position}</TableCell>
                <TableCell>{s.dayhours}</TableCell>
                <TableCell>{s.bossCode}</TableCell>
                <TableCell>{s.sotrudnikCode}</TableCell>
                <TableCell className="flex gap-3">
                  {operation === operationType.updateData && (
                    <DialogSotrudnik sotrudnik={s} type="edit" />
                  )}
                  {operation === operationType.deleteData && (
                    <Button onClick={() => onRemoveItemClick(s)}>
                      Удалить
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </AuroraBackground>
  );
}
