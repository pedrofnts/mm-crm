import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { supabaseClient } from "@refinedev/supabase";

export const ContactCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm({
        onSubmit: async (values) => {
            const { data, error } = await supabaseClient
                .from("contacts")
                .insert(values);
            if (error) {
                console.error(error);
            }
            return data;
        },
    });

    const [companies, setCompanies] = useState([]);
    const [salesOwners, setSalesOwners] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            const { data, error } = await supabaseClient
                .from("companies")
                .select("id, name");
            if (error) {
                console.error(error);
            } else {
                setCompanies(data);
            }
        };

        const fetchSalesOwners = async () => {
            const { data, error } = await supabaseClient
                .from("users")
                .select("id, name");
            if (error) {
                console.error(error);
            } else {
                setSalesOwners(data);
            }
        };

        fetchCompanies();
        fetchSalesOwners();
    }, []);

    return (
        <Create saveButtonProps={saveButtonProps}>
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
                <Form.Item
                    label="Company"
                    name={["companyId"]}
                    rules={[{ required: true }]}
                >
                    <Select
                        options={companies.map((company) => ({
                            label: company.name,
                            value: company.id,
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    label="Sales Owner"
                    name="salesOwnerId"
                    rules={[{ required: true }]}
                >
                    <Select
                        options={salesOwners.map((owner) => ({
                            label: owner.name,
                            value: owner.id,
                        }))}
                    />
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
        </Create>
    );
};
