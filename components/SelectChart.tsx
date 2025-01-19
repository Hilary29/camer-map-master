import React, { useState } from "react";
import { CircleChart } from "./CircleChart";
import { HorizontalChart } from "./HorizontalChart";

const SelectChart = () => {
  // Gestion de l'état pour la sélection
  const [selectedChart, setSelectedChart] = useState<string>("cercle");

  return (
    <div className="max-w-[350px]">
      {/* Menu déroulant (select) */}
      <div className="mb-4">
        <label htmlFor="chart-select" className="sr-only">
          Elections
        </label>
        <select
          id="chart-select"
          className="p-2 border rounded"
          value={selectedChart}
          onChange={(e) => setSelectedChart(e.target.value)}
        >
          <option value="cercle">Icône Circle</option>
          <option value="barre">Icône Barre</option>
        </select>
      </div>

      {/* Contenu conditionnel */}
      <div>
        {selectedChart === "cercle" && <CircleChart />}
        {selectedChart === "barre" && <HorizontalChart />}
      </div>
    </div>
  );
};

export default SelectChart;
