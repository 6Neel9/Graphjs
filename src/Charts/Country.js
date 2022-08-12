import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useMemo, useEffect, useState } from 'react';
import { Intensity } from './Intensity';


ChartJS.register(ArcElement, Tooltip, Legend);

function Country() {
    var arrLength = useMemo(() => [], []);
    var levelss = useMemo(() => [], []);
    var valss = useMemo(() => [], []);
    const [datainfo, setDatainfo] = useState([]);

    var baseurl = 'https://apiinfo.herokuapp.com/api/';

    useEffect(() => {
        const res = async () => {
            const response = await axios.get(baseurl);
            const datainfo = await response.data;
            setDatainfo(datainfo);


            //country data
            let arr = datainfo.filter(data => data.country !== "");
            let map = arr.map(data => data.country);

            //country lengths
            map.map(x => arrLength[x] === undefined ? arrLength[x] = 1 : arrLength[x] += 1);

            for (let key in arrLength) {
                levelss.push(key);
                valss.push(arrLength[key]);
            }

        };
        res();
    }, [baseurl, arrLength, levelss, valss]);

    var data = {
        labels: levelss,
        datasets: [
            {
                label: '# of Votes',
                data: valss,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                height: '50px',
            },
        ],
    }
    return (
        <>
            <Pie data={data} />
            <h2>Intensity</h2>
            <Intensity datainfo={datainfo} />
        </>



    );
}


export default Country;
