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

    return (
        <Card>
            <CardHeader title={title} />

            <div style={{ overflowX: "auto", overflowY: "hidden" }}>
                <PieChart width={580} height={350}>
                    <Pie
                        dataKey={"solicitudes"}
                        data={data}
                        nameKey={"name"}
                        cx={250}
                        cy={175}
                        outerRadius={100}
                    >
                        {data.map((entry, index) =>
                            <Cell key={`cell-${index}`} fill={colors[index]} />
                        )}
                    </Pie>

                    <Tooltip label={"name"} />

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
