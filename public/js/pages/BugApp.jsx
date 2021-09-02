import { bugService } from '../services/bug.service.js';
import { userService } from '../services/user.service.js';
import { BugList } from '../cmps/BugList.jsx';
import { LoginPage } from './LoginPage.jsx';
import { UserDetails } from './UserDetails.jsx';
const { Link } = ReactRouterDOM;

export class BugApp extends React.Component {
  state = { bugs: [], user: null };
  componentDidMount() {
    const user = userService.getLoggedinUser();
    this.setState({ user });

    bugService.query().then((bugs) => {
      this.setState({ bugs });
    });
  }

  onRemoveBug = (bugId) => {
    bugService.remove(bugId).then(() => {
      console.log('Deleted Succesfully!');
      let { bugs } = this.state;
      bugs = bugs.filter((bug) => bug._id !== bugId);
      this.setState({ bugs });
    });
  };

  onEditBug = (bug) => {
    console.log('Edit');
    const title = +prompt('New Title?');
    const description = +prompt('New Desciption?');

    const bugToSave = { ...bug, title, description };
    bugService.update(bugToSave).then((savedBug) => {
      console.log('Updated Bug:', savedBug);
      const bugs = this.state.bugs.map((currBug) =>
        currBug._id === savedBug._id ? savedBug : currBug
      );
      this.setState({ bugs });
    });
  };

  onSignup = (credentials) => {
    userService
      .signup(credentials)
      .then((user) => this.setState({ user }));
  };
  onLogin = (credentials) => {
    userService
      .login(credentials)
      .then((user) => this.setState({ user }));
  };
  onLogout = () => {
    userService.logout().then(() => this.setState({ user: null }));
  };
  render() {
    const { bugs, user } = this.state;
    return (
      <div>
        <header>
          <h1>Bug App</h1>
        </header>
        {user && (
          <section className='user-info'>
            <UserDetails user={user} />
            <pre>{JSON.stringify(user)}</pre>
            <button onClick={this.onLogout}>Logout</button>
          </section>
        )}
        {!user && (
          <section className='user-info'>
            <LoginPage
              onLogin={this.onLogin}
              onSignup={this.onSignup}
            />
          </section>
        )}
        <Link to='/bug/edit'>Add</Link>
        <BugList bugs={bugs} />
      </div>
    );
  }
}
