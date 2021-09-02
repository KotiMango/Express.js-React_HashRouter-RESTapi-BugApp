const { Link } = ReactRouterDOM;

export function BugPreview({ bug }) {
  return (
    <table className='table'>
      <tbody>
        <tr>
          <td>{bug.title}</td>
          <td>{bug.description}</td>
          <td>
            <Link to={`/bug/${bug._id}`}>Details</Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
