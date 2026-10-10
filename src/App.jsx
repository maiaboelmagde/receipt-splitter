import { Route, Routes } from "react-router-dom";
import ReceiptSplitting from "./features/receipt/ReceiptSplitting";
import MainLayout from "./layouts/MainLayout";
import Home from "./features/Home/Home";
import NotFound from "./features/NotFound";

function App() {
  

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/split" element={<ReceiptSplitting />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App
