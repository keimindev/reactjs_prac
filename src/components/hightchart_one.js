import React, { useEffect, useState } from 'react'
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const highchartOne = ()=>{
    const initialOptions: any = {
        title : { text : "example" },
        chart : { type : "pie" },
        series : [] // 데이터가 처음엔 비어았다.
    };  
    const [ options, setOptions ] = useState<any>(initialOptions);

    const asyncRequest = async ()=>{
        const result = await some_async_request(); 
        // 임의의 비동기 요청이 있다고 가정한다.
        // result의 data안에는 text라는 문자열과, value라는 값이 저장되어있다고 가정

        let tempSeries = [];
        result.data.forEach(item=>tempSeries.push({
            name : item.text,   // 요소의 이름
            y: item.value       // 값 
        }));

        // 옵션을 변경하면 자동으로 Highcharts가 갱신된다.
        setOptions({
            ...initialOptions,
            series : tempSeries
        });
    }

    useEffect(()=>{
        asyncRequest();
        return ()=>{
            setOptions(initialOptions);
        }
    },[]);

    return <div>
        <HighchartsReact 
            highcharts={ Highcharts } 
            options={ options }/>
    </div>;
}

export default highchartOne;