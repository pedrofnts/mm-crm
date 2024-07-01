import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const CompanyCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm();

    const { selectProps } = useSelect({
        resource: "sales_owners",
        metaData: {
            select: "id, name",
        },
        optionLabel: "name",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Sales Owner"
                    name="sales_owner_id"
                    rules={[{ required: true }]}
                >
                    <Select {...selectProps} />
                </Form.Item>
                <Form.Item label="Business Type" name="business_type">
                    <Select
                        options={[
                            { label: "B2B", value: "B2B" },
                            { label: "B2C", value: "B2C" },
                            { label: "B2G", value: "B2G" },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Company Size" name="company_size">
                    <Select
                        options={[
                            { label: "Enterprise", value: "ENTERPRISE" },
                            { label: "Large", value: "LARGE" },
                            { label: "Medium", value: "MEDIUM" },
                            { label: "Small", value: "SMALL" },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Country" name="country">
                    <Input />
                </Form.Item>
                <Form.Item label="Website" name="website">
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};
