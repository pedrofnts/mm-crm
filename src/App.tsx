import { Refine, useRefineContext } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import { ThemedLayoutV2, useNotificationProvider } from '@refinedev/antd';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import routerBindings, {
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from '@refinedev/react-router-v6';
import { DashboardOutlined, ShopOutlined, ContactsOutlined } from '@ant-design/icons';
import { ColorModeContextProvider } from './contexts/color-mode';
import { Dashboard } from "./pages/dashboard";
import '@refinedev/antd/dist/reset.css';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { supabaseClient } from './utility/supabaseClient';
import { dataProvider } from '@refinedev/supabase';

import { CompanyList, CompanyCreate, CompanyEdit, CompanyShow } from "./pages/companies";
import { ContactList, ContactCreate, ContactEdit, ContactShow } from "./pages/contacts";

const queryClient = new QueryClient();

function App() {
    console.log("App is rendering");

    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <QueryClientProvider client={queryClient}>
                        <Refine
                            dataProvider={dataProvider(supabaseClient)}
                            notificationProvider={useNotificationProvider}
                            routerProvider={routerBindings}
                            resources={[
                                {
                                    name: 'dashboard',
                                    list: '/',
                                    meta: {
                                        icon: <DashboardOutlined />,
                                    },
                                },
                                {
                                    name: "companies",
                                    list: "/companies",
                                    create: "/companies/create",
                                    edit: "/companies/edit/:id",
                                    show: "/companies/show/:id",
                                    meta: {
                                        canDelete: true,
                                        icon: <ShopOutlined />,
                                    },
                                },
                                {
                                    name: "contacts",
                                    list: "/contacts",
                                    create: "/contacts/create",
                                    edit: "/contacts/edit/:id",
                                    show: "/contacts/show/:id",
                                    meta: {
                                        canDelete: true,
                                        icon: <ContactsOutlined />,
                                    },
                                },
                            ]}
                            options={{
                                syncWithLocation: true,
                                warnWhenUnsavedChanges: true,
                                liveMode: 'auto',
                            }}
                        >
                            <Routes>
                                <Route
                                    element={
                                        <ThemedLayoutV2>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    }
                                >
                                    <Route path="/">
                                        <Route index element={<Dashboard />} />
                                    </Route>
                                    <Route path="companies">
                                        <Route index element={<CompanyList />} />
                                        <Route path="create" element={<CompanyCreate />} />
                                        <Route path="edit/:id" element={<CompanyEdit />} />
                                        <Route path="show/:id" element={<CompanyShow />} />
                                    </Route>
                                    <Route path="contacts">
                                        <Route index element={<ContactList />} />
                                        <Route path="create" element={<ContactCreate />} />
                                        <Route path="edit/:id" element={<ContactEdit />} />
                                        <Route path="show/:id" element={<ContactShow />} />
                                    </Route>
                                </Route>
                            </Routes>
                            <RefineKbar />
                            <UnsavedChangesNotifier />
                            <DocumentTitleHandler />
                        </Refine>
                    </QueryClientProvider>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
