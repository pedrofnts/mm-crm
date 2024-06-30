import { Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import { ThemedLayoutV2, useNotificationProvider } from '@refinedev/antd';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import routerBindings, {
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from '@refinedev/react-router-v6';
import {
    DashboardOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { ColorModeContextProvider } from './contexts/color-mode';
import { Dashboard } from "./pages/dashboard";
import '@refinedev/antd/dist/reset.css';

import { supabaseClient } from './utility/supabaseClient';
import { dataProvider } from '@refinedev/supabase';

import {
    ContactList,
    ContactCreate,
    ContactEdit,
    ContactShow,
} from "./pages/contacts";

function App() {
    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <ColorModeContextProvider>
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
                                name: 'contacts',
                                list: '/contacts',
                                create: '/contacts/create',
                                edit: '/contacts/edit/:id',
                                show: '/contacts/show/:id',
                                meta: {
                                    canDelete: true,
                                    icon: <TeamOutlined />,
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
                                <Route path="/contacts">
                                    <Route index element={<ContactList />} />
                                    <Route
                                        path="create"
                                        element={<ContactCreate />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<ContactEdit />}
                                    />
                                    <Route
                                        path="show/:id"
                                        element={<ContactShow />}
                                    />
                                </Route>
                            </Route>
                        </Routes>
                        <RefineKbar />
                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
