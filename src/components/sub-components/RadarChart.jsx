import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function RadarChart({ pokemon }) {
  const radarChartRef = useRef(null);

  useEffect(() => {
    if (!pokemon) return;

    const ctx = radarChartRef.current;

    const labelColors = [
      'rgba(255, 99, 132, 0.5)', // Rosso
      'rgba(54, 162, 235, 0.5)', // Blu
      'rgba(255, 206, 86, 0.5)', // Giallo
      'rgba(75, 192, 192, 0.5)', // Verde
      'rgba(153, 102, 255, 0.5)', // Viola
      'rgba(255, 159, 64, 0.5)', // Arancione
    ];

    const radarChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: [
          "HP",
          "Attack",
          "Defense",
          "Special Attack",
          "Special Defense",
          "Speed",
        ],

        datasets: [
          {
            label: pokemon.name,
            data: pokemon.stats.map((stat) => stat.base_stat),
            backgroundColor: labelColors,
            borderColor: labelColors.map(color => color.replace('0.5', '1')),
            borderWidth: 2,
          },
        ],
      },
      options: {
        animation: {
          duration: 0, // Disabilita l'animazione
        },
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 200,
          },
        },
      },
    });

    return () => {
      radarChart.destroy();
    };
  }, [pokemon]);

  return <canvas ref={radarChartRef} style={{  maxHeight: "370px" }} className="canvas"/>;
}

export default RadarChart;
