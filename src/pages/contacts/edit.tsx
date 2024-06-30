import React, { useEffect, useState } from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { supabaseClient } from "@refinedev/supabase";

export const ContactEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm({
        meta: {
            fields: [
                "avatarUrl",
                "id",
                "name",
                "email",
                "jobTitle",
                "phone",
                "status",
            ],
        },
        onSubmit: async (values) => {
            const { data, error } = await supabaseClient
                .from("contacts")
                .update(values)
                .eq("id", values.id);
            if (error) {
                console.error(error);
            }
            return data;
        },
    });

    const [contact, setContact] = useState(null);

    useEffect(() => {
        const fetchContact = async () => {
            if (queryResult?.data) {
                const { data, error } = await supabaseClient
                    .from("contacts")
                    .select("*")
                    .eq("id", queryResult.data.id)
                    .single();
                if (error) {
                    console.error(error);
                } else {
                    setContact(data);
                }
            }
        };
        fetchContact();
    }, [queryResult]);

    useEffect(() => {
        if (contact) {
            formProps.form?.setFieldsValue(contact);
        }
    }, [contact]);

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Name"
                    name={["name"]}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name={["email"]}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Job Title" name={["jobTitle"]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Phone" name={["phone"]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Status" name={["status"]}>
                    <Select
                        options={[
                            { label: "NEW", value: "NEW" },
                            { label: "CONTACTED", value: "CONTACTED" },
                            { label: "INTERESTED", value: "INTERESTED" },
                            { label: "UNQUALIFIED", value: "UNQUALIFIED" },
                            { label: "QUALIFIED", value: "QUALIFIED" },
                            { label: "NEGOTIATION", value: "NEGOTIATION" },
                            { label: "LOST", value: "LOST" },
                            { label: "WON", value: "WON" },
                            { label: "CHURNED", value: "CHURNED" },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Edit>
    );
};
