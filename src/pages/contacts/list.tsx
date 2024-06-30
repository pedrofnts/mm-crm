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
import { supabaseClient } from "@refinedev/supabase";
import { useEffect, useState } from "react";

export const ContactList: React.FC<IResourceComponentsProps> = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            const { data, error } = await supabaseClient
                .from("contacts")
                .select(`
                    avatarUrl,
                    id,
                    name,
                    email,
                    company ( id, name ),
                    jobTitle,
                    phone,
                    status
                `)
                .ilike("name", `%${search}%`);
                
            if (error) {
                console.error(error);
            } else {
                setContacts(data);
            }
            setLoading(false);
        };

        fetchContacts();
    }, [search]);

    const handleSearch = (value: string) => {
        setSearch(value);
    };

    return (
        <List
            headerButtons={({ defaultButtons }) => (
                <>
                    <Form
                        onFinish={() => {
                            // do nothing, as we handle search on input change
                        }}
                    >
                        <Form.Item noStyle name="name">
                            <Input.Search
                                placeholder="Search by name"
                                onSearch={handleSearch}
                            />
                        </Form.Item>
                    </Form>
                    {defaultButtons}
                </>
            )}
        >
            <Table dataSource={contacts} rowKey="id" loading={loading}>
                <Table.Column
                    title="Name"
                    width={200}
                    render={(_, record: { name: string; avatarUrl: string }) => (
                        <Space>
                            <Avatar src={record.avatarUrl} alt={record.name} />
                            <TextField value={record.name} />
                        </Space>
                    )}
                />
                <Table.Column dataIndex={["company", "name"]} title="Company" />
                <Table.Column dataIndex="jobTitle" title="Job Title" />
                <Table.Column
                    dataIndex={["email"]}
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
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
