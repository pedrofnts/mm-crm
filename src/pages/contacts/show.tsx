import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, NumberField, TextField, EmailField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ContactShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow({
        metaData: {
            select: `
                id,
                avatar_url,
                name,
                email,
                job_title,
                phone,
                status,
                companies (
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
            <Title level={5}>Email</Title>
            <EmailField value={record?.email} />
            <Title level={5}>Company</Title>
            <TextField value={record?.companies?.name} />
            <Title level={5}>Job Title</Title>
            <TextField value={record?.job_title} />
            <Title level={5}>Phone</Title>
            <TextField value={record?.phone} />
            <Title level={5}>Status</Title>
            <TextField value={record?.status} />
        </Show>
    );
};
