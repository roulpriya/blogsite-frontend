import {useState, useEffect} from "react";
import { Link } from "react-router-dom";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost:8080/articles")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error.message);
        }
      )
  }, [])
  return (
    <div className="Home">
      
        {items.map(item => (
          <div key={item.id}>
            <h3>
                <Link to={`/blogs/${item.id}`}>{item.title}</Link>
            </h3>
            <p>{new Date(item.createdAt).toLocaleString()}</p>
            <p>{item.body}</p>
            
          </div>
        ))}
      
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default Home;
