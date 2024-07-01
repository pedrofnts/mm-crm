import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DeleteButton,
    EmailField,
    TextField,
} from "@refinedev/antd";
import { Table, Space, Avatar, Form, Input } from "antd";

export const ContactList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, searchFormProps } = useTable({
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
        onSearch: (params: { name: string }) => [
            {
                field: "name",
                operator: "contains",
                value: params.name,
            },
        ],
    });

    return (
        <List
            headerButtons={({ defaultButtons }) => (
                <>
                    <Form
                        {...searchFormProps}
                        onValuesChange={() => {
                            searchFormProps.form?.submit();
                        }}
                    >
                        <Form.Item noStyle name="name">
                            <Input.Search placeholder="Search by name" />
                        </Form.Item>
                    </Form>
                    {defaultButtons}
                </>
            )}
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    title="Name"
                    width={200}
                    render={(_, record: { name: string; avatar_url: string }) => (
                        <Space>
                            <Avatar src={record.avatar_url} alt={record.name} />
                            <TextField value={record.name} />
                        </Space>
                    )}
                />
                <Table.Column dataIndex={["companies", "name"]} title="Company" />
                <Table.Column dataIndex="job_title" title="Job Title" />
                <Table.Column
                    dataIndex="email"
                    title="Email"
                    render={(value) => <EmailField value={value} />}
                />
                <Table.Column dataIndex="phone" title="Phone" />
                <Table.Column dataIndex="status" title="Status" />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <EditButton hideText size="small" recordItemId={record.id} />
                            <ShowButton hideText size="small" recordItemId={record.id} />
                            <DeleteButton hideText size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
