import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from '@wordpress/element';

const About = () => <div>About Page</div>;
const Contact = () => <div>Contact Page</div>;
const Home = () => <div>Home Page</div>;

// const Navigation = () => (
//     <nav>
        // <a href="?page=custompage&path=">Home</a>
        // <a href="?page=custompage&path=about">About</a>
        // <a href="?page=custompage&path=contact">Contact</a>
//     </nav>
// );

const Navigation = () => (
    <nav>
      <ul>
        <li><Link to="?page=custompage&path=">Home</Link></li>
        <li><Link to="?page=custompage&path=about">About</Link></li>
        <li><Link to="?page=custompage&path=contact">Contact</Link></li>
      </ul>
    </nav>
  );

function RouterApp() {
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();

    const path = query.get('path');
    const [component, setComponent] = useState(<Home />);

    useEffect(() => {
        switch(path) {
            case 'about':
                setComponent(<About />);
                break;
            case 'contact':
                setComponent(<Contact />);
                break;
            default:
                setComponent(<Home />);
        }
    }, [path]);

    return (
        <div>
            <Navigation />
            {component}
        </div>
    );
}
export default RouterApp;