import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Add from './pages/Add.jsx';
import Books from './pages/Books.jsx';
import Update from './pages/Update.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Books />,
  },
  {
    path: '/add',
    element: <Add />,
  },
  {
    path: '/update/:id',
    element: <Update />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
