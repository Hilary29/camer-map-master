import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";
import { CircleChart } from "./CircleChart";
import { HorizontalChart } from "./HorizontalChart";

const TabChart = () => {
  return (
    <div>
      <Tabs defaultValue="cercle" className="max-w-[350px] ">
        <TabsList className="bg-transparent pl-10">
          <TabsTrigger value="cercle" >icone Circle</TabsTrigger>
          <TabsTrigger value="barre">icone Barre</TabsTrigger>
        </TabsList>
        <TabsContent value="cercle">
          <CircleChart/>
        </TabsContent>
        <TabsContent value="barre">
            <HorizontalChart/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabChart;
