import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import { Thing } from '../.';

// Do the stuff
const App = () => {
  return (
    <div>
      <Thing />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
