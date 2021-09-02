import e from 'express';
import { bugService } from '../services/bug.service.js';

export class BugEdit extends React.Component {
  state = {
    bug: {
      _id: this.props.match.params.bugId,
      title: '',
      description: '',
      severity: 3,
      createdAt: Date.now(),
    },
  };

  componentDidMount() {
    const { _id } = this.state.bug;
    if (!_id) return;
    bugService.getById(_id).then((bug) => {
      this.setState({ bug });
    });
  }

  handleChange = ({ target }) => {
    const field = target.name;
    const value =
      target.type === 'number' ? +target.value : target.value;
    this.setState((prevState) => ({
      bug: { ...prevState.bug, [field]: value },
    }));
  };

  onSaveBug = (ev) => {
    ev.preventDefault();
    if (this.state.bug._id) {
      bugService
        .update(this.state.bug)
        .then(() => this.props.history.push('/bug/'));
    } else {
      bugService
        .add(this.state.bug)
        .then(() => this.props.history.push('/bug/'));
    }
  };

  onBack = () => {
    this.props.history.push('/bug');
  };

  render() {
    const { title, description, severity, _id } = this.state.bug;
    return (
      <form className='bug-edit' onSubmit={this.onSaveBug}>
        <h1>{_id ? 'Edit' : 'Add'} Bug</h1>
        <input
          type='text'
          name='title'
          placeholder='title'
          value={title}
          onChange={this.handleChange}
        />
        <input
          type='text'
          name='description'
          placeholder='description'
          value={description}
          onChange={this.handleChange}
        />
        <label htmlFor='importance'>Importance</label>
        <select
          id='importance'
          className='select'
          name='severity'
          value={severity}
          onChange={this.handleChange}
        >
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select>
        <div className='btn-details'>
          <button>Save</button>
          <button onClick={this.onBack}>Back</button>
        </div>
      </form>
    );
  }
}
