import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader } from "material-ui";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

const Chart = props => {
    const { bars = [], data = [], title = "" } = props;

    let getBars = () => {
        return bars.map((bar, i) => {
            const { dataKey, fill } = bar;

            return (
                <Bar key={`mn-bar-chart-${i}`} dataKey={dataKey} fill={fill}>
                    {data.map((entry, index) =>
                        <Cell fill={entry.fill} key={`cell-${index}`} />
                    )}
                </Bar>
            );
        });
    };

    return (
        <Card>
            <CardHeader title={title} />

            <div style={{ overflowX: "auto", overflowY: "hidden" }}>
                <BarChart
                    width={580}
                    height={350}
                    data={data}
                    margin={{ left: 0 }}
                >
                    <XAxis dataKey="name" />

                    <YAxis />

                    <CartesianGrid strokeDasharray="3 3" />

                    <Tooltip />

                    <Legend />

                    {getBars()}
                </BarChart>
            </div>
        </Card>
    );
};

Chart.propTypes = {
    title: PropTypes.string.isRequired,
    bars: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
};

export default Chart;
