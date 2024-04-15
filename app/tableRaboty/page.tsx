"use client";
import Link from "next/link";
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
  Rabota,
  Sotrudnik,
  itemsState,
  operationType,
  useAppStore,
} from "../lib/store";
import { AuroraBackground } from "../components/AuroraBackground";
import { motion } from "framer-motion";
import DialogRabota from "../components/DialogRabota";

export default function TableRaboty() {
  const operation = useAppStore((state) => state.operation);
  const raboty = useAppStore((state) => state.raboty);
  const removeItem = useAppStore((state) => state.removeItem);
  const onRemoveItemClick = (s: Rabota) => {
    removeItem({ stateType: itemsState.raboty, item: s });
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
