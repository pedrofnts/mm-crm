import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const ContactCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm();

    const { selectProps } = useSelect({
        resource: "companies",
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
                    label="Email"
                    name="email"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Company"
                    name="company_id"
                    rules={[{ required: true }]}
                >
                    <Select {...selectProps} />
                </Form.Item>
                <Form.Item label="Job Title" name="job_title">
                    <Input />
                </Form.Item>
                <Form.Item label="Phone" name="phone">
                    <Input />
                </Form.Item>
                <Form.Item label="Status" name="status">
                    <Select
                        options={[
                            { label: "Active", value: "ACTIVE" },
                            { label: "Inactive", value: "INACTIVE" },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Create>
    );
};
