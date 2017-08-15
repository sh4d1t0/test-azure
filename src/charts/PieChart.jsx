import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader } from "material-ui";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const Chart = ({ data, labels, title = "" }) => {
    const colors = ["#FFBB33", "#F44336", "#99CC00", "#49CEFF", "#AA66CC"],
        payload = labels.map((l, index) => {
            let color = { color: colors[index] };
            return { ...l, ...color };
        });

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5,
            x = cx + radius * Math.cos(-midAngle * RADIAN),
            y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <Card>
            <CardHeader title={title} />

            <div style={{ overflowX: "auto", overflowY: "hidden" }}>
                <PieChart width={580} height={350}>
                    <Pie
                        dataKey={"solicitudes"}
                        data={data}
                        nameKey={"name"}
                        cx={280}
                        cy={175}
                        label
                        outerRadius={100}
                    >
                        {data.map((entry, index) =>
                            <Cell key={`cell-${index}`} fill={colors[index]} />
                        )}
                    </Pie>
                    <Tooltip />
                    <Legend payload={payload} />
                </PieChart>
            </div>
        </Card>
    );
};

Chart.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    labels: PropTypes.array.isRequired
};
Chart.defaulProps = {
    data: [],
    labels: []
};

export default Chart;
