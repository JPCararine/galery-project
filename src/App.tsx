import {BrowserRouter, Route, Routes} from "react-router";
import PageComponents from "./pages/page-components";
import LayoutMain from "./pages/layout-main";
import PagePhotoDetails from "./pages/page-photo-details";
import PageHome from "./pages/page-home";
import {Toaster} from "sonner";

export default function App() {
	return (
		<BrowserRouter>
			<Toaster />
			<Routes>
				<Route element={<LayoutMain />}>
				<Route index element={<PageHome />} />
				<Route path="/fotos/:id" element={<PagePhotoDetails />} />
				<Route path="/componentes" element={<PageComponents />}/>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}