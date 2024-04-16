"use client";

import { AuroraBackground } from "@/app/components/AuroraBackground";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CsvDownloader from "react-csv-downloader";
import { BentoGrid, BentoGridItem } from "../components/ui/grid";
import { operationType, useAppStore } from "../lib/store";
import { columnsRaboty, columnsSotrudnik } from "./lib/constants";

export default function Main() {
  const router = useRouter();
  const setOperation = useAppStore((state) => state.setOperation);
  const setReset = useAppStore((state) => state.setReset);
  const raboty = useAppStore((state) => state.raboty);
  const sotrudniky = useAppStore((state) => state.sotrudniky);
  const onItemClick = (type: string) => {
    if (
      type === operationType.getDatabyNearMonth ||
      type === operationType.getDataByProjectName
    ) {
      setOperation(type);
      router.push("/tableRaboty");
      return;
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
            {Object.values(operationType).map((operationName, index) => {
              if (operationName === operationType.exitWithSave) {
                return (
                  <CsvDownloader
                    key={index}
                    columns={columnsRaboty}
                    datas={raboty as any}
                    filename={"raboty"}
                    separator=";"
                  >
                    <CsvDownloader
                      key={index}
                      columns={columnsSotrudnik}
                      datas={sotrudniky}
                      filename={"sotrudniky"}
                      separator=";"
                    >
                      <BentoGridItem onClick={() => router.push("/")}>
                        {operationName}
                      </BentoGridItem>
                    </CsvDownloader>
                  </CsvDownloader>
                );
              } else if (operationName === operationType.exitWithoutSave) {
                return (
                  <BentoGridItem
                    key={index}
                    onClick={() => {
                      setReset();
                      router.push("/");
                    }}
                  >
                    {operationName}
                  </BentoGridItem>
                );
              } else {
                return (
                  <BentoGridItem
                    key={index}
                    onClick={() => onItemClick(operationName)}
                  >
                    {operationName}
                  </BentoGridItem>
                );
              }
            })}
          </>
        </BentoGrid>
      </motion.div>
    </AuroraBackground>
  );
}
