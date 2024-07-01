import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, NumberField, TextField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const CompanyShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow({
        metaData: {
            select: `
                id,
                name,
                business_type,
                company_size,
                country,
                website,
                sales_owners (
                    id,
                    name
                )
            `,
        },
    });
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Name</Title>
            <TextField value={record?.name} />
            <Title level={5}>Business Type</Title>
            <TextField value={record?.business_type} />
            <Title level={5}>Company Size</Title>
            <TextField value={record?.company_size} />
            <Title level={5}>Country</Title>
            <TextField value={record?.country} />
            <Title level={5}>Website</Title>
            <TextField value={record?.website} />
            <Title level={5}>Sales Owner</Title>
            <TextField value={record?.sales_owners?.name} />
        </Show>
    );
};
