import React, { useEffect, useState } from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Show, NumberField, TextField, EmailField } from "@refinedev/antd";
import { Typography } from "antd";
import { supabaseClient } from "@refinedev/supabase";

const { Title } = Typography;

export const ContactShow: React.FC<IResourceComponentsProps> = () => {
    const [record, setRecord] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContact = async () => {
            const { data, error } = await supabaseClient
                .from("contacts")
                .select(`
                    id,
                    name,
                    email,
                    company ( id, name ),
                    jobTitle,
                    phone,
                    status
                `)
                .eq("id", 1)
                .single();
                
            if (error) {
                setError(error);
            } else {
                setRecord(data);
            }
            setIsLoading(false);
        };

        fetchContact();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Name</Title>
            <TextField value={record?.name} />
            <Title level={5}>Email</Title>
            <EmailField value={record?.email} />
            <Title level={5}>Company</Title>
            <TextField value={record?.company?.name} />
            <Title level={5}>Job Title</Title>
            <TextField value={record?.jobTitle} />
            <Title level={5}>Phone</Title>
            <TextField value={record?.phone} />
            <Title level={5}>Status</Title>
            <TextField value={record?.status} />
        </Show>
    );
};
