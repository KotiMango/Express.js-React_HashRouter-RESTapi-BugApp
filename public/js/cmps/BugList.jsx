import { BugPreview } from './BugPreview.jsx';
export function BugList({ bugs }) {
  return (
    <div className='bug-list'>
      {bugs.map((bug) => (
        <BugPreview key={bug._id} bug={bug} />
      ))}
    </div>
  );
}
