import React from "react";
import UserLayout from "layouts/UserLayout";
import ThemeComponent from "@core/theme/ThemeComponent";
import { useSettings } from "@core/hooks/useSettings";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import CardBasic from "pageComponents/Cards";
function App() {
  const { settings } = useSettings();
  const routePath = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <ThemeComponent settings={settings}>
            <UserLayout>
              <CardBasic />
            </UserLayout>
          </ThemeComponent>
        }
      />
    )
  );
  return <RouterProvider router={routePath} />;
}

export default App;
