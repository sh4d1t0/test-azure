import React from "react";
import PropTypes from "prop-types";
import {Card, CardHeader} from "material-ui";
import {Cell, Legend, Pie, PieChart, Tooltip} from "recharts";

const Chart = ({data, title = ""}) => {

    const colors = ["#F0FF00", "#FF8042", "#FF0000", "#64FF00", "#0088FE"];

    return <Card>

        <CardHeader title={title}/>

        <div style={{"overflowX": "auto", "overflowY": "hidden"}}>

            <PieChart
                width={580}
                height={350}>

                <Pie dataKey={"solicitudes"}
                     data={data}
                     nameKey={"name"}
                     cx={250}
                     cy={175}
                     outerRadius={120}>
                    {
                        data.map((entry, index) => <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}/>
                        )
                    }
                </Pie>

                <Tooltip label={"name"}/>

                <Legend />

            </PieChart>

        </div>

    </Card>;

};

Chart.propTypes = {
    "title": PropTypes.string.isRequired,
    "data": PropTypes.array.isRequired
};

export default Chart;
