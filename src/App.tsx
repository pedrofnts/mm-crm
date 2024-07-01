import { Refine, useRefineContext } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import { ThemedLayoutV2, useNotificationProvider } from '@refinedev/antd';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import routerBindings, {
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from '@refinedev/react-router-v6';
import { DashboardOutlined } from '@ant-design/icons';
import { ColorModeContextProvider } from './contexts/color-mode';
import { Dashboard } from "./pages/dashboard";
import '@refinedev/antd/dist/reset.css';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { supabaseClient } from './utility/supabaseClient';
import { dataProvider } from '@refinedev/supabase';

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
                                    name: 'contacts',
                                    list: '/',
                                    meta: {
                                        icon: <DashboardOutlined />,
                                    },
                                },
                                {
                                    name: 'dealStages', // Certifique-se de adicionar este recurso
                                    list: '/',
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

function AppRoutes() {
    const { queryClient } = useRefineContext();

    if (!queryClient) {
        return null; // or some loading indicator
    }

    return (
        <>
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
                </Route>
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
        </>
    );
}

export default App;
