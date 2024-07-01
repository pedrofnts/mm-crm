import React, { useMemo } from "react";
import { useList } from "@refinedev/core";
import { Card, Typography, Skeleton } from "antd";
import { Area, AreaConfig } from "@ant-design/plots";
import { DollarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export const DealChart: React.FC = () => {
    const { data, isLoading, isError } = useList({
        resource: "deal_stages",
        filters: [
            {
                field: "title",
                operator: "in",
                value: ["WON", "LOST"]
            }
        ],
        metaData: {
            select: `
                *,
                deals_aggregate (
                    close_date_month,
                    close_date_year,
                    value
                )
            `
        }
    });

    const dealData = useMemo(() => {
        const stages = data?.data || [];
        
        const won = stages
            .find((node) => node.title === "WON")
            ?.deals_aggregate?.map((item) => {
                const { close_date_month, close_date_year } = item;
                const date = dayjs(`${close_date_year}-${close_date_month}-01`);
                return {
                    timeUnix: date.unix(),
                    timeText: date.format("MMM YYYY"),
                    value: item.value,
                    state: "Won",
                };
            }) || [];

        const lost = stages
            .find((node) => node.title === "LOST")
            ?.deals_aggregate?.map((item) => {
                const { close_date_month, close_date_year } = item;
                const date = dayjs(`${close_date_year}-${close_date_month}-01`);
                return {
                    timeUnix: date.unix(),
                    timeText: date.format("MMM YYYY"),
                    value: item.value,
                    state: "Lost",
                };
            }) || [];

        return [...won, ...lost].sort(
            (a, b) => a.timeUnix - b.timeUnix,
        );
    }, [data]);

    const config: AreaConfig = {
        isStack: false,
        data: dealData,
        xField: "timeText",
        yField: "value",
        seriesField: "state",
        animation: true,
        startOnZero: false,
        smooth: true,
        legend: { offsetY: -6 },
        yAxis: {
            tickCount: 4,
            label: {
                formatter: (v) => `$${Number(v) / 1000}k`,
            },
        },
        tooltip: {
            formatter: (data) => ({
                name: data.state,
                value: `$${Number(data.value) / 1000}k`,
            }),
        },
        areaStyle: (datum) => {
            const won = "l(270) 0:#ffffff 0.5:#b7eb8f 1:#52c41a";
            const lost = "l(270) 0:#ffffff 0.5:#f3b7c2 1:#ff4d4f";
            return { fill: datum.state === "Won" ? won : lost };
        },
        color: (datum) => (datum.state === "Won" ? "#52C41A" : "#F5222D"),
    };

    if (isLoading) {
        return <Skeleton active />;
    }

    if (isError) {
        return <Typography.Text type="danger">Failed to load data</Typography.Text>;
    }

    if (!dealData.length) {
        return <Typography.Text type="warning">No data to display</Typography.Text>;
    }

    return (
        <Card
            style={{ height: "432px" }}
            headStyle={{ padding: "8px 16px" }}
            bodyStyle={{ padding: "24px 24px 0px 24px" }}
            title={
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <DollarOutlined />
                    <Typography.Text style={{ marginLeft: ".5rem" }}>
                        Deals
                    </Typography.Text>
                </div>
            }
        >
            <Area {...config} height={325} />
        </Card>
    );
};
