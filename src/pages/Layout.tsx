
import { Link, Outlet } from 'react-router'
import { Sidebar } from '../components/Sidebar'

function Layout() {
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-1 p-0">
          <Sidebar />
        </div>
        <main className="col">
          <div className="row">
            <div className="col-2 p-3">
              <Link to="/" className="nome-sistema text-decoration-none lead fs-3 ms-3 mt-5 mb-5">
                <span className="fw-bold fs-2">
                  Unkai
                </span> book</Link>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
