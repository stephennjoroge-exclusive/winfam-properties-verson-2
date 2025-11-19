import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Split the path and filter empty strings
  const pathnames = pathname.split('/').filter(x => x);

  return (
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '5px' }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={name}>
              <span> / </span>
              {isLast ? (
                <span>{name.replace(/-/g, ' ')}</span>
              ) : (
                <Link to={routeTo}>{name.replace(/-/g, ' ')}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
