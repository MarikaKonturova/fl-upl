"use client";

import { AuroraBackground } from "@/app/components/AuroraBackground";
import { motion } from "framer-motion";
import React, { ChangeEvent } from "react";
import { BentoGrid, BentoGridItem } from "../components/ui/grid";
import Link from "next/link";
import Papa from "papaparse";
import {
  Sotrudnik,
  itemsState,
  operationType,
  useAppStore,
} from "../lib/store";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();
  const setOperation = useAppStore((state) => state.setOperation);
  const download = (url: string) => {
    const a = document.createElement("a");
    a.href = url;
   // a.download = url.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const onItemClick = (type: string) => {
    if (type === operationType.exitWithSave){
    //  download()
    }
    setOperation(type);
    router.push("/lists");

  };
 
  return (
    <AuroraBackground>
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
        <BentoGrid>
          <>
            {Object.values(operationType).map((operationName, index) => (
              <BentoGridItem
                key={index}
                onClick={() => onItemClick(operationName)}
              >
                {operationName}
              </BentoGridItem>
            ))}
          </>
        </BentoGrid>
      </motion.div>
    </AuroraBackground>
  );
}
