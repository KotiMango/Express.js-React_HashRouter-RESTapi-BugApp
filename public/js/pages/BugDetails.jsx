const { Link } = ReactRouterDOM;

import { bugService } from '../services/bug.service.js';

export class BugDetails extends React.Component {
  state = {
    bug: null,
  };

  componentDidMount() {
    this.loadBug();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.match.params.bugId !== this.props.match.params.bugId
    ) {
      this.loadBug();
    }
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  loadBug = () => {
    const id = this.props.match.params.bugId;
    bugService.getById(id).then((bug) => {
      //if (!bug) this.props.history.push('/');
      this.setState({ bug });
    });
  };

  onDeleteBug = () => {
    bugService.remove(this.state.bug._id).then(this.onBack);
  };
  onBack = () => {
    this.props.history.push('/bug');
  };

  render() {
    const { bug } = this.state;
    if (!bug) return <div>Loading...</div>;
    return (
      <div className='details'>
        <h2>{bug.title}</h2>
        <h4>{bug.description}</h4>
        <p>{bug.severity}</p>
        <p>{new Date(bug.createdAt).toLocaleDateString()}</p>
        <h3>{bug.creator.username}</h3>
        <div className='button'>
          <Link to={`/bug/edit/${bug._id}`}>Edit</Link>
          <button className='delete' onClick={this.onDeleteBug}>
            Delete
          </button>
          <button onClick={this.onBack}>Back</button>
        </div>
      </div>
    );
  }
}
