import React from 'react';
import { useMemo,useEffect } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);



export function Intensity({datainfo}) {
  var arrLength = useMemo(() => [], []);
  var levelss = useMemo(() => [], []);
  var valss = useMemo(() => [], []);

  useEffect(() => {
    const res = async () => {
    
        //country data
        let arr = datainfo.filter(data => data.intensity !== "");
        let map = arr.map(data => data.intensity);

        //country lengths
        map.map(x => arrLength[x] === undefined? arrLength[x] = 1 : arrLength[x] += 1);

        for (let key in arrLength) {
            levelss.push(key);
            valss.push(arrLength[key]);
        }

    };
    res();
}, [datainfo,arrLength, levelss, valss]);


  
  const data = {
    labels: levelss,
    datasets: [
      {
        label: '# of Votes',
        data: valss,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
  return <Radar data={data} />;
}