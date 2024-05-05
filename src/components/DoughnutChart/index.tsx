import React from 'react';
import { Svg, G, Path, Circle } from 'react-native-svg';
import { arc, pie, PieArcDatum } from 'd3-shape';
import Colors from 'utils/Colors';


interface PieChartData {
    name: string;
    population: number;
    color: string;
    legendFontColor?: string;
    legendFontSize?: number;
}

interface DoughnutChartProps {
    data: PieChartData[];
    size: number;
}

const DoughnutChart = ({ data, size }: DoughnutChartProps) => {
    const radius = size / 2;
    const innerRadius = radius - size/4;
    const outerRadius = radius - 1;
    const padAngle = 0.02;

    const arcs = pie<PieChartData>().value((d) => d.population).padAngle(padAngle)(data);
    const arcPath = arc<PieArcDatum<PieChartData>>().outerRadius(outerRadius).innerRadius(innerRadius).cornerRadius(7.5);;

    return (
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <G x={radius} y={radius}>
                {arcs.map((segment, index) => (
                    <Path key={index} d={arcPath(segment)!} fill={segment.data.color} stroke={Colors.primary.light} strokeWidth={2} />
                ))}
                <Circle cx="0" cy="0" r={innerRadius - 2} fill='#f2f2f2' />
            </G>
        </Svg>
    );
};

export default DoughnutChart;
export type { PieChartData, DoughnutChartProps};