import { useState, useEffect } from "react";
import { useParams } from "react-router";

function Blog() {
    const { id } = useParams();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [blog, setBlog] = useState({});

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch(`http://localhost:8080/articles/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setBlog(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error.message);
                }
            )
    }, [id])
    return (
        <div className="Blog">

            <div key={blog.id}>
                <h3>{blog.title}</h3>
                <p>{new Date(blog.createdAt).toLocaleString()}</p>
                <p>{blog.body}</p>

            </div>

            {error && <div>Error: {error}</div>}
        </div>
    );
}

export default Blog;
