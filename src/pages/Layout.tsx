import { Link, Outlet } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { useMediaQuery } from '../hooks/useMediaQuery';

function Layout() {
  const isLargeScreen = useMediaQuery('(min-width: 992px)');

  return (
    <div className="container-fluid">
      <div className="row h-100">
        {isLargeScreen && (
          <div className="col-1 p-0">
            <Sidebar />
          </div>
        )}
        <main className={isLargeScreen ? 'col' : 'col-12'}>
          <div className="row">
            <div className={`p-3 ${isLargeScreen ? 'col-2 text-start' : 'col-12 text-center'}`}>
              <Link to="/" className="nome-sistema text-decoration-none lead fs-3 mt-5 mb-5 d-inline-block">
                <span className="fw-bold fs-2">Unkai</span> book
              </Link>
            </div>

          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
