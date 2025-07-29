import ProductList from "./pages/ProductList";

function App() {
  return (
    <div>
      <ProductList />
      <Route path="/login" element={<Name />}/>
      <Route path="/register" element={<Name />}/>
      <Route path="/main" element={<ProductList />}/>
      <Route path="/login" element={<Name />}/>
    </div>
  );
}

export default App;
