interface PageTopBarProps {
  title: string;
  breadcrumb?: string[];
  actions?: React.ReactNode;
}

export const PageTopBar = ({title, breadcrumb, actions}: PageTopBarProps) => {
  return (
    <header className='row-between border-b border-[var(--border-subtle)] bg-[var(--bg-card)] px-6 py-4'>
      <div className='col gap-1'>
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label='breadcrumb'>
            <ol className='row gap-1.5'>
              {breadcrumb.map((crumb, index) => (
                <li key={crumb} className='row gap-1.5'>
                  <span className='caption'>{crumb}</span>
                  {index < breadcrumb.length - 1 && (
                    <span className='caption' aria-hidden='true'>
                      /
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className='h3'>{title}</h1>
      </div>
      {actions && <div className='row gap-2'>{actions}</div>}
    </header>
  );
};
